import type { CSSProperties } from "react";
import { Caption } from "../Caption";
import s from "./PlanProgress.module.css";

/** Индикатор плана сессии сегментами: «План 3 из 6» и дорожка; без плана — «План ещё не получен» */
export interface PlanProgressProps {
  /** Выполнено пунктов; null — план от раннера ещё не получен */
  done: number | null;
  /** Всего пунктов плана */
  total?: number | undefined;
  /** Сессия идёт: текущий сегмент пульсирует вместе с точкой «идёт» */
  live?: boolean | undefined;
  /** Подпись перед числом; по умолчанию «План» */
  label?: string | undefined;
}

export function PlanProgress({ done, total = 0, live = false, label = "План" }: PlanProgressProps) {
  if (done == null || total <= 0) {
    return (
      <span className={s.root}>
        <Caption font="mono" tone="dim">План ещё не получен</Caption>
      </span>
    );
  }
  const n = Math.min(Math.max(done, 0), total);
  const segments = Array.from({ length: total }, (_, i) =>
    i < n ? s.done : i === n && live ? s.now : undefined,
  );
  return (
    <span className={s.root} role="img" aria-label={`${label}: выполнено ${n} из ${total}`}>
      <Caption font="mono" tone="dim">{`${label} ${n} из ${total}`}</Caption>
      <span className={s.track} style={{ "--n": total } as CSSProperties} aria-hidden="true">
        {segments.map((cls, i) => (
          <i key={i} className={cls} />
        ))}
      </span>
    </span>
  );
}
