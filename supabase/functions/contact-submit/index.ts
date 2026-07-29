import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";
import { sendMail, layout, escapeHtml, NOTIFY_TO } from "../_shared/smtp.ts";

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().default(""),
  orderNumber: z.string().trim().max(60).optional().default(""),
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(1).max(2000),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const d = parsed.data;

    // Confirmation to the customer
    await sendMail({
      to: d.email,
      subject: "We've received your message — Ardori",
      html: layout(
        `Thank you, ${escapeHtml(d.name)}`,
        `<p style="margin:0 0 16px 0;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#4A4540;">
           We've received your enquiry and our customer care team will reply within 48 hours.
         </p>
         <p style="margin:0 0 8px 0;font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C4A164;">Your message</p>
         <p style="margin:0;font-family:Georgia,serif;font-size:14px;line-height:1.8;color:#4A4540;white-space:pre-wrap;">${escapeHtml(d.message)}</p>`,
      ),
    });

    // Internal notification
    await sendMail({
      to: NOTIFY_TO,
      replyTo: d.email,
      subject: `New enquiry — ${d.subject || "General"} (${d.name})`,
      html: layout(
        "New website enquiry",
        `<p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.9;color:#2C2824;">
           <b>Name:</b> ${escapeHtml(d.name)}<br/>
           <b>Email:</b> ${escapeHtml(d.email)}<br/>
           <b>Phone:</b> ${escapeHtml(d.phone || "—")}<br/>
           <b>Order no.:</b> ${escapeHtml(d.orderNumber || "—")}<br/>
           <b>Subject:</b> ${escapeHtml(d.subject || "—")}
         </p>
         <p style="font-family:Georgia,serif;font-size:14px;line-height:1.8;color:#4A4540;white-space:pre-wrap;">${escapeHtml(d.message)}</p>`,
      ),
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("contact-submit failed", err);
    return new Response(JSON.stringify({ error: "Could not send your message" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
