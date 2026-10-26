/**
 * Issue reference: tracker key in mono and the issue title, optionally a link.
 */
import s from "./TaskRef.module.css";

export interface TaskRefProps {
  /** Tracker key: «HIR-28» */
  issueKey: string;
  /** Issue title */
  title: string;
  /** Link to the issue; without it the reference is plain text */
  href?: string | undefined;
  /** Open href in a new tab (tracker) */
  newTab?: boolean | undefined;
  /** cell — in a table row; heading — in the page title (H1 renders the size) */
  variant?: "cell" | "heading" | undefined;
}

/** @deprecated Используй `EntityRef kind="task"`: `issueKey` → `id`, `variant` → `size`. Компонент останется до итерации 3. */
export function TaskRef({ issueKey, title, href, newTab = false, variant = "cell" }: TaskRefProps) {
  const body = (
    <>
      <span className={s.key}>{issueKey}</span>
      <span className={s.title}>{title}</span>
    </>
  );
  const cls = [s.root, s[variant]].join(" ");
  return href ? (
    <a className={[cls, s.link].join(" ")} href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  ) : (
    <span className={cls}>{body}</span>
  );
}
