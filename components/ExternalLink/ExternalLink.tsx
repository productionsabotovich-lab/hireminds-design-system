/** Pattern: data/products/hireminds/design/system/patterns/external-link.md */
import type { ReactNode } from "react";
import s from "./ExternalLink.module.css";

export interface ExternalLinkProps {
  href: string;
  /**
   * 'footer' → mono 10.5px, mute, no underline (default)
   * 'inline' → UI 11.5-12px, ink-2, underline, for legal/in-paragraph
   * 'action' → UI 11.5-13px, accent-ink, with → arrow on right
   */
  variant?: "footer" | "inline" | "action" | undefined;
  /** Open in new tab */
  newTab?: boolean | undefined;
  children: ReactNode;
}

export function ExternalLink({
  href,
  variant = "footer",
  newTab = false,
  children,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={[s.link, s[variant]].join(" ")}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {variant === "action" && (
        <svg
          className={s.arrow}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14m-6-6l6 6-6 6" />
        </svg>
      )}
    </a>
  );
}
