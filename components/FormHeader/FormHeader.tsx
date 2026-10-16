/** Pattern: data/products/hireminds/design/system/patterns/form-header.md */
import type { ReactNode } from "react";
import { Dot } from "../Dot";
import s from "./FormHeader.module.css";

export interface FormHeaderProps {
  kicker?: string;
  withDot?: boolean;
  /** 'accent' (green, default) or 'mute' (gray) */
  kickerTone?: "accent" | "mute";
  heading: ReactNode;
  lead?: ReactNode;
  headingSize?: "sm" | "md" | "lg" | "xl";
}

export function FormHeader({ kicker, withDot = true, kickerTone = "accent", heading, lead, headingSize = "md" }: FormHeaderProps) {
  const headingCls = [s.heading, s[headingSize]].filter(Boolean).join(" ");
  const kickerCls = [s.kicker, s[`kicker-${kickerTone}`]].join(" ");
  return (
    <div className={s.formHeader}>
      {kicker && (
        <div className={kickerCls}>
          {withDot && <Dot variant="status" tone="accent" size="md" />}
          {kicker}
        </div>
      )}
      <h1 className={headingCls}>{heading}</h1>
      {lead && <p className={s.lead}>{lead}</p>}
    </div>
  );
}
