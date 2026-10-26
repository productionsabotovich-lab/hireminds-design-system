# Паттерны

Паттерн — повторяющийся элемент интерфейса с правилами применения: когда ставить, когда нет, чего избегать.
Каталог перенесён из базы дизайн-системы первой версии Hireminds (2026-05) и сверен с компонентами репозитория.
Пропсы и точные значения — в README компонента; общие правила — в [основах](../foundations.md) и [брендбуке](../brand.md).

## Статусы

- **Компонент** — паттерн реализован компонентом из `components/`.
- **Заявка** — компонента нет; при появлении экрана, которому он нужен, заводится заявка в дизайн-систему.
- **Экран** — слой раскладки: в систему не входит, экран собирает его из атомов.
- **Не создаётся** — решение владельца: элемент принадлежит одному экрану и в библиотеку не входит.

## Каталог

| Группа | Паттерн | Статус |
|---|---|---|
| Типографика | [H1](h1.md), [H2](h2.md), [H3](h3.md) | Компоненты H1, H2, H3 |
| | [Lead](lead.md), [Body](body.md) | Компоненты Lead, Body |
| | [Caption](caption.md), [Help](help.md), [Kicker](kicker.md) | Компоненты Caption, Help, Kicker |
| Раскладка | [Stack](stack.md), [Cluster](cluster.md) | Компоненты Stack, Cluster |
| | [Container](container.md), [SplitLayout](split-layout.md), [AsidePanel](aside-panel.md), [MainPanel](main-panel.md) | Экран |
| Действия и ссылки | [Button](button.md) | Компонент Button |
| | [BackLink](back-link.md), [ExternalLink](external-link.md), [NavLink](nav-link.md) | Компоненты BackLink, ExternalLink, NavLink |
| | [Tooltip](../../components/Tooltip/README.md) — подсказка к значку по наведению и фокусу | Компонент Tooltip |
| | [Switcher](switcher.md) | Компонент Switcher |
| Декор | [Divider](divider.md), [Dot](dot.md), [IconArrow](icon-arrow.md) | Компоненты Divider, Dot, IconArrow |
| | [Icon](../../components/Icon/README.md) — объекты продукта и типы файлов | Компонент Icon |
| Код в тексте | [CodeChip](../../components/CodeChip/README.md) — коммит, ветка, путь, команда, идентификатор | Компонент CodeChip |
| Бейджи и выбор | [Pill](pill.md) | Компонент Pill |
| | [Chip](chip.md) | Заявка |
| Навигация | [Crumb](crumb.md), [Topbar](topbar.md) | Компоненты Crumb, Topbar (и TopbarStatus) |
| | [TopbarLink](../../components/TopbarLink/README.md) — ссылка шапки со счётчиком решений | Компонент TopbarLink |
| | [TopbarSteps](topbar-steps.md) | Заявка |
| | [StepIndicator](step-indicator.md) | Компонент StepIndicator |
| Ввод | [Field](form-field.md), [Input](input.md) | Компоненты Field, Input |
| | [Textarea](../../components/Textarea/README.md) — многострочное поле | Компонент Textarea |
| | [CommentForm](../../components/CommentForm/README.md) — комментарий к задаче с подсказкой упоминаний на «@» (роли и специалисты) | Компонент CommentForm |
| | [PasswordStrengthMeter](password-strength.md) | Компонент PasswordStrengthMeter |
| | [KeyInput](key-input.md), [SaveBar](save-bar.md) | Заявка |
| Данные | [UserAvatar](user-avatar.md) | Компонент UserAvatar |
| | [ResultRow](../../components/ResultRow/README.md), [ResultList](../../components/ResultList/README.md) — строки артефактов pr, file, report | Компоненты ResultRow, ResultList |
| | [ListRow](../../components/ListRow/README.md) — строка списка в боковой колонке | Компонент ListRow |
| | [RouteSteps](../../components/RouteSteps/README.md) — маршрут задачи в одну строку | Компонент RouteSteps |
| | [ActivityFeed](../../components/ActivityFeed/README.md), [ActivityEvent](../../components/ActivityEvent/README.md) — журнал задачи и лента «Шаги» сессии | Компоненты ActivityFeed, ActivityEvent |
| | [BudgetCell](budget-cell.md), [MetaLine](meta-line.md), [RoleCard](role-card.md) | Заявка |
| Обратная связь | [Plate](plate.md), [EmptyState](empty-state.md) | Компоненты Plate, EmptyState |
| | [Banner](banner.md) | Заявка |
| Подписи и шапки | [Brand](brand.md), [BrandSignature](brand-signature.md) | Компоненты Brand, BrandSignature |
| | [LinkBar](link-bar.md), [PageFooter](page-footer.md) | Компоненты LinkBar, PageFooter |
| | [FormHeader](form-header.md), [StageHeader](stage-header.md) | Компоненты FormHeader, StageHeader |
| Контейнеры | [Card](card.md) | Компонент Card |
| Терминал | [TerminalBox](terminal.md), [TerminalForecast](terminal-forecast.md) | Компоненты TerminalBox, TerminalForecast |
| Шаги флоу | [Timeline](timeline.md), [ProgressSteps](progress-steps.md) | Не создаётся |

## Каталог новых компонентов 2b

Имена, варианты и пропсы компонентов для экранов итерации 2 (карточка задачи, сессия агента, страница решения) —
[каталог 2b](../catalog/components-2b.md): источник правды для их состава; правки — PR в этот файл.

## Компоненты без паттерна в базе

Появились после базы; правила — в их README: [ConfirmDialog](../../components/ConfirmDialog/README.md),
[DescriptionList](../../components/DescriptionList/README.md), [SectionHeader](../../components/SectionHeader/README.md),
[Select](../../components/Select/README.md), [Spinner](../../components/Spinner/README.md),
[Table](../../components/Table/README.md), [TaskRef](../../components/TaskRef/README.md),
[TopbarStatus](../../components/TopbarStatus/README.md), [UpdatedAt](../../components/UpdatedAt/README.md).

## Как пополняется каталог

Новый элемент интерфейса предлагается в макете отдельным артбордом во всех состояниях и после утверждения
реализуется компонентом по заявке; правила его применения записываются в README компонента. Когда паттерн со статусом
«Заявка» получает компонент, статус в этой таблице и строка «Компонент» в файле паттерна обновляются в том же PR.
Порядок — [руководство дизайнера](../designer-guide.md) и [workflow](../workflow.md).
