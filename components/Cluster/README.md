# Cluster

Горизонтальная раскладка: дети в строку с переносом и отступом из шкалы `space-*`.

## Когда использовать
- Тулбар: «Обновлено 5 с назад», «Обновить», «Отменить», «Повторить» — `Cluster gap={3}`.
- Шапка страницы: заголовок слева, тулбар справа — `justify="between"`; на узком экране тулбар переносится вниз.
- Группа бейджей или кнопок. Вертикальная раскладка — Stack.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| gap | `SpaceStep` (1–17) | `2` | Отступ между детьми в строке. |
| rowGap | `SpaceStep` | как `gap` | Отступ между перенесёнными строками. |
| align | `"start" \| "center" \| "end" \| "baseline"` | `"center"` | Выравнивание по вертикали. |
| justify | `"start" \| "end" \| "between"` | `"start"` | Распределение по горизонтали. |
| wrap | `boolean` | `true` | `false` — держать в одну строку. |
| children | `ReactNode` | обязательный | Содержимое. |
| className | `string` | — | Дополнительный класс. |

## Правила
- Кнопки рядом — `gap={2}` (`space-2`), группы в тулбаре — `gap={3}`, заголовок и тулбар — `gap={4}`.
- Шапку с заголовком и кнопками выравнивай по нижнему краю (`align="end"`), заголовок с бейджем — по центру.
- Не отключай перенос у тулбаров: на 400px кнопки должны уходить на вторую строку, а не за край.

## Пример
```tsx
import { Cluster, H1, UpdatedAt, Button } from "../index";

<Cluster justify="between" align="end" gap={4}>
  <H1 size="section">Операции</H1>
  <Cluster gap={3}>
    <UpdatedAt updatedAt={lastFetch} loading={fetching} />
    <Button variant="secondary" size="sm" onClick={refresh}>Обновить</Button>
  </Cluster>
</Cluster>
```
