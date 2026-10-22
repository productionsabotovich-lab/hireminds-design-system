/**
 * Pattern: data/products/hireminds/design/system/patterns/crumb.md
 * Mockup: https://preview.sabotovich.pro/hireminds/e1-settings-llm.html
 */
import Link from "next/link";
import s from "./Crumb.module.css";

export interface CrumbItem {
  label: string;
  href?: string | undefined;
  /** Рендерить mono шрифтом (для slug/code-like сегментов) */
  mono?: boolean | undefined;
  /** Последний (текущий) сегмент — bold ink, не кликабельный */
  active?: boolean | undefined;
}

export interface CrumbProps {
  items: CrumbItem[];
  /** Show chevron before first item (when Brand is to the left) */
  leadingChevron?: boolean | undefined;
}

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={s.chevron}
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function Crumb({ items, leadingChevron = false }: CrumbProps) {
  return (
    <nav className={s.crumb} aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isFirst = i === 0;
        const segmentClass = [
          s.segment,
          item.mono ? s.mono : undefined,
          item.active ? s.active : undefined,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <span key={i} className={s.item}>
            {(!isFirst || leadingChevron) && <ChevronIcon />}
            {item.active || !item.href ? (
              <span className={segmentClass}>{item.label}</span>
            ) : (
              <Link href={item.href} className={segmentClass}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
