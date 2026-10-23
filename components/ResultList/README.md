# ResultList

Список строк `ResultRow` в тонкой рамке на `surface` с заголовком и числом строк; умеет сворачиваться и показывать «ещё n файлов в PR».

## Когда использовать
- «Результат» в карточке задачи — сворачиваемый (`collapsible`).
- Файлы PR на странице решения и «Что получилось» на экране сессии — не сворачиваемые.
- Длинный список файлов PR: показывай первые строки, остальное — `more` и `moreHref` на GitHub.
- Таблица с колонками и сортировкой — `Table`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| title | `string` | — | Заголовок: «Результат», «Изменённые файлы», «Что получилось». |
| rows | `ResultRowProps[]` | — | Строки списка. |
| collapsible | `boolean` | `false` | Заголовок становится кнопкой свёртки (`aria-expanded`). |
| defaultOpen | `boolean` | `true` | Начальное состояние сворачиваемого списка. |
| more | `number` | — | Сколько строк не показано; добавляется к числу в заголовке. |
| moreHref | `string` | — | Ссылка «ещё n файлов в PR» (`ExternalLink`, новая вкладка). |
| emptyText | `string` | «Пока ничего нет» | Текст `EmptyState mini` в пустом списке. |

## Правила
- Рамка `line`, фон `surface`, радиус `r-lg`; разделитель под заголовком — `line`.
- Число в заголовке — все строки, включая `more`: человек сразу видит полный объём.
- Пустой список не прячется: показывает `EmptyState mini` с объяснением.
- Свёртка без анимации при `prefers-reduced-motion`.

## Пример
```tsx
import { ResultList } from "../index";

<ResultList
  title="Изменённые файлы"
  rows={[{ kind: "file", name: "MembersTable.tsx", path: "apps/web/src/members/MembersTable.tsx", stat: { additions: 142, deletions: 38 } }]}
  more={8}
  moreHref="https://github.com/org/repo/pull/21/files"
/>
```
