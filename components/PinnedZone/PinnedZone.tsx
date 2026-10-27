import { Children, type ReactNode } from "react";
import s from "./PinnedZone.module.css";

/** Закреплённая зона над журналом: то, что ждёт действия или идёт сейчас; при прокрутке остаётся под шапкой */
export interface PinnedZoneProps {
  /** По порядку: решение (DecisionCard) — выше идущей сессии (SessionLive widget) */
  children?: ReactNode;
  /** Имя зоны для читалки */
  label?: string | undefined;
  /** Отступ сверху при прокрутке, px: высота шапки сайта; по умолчанию 52 (Topbar 50 + рамка и зазор) */
  top?: number | undefined;
}

export function PinnedZone({ children, label = "Сейчас по задаче", top = 52 }: PinnedZoneProps) {
  const kids = Children.toArray(children).filter(Boolean);
  // нечего закреплять — зоны нет
  if (!kids.length) return null;
  return (
    <div className={s.pin} role="region" aria-label={label} style={{ top: `calc(env(safe-area-inset-top, 0px) + ${top}px)` }}>
      {kids}
    </div>
  );
}
