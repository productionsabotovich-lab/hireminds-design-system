"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { CodeChip } from "../CodeChip";
import { Dot } from "../Dot";
import { EntityRef } from "../EntityRef";
import { Icon } from "../Icon";
import { IconArrow } from "../IconArrow";
import { List } from "../List";
import { ListItem } from "../ListItem";
import { PriorityNode, type TaskPriority } from "../TaskSummary";
import { Tooltip } from "../Tooltip";
import { UserAvatar } from "../UserAvatar";
import s from "./AgentStatus.module.css";

/** Агент: роль, раннер и модель */
export interface AgentInfo {
  /** Роль: «PM», «Developer» */
  role: string;
  /** Раннер: «Claude Code» */
  runner: string;
  /** Модель: «Sonnet 5.5» */
  model: string;
  /** Подключение — в подсказке строки модели: «раннер на VPS» */
  connection?: string | undefined;
}

/** Подсказка, как починить: текст и команда (CodeChip) */
export type AgentFix = string | { text: string; cmd: string };

/** Состояние агента. «Ждёт решения» у агента нет: решения ждёт задача */
export type AgentState =
  | {
      kind: "working";
      /** Задача в работе: строка — ссылка; фаза и план — в подсказке */
      task: { key: string; title: string; href?: string | undefined; phase?: string | undefined; plan?: { done: number; total: number } | undefined };
    }
  | { kind: "free" }
  | {
      kind: "error";
      /** Причина: «Лимит Claude Code исчерпан» */
      title: string;
      /** «18:00» → «Восстановится в 18:00 · задачи ждут в очереди» */
      until?: string | undefined;
      fix?: AgentFix | undefined;
    }
  | { kind: "paused"; since: string; by: string }
  | { kind: "off"; fix?: AgentFix | undefined };

/** Задача в очереди агента */
export interface AgentQueueItem {
  key: string;
  title: string;
  href?: string | undefined;
  /** Текущая — в работе сейчас, отмечена точкой */
  current?: boolean | undefined;
  /** Сколько ждёт: «2 ч» */
  waited?: string | undefined;
  priority?: TaskPriority | undefined;
}

/** Виджет агента: роль и состояние, задача в работе, раннер и модель, очередь попапом */
export interface AgentStatusProps {
  agent: AgentInfo;
  state: AgentState;
  /** Очередь: текущая задача и ждущие */
  queue?: AgentQueueItem[] | undefined;
  /** Попап очереди открыт сразу */
  queueOpen?: boolean | undefined;
  /** Карточка агента: имя роли и ↗ */
  agentHref?: string | undefined;
}

const STATE: Record<AgentState["kind"], [string, "accent" | "mute" | "danger", boolean]> = {
  working: ["Работает", "accent", true],
  free: ["Свободен", "mute", false],
  error: ["Ошибка", "danger", false],
  paused: ["На паузе", "mute", false],
  off: ["Не подключён", "mute", false],
};

/** событие «открылся попап очереди»: остальные закрываются — на странице открыт один */
const OPEN_EVENT = "hireminds:agent-queue-open";
/** отступ попапа от края экрана */
const EDGE = 16;

const waits = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? "ждёт" : "ждут");

function Fix({ fix }: { fix: AgentFix }) {
  if (typeof fix === "string") return <>{fix}</>;
  return (
    <>
      {fix.text}{" "}
      <span className={s.cmd}>
        <CodeChip size="sm">{fix.cmd}</CodeChip>
      </span>
    </>
  );
}

function QueueRow({ item }: { item: AgentQueueItem }) {
  return (
    <ListItem
      density="compact"
      leading={item.current ? <Dot variant="status" tone="accent" size="sm" pulse /> : <span aria-hidden="true" />}
      entity={{ kind: "task", id: item.key }}
      title={item.title}
      href={item.href}
      subtitle={item.current ? "в работе сейчас" : item.waited ? `ждёт ${item.waited}` : undefined}
      trailing={item.priority ? <PriorityNode priority={item.priority} /> : undefined}
    />
  );
}

