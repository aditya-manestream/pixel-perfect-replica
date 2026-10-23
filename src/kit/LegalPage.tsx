// Manestream library kit: privacy and terms pages so footers never carry dead links.
// Plain-language starting point written for Indian small businesses (DPDP Act, 2023).
// It is a template, not legal advice: the client's own counsel should review it before launch.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { displayPhone, mailLink } from "./contact";
import { usePageMeta } from "./usePageMeta";

type Kind = "privacy" | "terms";

const entity = () => site.legalName ?? site.name;

function Privacy({ h }: { h: string }) {
  return (
    <>
      <p>
        This page explains what {entity()} collects when you use this website, why, and what you can ask us to do with
        it. It follows India's Digital Personal Data Protection Act, 2023.
      </p>
      <h2 className={h}>What we collect</h2>
      <ul>
        <li>What you type into our enquiry form: usually your name, mobile number and the details of your request.</li>
        <li>Messages you send us on WhatsApp, phone or email.</li>
        <li>Basic technical data your browser sends to any website, such as device type and pages visited.</li>
      </ul>
      <h2 className={h}>Why we use it</h2>
      <p>
        Only to reply to your enquiry, arrange what you asked for, and keep a record of the conversation. We do not sell
        your data or share it for advertising.
      </p>
      <h2 className={h}>Who else sees it</h2>
      <p>
        Service providers that run this site for us, such as our hosting, form and messaging providers, process it on our
        behalf and only for these purposes.
      </p>
      <h2 className={h}>How long we keep it</h2>
      <p>For as long as we need it to serve you, or as the law requires, and then we delete it.</p>
      <h2 className={h}>Your rights</h2>
      <p>
        You can ask to see, correct or delete your data, or withdraw consent, by writing to{" "}
        <a href={mailLink("Data request")}>{site.contact.email}</a>. We reply within 30 days.
      </p>
    </>
  );
}

function Terms({ h }: { h: string }) {
  return (
    <>
      <p>By using this website you agree to these terms. If you don't agree, please don't use the site.</p>
      <h2 className={h}>Information on this site</h2>
      <p>
        We keep prices, availability, images and descriptions as accurate as we can, but they can change without notice.
        Images may be representative. A confirmed booking, quote or order in writing from {entity()} is what counts.
      </p>
      <h2 className={h}>Enquiries and bookings</h2>
      <p>
        Sending an enquiry does not create a contract. Any booking, purchase or service is governed by the confirmation
        and terms we share with you at that point.
      </p>
      <h2 className={h}>Content</h2>
      <p>The text, design and photographs on this site belong to {entity()} or are used with permission.</p>
      <h2 className={h}>Liability</h2>
      <p>To the extent Indian law allows, we are not liable for losses that arise from relying on this website.</p>
      <h2 className={h}>Governing law</h2>
      <p>
        These terms are governed by the laws of India{site.contact.city ? `, with courts at ${site.contact.city} having jurisdiction` : ""}.
      </p>
    </>
  );
}

interface LegalPageProps {
  kind: Kind;
  /** The site's own header and footer, so the page sits inside the brand. */
  header?: ReactNode;
  footer?: ReactNode;
  /**
   * Classes for the H1 and section headings, e.g. "font-serif font-normal" on serif sites.
   * Replaces the kit's default "font-semibold tracking-tight".
   */
  headingClassName?: string;
}

export function LegalPage({ kind, header, footer, headingClassName = "font-semibold tracking-tight" }: LegalPageProps) {
  const title = kind === "privacy" ? "Privacy policy" : "Terms of use";
  usePageMeta({ title, description: `${title} for ${site.name}.` });
  return (
    <>
      {header}
      <main className="container max-w-3xl py-28 md:py-36">
        <h1 className={cn("text-4xl md:text-5xl", headingClassName)}>{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {entity()} · Questions: <a className="underline" href={mailLink(title)}>{site.contact.email}</a> · {displayPhone()}
        </p>
        <div className="mt-10 max-w-[68ch] space-y-5 text-base leading-relaxed text-foreground/85 [&_a]:underline [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {kind === "privacy" ? <Privacy h={headingClassName} /> : <Terms h={headingClassName} />}
        </div>
      </main>
      {footer}
    </>
  );
}
