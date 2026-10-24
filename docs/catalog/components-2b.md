Источник правды для имён и состава новых компонентов экранов 2b; правки — PR в этот файл.

# Каталог новых компонентов 2b — единый набор для трёх макетов (2026-10-23)

Источники: «Карточка задачи» (утверждена владельцем, её решения приоритетны), «Сессия агента», «Страница решения и
„Мои решения“»; компоненты системы — `components/index.ts`; правила — `designer-rules.md`; заметки — `ds-components-2b.md`.

Правило каталога: одна задача — один компонент. Имена из утверждённой карточки сохраняются. Новых токенов нет.
Цвет — только по смыслу (brand.md): `accent` — добавлено, пройдено, успех; `danger` — удалено, ошибка, лимит; `warn` —
возврат, повтор, напоминание; `dim` — нейтральное; `ink` — главная кнопка и живые метки.

## 1. Дубли и расхождения → решение

| Задача | Карточка задачи (утв.) | Сессия агента | Страница решения | Решение |
|---|---|---|---|---|
| Список файлов PR | `ResultRow` kind `file` в «Результате» | `Table` «Изменённые файлы» (путь, `+n −m` одной ячейкой) | `FileChanges` (таблица, полоса из 5 квадратов) | **`ResultRow` вариант `file`** везде: иконка по типу файла, цветной `+n −m`. `FileChanges` и `Table` файлов убрать. Полосу квадратов не переносить. |
| Карточка PR | строка `ResultRow` kind `pr` | `DescriptionList` «Pull request» + `ExternalLink` + mono | `PullRequest` (шапка, ветки, описание, статистика, проверки, вложенный FileChanges) | **`PullRequestSummary`** (full на странице решения, compact в «Что получилось») + список файлов `ResultRow` `file`. В «Результате» карточки остаётся строка `ResultRow` `pr` — это строка списка, не блок. |
| «Сейчас» | `SessionLive` — закреплённый виджет (ссылка в сессию, роль, `PlanProgress`, операция, время) | `SessionNow` — строка под шапкой (status, operation, detail, since, процентная полоса) | `LiveOperation` — копия v4 (live / paused / done) | **`SessionLive`** с вариантами `widget` (карточка задачи, карточка агента) и `now` (экран сессии). Полоса прогресса — `PlanProgress`. `SessionNow` и `LiveOperation` убрать. |
| План сессии | `PlanProgress` — сегменты done/total/null | `SessionPlan` — список пунктов с состояниями, подсветка нового пункта, процентная полоса | `PlanChecklist` — копия v4 (done · in_progress · pending · interrupted · paused) | **`SessionPlan`** (список) + **`PlanProgress`** (индикатор) в его заголовке и в `SessionLive`. `PlanChecklist` убрать; состояние `paused` не нужно — вопрос в сессию её не прерывает (ADR-0011). |
| Строка ленты | `ActivityEvent` (контрольные точки, виды phase … reminder) | `ActivityItem` (шаги из хуков: files, check, push, pr, error; бейдж результата) | — | **`ActivityEvent`** с группой видов `step` (files, check, push). На карточке задачи шаги не показываются (`ActivityFeed` их не выводит), на экране сессии лента «Шаги» — `ActivityFeed` variant `session`. `ActivityItem` убрать. |
| Счётчик в шапке | на экране `NavLink` с `badge count` и `badge soon` | `TopbarLink` (count, current, узкая подпись) | `NavLink · counter` — «новый вариант» (ink-заливка, 99+) | **`TopbarLink`** (count \| soon, current). `NavLink` по README — пункт боковой навигации, в шапку не подходит; вариант counter у `NavLink` не заводить. |
| Многострочное поле | «Textarea + подсказка ролей» (Composer) | — | `Textarea` (label, help, error, счётчик 500, disabled); на экране — `Field` | **`Textarea`** — поле; **`CommentForm`** — поле + подсказка ролей на «@» + кнопка «Отправить» (карточка задачи). Форма причины на странице решения — `Textarea` + две кнопки внутри блока действий, без отдельного компонента. |
| Закреплённая полоса действий | — | — | `ActionBar` (паттерн SaveBar) | **`ActionBar`** — остаётся; не дубль формы. Один компонент на все страницы с длинным блоком действий. |
| Пакет контекста | — | `ContextPackage` (sections, resume transcript/fresh/first, rounds, chips) | `ContextPackage` — копия v4 (`details/summary`) | **`ContextPackage`** по макету сессии. Из страницы решения копию убрать. Чипы внутри — `CodeChip`. |
| Полный вывод | — | `TerminalTranscript` (say, tool+результат, hook, in, err, meta; маска секрета; live) | `TerminalBox · log` + подкомпоненты `TerminalMask`, `TerminalHook` | **`TerminalTranscript`** — расширение `TerminalBox` `log`; `TerminalMask` и `TerminalHook` — его строки, не отдельная заявка. |
| Код в тексте | `CodeChip` (коммит, ветка, путь, команда, id; вариант-ссылка) | `mono()` — Caption mono; чипы `cp-chip` | `<code>`, `cv-mono`, чипы `nc-chip` | **`CodeChip`** везде. Паттерн `Chip` системы (выбираемый тег) — не для кода. |
| Строка списка в боковой колонке | `ListRow` (решения и сессии) | — | «Мои решения» — `Table` с `onRowClick` | Разные задачи: компактный список в боковой колонке — `ListRow`; инбокс с колонками и сортировкой — `Table` системы. В описании `ListRow` «нужна также „Моим решениям“» заменить на «Главной проекта». |
| Набор иконок | `Icon set` (priority, type, epic, repo, branch, runner, calendar, pull-request, file, report) | локальный `Icon` (check, inbox, layers, doc, log) | локальный `ICON` (pr, merged, file, layers, doc, log, inbox) | **`Icon`** — один набор: объединение имён + иконки типов файлов (ниже). |
| Вопрос в сессию | — | `SessionAsk` | — | **`SessionAsk`** — остаётся. |
| Карточка решения, маршрут, `Pill` ink, `DescriptionList` row | `DecisionCard`, `RouteSteps`, `Pill tone=ink`, `DescriptionList layout=row` | — | — | Остаются как в утверждённой карточке. |

