"use client";

import { Fragment, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Body } from "../Body";
import { CodeChip } from "../CodeChip";
import { DescriptionList, type DescriptionItem } from "../DescriptionList";
import { Dot } from "../Dot";
import { EntityRef } from "../EntityRef";
import { ExternalLink } from "../ExternalLink";
import { Icon, type IconName } from "../Icon";
import { ListItem, type ListItemTone } from "../ListItem";
import { Pill } from "../Pill";
import { Tooltip } from "../Tooltip";
import { UserAvatar } from "../UserAvatar";
import s from "./TaskSummary.module.css";

/** Состояние задачи у нас: точка тоном и подпись — «В работе», «Ждёт решения» */
export interface TaskSummaryState {
  label: string;
  tone: ListItemTone;
  /** Живое: точка пульсирует */
  pulse?: boolean | undefined;
}

export type TaskPriority = "urgent" | "high" | "medium" | "low";

/** Ссылка на эпик или цель в трекере */
export interface TaskSummaryLink {
  name: string;
  href?: string | undefined;
}

export interface TaskSummaryPerson {
  name: string;
  /** Человек — круглый аватар; агент — квадратный */
  human?: boolean | undefined;
  image?: string | undefined;
}

/** Кусок строки описания: текст, ссылка (ExternalLink inline) или код (CodeChip) */
export type TaskInline = string | { text: string; href: string } | { code: string };

/** Блок описания из трекера: абзац, подзаголовок, список, блок кода, изображения миниатюрами */
export type TaskDescriptionBlock =
  | { type: "p"; text: TaskInline | TaskInline[] }
  | { type: "h"; text: string }
  | { type: "list"; ordered?: boolean | undefined; items: (TaskInline | TaskInline[])[] }
  | { type: "code"; text: string }
  | { type: "images"; items: { src: string; alt: string; href?: string | undefined }[] };

/** Задача из трекера — данные для всех вариантов; пустые поля не рисуются */
export interface TaskSummaryTask {
  /** Ключ: «PIL-15» */
  key: string;
  title: string;
  /** Ссылка на задачу в трекере (открывается в новой вкладке) */
  href?: string | undefined;
  /** Название трекера: «Linear» — в подписях «Открыть в Linear», «Статус в Linear» */
  tracker?: string | undefined;
  /** Состояние у нас */
  state?: TaskSummaryState | undefined;
  /** Статус в трекере: «In Progress» */
  status?: string | undefined;
  priority?: TaskPriority | undefined;
  epic?: TaskSummaryLink | undefined;
  goal?: TaskSummaryLink | undefined;
  assignee?: TaskSummaryPerson | undefined;
  /** Текущая фаза: «Code», «QA» */
  phase?: string | undefined;
  labels?: string[] | undefined;
  cycle?: string | undefined;
  due?: string | undefined;
  created?: string | undefined;
  updated?: string | undefined;
  /** Место в очереди: 2 → «2-я в очереди» */
  queuePosition?: number | undefined;
  /** Строка — один абзац; блоки — форматированный текст */
  description?: string | TaskDescriptionBlock[] | undefined;
}

/** Какие свойства показывать и в какой форме */
export interface TaskSummaryFields {
  /** card — карточка; popover — всплывающая карточка 320px; row — строка списка (внутри List); bare — только описание */
  density: "card" | "popover" | "row" | "bare";
  /** inline — строка метаданных с иконками; grid — строки «подпись — значение» */
  form?: "inline" | "grid" | undefined;
  status?: boolean | undefined;
  priority?: boolean | undefined;
  epic?: boolean | undefined;
  assignee?: boolean | undefined;
  /** true — строкой фазы под метаданными (в grid — строкой сетки); "inline" — бейджем в строке метаданных */
  phase?: boolean | "inline" | undefined;
  /** Строк описания до «Показать полностью»; 0 — без описания */
  description?: 0 | 2 | 3 | undefined;
  labels?: boolean | undefined;
  trackerStatus?: boolean | undefined;
  updated?: boolean | undefined;
  /** grid: цель, цикл, срок, дата заведения */
  details?: boolean | undefined;
  /** «Открыть карточку задачи» внизу (нужен cardHref) */
  openLink?: boolean | undefined;
  queuePosition?: boolean | undefined;
}

