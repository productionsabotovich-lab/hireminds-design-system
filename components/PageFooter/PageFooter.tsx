/** Pattern: data/products/hireminds/design/system/patterns/page-footer.md */
import { BrandSignature } from "../index";
import { LinkBar, type LinkBarLink } from "../LinkBar";
import { Dot } from "../Dot";
import s from "./PageFooter.module.css";

export interface PageFooterProps {
  /** Left part — BrandSignature props or custom node */
  brand?: { version?: string; year?: number; segments?: string[] };
  /** Links on the right */
  links?: LinkBarLink[];
  /**
   * 'between' → brand left, links right (default)
   * 'center'  → everything centered in one line
   * 'inline'  → brand + links in one line via separator-dot (stage-foot)
   */
  layout?: "between" | "center" | "inline";
}

export function PageFooter({ brand, links = [], layout = "between" }: PageFooterProps) {
  const brandNode = brand ? (
    <BrandSignature {...brand} />
  ) : (
    <BrandSignature version="S2" year={2026} />
  );

  if (layout === "inline") {
    return (
      <div className={[s.foot, s.inline].join(" ")}>
        {brandNode}
        {links.map((link) => (
          <span key={link.href}>
            <Dot variant="separator" tone="dim" size="xs" />
            <a href={link.href} className={s.inlineLink}>
              {link.label}
            </a>
          </span>
        ))}
      </div>
    );
  }

  if (layout === "center") {
    return (
      <div className={[s.foot, s.center].join(" ")}>
        {brandNode}
        {links.length > 0 && <LinkBar links={links} separator="dotted" />}
      </div>
    );
  }

  return (
    <div className={[s.foot, s.between].join(" ")}>
      {brandNode}
      {links.length > 0 && <LinkBar links={links} />}
    </div>
  );
}
