# ArtifactView

Артефакт фазы или решения по типу — закрытый каталог виджетов: PR, документ, проверки, файлы, изображения, ссылки, решение; неизвестный тип — ссылкой с подписью.

## Когда использовать
- Вложение в `ResultReport` (блок `artifact`) и артефакты версии в `PhaseResult`.
- Новый вид артефакта — сначала заявка в каталог; до неё он показывается ссылкой с подписью «Вид «…» показан ссылкой».

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| artifact | `Artifact` | — | Артефакт по `type` (таблица ниже). |

### Типы
| type | Поля | Виджет |
|---|---|---|
| `pr` | `title?`, `items: PullRequestSummaryProps[]`, `emptyText?` | `List` строк `PullRequestSummary` `row`. |
| `doc` | `title?`, `revision?`, `path`, `href?`, `meta?`, `additions?`, `deletions?` | `List` «Документ · ред. 2» и строка файла. |
| `checks` | `title?`, `rows: { label, state?, mono?, hint?, source?, result?, out?, open?, links? }`, `emptyText?` | `List grid="cells"`: иконка состояния, источник (песочница, GitHub CI, роль), результат, «вывод» — `TerminalBox`, ссылки — `EntityRef`. Счётчик — число не пройденных (`danger`). |
| `files` | `title?`, `groups: { place, repo?, branch?, state?, base?, pr?, name?, files, more?, moreHref? }`, `emptyText?` | `List` с секциями по месту: репозиторий с веткой и состоянием («в ветке», «влиты в main», «не отправлены в ветку») или «Файлы проекта»; строка файла раскрывает `DiffView`. |
| `images` | `title?`, `items: { src, alt, caption, href? }` | Сетка миниатюр 16:10 с подписью. |
| `link` | `title?`, `items: { title, href, subtitle?, meta?, icon?, entity?, newTab? }` | `List` ссылок: стенд, документ, внешний сервис. |
| `decision` | `listTitle?`, `id`, `title`, `sub?`, `href?`, `outcome?: { label, tone }` | `List` с одной строкой решения и `Pill` итога. |
| любой другой | `title?`, `href?`, `sub?` | Ссылка `ExternalLink` и подпись «Вид «figma» показан ссылкой». |

## Правила
- Внутри — только `List` и `ListItem` (кроме изображений): одна сетка строк, одни правила узкой колонки.
- Состояние проверки — иконкой цвета (`check` accent, `x` danger, `alert` warn, точка с пульсом — идёт) и словами для читалки.
- «+n −m» — `accent-ink` / `danger-ink`, моноширинно, для читалки — словами.

## Пример
```tsx
<ArtifactView artifact={{ type: "doc", title: "Объём работ", revision: "ред. 2", path: "docs/specs/PIL-15-roles.md", href: "/docs/PIL-15" }} />
```
