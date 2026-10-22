"use client";
/**
 * Modal confirmation for a destructive or irreversible action.
 * Focus starts on the safe button; Escape and backdrop click cancel.
 */
import { ReactNode, useEffect, useRef } from "react";
import { Button } from "../Button";
import s from "./ConfirmDialog.module.css";

export interface ConfirmDialogProps {
  open: boolean;
  /** Question: «Отменить запуск?» */
  title: string;
  /** Consequence in one or two sentences */
  children?: ReactNode;
  /** Action verb: «Отменить» */
  confirmLabel: string;
  /** Safe way out */
  cancelLabel?: string;
  /** danger — red confirm button for irreversible actions */
  tone?: "default" | "danger";
  /** Request in flight: confirm shows a spinner, both buttons disabled */
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = "Назад",
  tone = "default",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLButtonElement>("[data-cancel] button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
      if (e.key === "Tab" && panel.current) {
        const btns = Array.from(panel.current.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
        if (!btns.length) return;
        const first = btns[0], last = btns[btns.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open, loading, onCancel]);

  if (!open) return null;
  return (
    <div className={s.backdrop} onMouseDown={(e) => e.target === e.currentTarget && !loading && onCancel()}>
      <div ref={panel} className={s.panel} role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby={children ? "confirm-dialog-text" : undefined}>
        <h2 id="confirm-dialog-title" className={s.title}>{title}</h2>
        {children && <div id="confirm-dialog-text" className={s.text}>{children}</div>}
        <div className={s.actions}>
          <span data-cancel>
            <Button variant="secondary" disabled={loading} onClick={onCancel}>{cancelLabel}</Button>
          </span>
          <Button variant={tone === "danger" ? "danger" : "primary"} loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
