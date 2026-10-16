# hireminds-design-system — инструкции для Claude

Это источник правды визуального языка Hireminds. Продукт собирает экраны только отсюда.
Перед работой прочитай [README.md](README.md) и [docs/brand.md](docs/brand.md).

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

## Проверка перед тем как сказать «готово»

```bash
npm run build && npm run typecheck && npm run check
```

`check` должен показать все превью `ok`; посмотри скриншоты изменённых компонентов в `out/shots/`.

## Публикация

Ничего не публикуй (GitHub, витрина-артефакт, Claude Design) без явного «да» от человека.
Витрина: `npm run pack:artifact`, затем публикация файлов `out/artifact/project/` в артефакт
https://claude.ai/artifact/5aJZ9yo2cVBZHKEsJE6pmx — индекс `project/design-system.json` читается и
обновляется последним. Claude Design — через `/design-sync`, который запускает человек.

## Безопасность

Ключи и токены не светить в чате, логах и коммитах.