Старые имена из заметок `ds-components-2b.md` (v3/v4) → каталог: PrCard → `PullRequestSummary`; FileStat → `ResultRow` `file`;
TerminalOutput → `TerminalTranscript`; LiveActivity → `SessionLive` (+ `ActivityFeed`); DecisionActions → блок из `Card`,
`Button`, `Body` системы (нового компонента нет); StickyActionBar → `ActionBar`; ReactionChain → `Plate` + `Card` системы;
Disclosure → `ContextPackage` (и `ResultList` со сворачиваемым заголовком); ProgressBar → `PlanProgress`; AskInSession →
`SessionAsk`; ListRow → `ListRow`; Chip → `CodeChip` (для кода) — выбираемый `Chip` в 2b не нужен.

## 2. Канонический каталог

Формат: назначение · варианты и состояния · пропсы (кратко) · где используется · что расширяет.

### Icon
- Набор монохромных иконок 16 px (есть 14) на `currentColor`, штрих в стиле `IconArrow` (lucide). В системе есть только `IconArrow`.
- Имена: `pull-request`, `pull-request-merged`, `file`, `report`, `priority`, `type`, `epic`, `repo`, `branch`, `runner`,
  `calendar`, `check`, `inbox`, `layers`, `doc`, `log`. **Типы файлов** (требование владельца): `file-ts` (ts и tsx),
  `file-md`, `file-json`, `file-yaml`, `file-css`, `file-test` (`*.test.*`, `*.spec.*`); прочие — `file`. Все монохромные,
  цвет текста строки (`mute`), без цветовых подложек.
