# TerminalForecast

Светлый моноширинный блок «что произойдёт после»: шапка с зелёной точкой и список шагов со стрелками.

## Когда использовать
- Рядом с вводом API-ключа на BYOK и в настройках LLM, под TerminalBox «vault.verify».
- Превью последствий до действия: создание workspace, найм агента, одобрение задачи.
- Только для прогноза; случившиеся события показывай в TerminalBox `variant="log"`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| title | `string` | обязательный | Заголовок шапки («что произойдёт»). |
| subtitle | `string` | — | Метка справа в шапке («после»), цвет `dim`. |
| items | `TerminalForecastItem[]` (`{ text: string; accent?: boolean }`) | обязательный | Шаги; `accent` выделяет важный. |
| footer | `{ label: string; value: string }` | — | Итоговая строка, например «tick → 60s». |

## Правила
- Корпус: фон `surface`, рамка `line`, радиус 8px, тень `sh-1`; тело на фоне `inset`.
- Шапка: `font-mono` 10.5px, вес 500, letter-spacing 0.1em, uppercase, цвет `mute`; точка 6px `accent` с ореолом 3px `accent-soft`.
- Строки: стрелка «→» `font-mono` 11px цвета `mute`, текст `font-mono` 11.5px цвета `ink`; выделенный шаг и значение футера `accent-ink` вес 600.
- Выделяй один ключевой шаг; не вкладывай блок в TerminalBox и не перекрашивай его в тёмный.

## Пример
```tsx
import { TerminalForecast } from "../index";

<TerminalForecast
  title="что произойдёт"
  subtitle="после"
  items={[
    { text: "workspace создан" },
    { text: "6 агентов поднимаются" },
    { text: "первая задача · Анна", accent: true },
    { text: "«опишите цель проекта»" },
  ]}
  footer={{ label: "tick", value: "→ 60s" }}
/>
```
