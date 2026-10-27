# ActivityEvent

Одна запись журнала задачи или сессии: маркер по смыслу, кто и что сделал одной строкой, причина второй строкой и время справа; переход фазы — глава журнала с `Pill` тона `ink`.

## Когда использовать
- Строки `ActivityFeed`: журнал карточки задачи и лента «Шаги» экрана сессии. Отдельно — только внутри своего `<ol>`: запись — элемент списка `<li>`.
- Первая строка — одно предложение «кто — что»: `actor` и `children`; идентификаторы (решение, сессия, коммит, ветка) — `CodeChip`, PR — `ExternalLink` `inline`.
- Вторая строка `detail` — только причина или ссылка, без повторения первой.
- Реплика роли (итог работы, сообщение) — `kind="message"`: вместо точки аватар роли, текст в `quote`, файлы в `files`.
- Длинный вывод инструментов и логов — не сюда, а в `TerminalBox`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| kind | `ActivityEventKind` | обязательный | Вид: контрольные точки `phase`, `session`, `message`, `pr`, `decision`, `return`, `note`, `error`, `reminder`, `system`; шаги `files`, `check`, `push`, `ask`, `step` (шаг агента); `run` — разделитель запуска. |
| tone | `"ink" \| "accent" \| "warn" \| "danger" \| "dim"` | по виду | Цвет точки `Dot`; задаётся, когда смысл отличается от вида: итог решения, остановка. |
| actor | `string` | — | Кто: роль, человек, «Hireminds», «Linear». У `message` — ещё и аватар. |
| time | `Date \| string \| number` | обязательный | Время события; выводится «09:14» в часовом поясе браузера, `<time dateTime>` — ISO. |
| children | `ReactNode` | — | Что произошло, после `actor`. У `phase` — название фазы: «Code → Review». |
| detail | `ReactNode` | — | Вторая строка `mute`, одна, с многоточием; у строки — полный текст в `title`. У `phase` — причина перехода. |
| quote | `ReactNode` | — | Реплика роли на `bg-2`, до 68 знаков в строке. |
| files | `(string \| { path, href?, additions?, deletions?, diff? })[]` | — | Файлы — `CodeChip` и «+n −m»; с `href` открываются в новой вкладке; с `diff` чип — кнопка, раскрывает `DiffView` под записью (в «Подробно» — раскрыт). |
| pill | `ReactNode` | — | Итог: `Pill` решения («Утверждено») или результат проверки (`accent` / `danger`). |
| author | `ReactNode` | — | Слот имени автора вместо текста `actor`: `PersonRef` с карточкой участника. |
| step | `{ kind, tool?, arg? }` | — | `step`: вид шага — иконкой (таблица ниже), инструмент — `CodeChip` sm как есть, аргумент моноширинным. |
| result | `{ summary, ok?, out? }` | — | `step`: итог вызова обычным шрифтом (`ok: false` — `danger-ink`); «показать вывод» — `TerminalBox`. |
| detailed | `boolean` | `false` | Режим «Подробно»: вывод и diff раскрыты. |
| action | `ReactNode` | — | `run`, `phase`: действие вместо времени — «показать 12 шагов». |

### Вид шага → инструменты → иконка
Виды — все виды инструментов модели событий ACP (`ToolKind`): `read`, `edit`, `delete`, `move`, `search`, `execute`, `think`, `fetch`, `switch_mode`, `other`. Название инструмента — как есть, обычным регистром (Grep, Read, Edit, Bash): прописными не пишется.

| Вид (`step.kind`) | Инструменты | Иконка |
|---|---|---|
| `read` | Read, NotebookRead | `eye` |
| `edit` | Edit, Write, NotebookEdit | `pencil` |
| `search` | Grep, Glob, LS | `search` |
| `execute` | Bash | `runner` |
| `fetch` | WebFetch, WebSearch | `globe` |
| `think` | рассуждение, план | `brain` |
| `delete`, `move`, `switch_mode`, `other` | удаление и перенос файлов, смена режима, прочее | `circle-dot` (общая) |

