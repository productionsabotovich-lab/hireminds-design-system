# MainPanel

Правая колонка SplitLayout с формой: верхняя строка, шапка формы, форма и футер.

**Компонента нет.** Слои раскладки в систему не входят: экран собирает колонку из BackLink, StepIndicator, FormHeader,
Field, Button и PageFooter. Повторное использование — повод для заявки в дизайн-систему.

## Структура

- Верх: BackLink и StepIndicator (Cluster `justify="between"`) или Switcher с меткой версии.
- Середина: FormHeader и форма.
- Низ: PageFooter.

## Паддинги (база 2026-05)

| Размер | Паддинг | Где |
|---|---|---|
| `comfort` | 48px 56px 36px — `space-12`, `space-14`, `space-9` | вход: основное полотно |
| `compact` | 36px 56px — `space-9`, `space-14` | восстановление пароля: BackLink сверху |

Фон `surface`, колонка — flex-столбец, ширина от 480px.

## Когда не применять

- Отдельно от SplitLayout.
- Форма в модалке — ConfirmDialog или Card.
- Онбординг — Container и карточки секций.

## Антипаттерны

- Колонка без верхней строки: пропадает навигационный контекст.
- Колонка без футера: пропадает подпись бренда.
- Форма, растянутая на всю ширину: ширину ограничивает колонка.

## Связано

[SplitLayout](split-layout.md), [AsidePanel](aside-panel.md), [FormHeader](form-header.md), [PageFooter](page-footer.md).