export type TaskSummaryPreset = "full" | "side" | "decision" | "row" | "popover" | "queue" | "description";

/** Готовые наборы свойств: вариант → свойства → место (таблица — в README) */
export const TASK_SUMMARY_PRESETS: Record<TaskSummaryPreset, TaskSummaryFields> = {
  full: { density: "card", form: "grid", status: true, priority: true, epic: true, assignee: true, phase: true, labels: true, trackerStatus: true, updated: true, details: true },
  side: { density: "card", status: true, priority: true, epic: true, phase: true, description: 2, openLink: true },
  decision: { density: "card", status: true, phase: "inline", priority: true, openLink: true },
  row: { density: "row", status: true, priority: true, assignee: true },
  popover: { density: "popover", status: true, phase: true, assignee: true, description: 2 },
  queue: { density: "row", priority: true, queuePosition: true },
  description: { density: "bare", description: 3 },
};

/** Задача из трекера одинаково на всех экранах: карточка, «О задаче», строка списка, всплывающая карточка, описание */
export interface TaskSummaryProps {
  task: TaskSummaryTask;
  /** Готовый набор свойств */
  preset?: TaskSummaryPreset | undefined;
  /** Поправки к набору: включить или выключить отдельные свойства */
  fields?: Partial<TaskSummaryFields> | undefined;
  /** Причина запуска фазы: «Продолжена после возврата из QA» — рядом с фазой */
  reason?: string | undefined;
  /** Карточка задачи у нас — для «Открыть карточку задачи» */
  cardHref?: string | undefined;
  /** row: строка 32px */
  compact?: boolean | undefined;
  /** Описание сразу раскрыто */
  defaultOpen?: boolean | undefined;
}

const PRIORITY: Record<TaskPriority, [string, "danger" | "warn" | "ink" | "dim"]> = {
  urgent: ["Срочный", "danger"],
  high: ["Высокий", "warn"],
  medium: ["Средний", "ink"],
  low: ["Низкий", "dim"],
};

/** колонка состояния строки задачи: Pill «Ждёт решения» с точкой; длиннее — шире только эта строка */
const STATE_COL = 120;

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

function StateNode({ state }: { state: TaskSummaryState }) {
  return (
    <span className={s.state}>
      <Dot variant="status" tone={state.tone} size="md" pulse={!!state.pulse} />
      <span className={s.stateLabel}>{state.label}</span>
    </span>
  );
}

function PriorityNode({ priority }: { priority: TaskPriority }) {
  const [label, tone] = PRIORITY[priority];
  return (
    <span className={cx(s.prio, s[`prio-${tone}`])}>
      <span className={s.prioIcon} aria-hidden="true">
        <Icon name="priority" size={14} />
      </span>
      <span className={s.prioLabel}>{label}</span>
    </span>
  );
}

/** Фаза — Pill ink без иконки; в строке метаданных при нехватке места подпись обрезается */
function PhasePill({ name }: { name: string }) {
  return (
    <span className={s.phase} title={`Фаза ${name}`}>
      <Pill tone="ink">
        <span className={s.srOnly}>фаза </span>
        <span className={s.phaseLabel}>{name}</span>
      </Pill>
    </span>
  );
}

function LinkText({ link }: { link: TaskSummaryLink }) {
  return link.href ? (
    <a className={s.link} href={link.href} target="_blank" rel="noopener noreferrer">
      {link.name}
    </a>
  ) : (
    <>{link.name}</>
  );
}

function Avatar({ person }: { person: TaskSummaryPerson }) {
  return (
    <UserAvatar
      name={person.name}
      image={person.image}
      size="xs"
      shape={person.human ? "circle" : "square"}
      color={person.human ? undefined : "var(--ink-3)"}
    />
  );
}

