# TerminalBox

Тёмный моноширинный блок для логов, статусов и конфигов — единственная тёмная поверхность системы.

**Компонент:** [TerminalBox](../../components/TerminalBox/README.md) и под-компоненты TerminalLine, TerminalLineOK,
TerminalLineArr, TerminalKV, TerminalDim, TerminalAcc, TerminalWho, TerminalMuted, TerminalPulse.

## Варианты

| `variant` | Шапка | Где |
|---|---|---|
| `mac` | «светофор» и имя процесса | живая проверка: `vault.verify — live` |
| `log` | без шапки | лента событий внутри сетки |
| `config` | зелёная точка и имя файла | конфиг рабочего пространства или агента |

## Под-компоненты

Содержимое — строки разной природы (лог, пара ключ–значение, курсор), а палитра терминала не входит в токены.
Под-компоненты держат палитру внутри; `TerminalBox.module.css` снаружи не импортируется.

## Язык ленты

Строки — английский нижний регистр в стиле логов: `key stored`, `org resolved → acme-corp`, `ready`.

## Антипаттерны

- Четвёртый вариант: новый вид — расширение этого атома.
- Фон `#0e1116` в родителе.
- Инлайн-стили тёмного блока.
- TerminalBox внутри TerminalBox.
- Импорт `TerminalBox.module.css` у потребителя.

## Устарело

- Префикс TerminalLineArr «—» — в компоненте «→».
- Список потребителей для миграции (`LLMSettingsRail`, `TickLog`, `WorkspaceCreateRail`) относился к коду первой версии
  продукта.

## Связано

[TerminalForecast](terminal-forecast.md), [брендбук: терминал](../brand.md#терминал).
