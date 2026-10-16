# PageFooter

Нижняя строка страницы: подпись HM · S2 · 2026 и футерные ссылки, разнесённые по краям, по центру или в одну строку.

## Когда использовать
- between: футер колонки формы на signin и forgot-password.
- center: центрированные карточки email-verify и verify-success.
- inline: общий auth-лейаут с карточкой по центру и нижняя строка aside; всё в одну строку через точки.
- Не ставь на дашборде и в настройках (там навигация в sidebar) и в модалках, где внизу кнопки.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| brand | `{ version?: string; year?: number; segments?: string[] }` | — | Пропсы BrandSignature; без него выводится `HM · S2 · 2026`. |
| links | `LinkBarLink[]` | `[]` | Ссылки (`{ label, href }`). |
| layout | `"between" \| "center" \| "inline"` | `"between"` | Раскладка. |

## Правила
- Отступ сверху `space-7` (28px); в center и inline зазор между частями `space-5` (20px).
- Подпись — BrandSignature (`font-mono` 10.5px, `dim`); ссылки — `font-mono` 10.5px цвета `mute`, на hover `ink`. В inline ссылки дополнительно uppercase и разделены точками `dim`.
- Без `brand` подпись фиксирована как `HM · S2 · 2026`; другую версию или год передавай через `brand`.
- Футер остаётся тихим: без `accent` и `danger`, шрифт подписи и ссылок один и тот же.

## Пример
```tsx
import { PageFooter } from "../index";

<PageFooter
  layout="inline"
  links={[{ label: "support", href: "/support" }, { label: "status", href: "/status" }, { label: "docs", href: "/docs" }]}
/>
<PageFooter
  brand={{ version: "S2", year: 2026 }}
  links={[{ label: "status", href: "/status" }, { label: "security", href: "/security" }]}
/>
```
