# hireminds-design-system — инструкции для Claude

Это источник правды визуального языка Hireminds. Продукт собирает экраны только отсюда.
Перед работой прочитай: [README.md](README.md), [docs/brand.md](docs/brand.md),
[docs/moodboard/README.md](docs/moodboard/README.md), [docs/pipeline.md](docs/pipeline.md),
[docs/workflow.md](docs/workflow.md).

## Правила

- **Токены:** правишь только `tokens/tokens.json` (формат: каждое семейство — список `{name, value, usage}`).
  `tokens/tokens.css` генерируется `npm run build:tokens`, руками не трогать. У каждого токена — `usage`.
- **Компонент = папка** `components/<Comp>/`: `<Comp>.tsx`, `<Comp>.module.css`, `index.ts`,
  `<Comp>.stories.tsx`, `README.md`, `preview.html`. Новый компонент — сразу всё шесть и экспорт в `components/index.ts`.
- **Стили только через токены:** `var(--ink)`, `var(--space-4)`, `var(--r-md)`, `var(--font-ui)`.
  Точные значения из макетов, которых нет в шкале, допустимы с комментарием (как 9px в Brand).
  Шкала отступов — шаг 4px; значения 14/18px из макетов округляются до шага вверх.
- **API props-driven:** явные пропсы, текст через `children`; компонент должен описываться JSON-ом.
- **Контраст — WCAG AA:** текст 4.5:1 на своём фоне (3:1 для 24px+ и для рамок контролов, иконок, фокуса).
  Текст на цветной заливке — `-ink` своей семьи.
- **README компонента:** первое предложение — summary; разделы «Когда использовать», «Пропсы», «Правила», «Пример».
  Пиши по-русски, токены называй в бэктиках без `--`.
- **preview.html:** первая строка `<!-- @dsCard group="…" height=N -->`, затем документ, который рендерит
  `window.Hireminds.<Comp>` через `React.createElement` с реальными текстами продукта.

## Заявки из Linear

Заявки на доработку приходят задачами в Linear: команда **HIR** (Hireminds), метка **`design-system`**.
Их заводят сессия платформы `hireminds-platform` и владелец
(репо `productionsabotovich-lab/hireminds-platform`, webapp подключает эту систему зависимостью).
Правки токенов и бренда из Claude Design переносит скилл `/pull-design-edits`. Порядок подробно — [docs/workflow.md](docs/workflow.md).

- **Где смотреть:** в начале сессии и по просьбе — задачи HIR с меткой `design-system` в статусах `Backlog` и `Todo`.
- **Взял в работу:** статус `In Progress`, комментарий «взял» и короткий план (какие файлы, какие компоненты).
- **Непонятно, что делать** или нет критерия «готово» — вопрос комментарием, статус не меняй, не угадывай.
- **Сделал:** `npm run build && npm run typecheck && npm run check`, ветка и PR в `main` со скриншотами изменённых
  компонентов, задача — `In Review` со ссылкой на PR. Ревью и влитие PR — сессия платформы `hireminds-platform`;
  одобрения владельца на отдельный компонент или PR не нужно.
- **PR влит:** `Done` с комментарием: ссылка на коммит
  `https://github.com/productionsabotovich-lab/hireminds-design-system/commit/<sha>`, что поменялось
  (компоненты, пропсы, токены) и что обновить в платформе.
- **Не про дизайн-систему** — комментарий, статус не трогай. Дубль — `Duplicate` со ссылкой на оригинал.
- После `Done` опубликуй витрину (`/publish-library`) и, если сессия `hireminds-platform` запущена, коротко напиши ей
  (SendMessage), что вышло и какой коммит.

## Проверка перед тем как сказать «готово»

```bash
npm run build && npm run typecheck && npm run check
```

`check` должен показать все превью `ok`; посмотри скриншоты изменённых компонентов в `out/shots/`.

## Публикация

- **Витрина** публикуется после каждого влития в `main` автоматически, без отдельного «да»: скилл `/publish-library`
  (`npm run build && npm run check && npm run pack:page`, затем `out/vitrina.html` инструментом Artifact в
  https://claude.ai/artifact/JprvN1cDAN8BiMJ7wVBZKm той же ссылкой). Артефакт приватный. Прежняя витрина типа Design System
  (5aJZ9yo2cVBZHKEsJE6pmx) не обновляется; `pack:artifact` оставлен, но не используется.
- **GitHub:** ветка и PR — по задаче HIR с меткой `design-system`; в `main` напрямую не пишешь. PR проверяет и вливает
  сессия платформы `hireminds-platform`.
- **Правки из Claude Design** переносятся в репозиторий PR-ом через `/pull-design-edits`, с указанием источника.
- **Макеты экранов** не верстай: их рисует агент-дизайнер платформы в Claude Design. Компоненты по утверждённому
  макету — `/from-design`; правила компонента — `/component`.
- `/design-sync` синхронизирует со старым сайтом claude.ai/design (закрывается 14.12.2026) и в конвейере не используется.

## Безопасность

Ключи и токены не светить в чате, логах и коммитах.
