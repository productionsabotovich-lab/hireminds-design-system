/**
 * Pattern: data/products/hireminds/design/system/patterns/terminal.md
 *
 * Универсальный тёмный терминальный блок. Три варианта:
 *   mac    — заголовок с traffic-lights (VAULT.VERIFY, settings-llm)
 *   log    — лента событий без заголовка (tick.log в dashboard)
 *   config — key-value конфиг с зелёной точкой (workspace.config)
 *
 * Sub-components (не импортируй TerminalBox.module.css напрямую):
 *   TerminalLine     — строка: timestamp + who + msg
 *   TerminalLineOK   — строка с ✓ prefix
 *   TerminalLineArr  — строка с → prefix
 *   TerminalKV       — key-value пара
 *   TerminalDim      — приглушённый span
 *   TerminalAcc      — акцентный span (зелёный)
 *   TerminalWho      — span имени агента/источника
 *   TerminalMuted    — span muted-текста
 *   TerminalPulse    — мигающий курсор
 */

import React from "react";
import s from "./TerminalBox.module.css";

export type TerminalVariant = "mac" | "log" | "config";

export interface TerminalBoxProps {
  variant: TerminalVariant;
  /** Только для variant="mac" — текст в title bar */
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalBox({
  variant,
  title,
  children,
  className,
}: TerminalBoxProps) {
  return (
    <div className={`${s.root} ${s[variant]}${className ? ` ${className}` : ""}`}>
      {variant === "mac" && (
        <div className={s.macHd}>
          <div className={s.dots}>
            <span />
            <span />
            <span />
          </div>
          {title && <div className={s.macTtl}>{title}</div>}
        </div>
      )}
      {variant === "config" && (
        <div className={s.configHd}>
          <span className={s.configDot} />
          {title && <span className={s.configTtl}>{title}</span>}
        </div>
      )}
      <div className={s.body}>{children}</div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

interface TerminalLineProps {
  timestamp?: React.ReactNode;
  children: React.ReactNode;
}

/** Базовая строка лога: timestamp + содержимое */
export function TerminalLine({ timestamp, children }: TerminalLineProps) {
  return (
    <div className={s.line}>
      {timestamp !== undefined && (
        <span className={s.timestamp}>{timestamp}</span>
      )}
      <span className={s.msg}>{children}</span>
    </div>
  );
}

/** Строка с ✓ — успешное событие */
export function TerminalLineOK({ timestamp, children }: TerminalLineProps) {
  return (
    <div className={s.line}>
      {timestamp !== undefined && (
        <span className={s.timestamp}>{timestamp}</span>
      )}
      <span className={`${s.ok} ${s.msg}`}>{children}</span>
    </div>
  );
}

/** Строка с → — указание / следующий шаг */
export function TerminalLineArr({ timestamp, children }: TerminalLineProps) {
  return (
    <div className={s.line}>
      {timestamp !== undefined && (
        <span className={s.timestamp}>{timestamp}</span>
      )}
      <span className={`${s.arr} ${s.msg}`}>{children}</span>
    </div>
  );
}

interface TerminalKVProps {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}

/** Key-value пара для variant="config" */
export function TerminalKV({ label, children, accent = false }: TerminalKVProps) {
  return (
    <div className={s.kv}>
      <span className={s.kvKey}>{label}</span>
      <span className={accent ? s.kvValAcc : s.kvVal}>{children}</span>
    </div>
  );
}

/** Приглушённый span (#707880) */
export function TerminalDim({ children }: { children: React.ReactNode }) {
  return <span className={s.dim}>{children}</span>;
}

/** Акцентный span (зелёный oklch) */
export function TerminalAcc({ children }: { children: React.ReactNode }) {
  return <span className={s.acc}>{children}</span>;
}

/** Span имени агента / источника (цвет --accent) */
export function TerminalWho({ children }: { children: React.ReactNode }) {
  return <span className={s.who}>{children}</span>;
}

/** Muted-текст (#707880, alias к dim для семантики "не важно") */
export function TerminalMuted({ children }: { children: React.ReactNode }) {
  return <span className={s.muted}>{children}</span>;
}

/** Мигающий курсор — вставляй inline внутри msg */
export function TerminalPulse() {
  return <span className={s.pulse} />;
}
