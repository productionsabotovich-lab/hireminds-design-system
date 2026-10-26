# BranchRef

Ветка одинаково везде: иконка ветки и `CodeChip`-ссылка в GitHub; с `base` — «откуда → куда», обе ветки одним видом.

## Когда использовать
- Строка PR и шапка PR: `hm/PIL-15-project-roles → main`.
- Шапки групп файлов, «О задаче», беседа — где упоминается ветка.
- Коммит — `EntityRef` `kind="commit"`; путь файла — `ResultRow` или `CodeChip`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| name | `string` | обязательный | Ветка: «hm/PIL-15-project-roles». |
| href | `string` | — | Ветка в GitHub; открывается в новой вкладке. |
| base | `string` | — | Целевая ветка: «main». |
| baseHref | `string` | — | Ссылка на целевую ветку. |

## Правила
- Иконка `branch` 14px `mute` и `CodeChip` 12px (`truncate`); между ветками — «→» `mute` (`aria-hidden`), для читалки — скрытое «в».
- Ветка в одну строку: длинное имя обрезается многоточием внутри чипа, полное — в `Tooltip` (только если обрезано). Целевая ветка не сжимается — обрезается исходная.
- Ссылка — новая вкладка, подчёркивание `ink-3`, фокус — кольцо `accent` (как у `CodeChip`).

## Пример
```tsx
import { BranchRef } from "../index";

<BranchRef name="hm/PIL-15-project-roles" href={`${repo}/tree/hm/PIL-15-project-roles`} base="main" baseHref={`${repo}/tree/main`} />
```
