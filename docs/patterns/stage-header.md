# StageHeader

Крупная шапка stage-блока: зелёный mono-kicker, hero-заголовок с акцентом и вводный абзац.

**Компонент:** [StageHeader](../../components/StageHeader/README.md) — пропсы и точные значения в README компонента.

## Варианты

| `variant` | Заголовок | Где |
|---|---|---|
| `aside` | `<h1>`, 46px | левая колонка SplitLayout |
| `hero` | `<h2>`, 38px | hero-блок пустого дашборда |

## Пропсы вместо под-компонентов

Порядок частей фиксирован: kicker → заголовок → абзац; kicker — строка, заголовок — ReactNode с `<em>`. Если между
частями понадобятся новые элементы (бейдж, счётчик шага), это повод пересмотреть API.

## Когда не применять

- Страницы с Topbar и путём, формы — FormHeader.
- Модалка — шапка ConfirmDialog.
- Шапка секции карточки — H2.

## Антипаттерны

- StageHeader без kicker: пропадает вход в сцену.
- Обычный H1 28px вместо hero.
- Kicker цвета `ink` или `mute`: у StageHeader kicker всегда `accent-ink`.

## Устарело

- Точка-маркер `::before` перед kicker — в компоненте полупрозрачная «·».
- Ритм 18px между частями — в компоненте `space-5` (20px).
- Абзац 14–15px — в компоненте 14.5px (`lead-hero`).

## Связано

[Kicker](kicker.md), [H1](h1.md), [Lead](lead.md), [AsidePanel](aside-panel.md), [FormHeader](form-header.md).
