import type { ReactNode } from "react";
import { CodeChip } from "../CodeChip";
import { Dot } from "../Dot";
import { Pill } from "../Pill";
import { UserAvatar } from "../UserAvatar";
import s from "./ActivityEvent.module.css";

/** Контрольные точки журнала задачи и шаги сессии (шаги — только в ActivityFeed variant="session").
 *  system — служебная запись без автора-участника: задача заведена, лимит возвратов исчерпан, запуск остановлен */
export type ActivityEventKind =
  | "phase"
  | "session"
  | "message"
  | "pr"
  | "decision"
  | "return"
  | "note"
  | "error"
  | "reminder"
  | "system"
  | "files"
  | "check"
  | "push"
  | "ask";

export type ActivityTone = "ink" | "accent" | "warn" | "danger" | "dim";

/** Файл реплики или шага: путь как есть; со ссылкой — CodeChip открывается в новой вкладке */
export interface ActivityFile {
  path: string;
  href?: string | undefined;
}

/** Одна запись журнала: маркер, кто и что сделал одной строкой, причина второй строкой, время справа */
export interface ActivityEventProps {
  /** Вид записи; phase — глава журнала: переход фазы с Pill тона ink */
  kind: ActivityEventKind;
  /** Цвет точки по смыслу; по умолчанию — по виду (см. README) */
  tone?: ActivityTone | undefined;
  /** Кто: роль, человек, «Hireminds», «Linear». У message — ещё и аватар */
  actor?: string | undefined;
  /** Время события: Date, ISO-строка или миллисекунды; выводится «09:14», день — заголовком журнала */
  time: Date | string | number;
  /** Что произошло, одной строкой после actor; идентификаторы — CodeChip. У phase — название фазы: «Code → Review» */
  children?: ReactNode;
  /** Вторая строка: только причина или ссылка; одна строка, лишнее обрезается */
  detail?: ReactNode;
  /** Реплика роли: итог работы или сообщение */
  quote?: ReactNode;
  /** Файлы реплики или шага — CodeChip */
  files?: (string | ActivityFile)[] | undefined;
  /** Итог: решение («Утверждено») или результат проверки — Pill */
  pill?: ReactNode;
}

/** Тон точки по виду, если tone не задан */
export const ACTIVITY_TONE: Record<ActivityEventKind, ActivityTone> = {
  phase: "ink",
  session: "ink",
  message: "ink",
  pr: "accent",
  decision: "ink",
  return: "warn",
  note: "warn",
  error: "danger",
  reminder: "warn",
  system: "ink",
  files: "ink",
  check: "ink",
  push: "ink",
  ask: "ink",
};

const toDate = (t: Date | string | number) => (t instanceof Date ? t : new Date(t));
const hhmm = (d: Date) => d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

export function ActivityEvent({ kind, tone, actor, time, children, detail, quote, files, pill }: ActivityEventProps) {
  const at = toDate(time);
  // некорректное время не роняет журнал: запись выводится без времени
  const stamp = Number.isNaN(at.getTime()) ? (
    <span className={s.time} />
  ) : (
    <time className={s.time} dateTime={at.toISOString()}>
      {hhmm(at)}
    </time>
  );

  if (kind === "phase") {
    return (
      <li className={[s.event, s.phase].join(" ")}>
        <Pill tone="ink">{children}</Pill>
        {detail != null && (
          <span className={s.why} title={typeof detail === "string" ? detail : undefined}>
            {detail}
          </span>
        )}
        <span className={s.rule} aria-hidden="true" />
        {stamp}
      </li>
    );
  }

  const isMessage = kind === "message" && actor;
  return (
    <li className={s.event}>
      <span className={s.mark} aria-hidden="true">
        {isMessage ? (
          <UserAvatar name={actor} size="xs" shape="square" color="var(--ink-3)" />
        ) : (
          <Dot variant="status" tone={tone ?? ACTIVITY_TONE[kind]} size="md" />
        )}
      </span>
      <div className={s.body}>
        <p className={s.line}>
          {actor && <span className={s.actor}>{actor}</span>}
          {actor && children != null ? " " : null}
          {children}
          {pill != null && <span className={s.pill}>{pill}</span>}
        </p>
        {quote != null && <p className={s.quote}>{quote}</p>}
        {files && files.length > 0 && (
          <p className={s.files}>
            {files.map((f) => {
              const file = typeof f === "string" ? { path: f } : f;
              return (
                <CodeChip key={file.path} href={file.href} newTab={!!file.href} title={file.href ? "Открыть в GitHub" : undefined}>
                  {file.path}
                </CodeChip>
              );
            })}
          </p>
        )}
        {detail != null && (
          <p className={s.detail} title={typeof detail === "string" ? detail : undefined}>
            {detail}
          </p>
        )}
      </div>
      {stamp}
    </li>
  );
}
