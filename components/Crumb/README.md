# Crumb

Хлебные крошки в центре Topbar: сегменты пути через шевроны, текущий выделен ink, slug набран моноширинным.

## Когда использовать
- Центральный слот Topbar на онбординге: «› Onboarding › Create workspace», «› Onboarding › Подключение модели»; `leadingChevron` нужен, когда слева стоит Brand.
- Страницы настроек: «Settings › acme-engineering › General», slug в `mono`.
- Не ставь на auth-страницах и на корне дашборда; на узком экране замени на BackLink.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| items | `CrumbItem[]` | обязательный | Сегменты пути слева направо. |
| items[].label | `string` | обязательный | Текст сегмента. |
| items[].href | `string` | — | Адрес Next `Link`; без него сегмент выводится текстом. |
| items[].mono | `boolean` | — | `font-mono` 11px для slug и кода. |
| items[].active | `boolean` | — | Текущая страница: цвет `ink`, вес 500, ссылка не рендерится даже при href. |
| leadingChevron | `boolean` | `false` | Шеврон перед первым сегментом. |

## Правила
- Сегменты: `font-ui` 12px, цвет `mute`, у ссылок на hover `ink`; активный сегмент `ink`, вес 500.
- Mono-сегмент: `font-mono` 11px, вес 500, letter-spacing 0.04em, только для slug и кода.
- Разделитель: SVG-шеврон 12×12, stroke 1.6, цвет `faint`. Не заменяй его на `/` или `→`.
- Активный сегмент не делай ссылкой; держи не больше 4 сегментов.
- Зазоры 6px, отступ слева от Brand 6px.

## Пример
```tsx
import { Crumb } from "../index";

<Crumb leadingChevron items={[{ label: "Onboarding" }, { label: "Create workspace", active: true }]} />
<Crumb
  items={[
    { label: "Settings", href: "/dashboard/settings" },
    { label: "acme-engineering", mono: true },
    { label: "General", active: true },
  ]}
/>
```
