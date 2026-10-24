# Hireminds Design System — «B2 · Frost Graphite»

Источник правды для визуального языка Hireminds: токены, базовые стили и UI-компоненты.
Продукт собирает экраны только отсюда. Брендбук — [docs/brand.md](docs/brand.md).

Витрина (превью, токены, брендбук и документы одной страницей): https://claude.ai/artifact/JprvN1cDAN8BiMJ7wVBZKm

## Структура

```
tokens/tokens.json      ← ИСТОЧНИК ПРАВДЫ: цвета, типографика, отступы, радиусы, тени
tokens/tokens.css       ← генерируется из tokens.json (npm run build:tokens), руками не править
styles/base.css         ← reset, базовый body, общие анимации (rise, pop, scan)
fonts/                  ← Geist Mono (Inter и Inter Tight — с Google Fonts)
components/<Comp>/
  <Comp>.tsx            ← компонент
  <Comp>.module.css     ← стили (CSS Modules, только токены)
  <Comp>.stories.tsx    ← Storybook
  index.ts              ← публичный экспорт
  README.md             ← гайдлайн: когда использовать, пропсы, правила
  preview.html          ← живое превью для витрины (1-я строка — маркер @dsCard)
components/index.ts     ← все экспорты библиотеки
docs/brand.md           ← брендбук: голос, цвет, типографика, отступы, состояния, иконки
docs/foundations.md     ← основы: правила цвета, типографики, отступов, радиусов и теней
docs/patterns/          ← паттерны применения и компоненты, которые их реализуют
docs/moodboard/         ← мудборд «B2 · Frost Graphite» — эталон настроения
docs/designer-guide.md  ← руководство дизайнера для макетов в Claude Design
docs/pipeline.md        ← конвейер: Claude Design работает с дизайном, Claude Code пишет код
docs/workflow.md        ← работа агента с заявками HIR design-system
.claude/skills/         ← скиллы агента: component, from-design, publish-library, pull-design-edits
scripts/                ← сборка токенов, бандла, типов, проверка рендера, упаковка витрины
```

## Команды

```bash
npm install
npm run build        # tokens.css + dist/bundle.js|css + dist/index.d.ts
npm run typecheck    # TypeScript по всем компонентам
npm run check        # рендер всех preview.html в headless Chromium → out/shots/
npm run pack:page    # витрина одной страницей → out/vitrina.html
```

## Подключение в приложение (Next.js)

```jsonc
// package.json приложения
"dependencies": { "@hireminds/design-system": "github:<owner>/hireminds-design-system" }
```

```ts
// next.config.ts — компоненты поставляются исходниками
const nextConfig = { transpilePackages: ["@hireminds/design-system"] };
```

```tsx
// app/layout.tsx
import "@hireminds/design-system/tokens/tokens.css";
import "@hireminds/design-system/styles/base.css";
import { Inter, Inter_Tight } from "next/font/google"; // семейства "Inter" и "Inter Tight"

// экран
import { Button, Card, Field } from "@hireminds/design-system/components";
```

Правила для экранов: только компоненты и токены отсюда, никаких HEX и «голых» px в стилях экранов,
новые визуальные решения — сначала в дизайн-систему, потом в экран.

## Кто что меняет

| Что | Где правится | Как доходит до остальных |
|---|---|---|
| Токены и брендбук | этот репозиторий: `tokens/tokens.json`, `docs/brand.md`; правки из Claude Design переносятся PR-ом (`/pull-design-edits`) | после влития в `main` — сборка и публикация витрины |
| Компоненты | Claude Code в этом репозитории по задачам HIR с меткой `design-system` | проверки, влитие в `main`, публикация витрины |
| Макеты экранов | Claude Design на системе Hireminds: агент-дизайнер платформы по брифу | утверждение владельцем, задачи на недостающие компоненты |
| Экраны продукта | Claude Code в репозитории платформы | обновление зависимости `@hireminds/design-system` |

Витрина — одна страница с превью всех компонентов, токенами и документами. После каждого влития в `main` агент
пересобирает систему (`npm run build && npm run check && npm run pack:page`) и публикует витрину той же ссылкой (скилл
`publish-library`); PR — по задаче HIR, проверяет и вливает агент платформы. Конвейер целиком —
[docs/pipeline.md](docs/pipeline.md). Команда `/design-sync` синхронизирует со старым сайтом claude.ai/design
и в конвейере не используется.
