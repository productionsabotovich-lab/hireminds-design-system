import { Icon, type IconName } from "../Icon";
import s from "./TopbarLink.module.css";

/** Ссылка правого слота Topbar: иконка, подпись, бейдж-счётчик или пометка «итерация 3» */
export interface TopbarLinkProps {
  /** Адрес; у ссылки с бейджем soon не нужен — она неактивна */
  href?: string | undefined;
  /** Подпись: «Мои решения», «Моя команда», «Журнал» */
  label: string;
  /** Подпись на узком экране (до 560px): «Решения» */
  shortLabel?: string | undefined;
  /** Иконка из набора Icon */
  icon?: IconName | undefined;
  /** count — число (заливка ink при > 0, inset при 0, «99+»); soon — пометка «итерация 3», ссылка неактивна */
  badge?: { kind: "count"; value: number } | { kind: "soon"; value?: string | undefined } | undefined;
  /** Текущая страница: aria-current и заливка inset */
  current?: boolean | undefined;
}

export function TopbarLink({ href, label, shortLabel, icon, badge, current = false }: TopbarLinkProps) {
  const soon = badge?.kind === "soon";
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

  if (soon) {
    return (
      <span className={[s.link, s.soon].join(" ")} aria-disabled="true">
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
