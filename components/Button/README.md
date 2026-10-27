# Button

Кнопка действия в четырёх вариантах (primary, secondary, ghost, danger) и трёх размерах, с иконкой и загрузкой.

## Когда использовать
- primary: главный CTA формы, например «Сохранить и войти» на reset-password (lg) или «Попробовать снова» на экране ошибки.
- secondary: альтернативное действие, например «Отправить ещё раз» на email-sent (sm), действия в футере карточек настроек.
- ghost: отмена и тихие действия; danger: одно разрушительное действие («Удалить навсегда» на delete-workspace).
- Для навигации и ссылок в тексте бери BackLink или ExternalLink, не Button.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| children | `ReactNode` | обязательный | Подпись кнопки. |
| variant | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"primary"` | Визуальный вариант. |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Высота 28 / 34 / 40px. |
| disabled | `boolean` | `false` | Блокирует кнопку, opacity 0.45. |
| loading | `boolean` | `false` | Показывает спиннер 13px на месте иконки и блокирует кнопку; подпись остаётся. |
| icon | `ReactNode` | — | Иконка перед подписью. |
| type | `"button" \| "submit" \| "reset"` | `"button"` | HTML-тип. |
| onClick | `() => void` | — | Обработчик клика. |
| className | `string` | `""` | Дополнительный класс (ширина, отступы). |
| tabIndex | `number` | — | `-1` — кнопка-дубль вне порядка Tab: полоса `ActionBar` дублирует блок «Ваше решение». |

## Правила
- primary: фон `ink`, текст `#fff`, на hover `ink-2`. Никогда не заливай primary в `accent`: зелёный остаётся для kicker и success.
- secondary: фон `surface`, текст `ink-2`, рамка `line` и тень `sh-1`, на hover `bg-2` и рамка `line-2`. ghost: прозрачная, на hover `bg-2`. danger: фон `danger`, на hover opacity 0.88.
- Размеры: sm 28px, паддинг 0 10px, 12px; md 34px, 0 14px, 13px; lg 40px, 0 18px, 14px. Радиус всегда `r-md`, шрифт `font-ui` вес 500.
- Auth-формы берут lg, футер карточки настроек md, действие в строке списка sm.
- Одна danger-кнопка на экран, остальные ghost. Для удаления не используй secondary.
- Hover меняет только цвет: без своих теней и без pill-радиуса 999px.
- Фокус с клавиатуры — кольцо `accent` 2px с отступом 2px на всех вариантах, как рамка `Input` в фокусе: 3.3:1 к `surface` и `bg`. Не убирай его и не заменяй тенью.

## Пример
```tsx
import { Button } from "../index";

<Button type="submit" variant="primary" size="lg" loading={pending}>Сохранить и войти</Button>
<Button variant="secondary" size="sm" onClick={handleResend}>Отправить ещё раз</Button>
```
