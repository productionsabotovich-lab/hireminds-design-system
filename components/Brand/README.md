# Brand

Логотип Hireminds: графитный квадрат с буквой и название рядом; ведёт на главную или вызывает onClick.

## Когда использовать
- Левый слот каждого Topbar, и app, и auth (signin, reset-password, онбординг).
- Якорь бренда над центрированной auth-карточкой и в aside восстановления пароля.
- `mark` + `name`: марка workspace в переключателе.
- Аватар человека делай через UserAvatar, текстовую подпись в футере через BrandSignature.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| name | `string` | `"Hireminds"` | Название справа от марки. |
| mark | `string` | первая буква `name` | Буква в квадрате. |
| href | `string` | `"/"` | Адрес Next `Link`, если onClick не задан. |
| onClick | `() => void` | — | Вместо ссылки рендерит `div role="button"`; Enter тоже вызывает обработчик. |

## Правила
- Марка 26×26px, радиус `r-md`, фон всегда `ink`, буква `#fff`, `font-display` 13px вес 700. Не заливай марку `accent` и не заменяй букву SVG-логотипом.
- Название: `font-display` 15px, вес 600, letter-spacing -0.015em, цвет `ink`.
- Зазор марка–название 9px (точное значение вне шкалы); на hover фон `bg-2` с радиусом `r-md`.
- Не увеличивай марку до 32px и больше, не показывай марку без названия на app-страницах.

## Пример
```tsx
import { Brand } from "../index";

<Brand />
<Brand mark="A" name="Acme Engineering" onClick={() => router.push("/dashboard")} />
```
