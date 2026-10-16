# H3

Подзаголовок внутри блока на display-шрифте: card 15px для карточек-шагов и inline 13.5px для шагов таймлайна.

## Когда использовать
- card: заголовки карточек-шагов на дашборде («Workspace создан», «Подключи Anthropic key», «Найми первого агента»).
- inline: шаги таймлайна в aside forgot-password («Введи email», «Открой письмо»), заголовок trust-блока на BYOK, строка Danger zone.
- Под H3 обычно идёт Body `size="small"`. Заголовок секции — H2, мелкая метка — Caption или Kicker.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| size | `"card" \| "inline"` | `"card"` | 15px / 13.5px. |
| children | `ReactNode` | обязательный | Текст. |

## Правила
- `font-display`, вес 600, цвет `ink`, margin 0: отступы задаёт родитель.
- card: 15px, letter-spacing -0.015em, line-height 1.25. inline: 13.5px, -0.01em, 1.3.
- Не оборачивай в H3 обычный текст и не используй его как заголовок страницы.
- H3 всегда на `font-display`; текст на `font-ui` с весом 600 вместо H3 не верстай.

## Пример
```tsx
import { H3 } from "../index";

<H3 size="card">Workspace создан</H3>
<H3 size="inline">Введи email</H3>
```
