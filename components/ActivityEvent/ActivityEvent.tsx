"use client";

import { useState, type ReactNode } from "react";
import { CodeChip } from "../CodeChip";
import { DiffView, type DiffHunk } from "../DiffView";
import { Dot } from "../Dot";
import { Icon, type IconName } from "../Icon";
import { IconArrow } from "../IconArrow";
import { Pill } from "../Pill";
import { DiffStat } from "../PullRequestSummary";
import { TerminalBox, TerminalLine } from "../TerminalBox";
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
  | "ask"
  | "step"
  | "run";

export type ActivityTone = "ink" | "accent" | "warn" | "danger" | "dim";

/** Файл реплики или шага: путь как есть; со ссылкой — CodeChip открывается в новой вкладке */
export interface ActivityFile {
  path: string;
  href?: string | undefined;
  additions?: number | undefined;
  deletions?: number | undefined;
  /** Изменения: чип файла — кнопка, раскрывает DiffView под записью */
  diff?: DiffHunk[] | undefined;
}

/** Вид шага агента — как в модели событий ACP: read, edit, search, execute, fetch, think */
export type ActivityStepKind = "read" | "edit" | "search" | "execute" | "fetch" | "think";

/** Шаг агента: вид — иконкой слева, инструмент — CodeChip sm как есть (Grep, Read, Edit, Bash), аргумент */
export interface ActivityStep {
  kind: ActivityStepKind;
  /** Инструмент как есть, обычным регистром: «Grep», «Read», «Bash» */
  tool?: string | undefined;
  /** Аргумент: путь, запрос, команда */
  arg?: string | undefined;
}

/** Итог вызова: строка обычным шрифтом; вывод — TerminalBox по «показать вывод» (в «Подробно» — раскрыт) */
export interface ActivityResult {
  summary: string;
  /** false — ошибка: строка danger-ink */
  ok?: boolean | undefined;
  out?: string[] | undefined;
}

/** Иконка вида шага */
export const STEP_ICON: Record<ActivityStepKind, IconName> = {
  read: "eye",
  edit: "pencil",
  search: "search",
  execute: "runner",
  fetch: "globe",
  think: "brain",
};

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
  /** Слот имени автора вместо текста actor: PersonRef с карточкой участника */
  author?: ReactNode;
  /** step: шаг агента */
  step?: ActivityStep | undefined;
  /** step: итог вызова */
  result?: ActivityResult | undefined;
  /** Режим «Подробно»: вывод и diff раскрыты */
  detailed?: boolean | undefined;
  /** run, phase: действие вместо времени — «показать 12 шагов» */
  action?: ReactNode;
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
  step: "ink",
  run: "ink",
};

const toDate = (t: Date | string | number) => (t instanceof Date ? t : new Date(t));
const hhmm = (d: Date) => d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

function Result({ result, detailed }: { result: ActivityResult; detailed: boolean }) {
  const [open, setOpen] = useState<boolean | null>(null);
  const shown = open ?? detailed;
  return (
    <div className={s.res}>
      <span className={[s.resLine, result.ok === false ? s.resFail : ""].filter(Boolean).join(" ")}>
        {result.summary}
        {result.out && result.out.length > 0 && (
          <button type="button" className={s.linkBtn} aria-expanded={shown} onClick={() => setOpen(!shown)}>
            {shown ? "свернуть вывод" : "показать вывод"}
          </button>
        )}
      </span>
      {shown && result.out && (
        <TerminalBox variant="log">
          {result.out.map((o, j) => (
            <TerminalLine key={j}>{o}</TerminalLine>
          ))}
        </TerminalBox>
      )}
    </div>
  );
}

