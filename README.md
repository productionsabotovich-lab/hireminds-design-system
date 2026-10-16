# Hireminds Design System — «B2 · Frost Graphite»

Источник правды для визуального языка Hireminds: токены, базовые стили и UI-компоненты.
Продукт собирает экраны только отсюда. Брендбук — [docs/brand.md](docs/brand.md).

Витрина (превью и брендбук): https://claude.ai/artifact/5aJZ9yo2cVBZHKEsJE6pmx

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
scripts/                ← сборка токенов, бандла, типов, проверка рендера, упаковка витрины
```

## Команды

```bash
npm install
npm run build        # tokens.css + dist/bundle.js|css + dist/index.d.ts
npm run typecheck    # TypeScript по всем компонентам
npm run check        # рендер всех preview.html в headless Chromium → out/shots/
npm run pack:artifact  # раскладка для витрины → out/artifact/project/
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
| Токены и брендбук | Витрина в Claude Design (правка токенов, комментарии) или этот репозиторий | `tokens.json` в репозитории — итоговая версия; `npm run build:tokens` |
| Компоненты | Claude Code в этом репозитории | `npm run build && npm run check`, затем публикация в витрину |
| Экраны | Claude Code в репозитории продукта | обновляют зависимость `@hireminds/design-system` |

Публикация в Claude Design: `/design-sync` (скилл запускает человек) синхронизирует `components/`
с проектом дизайн-системы по одному компоненту, с подтверждением плана. Витрина-артефакт обновляется
через `npm run pack:artifact` и публикацию Claude.