- Пропсы: `name`, `size: 14 | 16` (по умолчанию 16).
- Где: `ResultRow`, «О задаче» (карточка), `ContextPackage`, `TopbarLink`, `ActivityEvent` (виды step), `PullRequestSummary`.
- Расширяет: добавляется рядом с `IconArrow`.

### CodeChip
- Правило foundations «код-чип: `font-mono` на `inset`, радиус `r-xs`» как компонент: коммит, ветка, путь, команда,
  идентификатор (S-118, D-44). Вариант-ссылка с подчёркиванием `line-3` ведёт на экран или в GitHub.
- Состояния: покой, ссылка (покой, наведение, фокус), длинное значение в узкой колонке (перенос по символам, без сокращений).
- Пропсы: `children` (значение как есть), `href`, `newTab`, `title`.
- Где: все три экрана — журнал, «О задаче», `PullRequestSummary` (ветки, коммит), `ContextPackage` (файлы и слои), `SessionLive` `now` (detail), «Что получилось».
- Расширяет: нет (новый атом).

### ResultRow и ResultList
- `ResultRow` — одна строка артефакта: иконка вида или типа файла (`Icon`, 16 px, `mute`), название одной строкой с обрезкой
  (имя файла `font-mono`, полный путь — в `title`), справа мета. Вся строка — ссылка; наведение — фон `inset`; фокус — кольцо как у `Input`.
- Варианты `kind`: `pr` (иконка `pull-request` / `pull-request-merged`, мета — `Pill` состояния), `file` (иконка по типу файла,
  мета — **счётчик `+n −m`**: `+n` цветом `accent`, `−m` цветом `danger`, `font-mono`; без счётчика — мета текстом: роль, редакция),
  `report` (иконка `report`, мета «7 из 9»).
- Состояния: покой, наведение, фокус, без ссылки (статичная), 375 px (только имя файла, путь в `title`, счётчик остаётся).
- Пропсы `ResultRow`: `kind: pr | file | report`, `name`, `path` (для иконки типа и `title`), `stat: { additions, deletions }`,
  `meta: ReactNode`, `href`, `newTab`.
- `ResultList` — контейнер строк: тонкая рамка на `surface`, заголовок с числом строк; `collapsible` (карточка задачи —
  «Результат», свёрнуто/развёрнуто), не сворачиваемый (страница решения, сессия); `more` + `moreHref` — «ещё n файлов в PR»
  (`ExternalLink`); пусто — `EmptyState mini`.
- Пропсы `ResultList`: `title`, `rows: ResultRow[]`, `collapsible`, `defaultOpen`, `more`, `moreHref`, `emptyText`.
- Где: карточка — «Результат» (pr, file, report); страница решения — «Что вы утверждаете» (файлы PR под `PullRequestSummary`;
  документ спецификации строкой `file` с `+n −m` к прошлой редакции); сессия — «Что получилось» (файлы запуска).
- Расширяет: нет. Заменяет `FileChanges`, `FileStat` и `Table` файлов.

### PullRequestSummary
- Блок PR или MR — объект решения «Приёмка» и итог сессии: заголовок `#номер · название` (ссылка), репозиторий и ветки
  `head → base` (`CodeChip`), `Pill` состояния, описание (строки), статистика (файлы, `+n −m` цветом, коммит `CodeChip`, автор),
  состояние проверок — `Pill` с точкой (`accent` пройдено, `danger` не пройдено, `dim` «нет данных»). Список файлов — `ResultList` строками `ResultRow` `file`.
- Варианты: `full` (описание + статистика + проверки + файлы) — страница решения; `compact` (заголовок, ветки, статистика, без описания) — «Что получилось» в сессии.
- Состояния: открыт, черновик, влит, закрыт; проверки пройдены / не пройдены / нет данных; 375 px (статистика в две колонки, файлы — имена).
- Пропсы: `number`, `title`, `href`, `repo`, `head`, `base`, `state: open | draft | merged | closed`, `description: string[]`,
  `stats: { files, additions, deletions, commit, author }`, `checks: { label, tone }[]`, `variant: full | compact`, `children` (`ResultList`).
