"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CommentForm, type CommentMention } from "../CommentForm";
import { H3 } from "../H3";
import { Icon } from "../Icon";
import { PersonRef, type PersonInfo } from "../PersonRef";
import { Tooltip } from "../Tooltip";
import { UserAvatar } from "../UserAvatar";
import s from "./Conversation.module.css";

/** Сообщение беседы */
export interface ConversationMessage {
  id: string;
  /** Автор: роль-агент или человек */
  who: string;
  human?: boolean | undefined;
  /** Время: «14:20» */
  time: string;
  /** Текст; «@Имя» выделяется и открывает карточку участника */
  text: string;
  /** Ответ цитатой: id сообщения, на которое отвечают */
  replyTo?: string | undefined;
}

/** Системное событие: разделитель по центру — подключение участника, новая версия, итог решения */
export interface ConversationEvent {
  id: string;
  system: true;
  /** Участник, о котором событие: маленький аватар перед текстом */
  actor?: string | undefined;
  actorHuman?: boolean | undefined;
  text: string;
  /** Ссылка на текущую версию: «ред. 3» — onVersion */
  link?: string | undefined;
  time: string;
}

export type ConversationItem = ConversationMessage | ConversationEvent;

/** Беседа решения (ADR-0016): участники, сообщения, ответ цитатой, системные строки, форма с подсказкой по адресату */
export interface ConversationProps {
  /** Автор решения: отвечает, если адресата нет — «Ответит автор решения — Reviewer» */
  author: string;
  /** Сообщения и системные события по порядку */
  messages: ConversationItem[];
  /** Кого можно позвать через «@»: роли-агенты (role) и люди (person) */
  mentions?: CommentMention[] | undefined;
  /** Справочник участников для карточек PersonRef; dative — «В ответ Архитектору» */
  directory?: Record<string, PersonInfo> | undefined;
  /** Подробности — в сессии роли: «Сессия PM →» */
  session?: { label: string; href: string } | undefined;
  /** «ред. 3» в системной строке: показать текущую версию содержимого */
  onVersion?: (() => void) | undefined;
  /** Отправка сообщения; replyTo — id сообщения, на которое отвечают */
  onSend?: ((text: string, replyTo?: string) => void | Promise<unknown>) | undefined;
  /** Над полем: очередь сообщений (MessageQueue) */
  queue?: ReactNode;
  /** id поля формы */
  id?: string | undefined;
  /** Ответ цитатой открыт сразу (состояние макета): id сообщения */
  defaultReplyTo?: string | undefined;
}

const AT = /(@[A-Za-zА-Яа-яЁё][\wА-Яа-яЁё-]*)/;
const mentioned = (text: string) => (text.match(new RegExp(AT.source, "g")) ?? []).map((x) => x.slice(1));
const isSystem = (m: ConversationItem): m is ConversationEvent => "system" in m && m.system;

