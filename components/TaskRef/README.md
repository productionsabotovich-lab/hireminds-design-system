# TaskRef

Ссылка на задачу трекера: ключ моноширинным шрифтом и название задачи рядом. **Устарел — используй `EntityRef` `kind="task"`.**

## Замена
`TaskRef` выводится из употребления: в новых экранах — `EntityRef`, в существующих — при следующей правке экрана. Компонент останется до итерации 3.

| TaskRef | EntityRef |
|---|---|
| `issueKey` | `id` |
| `title` | `title` |
| `href`, `newTab` | `href`, `newTab` |
| `variant="cell"` | `size="inline"` |
| `variant="heading"` | `size="heading"` |

```tsx
// было
<TaskRef issueKey="PIL-15" title="Роли и доступ" href={url} newTab />
// стало
<EntityRef kind="task" id="PIL-15" title="Роли и доступ" href={url} newTab />
```

## Когда использовать
- Колонка «Задача» в таблице запусков: `HIR-28 Роли проекта`.
- Заголовок карточки запуска: `variant="heading"` внутри H1, ключ и название тем же кеглем.
- Со ссылкой на трекер — `href` и `newTab`. Строка таблицы уже кликабельна — ссылку внутри не ставь.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| issueKey | `string` | обязательный | Ключ задачи в трекере: «HIR-28». |
| title | `string` | обязательный | Название задачи. |
| href | `string` | — | Ссылка на задачу; без неё — текст. |
| newTab | `boolean` | `false` | Открыть ссылку в новой вкладке. |
| variant | `"cell" \| "heading"` | `"cell"` | cell — 12/13px для таблиц; heading — кегль наследуется от H1. |

## Правила
- Ключ: `font-mono` вес 500, `mute` (6:1), не переносится. Название: `ink` вес 500, переносится.
- Ключ и название на одной базовой линии, gap `space-2`.
- Ссылка подчёркивает название при наведении; фокус — кольцо `accent`.
- Ключ не сокращай и не меняй регистр: его ищут в трекере как есть.

## Пример
```tsx
import { TaskRef } from "../index";

<TaskRef issueKey={run.issueKey} title={run.issueTitle} />
<H1 size="section"><TaskRef variant="heading" issueKey="HIR-28" title="Роли проекта" /></H1>
```
