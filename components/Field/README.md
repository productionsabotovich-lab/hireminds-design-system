# Field

Поле формы из подписи, инпута и сообщения об ошибке; тонкая обёртка над Input с теми же пропсами.

## Когда использовать
- Любой текстовый ввод в формах: email и пароль на signin, create-account и reset-password, название и slug workspace, API-ключ на BYOK.
- В формах предпочтительнее голого Input: явно показывает связку label, поле и ошибка.
- Подсказку «что вводить» ставь отдельным Help под полем; ошибку поля передавай в `error`, а не в Plate.
- Многострочный ввод, выпадающий список и переключатель — не Field.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| id | `string` | обязательный | id инпута; связывает label и ошибку (`{id}-error`). |
| type | `"text" \| "password" \| "email"` | `"text"` | Тип поля; для password автоматически появляется кнопка показа пароля. |
| label | `string` | — | Подпись над полем. |
| placeholder | `string` | — | Плейсхолдер цвета `dim`. |
| value | `string` | — | Значение в контролируемом режиме. |
| defaultValue | `string` | — | Начальное значение в неконтролируемом режиме. |
| error | `string` | — | Текст ошибки под полем; красит рамку в `danger`, ставит `aria-invalid`. |
| disabled | `boolean` | `false` | Блокирует поле: фон `bg-2`, текст `mute`. |
| autoComplete | `string` | — | HTML-атрибут autocomplete. |
| font | `"ui" \| "mono"` | `"ui"` | mono для ключей, токенов, slug и кодов. |
| onChange | `(value: string) => void` | — | Получает строку, а не событие. |
| onBlur | `() => void` | — | Потеря фокуса. |
| className | `string` | `""` | Дополнительный класс на обёртку. |

## Правила
- Подпись: `font-ui` 12px, вес 500, цвет `ink-2`; зазоры подпись–поле–ошибка 5px.
- `font="mono"` только для машинных строк (`sk-ant-...`, slug, одноразовый код); email, имя и пароль остаются `ui`.
- Ошибка из `error` выводится `font-ui` 11.5px цвета `danger` с `role="alert"`; не дублируй её в Plate.
- Не оставляй поле без label: плейсхолдер не заменяет подпись.

## Пример
```tsx
import { Field } from "../index";

<Field id="email" type="email" label="Email" placeholder="oleg@acme.co" error={errors.email} />
<Field id="anthropic-key" label="Anthropic API key" font="mono" placeholder="sk-ant-..." />
```
