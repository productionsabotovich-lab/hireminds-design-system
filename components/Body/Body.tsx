/** Pattern: data/products/hireminds/design/system/patterns/body.md */
import type { ReactNode } from "react";
import s from "./Body.module.css";

export interface BodyProps {
  /** mute (default), ink, ink-2, ink-3 */
  tone?: "mute" | "ink" | "ink-2" | "ink-3";
  /** 'base' (13-13.5px) / 'small' (12-12.5px) */
  size?: "base" | "small";
  className?: string;
  children: ReactNode;
}

export function Body({ tone = "mute", size = "base", className, children }: BodyProps) {
  return (
    <p
      className={[s.body, s[size], s[`tone-${tone}`], className].filter(Boolean).join(" ")}
    >
      {children}
    </p>
  );
}
