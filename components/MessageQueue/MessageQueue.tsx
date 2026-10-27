"use client";

import { useState } from "react";
import { Caption } from "../Caption";
import { Dot } from "../Dot";
import { Icon } from "../Icon";
import { IconArrow } from "../IconArrow";
import { ListItem } from "../ListItem";
import { UserAvatar } from "../UserAvatar";
import s from "./MessageQueue.module.css";

/** Сообщение в очереди к агенту: дойдёт после текущего шага */
export interface QueuedMessage {
  id: string;
  /** Кто написал */
  who: string;
  /** Своё — можно отменить до доставки (×) */
  own?: boolean | undefined;
  /** Откуда: «из беседы D-46», «из Linear» */
  source: string;
  time?: string | undefined;
  text: string;
}

/** Очередь сообщений в сессию над формой: «В очереди к Developer · N»; свёрнута до последнего, «ещё N» */
export interface MessageQueueProps {
  /** Кому: «Developer» */
  role: string;
  items: QueuedMessage[];
  /** × у своего сообщения: отменить до доставки */
  onCancel?: ((id: string) => void) | undefined;
  /** Раскрыта сразу */
  defaultOpen?: boolean | undefined;
}

const messages = (n: number) => {
  const d = n % 10;
  const dd = n % 100;
  return d === 1 && dd !== 11 ? "сообщение" : d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? "сообщения" : "сообщений";
};

export function MessageQueue({ role, items, onCancel, defaultOpen = false }: MessageQueueProps) {
  const [open, setOpen] = useState(defaultOpen);
  if (!items.length) return null;
  const rest = items.slice(0, -1);
  const last = items[items.length - 1]!;

  const row = (q: QueuedMessage) => (
    <ListItem
      key={q.id}
      density="compact"
      leading={<UserAvatar name={q.who} size="xs" shape={q.own ? "circle" : "square"} color={q.own ? undefined : "var(--ink-3)"} />}
      title={q.text}
      hint={q.text}
      subtitle={[q.who, q.source, q.time].filter(Boolean).join(" · ")}
      action={
        q.own ? (
          <button type="button" className={s.x} aria-label="Отменить сообщение до доставки" title="Отменить до доставки" onClick={() => onCancel?.(q.id)}>
            <Icon name="x" size={14} />
          </button>
        ) : (
          "none"
        )
      }
    />
  );

  return (
    <section className={s.qt} aria-label="Очередь сообщений">
      <button type="button" className={s.bar} aria-expanded={rest.length ? open : undefined} disabled={!rest.length} onClick={() => setOpen(!open)}>
        <Dot variant="status" tone="warn" size="md" pulse />
        <span className={s.title}>
          В очереди к {role} · {items.length}
        </span>
        <Caption font="ui" tone="mute">
          дойдут после текущего шага
        </Caption>
        {rest.length > 0 && (
          <span className={s.chev} aria-hidden="true">
            <IconArrow variant="chevron" direction={open ? "down" : "up"} size={12} />
          </span>
        )}
      </button>
      <ol className={s.list}>
        {open ? (
          items.map(row)
        ) : (
          <>
            {rest.length > 0 && (
              <li className={s.moreRow}>
                <button type="button" className={s.more} onClick={() => setOpen(true)}>
                  ещё {rest.length} {messages(rest.length)}
                </button>
              </li>
            )}
            {row(last)}
          </>
        )}
      </ol>
    </section>
  );
}
