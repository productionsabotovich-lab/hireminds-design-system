"use client";
/**
 * Pattern: data/products/hireminds/design/system/patterns/input.md
 */

import { useState } from "react";
import { PasswordEyeToggle } from "../PasswordEyeToggle";
import styles from "./Input.module.css";

/** Input — text, password, email with label, error, eye toggle */
export interface InputProps {
  id: string;
  type?: "text" | "password" | "email" | undefined;
  label?: string | undefined;
  placeholder?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  error?: string | undefined;
  disabled?: boolean | undefined;
  autoComplete?: string | undefined;
  /** Font family: "ui" (default Inter) or "mono" (Geist Mono) */
  font?: "ui" | "mono" | undefined;
  onChange?: ((value: string) => void) | undefined;
  onBlur?: (() => void) | undefined;
  className?: string | undefined;
}

/**
 * Atomic input component with optional label and inline error.
 * Password type gets an eye-toggle button automatically.
 *
 * Props-driven for Generative UI:
 * `{ id: "email", type: "email", label: "Email", error: "Required" }`
 *
 * Styling: CSS Modules (Input.module.css). Design tokens from globals.css.
 */
export function Input({
  id,
  type = "text",
  label,
  placeholder,
  value,
  defaultValue,
  error,
  disabled = false,
  autoComplete,
  font = "ui",
  onChange,
  onBlur,
  className = "",
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.fieldWrap}>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            styles.field,
            error ? styles.fieldError : "",
            font === "mono" ? styles.mono : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
        />

        {isPassword && (
          <PasswordEyeToggle
            visible={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
            className={styles.eye}
          />
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
