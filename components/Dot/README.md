# Dot

Маленькая круглая точка: статус с ореолом, разделитель в мета-строке, маркер перед подписью или присутствие агента.

## Когда использовать
- status: индикатор живого состояния в шапке rail-блока онбординга («что получите») и перед kicker в FormHeader.
- kicker: маркер перед mono-подписью на превью signin («preview · acme corp»).
- separator: точка между ссылками футера; уже встроена в LinkBar и PageFooter.
- presence: онлайн или офлайн агента в списке sidebar. Галочку даёт Kicker `withTick`, аватар — UserAvatar.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| variant | `"status" \| "separator" \| "kicker" \| "presence"` | `"separator"` | Роль; status и kicker добавляют ореол. |
| tone | `"accent" \| "warn" \| "danger" \| "dim" \| "ink" \| "mute"` | `"dim"` | Цвет заливки. |
| size | `"xs" \| "sm" \| "md"` | `"xs"` | 3 / 5 / 6px. |
| pulse | `boolean` | `false` | Мерцание opacity 1 → 0.4, цикл 2s. |

## Правила
- Ореол `0 0 0 3px` цвета `accent-soft`, `warn-soft` или `danger-soft` рисуется только у status с tone accent, warn, danger и у kicker с tone accent; другие сочетания выходят без ореола.
- Радиус 999px, размеры только 3, 5 и 6px: точка больше 8px уже читается как аватар.
- Цвета только `accent`, `warn`, `danger`, `dim`, `ink`, `mute`.
- pulse не чаще одного живого индикатора на экран.
- Точка декоративная (`aria-hidden`), смысл передавай текстом рядом.

## Пример
```tsx
import { Dot } from "../index";

<Dot variant="status" tone="accent" size="md" />
<Dot variant="separator" tone="dim" size="xs" />
```
