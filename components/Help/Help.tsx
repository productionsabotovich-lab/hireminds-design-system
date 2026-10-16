/** Pattern: data/products/hireminds/design/system/patterns/help.md */
import type { ReactNode } from "react";
import s from "./Help.module.css";

export interface HelpProps {
  /**
   * 'default' — neutral mute
   * 'error'   — danger-ink (validation message)
   * 'success' — accent-ink (validation OK)
   */
  tone?: "default" | "error" | "success";
  children: ReactNode;
}

export function Help({ tone = "default", children }: HelpProps) {
  return (
    <span className={[s.help, s[`tone-${tone}`]].join(" ")}>
      {children}
    </span>
  );
}
