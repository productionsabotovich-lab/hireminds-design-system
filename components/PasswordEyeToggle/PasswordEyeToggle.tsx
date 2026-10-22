/**
 * Pattern: data/products/hireminds/design/system/patterns/form-field.md
 * Mockup: https://preview.sabotovich.pro/hireminds/auth-login.html
 *
 * Show/hide password toggle button for password inputs.
 */

import s from "./PasswordEyeToggle.module.css";

interface PasswordEyeToggleProps {
  visible: boolean;
  onToggle: () => void;
  className?: string | undefined;
}

export function PasswordEyeToggle({ visible, onToggle, className }: PasswordEyeToggleProps) {
  return (
    <button
      type="button"
      className={[s.eye, className].filter(Boolean).join(" ")}
      aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
      onClick={onToggle}
      tabIndex={-1}
    >
      {visible ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  );
}
