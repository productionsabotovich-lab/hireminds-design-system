"use client";

import { useState, type KeyboardEvent } from "react";
import s from "./Textarea.module.css";

/** Textarea — многострочное поле: подпись, поле, подсказка или ошибка, счётчик */
export interface TextareaProps {
  id: string;
  label?: string | undefined;
  /** Значение; без него поле хранит текст само */
  value?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
  placeholder?: string | undefined;
  /** Подсказка под полем */
  help?: string | undefined;
  /** Текст ошибки; заменяет подсказку */
  error?: string | undefined;
  /** Высота в строках */
  rows?: number | undefined;
  /** Предел символов; показывает счётчик «n / max» */
  maxLength?: number | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  /** Клавиши в поле: выбор из подсказки (CommentForm) */
  onKeyDown?: ((e: KeyboardEvent<HTMLTextAreaElement>) => void) | undefined;
  /** Поле с подсказкой-списком: role="combobox", aria-controls, aria-expanded, aria-activedescendant */
  combobox?: { listId: string; expanded: boolean; activeId?: string | undefined } | undefined;
}

/**
 * Многострочный аналог Input и Field: те же подпись, рамка и фокус.
 * Props-driven: `{ id: "reason", label: "Причина возврата", required: true, error: "Укажите причину" }`
 */
export function Textarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  help,
  error,
  rows = 3,
  maxLength,
  required = false,
  disabled = false,
  onKeyDown,
  combobox,
}: TextareaProps) {
  const [inner, setInner] = useState("");
  const text = value ?? inner;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const countId = `${id}-count`;
  const describedBy = [error ? errorId : help ? helpId : null, maxLength ? countId : null].filter(Boolean).join(" ");

  return (
    <div className={s.wrap}>
      {label && (
        <label htmlFor={id} className={s.label}>
          {label}
          {required && <span className={s.req}> · обязательно</span>}
        </label>
      )}

      <textarea
        id={id}
        rows={rows}
        value={text}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        role={combobox ? "combobox" : undefined}
        aria-autocomplete={combobox ? "list" : undefined}
        aria-controls={combobox?.listId}
        aria-expanded={combobox ? combobox.expanded : undefined}
        aria-activedescendant={combobox?.expanded ? combobox.activeId : undefined}
        onKeyDown={onKeyDown}
        className={[s.field, error ? s.fieldError : ""].filter(Boolean).join(" ")}
        onChange={(e) => {
          if (value === undefined) setInner(e.target.value);
          onChange?.(e.target.value);
        }}
      />

      {(error || help || maxLength) && (
        <div className={s.foot}>
          {error ? (
            <p id={errorId} className={s.error} role="alert">
              {error}
            </p>
          ) : help ? (
            <p id={helpId} className={s.help}>
              {help}
            </p>
          ) : (
            <span />
          )}
          {maxLength && (
            <span id={countId} className={s.count}>
              {text.length} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
