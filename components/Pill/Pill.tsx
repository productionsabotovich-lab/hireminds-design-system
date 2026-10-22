/**
 * Pattern: data/products/hireminds/design/system/patterns/pill.md
 *
 * Status badge: short text on a soft fill of its color family, optional halo dot.
 * Not interactive.
 */
import { ReactNode } from "react";
import s from "./Pill.module.css";

export type PillTone = "accent" | "warn" | "danger" | "dim";

export interface PillProps {
  /** Color family: accent — идёт/успех, warn — ждёт человека, danger — блокер, dim — нейтральное/завершённое */
  tone?: PillTone;
  /** sm — 20px, inline in tables; md — 24px, mono uppercase near headings */
  size?: "sm" | "md";
  /** Halo dot before text */
  dot?: boolean;
  /** Pulse the dot (live process) */
  pulse?: boolean;
  children: ReactNode;
}

export function Pill({ tone = "dim", size = "sm", dot = false, pulse = false, children }: PillProps) {
  return (
    <span className={[s.pill, s[tone], s[size]].join(" ")}>
      {dot && <span className={[s.dot, pulse ? s.pulse : ""].filter(Boolean).join(" ")} aria-hidden="true" />}
      {children}
    </span>
  );
}
