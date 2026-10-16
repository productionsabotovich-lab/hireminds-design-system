# NavLink

Пункт боковой навигации с иконкой, подписью и счётчиком или меткой soon; активный пункт подсвечен мягким зелёным.

## Когда использовать
- Sidebar дашборда: Dashboard, Чаты со счётчиком, Доска, Цели, Команда, Settings.
- Sidebar настроек: General, LLM, Appearance, Integrations; `tone="danger"` для пункта Danger zone.
- `badge={{ kind: "soon" }}`: разделы, которые ещё не готовы.
- Переключение вкладок внутри формы — Switcher, крошки — Crumb, футерные ссылки — ExternalLink.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| href | `string` | обязательный | Адрес ссылки `<a>`. |
| active | `boolean` | — | Текущий пункт: подсветка, цвет `ink`, вес 500, `aria-current="page"`. |
| icon | `ReactNode` | — | Иконка с viewBox 24×24 на `currentColor`. |
| badge | `{ kind: "count" \| "soon"; value?: string }` | — | Счётчик или метка soon справа. |
| tone | `"default" \| "danger"` | `"default"` | danger: текст `danger-ink`, иконка `danger`. |
| children | `ReactNode` | обязательный | Подпись пункта. |

## Правила
- `font-ui` 12.5px, цвет `ink-2`, паддинг 7px 10px, радиус `r-sm`, gap 9px; на hover фон rgba(17,20,24,.04).
- Активный: фон `accent-soft` с прозрачностью 0.55, текст `ink`, вес 500, иконка `accent-ink`. Не заливай пункт сплошным `accent` и не ставь вес 700.
- Иконка в покое с opacity 0.6; у danger opacity 0.85 цвета `danger`.
- Счётчик: `font-mono` 9.5px цвета `dim` (в активном пункте `accent-ink`). soon: 9px uppercase, letter-spacing 0.06em, фон `inset`, радиус `r-xs`.

## Пример
```tsx
import { NavLink } from "../index";

<NavLink href="/dashboard" active icon={<IconHome />}>Dashboard</NavLink>
<NavLink href="/dashboard/chats" icon={<IconChat />} badge={{ kind: "count", value: "3" }}>Чаты</NavLink>
```
