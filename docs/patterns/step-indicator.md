# StepIndicator

Mono-счётчик шага многошагового флоу: `step 1 / 3` или `Шаг 1 из 3`, с контекстом через « · ».

**Компонент:** [StepIndicator](../../components/StepIndicator/README.md) — пропсы и точные значения в README компонента.

## Где показывается шаг

- Отдельной строкой — StepIndicator, рядом с BackLink над формой.
- Внутри kicker — текстом: «Шаг 2 из 4 · Workspace» (FormHeader, Kicker); StepIndicator тогда не дублируется.
- Интерактивные шаги с номерами в Topbar онбординга — TopbarSteps, компонента нет.

## Когда не применять

- На экране уже есть TopbarSteps.
- Вкладки — Switcher; пункты меню — NavLink.

## Антипаттерны

- Счётчик без контекста на главном экране: одинокое «1 / 3» непонятно, нужен `scope`.
- Разные форматы в одном флоу.
- Вес 700 или цвет `accent`.

## Связано

[Kicker](kicker.md), [Caption](caption.md), [TopbarSteps](topbar-steps.md).