- Где: страница решения «Что вы утверждаете» (full); сессия «Что получилось» (compact). В карточке задачи — только строка `ResultRow` `pr`.
- Расширяет: нет. Заменяет `PullRequest`, `PrCard`.

### ActivityFeed и ActivityEvent
- `ActivityFeed` — хронологический журнал. Вариант `task` (карточка): дни «Сегодня», «Вчера», дата; переходы фаз — главы;
  `Switcher` «Сообщения / Вся активность»; шаги сессии не выводятся. Вариант `session` (экран сессии, лента «Шаги»): без
  дней, все виды включая `step`, живая лента с `UpdatedAt`.
- Пропсы `ActivityFeed`: `variant: task | session`, `events`, `view: messages | all`, `now`, `loading`, `emptyText`.
- `ActivityEvent` — одна запись: маркер (`Dot` по тону: `ink` сессии и служебные, `accent` утверждено и сделано, `warn` возврат,
  напоминание, замечание, `danger` ошибка, `dim` устарело и остановлено), время, кто (роль, человек, «Hireminds», «Linear»),
  что произошло одной строкой (идентификаторы — `CodeChip`), вторая строка — причина или ссылка; реплика роли — аватар и текст;
  переход фазы — разделитель с `Pill tone=ink`; итог — `pill`.
- Виды: контрольные точки — `phase, session, message, pr, decision, return, note, error, reminder`; шаги (только variant `session`) — `files, check, push, ask`.
- Пропсы `ActivityEvent`: `kind`, `tone`, `actor`, `time`, `children`, `detail`, `quote`, `files` (`CodeChip[]`), `pill` (результат проверки — `Pill accent | danger`).
- Где: карточка — журнал; сессия — лента «Шаги».
- Расширяет: нет. Заменяет `ActivityItem`, `LiveActivity`.

### SessionLive и PlanProgress
- `SessionLive` — что агент делает сейчас. Вариант `widget` (карточка задачи, карточка агента в итерации 3): закреплён над
  журналом под шапкой, весь блок — ссылка в «Сессию агента»; роль и сессия, пометка возобновления, `PlanProgress`, текущая
  операция, время; исчезает по завершении. Вариант `now` (экран сессии, под шапкой): метка «Сейчас» / «Повтор», операция,
  `detail` моноширинным (`CodeChip`), время операции, пункт плана «4 из 6 · название», `PlanProgress`.
- Состояния: `running` (точка с пульсом; без пульса при `prefers-reduced-motion`), `starting` («План ещё не получен»),
  `answering` (ответ на вопрос после шага), `retrying` (`warn` — только у повтора после технической ошибки), `loading`
  («обновляется»), наведение и фокус (widget), 375 px (аватар скрыт, роль в заголовке).
- Пропсы: `variant: widget | now`, `status`, `role`, `sessionId`, `href`, `resumed: transcript | no-transcript | null`,
  `plan: { done, total, current } | null`, `operation`, `detail`, `since`, `loading`.
- `PlanProgress` — индикатор плана сегментами: `done` из `total`; `null` — «План ещё не получен»; текущий сегмент пульсирует вместе с точкой «идёт» (1,6 с; при `prefers-reduced-motion` — контур).
- Пропсы `PlanProgress`: `done`, `total`, `live`.
- Где: карточка (widget), сессия (now, и `PlanProgress` в заголовке `SessionPlan`).
- Расширяет: нет. Заменяет `SessionNow`, `LiveOperation`, `ProgressBar`.

### SessionPlan
- План сессии от раннера (TodoWrite) с состоянием каждого пункта; заголовок «План работы · 4 из 6» и `PlanProgress`;
  агент добавил пункт — подсветка 2,4 с и метка «новый пункт» (AC-18); подпись «Пункты агент ведёт сам; критерии приёмки — в спецификации задачи».
