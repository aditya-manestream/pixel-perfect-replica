import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";
import { sendMail, layout, escapeHtml, NOTIFY_TO } from "../_shared/smtp.ts";

const DISCOUNT_CODE = Deno.env.get("WELCOME_DISCOUNT_CODE") ?? "ARDORI2";

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
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
    const email = parsed.data.email;

    await sendMail({
      to: email,
      subject: "Here's your 2% off — Ardori",
      html: layout(
        "Welcome to Ardori",
        `<p style="margin:0 0 20px 0;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#4A4540;">
           Thank you for joining us. Here is 2% off your first order.
         </p>
         <div style="border:1px solid #C4A164;padding:18px;text-align:center;margin:0 0 20px 0;">
           <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:20px;letter-spacing:0.3em;color:#121B2D;">${escapeHtml(DISCOUNT_CODE)}</p>
         </div>
         <p style="margin:0;font-family:Georgia,serif;font-size:14px;line-height:1.8;color:#4A4540;">
           Apply this code at checkout. Handcrafted in India, one bag at a time.
         </p>`,
      ),
    });

    await sendMail({
      to: NOTIFY_TO,
      subject: "New 2% off signup",
      html: layout("New newsletter signup", `<p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#2C2824;">${escapeHtml(email)}</p>`),
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("newsletter-subscribe failed", err);
    return new Response(JSON.stringify({ error: "Could not send your code" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
