# FormHeader

Шапка формы: необязательный mono-kicker, display-заголовок 26–32px и вводный абзац; всегда выровнена влево.

## Когда использовать
- Над формами: signin («С возвращением.»), регистрация («Зарегистрируйтесь.»), forgot-password, reset-password, создание workspace на онбординге.
- В шапке страниц настроек: kicker, заголовок и описание.
- В aside сплит-лейаута и в hero дашборда нужен StageHeader (46 / 38px). Центрированные экраны email-verify собирай из Kicker, H1 `align="center"` и Lead.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| kicker | `string` | — | Mono uppercase надзаголовок. |
| withDot | `boolean` | `true` | Зелёная точка-статус перед kicker. |
| kickerTone | `"accent" \| "mute"` | `"accent"` | Цвет kicker: `accent-ink` или `mute`. |
| heading | `ReactNode` | обязательный | Заголовок, рендерится как `<h1>`. |
| lead | `ReactNode` | — | Абзац под заголовком. |
| headingSize | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | 26 / 28 / 30 / 32px. |

## Правила
- Kicker: `font-mono` 10.5px, вес 500, letter-spacing 0.14em, uppercase, отступ до заголовка 10px. Зелёный kicker с точкой используется на онбординге и forgot-password; тихий вариант `kickerTone="mute"` с `withDot={false}` стоит на reset-password.
- Заголовок: `font-display`, вес 600, letter-spacing -0.03em, line-height 1.1, цвет `ink`, отступ до абзаца 6px.
- Абзац: `font-ui` 13.5px, цвет `mute`, line-height 1.5, нижний отступ 32px до формы встроен, свой не добавляй.
- Не поднимай заголовок до hero-размеров 38–46px: это StageHeader.

## Пример
```tsx
import { FormHeader } from "../index";

<FormHeader
  kicker="Шаг 2 из 4 · Workspace"
  heading="Где будет жить ваша AI-команда"
  lead="Workspace — это контейнер с целями, досками и чатами. Один проект = один workspace."
/>
<FormHeader
  kicker="Reset password · step 3 / 3"
  kickerTone="mute"
  withDot={false}
  heading="Задай новый пароль."
  headingSize="lg"
/>
```
