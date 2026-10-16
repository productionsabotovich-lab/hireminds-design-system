# H1

Главный заголовок страницы на display-шрифте в трёх размерах: display 30px, hero 42px и section 24px.

## Когда использовать
- display: auth и центрированные карточки («Подтверди свой email.», «Готово. Заходим в Hireminds.»), страницы ошибки и 404.
- hero: крупный заголовок с большим воздухом; section: шапка страниц настроек и дашборда («Acme Engineering»).
- `align="center"`: центрированные карточки email-sent и verify-success.
- Один H1 на страницу. Заголовок секции — H2, подзаголовок блока — H3, связка kicker + заголовок + абзац над формой — FormHeader.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| size | `"display" \| "hero" \| "section"` | `"display"` | 30px / 42px / 24px. |
| align | `"left" \| "center"` | `"left"` | Выравнивание. |
| children | `ReactNode` | обязательный | Текст; `<em>` выделяется цветом. |

## Правила
- Шрифт `font-display`, вес 600, цвет `ink`, margin 0.
- display: 30px, letter-spacing -0.03em, line-height 1.1. hero: 42px, -0.038em, 1.02. section: 24px, -0.022em, 1.1.
- Акцент через `<em>`: без курсива, цвет `accent-ink`; выделяй одно слово, а не весь заголовок.
- Размер меняй только через `size`: без инлайнового font-size и без положительного letter-spacing.

## Пример
```tsx
import { H1 } from "../index";

<H1 size="display" align="center">Подтверди свой email.</H1>
<H1>Готово. Заходим в <em>Hireminds</em>.</H1>
```
