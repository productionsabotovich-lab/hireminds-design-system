import { Icon, type IconName } from "../Icon";
import s from "./TopbarLink.module.css";

interface TopbarLinkBase {
  /** Подпись: «Мои решения», «Моя команда», «Журнал» */
  label: string;
  /** Подпись на узком экране (до 600px): «Решения» */
  shortLabel?: string | undefined;
  /** Иконка из набора Icon; в макете — только у «Мои решения» */
  icon?: IconName | undefined;
  /** Текущая страница: aria-current и заливка inset */
  current?: boolean | undefined;
}

/** Ссылка правого слота Topbar: иконка, подпись, бейдж-счётчик или пометка «итерация 3» */
export type TopbarLinkProps = TopbarLinkBase &
  (
    | {
        /** Адрес — обязателен у активной ссылки */
        href: string;
        /** count — число (заливка ink при > 0, inset при 0, «99+») */
        badge?: { kind: "count"; value: number } | undefined;
      }
    | {
        href?: undefined;
        /** soon — пометка «итерация 3», ссылка неактивна и скрыта на экране до 720px */
        badge: { kind: "soon"; value?: string | undefined };
      }
  );

export function TopbarLink({ href, label, shortLabel, icon, badge, current = false }: TopbarLinkProps) {
  const text = (
    <>
      {icon && (
        <span className={s.icon}>
          <Icon name={icon} size={14} />
        </span>
      )}
      <span className={shortLabel ? s.long : undefined}>{label}</span>
      {shortLabel && <span className={s.short}>{shortLabel}</span>}
    </>
  );

  if (badge?.kind === "soon") {
    return (
      <span className={[s.link, s.soon].join(" ")} role="link" aria-disabled="true">
        {text}
        <span className={s.soonBadge}>{badge.value ?? "итерация 3"}</span>
      </span>
    );
  }

  const count = badge?.kind === "count" ? badge.value : undefined;
  return (
    <a
      href={href}
      className={[s.link, current ? s.current : ""].filter(Boolean).join(" ")}
      aria-current={current ? "page" : undefined}
      aria-label={count !== undefined ? `${label}: ${count} открыто` : undefined}
    >
      {text}
      {count !== undefined && (
        <span className={[s.count, count > 0 ? s.countOn : ""].filter(Boolean).join(" ")} aria-hidden="true">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </a>
  );
}