function inline(parts: TaskInline | TaskInline[]): ReactNode {
  return (Array.isArray(parts) ? parts : [parts]).map((x, i) => {
    if (typeof x === "string") return <Fragment key={i}>{x}</Fragment>;
    if ("code" in x)
      return (
        <CodeChip key={i} size="sm">
          {x.code}
        </CodeChip>
      );
    return (
      <ExternalLink key={i} href={x.href} variant="inline" newTab>
        {x.text}
      </ExternalLink>
    );
  });
}

const hasText = (d: TaskSummaryTask["description"]) => (Array.isArray(d) ? d.length > 0 : !!d);

/** Описание из трекера примитивами системы; свёрнуто до lines строк, «Показать полностью» — если не поместилось */
function Description({ task, lines, defaultOpen }: { task: TaskSummaryTask; lines: number; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [cut, setCut] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const id = `${useId()}desc`;
  const d = task.description;

  // кнопка нужна, только если текст не поместился в lines строк; пересчёт при смене ширины
  useLayoutEffect(() => {
    const el = body.current;
    if (!el || open) return;
    const measure = () => setCut(el.scrollHeight > el.clientHeight + 1);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, d]);

  if (!hasText(d)) return <p className={s.empty}>Описание в {task.tracker ?? "трекере"} не заполнено</p>;

  const blocks: TaskDescriptionBlock[] = typeof d === "string" ? [{ type: "p", text: d }] : d!;
  const images = blocks.flatMap((b) => (b.type === "images" ? b.items : []));


  return (
    <div className={s.desc}>
      <div id={id} ref={body} className={cx(s.descBody, !open && s.clamped, !open && lines === 2 && s.two)}>
        {blocks.map((b, i) => {
          if (b.type === "images") return null;
          if (b.type === "list") {
            const List = b.ordered ? "ol" : "ul";
            return (
              <List key={i} className={s.list}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Body size="small" tone="ink-2">
                      {inline(it)}
                    </Body>
                  </li>
                ))}
              </List>
            );
          }
          if (b.type === "code")
            return (
              <pre key={i} className={s.code}>
                {b.text}
              </pre>
            );
          if (b.type === "h")
            return (
              <Body key={i} size="small" tone="ink">
                <strong>{b.text}</strong>
              </Body>
            );
          return (
            <Body key={i} size="small" tone="ink-2">
              {inline(b.text)}
            </Body>
          );
        })}
      </div>
      {images.length > 0 && (
        <ul className={s.thumbs} aria-label="Изображения из описания">
          {images.map((im, i) => (
            <li key={i}>
              <a className={s.thumb} href={im.href ?? im.src} target="_blank" rel="noopener noreferrer" title={`${im.alt} — открыть`}>
                <img src={im.src} alt={im.alt} width={96} height={64} loading="lazy" />
              </a>
            </li>
          ))}
        </ul>
      )}
      {(cut || open) && (
        <button type="button" className={s.more} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {open ? "Свернуть" : "Показать полностью"}
        </button>
      )}
    </div>
  );
}

