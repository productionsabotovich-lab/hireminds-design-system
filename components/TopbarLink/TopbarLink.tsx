import { Dot } from "../Dot";
import { Icon, type IconName } from "../Icon";
import { Tooltip } from "../Tooltip";
import s from "./TopbarLink.module.css";

interface TopbarLinkBase {
  /** Подпись: «Мои решения», «Файлы», «Журнал» */
  label: string;
  /** Подпись на узком экране (до 600px): «Решения» */
  shortLabel?: string | undefined;
  /** Иконка из набора Icon; в макете — только у «Мои решения» */
  icon?: IconName | undefined;
  /** Текущая страница: aria-current и заливка inset */
  current?: boolean | undefined;
}

/** Ссылка правого слота Topbar: иконка, подпись, счётчик; attention — точка у иконки и число; soon — пункт, которого ещё нет */
export type TopbarLinkProps = TopbarLinkBase &
  (
    | {
        /** Адрес — обязателен у активной ссылки */
        href: string;
        /** count — число (заливка ink при > 0, inset при 0, «99+») */
        badge?: { kind: "count"; value: number } | undefined;
        /**
         * attention — «Мои решения»: зелёная точка у иконки, пока есть открытые решения (пульс — пока есть неоткрытые,
         * `unseen`), число — текстом после подписи; ноль — ни точки, ни числа
         */
        tone?: "default" | "attention" | undefined;
        /** attention: сколько решений ещё не открывали — точка пульсирует */
        unseen?: number | undefined;
      }
    | {
        href?: undefined;
        /** soon — пункта ещё нет: приглушённый, без метки, подсказка «Скоро»; value не показывается (устарело) */
        badge: { kind: "soon"; value?: string | undefined };
        tone?: undefined;
        unseen?: undefined;
      }
  );

export function TopbarLink({ href, label, shortLabel, icon, badge, current = false, tone = "default", unseen = 0 }: TopbarLinkProps) {
  const count = badge?.kind === "count" ? badge.value : undefined;
  const attention = tone === "attention";
  const lit = attention && !!count && count > 0;

  const text = (
    <>
      {icon && (
        <span className={s.icon}>
          <Icon name={icon} size={14} />
          {/* attention: точка у правого верхнего края иконки; пульс — пока есть неоткрытые */}
          {lit && (
            <span className={s.dot} aria-hidden="true">
              <Dot variant="status" tone="accent" size="sm" pulse={unseen > 0} />
            </span>
          )}
        </span>
      )}
      <span className={shortLabel ? s.long : undefined}>{label}</span>
      {shortLabel && <span className={s.short}>{shortLabel}</span>}
    </>
  );

  if (badge?.kind === "soon") {
    // пункта ещё нет: «итерация N» в интерфейсе не пишется — только подсказка «Скоро»
    return (
      <Tooltip text="Скоро" focusable={false} describe={false}>
        <span className={[s.link, s.soon].join(" ")} aria-disabled="true">
          {text}
          <span className={s.srOnly}>, скоро</span>
        </span>
      </Tooltip>
    );
  }

  const say =
    count === undefined
      ? undefined
      : attention
        ? count > 0
          ? `${label}: ${count} открыто${unseen > 0 ? `, из них ${unseen} новых` : ""}`
          : `${label}: открытых нет`
        : `${label}: ${count} открыто`;

  return (
    <a
      href={href}
      className={[s.link, current ? s.current : ""].filter(Boolean).join(" ")}
      aria-current={current ? "page" : undefined}
      aria-label={say}
    >
      {text}
      {count !== undefined &&
        (attention ? (
          // attention: число обычным текстом после подписи; ноль — ничего
          count > 0 && (
            <span className={s.num} aria-hidden="true">
              {count > 99 ? "99+" : count}
            </span>
          )
        ) : (
          <span className={[s.count, count > 0 ? s.countOn : ""].filter(Boolean).join(" ")} aria-hidden="true">
            {count > 99 ? "99+" : count}
          </span>
        ))}
    </a>
  );
}
