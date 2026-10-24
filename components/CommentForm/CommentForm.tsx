"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Button } from "../Button";
import { Caption } from "../Caption";
import { Textarea } from "../Textarea";
import { UserAvatar } from "../UserAvatar";
import s from "./CommentForm.module.css";

/** Комментарий к задаче: Textarea с подсказкой ролей на «@», подпись и кнопка «Отправить» */
export interface CommentFormProps {
  /** id поля; от него — id списка ролей */
  id?: string | undefined;
  /** Текст; без него форма хранит текст сама и очищает после отправки */
  value?: string | undefined;
  onChange?: ((value: string) => void) | undefined;
  placeholder?: string | undefined;
  /** Роли проекта для подсказки на «@»: «Analyst», «Developer», «Reviewer», «QA» */
  mentions?: string[] | undefined;
  /** Отправка: текст комментария */
  onSubmit?: ((text: string) => void) | undefined;
  /** Идёт отправка: кнопка недоступна */
  loading?: boolean | undefined;
  /** Подпись поля; по умолчанию «Комментарий» */
  label?: string | undefined;
  /** Подпись у кнопки: куда попадает комментарий */
  hint?: string | undefined;
}

/** «@» в конце текста и набранное после него */
const MENTION = /(^|\s)@([^\s@]*)$/;

export function CommentForm({
  id = "comment",
  value,
  onChange,
  placeholder = "Напишите комментарий; @ — упомянуть роль",
  mentions = [],
  onSubmit,
  loading = false,
  label = "Комментарий",
  hint = "Комментарий попадает в журнал и в тред Linear",
}: CommentFormProps) {
  const [inner, setInner] = useState("");
  const [active, setActive] = useState(0);
  const [closedFor, setClosedFor] = useState<string | null>(null);
  const text = value ?? inner;
  const listId = `${id}-roles`;

  const set = (next: string) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
    setActive(0);
    setClosedFor(null);
  };

  const m = MENTION.exec(text);
  const typed = (m?.[2] ?? "").toLowerCase();
  const hits = m ? mentions.filter((r) => r.toLowerCase().startsWith(typed)) : [];
  // роль уже набрана целиком — подсказка не нужна; во время отправки — тоже
  const complete = hits.length === 1 && hits[0]!.toLowerCase() === typed;
  const open = hits.length > 0 && !complete && !loading && closedFor !== text;
  const current = Math.min(active, Math.max(hits.length - 1, 0));
  const optionId = (i: number) => `${listId}-${i}`;

  const pick = (role: string) => set(text.replace(/@[^\s@]*$/, `@${role} `));

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const body = text.trim();
    if (!body || loading) return;
    onSubmit?.(body);
    if (value === undefined) setInner("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const step = e.key === "ArrowDown" ? 1 : -1;
        setActive((current + step + hits.length) % hits.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        pick(hits[current]!);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setClosedFor(text);
        return;
      }
    }
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form className={s.form} onSubmit={submit}>
      <div className={s.field}>
        <Textarea
          id={id}
          label={label}
          value={text}
          onChange={set}
          placeholder={placeholder}
          disabled={loading}
          onKeyDown={onKeyDown}
          combobox={{ listId, expanded: open, activeId: open ? optionId(current) : undefined }}
        />
        {open && (
          <ul id={listId} className={s.pop} role="listbox" aria-label="Роли">
            {hits.map((role, i) => (
              <li
                key={role}
                id={optionId(i)}
                role="option"
                aria-selected={i === current}
                className={[s.option, i === current ? s.active : ""].filter(Boolean).join(" ")}
                // mousedown, а не click: фокус остаётся в поле
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(role);
                }}
                onMouseEnter={() => setActive(i)}
              >
                <UserAvatar name={role} size="xs" shape="square" color="var(--ink-3)" />
                <span>{role}</span>
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
