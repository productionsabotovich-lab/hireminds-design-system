import type { CSSProperties } from "react";
import { Dot } from "../Dot";
import s from "./RouteSteps.module.css";

/** Маршрут задачи в одну строку: точки на линии и подписи шагов по центру */
export interface RouteStepsProps {
  /** Короткие подписи шагов маршрута проекта: «Объём», «Code», «CI», «Ревью», «QA», «Приёмка» */
  steps: string[];
  /** Индекс текущего шага */
  current?: number | undefined;
  /** Все шаги пройдены: задача принята */
  done?: boolean | undefined;
  /** Пульс точки текущего шага — задача в работе; без него — шаг ждёт (решения, человека) */
  live?: boolean | undefined;
}

export function RouteSteps({ steps, current = 0, done = false, live = true }: RouteStepsProps) {
  return (
    <ol className={s.list} style={{ "--n": steps.length } as CSSProperties}>
      {steps.map((label, i) => {
        const state = done || i < current ? "done" : i === current ? "current" : "future";
        return (
          <li key={label} className={[s.step, s[state]].join(" ")} aria-current={state === "current" ? "step" : undefined}>
            <span className={s.mark} aria-hidden="true">
              {state === "done" && <Dot variant="status" tone="accent" size="sm" />}
              {state === "current" && <Dot variant="status" tone="ink" size="md" pulse={live} />}
            </span>
            <span className={s.label} title={label}>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
