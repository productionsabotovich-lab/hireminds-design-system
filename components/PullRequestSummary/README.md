# PullRequestSummary

Pull request одной строкой `ListItem` — в списке PR или шапкой карточки `full` с «Что изменилось» и строкой «коммит · открыл».

## Когда использовать
- `full` — «Страница решения», вложение «Влить PR»: одна карточка; изменённые файлы — отдельным блоком ниже (`children`, обычно `List` с секциями файлов).
- `row` — строка PR в `List` («Результат», «Pull requests»).
- Ключ PR в тексте — `EntityRef` `kind="pr"`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| variant | `"full" \| "row"` | `"full"` | Карточка или строка в `List`. |
| number, title | `number`, `string` | — | «#18 Роли участников проекта». |
| href | `string` | — | PR в GitHub, новая вкладка (↗). |
| state | `"open" \| "draft" \| "merged" \| "closed"` | — | `Pill` с точкой: «Открыт», «Черновик», «Влит», «Закрыт». |
| repo | `string` | — | Репозиторий — в подсказке на ключе PR («Репозиторий hireminds-pilot-app»). |
| head, headHref, base, baseHref | `string` | — | Ветки — `BranchRef`. |
| additions, deletions, files | `number` | — | «+312 −41 · 7 файлов». |
| checks | `{ passed, total }` | — | Итог CI: «✓ 4 из 4» (`accent-ink`) или «✕ 3 из 4» (`danger-ink`). |
| description | `string[]` | — | `full`: пункты «Что изменилось». |
| commit, commitHref, author | `string` | — | `full`: «коммит a4b23ec · открыл Developer». |
| children | `ReactNode` | — | `full`: блок ниже карточки — изменённые файлы. |

## Правила
- Строка: иконка PR (в `full` — в колонке `leading`), «#18 название», ниже ветки `BranchRef`; справа «+312 −41 · 7 файлов», состояние, итог CI, ↗.
- Узкая колонка (`List` или карточка до 360px): название целиком (`titleClamp={false}`), колонки справа скрыты; вторая строка «● Открыт · +312 −41 · ✓ 4 из 4» — без ветки (по последнему макету её в узкой колонке нет: ветка видна в широкой раскладке и в PR), без числа файлов и без многоточия.
- «+312 −41» в одной карточке один раз; сетки «Файлы / Строки / Коммит / Открыл» нет.
- Цифры дифа — `accent-ink` и `danger-ink`, моноширинные; для читалки — «добавлено 312, удалено 41».

## Пример
```tsx
<PullRequestSummary
  number={18}
  title="Роли участников проекта"
  href="https://github.com/…/pull/18"
  state="open"
  head="hm/PIL-15-project-roles"
  base="main"
  additions={312}
  deletions={41}
  files={7}
  checks={{ passed: 4, total: 4 }}
  description={["Три роли участника", "Меню показывает только доступные действия"]}
  commit="a4b23ec"
  author="Developer"
>
  <List title="Изменённые файлы" sections={files} />
</PullRequestSummary>
```
