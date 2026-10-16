# BrandSignature

Микро-подпись бренда в футере вида HM · S2 · 2026: mono uppercase 10.5px цвета dim, без логотипа.

## Когда использовать
- Левая часть футера на signin, forgot-password (в aside и в колонке формы), email-verify, verify-success.
- Обычно приходит внутри PageFooter через `brand`; отдельно ставь, когда футер собран вручную рядом с LinkBar.
- В Topbar нужен Brand, а не BrandSignature.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| version | `string` | `"S2"` | Сегмент после HM (`S2`, `auth.v2`). |
| year | `number` | текущий год | Последний сегмент. |
| segments | `string[]` | — | Полностью заменяет сегменты `HM · {version} · {year}`. |

## Правила
- `font-mono` 10.5px, вес 400, letter-spacing 0.06em, uppercase, цвет `dim`, без переноса строки.
- Разделитель — символ « · » в тексте, а не Dot.
- Для точного `HM · auth.v2` передавай `segments={["HM", "auth.v2"]}`: один `version` всё равно допишет год.
- Не поднимай кегль выше 11px и не крась в `ink`: подпись должна оставаться фоновой.

## Пример
```tsx
import { BrandSignature } from "../index";

<BrandSignature version="S2" year={2026} />
<BrandSignature segments={["HM", "auth.v2"]} />
```
