# TopbarStatus

Статус в правом слоте auth-топбара: зелёная точка с ореолом и mono uppercase подпись вида session · pending.

## Когда использовать
- Правый слот Topbar `variant="auth"`: «session · pending» на email-sent, «reset · token verified» и «reset · token expired» на reset-password.
- Одна строка о состоянии сессии или токена; действия и меню сюда не ставь.
- Счётчик шагов — StepIndicator, произвольная мета — Caption.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| label | `string` | обязательный | Текст статуса; выводится в верхнем регистре. |

## Правила
- Точка 6px `accent` с ореолом 3px `accent-soft`, зазор до текста 8px.
- Подпись: `font-mono` 10.5px, letter-spacing 0.08em, uppercase, цвет `dim`.
- Точка всегда зелёная, в том числе для «token expired»: негативное состояние передавай словами.
- Формат «объект · состояние» в нижнем регистре; верхний регистр компонент сделает сам.

## Пример
```tsx
import { TopbarStatus } from "../index";

<TopbarStatus label="session · pending" />
<TopbarStatus label="reset · token expired" />
```
