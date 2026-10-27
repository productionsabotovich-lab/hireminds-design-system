import { Caption } from "../Caption";
import s from "./PlanProgress.module.css";

/** Прогресс плана сессии: «План 3 из 6» и одна тонкая сплошная полоса при любом числе пунктов */
export interface PlanProgressProps {
  /** Выполнено пунктов; null — план от раннера ещё не получен */
  done: number | null;
  /** Всего пунктов плана */
  total?: number | undefined;
  /** Подпись перед числом; по умолчанию «План»; "" — без подписи (число уже в заголовке плана) */
  label?: string | undefined;
}

export function PlanProgress({ done, total = 0, label = "План" }: PlanProgressProps) {
  if (done == null || total <= 0) {
    return (
      <span className={s.root}>
        <Caption font="mono" tone="dim">
          План ещё не получен
        </Caption>
      </span>
    );
  }
  const n = Math.min(Math.max(done, 0), total);
  return (
    <span className={s.root} role="img" aria-label={`${label || "План"}: выполнено ${n} из ${total}`}>
      {label !== "" && (
        <Caption font="mono" tone="dim">
          {`${label} ${n} из ${total}`}
        </Caption>
      )}
      {/* сплошная полоса без сегментов: при 26 пунктах сегменты не различить */}
      <span className={s.bar} aria-hidden="true">
        <i style={{ width: `${Math.round((n / total) * 100)}%` }} />
      </span>
    </span>
  );
}
