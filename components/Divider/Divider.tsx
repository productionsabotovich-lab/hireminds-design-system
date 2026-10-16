/** Pattern: data/products/hireminds/design/system/patterns/divider.md */
import s from "./Divider.module.css";

export interface DividerProps {
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /**
   * 'subtle' → 1px solid var(--line) (default)
   * 'strong' → 1px solid var(--line-2)
   * 'dashed' → 1px dashed var(--line-2)
   */
  weight?: "subtle" | "strong" | "dashed";
  /** Optional center label e.g. "или email" */
  label?: string;
}

export function Divider({ orientation = "horizontal", weight = "subtle", label }: DividerProps) {
  if (label) {
    return (
      <div className={[s.labeled, s[`weight-${weight}`]].join(" ")} role="separator">
        <span className={s.line} aria-hidden="true" />
        <span className={s.labelText}>{label}</span>
        <span className={s.line} aria-hidden="true" />
      </div>
    );
  }

  return (
    <hr
      className={[
        s.divider,
        s[`weight-${weight}`],
        orientation === "vertical" ? s.vertical : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    />
  );
}
