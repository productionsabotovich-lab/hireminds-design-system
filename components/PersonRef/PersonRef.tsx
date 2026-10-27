"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { AgentStatus, type AgentInfo, type AgentQueueItem, type AgentState } from "../AgentStatus";
import { Tooltip } from "../Tooltip";
import { UserAvatar } from "../UserAvatar";
import s from "./PersonRef.module.css";

/** Участник команды в справочнике: человек — роль и профиль; агент — данные виджета AgentStatus */
export interface PersonInfo {
  human?: boolean | undefined;
  /** Человек: «владелец проекта» */
  role?: string | undefined;
  /** Профиль человека или карточка агента */
  href?: string | undefined;
  /** Агент: раннер и модель; по умолчанию — роль = имя, Claude Code, Sonnet 5.5 */
  agent?: AgentInfo | undefined;
  state?: AgentState | undefined;
  queue?: AgentQueueItem[] | undefined;
}

/** Участник в тексте — упоминание, имя автора, аватар: по наведению, фокусу и нажатию — карточка участника */
export interface PersonRefProps {
  /** Имя или роль: «PM», «Антон Саботович» */
  name: string;
  /** Человек (без записи в directory): карточка человека, иначе — агента */
  human?: boolean | undefined;
  /** Справочник участников по имени */
  directory?: Record<string, PersonInfo> | undefined;
  /** Карточка открыта сразу */
  open?: boolean | undefined;
  /** Триггер: «@PM», имя автора, UserAvatar */
  children: ReactNode;
}

/** задержка открытия по наведению и закрытия при уходе курсора */
const SHOW_DELAY = 300;
const HIDE_DELAY = 150;
/** отступ карточки от края экрана */
const EDGE = 8;
/** событие «открылась карточка участника»: остальные закрываются — на странице открыта одна */
const OPEN_EVENT = "hireminds:person-card-open";

export function PersonRef({ name, human = false, directory, open: openProp = false, children }: PersonRefProps) {
  const [open, setOpen] = useState(openProp);
  const [left, setLeft] = useState<number | null>(null);
  const root = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLSpanElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // фокус, возвращённый на триггер после Esc, карточку снова не открывает
  const skipFocus = useRef(false);
  // открыта пользователем (не пропом open): только тогда закрывает остальные карточки
  const byUser = useRef(false);
  // фокус от нажатия мышью или пальцем карточку не открывает: открывает само нажатие (click)
  const pressed = useRef(false);
  // закреплена нажатием: уход курсора её не закрывает, повторное нажатие — закрывает
  const pinned = useRef(false);
  const id = useId();
  const cardId = `${id}card`;
  const info: PersonInfo = directory?.[name] ?? { human };

  const later = (value: boolean, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      byUser.current = true;
      setOpen(value);
    }, delay);
  };
  const close = () => {
    clearTimeout(timer.current);
    pinned.current = false;
    setOpen(false);
  };
  // нажатие: закрытую — открыть; открытую наведением или фокусом — закрепить; закреплённую — закрыть
  const press = () => {
    clearTimeout(timer.current);
    byUser.current = true;
    if (open && pinned.current) {
      close();
      return;
    }
    pinned.current = true;
    setOpen(true);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  // у правого края экрана — сдвиг внутрь
  useLayoutEffect(() => {
    if (!open || !card.current || !root.current) {
      if (left !== null) setLeft(null);
      return;
    }
    const vw = document.documentElement.clientWidth;
    const r = root.current.getBoundingClientRect();
    const w = card.current.offsetWidth;
    const over = r.left + w - (vw - EDGE);
    const next = over > 0 ? -Math.min(over, r.left - EDGE) : 0;
    if (next !== left) setLeft(next);
  }, [open, left]);

  // закрытие: клик вне, Esc (фокус — на триггер), открытие другой карточки
  useEffect(() => {
    if (!open) return;
    const onDown = (e: globalThis.PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) close();
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      skipFocus.current = true;
      trigger.current?.focus();
    };
    const onOther = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) close();
    };
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOther);
    if (byUser.current) window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOther);
    };
  }, [open, id]);

  // наведение — только мышью: на телефоне карточка открывается нажатием
  const onEnter = (e: PointerEvent) => {
    if (e.pointerType === "mouse") later(true, SHOW_DELAY);
  };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && !pinned.current) later(false, HIDE_DELAY);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    press();
  };

  const href = info.href ?? "#";
  const body = info.human ? (
    // человек: аватар, имя — ссылка на профиль, роль; ↗ справа
    <div className={s.person}>
      <UserAvatar name={name} size="md" shape="circle" />
      <div className={s.main}>
        <a className={s.name} href={href}>
          {name}
        </a>
        <span>{info.role ?? "участник команды"}</span>
      </div>
      <Tooltip text="Открыть профиль" focusable={false} describe={false}>
        <a className={s.go} href={href} aria-label={`Открыть профиль ${name}`}>
          ↗
        </a>
      </Tooltip>
    </div>
  ) : (
    <AgentStatus
      agent={info.agent ?? { role: name, runner: "Claude Code", model: "Sonnet 5.5" }}
      state={info.state ?? { kind: "free" }}
      queue={info.queue}
      agentHref={info.href}
    />
  );

  return (
    <span ref={root} className={s.ref} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <span
        ref={trigger}
        className={s.trigger}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? cardId : undefined}
        onPointerDown={() => {
          pressed.current = true;
        }}
        onFocus={() => {
          // открывает только фокус с клавиатуры (Tab); после Esc — не открывает
          if (skipFocus.current || pressed.current) {
            skipFocus.current = false;
            pressed.current = false;
            return;
          }
          later(true, 0);
        }}
        onBlur={() => {
          // фокус ушёл: флаги «после Esc» и «от нажатия» сбрасываются — следующий Tab на триггер снова открывает карточку
          skipFocus.current = false;
          pressed.current = false;
        }}
        onClick={() => {
          pressed.current = false;
          press();
        }}
        onKeyDown={onKeyDown}
      >
        {children}
      </span>
      {open && (
        <div
          ref={card}
          id={cardId}
          className={s.card}
          role="dialog"
          aria-label={name}
          style={left === null ? { visibility: "hidden" } : { left }}
        >
          {body}
        </div>
      )}
    </span>
  );
}
