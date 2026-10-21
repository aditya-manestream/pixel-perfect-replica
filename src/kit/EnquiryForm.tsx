// Manestream library kit: the enquiry form every library site shares.
// - Validates an Indian mobile number and required fields, with inline errors.
// - Without a Web3Forms key it hands the enquiry to WhatsApp (works with zero backend).
// - With site.web3formsKey it also emails the enquiry (free tier), then offers WhatsApp.
// Uses the site's shadcn Button / Input / Label / Textarea so it inherits the theme.
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { whatsappLink } from "./contact";
import { formatIndianMobile, isIndianMobile } from "./format";

export type EnquiryField =
  | { name: string; label: string; type: "text" | "email" | "date" | "number"; required?: boolean; placeholder?: string; autoComplete?: string }
  | { name: string; label: string; type: "tel"; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: "select" | "chips"; options: string[]; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: "textarea"; required?: boolean; placeholder?: string };

export const defaultFields: EnquiryField[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "phone", label: "Mobile number", type: "tel", required: true },
];

interface EnquiryFormProps {
  /** What the enquiry is about; leads the WhatsApp message and email subject. */
  topic: string;
  fields?: EnquiryField[];
  submitLabel?: string;
  className?: string;
  /** Extra classes for the submit button, e.g. the site's action colour. */
  submitClassName?: string;
  /** Visual tone: "light" on pale backgrounds, "dark" on dark ones. */
  tone?: "light" | "dark";
}

type Status = "idle" | "submitting" | "sent" | "error";

const selectClass =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function EnquiryForm({ topic, fields = defaultFields, submitLabel, submitClassName, className, tone = "light" }: EnquiryFormProps) {
  const uid = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const emailEnabled = Boolean(site.web3formsKey);

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const f of fields) {
      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) next[f.name] = f.type === "chips" || f.type === "select" ? "Choose one" : "Required";
      else if (f.type === "tel" && v && !isIndianMobile(v)) next[f.name] = "Enter a 10-digit Indian mobile number";
      else if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v)) next[f.name] = "Enter a valid email";
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(`${uid}-${first}`)?.focus();
    return !first;
  };

  const summary = () =>
    [`Enquiry: ${topic}`, ...fields.filter((f) => values[f.name]).map((f) => `${f.label}: ${f.type === "tel" ? formatIndianMobile(values[f.name]) : values[f.name]}`)].join("\n");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!emailEnabled) {
      // Opened inside the submit handler so mobile browsers don't block it.
      window.open(whatsappLink(summary()), "_blank", "noopener");
      setStatus("sent");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: site.web3formsKey, subject: `${site.name}: ${topic}`, from_name: site.name, ...values }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const muted = tone === "dark" ? "text-white/70" : "text-muted-foreground";

  if (status === "sent") {
    return (
      <div role="status" className={cn("space-y-4", className)}>
        <h3 className="text-2xl font-semibold">Thank you{values.name ? `, ${values.name.split(" ")[0]}` : ""}.</h3>
        <p className={muted}>
          {emailEnabled
            ? `We'll call you on ${formatIndianMobile(values.phone ?? "")} within one working day.`
            : "Your enquiry is ready in WhatsApp. Press send there and we'll reply on the same chat."}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant={emailEnabled ? "outline" : "default"}>
            <a href={whatsappLink(summary())} target="_blank" rel="noopener noreferrer">
              {emailEnabled ? "Also message us on WhatsApp" : "Open WhatsApp again"}
            </a>
          </Button>
          <Button variant="ghost" onClick={() => setStatus("idle")}>Edit enquiry</Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className={cn("space-y-5", className)}>
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const err = errors[f.name];
        const describedBy = err ? `${id}-err` : undefined;
        const common = {
          id,
          name: f.name,
          value: values[f.name] ?? "",
          "aria-invalid": err ? true : undefined,
          "aria-describedby": describedBy,
        };
        return (
          <div key={f.name} className="space-y-2">
            {f.type === "chips" ? (
              <fieldset aria-describedby={describedBy}>
                <legend className="mb-2 text-sm font-medium">
                  {f.label}
                  {!f.required && <span className={cn("ml-1 font-normal", muted)}>(optional)</span>}
                </legend>
                <div className="flex flex-wrap gap-2" role="radiogroup">
                  {f.options.map((o) => {
                    const active = values[f.name] === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        id={o === f.options[0] ? id : undefined}
                        onClick={() => set(f.name, o)}
                        className={cn(
                          "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                          active ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background hover:border-primary/50",
                        )}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ) : (
              <>
                <Label htmlFor={id}>
                  {f.label}
                  {!f.required && <span className={cn("ml-1 font-normal", muted)}>(optional)</span>}
                </Label>
                {f.type === "select" ? (
                  <select {...common} className={selectClass} onChange={(e) => set(f.name, e.target.value)}>
                    <option value="">{f.placeholder ?? "Choose one"}</option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                ) : f.type === "textarea" ? (
                  <Textarea {...common} rows={4} placeholder={f.placeholder} onChange={(e) => set(f.name, e.target.value)} />
                ) : f.type === "tel" ? (
                  <div className="flex">
                    <span className="inline-flex h-11 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">+91</span>
                    <Input
                      {...common}
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder={f.placeholder ?? "98765 43210"}
                      className="h-11 rounded-l-none"
                      onChange={(e) => set(f.name, e.target.value)}
                    />
                  </div>
                ) : (
                  <Input
                    {...common}
                    type={f.type}
                    autoComplete={"autoComplete" in f ? f.autoComplete : undefined}
                    placeholder={f.placeholder}
                    className="h-11"
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                )}
              </>
            )}
            {err && (
              <p id={`${id}-err`} className="text-sm font-medium text-destructive">
                {err}
              </p>
            )}
          </div>
        );
      })}

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          That didn't send. Check your connection and try again, or message us on WhatsApp.
        </p>
      )}

      <Button type="submit" size="lg" className={cn("h-12 w-full sm:w-auto", submitClassName)} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : submitLabel ?? (emailEnabled ? "Send enquiry" : "Send on WhatsApp")}
      </Button>
      <p className={cn("text-xs", muted)}>
        {emailEnabled ? "We reply within one working day." : "Opens WhatsApp with your details filled in. Nothing is sent until you press send."}
      </p>
    </form>
  );
}
