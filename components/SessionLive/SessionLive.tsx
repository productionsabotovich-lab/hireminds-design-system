import type { ReactNode } from "react";
import { CodeChip } from "../CodeChip";
import { Dot } from "../Dot";
import { EntityRef } from "../EntityRef";
import { IconArrow } from "../IconArrow";
import { Pill } from "../Pill";
import { PlanProgress } from "../PlanProgress";
import { UserAvatar } from "../UserAvatar";
import s from "./SessionLive.module.css";

export type SessionLiveStatus = "running" | "starting" | "answering" | "retrying";

/** Что агент делает сейчас: widget — закреплённый виджет в карточке задачи (весь — ссылка); now — последняя строка ленты */
export interface SessionLiveProps {
  /** widget — карточка задачи, состояние «В работе»; now — слот live у ActivityFeed */
  variant?: "widget" | "now" | undefined;
  /** running — идёт; starting — плана ещё нет; answering — отвечает на вопрос после шага; retrying — повтор после ошибки */
  status?: SessionLiveStatus | undefined;
  /** Текущая операция одной фразой: «запускает проверки проекта» */
  operation: ReactNode;
  /** now: технический хвост операции — CodeChip: «npm test -- members» */
  detail?: string | undefined;
  /** Сколько идёт: «25 мин» (строку считает экран) */
  elapsed?: string | undefined;
  /** Запрос обновления: «обновляется» вместо времени */
  loading?: boolean | undefined;
  /** widget: роль — аватар и заголовок */
  role?: string | undefined;
  /** widget: сессия «S-118» */
  sessionId?: string | undefined;
  /** widget: ссылка в «Сессию агента»; весь виджет — ссылка */
  href?: string | undefined;
  /** widget: transcript — «Возобновлена»; no-transcript — «Возобновлена без транскрипта»; null — «Идёт» */
  resumed?: "transcript" | "no-transcript" | null | undefined;
  /** widget: план от раннера; null — «План ещё не получен» */
  plan?: { done: number; total: number } | null | undefined;
}

const STATUS: Record<SessionLiveStatus, { label: string; tone: "accent" | "warn" }> = {
  running: { label: "идёт", tone: "accent" },
  starting: { label: "идёт", tone: "accent" },
  answering: { label: "отвечает", tone: "accent" },
  retrying: { label: "повтор", tone: "warn" },
};

export function SessionLive({
  variant = "widget",
  status = "running",
  operation,
  detail,
  elapsed,
  loading = false,
  role = "",
  sessionId = "",
  href,
  resumed = null,
  plan = null,
}: SessionLiveProps) {
  const st = STATUS[status];
  const time = loading ? "обновляется" : elapsed;

  if (variant === "now") {
    // последняя строка ленты: живая точка, «Сейчас» или «Повтор», операция, деталь, время
    return (
      <div className={s.now} role="status">
        <span className={s.nowMark} aria-hidden="true">
          <Dot variant="status" tone={st.tone} size="md" pulse />
        </span>
        <p className={s.nowLine}>
          <span className={s.nowKey}>{status === "retrying" ? "Повтор: " : "Сейчас: "}</span>
          {operation}
          {detail && (
            <>
              {" "}
              <CodeChip size="sm">{detail}</CodeChip>
            </>
          )}
          {time && <span className={s.nowSub}> · {time}</span>}
        </p>
        <span className={s.nowTime}>сейчас</span>
      </div>
    );
  }

  const planned = status === "starting" ? null : plan;
  const resumedText = resumed === "transcript" ? "Возобновлена" : resumed === "no-transcript" ? "Возобновлена без транскрипта" : "Идёт";
  const aria =
    `${role}, сессия ${sessionId}, ${st.label}` +
    (planned ? `, план ${planned.done} из ${planned.total}` : "") +
    (typeof operation === "string" ? `. Сейчас: ${operation}` : "") +
    ". Открыть «Сессию агента»";

  return (
    <a className={s.widget} href={href} aria-label={aria}>
      <span className={s.lead}>
        <UserAvatar name={role} size="sm" shape="square" color="var(--ink-3)" />
      </span>
      <span className={s.head}>
        <span className={s.title}>
          <EntityRef kind="session" id={sessionId} /> · {role}
        </span>
        <Pill tone={st.tone} dot pulse>
          {st.label}
        </Pill>
        {/* «Возобновлена · 25 мин» — в первой строке сразу после Pill, мелко и приглушённо */}
        <span className={s.meta}>
          {resumedText}
          {time && ` · ${time}`}
        </span>
      </span>
      <span className={s.go} aria-hidden="true">
        <IconArrow size={14} />
      </span>
      <span className={s.plan}>
        <PlanProgress done={planned ? planned.done : null} total={planned?.total} />
      </span>
      <span className={s.op}>
        <span className={s.opKey}>Сейчас: </span>
        {operation}
      </span>
    </a>
  );
}
