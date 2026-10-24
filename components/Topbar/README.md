# Topbar

Верхняя панель страницы со слотами left, center и right в вариантах app (с нижней рамкой) и auth (прозрачный).

## Когда использовать
- app: страницы внутри продукта — дашборд, настройки, онбординг; Brand слева, Crumb в центре, меню аккаунта справа.
- auth: публичные страницы signin, forgot-password, reset-password, email-sent; Brand слева, TopbarStatus справа.
- В модалках и на маркетинговом лендинге Topbar не используется.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| left | `ReactNode` | — | Левый слот, обычно Brand. |
| center | `ReactNode` | — | Центр, растягивается: Crumb, вкладки, поиск. |
| right | `ReactNode` | — | Правый слот: статус, действия, меню аккаунта последним. |
| variant | `"app" \| "auth"` | `"app"` | app: 50px, фон `surface`, нижняя рамка; auth: без рамки, прозрачный. |
| className | `string` | `""` | Дополнительный класс. |

## Правила
- app: высота 50px, паддинг 0 16px, фон `surface`, нижняя граница 1px `line`, gap 12px. Выше 50px не делай.
- auth: паддинг 18px 32px, высота по содержимому, без рамки, фон прозрачный.
- Правый слот прижат вправо, gap 8px; меню аккаунта всегда последнее.
- Без размытия и стекла, без тени при прокрутке и без тёмного фона `ink`: панель всегда светлая.

## Пример
```tsx
import { Topbar, Brand, TopbarStatus } from "../index";

<Topbar variant="auth" left={<Brand />} right={<TopbarStatus label="reset · token verified" />} />
```

Шапка webapp: в правом слоте — ссылки `TopbarLink` и аватар.

```tsx
import { Topbar, Brand, TopbarLink, UserAvatar } from "../index";

<Topbar
  left={<Brand />}
  right={
    <>
      <TopbarLink label="Моя команда" badge={{ kind: "soon" }} />
      <TopbarLink label="Журнал" badge={{ kind: "soon" }} />
      <TopbarLink href="/decisions" label="Мои решения" shortLabel="Решения" icon="inbox" badge={{ kind: "count", value: 4 }} />
      <UserAvatar name="Антон Саботович" size="sm" shape="circle" />
    </>
  }
/>
```
