import type { ReactNode } from "react";
import { Caption } from "../Caption";
import { CodeChip } from "../CodeChip";
import { Dot } from "../Dot";
import { IconArrow } from "../IconArrow";
import { PlanProgress } from "../PlanProgress";
import { UserAvatar } from "../UserAvatar";
import s from "./SessionLive.module.css";

export type SessionLiveStatus = "running" | "starting" | "answering" | "retrying";

/** Что агент делает сейчас: widget — закреплённая ссылка в «Сессию агента»; now — строка «Сейчас» на экране сессии */
export interface SessionLiveProps {
  /** widget — карточка задачи; now — экран сессии (уточняется макетом HIR-32) */
  variant?: "widget" | "now" | undefined;
  /** running — идёт; starting — плана ещё нет; answering — отвечает на вопрос после шага; retrying — повтор после технической ошибки */
  status?: SessionLiveStatus | undefined;
  /** Роль: «Developer» — аватар и заголовок */
  role: string;
  /** Сессия: «S-118» */
  sessionId: string;
  /** Ссылка в «Сессию агента»; весь widget — ссылка */
  href?: string | undefined;
  /** Пометка возобновления: с транскриптом или без; null — первая работа */
  resumed?: "transcript" | "no-transcript" | null | undefined;
  /** План от раннера; null — «План ещё не получен». current — название текущего пункта (now) */
  plan?: { done: number; total: number; current?: string | undefined } | null | undefined;
  /** Текущая операция одной фразой: «запускает проверки проекта» */
  operation: ReactNode;
  /** now: технический хвост операции моноширинным — CodeChip: «npm test -- members» */
  detail?: string | undefined;
  /** Начало работы (пробуждения): время «23 мин» считается от него */
  since: Date | number | string;
  /** Запрос обновления: «обновляется» вместо времени */
  loading?: boolean | undefined;
}

const STATUS: Record<SessionLiveStatus, { label: string; tone: "ink" | "warn" }> = {
  running: { label: "идёт", tone: "ink" },
  starting: { label: "идёт", tone: "ink" },
  answering: { label: "отвечает", tone: "ink" },
  retrying: { label: "повтор", tone: "warn" },
};

/** «менее минуты», «23 мин», «1 ч 05 мин» */
export function formatElapsed(since: Date | number | string, now: number = Date.now()) {
  const min = Math.floor((now - new Date(since).getTime()) / 60000);
  if (min < 1) return "менее минуты";
  if (min < 60) return `${min} мин`;
  return `${Math.floor(min / 60)} ч ${String(min % 60).padStart(2, "0")} мин`;
}

export function SessionLive({
  variant = "widget",
  status = "running",
  role,
  sessionId,
  href,
  resumed = null,
  plan = null,
  operation,
  detail,
  since,
  loading = false,
}: SessionLiveProps) {
  const st = STATUS[status];
  const time = loading ? "обновляется" : formatElapsed(since);
  const planned = status === "starting" ? null : plan;
  const marker = (
    <span className={s.status}>
      <Dot variant="status" tone={st.tone} size="md" pulse />
      <span className={st.tone === "warn" ? s.statusWarn : undefined}>{st.label}</span>
    </span>
  );

  if (variant === "now") {
    return (
      <div className={s.now} aria-live="polite">
        <span className={s.nowHead}>
          <Caption font="mono" tone="mute">{status === "retrying" ? "Повтор" : "Сейчас"}</Caption>
          {marker}
          <span className={s.nowTime}>{time}</span>
        </span>
        <span className={s.nowOp}>{operation}</span>
        {detail && <CodeChip size="sm">{detail}</CodeChip>}
        {planned && (
          <span className={s.nowPlan}>
            {planned.current && (
              <Caption font="ui" tone="mute">{`Пункт ${Math.min(planned.done + 1, planned.total)} из ${planned.total} · ${planned.current}`}</Caption>
            )}
            <PlanProgress done={planned.done} total={planned.total} live={status !== "retrying"} />
          </span>
        )}
      </div>
    );
  }

  const resumedText = resumed === "transcript" ? "Возобновлена" : resumed === "no-transcript" ? "Возобновлена без транскрипта" : "Идёт";
  const aria =
    `${role}, сессия ${sessionId}, ${st.label}` +
    (planned ? `, план ${planned.done} из ${planned.total}` : "") +
    `. Сейчас: ${typeof operation === "string" ? operation : ""}. Открыть «Сессию агента»`;

  return (
    <div className={s.box}>
    <a className={s.widget} href={href} aria-label={aria}>
      <span className={s.lead}>
        <UserAvatar name={role} size="sm" shape="square" color="var(--ink-3)" />
      </span>
      <span className={s.head}>
        <span className={s.title}>
          {role} · сессия {sessionId}
        </span>
        {marker}
      </span>
      <span className={s.go} aria-hidden="true">
        <IconArrow size={14} />
      </span>
      <span className={s.meta}>
        <span className={resumed === "no-transcript" ? s.noTranscript : undefined}>{resumedText}</span> · {time}
      </span>
      <span className={s.plan}>
        <PlanProgress done={planned ? planned.done : null} total={planned?.total} live={status !== "retrying"} />
      </span>
      <span className={s.op}>
        <span className={s.opKey}>Сейчас: </span>
        {operation}
      </span>
    </a>
    </div>
  );
}
