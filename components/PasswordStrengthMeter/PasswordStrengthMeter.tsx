"use client";
/**
 * Pattern: data/products/hireminds/design/system/patterns/password-strength.md
 */

import { useEffect, useState } from "react";
import { PasswordStrengthBar } from "./PasswordStrengthBar";
import { PasswordChecklist } from "./PasswordChecklist";
import { scorePassword, checkPwnedPassword } from "./password-utils";
import styles from "./PasswordStrengthMeter.module.css";

export interface PasswordStrengthMeterProps {
  password: string;
  checkLeaked?: boolean;
  onLeakedChange?: (leaked: boolean) => void;
  onScoreChange?: (score: number) => void;
  className?: string;
}

/**
 * PasswordStrengthMeter — composite: PasswordStrengthBar + PasswordChecklist.
 *
 * Mirrors e1-reset-password.html strength meter + checklist.
 * Styling: CSS Modules. Design tokens from globals.css.
 */
export function PasswordStrengthMeter({
  password,
  checkLeaked = false,
  onLeakedChange,
  onScoreChange,
  className,
}: PasswordStrengthMeterProps) {
  const [leaked, setLeaked] = useState(false);
  const [checkingLeak, setCheckingLeak] = useState(false);

  const { score, feedback } = scorePassword(password);
  const hasLength = password.length >= 8;
  const hasDigit = /[0-9]/.test(password);
  const hasUpper = /[A-Z]/.test(password);

  useEffect(() => {
    onScoreChange?.(score);
  }, [score, onScoreChange]);

  useEffect(() => {
    if (!checkLeaked || password.length < 8) {
      if (leaked) {
        setLeaked(false);
        onLeakedChange?.(false);
      }
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setCheckingLeak(true);
      const result = await checkPwnedPassword(password);
      if (!cancelled) {
        setLeaked(result);
        onLeakedChange?.(result);
        setCheckingLeak(false);
      }
    }, 600);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [password, checkLeaked]); // eslint-disable-line react-hooks/exhaustive-deps

  if (password.length === 0) return null;

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <PasswordStrengthBar score={score} feedback={feedback} />
      <PasswordChecklist
        hasLength={hasLength}
        hasDigit={hasDigit}
        hasUpper={hasUpper}
        notLeaked={!leaked && password.length >= 8}
        checkingLeak={checkingLeak}
      />
    </div>
  );
}