export function Conversation({ author, messages, mentions = [], directory, session, onVersion, onSend, queue, id = "conversation", defaultReplyTo }: ConversationProps) {
  const [value, setValue] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(defaultReplyTo ?? null);
  const [lit, setLit] = useState<string | null>(null);
  const list = useRef<HTMLOListElement>(null);
  const litTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(litTimer.current), []);

  const isAgent = (name: string) => mentions.some((m) => m.name === name && m.kind === "role") || directory?.[name]?.human === false;
  const isHuman = (name: string, fallback?: boolean) => directory?.[name]?.human ?? fallback ?? !isAgent(name);
  const dative = (name: string) => directory?.[name]?.dative;
  const byId = new Map(messages.filter((m): m is ConversationMessage => !isSystem(m)).map((m) => [m.id, m]));

  // в аватарах — только те, кто уже участвует: написал или был позван через @
  const people: { name: string; human: boolean }[] = [];
  const add = (name: string | undefined, human: boolean) => {
    if (name && !people.some((x) => x.name === name)) people.push({ name, human });
  };
  for (const m of messages) {
    if (isSystem(m)) continue;
    add(m.who, isHuman(m.who, m.human));
    mentioned(m.text).forEach((n) => add(n, isHuman(n)));
  }

  // подсказка под полем — по адресату: автор цитируемого сообщения и позванные через @
  const target = replyTo ? byId.get(replyTo) : undefined;
  const to = [...(target ? [target.who] : []), ...mentioned(value)];
  const hint =
    target && !isHuman(target.who, target.human)
      ? `Ответит ${target.who} в конце текущего шага`
      : to.some((n) => !isHuman(n))
        ? "Агент ответит в конце текущего шага"
        : to.length
          ? "Участник получит уведомление"
          : `Ответит автор решения — ${author}`;

  const startReply = (msgId: string) => {
    setReplyTo(msgId);
    setTimeout(() => document.getElementById(id)?.focus(), 0);
  };
  // цитата: прокрутка к исходному сообщению и подсветка на секунду
  const jump = (msgId: string) => {
    const el = list.current?.querySelector<HTMLElement>(`[data-msg="${CSS.escape(msgId)}"]`);
    if (!el) return;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    setLit(msgId);
    clearTimeout(litTimer.current);
    litTimer.current = setTimeout(() => setLit(null), 1000);
  };
  const replyLabel = (name: string) => (dative(name) ? `Ответить ${dative(name)}` : `Ответить: ${name}`);

  const text = (t: string) =>
    t.split(AT).map((part, j) =>
      AT.test(part) && part.startsWith("@") ? (
        <PersonRef key={j} name={part.slice(1)} human={isHuman(part.slice(1))} directory={directory}>
          <span className={s.at}>{part}</span>
        </PersonRef>
      ) : (
        part
      ),
    );

  return (
    <section className={s.cv} aria-label="Беседа">
      <div className={s.head}>
        <H3 size="card">Беседа</H3>
        {people.length > 0 && (
          <span className={s.people} aria-label={`Участвуют: ${people.map((x) => x.name).join(", ")}`}>
            {people.map((x) => (
              <PersonRef key={x.name} name={x.name} human={x.human} directory={directory}>
                <UserAvatar name={x.name} size="xs" shape={x.human ? "circle" : "square"} color={x.human ? undefined : "var(--ink-3)"} />
              </PersonRef>
            ))}
          </span>
        )}
        <span className={s.sp} />
        {session && (
          <a className={s.session} href={session.href}>
            {session.label} <span aria-hidden="true">→</span>
          </a>
        )}
      </div>

      {messages.length ? (
        // плоский список: ответ — цитатой над текстом, без вложенных веток
        <ol ref={list} className={s.list}>
          {messages.map((m) => {
            if (isSystem(m)) {
              // системное событие — разделитель по центру: линии, аватар участника, текст и время через «·»
              return (
                <li key={m.id} className={s.sys}>
                  <span className={s.rule} aria-hidden="true" />
                  <span className={s.sysText}>
                    {m.actor && (
                      <span className={s.sysAv} aria-hidden="true">
                        <UserAvatar name={m.actor} size="xs" shape={m.actorHuman ? "circle" : "square"} color={m.actorHuman ? undefined : "var(--ink-3)"} />
                      </span>
                    )}
                    {m.text}
                    {m.link && (
                      <>
                        {" "}
                        <button type="button" className={s.sysLink} onClick={() => onVersion?.()}>
                          {m.link}
                        </button>
                      </>
                    )}
                    {" · "}
                    <time>{m.time}</time>
                  </span>
                  <span className={s.rule} aria-hidden="true" />
                </li>
              );
            }
            const human = isHuman(m.who, m.human);
            const quoted = m.replyTo ? byId.get(m.replyTo) : undefined;
            return (
              <li key={m.id} data-msg={m.id} className={[s.msg, lit === m.id ? s.lit : ""].filter(Boolean).join(" ")}>
                <UserAvatar name={m.who} size="sm" shape={human ? "circle" : "square"} color={human ? undefined : "var(--ink-3)"} />
                <div className={s.body}>
                  <div className={s.meta}>
                    <PersonRef name={m.who} human={human} directory={directory}>
                      <strong>{m.who}</strong>
                    </PersonRef>
                    <span className={s.kind}>{human ? "человек" : "агент"}</span>
                    <time className={s.time}>{m.time}</time>
                    <span className={s.sp} />
                    {/* «Ответить» — по наведению на сообщение и по фокусу */}
                    <span className={s.replyWrap}>
                      <Tooltip text={replyLabel(m.who)} focusable={false} describe={false}>
                        <button type="button" className={s.reply} aria-label={replyLabel(m.who)} onClick={() => startReply(m.id)}>
                          <Icon name="reply" size={14} />
                        </button>
                      </Tooltip>
                    </span>
                  </div>
                  {quoted && (
                    // цитата — одна строка с многоточием; клик прокручивает к исходному сообщению
                    <button type="button" className={s.quote} title={`Перейти к сообщению: ${quoted.text}`} onClick={() => jump(quoted.id)}>
                      <strong>{quoted.who}</strong>
                      <span className={s.qtext}>{quoted.text}</span>
                    </button>
                  )}
                  <p className={s.text}>{text(m.text)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className={s.empty}>Сообщений пока нет. Вопрос можно задать здесь — ответит автор решения или тот, кого вы позовёте через @.</p>
      )}

      <CommentForm
        id={id}
        divider={false}
        label="Сообщение в беседу"
        placeholder="Напишите или позовите участника через @"
        mentions={mentions}
        hint={hint}
        value={value}
        onChange={setValue}
        onSubmit={async (t) => {
          await onSend?.(t, replyTo ?? undefined);
          setValue("");
          setReplyTo(null);
        }}
        above={
          (queue != null || target) && (
            <>
              {queue}
              {target && (
                <div className={s.replyBar} role="status">
                  <span className={s.replyTo}>
                    {dative(target.who) ? `В ответ ${dative(target.who)}: ` : `В ответ: ${target.who} — `}
                    <span className={s.qtext}>«{target.text}»</span>
                  </span>
                  <button type="button" className={s.x} aria-label="Отменить ответ" title="Отменить ответ" onClick={() => setReplyTo(null)}>
                    <Icon name="x" size={14} />
                  </button>
                </div>
              )}
            </>
          )
        }
      />
    </section>
  );
}
