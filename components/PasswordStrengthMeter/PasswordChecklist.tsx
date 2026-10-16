/**
 * Pattern: data/products/hireminds/design/system/patterns/form-field.md
 * Mockup: https://preview.sabotovich.pro/hireminds/auth-reset-password.html
 *
 * Password requirements checklist: 8+ chars, digit, uppercase, not leaked.
 */

import s from "./PasswordChecklist.module.css";

interface PasswordChecklistProps {
  hasLength: boolean;
  hasDigit: boolean;
  hasUpper: boolean;
  notLeaked: boolean;
  checkingLeak?: boolean;
}

export function PasswordChecklist({ hasLength, hasDigit, hasUpper, notLeaked, checkingLeak }: PasswordChecklistProps) {
  return (
    <div className={s.checklist}>
      <CheckItem ok={hasLength}>8+ символов</CheckItem>
      <CheckItem ok={hasDigit}>хотя бы 1 цифра</CheckItem>
      <CheckItem ok={hasUpper}>хотя бы 1 заглавная</CheckItem>
      <CheckItem ok={notLeaked} loading={checkingLeak}>не из leaked-списка</CheckItem>
    </div>
  );
}

function CheckItem({
  ok,
  loading,
  children,
}: {
  ok: boolean;
  loading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={[s.checkItem, ok ? s.checkItemOk : ""].filter(Boolean).join(" ")}>
      <span className={[s.checkBox, ok ? s.checkBoxOk : ""].filter(Boolean).join(" ")}>
        {loading ? (
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="9" strokeDasharray="50" strokeDashoffset="25" />
          </svg>
        ) : ok ? (
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : null}
      </span>
      <span>{children}</span>
    </div>
  );
}
