// Manestream library kit: a branded 404 that keeps the visitor moving (home or WhatsApp).
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappLink } from "./contact";
import { usePageMeta } from "./usePageMeta";

interface NotFoundPageProps {
  header?: ReactNode;
  footer?: ReactNode;
  /** Classes for the H1, e.g. "font-serif font-normal"; replaces "font-semibold tracking-tight". */
  headingClassName?: string;
}

export function NotFoundPage({ header, footer, headingClassName = "font-semibold tracking-tight" }: NotFoundPageProps) {
  usePageMeta({ title: "Page not found", noindex: true });
  return (
    <>
      {header}
      <main className="container flex min-h-[70vh] flex-col justify-center py-28">
        <p className="tabular text-sm font-medium text-muted-foreground">404</p>
        <h1 className={cn("mt-2 text-4xl md:text-5xl", headingClassName)}>This page isn't here.</h1>
        <p className="mt-4 max-w-[48ch] text-lg text-muted-foreground">
          The link may be old or mistyped. Head back home, or ask us on WhatsApp and we'll point you to it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/">Go to the home page</Link></Button>
          <Button asChild size="lg" variant="outline">
            <a href={whatsappLink("Hi, I was looking for a page on your website.")} target="_blank" rel="noopener noreferrer">
              Ask on WhatsApp
            </a>
          </Button>
        </div>
      </main>
      {footer}
    </>
  );
}
