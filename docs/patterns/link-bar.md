# LinkBar

Ряд футерных ссылок `status · docs · security`, разведённых отступом или точками.

**Компонент:** [LinkBar](../../components/LinkBar/README.md) — пропсы и точные значения в README компонента.

## Данные вместо детей

Все ссылки одинаковые (ExternalLink `footer`), разделитель зависит от пропа: потребитель передаёт только список
`{ label, href }`.

## Когда применять

- Правая часть PageFooter; рядом с BrandSignature, когда футер собран вручную.

## Когда не применять

- Навигация — NavLink.
- Путь — Crumb.
- Ссылка в тексте — ExternalLink `inline`.
- Ссылки-действия в hero — ExternalLink `action` в Cluster.

## Антипаттерны

- Ссылки разного размера.
- Ссылки в виде кнопок.
- Больше четырёх ссылок.

## Устарело

- Зазоры 14 и 18px (`gap="7"`, `gap="9"`) — в компоненте `sm` (`space-4`) и `md` (`space-5`).

## Связано

[ExternalLink](external-link.md), [PageFooter](page-footer.md), [Dot](dot.md).
