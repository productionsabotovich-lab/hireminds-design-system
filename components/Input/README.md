# Input

Однострочное текстовое поле с необязательными подписью и ошибкой; для пароля само добавляет кнопку показа.

## Когда использовать
- Базовый атом под Field; напрямую ставь для полей без подписи, например поиск в Topbar или фильтр.
- `type="password"`: поля пароля на signin, create-account и reset-password; кнопка-глаз появляется сама.
- `font="mono"`: API-ключ на BYOK, slug workspace, одноразовый код.
- В формах бери Field; многострочный текст и выпадающий список — не Input.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| id | `string` | обязательный | id инпута; связывает label и ошибку (`{id}-error`). |
| type | `"text" \| "password" \| "email"` | `"text"` | Тип; password добавляет переключатель видимости. |
| label | `string` | — | Подпись над полем. |
| placeholder | `string` | — | Плейсхолдер цвета `dim`. |
| value | `string` | — | Значение в контролируемом режиме. |
| defaultValue | `string` | — | Начальное значение в неконтролируемом режиме. |
| error | `string` | — | Текст ошибки под полем, рамка `danger`, `aria-invalid`. |
| disabled | `boolean` | `false` | Блокирует поле. |
| autoComplete | `string` | — | HTML-атрибут autocomplete. |
| font | `"ui" \| "mono"` | `"ui"` | Шрифт значения: `font-ui` или `font-mono`. |
| onChange | `(value: string) => void` | — | Получает строку, а не событие. |
| onBlur | `() => void` | — | Потеря фокуса. |
| className | `string` | `""` | Дополнительный класс на обёртку. |

## Правила
- Высота 36px, паддинг 0 12px, рамка 1px `line-3` (3:1 — граница поля должна быть видна), радиус `r-md`, фон `surface`, текст `font-ui` 13px цвета `ink`, плейсхолдер `dim`.
- Фокус: рамка `accent` и кольцо `0 0 0 2.5px` цвета `accent-soft`. Ошибка: рамка `danger`, на фокусе кольцо `danger-soft`. Других теней не добавляй.
- Disabled: фон `bg-2`, текст `mute`. У пароля справа резервируется 36px под глаз цвета `dim` (на hover `ink-2`).
- Не меняй радиус и цвет рамки инлайном; mono только для машинных строк, не для email и имени.

## Пример
```tsx
import { Input } from "../index";

<Input id="password" type="password" label="Пароль" placeholder="••••••••" error="Минимум 8 символов" />
<Input id="api-key" font="mono" placeholder="sk-ant-api03-..." />
```
