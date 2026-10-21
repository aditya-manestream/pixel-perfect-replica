// Manestream library kit: motion tokens and a reduced-motion hook.
import { useEffect, useState } from "react";

/** House easings (Build Library > Motion). */
export const ease = {
  /** Entrances. Never ease-in on an entrance. */
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  /** Elements moving while on screen. */
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
} as const;

export function usePrefersReducedMotion(): boolean {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
