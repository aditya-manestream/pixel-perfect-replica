import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const SMTP_HOSTNAME = "smtp.hostinger.com";
const SMTP_PORT = 465;

export const SENDER = Deno.env.get("SMTP_USERNAME") ?? "";
export const NOTIFY_TO = Deno.env.get("CONTACT_RECIPIENT") ?? SENDER;

/** Sends one email over Hostinger SMTP (implicit TLS on 465). */
export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const password = Deno.env.get("SMTP_PASSWORD") ?? "";
  if (!SENDER || !password) throw new Error("SMTP credentials are not configured");

  const client = new SMTPClient({
    connection: {
      hostname: SMTP_HOSTNAME,
      port: SMTP_PORT,
      tls: true,
      auth: { username: SENDER, password },
    },
  });

  try {
    await client.send({
      from: `Ardori <${SENDER}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
  } finally {
    await client.close();
  }
}

/** Shared editorial email shell: off-white paper, navy heading, gold rule. */
export function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:32px 0;">
      <tr><td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FDFCFA;border:1px solid #E8E4DF;">
          <tr><td style="padding:36px 36px 8px 36px;">
            <p style="margin:0 0 18px 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#C4A164;">ARDORI</p>
            <h1 style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:24px;color:#121B2D;">${title}</h1>
            <div style="height:1px;background:#C4A164;width:48px;margin:16px 0 24px 0;"></div>
            ${body}
          </td></tr>
          <tr><td style="padding:28px 36px 36px 36px;">
            <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.1em;color:#8A857E;">ARDORI · Mumbai, India · love@ardorilabel.com</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
