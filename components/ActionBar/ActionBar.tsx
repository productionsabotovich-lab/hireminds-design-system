import { Body } from "../Body";
import { Button, type ButtonVariant } from "../Button";
import s from "./ActionBar.module.css";

/** Действие решения: «Утвердить», «Вернуть на доработку» */
export interface ActionBarAction {
  label: string;
  variant?: ButtonVariant | undefined;
  onSelect?: (() => void) | undefined;
  loading?: boolean | undefined;
  disabled?: boolean | undefined;
}

/** Главные действия решения: вопрос и задача слева, кнопки в один ряд справа; bar — закреплённая внизу полоса, block — «Ваше решение» */
export interface ActionBarProps {
  /** Вопрос решения: «Утвердить план кампании?» */
  question: string;
  /** Задача и контекст: «PIL-15 · Роли участников проекта» */
  summary?: string | undefined;
  /** Кнопки по порядку: основная — первой (левее) */
  actions: ActionBarAction[];
  /**
   * bar — полоса, закреплённая внизу экрана, «Действия решения»: дубль блока «Ваше решение» для мыши и касаний — кнопки
   * вне порядка Tab (tabIndex=-1); block — сам блок «Ваше решение» на странице, тот же вид
   */
  variant?: "bar" | "block" | undefined;
}

export function ActionBar({ question, summary, actions, variant = "bar" }: ActionBarProps) {
  const bar = variant === "bar";
  return (
    // хост во всю ширину: контейнер с inline-size не берёт ширину от содержимого
    <div className={[s.host, bar ? s.sticky : ""].filter(Boolean).join(" ")}>
      <div className={[s.ab, bar ? s.bar : s.block].join(" ")} role="region" aria-label={bar ? "Действия решения" : "Ваше решение"}>
        <div className={s.text} title={summary ? `${question} ${summary}` : question}>
          <Body tone="ink-2" size="small">
            <strong>{question}</strong>
            {summary && ` ${summary}`}
          </Body>
        </div>
        <div className={s.btns}>
          {actions.map((a) => (
            <Button
              key={a.label}
              className={s.btn}
              variant={a.variant}
              loading={!!a.loading}
              disabled={!!a.disabled}
              onClick={a.onSelect}
              tabIndex={bar ? -1 : undefined}
            >
              {a.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
