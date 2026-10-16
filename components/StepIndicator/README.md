# StepIndicator

Mono-счётчик шага в многошаговом флоу вида step 1 / 3 или Шаг 1 из 3, с необязательным контекстом.

## Когда использовать
- Верхняя строка формы forgot-password рядом с BackLink («step 1 / 3»).
- Флоу без крошек и навигации (auth), когда шаг не вписан в текст Kicker.
- Если шаг уже есть в Kicker или FormHeader («Шаг 2 из 4 · Workspace»), StepIndicator не дублируй.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| current | `number` | обязательный | Текущий шаг. |
| total | `number` | обязательный | Всего шагов. |
| format | `"short" \| "verbose"` | `"short"` | `step N / M` или `Шаг N из M`. |
| scope | `string` | — | Контекст после « · », цвет `mute`. |

## Правила
- `font-mono` 10.5px, вес 500, uppercase, цвет `dim`; letter-spacing 0.08em у short и 0.14em у verbose.
- В одном флоу выбери один формат: не смешивай `step 1 / 3` и `Шаг 1 из 3`.
- На главном экране добавляй `scope`: одинокое «1 / 3» без контекста непонятно.
- Не утяжеляй: без веса 700 и без цвета `accent`.

## Пример
```tsx
import { StepIndicator } from "../index";

<StepIndicator current={1} total={3} />
<StepIndicator current={3} total={4} format="verbose" scope="Bring your own key" />
```
