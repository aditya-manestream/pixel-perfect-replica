// Manestream library kit, real estate: brochure request through WhatsApp (no fake PDF download).
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { whatsappLink } from "../contact";
import { WhatsAppIcon } from "../WhatsAppButton";

interface BrochureButtonProps extends Pick<ComponentProps<typeof Button>, "variant" | "size" | "className"> {
  /** Project name for the message; defaults to the brand. */
  project?: string;
  label?: string;
}

export function BrochureButton({ project, label = "Get the brochure on WhatsApp", variant = "outline", size = "lg", className }: BrochureButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={cn("h-auto min-h-11 whitespace-normal py-2 text-center", className)}>
      <a href={whatsappLink(`Hi ${site.name}, please send me the brochure for ${project ?? site.name}.`)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon className="mr-2 h-5 w-5 shrink-0" />
        {label}
      </a>
    </Button>
  );
}
