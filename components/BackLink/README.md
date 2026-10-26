# BackLink

Текстовая ссылка со стрелкой влево для возврата на предыдущий шаг флоу: ссылка по href или кнопка по onClick.

## Когда использовать
- Над формой forgot-password: «Вернуться ко входу» в одной строке со StepIndicator.
- Под карточкой email-sent: «Не тот email? Изменить», «Уже подтвердил? Войти».
- `variant="button"`: кнопка «Назад» в ряду действий онбординга (workspace-setup, byok).
- `variant="icon"`: «←» в шапке экрана перед заголовком (карточка задачи, страница решения, сессия): текста нет, чтобы перед заголовком не стояли два идентификатора подряд.
- Для главного действия формы бери Button, для пунктов sidebar NavLink, для футерных и внешних ссылок ExternalLink.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| href | `string` | — | Если задан, рендерится `<a href>`; имеет приоритет над onClick. |
| onClick | `() => void` | — | Обработчик, когда href нет: рендерится `<button type="button">`. |
| variant | `"subtle" \| "button" \| "icon"` | `"subtle"` | subtle: тихая ссылка цвета `mute`; button: действие цвета `ink-2` с фоном на hover; icon: квадрат 28px со стрелкой, подпись — в подсказке и `aria-label`. |
| children | `ReactNode` | обязательный | Текст после стрелки. |

## Правила
- subtle: 12.5px, вес 400, цвет `mute`, на hover `ink`, без паддингов.
- button: 13px, вес 500, цвет `ink-2`, высота 36px, паддинг `0 space-3` (12px), радиус `r-sm`, на hover фон `inset`. Фон в покое не добавляй: залитый BackLink становится Button.
- **icon — назад к источнику.** Подпись называет, куда ведёт стрелка, — туда, откуда пришёл человек: «Назад к PIL-15», «Назад к «Моим решениям»». Не «Назад» без адреса. Подпись — строка в `children`: она же текст `Tooltip` и `aria-label`.
- icon: `ink-2`, наведение — фон `bg-2` и `ink`, фокус — кольцо `accent`; стрелка `IconArrow` 16px.
- Стрелка встроена: SVG 14px, stroke 1.8, всегда влево. Для движения вперёд бери Button или ExternalLink `variant="action"`.
- Шрифт `font-ui`, зазор стрелка–текст `space-2` (8px). Не делай текст жирным и не крась в `ink` в покое.

## Пример
```tsx
import { BackLink } from "../index";

<BackLink href="/login">Вернуться ко входу</BackLink>
<BackLink variant="button" onClick={() => router.back()}>Назад</BackLink>
<BackLink variant="icon" href={`/tasks/${task.key}`}>{`Назад к ${task.key}`}</BackLink>
```
