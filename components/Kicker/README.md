# Kicker

Mono uppercase надзаголовок по центру над H1: контекст экрана или шаг, с необязательной галочкой или точкой.

## Когда использовать
- Центрированные auth-карточки: «Шаг 2 из 3 · подтверждение почты» на email-sent, «email verified · шаг 3 из 3» с галочкой на verify-success.
- `withTick`: подтверждение успешного действия; `withDot`: живой контекст.
- Kicker центрирован (text-align и justify по центру). Над формой с выравниванием влево используй FormHeader со своим kicker, в aside — StageHeader.
- Мелкая мета без акцента — Caption; счётчик шага отдельной строкой — StepIndicator.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| children | `ReactNode` | обязательный | Текст; верхний регистр применяется автоматически. |
| withTick | `boolean` | `false` | Зелёный круг 14px с белой галочкой перед текстом. |
| withDot | `boolean` | `false` | Точка 6px `accent` с ореолом 4px `accent-soft`. |
| tone | `"accent" \| "mute"` | `"accent"` | Цвет текста: `accent-ink` или `mute`. |
| className | `string` | — | Дополнительный класс. |

## Правила
- `font-mono` 10.5px, вес 500, letter-spacing 0.18em, uppercase, gap 6px, отступ 10px до заголовка.
- Цвет только `accent-ink` или `mute`; галочка на фоне `accent`, иконка `#fff`, радиус 999px.
- Текст короткий и ритмичный: «контекст · шаг N из M».
- Не ставь Kicker без display-заголовка под ним и не набирай его `font-ui`.

## Пример
```tsx
import { Kicker } from "../index";

<Kicker>Шаг 2 из 3 · подтверждение почты</Kicker>
<Kicker withTick>email verified · шаг 3 из 3</Kicker>
```
