import { useId, useState, type ReactNode } from "react";
import { ActivityEvent, type ActivityEventKind, type ActivityEventProps } from "../ActivityEvent";
import { Body } from "../Body";
import { Caption } from "../Caption";
import { EmptyState } from "../EmptyState";
import { SectionHeader } from "../SectionHeader";
import { Spinner } from "../Spinner";
import { Switcher, switcherTabId } from "../Switcher";
import { UpdatedAt } from "../UpdatedAt";
import s from "./ActivityFeed.module.css";

export type ActivityFeedView = "messages" | "all";

/** Событие ленты: пропсы ActivityEvent и необязательный стабильный ключ */
export type ActivityFeedEvent = ActivityEventProps & { id?: string | undefined };

/** Хронологический журнал: task — карточка задачи (дни, Switcher, без шагов); session — лента «Шаги» сессии */
export interface ActivityFeedProps {
  /** task — карточка задачи; session — экран сессии: без дней, все виды включая шаги */
  variant?: "task" | "session" | undefined;
  /** События в хронологическом порядке; дни компонент строит сам */
  events: ActivityFeedEvent[];
  /** task: какие события видны; по умолчанию all. С onViewChange — управляемый */
  view?: ActivityFeedView | undefined;
  onViewChange?: ((view: ActivityFeedView) => void) | undefined;
  /** «Сейчас» для заголовков дней «Сегодня», «Вчера» */
  now?: Date | undefined;
  /** Spinner на месте журнала */
  loading?: boolean | undefined;
  /** Текст EmptyState, пока событий нет: что появится и когда */
  emptyText?: ReactNode;
  /** Заголовок секции; по умолчанию «Что происходило с задачей» / «Шаги» */
  title?: string | undefined;
  /** session: время последнего обновления живой ленты — UpdatedAt в заголовке */
  updatedAt?: Date | number | undefined;
  /** false — без своего заголовка: вид журнала (Switcher с ACTIVITY_VIEWS) — в строке заголовка экрана; нужен panelId */
  header?: boolean | undefined;
  /** header={false}: id панели журнала — тот же, что у Switcher в заголовке экрана */
  panelId?: string | undefined;
  /** Последняя строка «Сейчас»: SessionLive variant now — всегда последней в ленте */
  live?: ReactNode;
  /** Режим «Подробно»: вывод вызовов и diff файлов раскрыты */
  detailed?: boolean | undefined;
}

/** «Сообщения»: реплики ролей, решения и их итоги, возвраты, замечания и напоминания платформы */
const MESSAGE_KINDS: ReadonlySet<ActivityEventKind> = new Set(["message", "decision", "return", "note", "reminder"]);
/** Шаги сессии — только в variant="session" */
const STEP_KINDS: ReadonlySet<ActivityEventKind> = new Set(["files", "check", "push", "ask", "step", "run"]);

/** Вкладки вида журнала: Switcher в строке заголовка экрана при header={false} */
export const ACTIVITY_VIEWS = [
  { id: "messages", label: "Сообщения" },
  { id: "all", label: "Вся активность" },
];

const toDate = (t: Date | string | number) => (t instanceof Date ? t : new Date(t));
const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

function dayLabel(d: Date, now: Date) {
  const start = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((start(now) - start(d)) / 86400000);
  if (diff === 0) return "Сегодня";
  if (diff === 1) return "Вчера";
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", ...(d.getFullYear() !== now.getFullYear() ? { year: "numeric" } : {}) });
}

export function ActivityFeed({
  variant = "task",
  events,
  view,
  onViewChange,
  now,
  loading = false,
  emptyText = "Здесь появятся переходы фаз, сессии ролей и решения.",
  title,
  updatedAt,
  header = true,
  panelId: panelIdProp,
  live,
  detailed = false,
}: ActivityFeedProps) {
  const [ownView, setOwnView] = useState<ActivityFeedView>(view ?? "all");
  const ownPanelId = `${useId()}feed`;
  const panelId = panelIdProp ?? ownPanelId;
  const active = onViewChange ? (view ?? "all") : ownView;
  const select = (id: string) => (onViewChange ? onViewChange(id as ActivityFeedView) : setOwnView(id as ActivityFeedView));
  const session = variant === "session";
  const heading = title ?? (session ? "Шаги" : "Что происходило с задачей");

  const visible = events.filter((e) =>
    session ? true : !STEP_KINDS.has(e.kind) && (active === "all" || MESSAGE_KINDS.has(e.kind)),
  );
  const row = (e: ActivityFeedEvent, i: number) => {
    const { id, ...props } = e;
    return <ActivityEvent key={id ?? i} detailed={detailed} {...props} />;
  };

  let body: ReactNode;
  if (loading) {
    body = (
      <div className={s.loading}>
        <Spinner size={18} color="var(--mute)" label="Загрузка журнала" />
        <Body size="small">Загружаем журнал…</Body>
      </div>
    );
  } else if (!visible.length && events.length && !session && active === "messages") {
    // события есть, но сообщений среди них нет
    body = <EmptyState title="Сообщений пока нет">Переходы фаз и сессии — в «Вся активность».</EmptyState>;
  } else if (!visible.length && live == null) {
    body = <EmptyState title="Событий пока нет">{emptyText}</EmptyState>;
  } else if (session) {
    body = (
      <ol className={s.list}>
        {visible.map(row)}
        {/* «Сейчас» — всегда последней строкой ленты */}
        {live != null && <li className={s.live}>{live}</li>}
      </ol>
    );
  } else {
    const today = now ?? new Date();
    const days: { key: string; label: string; events: ActivityFeedEvent[] }[] = [];
    for (const e of visible) {
      const d = toDate(e.time);
      const last = days[days.length - 1];
      if (last && last.key === dayKey(d)) last.events.push(e);
      else days.push({ key: dayKey(d), label: dayLabel(d, today), events: [e] });
    }
    body = (
      <ol className={s.days}>
        {days.map((d) => (
          <li key={d.key} className={s.day} aria-label={d.label}>
            <div className={s.dayHead}>
              <Caption font="mono" tone="dim">{d.label}</Caption>
              <span className={s.rule} aria-hidden="true" />
            </div>
            <ol className={s.list}>{d.events.map(row)}</ol>
          </li>
        ))}
      </ol>
    );
  }

  const action = session
    ? updatedAt != null && <UpdatedAt updatedAt={updatedAt} loading={loading} />
    : !loading && <Switcher tabs={ACTIVITY_VIEWS} activeId={active} onSelect={select} label="Вид журнала" panelId={panelId} />;

  return (
    <section className={s.feed} aria-label={heading}>
      {header && <SectionHeader action={action || undefined}>{heading}</SectionHeader>}
      {session || loading ? (
        body
      ) : (
        <div role="tabpanel" id={panelId} aria-labelledby={switcherTabId(panelId, active)}>
          {body}
        </div>
      )}
    </section>
  );
}
