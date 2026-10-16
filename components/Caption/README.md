# Caption

Мелкая техническая мета-подпись: mono uppercase 10.5px или UI 11.5px приглушённых цветов dim, mute или ink-3.

## Когда использовать
- Mono: заголовки групп в sidebar дашборда («Workspace», «AI-команда», «Настройки»), версия на signin («v2.4 · early access»), маска ключа в статусе API-ключа на BYOK.
- UI: email под именем в меню аккаунта, метка времени «обновлено 21.05 · 09:23».
- `uppercase={false}`: таймеры и подписи редиректа («2 поля · ~30 сек»).
- Подсказку под полем делай через Help, надзаголовок над H1 через Kicker, счётчик шага через StepIndicator.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| font | `"mono" \| "ui"` | `"mono"` | mono: `font-mono` 10.5px, letter-spacing 0.08em; ui: `font-ui` 11.5px, letter-spacing 0. |
| tone | `"dim" \| "mute" \| "ink-3"` | `"dim"` | Цвет. |
| uppercase | `boolean` | `true` | Верхний регистр; действует только при `font="mono"`. |
| children | `ReactNode` | обязательный | Текст. |

## Правила
- Рендерится строчным `<span>` с весом 400: для отдельной строки оборачивай в блок или ставь в flex-ряд.
- Цвет только `dim`, `mute` или `ink-3`. Mono uppercase цвета `accent-ink` уже является Kicker.
- `dim` для фоновой меты, `ink-3` для значимой метки вроде маски `sk-ant-***`.
- Не убирай трекинг у mono и не поднимай кегль выше 13px: это уже Body.

## Пример
```tsx
import { Caption } from "../index";

<Caption font="mono" tone="dim">AI-команда</Caption>
<Caption font="ui" tone="mute">обновлено 21.05 · 09:23</Caption>
```
