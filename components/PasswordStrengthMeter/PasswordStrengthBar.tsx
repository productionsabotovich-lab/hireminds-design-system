/**
 * Pattern: data/products/hireminds/design/system/patterns/form-field.md
 * Mockup: https://preview.sabotovich.pro/hireminds/auth-reset-password.html
 *
 * 4-segment colored bar + label row for password strength display.
 */

import s from "./PasswordStrengthBar.module.css";

interface PasswordStrengthBarProps {
  score: number;
  feedback: string;
}

const scoreColors: Record<number, string> = {
  0: "var(--danger)",
  1: "var(--danger)",
  2: "var(--warn)",
  3: "var(--accent)",
  4: "var(--accent)",
};

export function PasswordStrengthBar({ score, feedback }: PasswordStrengthBarProps) {
  const barColor = scoreColors[score] ?? "var(--accent)";

  return (
    <>
      <div className={s.bar} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={s.segment}
            style={{ background: i < score ? barColor : "var(--inset)" }}
          />
        ))}
      </div>
      <div className={s.labelRow}>
        <span>надёжность пароля</span>
        {feedback && (
          <span
            className={score >= 3 ? s.scoreLabelStrong : s.scoreLabel}
            style={{ color: barColor }}
          >
            {feedback}
          </span>
        )}
      </div>
    </>
  );
}
