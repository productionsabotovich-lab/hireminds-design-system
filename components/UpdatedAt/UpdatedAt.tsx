"use client";
/**
 * Data freshness mark: «Обновлено N с назад», ticks every second; «Обновляется» while loading.
 */
import { useEffect, useState } from "react";
import s from "./UpdatedAt.module.css";

export interface UpdatedAtProps {
  /** When data was last received: ms timestamp or Date */
  updatedAt: number | Date;
  /** Request in flight */
  loading?: boolean | undefined;
}

export function formatUpdated(updatedAt: number | Date, now: number): string {
  const sec = Math.max(0, Math.floor((now - +updatedAt) / 1000));
  if (sec < 2) return "Обновлено только что";
  if (sec < 60) return `Обновлено ${sec} с назад`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `Обновлено ${min} мин назад`;
  return `Обновлено ${Math.floor(min / 60)} ч назад`;
}

export function UpdatedAt({ updatedAt, loading = false }: UpdatedAtProps) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [updatedAt]);

  return (
    <span className={s.root} role="status" aria-live="polite">
      {loading ? "Обновляется" : formatUpdated(updatedAt, now)}
    </span>
  );
}
