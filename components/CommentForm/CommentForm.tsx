"use client";

import { useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "../Button";
import { Caption } from "../Caption";
import { Textarea } from "../Textarea";
import { UserAvatar } from "../UserAvatar";
import s from "./CommentForm.module.css";

/** Кого можно упомянуть через «@»: роль-агент из workflow или специалист-человек */
export interface CommentMention {
  /** Имя: название роли из workflow («Developer», «Аналитик») или имя специалиста («Анна Петрова») */
  name: string;
  /** role — роль-агент, person — специалист-человек */
  kind: "role" | "person";
  /** Подпись в подсказке; по умолчанию «роль» или «специалист» */
  caption?: string | undefined;
  /** Аватар специалиста; без него — инициалы */
  image?: string | null | undefined;
}

/** Комментарий к задаче: Textarea с подсказкой упоминаний на «@», подпись и кнопка «Отправить» */
export interface CommentFormProps {
  /** id поля; от него — id списка упоминаний */
  id?: string | undefined;
  /** Текст; без него форма хранит текст сама и очищает после отправки */
  value?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
  /** Подсказка в пустом поле; по умолчанию зависит от того, есть ли mentions */
  placeholder?: string | undefined;
  /** Кого можно упомянуть через «@»; пусто — подсказки нет, поле обычное */
  mentions?: CommentMention[] | undefined;
  /** Отправка: текст комментария. Вернёт Promise — без value текст очистится, только когда он выполнится */
  onSubmit?: ((text: string) => void | Promise<unknown>) | undefined;
  /** Идёт отправка: поле и кнопка недоступны */
  loading?: boolean | undefined;
  /** Ошибка отправки под полем; текст остаётся в поле */
  error?: string | undefined;
  /** Подпись поля; по умолчанию «Комментарий» */
  label?: string | undefined;
  /** Подпись у кнопки: куда попадает комментарий или кто ответит — экран меняет её по адресату */
  hint?: string | undefined;
  /** false — без линии сверху: форма закреплена внизу ленты (беседа, сессия, журнал) */
  divider?: boolean | undefined;
  /** Лента прокручивается под закреплённой формой: лёгкая тень сверху */
  raised?: boolean | undefined;
  /** Над полем: очередь сообщений (MessageQueue) и полоса «В ответ …» */
  above?: ReactNode;
}

/** «@» перед курсором и набранное после него */
const MENTION = /(^|\s)@([^\s@]*)$/;
const CAPTION = { role: "роль", person: "специалист" } as const;

const captionOf = (m: CommentMention) => m.caption ?? CAPTION[m.kind];

/** Совпадение по началу любого слова имени или по началу подписи; без учёта регистра */
const matches = (m: CommentMention, q: string) =>
  !q || m.name.toLowerCase().split(/\s+/).some((w) => w.startsWith(q)) || captionOf(m).toLowerCase().startsWith(q);

export function CommentForm({
  id = "comment",
  value,
  onChange,
  placeholder,
  mentions = [],
  onSubmit,
  loading = false,
  error,
  label = "Комментарий",
  hint = "Комментарий попадает в журнал задачи",
  divider = true,
  raised = false,
  above,
}: CommentFormProps) {
  const [inner, setInner] = useState("");
  const [active, setActive] = useState(0);
  const [closedFor, setClosedFor] = useState<string | null>(null);
  // позиция курсора: null — поле ещё не трогали (считаем конец текста), -1 — выделен фрагмент
  const [caret, setCaret] = useState<number | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const caretAfterPick = useRef<number | null>(null);
  const text = value ?? inner;
  const withMentions = mentions.length > 0;
  const listId = `${id}-mentions`;
  const optionId = (i: number) => `${listId}-${i}`;

  const area = () => fieldRef.current?.querySelector("textarea") ?? null;
  const domCaret = () => {
    const el = area();
    if (!el) return null;
    return el.selectionStart === el.selectionEnd ? el.selectionStart : -1;
  };

  const change = (next: string, at: number | null) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
    setActive(0);
    setClosedFor(null);
    setCaret(at);
  };

  // упоминание набирается там, где курсор: от «@» до курсора, а за курсором — конец текста или пробел
  const pos = caret === null ? text.length : Math.min(caret, text.length);
  const before = pos < 0 ? "" : text.slice(0, pos);
  const after = pos < 0 ? "" : text.slice(pos);
  const m = withMentions && (after === "" || /^\s/.test(after)) ? MENTION.exec(before) : null;
  const typed = (m?.[2] ?? "").toLowerCase();
  const start = m ? pos - typed.length - 1 : -1;
  const hits = m ? mentions.filter((x) => matches(x, typed)) : [];
  // имя уже набрано целиком — подсказка не нужна; во время отправки — тоже
  const complete = hits.length === 1 && hits[0]!.name.toLowerCase() === typed;
  const open = hits.length > 0 && !complete && !loading && closedFor !== text;
  const current = Math.min(active, Math.max(hits.length - 1, 0));

  // после выбора — курсор сразу за вставленным именем, а не в конце текста
  useLayoutEffect(() => {
    const at = caretAfterPick.current;
    const el = area();
    if (at === null || !el || el.value !== text) return;
    caretAfterPick.current = null;
    el.setSelectionRange(at, at);
  }, [text]);

  const pick = (x: CommentMention) => {
    const spaced = /^\s/.test(after);
    const insert = `@${x.name}${spaced ? "" : " "}`;
    const at = start + insert.length + (spaced ? 1 : 0);
    caretAfterPick.current = at;
    change(text.slice(0, start) + insert + after, at);
  };

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const body = text.trim();
    if (!body || loading) return;
    const result: unknown = onSubmit?.(body);
    if (value !== undefined) return;
    if (result instanceof Promise) {
      // ошибка отправки — текст остаётся; показать её — проп error
      result.then(() => setInner((cur) => (cur === text ? "" : cur)), () => undefined);
    } else {
      setInner("");
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // ввод через IME (составление символа): Enter и Tab принадлежат IME
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) return;
    const mod = e.ctrlKey || e.metaKey;
    if (e.key === "Enter" && mod) {
      e.preventDefault();
      submit();
      return;
    }
    if (!open || mod || e.altKey) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((current + step + hits.length) % hits.length);
    } else if ((e.key === "Enter" || e.key === "Tab") && !e.shiftKey) {
      e.preventDefault();
      pick(hits[current]!);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setClosedFor(text);
    }
  };

  return (
    <form className={[s.form, divider ? "" : s.noDivider, raised ? s.raised : ""].filter(Boolean).join(" ")} onSubmit={submit}>
      {above != null && <div className={s.above}>{above}</div>}
      <div
        ref={fieldRef}
        className={s.field}
        // курсор двигают стрелки и мышь без изменения текста
        onSelect={() => setCaret(domCaret())}
        onFocus={() => {
          setClosedFor(null);
          setCaret(domCaret());
        }}
        onBlur={() => setClosedFor(text)}
      >
        <Textarea
          id={id}
          label={label}
          value={text}
          onChange={(next) => change(next, domCaret())}
          placeholder={placeholder ?? (withMentions ? "Напишите комментарий; @ — упомянуть роль или специалиста" : "Напишите комментарий")}
          error={error}
          readOnly={loading}
          onKeyDown={onKeyDown}
          combobox={withMentions ? { listId, expanded: open, activeId: open ? optionId(current) : undefined } : undefined}
        />
        {withMentions && (
          <ul id={listId} className={s.pop} role="listbox" aria-label="Упоминание" hidden={!open}>
            {open &&
              hits.map((x, i) => (
                <li
                  key={`${x.kind}-${x.name}`}
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === current}
                  className={[s.option, i === current ? s.active : ""].filter(Boolean).join(" ")}
                  // mousedown, а не click: фокус остаётся в поле
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(x);
                  }}
                  onMouseEnter={() => setActive(i)}
                >
                  <UserAvatar
                    name={x.name}
                    image={x.kind === "person" ? x.image : undefined}
                    size="xs"
                    shape={x.kind === "role" ? "square" : "circle"}
                    color="var(--ink-3)"
                  />
                  <span className={s.name}>{x.name}</span>
                  <span className={s.caption}>{captionOf(x)}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className={s.foot}>
        <Caption font="ui" tone="mute">{hint}</Caption>
        <Button type="submit" variant="primary" size="md" loading={loading} disabled={!text.trim()} className={s.send}>
          Отправить
        </Button>
      </div>
    </form>
  );
}