export function TaskSummary({ task: t, preset = "side", fields, reason, cardHref, compact = false, defaultOpen = false }: TaskSummaryProps) {
  const f: TaskSummaryFields = { ...TASK_SUMMARY_PRESETS[preset], ...fields };
  // подпись приоритета сворачивается до иконки по факту нехватки места в строке метаданных: сначала приоритет, потом
  // обрезка фазы и эпика. Свёрнутая иконка получает остановку Tab (подсказка — для клавиатуры)
  const metaRef = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);
  const narrowRef = useRef(false);
  const labelW = useRef(0);
  useLayoutEffect(() => {
    const m = metaRef.current;
    if (!m) return;
    const measure = () => {
      const items = Array.from(m.children) as HTMLElement[];
      // обрезано ли что-то: многоточие стоит глубже (подпись фазы, имя эпика); скрытые подписи 1×1px и подсказки — не в счёт
      const cut = Array.from(m.querySelectorAll<HTMLElement>("*")).some(
        (el) => el.clientWidth > 1 && !el.closest('[role="tooltip"]') && el.scrollWidth > el.clientWidth + 1,
      );
      const label = m.querySelector<HTMLElement>(`.${s.prioLabel}`);
      if (!narrowRef.current) {
        if (label) labelW.current = label.offsetWidth;
        if (label && (cut || m.scrollWidth > m.clientWidth + 1)) setNarrow((narrowRef.current = true));
        return;
      }
      // свёрнуто: развернуть, только если подпись помещается целиком и ничего не обрезано
      const gap = parseFloat(getComputedStyle(m).columnGap) || 0;
      const used = items.reduce((a, c) => a + c.offsetWidth, 0) + gap * Math.max(items.length - 1, 0);
      const prioGap = 4; // зазор space-1 между иконкой и подписью
      if (!cut && m.clientWidth - used >= labelW.current + prioGap) setNarrow((narrowRef.current = false));
    };
    measure();
    // шрифты догружаются после первого кадра: ширина подписей меняется
    let alive = true;
    void document.fonts?.ready.then(() => alive && measure());
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(m);
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [narrow]);
  const hint = `Открыть в ${t.tracker ?? "трекере"}`;
  const why = reason ? reason.charAt(0).toLowerCase() + reason.slice(1) : null;
  const lines = f.description || 3;

  // описание без рамки — в основной колонке карточки задачи над вкладками
  if (f.density === "bare") {
    return (
      <section className={s.bare} aria-label={`Описание задачи ${t.key}`}>
        <Description task={t} lines={lines} defaultOpen={defaultOpen} />
      </section>
    );
  }

  // строка списка задач — ListItem: задача и название; справа колонки постоянной ширины — исполнитель, состояние, приоритет
  if (f.density === "row") {
    return (
      <ListItem
        density={compact ? "compact" : "regular"}
        entity={{ kind: "task", id: t.key, hint }}
        title={t.title}
        href={t.href}
        newTab
        subtitle={f.phase && t.phase ? <PhasePill name={t.phase} /> : undefined}
        state={f.status && t.state ? { ...t.state, dot: true } : undefined}
        stateWidth={STATE_COL}
        trailingStart={
          f.assignee ? (
            <span className={s.av} title={t.assignee ? `Исполнитель: ${t.assignee.name}` : undefined}>
              {t.assignee && (
                <>
                  <Avatar person={t.assignee} />
                  <span className={s.srOnly}>исполнитель {t.assignee.name}</span>
                </>
              )}
            </span>
          ) : undefined
        }
        trailing={
          <>
            {f.priority && <span className={cx(s.col, s.colPrio)}>{t.priority && <PriorityNode priority={t.priority} />}</span>}
            {f.queuePosition && t.queuePosition != null && <span className={cx(s.col, s.colQueue)}>{t.queuePosition}-я в очереди</span>}
          </>
        }
        trailingNarrow={
          f.assignee && t.assignee ? (
            <span className={s.av} title={`Исполнитель: ${t.assignee.name}`}>
              <Avatar person={t.assignee} />
              <span className={s.srOnly}>исполнитель {t.assignee.name}</span>
            </span>
          ) : undefined
        }
      />
    );
  }

  const grid = f.form === "grid";

  // строка метаданных: без «·» и без переноса; приоритет при нехватке места — иконкой с подсказкой, фаза и эпик обрезаются
  const meta = [
    f.status && t.state ? <StateNode key="state" state={t.state} /> : null,
    f.phase === "inline" && t.phase ? (
      <span key="phase" className={cx(s.mi, s.miShrink)}>
        <PhasePill name={t.phase} />
      </span>
    ) : null,
    f.priority && t.priority ? (
      <Tooltip key="prio" text={`Приоритет: ${PRIORITY[t.priority][0].toLowerCase()}`} focusable={narrow}>
        <PriorityNode priority={t.priority} />
      </Tooltip>
    ) : null,
    f.epic && t.epic ? (
      <span key="epic" className={cx(s.mi, s.miShrink, s.epic)}>
        <span className={s.ic} aria-hidden="true">
          <Icon name="layers" size={14} />
        </span>
        <span className={s.epicName}>
          <LinkText link={t.epic} />
        </span>
      </span>
    ) : null,
  ].filter(Boolean);

  const gridItems: DescriptionItem[] = grid
    ? ([
        f.trackerStatus && t.status
          ? { label: `Статус в ${t.tracker ?? "трекере"}`, icon: "tracker", value: <Pill tone="dim">{t.status}</Pill>, title: t.status }
          : null,
        f.status && t.state ? { label: "Состояние", icon: "circle-dot", value: <StateNode state={t.state} />, title: t.state.label } : null,
        f.priority && t.priority ? { label: "Приоритет", icon: "priority", value: <PriorityNode priority={t.priority} /> } : null,
        f.epic && t.epic ? { label: "Эпик", icon: "layers", value: <LinkText link={t.epic} />, title: t.epic.name } : null,
        f.details && t.goal ? { label: "Цель", icon: "target", value: <LinkText link={t.goal} />, title: t.goal.name } : null,
        f.assignee && t.assignee
          ? {
              label: "Исполнитель",
              icon: "user",
              value: (
                <span className={s.person}>
                  <Avatar person={t.assignee} />
                  {t.assignee.name}
                </span>
              ),
            }
          : null,
        f.phase && t.phase
          ? {
              label: "Фаза",
              icon: "milestone",
              value: (
                <span className={s.phaseRow}>
                  <PhasePill name={t.phase} />
                  {why && <span className={s.reason}>{why}</span>}
                </span>
              ),
              title: why ? `${t.phase}: ${why}` : t.phase,
            }
          : null,
        f.labels && t.labels?.length
          ? {
              label: "Метки",
              icon: "tags",
              value: (
                <span className={s.chips}>
                  {t.labels.map((l) => (
                    <Pill key={l} tone="dim">
                      {l}
                    </Pill>
                  ))}
                </span>
              ),
              title: t.labels.join(", "),
            }
          : null,
        f.details && t.cycle ? { label: "Цикл", icon: "cycle", value: t.cycle } : null,
        f.details && t.due ? { label: "Срок", icon: "calendar", value: t.due } : null,
        f.details && t.created ? { label: "Заведена", icon: "calendar", value: t.created } : null,
        f.updated && t.updated ? { label: "Обновлено", icon: "clock", value: t.updated } : null,
      ].filter(Boolean) as (DescriptionItem & { icon: IconName })[])
    : [];

  // фаза строкой под метаданными: бейдж и причина запуска — «[Code] продолжена после возврата из QA»
  const phaseLine = f.phase === true && !grid && (t.phase || why);

  return (
    <section className={cx(s.ts, f.density === "popover" ? s.popover : s.card)} aria-label={`Задача ${t.key}`}>
      <div className={s.top}>
        <EntityRef kind="task" id={t.key} title={t.title} href={t.href} newTab size="title" hint={grid ? hint : undefined} />
      </div>
      {grid ? (
        gridItems.length > 0 && (
          <div className={s.grid}>
            <DescriptionList layout="row" items={gridItems} />
          </div>
        )
      ) : (
        <>
          {meta.length > 0 && (
            <div ref={metaRef} className={cx(s.meta, narrow && s.narrow)}>
              {meta}
            </div>
          )}
          {f.assignee && t.assignee && (
            <div className={s.meta}>
              <span className={cx(s.mi, s.epic)}>
                <span className={s.ic} aria-hidden="true">
                  <Icon name="user" size={14} />
                </span>
                {t.assignee.name}
              </span>
            </div>
          )}
          {phaseLine && (
            <p className={s.phaseLine}>
              {t.phase && <PhasePill name={t.phase} />}
              {why && <span>{why}</span>}
            </p>
          )}
        </>
      )}
      {!!f.description && hasText(t.description) && <Description task={t} lines={lines} defaultOpen={defaultOpen} />}
      {f.openLink && cardHref && (
        <div className={s.foot}>
          <ExternalLink href={cardHref} variant="action">
            Открыть карточку задачи
          </ExternalLink>
        </div>
      )}
    </section>
  );
}
