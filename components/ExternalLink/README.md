# ExternalLink

Текстовая ссылка в трёх стилях: mono-ссылка футера, подчёркнутая ссылка в тексте или зелёная ссылка со стрелкой.

## Когда использовать
- footer: status / docs / security в футерах auth-страниц, обычно через LinkBar.
- inline: ссылки в юридическом тексте под формой signin («Условиями», «Политикой приватности») и в пояснениях.
- action: переход на внешний сайт с `newTab`, например «Получить на console.anthropic.com» на BYOK.
- Возврат назад делай через BackLink, пункты sidebar через NavLink, CTA формы через Button.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| href | `string` | обязательный | Адрес ссылки. |
| variant | `"footer" \| "inline" \| "action"` | `"footer"` | Стиль ссылки. |
| newTab | `boolean` | `false` | Добавляет `target="_blank"` и `rel="noopener noreferrer"`. |
| children | `ReactNode` | обязательный | Текст ссылки. |

## Правила
- footer: `font-mono` 10.5px, letter-spacing 0.04em, цвет `mute`, на hover `ink`, без подчёркивания.
- inline: `font-ui` 11.5px, цвет `ink-2`, подчёркивание цвета `line-2`; на hover текст и линия `ink`. Без подчёркивания inline-ссылку не оставляй.
- action: `font-ui` 12px, цвет `accent-ink`, SVG-стрелка 11px справа; на hover подчёркивание и сдвиг стрелки на 2px.
- Не делай вес 700 и не подчёркивай ссылки футера.

## Пример
```tsx
import { ExternalLink } from "../index";

<ExternalLink variant="action" href="https://console.anthropic.com" newTab>Получить на console.anthropic.com</ExternalLink>
<ExternalLink variant="inline" href="/terms">Условиями</ExternalLink>
```