## Правила
| Вид | Маркер | Тон по умолчанию | Что пишется |
|---|---|---|---|
| `phase` | — (глава) | `Pill` `ink` | Название фазы или переход «QA → Code», причина, линия `line-2` на всю ширину |
| `run` | — (глава) | текст 600 | «Запуск 2», причина «после возврата из ревью …», линия, справа `action` «показать 12 шагов» |
| `step` | иконка вида | `ink` | Роль, инструмент `CodeChip` sm, аргумент; итог вызова и вывод; файлы с diff |
| `session` | точка | `ink` | Начало, возобновление (с транскриптом и без — в `detail`), остановка (`tone="dim"`) |
| `message` | аватар роли | — | Итог работы или сообщение: `quote`, `files` |
| `pr` | точка | `accent` | PR открыт, влит; обновлён — `tone="ink"` |
| `decision` | точка | `ink` | Решение открыто; итог — `tone` и `pill` по исходу (`accent` утверждено, `warn` возвращено, `dim` остановлено и устарело); канал — в `detail` |
| `return` | точка | `warn` | Возврат, причина в `detail` |
| `note` | точка | `warn` | Замечание платформы |
| `error` | точка | `danger` | Ошибка, причина в `detail` |
| `reminder` | точка | `warn` | Напоминание о решении |
| `system` | точка | `ink` | Служебная запись без автора-участника; `actor` не задаётся или «Hireminds» |
| `files`, `check`, `push`, `ask` | точка | `ink` | Шаги сессии — только в `ActivityFeed` `variant="session"`; итог проверки — `pill` `accent` или `danger` |

### События журнала и вид
| Событие | Вид и тон | В «Сообщениях» |
|---|---|---|
| Задача заведена | `system` (`ink`), `actor` — человек | нет |
| Переход фазы | `phase` | нет |
| Сессия: начало, возобновление, остановка | `session` (`ink`; остановка — `dim`) | нет |
| Итог работы, сообщение роли | `message` (аватар) | да |
| PR открыт, влит / обновлён | `pr` (`accent` / `ink`) | нет |
| Замечание платформы | `note` (`warn`), `actor` «Hireminds» | да |
| Замечание исправлено | `note`, `tone="accent"` | да |
| Возврат | `return` (`warn`) | да |
| Решение открыто, итог, устарело | `decision` (`ink`; итог — `tone` по исходу; устарело — `dim`) | да |
| Напоминание о решении | `reminder` (`warn`) | да |
| Лимит возвратов исчерпан | `system`, `tone="warn"` | нет |
| Запуск остановлен | `system`, `tone="dim"` | нет |
| Linear отклонил переход | `error` (`danger`), `actor` «Linear»; на экране — «Ошибка» | нет |
| Linear принял переход со второй попытки | `system`, `tone="accent"`, `actor` «Linear» | нет |
| Ошибка сессии, лимит подписки | `error` (`danger`) | нет |

- Возврат с текстом роли (`return` с `quote`) остаётся с точкой `warn`, без аватара: в журнале важнее, что это возврат; кто вернул — в `actor`.
- Время: некорректное значение `time` не роняет журнал — запись выводится без времени.
- Узкая раскладка — по ширине контейнера `ActivityFeed` (container query) до 600px: причина главы переносится, линии нет, вторая строка — до двух строк (на телефоне `title` не открыть). Вне `ActivityFeed` контейнером служит ближайший предок с `container-type`.
- Умеренный монохром: цвет — только у точки по смыслу и у `pill`; текст строки `ink-2`, кто — `ink` 500, вторая строка и время — `mute`.
- Сетка по макету: колонка маркера 24px, тело, время; между точками соседних записей — линия `line`.
- Белый текст на `Pill` `ink` — 18:1; `mute` на `bg` и `surface` — 5.9:1 и 6.1:1.

## Пример
```tsx
import { ActivityEvent, CodeChip, Pill } from "../index";

<ol>
  <ActivityEvent kind="phase" time="2026-10-23T09:14:00+03:00" detail="Возврат 2 из 2">QA → Code</ActivityEvent>
  <ActivityEvent kind="decision" tone="accent" time={new Date()} actor="Антон Саботович"
    pill={<Pill tone="accent">Утверждено</Pill>} detail="Кнопка в треде Linear · ждало 45 мин">
    утвердил <CodeChip href="/decisions/D-34">D-34</CodeChip> «Объём согласован»
  </ActivityEvent>
  <ActivityEvent kind="message" time={new Date()} actor="QA" quote="Проверил 9 сценариев, 8 прошли."
    files={[{ path: "docs/qa/PIL-15-report.md", href: "https://github.com/…" }]} />
</ol>
```