/** Файлы записи: чип с diff — кнопка, раскрывает DiffView под записью; в «Подробно» — раскрыт */
function Files({ files, detailed }: { files: (string | ActivityFile)[]; detailed: boolean }) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const list = files.map((f) => (typeof f === "string" ? { path: f } : f));
  const isOpen = (f: ActivityFile) => (f.path in openMap ? openMap[f.path] : detailed);
  const stat = (f: ActivityFile) =>
    f.additions != null && f.deletions != null ? <DiffStat additions={f.additions} deletions={f.deletions} /> : null;
  return (
    <>
      <p className={s.files}>
        {list.map((f) => {
          if (!f.diff)
            return (
              <span key={f.path} className={s.file}>
                <CodeChip href={f.href} newTab={!!f.href} title={f.href ? "Открыть в GitHub" : undefined}>
                  {f.path}
                </CodeChip>
                {stat(f)}
              </span>
            );
          const on = isOpen(f);
          return (
            <button
              key={f.path}
              type="button"
              className={[s.file, s.fileBtn].join(" ")}
              aria-expanded={on}
              title={on ? `Свернуть изменения ${f.path}` : `Показать изменения ${f.path}`}
              onClick={() => setOpenMap({ ...openMap, [f.path]: !on })}
            >
              <CodeChip>{f.path}</CodeChip>
              {stat(f)}
              <span className={s.chev} aria-hidden="true">
                <IconArrow variant="chevron" direction={on ? "up" : "down"} size={11} />
              </span>
            </button>
          );
        })}
      </p>
      {list
        .filter((f) => f.diff && isOpen(f))
        .map((f) => (
          <div key={`d${f.path}`} className={s.diff}>
            <DiffView path={f.path} hunks={f.diff!} />
          </div>
        ))}
    </>
  );
}

export function ActivityEvent({ kind, tone, actor, time, children, detail, quote, files, pill, author, step, result, detailed = false, action }: ActivityEventProps) {
  const at = toDate(time);
  // некорректное время не роняет журнал: запись выводится без времени
  const stamp = Number.isNaN(at.getTime()) ? (
    <span className={s.time} />
  ) : (
    <time className={s.time} dateTime={at.toISOString()}>
      {hhmm(at)}
    </time>
  );

  if (kind === "phase" || kind === "run") {
    return (
      <li className={[s.event, s.phase].join(" ")}>
        {/* run — разделитель запуска: «Запуск 2» текстом, причина, линия, «показать N шагов» */}
        {kind === "phase" ? <Pill tone="ink">{children}</Pill> : <span className={s.runLabel}>{children}</span>}
        {detail != null && (
          <span className={s.why} title={typeof detail === "string" ? detail : undefined}>
            {detail}
          </span>
        )}
        <span className={s.rule} aria-hidden="true" />
        {action ?? stamp}
      </li>
    );
  }

  const isMessage = kind === "message" && actor;
  return (
    <li className={s.event}>
      <span className={s.mark} aria-hidden="true">
        {isMessage ? (
          <UserAvatar name={actor} size="xs" shape="square" color="var(--ink-3)" />
        ) : kind === "step" && step ? (
          // вид шага — иконкой
          <span className={[s.ic, s[`tone-${tone ?? "ink"}`]].join(" ")}>
            <Icon name={STEP_ICON[step.kind]} size={14} />
          </span>
        ) : (
          <Dot variant="status" tone={tone ?? ACTIVITY_TONE[kind]} size="md" />
        )}
      </span>
      <div className={s.body}>
        <p className={s.line}>
          {author ?? (actor && <span className={s.actor}>{actor}</span>)}
          {(author != null || actor) && (children != null || step) ? " " : null}
          {step?.tool && (
            <>
              <CodeChip size="sm">{step.tool}</CodeChip>{" "}
            </>
          )}
          {step?.arg && <span className={s.arg}>{step.arg} </span>}
          {children}
          {pill != null && <span className={s.pill}>{pill}</span>}
        </p>
        {quote != null && <p className={s.quote}>{quote}</p>}
        {files && files.length > 0 && <Files files={files} detailed={detailed} />}
        {result && <Result result={result} detailed={detailed} />}
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
