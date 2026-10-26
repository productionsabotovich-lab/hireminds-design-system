"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import s from "./Tooltip.module.css";

/** Подсказка к значку или короткому элементу: по наведению и по фокусу с клавиатуры, текст — и для читалки экрана */
export interface TooltipProps {
  /** Текст подсказки: «Приоритет: высокий», «Открыть карточку агента» */
  text: string;
  /** Элемент, к которому подсказка: значок, ссылка-иконка, кнопка */
  children: ReactNode;
  /**
   * true (по умолчанию) — фокус на самой обёртке: для значка без своего фокуса.
   * false — фокус у вложенной кнопки или ссылки; ей добавляется aria-describedby.
   */
  focusable?: boolean | undefined;
}

/** отступ подсказки от края экрана */
const EDGE = 8;

export function Tooltip({ text, children, focusable = true }: TooltipProps) {
  const id = `${useId()}tip`;
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState({ x: 0, below: false });
  const bubble = useRef<HTMLSpanElement>(null);

  // у края экрана — сдвиг внутрь по горизонтали; у верхнего края — под элементом
  useLayoutEffect(() => {
    if (!open || !bubble.current) return;
    const r = bubble.current.getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    const x = r.left - shift.x < EDGE ? EDGE - (r.left - shift.x) : r.right - shift.x > width - EDGE ? width - EDGE - (r.right - shift.x) : 0;
    const below = shift.below ? true : r.top < EDGE;
    if (x !== shift.x || below !== shift.below) setShift({ x, below });
  }, [open, shift.x, shift.below]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const show = () => setOpen(true);
  const hide = () => {
    setOpen(false);
    setShift({ x: 0, below: false });
  };

  // фокус у вложенного элемента: ему — aria-describedby, чтобы читалка прочла подсказку вместе с ним
  const child =
    !focusable && isValidElement(children)
      ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, { "aria-describedby": id })
      : children;

  return (
    <span
      className={s.root}
      tabIndex={focusable ? 0 : undefined}
      aria-describedby={focusable ? id : undefined}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {child}
      <span
        ref={bubble}
        id={id}
        role="tooltip"
        className={[s.bubble, open ? s.open : "", shift.below ? s.below : ""].filter(Boolean).join(" ")}
        style={{ transform: `translateX(calc(-50% + ${shift.x}px))` }}
      >
        {text}
      </span>
    </span>
  );
}
