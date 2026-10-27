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
   * true (по умолчанию) — для значка без текста и без своего фокуса: обёртка в порядке Tab,
   * для читалки — role="img" с именем из text.
   * false — фокус у вложенной кнопки или ссылки; ей добавляется aria-describedby.
   */
  focusable?: boolean | undefined;
  /** false — у вложенного элемента уже есть имя с тем же текстом (aria-label): aria-describedby не добавлять */
  describe?: boolean | undefined;
  /** Открывать, только если текст внутри обрезан многоточием: полное название в строке, длинная ветка */
  whenTruncated?: boolean | undefined;
}

/** задержка закрытия: курсор успевает перейти с элемента на подсказку (WCAG 1.4.13) */
const HIDE_DELAY = 120;

/**
 * Обрезан ли текст внутри: проверяются только элементы с многоточием (text-overflow: ellipsis) или line-clamp.
 * Пузырь подсказки и скрытые подписи для читалки (1×1px) не считаются: они шире своей коробки нарочно.
 */
const truncated = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>("*")).some((el) => {
    if (el.closest('[role="tooltip"]')) return false;
    const cs = getComputedStyle(el);
    const clamp = cs.getPropertyValue("-webkit-line-clamp");
    const cut = cs.textOverflow === "ellipsis" || (clamp !== "" && clamp !== "none");
    if (!cut || el.clientWidth <= 1) return false;
    return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
  });

/** отступ подсказки от края экрана */
const EDGE = 8;

export function Tooltip({ text, children, focusable = true, describe = true, whenTruncated = false }: TooltipProps) {
  const id = `${useId()}tip`;
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState({ x: 0, below: false });
  const bubble = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const root = useRef<HTMLSpanElement>(null);

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
    // Esc закрывает только подсказку: перехват в фазе capture, дальше событие не идёт (диалог под ней остаётся)
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setOpen(false);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // без текста подсказки нет; whenTruncated — только если содержимое обрезано
  const show = () => {
    clearTimeout(timer.current);
    if (!text) return;
    if (whenTruncated && root.current && !truncated(root.current)) return;
    setOpen(true);
  };
  // курсор ушёл и с элемента, и с подсказки (она внутри обёртки) — закрыть с задержкой
  const hide = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setOpen(false);
      setShift({ x: 0, below: false });
    }, HIDE_DELAY);
  };

  // фокус у вложенного элемента: ему — aria-describedby, чтобы читалка прочла подсказку вместе с ним
  const child =
    !focusable && describe && isValidElement(children)
      ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, { "aria-describedby": id })
      : children;

  return (
    <span
      ref={root}
      className={s.root}
      tabIndex={focusable ? 0 : undefined}
      role={focusable ? "img" : undefined}
      aria-label={focusable ? text : undefined}
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
        aria-hidden={focusable || !describe ? true : undefined}
        className={[s.bubble, open ? s.open : "", shift.below ? s.below : ""].filter(Boolean).join(" ")}
        style={{ transform: `translateX(calc(-50% + ${shift.x}px))` }}
      >
        {text}
      </span>
    </span>
  );
}
