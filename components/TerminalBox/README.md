# TerminalBox

Тёмный моноширинный блок для логов, статусов и конфигов в трёх вариантах: mac, log и config.

## Когда использовать
- mac: живая проверка ключа на BYOK и в настройках LLM («vault.verify — live»).
- log: лента событий tick.log на дашборде (queue, agents, approvals).
- config: превью workspace.config в боковой колонке онбординга (name, slug, tz, plan).
- Прогноз «что произойдёт после» показывай светлым TerminalForecast, а не TerminalBox.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| variant | `"mac" \| "log" \| "config"` | обязательный | mac: шапка со светофором; config: шапка с зелёной точкой; log: без шапки. |
| title | `string` | — | Заголовок шапки для mac и config. |
| children | `ReactNode` | обязательный | Строки из под-компонентов. |
| className | `string` | — | Дополнительный класс, например для места в сетке. |

### Под-компоненты
| Компонент | Пропсы | Что делает |
|---|---|---|
| TerminalLine | `timestamp?: ReactNode`, `children: ReactNode` | Строка: колонка времени (10.5px, #707880) и текст; `timestamp=""` держит пустую колонку для выравнивания. |
| TerminalLineOK | `timestamp?: ReactNode`, `children: ReactNode` | Строка с зелёным префиксом «✓»: успешный шаг. |
| TerminalLineArr | `timestamp?: ReactNode`, `children: ReactNode` | Строка с префиксом «→»: действие или следующий шаг. |
| TerminalKV | `label: string`, `children: ReactNode`, `accent?: boolean` (по умолчанию `false`) | Пара ключ–значение для config; `accent` красит значение в зелёный. |
| TerminalDim | `children: ReactNode` | Приглушённый фрагмент (#707880). |
| TerminalAcc | `children: ReactNode` | Акцентный фрагмент, oklch(0.78 0.16 150). |
| TerminalWho | `children: ReactNode` | Имя источника или агента цвета `accent`. |
| TerminalMuted | `children: ReactNode` | Второстепенный текст (#707880), смысловой синоним TerminalDim. |
| TerminalPulse | — | Мигающий курсор 7×13px, ставится в конец строки. |

## Правила
- Корпус: фон #0e1116, рамка 1px #1d2228, радиус 8px, `font-mono` 11px, текст #e6e8eb, line-height 1.7. Тёмная палитра живёт только внутри компонента, не повторяй её в родителях.
- Шапка mac и config: 10px uppercase, letter-spacing 0.12em, цвет #9ba1a8, нижняя граница #1d2228.
- Содержимое собирай только из под-компонентов; `TerminalBox.module.css` снаружи не импортируй.
- Зелёный внутри терминала даёт только TerminalAcc, TerminalLineOK и `accent` у TerminalKV, без произвольных цветов.
- Не добавляй четвёртый вариант и не вкладывай TerminalBox в TerminalBox; TerminalPulse один на блок, в последней строке.

## Пример
```tsx
import { TerminalBox, TerminalLine, TerminalLineOK, TerminalKV, TerminalDim, TerminalAcc, TerminalPulse } from "../index";

<TerminalBox variant="mac" title="vault.verify — live">
  <TerminalLineOK>format ok <TerminalDim>sk-ant-api03-***</TerminalDim></TerminalLineOK>
  <TerminalLineOK>org resolved → <TerminalAcc>acme-eng</TerminalAcc></TerminalLineOK>
  <TerminalLine timestamp="">ready<TerminalPulse /></TerminalLine>
</TerminalBox>

<TerminalBox variant="config" title="workspace.config">
  <TerminalKV label="name      ">"Acme Engineering"</TerminalKV>
  <TerminalKV label="plan      " accent>trial · 14d</TerminalKV>
</TerminalBox>
```
