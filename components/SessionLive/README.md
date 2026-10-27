# SessionLive

Что агент делает сейчас: `widget` — закреплённый виджет идущей сессии в карточке задачи, весь блок — ссылка в «Сессию агента»; `now` — последняя строка ленты «Хода работы».

## Когда использовать
- `widget` — «Карточка задачи», состояние «В работе»: над журналом, в закреплённой зоне.
- `now` — слот `live` у `ActivityFeed` `variant="session"`: строка «Сейчас» всегда последней.
- Завершённая сессия — запись `ActivityEvent`, не `SessionLive`.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| variant | `"widget" \| "now"` | `"widget"` | Виджет или строка ленты. |
| status | `"running" \| "starting" \| "answering" \| "retrying"` | `"running"` | Идёт; идёт без плана; отвечает на вопрос после шага; повтор после ошибки (`warn`). |
| operation | `ReactNode` | — | Текущая операция одной фразой: «запускает проверки проекта». |
| detail | `string` | — | `now`: технический хвост — `CodeChip` sm: «npm test -- members». |
| elapsed | `string` | — | Сколько идёт: «25 мин» — строку считает экран. |
| loading | `boolean` | `false` | «обновляется» вместо времени. |
| role, sessionId | `string` | — | `widget`: аватар роли, «S-118 · Developer». |
| href | `string` | — | `widget`: «Сессия агента»; весь виджет — ссылка. |
| resumed | `"transcript" \| "no-transcript" \| null` | `null` | `widget`: «Возобновлена», «Возобновлена без транскрипта» или «Идёт». |
| plan | `{ done, total } \| null` | `null` | `widget`: `PlanProgress`; `null` — «План ещё не получен». |

## Правила
- `widget`: строка 1 — аватар роли, «S-118 · Developer» (`EntityRef` session), `Pill` с пульсом «идёт» / «повтор», «Возобновлена · 25 мин» мелко и приглушённо; строка 2 — план; строка 3 — «Сейчас: …». Справа — стрелка; наведение — рамка `line-2` и фон `bg`, стрелка сдвигается; фокус — кольцо `accent`. До 560px шириной.
- `now`: та же сетка, что у `ActivityEvent` (маркер 24px, тело, время): точка с пульсом (`warn` при повторе), «Сейчас:» или «Повтор:», операция, деталь, «· 2 мин», справа «сейчас»; `role="status"`.
- Анимации выключаются при `prefers-reduced-motion`.

## Пример
```tsx
<SessionLive role="Developer" sessionId="S-118" href="/sessions/S-118" resumed="transcript" elapsed="25 мин" plan={{ done: 3, total: 6 }} operation="запускает проверки проекта" />

<ActivityFeed variant="session" events={steps} live={<SessionLive variant="now" operation="запускает тесты" detail="npm test -- members" elapsed="2 мин" />} />
```
