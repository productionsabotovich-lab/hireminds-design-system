# Изменения

Версии — [semver](https://semver.org/lang/ru/). Пока система в `0.x`: **minor** — новый компонент, проп, вариант
или токен, а также изменение, после которого экраны платформы нужно править; **patch** — исправление без изменения API
(стили, превью, README). Каждый PR, который меняет пакет (`components/`, `tokens/`, `styles/`, `fonts/`), поднимает
версию в `package.json` и добавляет раздел сюда; после влития в `main` тег `vX.Y.Z` и релиз создаются автоматически.
Платформа ставит пакет по тегу: `github:productionsabotovich-lab/hireminds-design-system#vX.Y.Z`.

Раздел: `## X.Y.Z — ГГГГ-ММ-ДД`, внутри — «Добавлено», «Изменено», «Исправлено» и «Что обновить в платформе».

## 0.4.0 — 2026-10-24

Журнал задачи и лента «Шаги» сессии по макету «Карточка задачи» (HIR-41). Новых токенов нет.

### Добавлено
- `ActivityEvent` — запись журнала: маркер `Dot` по тону вида или аватар роли (`message`), «кто — что» (`actor`,
  `children`), `detail` одной строкой, `quote`, `files` (`CodeChip`), `pill`, время. `kind="phase"` — глава с `Pill`
  `ink`. Виды: `phase`, `session`, `message`, `pr`, `decision`, `return`, `note`, `error`, `reminder`; шаги `files`,
  `check`, `push`, `ask`. Экспортирует `ACTIVITY_TONE` — тон по умолчанию для вида.
- `ActivityFeed` — `variant: task | session`, `events`, `view: messages | all` (+ `onViewChange`), `now`, `loading`,
  `emptyText`, `title`, `updatedAt`. `task`: дни «Сегодня» / «Вчера» / дата, `Switcher`, без шагов; `session`: без
  дней, все виды, `UpdatedAt`.

### Что обновить в платформе
- Тег `#v0.4.0`.
- Журнал карточки задачи — `<ActivityFeed events={…} now={…} />` вместо локальных `ActivityItem` и `LiveActivity`;
  лента «Шаги» экрана сессии — `<ActivityFeed variant="session" updatedAt={…} />`.

## 0.3.0 — 2026-10-24

Расширения существующих компонентов по макету «Карточка задачи» (HIR-49). Новых компонентов и токенов нет.

### Добавлено
- `Pill`: `tone="ink"` — фон `ink`, белый текст; только название фазы в строке перехода журнала. В README — таблица
  «состояние → тон».
- `DescriptionList`: `layout: "stack" | "row"` (по умолчанию `stack`); у пункта `icon` (`IconName`) и `title`. `row` —
  подпись и значение в одной строке для «О задаче», строки 36px, длинное значение с многоточием, полный текст в `title`
  (у строки-значения — сам).

### Изменено
- `Button`: кольцо фокуса `accent` 2px с отступом 2px на всех вариантах.
- Правило ширины: экраны webapp — контейнер `page`, содержимое 1180px, паддинги снаружи (`docs/patterns/container.md`,
  foundations); `wide` 1200 — устарело.
- Словарь в примерах и превью: «Блокер» → «Ошибка», «Круг» → «Возвраты».

### Что обновить в платформе
- Тег `#v0.3.0`.
- Фаза в строке перехода журнала — `<Pill tone="ink">`.
- Блок «О задаче» — `<DescriptionList layout="row" items={[{ label, icon, value, mono?, title? }]} />`.
- Контейнер страницы — `max-width: 1180px` содержимого на всех экранах.

## 0.2.0 — 2026-10-24

Первая версия с тегом: всё, что влито в `main` до этого момента (PR #1–#16). 53 компонента в 11 группах витрины.

### Добавлено
- Компоненты итерации 2: `Icon` (набор иконок и `iconForFile`), `CodeChip`, `Textarea`, `ResultRow` и `ResultList`,
  `ListRow`, `TopbarLink`.
- Витрина одной страницей: `npm run pack:page` → `out/vitrina.html`, публикуется после каждого влития
  (https://claude.ai/artifact/JprvN1cDAN8BiMJ7wVBZKm).
- Проверки в GitHub Actions на каждый PR: сборка, типы, рендер всех превью, версия и CHANGELOG.

### Что обновить в платформе
- Зависимость `@hireminds/design-system` — с хеша коммита на тег `#v0.2.0`.
