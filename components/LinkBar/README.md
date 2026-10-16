# LinkBar

Горизонтальный ряд футерных ссылок status · docs · security, разведённых отступом или точками-разделителями.

## Когда использовать
- Правая часть футера на signin, forgot-password (в aside и в колонке формы: privacy, terms), email-verify.
- Обычно приходит внутри PageFooter; отдельно ставь рядом с BrandSignature, когда футер собран вручную.
- Навигация в sidebar — NavLink, крошки — Crumb, одиночная ссылка в тексте — ExternalLink `variant="inline"`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| links | `LinkBarLink[]` (`{ label: string; href: string }`) | обязательный | Ссылки; href служит React-ключом. |
| separator | `"plain" \| "dotted"` | `"plain"` | dotted ставит Dot перед каждой ссылкой, кроме первой. |
| gap | `"sm" \| "md"` | `"sm"` | Зазор между ссылками: `space-4` (16px) или `space-5` (20px). |

## Правила
- Каждая ссылка рендерится как ExternalLink `variant="footer"`: `font-mono` 10.5px, цвет `mute`, на hover `ink`, без подчёркивания.
- Разделитель — Dot separator 3px цвета `dim`, а не символ в тексте.
- Не больше 3–4 ссылок одного размера; кнопочные ссылки — не LinkBar.
- href у ссылок должны различаться: одинаковые заглушки `"#"` дают повторяющиеся ключи.

## Пример
```tsx
import { LinkBar } from "../index";

<LinkBar links={[{ label: "status", href: "/status" }, { label: "docs", href: "/docs" }, { label: "security", href: "/security" }]} />
<LinkBar separator="dotted" links={[{ label: "privacy", href: "/privacy" }, { label: "terms", href: "/terms" }]} />
```
