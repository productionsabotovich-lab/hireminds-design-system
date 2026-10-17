/** Pattern: data/products/hireminds/design/system/patterns/link-bar.md */
import { ExternalLink } from "../ExternalLink";
import { Dot } from "../Dot";
import s from "./LinkBar.module.css";

export interface LinkBarLink {
  label: string;
  href: string;
}

export interface LinkBarProps {
  links: LinkBarLink[];
  /**
   * 'plain'  → just gap (default)
   * 'dotted' → separator Dot between each
   */
  separator?: "plain" | "dotted" | undefined;
  /**
   * 'sm' → space-4 (16px), default
   * 'md' → space-5 (20px)
   */
  gap?: "sm" | "md" | undefined;
}

export function LinkBar({ links, separator = "plain", gap = "sm" }: LinkBarProps) {
  return (
    <div className={[s.bar, s[`gap-${gap}`]].join(" ")}>
      {links.map((link, i) => (
        <span key={`${i}-${link.label}`}>
          {separator === "dotted" && i > 0 && (
            <Dot variant="separator" tone="dim" size="xs" />
          )}
          <ExternalLink variant="footer" href={link.href}>
            {link.label}
          </ExternalLink>
        </span>
      ))}
    </div>
  );
}