export function AgentStatus({ agent, state, queue = [], queueOpen = false, agentHref }: AgentStatusProps) {
  const waiting = queue.filter((q) => !q.current).length;
  // текущая задача — всегда первой, остальные — в порядке очереди
  const ordered = [...queue.filter((q) => q.current), ...queue.filter((q) => !q.current)];
  const [open, setOpen] = useState(queueOpen);
  const [shift, setShift] = useState<{ left: number; min: number; max: number } | null>(null);
  const [size, setSize] = useState(0);
  const root = useRef<HTMLElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  // открыта пользователем (не пропом queueOpen): только тогда закрывает остальные очереди
  const byUser = useRef(false);
  const id = useId();
  const planId = `${id}plan`;
  const popId = `${id}queue`;
  const show = open && waiting > 0;

  // ширина 360–480px по содержимому, но не шире экрана без отступов; у правого края — сдвиг внутрь.
  // Замер — по отрисованному попапу: пересчёт, пока положение не устоится (ширина зависит от min/max)
  useLayoutEffect(() => {
    if (!show || !pop.current) return;
    const vw = document.documentElement.clientWidth;
    const max = Math.min(480, vw - 2 * EDGE);
    const min = Math.min(360, max);
    const r = pop.current.getBoundingClientRect();
    const base = r.left - (shift?.left ?? 0);
    const over = base + r.width - (vw - EDGE);
    const left = over > 0 ? -Math.min(over, base - EDGE) : 0;
    if (!shift || shift.left !== left || shift.max !== max || shift.min !== min) setShift({ left, min, max });
  }, [show, shift, size]);

  // ширина попапа меняется и после первого кадра (загрузка шрифтов, смена экрана) — тогда замер заново
  useEffect(() => {
    if (!show || !pop.current || typeof ResizeObserver === "undefined") return;
    const bump = () => setSize((n) => n + 1);
    const ro = new ResizeObserver(bump);
    ro.observe(pop.current);
    window.addEventListener("resize", bump);
    // шрифты догружаются после первого кадра: ширина строк меняется
    let alive = true;
    void document.fonts?.ready.then(() => alive && bump());
    return () => {
      alive = false;
      ro.disconnect();
      window.removeEventListener("resize", bump);
    };
  }, [show]);

  // закрытие: клик вне, Esc (фокус — на кнопку), прокрутка колонки с виджетом, открытие другого попапа очереди
  useEffect(() => {
    if (!show) return;
    const close = () => {
      setOpen(false);
      setShift(null);
    };
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Esc закрывает только очередь: карточка участника (PersonRef), где стоит виджет, остаётся открытой
      e.stopPropagation();
      close();
      btn.current?.focus();
    };
    // прокрутка колонки, в которой стоит виджет; прокрутка самого попапа и страницы целиком — нет
    const onScroll = (e: Event) => {
      const t = e.target;
      if (t instanceof Element && root.current && !root.current.contains(t) && t.contains(root.current)) close();
    };
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) close();
    };
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener(OPEN_EVENT, onOther);
    if (byUser.current) window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener(OPEN_EVENT, onOther);
    };
  }, [show, id]);

  const [label, tone, pulse] = STATE[state.kind];

  let line: ReactNode = null;
  if (state.kind === "working") {
    const t = state.task;
    const extra = [t.phase ? `фаза ${t.phase}` : "", t.plan ? `план ${t.plan.done} из ${t.plan.total}` : ""].filter(Boolean).join(" · ");
    const taskLink = (
      <a className={s.task} href={t.href ?? "#"} aria-describedby={extra ? planId : undefined}>
        <EntityRef kind="task" id={t.key} title={t.title} truncate />
        {extra && (
          <span id={planId} hidden>
            {extra}
          </span>
        )}
      </a>
    );
    // подсказка: полное название, фаза и план; читалке описанием — только фаза и план
    line = (
      <Tooltip text={`${t.key} ${t.title}${extra ? ` · ${extra}` : ""}`} focusable={false} describe={false}>
        {taskLink}
      </Tooltip>
    );
  } else if (state.kind === "error") {
    line = (
      <div className={s.err} role="status">
        <span className={s.errTitle}>
          <Icon name="alert" size={14} />
          {state.title}
        </span>
        {state.until && <span>Восстановится в {state.until} · задачи ждут в очереди</span>}
        {state.fix && (
          <span className={s.errFix}>
            <Fix fix={state.fix} />
          </span>
        )}
      </div>
    );
  } else if (state.kind === "paused") {
    line = (
      <span className={s.line}>
        Пауза с {state.since}, поставил {state.by}
      </span>
    );
  } else if (state.kind === "off" && state.fix) {
    line = (
      <span className={s.line}>
        <Fix fix={state.fix} />
      </span>
    );
  }

  return (
    <section ref={root} className={[s.aw, state.kind === "error" ? s.isError : ""].filter(Boolean).join(" ")} aria-label={`Агент ${agent.role}: ${label}`}>
      <div className={s.head}>
        <UserAvatar name={agent.role} size="xs" shape="square" color="var(--ink-2)" />
        {/* без карточки агента — имя текстом и без ↗ */}
        {agentHref ? (
          <a className={s.name} href={agentHref}>
            {agent.role}
          </a>
        ) : (
          <span className={s.name}>{agent.role}</span>
        )}
        <span className={[s.state, s[`tone-${tone}`]].join(" ")}>
          <Dot variant="status" tone={tone} size="md" pulse={pulse} />
          {label}
        </span>
        <span className={s.sp} />
        {agentHref && (
          <Tooltip text="Открыть карточку агента" focusable={false} describe={false}>
            <a className={s.go} href={agentHref} aria-label={`Открыть карточку агента ${agent.role}`}>
              ↗
            </a>
          </Tooltip>
        )}
      </div>
      {line}
      <div className={s.meta}>
        <span className={s.model} title={[agent.runner, agent.model, agent.connection].filter(Boolean).join(" · ")}>
          <span className={s.ic} aria-hidden="true">
            <Icon name="runner" size={14} />
          </span>
          <span className={s.modelText}>
            {agent.runner} · {agent.model}
          </span>
        </span>
        <span className={s.sp} />
        {waiting > 0 && (
          <span className={s.qwrap}>
            <button
              ref={btn}
              type="button"
              className={s.qbtn}
              aria-expanded={show}
              aria-haspopup="dialog"
              aria-controls={show ? popId : undefined}
              onClick={() => {
                setShift(null);
                byUser.current = true;
                setOpen(!open);
              }}
            >
              <span className={s.ic} aria-hidden="true">
                <Icon name="queue" size={14} />
              </span>
              {waiting} в очереди
              <IconArrow variant="chevron" direction={show ? "up" : "down"} size={11} />
            </button>
            {show && (
              // попап поверх страницы: высота виджета не меняется
              <div
                ref={pop}
                id={popId}
                className={s.pop}
                role="dialog"
                aria-label={`Очередь ${agent.role}`}
                style={shift ? { left: shift.left, minWidth: shift.min, maxWidth: shift.max } : { visibility: "hidden" }}
              >
                <List title={`Очередь ${agent.role} · ${waiting} ${waits(waiting)}`} width="content">
                  {ordered.map((q) => (
                    <QueueRow key={q.key} item={q} />
                  ))}
                </List>
              </div>
            )}
          </span>
        )}
      </div>
    </section>
  );
}
