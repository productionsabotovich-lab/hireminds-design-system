"use client";
/**
 * Native select styled like Input: same height, border line-3, accent focus ring.
 */
import s from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id: string;
  label?: string;
  options: SelectOption[];
  value?: string;
  /** Shown first and not selectable again: «Выберите проект» */
  placeholder?: string;
  disabled?: boolean;
  /** md — 36px like Input; sm — 28px for toolbars */
  size?: "sm" | "md";
  /** Label to the left of the control (toolbars) instead of above */
  inlineLabel?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({
  id,
  label,
  options,
  value,
  placeholder,
  disabled = false,
  size = "md",
  inlineLabel = false,
  onChange,
  className = "",
}: SelectProps) {
  return (
    <div className={[s.wrap, inlineLabel ? s.inline : "", className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={id} className={s.label}>
          {label}
        </label>
      )}
      <div className={s.fieldWrap}>
        <select
          id={id}
          value={value ?? (placeholder ? "" : undefined)}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          className={[s.field, s[size]].join(" ")}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg className={s.chevron} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
