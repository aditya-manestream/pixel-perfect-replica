// Manestream library kit: hand any existing <form> to WhatsApp, for templates whose forms had no backend.
// <form onSubmit={(e) => sendEnquiry(e, "Site visit")}>…</form>
// Reads each filled field with its visible label (or placeholder, or name) and opens the chat prefilled.
import type { FormEvent } from "react";
import { whatsappLink } from "./contact";

export function sendEnquiry(e: FormEvent<HTMLFormElement>, topic: string) {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  const lines = [`Enquiry: ${topic}`];
  form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea").forEach((field) => {
    if (field.type === "hidden" || field.type === "submit" || field.type === "button") return;
    if ((field.type === "checkbox" || field.type === "radio") && !(field as HTMLInputElement).checked) return;
    const value = field.value.trim();
    if (!value) return;
    const label =
      field.labels?.[0]?.textContent ??
      field.closest("fieldset")?.querySelector("legend")?.textContent ??
      field.parentElement?.querySelector("label")?.textContent ??
      field.getAttribute("aria-label") ??
      field.getAttribute("placeholder") ??
      field.name;
    lines.push(`${(label ?? "").replace(/\s*\*\s*$/, "").trim()}: ${value}`);
  });
  // Opened inside the submit handler so mobile browsers don't block it.
  window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
}