- Состояния пункта: `done` (галочка `accent`), `in_progress` (вращение у идущей сессии), `pending`, `interrupted` (метка «прервано», `danger`). Состояния блока: идёт, добавлен пункт, плана нет (`empty`), выполнен, прерван, 375 px.
- Пропсы: `items: { text, status, added? }[]`, `live`, `highlight`, `empty`.
- Где: сессия — боковая колонка; на телефоне — после «Что получилось».
- Расширяет: нет. Заменяет `PlanChecklist`.

### ContextPackage
- «Что получил агент» — состав пакета контекста (AC-15): скиллы и хуки трёх слоёв, задача, журнал, входящие, файлы проекта.
  Свёрнут по умолчанию, состав виден в заголовке; заголовок нажимается целиком; строка о возобновлении (AC-19): с транскриптом,
  без транскрипта (выделена), первый запуск. Элементы разделов — `CodeChip`, иконки — `Icon`. Подпись: промпты и системные инструкции не показываются.
- Состояния: свёрнут, развёрнут, без транскрипта, первый запуск, 375 px.
- Пропсы: `sections: { kind, title, count, text, items? }[]`, `resume: transcript | fresh | first`, `rounds`, `defaultOpen`.
- Где: сессия — основная колонка над ходом работы.
- Расширяет: нет (паттерн Disclosure). Копия на странице решения убирается.

### SessionAsk
- Вопрос в идущую сессию (ADR-0011): автор (человек или PM), источник («тред Linear»), текст, состояние; ответ агента
  внутри той же карточки с адресом ответа.
- Состояния: `queued` («В очереди · ответ после текущего шага»), `answering`, `answered` (галочка `accent`), замечание PM (итерация 3), 375 px.
- Пропсы: `from: { name, kind: human | pm }`, `source`, `status`, `text`, `at`, `answer: { text, at }?`, `mode: after_step | now` (now — итерация 3).
- Где: сессия — лента «Шаги» в момент поступления вопроса (как `ActivityEvent` kind `ask` с телом `SessionAsk`).
- Расширяет: нет.

### TerminalTranscript
- «Полный вывод» — всё, что писал Claude Code: речь агента, вызовы инструментов с результатом (свёрнут, «показать n строк»),
  события хуков, входящие, ошибки, служебные строки; живой поток с курсором и меткой live; шапка закреплена, прокручивается тело;
  автопрокрутка, пока человек не прокрутил вверх. Секреты заменены «●●●●●● скрыто» до показа (значение до браузера не доходит).
- Строки: `say`, `tool` (name, arg, result, out), `hook` (= `TerminalHook`, отдельный цвет), `in`, `err`, `meta`;
  маска секрета — `TerminalMask` внутри любой строки.
- Состояния: живой поток, результат развёрнут, секрет, ошибка, завершён (подвал «транскрипт сохранён платформой · 51 ход · 47 мин»), 375 px.
- Пропсы: `title`, `live`, `lines: Line[]`, `follow`, `footer`.
- Где: сессия — вкладка «Полный вывод» (по умолчанию открыта «Шаги»).
- Расширяет: `TerminalBox` variant `log`; добавляет строки `TerminalHook` и `TerminalMask` к существующим `TerminalLine*`.

### DecisionCard
- Открытое решение в закреплённой зоне над журналом: гейт, идентификатор (`CodeChip`-ссылка), `Pill` «Ждёт решения»,
  строка «ответственный · ждёт · напоминание», главная кнопка `ink` «Открыть решение». Закреплена вместе с `SessionLive`
  (решение выше сессии); после ответа исчезает, итог — строка журнала.
- Состояния: ждёт решения с напоминанием, только открыто, 375 px.
- Пропсы: `decision`, `href`.
- Где: карточка задачи.
- Расширяет: нет.

### RouteSteps
- Маршрут задачи в одну строку: точки с линией, подписи по центру; пройденные — `mute` с точкой `accent`, текущий — `ink` 600
  с живой точкой `ink`, будущие — `mute` с пустой точкой. Собран из `Dot` и `Caption`.
