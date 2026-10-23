# ResultRow

Одна строка артефакта задачи — PR, файл или отчёт: иконка вида или типа файла, название в одну строку и справа мета или счётчик изменений `+n −m`.

## Когда использовать
- Список результатов работы: «Результат» в карточке задачи, файлы PR на странице решения, «Что получилось» на экране сессии. Строки собираются в `ResultList`.
- Блок PR целиком (ветки, описание, проверки) — не строка, а `PullRequestSummary`; строка `pr` — только в списке.
- Таблица с колонками и сортировкой — `Table`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| kind | `"pr" \| "file" \| "report"` | — | Вид артефакта: задаёт иконку и шрифт названия. |
| name | `string` | — | Название одной строкой; длинное обрезается многоточием. |
| path | `string` | — | Полный путь файла: иконка по типу и подсказка при наведении. |
| stat | `{ additions, deletions }` | — | Счётчик `+n −m` справа; без него — `meta`. |
| meta | `ReactNode` | — | Мета справа: `Pill` состояния PR, роль и редакция, «7 из 9». |
| merged | `boolean` | `false` | PR влит — иконка `pull-request-merged`. |
| href | `string` | — | Вся строка — ссылка; без него строка статичная. |
| newTab | `boolean` | `false` | Открывает ссылку в новой вкладке (GitHub). |

### Тип файла → иконка
| Файл | Иконка |
|---|---|
| `*.test.*`, `*.spec.*` | `file-test` |
| `.ts`, `.tsx` | `file-ts` |
| `.md`, `.mdx` | `file-md` |
| `.json` | `file-json` |
| `.yaml`, `.yml` | `file-yaml` |
| `.css` | `file-css` |
| прочие | `file` |

## Правила
- Иконки монохромные, 16 px, `mute`. Имя файла — `font-mono`, полный путь — в подсказке.
- Цвет только у счётчика: `+n` — `accent-ink`, `−m` — `danger-ink`. Сами `accent` и `danger` как текст на `surface` и `inset` не проходят AA.
- Строка-ссылка: наведение — фон `inset`, фокус — рамка `accent` и кольцо `accent-soft`, как у `Input`.
- На узком экране название обрезается, счётчик и мета остаются.

## Пример
```tsx
import { ResultRow, Pill } from "../index";

<ResultRow kind="pr" name="PR #21 · Роли участников проекта" meta={<Pill>открыт</Pill>} href="/pr/21" />
<ResultRow kind="file" name="MembersTable.tsx" path="apps/web/src/members/MembersTable.tsx" stat={{ additions: 142, deletions: 38 }} />
<ResultRow kind="report" name="Отчёт QA" meta="7 из 9" />
```
