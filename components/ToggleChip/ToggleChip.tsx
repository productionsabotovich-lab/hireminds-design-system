"use client";

import s from "./ToggleChip.module.css";

/** Чип-переключатель режима: тумблер и подпись в одной кнопке, без рамки — «Подробно» над лентой */
export interface ToggleChipProps {
  /** Подпись: «Подробно» */
  label: string;
  /** Включён */
  pressed: boolean;
  /** Новое значение по клику */
  onChange?: ((pressed: boolean) => void) | undefined;
  /** Подсказка: что включает режим */
  hint?: string | undefined;
  disabled?: boolean | undefined;
}

export function ToggleChip({ label, pressed, onChange, hint, disabled = false }: ToggleChipProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      className={[s.chip, pressed ? s.on : ""].filter(Boolean).join(" ")}
      title={hint}
      disabled={disabled}
      onClick={() => onChange?.(!pressed)}
    >
      <span className={s.track} aria-hidden="true">
        <span className={s.knob} />
      </span>
      {label}
    </button>
  );
}
