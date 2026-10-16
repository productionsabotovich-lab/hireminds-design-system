/** Pattern: data/products/hireminds/design/system/patterns/step-indicator.md */
import s from "./StepIndicator.module.css";

export interface StepIndicatorProps {
  current: number;
  total: number;
  /**
   * 'short'   → "step 1 / 3" (mono, for form-top) — default
   * 'verbose' → "Шаг 1 из 3" (mono for Kicker / page-kicker)
   */
  format?: "short" | "verbose";
  /** Optional contextual label appended after step */
  scope?: string;
}

export function StepIndicator({
  current,
  total,
  format = "short",
  scope,
}: StepIndicatorProps) {
  const text =
    format === "short"
      ? `step ${current} / ${total}`
      : `Шаг ${current} из ${total}`;

  return (
    <span className={[s.indicator, s[format]].join(" ")}>
      {text}
      {scope && <span className={s.scope}>{` · ${scope}`}</span>}
    </span>
  );
}
