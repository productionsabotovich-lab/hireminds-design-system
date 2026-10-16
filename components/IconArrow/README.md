# IconArrow

SVG-стрелка в едином стиле: arrow, chevron или send в четырёх направлениях, цвет берётся из текста.

## Когда использовать
- arrow вправо: в кнопках «дальше» (ряд действий онбординга, submit) и в hero-CTA дашборда; arrow влево: в самодельных кнопках «назад».
- chevron: разделители и раскрывающиеся списки; send: кнопка «Отправить ссылку» на forgot-password.
- BackLink, Crumb и ExternalLink `variant="action"` уже содержат свою стрелку, вторую не добавляй.
- В строке текста допустим символ «→»; самостоятельные иконки (глаз, копировать) — не IconArrow.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| direction | `"right" \| "left" \| "up" \| "down"` | `"right"` | Направление; на send не влияет. |
| variant | `"arrow" \| "chevron" \| "send"` | `"arrow"` | Форма иконки. |
| size | `11 \| 12 \| 13 \| 14 \| 16 \| 18` | `14` | Размер в px. |

## Правила
- Цвет `currentColor`: задавай его родителем (`ink`, `accent-ink`), а не жёстким stroke.
- Толщина: chevron 1.6, arrow и send 2; viewBox 24×24, скруглённые концы.
- Размеры: 11 для мини-кнопок, 12 для крошек, 13–14 для кнопок, 16–18 для hero-CTA.
- chevron обозначает навигацию и раскрытие, arrow обозначает действие; не путай их.

## Пример
```tsx
import { IconArrow } from "../index";

<IconArrow />
<IconArrow variant="chevron" direction="down" size={12} />
```
