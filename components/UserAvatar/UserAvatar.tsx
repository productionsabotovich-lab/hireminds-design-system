/**
 * Pattern: data/products/hireminds/design/system/patterns/user-avatar.md
 * Mockup: https://preview.sabotovich.pro/hireminds/e1-workspace-setup.html
 */
import Image from "next/image";
import s from "./UserAvatar.module.css";

export interface UserAvatarProps {
  /** Полное имя — из него вычисляются инициалы */
  name: string;
  /** URL аватарки (если есть — рендерится вместо инициалов) */
  image?: string | null;
  /** Размер */
  size?: "xs" | "sm" | "md" | "lg";
  /** Форма */
  shape?: "circle" | "square";
  /**
   * Цвет фона:
   * - 'accent' — gradient (для текущего пользователя)
   * - строка HEX или CSS-переменная — solid цвет
   */
  color?: "accent" | string;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";
}

export function UserAvatar({
  name,
  image,
  size = "sm",
  shape = "square",
  color = "accent",
}: UserAvatarProps) {
  const initials = getInitials(name);

  const cls = [
    s.avatar,
    s[`size-${size}`],
    s[`shape-${shape}`],
    color === "accent" ? s.accent : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyle =
    color !== "accent"
      ? ({ "--av-color": color } as React.CSSProperties)
      : undefined;

  const sizePx: Record<string, number> = { xs: 18, sm: 24, md: 28, lg: 32 };
  const px = sizePx[size] ?? 24;

  return (
    <span className={cls} style={inlineStyle} aria-label={name}>
      {image ? (
        <Image src={image} alt={name} width={px} height={px} className={s.img} />
      ) : (
        initials
      )}
    </span>
  );
}
