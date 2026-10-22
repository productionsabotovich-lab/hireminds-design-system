/**
 * Horizontal layout: children in a row that wraps, gap from the spacing scale.
 */
import type { ReactNode } from "react";
import type { SpaceStep } from "../Stack";
import s from "./Cluster.module.css";

export interface ClusterProps {
  /** Gap between children, step of the spacing scale */
  gap?: SpaceStep | undefined;
  /** Vertical gap between wrapped lines; defaults to gap */
  rowGap?: SpaceStep | undefined;
  align?: "start" | "center" | "end" | "baseline" | undefined;
  /** between — first group left, last right (page head: title and toolbar) */
  justify?: "start" | "end" | "between" | undefined;
  /** false — keep one line */
  wrap?: boolean | undefined;
  children: ReactNode;
  className?: string | undefined;
}

export function Cluster({
  gap = 2,
  rowGap,
  align = "center",
  justify = "start",
  wrap = true,
  children,
  className,
}: ClusterProps) {
  return (
    <div
      className={[s.cluster, s[`align-${align}`], s[`justify-${justify}`], wrap ? "" : s.nowrap, className].filter(Boolean).join(" ")}
      style={{ columnGap: `var(--space-${gap})`, rowGap: `var(--space-${rowGap ?? gap})` }}
    >
      {children}
    </div>
  );
}
