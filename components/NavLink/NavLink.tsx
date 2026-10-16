"use client";
/** Pattern: data/products/hireminds/design/system/patterns/nav-link.md */
import type { ReactNode } from "react";
import s from "./NavLink.module.css";

interface NavLinkBadgeProps {
  kind: "count" | "soon";
  value?: string;
}

function NavLinkBadge({ kind, value }: NavLinkBadgeProps) {
  return (
    <span className={[s.badge, s[`badge-${kind}`]].join(" ")}>
      {value}
    </span>
  );
}

export interface NavLinkProps {
  href: string;
  /** Active state */
  active?: boolean;
  /** Icon (24x24, currentColor stroke) */
  icon?: ReactNode;
  /** Badge: count number or soon-tag */
  badge?: NavLinkBadgeProps;
  /**
   * 'default' — standard
   * 'danger'  — Danger zone (var(--danger-ink))
   */
  tone?: "default" | "danger";
  children: ReactNode;
}

export function NavLink({ href, active, icon, badge, tone = "default", children }: NavLinkProps) {
  return (
    <a
      href={href}
      className={[
        s.nav,
        active ? s.active : undefined,
        tone === "danger" ? s.danger : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {icon && <span className={s.icon} aria-hidden="true">{icon}</span>}
      <span className={s.label}>{children}</span>
      {badge && <NavLinkBadge kind={badge.kind} value={badge.value} />}
    </a>
  );
}

NavLink.Badge = NavLinkBadge;
