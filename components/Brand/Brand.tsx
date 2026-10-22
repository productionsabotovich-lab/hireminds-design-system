/**
 * Pattern: data/products/hireminds/design/system/patterns/brand.md
 */
import Link from "next/link";
import styles from "./Brand.module.css";

export interface BrandProps {
  name?: string | undefined;
  mark?: string | undefined;
  href?: string | undefined;
  onClick?: (() => void) | undefined;
}

export function Brand({ name = "Hireminds", mark, href = "/", onClick }: BrandProps) {
  const letter = mark ?? name[0] ?? "H";

  const inner = (
    <>
      <div className={styles.mark} aria-hidden="true">
        {letter}
      </div>
      <div className={styles.name}>{name}</div>
    </>
  );

  if (onClick) {
    return (
      <div
        className={[styles.wrap, styles.wrapClickable].join(" ")}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        {inner}
      </div>
    );
  }

  return (
    <Link href={href} className={[styles.wrap, styles.wrapClickable].join(" ")}>
      {inner}
    </Link>
  );
}
