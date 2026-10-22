/** Pattern: data/products/hireminds/design/system/patterns/dot.md */
import s from "./Dot.module.css";

export interface DotProps {
  /**
   * 'status'    → with halo (box-shadow ring)
   * 'separator' → tiny 3-4px, no halo (default)
   * 'kicker'    → accent with halo, used as ::before in Kicker
   * 'presence'  → agent online/offline indicator
   */
  variant?: "status" | "separator" | "kicker" | "presence" | undefined;
  /** Dot color */
  tone?: "accent" | "warn" | "danger" | "dim" | "ink" | "mute" | undefined;
  /** Size */
  size?: "xs" | "sm" | "md" | undefined;
  /** Pulse animation (for live indicator) */
  pulse?: boolean | undefined;
}

export function Dot({
  variant = "separator",
  tone = "dim",
  size = "xs",
  pulse = false,
}: DotProps) {
  return (
    <span
      className={[
        s.dot,
        s[`variant-${variant}`],
        s[`tone-${tone}`],
        s[`size-${size}`],
        pulse ? s.pulse : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    />
  );
}
