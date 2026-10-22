# Table

Таблица данных: шапка капителью `font-mono`, строки на `surface`, по желанию строки кликабельны и ведут в карточку.

## Когда использовать
- Список однотипных записей с колонками: запуски проекта в «Операциях», фазы запуска, история событий, Job.
- Строка ведёт в карточку записи — передай `onRowClick`, строка станет фокусируемой и откроется по Enter.
- Пустой список — не пустая таблица: покажи EmptyState вместо Table. Две-три пары «поле — значение» — это DescriptionList.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| columns | `TableColumn[]` (`{ key, label, align?, width?, mono? }`) | обязательный | Колонки; `mono` — Geist Mono для ключей, длительностей и чисел. |
| rows | `TableRow[]` (`{ id, cells: Record<key, ReactNode> }`) | обязательный | Строки; в ячейке — текст или компонент (Pill, ссылка). |
| onRowClick | `(id: string) => void` | — | Кликабельные строки: hover `bg`, фокус-кольцо `accent`. |
| caption | `string` | — | Доступное имя таблицы, визуально скрыто. |
| dense | `boolean` | `false` | Строки 36px вместо 44px — для таблиц внутри Card. |

## Правила
- Обёртка: фон `surface`, рамка `line`, радиус `r-lg`, тень `sh-1`; на узком экране таблица скроллится по горизонтали внутри обёртки.
- Шапка: 36px, фон `bg-2`, `font-mono` 10.5px uppercase, трекинг .06em, цвет `mute` (6:1 на `bg-2`).
- Ячейки: паддинг `space-2` `space-4`, текст `ink-2` 13px, разделитель `line`.
- Числа и длительности выравнивай вправо (`align="right"`, `mono`).
- Не больше одного Pill в строке; действия над записью — в карточке, не в строке.

## Пример
```tsx
import { Table, Pill } from "../index";

<Table
  caption="Запуски проекта"
  columns={[{ key: "task", label: "Задача" }, { key: "state", label: "Состояние" }, { key: "time", label: "В фазе", align: "right", mono: true }]}
  rows={[{ id: "HIR-31", cells: { task: "HIR-31 Экспорт отчёта", state: <Pill tone="accent" dot pulse>Выполняется</Pill>, time: "12 мин" } }]}
  onRowClick={(id) => router.push(`/operations/runs/${id}`)}
/>
```