- Состояния: в работе, ждёт решения, только создана, принята (все пройдены), 375 px.
- Пропсы: `steps: string[]`, `current`, `done`.
- Где: карточка задачи.
- Расширяет: нет (`StepIndicator` системы — вертикальный мастер форм, не подходит).

### ListRow
- Кликабельная строка списка в боковой колонке, без кнопки «Открыть»: аватар (`UserAvatar xs`), название с идентификатором
  (`CodeChip`), одно состояние `Pill` справа, вторая строка — кто, когда, канал, длительность. Списки — в рамке на `surface`; пусто — `EmptyState mini`.
- Состояния: ссылка (покой, наведение, фокус), без ссылки, 375 px.
- Пропсы: `href`, `newTab`, `lead`, `title`, `code`, `trailing`, `sub`.
- Где: карточка задачи — «Решения», «Сессии ролей»; «Главная проекта» (итерация 2). «Мои решения» остаются на `Table` системы.
- Расширяет: нет.

### TopbarLink
- Ссылка правого слота `Topbar` (перед аватаром) для всех экранов webapp: иконка `Icon`, подпись, бейдж.
  Бейдж `count` — число открытых решений (заливка `ink` при > 0, `inset` при 0, «99+»), `aria-label` «Мои решения: N открыто»;
  бейдж `soon` — «итерация 3» для «Моя команда», «Журнал» (неактивная ссылка).
- Состояния: есть решения, нет решений, много, текущая страница (`aria-current`, заливка `inset`), soon, 375 px (подпись «Решения»).
- Пропсы: `href`, `label`, `shortLabel`, `icon`, `badge: { kind: count | soon, value }`, `current`.
- Где: все три экрана — шапка.
- Расширяет: `Topbar` (правый слот). Не вариант `NavLink`: тот — пункт боковой навигации.

### Textarea
- Многострочное поле: подпись (с пометкой «обязательно»), поле (3 строки по умолчанию), снизу подсказка или ошибка
  (`aria-describedby`, `role=alert`), счётчик «n / 500». Фокус — кольцо как у `Input`.
- Состояния: пусто, фокус, ошибка, заполнено, недоступно (`bg-2`, текст `mute`).
- Пропсы: `id`, `label`, `value`, `onChange`, `placeholder`, `help`, `error`, `rows`, `maxLength`, `required`, `disabled`.
- Где: страница решения — причина возврата и остановки (вместо `Field`); карточка — внутри `CommentForm`.
- Расширяет: `Field` / `Input` (многострочный вариант).

### CommentForm
- Комментарий к задаче: `Textarea` с подсказкой ролей на «@» (список фильтруется по набранному, выбор подставляет роль;
  `role=listbox`), подпись «Комментарий попадает в журнал и в тред Linear», кнопка `ink` «Отправить».
- Состояния: пусто, набрано «@» (все роли), набрано «@Dev» (фильтр), отправка, 375 px.
- Пропсы: `value`, `placeholder`, `mentions: string[]`, `onSubmit`, `loading`.
- Где: карточка задачи — под журналом.
- Расширяет: `Textarea`.

### ActionBar
- Закреплённая внизу полоса главных действий решения (паттерн SaveBar из brand.md): вопрос решения и задача, те же два
  варианта, что в блоке действий; видна, пока блок действий ниже экрана; отступ снизу учитывает `safe-area-inset-bottom`.
  Кнопки — дубль для мыши и касаний: не входят в порядок Tab и не читаются диктором. Вариант с причиной прокручивает к блоку и открывает `Textarea`.
- Состояния: гейт, лимит возвратов, отправка (`loading`), 375 px (кнопки в столбик, одной ширины).
- Пропсы: `summary`, `actions: { label, variant, onSelect }[]`, `visible`, `loading`.
- Где: страница решения; любая страница с длинным блоком действий.
- Расширяет: нет (паттерн SaveBar без тёмной поверхности и `accent`-кнопки).

