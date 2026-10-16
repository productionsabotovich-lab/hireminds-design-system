# Card

Белая карточка с тонкой рамкой и слотами header, body и footer: базовый контейнер секции страницы.

## Когда использовать
- Секции настроек (settings-general, settings-llm), карточки провайдеров на BYOK, шаги онбординга, карточка email-verify.
- `header` строкой даёт простой заголовок; ReactNode нужен для заголовка с иконкой или кнопкой.
- `footer`: ряд кнопок действий, например Отмена / Удалить в Danger zone.
- Короткое сообщение с иконкой делай через Plate; окно поверх страницы — модалка (`r-xl`, `sh-3`), а не Card.

## Пропсы
| Prop | Тип | По умолчанию | Что делает |
|---|---|---|---|
| header | `ReactNode` | — | Шапка; строка рендерится как `<h3>` 13.5px вес 600. |
| children | `ReactNode` | обязательный | Тело карточки. |
| footer | `ReactNode` | — | Футер с действиями: flex-ряд с gap 8px. |
| className | `string` | `""` | Дополнительный класс на корень. |

## Правила
- Фон `surface`, рамка 1px `line`, радиус `r-lg`, тень `sh-1`. Не подменяй тень и не ставь радиус 12px и больше.
- Паддинги: header 14px 18px 12px с нижней рамкой `line`; body 16px 18px; footer 12px 18px 14px с верхней рамкой `line`.
- Строковый заголовок: `font-ui` 13.5px, вес 600, letter-spacing -0.01em, цвет `ink`.
- Не вкладывай Card в Card, раздели на две секции. Карточка без `surface` теряет смысл, тогда нужен обычный `<section>`.

## Пример
```tsx
import { Card, Button } from "../index";

<Card
  header="Danger zone"
  footer={
    <>
      <Button variant="ghost" size="sm">Отмена</Button>
      <Button variant="danger" size="sm">Удалить навсегда</Button>
    </>
  }
>
  Удаление workspace необратимо. Все данные будут потеряны.
</Card>
```
