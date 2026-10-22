# Select

Выпадающий список на нативном `<select>`, оформленный как Input: та же высота, рамка и фокус.

## Когда использовать
- Выбор одного значения из 4 и больше: проект в «Операциях», модель, часовой пояс.
- 2–3 варианта, видимых сразу, — Switcher; множественный выбор — чипы.
- В тулбаре над таблицей — `size="sm"` и `inlineLabel`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| id | `string` | обязательный | id для связи с label. |
| label | `string` | — | Подпись. |
| options | `SelectOption[]` (`{ value, label }`) | обязательный | Варианты. |
| value | `string` | — | Выбранное значение; компонент контролируемый. |
| placeholder | `string` | — | Первая неактивная строка: «Выберите проект». |
| disabled | `boolean` | `false` | Недоступен. |
| size | `"sm" \| "md"` | `"md"` | md — 36px как Input; sm — 28px как Button sm. |
| inlineLabel | `boolean` | `false` | Подпись слева от поля, а не над ним. |
| onChange | `(value: string) => void` | — | Выбор значения. |
| className | `string` | — | Дополнительный класс на обёртку. |

## Правила
- Рамка `line-3` (3:1 к фону, как у Input), радиус `r-md`, фон `surface`, текст `ink` 13px.
- Фокус: рамка `accent` и кольцо 2.5px `accent-soft`. Шеврон 12px `mute` справа, не кликабельный.
- Нативный список — системный: доступен с клавиатуры и на телефоне; кастомный дропдаун не делаем.
- Подпись — существительное («Проект»), без двоеточия.

## Пример
```tsx
import { Select } from "../index";

<Select id="project" label="Проект" size="sm" inlineLabel value={project} onChange={setProject}
  options={[{ value: "hireminds", label: "hireminds" }, { value: "busina", label: "busina" }]} />
```
