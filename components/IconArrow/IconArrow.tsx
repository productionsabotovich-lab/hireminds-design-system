/** Pattern: data/products/hireminds/design/system/patterns/icon-arrow.md */
import s from "./IconArrow.module.css";

export interface IconArrowProps {
  /** Direction */
  direction?: "right" | "left" | "up" | "down" | undefined;
  /** Type */
  variant?: "arrow" | "chevron" | "send" | undefined;
  /** Size in px */
  size?: 11 | 12 | 13 | 14 | 16 | 18 | undefined;
}

const PATHS: Record<NonNullable<IconArrowProps["variant"]>, Record<NonNullable<IconArrowProps["direction"]>, string>> = {
  arrow: {
    right: "M5 12h14m-6-6l6 6-6 6",
    left: "M19 12H5m6-6l-6 6 6 6",
    up: "M12 19V5m-6 6l6-6 6 6",
    down: "M12 5v14m-6-6l6 6 6-6",
  },
  chevron: {
    right: "M9 18l6-6-6-6",
    left: "M15 18l-6-6 6-6",
    up: "M6 15l6-6 6 6",
    down: "M6 9l6 6 6-6",
  },
  send: {
    right: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
    left: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
    up: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
    down: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  },
};

export function IconArrow({
  direction = "right",
  variant = "arrow",
  size = 14,
}: IconArrowProps) {
  const path = PATHS[variant][direction];
  const strokeWidth = variant === "chevron" ? 1.6 : 2;

  return (
    <svg
      className={s.icon}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
