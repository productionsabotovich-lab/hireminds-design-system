/**
 * Vertical layout: children in a column with a gap from the spacing scale.
 */
import type { ReactNode } from "react";
import s from "./Stack.module.css";

/** Step of the spacing scale: 1 → space-1 (4px) … 16 → space-16 (64px) */
export type SpaceStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17;

export interface StackProps {
  /** Gap between children, step of the spacing scale */
  gap?: SpaceStep | undefined;
  /** Cross-axis alignment; stretch fills the width */
  align?: "stretch" | "start" | "center" | "end" | undefined;
  /** HTML element */
  as?: "div" | "section" | "main" | "ul" | "ol" | undefined;
  children: ReactNode;
  className?: string | undefined;
}

export function Stack({ gap = 4, align = "stretch", as: Tag = "div", children, className }: StackProps) {
  return (
    <Tag
      className={[s.stack, s[align], className].filter(Boolean).join(" ")}
      style={{ gap: `var(--space-${gap})` }}
    >
      {children}
    </Tag>
  );
}
