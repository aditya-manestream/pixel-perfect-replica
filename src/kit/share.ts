// Manestream library kit: native share sheet on phones, copy-link fallback on desktop.
import { toast } from "sonner";

export async function shareOrCopy(title: string, url: string = window.location.href) {
  if (navigator.share) {
    try {
      await navigator.share({ title, url });
      return;
    } catch {
      return; // user closed the sheet
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied");
  } catch {
    toast.error("Couldn't copy the link. Copy it from the address bar.");
  }
}