### Расширения существующих компонентов (не новые)
- `Pill` — тон `ink` (фон `ink`, текст белый): только для названия фазы в строке перехода журнала; README — таблица «состояние → тон».
- `DescriptionList` — `layout: stack | row`: подпись и значение в одной строке для «О задаче»; длинные моно-значения обрезаются, полный текст — в `title`.
- `Button` — кольцо фокуса как у `Input` (AC-16).
- `Table` — две колонки на 375 px («Мои решения», «Предыдущие этапы»); backlog `stackBelow`.
- Container `page` 1180 px — одна ширина на всех экранах.

## 3. Правки по макетам

### 3.1 «Карточка задачи» (утверждена; правки только по согласованию имён и требованию владельца)
1. Шапка: `NavLink` с `badge count` «Мои решения» и `badge soon` «Моя команда», «Журнал» → `TopbarLink` (count, soon). Компонент добавить в раздел «Новые компоненты».
2. «Результат»: `ResultRow` `file` — иконка по типу файла из `Icon` (`PIL-15-roles.md` → `file-md`; отчёт QA остаётся `report`); у строк с изменениями — счётчик `+n −m` цветом (`accent` / `danger`); мета «Аналитик» и «7 из 9» остаются там, где счётчика нет. В спеке `ResultRow` добавить пропсы `path`, `stat`; в описании — правило цвета счётчика.
3. `Icon set` → `Icon`: дополнить именами `file-ts`, `file-md`, `file-json`, `file-yaml`, `file-css`, `file-test`, `pull-request-merged`, `check`, `inbox`, `layers`, `doc`, `log`.
4. `SessionLive`: описать как вариант `widget` единого `SessionLive` (второй вариант `now` — на экране сессии); добавить `status` (running, starting, answering, retrying).
5. `ActivityEvent`: в описании видов заменить «шагов сессии среди видов нет» на «виды `step` (files, check, push, ask) выводятся только в `ActivityFeed` variant `session`». `ActivityFeed` — добавить `variant: task | session`.
6. «Textarea + подсказка ролей» → `CommentForm` (на `Textarea` со страницы решения); пометка на экране «компонент: Textarea» → «CommentForm».
7. `ListRow`: в назначении «Нужна также „Моим решениям“ и „Главной проекта“» → «Нужна также „Главной проекта“» («Мои решения» — `Table` системы).
8. `CodeChip`, `DecisionCard`, `RouteSteps`, `PlanProgress`, `Pill ink`, `DescriptionList row` — без изменений.

### 3.2 «Сессия агента»
1. `SessionNow` → `SessionLive` variant `now`; процентную полосу `sn-bar` → `PlanProgress`; `detail` — `CodeChip`. Раздел «Новые компоненты» и карту паттернов переименовать.
2. `SessionPlan`: полосу `sp-bar` → `PlanProgress` в заголовке; состояния пунктов — done, in_progress, pending, interrupted; галочка — `Icon check`.
3. `ActivityItem` → `ActivityEvent` (виды `step`: files, check, push; `result` → `pill`; `actor` platform → «Hireminds»); лента «Шаги» → `ActivityFeed` variant `session`; пути файлов и ветки — `CodeChip` вместо `mono()`.
4. «Что получилось»: строку `DescriptionList` «Pull request» (`ExternalLink` + mono) → `PullRequestSummary` compact; `Table` «Изменённые файлы» → `ResultList` строк `ResultRow` `file` (иконка по типу: `MembersTable.tsx` → `file-ts`, `viewer-actions.test.tsx` → `file-test`; `+n −m` цветом); на 375 px — имя файла, путь в `title`. «Незавершённые правки» и «Локальные проверки» остаются в `DescriptionList`; коммит и ветка — `CodeChip`.
5. `ContextPackage`: чипы `cp-chip` → `CodeChip`; иконки разделов — `Icon`.
6. `TerminalTranscript`: в описании отметить, что строки `hook` и маска секрета — это `TerminalHook` и `TerminalMask` (подкомпоненты `TerminalBox`), отдельной заявки на них нет.
7. `TopbarLink`: на экране `NavLink` с `badge count` → `TopbarLink`; в описании добавить бейдж `soon` и 375 px «Решения».
8. `SessionAsk` — без изменений; в ленте — как `ActivityEvent` kind `ask`.
9. Локальный `Icon` (check, inbox, layers, doc, log) → общий `Icon`.
10. Таблица «Блоки экрана и компоненты»: «Сейчас» → SessionLive · now + PlanProgress; «План работы» → SessionPlan + PlanProgress; «Шаги» → ActivityFeed · session + ActivityEvent; «Что получилось» → PullRequestSummary · compact + ResultRow · file; шапка → TopbarLink.

