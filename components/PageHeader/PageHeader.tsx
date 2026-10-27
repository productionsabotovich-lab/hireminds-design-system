"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { BackLink } from "../BackLink";
import { EntityRef, type EntityKind } from "../EntityRef";
import { H1 } from "../H1";
import { Pill, type PillTone } from "../Pill";
import s from "./PageHeader.module.css";

/** Шапка экрана сущности — задачи, сессии, решения: «←», EntityRef, фаза и состояние, действия; ниже — мелкая строка */
export interface PageHeaderProps {
  /** «←» назад: BackLink variant icon; label — подсказка и имя для читалки: «К задаче PIL-15» */
  back?: { href: string; label: string } | undefined;
  /** Сущность — EntityRef heading */
  entity: { kind: EntityKind; id: string; title?: string | undefined; href?: string | undefined; newTab?: boolean | undefined; hint?: string | undefined };
  /** Фаза — Pill ink, первой в группе бейджей */
  phase?: string | undefined;
  /** Состояние — Pill с точкой после фазы */
  state?: { label: string; tone: PillTone; pulse?: boolean | undefined } | undefined;
  /** Строка 2 — мелкий приглушённый текст через «·»; пусто — строки нет */
  meta?: (string | null | false | undefined)[] | undefined;
  /** Главные действия справа: Button */
  actions?: ReactNode;
}

/** поле слева, в котором помещается висячая «←»: 28px кнопка + space-2 */
const HANG_FIELD = 36;

export function PageHeader({ back, entity: e, phase, state, meta, actions }: PageHeaderProps) {
  const line = (meta ?? []).filter((m): m is string => !!m);
  const root = useRef<HTMLElement>(null);
  // «←» висит слева, только если слева от шапки есть поле не меньше HANG_FIELD; иначе — в строке
  const [hang, setHang] = useState(false);
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !back) return;
    // поле — от левого края ближайшей колонки с прокруткой или обрезкой (боковая колонка, панель), иначе — от окна
    const measure = () => {
      let edge = 0;
      for (let p = el.parentElement; p; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (cs.overflowX !== "visible" || cs.overflowY !== "visible") {
          edge = p.getBoundingClientRect().left + p.clientLeft;
          break;
        }
      }
      setHang(el.getBoundingClientRect().left - edge >= HANG_FIELD);
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    ro?.observe(el);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [back]);
  return (
    <header ref={root} className={[s.hd, hang ? s.hang : ""].filter(Boolean).join(" ")}>
      <div className={s.row}>
        <div className={s.main}>
          <div className={s.title}>
            {/* «←» и заголовок — одна строка: длинное название переносится внутри, «←» остаётся рядом */}
            <span className={s.lead}>
              {/* «←» висит слева от края контента, если там есть поле; иначе — в строке */}
              {back && (
                <span className={s.back}>
                  <BackLink variant="icon" href={back.href}>
                    {back.label}
                  </BackLink>
                </span>
              )}
              <H1 size="section">
                <EntityRef kind={e.kind} id={e.id} title={e.title} href={e.href} newTab={e.newTab} hint={e.hint} size="heading" />
              </H1>
            </span>
            {(phase || state) && (
              // бейджи плотной группой: сначала фаза, потом состояние
              <span className={s.badges}>
                {phase && (
                  <Pill tone="ink">
                    <span className={s.srOnly}>фаза </span>
                    {phase}
                  </Pill>
                )}
                {state && (
                  <Pill tone={state.tone} dot pulse={!!state.pulse}>
                    {state.label}
                  </Pill>
                )}
              </span>
            )}
          </div>
          {line.length > 0 && <p className={s.meta}>{line.join(" · ")}</p>}
        </div>
        {actions != null && <div className={s.actions}>{actions}</div>}
      </div>
    </header>
  );
}
