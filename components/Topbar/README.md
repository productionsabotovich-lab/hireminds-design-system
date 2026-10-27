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

### TopBar — шапка webapp (композиция, не компонент)
Одна и та же на всех экранах и во всех состояниях («Карточка задачи», «Сессия агента», «Страница решения»):
- слева — `Brand`, затем `Crumb` с `leadingChevron`: проект, эпик, задача (последняя — `active`);
- справа — «Файлы» (`TopbarLink` `soon`), «Мои решения» (`TopbarLink` `tone="attention"`, иконка `inbox`), `UserAvatar` sm круглый — последним.
- На узком экране крошки можно не показывать; состав справа тот же.

```tsx
import { Topbar, Brand, Crumb, TopbarLink, UserAvatar } from "../index";

<Topbar
  left={<Brand />}
  center={<Crumb leadingChevron items={[{ label: "Hireminds pilot", href: "/p/pilot" }, { label: "Доступ и роли", href: "/p/pilot/epics/roles" }, { label: "PIL-15", mono: true, active: true }]} />}
  right={
    <>
      <TopbarLink label="Файлы" badge={{ kind: "soon" }} />
      <TopbarLink href="/decisions" label="Мои решения" shortLabel="Решения" icon="inbox" tone="attention" badge={{ kind: "count", value: 4 }} unseen={2} />
      <UserAvatar name="Антон Саботович" size="sm" shape="circle" />
    </>
  }
/>
```
