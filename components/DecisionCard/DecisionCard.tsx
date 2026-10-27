import { Button } from "../Button";
import { EntityRef } from "../EntityRef";
import { H3 } from "../H3";
import { Pill } from "../Pill";
import s from "./DecisionCard.module.css";

/** Открытое решение в закреплённой зоне над журналом карточки задачи: гейт, решение, «Ждёт решения», «Открыть решение» */
export interface DecisionCardProps {
  /** Решение: «D-44» */
  id: string;
  /** Гейт: «Лимит возвратов исчерпан» */
  gate: string;
  /** Строка ожидания: «Ждёт Антона Саботовича 23 ч 45 мин · напоминание в треде Linear» */
  line?: string | undefined;
  /** Страница решения */
  onOpen?: (() => void) | undefined;
}

export function DecisionCard({ id, gate, line, onOpen }: DecisionCardProps) {
  return (
    <section className={s.dc} aria-label={`Решение ${id}: ${gate}`}>
      <div className={s.main}>
        <div className={s.head}>
          <EntityRef kind="decision" id={id} />
          <H3 size="inline">{gate}</H3>
          <Pill tone="warn" dot pulse>
            Ждёт решения
          </Pill>
        </div>
        {line && (
          <p className={s.line} title={line}>
            {line}
          </p>
        )}
      </div>
      <Button variant="primary" size="sm" onClick={onOpen}>
        Открыть решение
      </Button>
    </section>
  );
}
