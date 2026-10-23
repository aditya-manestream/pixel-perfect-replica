// Manestream library kit, real estate: the site-visit form, an EnquiryForm preset.
import { EnquiryForm, type EnquiryField } from "../EnquiryForm";

interface SiteVisitFormProps {
  /** Configurations to choose from, e.g. ["2 BHK", "3 BHK"]. Omit to leave the field out. */
  configurations?: string[];
  /** Project name; leads the WhatsApp message. */
  project?: string;
  submitLabel?: string;
  submitClassName?: string;
  tone?: "light" | "dark";
  className?: string;
}

export function siteVisitFields(configurations?: string[]): EnquiryField[] {
  return [
    { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
    { name: "phone", label: "Mobile number", type: "tel", required: true },
    { name: "date", label: "Preferred date", type: "date" },
    ...(configurations?.length ? [{ name: "configuration", label: "Looking for", type: "chips", options: configurations } as EnquiryField] : []),
    { name: "visitors", label: "Visitors", type: "select", options: ["1", "2", "3", "4", "5 or more"] },
  ];
}

export function SiteVisitForm({ configurations, project, submitLabel = "Book a site visit on WhatsApp", ...rest }: SiteVisitFormProps) {
  return (
    <EnquiryForm
      topic={project ? `Site visit, ${project}` : "Site visit"}
      fields={siteVisitFields(configurations)}
      submitLabel={submitLabel}
      {...rest}
    />
  );
}
