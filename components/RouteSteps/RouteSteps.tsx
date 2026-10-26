"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Dot } from "../Dot";
import s from "./RouteSteps.module.css";

/** Маршрут задачи в одну строку: точки на линии и подписи шагов по центру */
export interface RouteStepsProps {
  /** Подписи шагов маршрута из workflow проекта, по порядку: «Объём», «Code», «CI», «Ревью», «QA», «Приёмка» */
  steps: string[];
  /** Индекс текущего шага */
  current?: number | undefined;
  /** Все шаги пройдены: задача принята */
  done?: boolean | undefined;
  /** Пульс точки текущего шага — задача в работе; без него — шаг ждёт (решения, человека) */
  live?: boolean | undefined;
}

export function RouteSteps({ steps, current = 0, done = false, live = true }: RouteStepsProps) {
  const scroller = useRef<HTMLDivElement>(null);
  // тень у края, за которым есть ещё шаги: слева и справа, пропадает, когда край достигнут
  const [edges, setEdges] = useState({ left: false, right: false });
  const measure = () => {
    const box = scroller.current;
    if (!box) return;
    const left = box.scrollLeft > 1;
    const right = box.scrollLeft + box.clientWidth < box.scrollWidth - 1;
    setEdges((e) => (e.left === left && e.right === right ? e : { left, right }));
  };

  useEffect(() => {
    measure();
    const box = scroller.current;
    if (!box || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    // ширина строки шагов меняется и без изменения рамки (шрифт догрузился, шагов стало больше)
    const list = box.firstElementChild;
    if (list) ro.observe(list);
    return () => ro.disconnect();
  }, []);

  // шагов больше, чем помещается, — строка прокручивается; текущий шаг держим в видимой части
  useEffect(() => {
    const box = scroller.current;
    const step = box?.querySelector<HTMLElement>('[aria-current="step"]');
    // тени пересчитываются всегда: шагов стало меньше — прокрутки и теней больше нет
    if (box && step && box.scrollWidth > box.clientWidth) {
      box.scrollLeft = step.offsetLeft - (box.clientWidth - step.offsetWidth) / 2;
    }
    measure();
  }, [steps.length, current, done]);

  return (
    <div className={[s.wrap, edges.left ? s.shadeLeft : "", edges.right ? s.shadeRight : ""].filter(Boolean).join(" ")}>
    <div ref={scroller} className={s.scroll} onScroll={measure}>
      <ol className={s.list} style={{ "--n": steps.length } as CSSProperties}>
        {steps.map((label, i) => {
          const state = done || i < current ? "done" : i === current ? "current" : "future";
          return (
            <li key={i} className={[s.step, s[state]].join(" ")} aria-current={state === "current" ? "step" : undefined}>
              <span className={s.mark} aria-hidden="true">
                {state === "done" && <Dot variant="status" tone="accent" size="sm" />}
                {state === "current" && <Dot variant="status" tone="ink" size="md" pulse={live} />}
              </span>
              <span className={s.label} title={label}>
                {label}
              </span>
              {state !== "future" && (
                <span className={s.srOnly}>
                  {state === "done" ? ", пройден" : live ? ", текущий, в работе" : ", текущий, ожидает"}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
    </div>
  );
}
