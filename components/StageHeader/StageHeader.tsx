/** Pattern: data/products/hireminds/design/system/patterns/stage-header.md */
import type { ReactNode } from "react";
import s from "./StageHeader.module.css";

export interface StageHeaderProps {
  /** Mono uppercase sub-heading with dot decorator */
  kicker: string;
  /** Main heading, supports <em> for accent color */
  heading: ReactNode;
  /** Lead paragraph under heading */
  lead?: ReactNode | undefined;
  /**
   * 'aside' → H1 hero 46px (for AsidePanel in SplitLayout) — default
   * 'hero'  → H2 hero 38px (for hero-block in Card)
   */
  variant?: "aside" | "hero" | undefined;
}

export function StageHeader({
  kicker,
  heading,
  lead,
  variant = "aside",
}: StageHeaderProps) {
  return (
    <div className={[s.stageHeader, s[variant]].join(" ")}>
      <div className={s.kicker}>{kicker}</div>
      {variant === "aside" ? (
        <h1 className={s.heading}>{heading}</h1>
      ) : (
        <h2 className={s.heading}>{heading}</h2>
      )}
      {lead && <p className={s.lead}>{lead}</p>}
    </div>
  );
}
