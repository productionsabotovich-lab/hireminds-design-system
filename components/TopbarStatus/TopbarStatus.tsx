/**
 * Pattern: data/products/hireminds/design/system/patterns/dot.md + caption.md
 * Mockup: https://preview.sabotovich.pro/hireminds/auth-email-sent.html
 *
 * Mono uppercase label with accent dot — used in auth topbar right slot.
 * Replaces inline TopbarStatusDot components in auth pages.
 */
import s from "./TopbarStatus.module.css";

export interface TopbarStatusProps {
  /** Статусный текст — отображается uppercase mono */
  label: string;
}

export function TopbarStatus({ label }: TopbarStatusProps) {
  return (
    <div className={s.root}>
      <span className={s.dot} aria-hidden="true" />
      <span className={s.label}>{label}</span>
    </div>
  );
}
