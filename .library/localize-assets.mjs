#!/usr/bin/env node
// Copies hotlinked images/videos into the repo and rewrites references to local paths.
// Runs in GitHub Actions (needs open internet). Zero dependencies, Node 18+.
//
// Config: .library/localize.json  { "lovableOrigin": "https://<project>.lovable.app" }
//   lovableOrigin is only needed for repos that use Lovable's /__l5e/assets-v1/ paths.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { createHash } from "node:crypto";

const ROOT = process.cwd();
const OUT_DIR = "public/library-assets";
const cfgPath = join(ROOT, ".library/localize.json");
const cfg = existsSync(cfgPath) ? JSON.parse(readFileSync(cfgPath, "utf8")) : {};

const MEDIA_EXT = /\.(jpe?g|png|webp|avif|gif|svg|mp4|webm)$/i;
// Remote media we want to own. Fonts/CDN scripts and map tiles are left alone on purpose.
const PATTERNS = [
  /https:\/\/images\.unsplash\.com\/[^"'`)\s]+/g,
  /https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\/[^"'`)\s]+/g,
  /https:\/\/pub-[a-z0-9]+\.r2\.dev\/[^"'`)\s]+/g,
  /https:\/\/(?:www\.)?[a-z0-9.-]+\/[^"'`)\s]+\.(?:jpe?g|png|webp|avif|gif|mp4|webm)(?:\?[^"'`)\s]*)?/g,
  /\/__l5e\/assets-v1\/[^"'`)\s]+/g,
];
const SKIP_HOSTS = [/tile\.openstreetmap\.org/, /fonts\.(googleapis|gstatic)\.com/, /lovable\.dev\/opengraph/, /img\.youtube\.com/];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, files);
    else if (/\.(tsx?|jsx?|css|html|json|md)$/.test(name)) files.push(p);
  }
  return files;
}

const files = [...walk(join(ROOT, "src")), join(ROOT, "index.html")].filter(existsSync);
const found = new Map(); // url -> local path
for (const f of files) {
  const text = readFileSync(f, "utf8");
  for (const re of PATTERNS) for (const m of text.matchAll(re)) {
    const url = m[0].replace(/[,;]+$/, "");
    if (SKIP_HOSTS.some((h) => h.test(url))) continue;
    found.set(url, null);
  }
}

mkdirSync(join(ROOT, OUT_DIR), { recursive: true });
const report = { downloaded: [], failed: [] };
for (const url of found.keys()) {
  const absolute = url.startsWith("/__l5e/") ? (cfg.lovableOrigin ? cfg.lovableOrigin + url : null) : url;
  if (!absolute) { report.failed.push({ url, reason: "no lovableOrigin in .library/localize.json" }); continue; }
  try {
    const res = await fetch(absolute, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get("content-type") || "";
    let ext = (extname(new URL(absolute).pathname).match(MEDIA_EXT) || [""])[0].toLowerCase();
    if (!ext) ext = type.includes("png") ? ".png" : type.includes("webp") ? ".webp" : type.includes("avif") ? ".avif" : type.includes("svg") ? ".svg" : type.includes("mp4") ? ".mp4" : ".jpg";
    const buf = Buffer.from(await res.arrayBuffer());
    const name = createHash("sha1").update(url).digest("hex").slice(0, 12) + ext;
    writeFileSync(join(ROOT, OUT_DIR, name), buf);
    found.set(url, `/library-assets/${name}`);
    report.downloaded.push({ url, local: `/library-assets/${name}`, bytes: buf.length });
  } catch (e) {
    report.failed.push({ url, reason: String(e.message || e) });
  }
}

// Rewrite references, longest URLs first so prefixes don't clobber longer matches.
const pairs = [...found.entries()].filter(([, l]) => l).sort((a, b) => b[0].length - a[0].length);
let changed = 0;
for (const f of files) {
  let text = readFileSync(f, "utf8"), before = text;
  for (const [url, local] of pairs) text = text.split(url).join(local);
  if (text !== before) { writeFileSync(f, text); changed++; }
}
writeFileSync(join(ROOT, ".library/localize-report.json"), JSON.stringify({ ...report, filesChanged: changed }, null, 2));
console.log(`downloaded ${report.downloaded.length}, failed ${report.failed.length}, files changed ${changed}`);
