# List

Единственная обёртка списка: рамка карточки, заголовок со счётчиком, сворачивание, секции с шапкой, свёрнутые «Закрытые N» и «ещё n»; строки — только `ListItem`.

## Когда использовать
- Любой список на экранах 2b — карточка задачи, сессия агента, страница решения, «Мои решения», виджет агента. Строку списка экран своей вёрсткой не собирает.
- Заменяет `ResultList` (устарел, см. его README).
- Таблица с колонками и сортировкой — `Table`; журнал событий — `ActivityFeed`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| title | `ReactNode` | — | Заголовок: «Решения», «Сессии ролей». Строка — ещё и `aria-label` секции. |
| count | `number` | — | Число рядом с заголовком. |
| countTone | `"danger"` | — | Число тоном ошибки: есть не пройденные проверки. |
| headAction | `ReactNode` | — | Действие справа в шапке. |
| collapsible, defaultOpen | `boolean` | `false`, `true` | Шапка сворачивает список. |
| children | `ListItem[]` | — | Строки. |
| sections | `{ header?, label?, items }[]` | — | Секции с шапкой вместо `children`: группы файлов по месту. |
| grid | `"cells"` | — | Строки — в сетке колонок (проверки): иконка · название · источник · результат · действия, колонки выровнены по всему списку. |
| folded | `{ label, items, defaultOpen? }` | — | Свёрнутая часть: «Закрытые 3», раскрывается на месте. |
| more | `{ label, href }` | — | «ещё 11 файлов в PR #21» внизу. |
| emptyText | `ReactNode` | «Пока ничего нет» | `EmptyState` mini, пока строк нет. |

## Правила
- **Иконки строк на одной вертикали.** Если хоть у одной строки иконка в `leading`, иконка типа у всех строк — в `leading`: у строки с `EntityRef` иконка переезжает в `leading` (`EntityRef` становится `bare`), строки без иконки получают пустую колонку. Делает `List` сам.
- Рамка `line`, `r-lg`, `sh-1`, фон `surface`; шапка — `nav-item` 600 и счётчик моно `mute`; секции — шапка на `bg-2`.
- `List` — контейнер (`container-type: inline-size`): узкую раскладку строк задаёт ширина списка, а не экрана (см. `ListItem`).

## Композиции
Это не новые компоненты, а сочетания `List` и `ListItem`; экраны собирают их так.

| Список | Как собран |
|---|---|
| «Сессии ролей» | `leading` — `UserAvatar` xs роли, `entity` `session`, `title` — роль, `subtitle` — фаза и время, `state` — «идёт» (`ink`, `pulse`, `emphasis="attention"`), «вернул» (`warn`), «завершена» (`dim`, `muted`). |
| «Решения» по задаче | открытые — в `children` с `emphasis="attention"` и `state` `warn`; закрытые — в `folded` «Закрытые» с `emphasis="muted"`. |
| «Мои решения», «Ещё ждут вашего решения» | то же, `entity` `decision`, `subtitle` — проект и сколько ждёт, `subtitleShort` — только «ждёт 2 ч». |
| «Ссылки» | `href` и `newTab` (↗), `entity` — PR, документ; трекер — `leading` `Icon tracker`; иконки выравниваются сами. |
| «Результат» в правой колонке | `collapsible`, строки `entity` `pr` / `doc` с мета в `trailing`. |
| Очередь агента | `entity` `task`, `trailing` — позиция в очереди; пусто — `emptyText` «Задач в очереди нет». |
| Проверки | `grid="cells"`, `ListItem cells`: `leading` — `Icon check` (`accent`) или `alert` (`danger`), `badge` — источник (`workflow` — CI, `hard-drive` — раннер), `trailing` — результат (`resultTone="danger"`), `expand` — «вывод» с `TerminalBox`, `action` — ссылки. `count` — число не пройденных, `countTone="danger"`. |
| Изменённые файлы | `sections` по месту: шапка — `Icon repo` + репозиторий + `BranchRef` + состояние («в ветке», «влиты в main» + PR) или `Icon hard-drive` + «Файлы проекта»; строки `density="compact"`, `leading` — `Icon` по типу файла (`iconForFile`), `path`, `trailing` — «+n −m» в колонке 64px; `expand` — `DiffView` (заявка 7); `more` — «ещё n файлов в PR». |

`ResultRow` и `ResultList` выводятся из употребления: их строки — `ListItem` с `path`/`entity` и `trailing`.

## Пример
```tsx
import { List, ListItem, UserAvatar } from "../index";

<List title="Решения" count={5} folded={{ label: "Закрытые", items: closed.map(toItem) }}>
  {open.map((d) => (
    <ListItem key={d.id} href={`/decisions/${d.id}`} entity={{ kind: "decision", id: d.id }} title={d.gate}
      subtitle={`${d.owner} · ждёт ${d.waited}`} subtitleShort={`ждёт ${d.waited}`}
      state={{ tone: "warn", label: "Ждёт решения", pulse: true }} emphasis="attention" />
  ))}
</List>
```
