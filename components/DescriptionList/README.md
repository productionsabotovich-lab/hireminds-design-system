# DescriptionList

Сводка записи: пары «подпись — значение» в сетке из 1–4 колонок с подписью над значением (`stack`) или в одну строку для коротких реквизитов (`row`).

## Когда использовать
- `stack` — шапка карточки записи: сводка (состояние, фаза, роль, возвраты, в фазе), реквизиты проекта.
- `row` — короткие реквизиты в боковой колонке: «О задаче» (приоритет, тип, эпик, репозиторий, ветка, раннер, дата).
- Значение может быть компонентом: Pill для состояния, ExternalLink для ссылки.
- Много однотипных записей — Table; длинный текст — Body в Card.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| items | `DescriptionItem[]` (`{ label, value, mono?, icon?, title? }`) | обязательный | Пары; `mono` — Geist Mono для ключей, времени и чисел; `icon` (`IconName`) и `title` — для `row`. |
| layout | `"stack" \| "row"` | `"stack"` | `stack` — подпись над значением в сетке; `row` — подпись и значение в одной строке. |
| columns | `1 \| 2 \| 3 \| 4` | `4` | Только `stack`: колонки на широком экране; до 720px — 2, до 420px — 1. |

## Правила
- Семантика `dl` / `dt` / `dd`. Gap `space-4` по вертикали и `space-6` по горизонтали, внутри пары — `space-1`.
- Подпись: `font-mono` 10.5px uppercase, трекинг .06em, `mute`. Значение: `font-ui` 13.5px `ink`; `mono` — 12.5px.
- `row`: строка не ниже 36px, паддинг `space-1` `space-4`, разделитель `line` между строками; подпись — `font-ui` 11.5px `mute` в колонке 128px, с иконкой `Icon` 14px перед ней; значение — 12px `ink`, `mono` — Geist Mono.
- `row`: значение не переносится — длинное обрезается многоточием; полный текст передавай в `title` пункта. Сюда — только короткие реквизиты; длинный текст — `stack`.
- Подписи — существительные без двоеточия: «Фаза», «Возвраты», «В фазе».
- Пустое значение — «—», не пропуск пары: сетка не должна прыгать между записями.

## Пример
```tsx
import { DescriptionList, Pill } from "../index";

<DescriptionList items={[
  { label: "Состояние", value: <Pill tone="danger" dot>Ошибка</Pill> },
  { label: "Фаза", value: "Review" },
  { label: "Возвраты", value: "2", mono: true },
]} />

<DescriptionList layout="row" items={[
  { label: "Приоритет", icon: "priority", value: <Pill tone="warn">Высокий</Pill> },
  { label: "Тип", icon: "type", value: "feature" },
  { label: "Ветка", icon: "branch", value: "feature/pil-15-roles-and-access-matrix", mono: true, title: "feature/pil-15-roles-and-access-matrix" },
]} />
```