### 3.3 «Страница решения и „Мои решения“»
1. «Что вы утверждаете» для PR: `PullRequest` + `FileChanges` (таблица, полоса из пяти квадратов, `DescriptionList` статистики) → `PullRequestSummary` full + `ResultList` строк `ResultRow` `file` (иконка по типу файла, `+n −m` цветом `accent` / `danger`); «ещё 8 файлов в PR» → `ResultList` `more` / `moreHref`; полосу квадратов убрать; ветки и коммит — `CodeChip` вместо `<code>` и `cv-mono`. Раздел `FileChanges` из «Новых компонентов» удалить; `PullRequest` → `PullRequestSummary` (состояния: открыт с файлами, проверка не пройдена, нет данных, влит, 375 px).
2. «Что вы утверждаете» для спецификации (`SpecObject`): строку «Документ» → `ResultRow` `file` (иконка `file-md`, счётчик «+46 −9» к редакции 2 цветом); «Редакция», «Автор» — `DescriptionList` под строкой.
3. Поле причины: `H.Field` → `Textarea` (label, help, error «Укажите причину», счётчик 500, disabled после решения); на экране убрать пометку «на экране сейчас Field».
4. Шапка: `NavLink` с `badge count` и раздел «NavLink · counter — новый вариант» → `TopbarLink` (count: есть, нет, много, текущая; soon для «Моя команда», «Журнал»). У `NavLink` варианта не заводить.
5. Раздел «С экранов „Сессия агента“ и „Карточка задачи“» (`LiveOperation`, `PlanChecklist`, `ContextPackage`, `TerminalBox · log` + `TerminalMask`, `TerminalHook`) удалить целиком; в карте паттернов сослаться на каталог: `SessionLive`, `SessionPlan` + `PlanProgress`, `ContextPackage`, `TerminalTranscript` — макет HIR-32.
6. `ActionBar` — без изменений; в описании оставить ссылку на паттерн SaveBar и правило «кнопки — дубль, не в порядке Tab».
7. Таблица «Долг черновика v4», колонка «Чем закрыт»: dp-pr → `PullRequestSummary`; dp-fs → `ResultRow` `file`; textarea → `Textarea`; inbox-link → `TopbarLink`; ss-op → `SessionLive` `now`; ss-plan → `SessionPlan` + `PlanProgress`; ss-raw → `TerminalTranscript`; tc-live → `SessionLive` `widget`.
8. Карта паттернов: «Новые компоненты: PullRequestSummary, ResultRow · file (с ResultList), ActionBar, Textarea, TopbarLink; CodeChip и Icon — общие с карточкой задачи».
9. «Мои решения»: `Table` с `onRowClick` остаётся; на 375 px — две колонки.

## 4. Открытые пункты (для архитектора, не для макетов)
- `ListRow` против `Table` в «Мои решения»: каталог оставляет `Table` (компонент системы, колонки и сортировка); если владелец захочет единый вид строки решения на всех экранах — `ListRow` с вариантом `inbox`, тогда правка макета HIR-30.
- Счётчик `+n −m` у строки `ResultRow` `pr` в «Результате» карточки: показывать суммарно по PR или нет — в макете карточки сейчас только `Pill` состояния; каталог допускает `stat` и у `pr`.
