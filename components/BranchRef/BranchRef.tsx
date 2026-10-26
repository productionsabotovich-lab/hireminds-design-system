import { CodeChip } from "../CodeChip";
import { Icon } from "../Icon";
import { Tooltip } from "../Tooltip";
import s from "./BranchRef.module.css";

/** Ветка: иконка ветки и CodeChip-ссылка; с base — «откуда → куда» обеими ветками одним видом */
export interface BranchRefProps {
  /** Ветка: «hm/PIL-15-project-roles» */
  name: string;
  /** Ссылка на ветку в GitHub; открывается в новой вкладке */
  href?: string | undefined;
  /** Целевая ветка: «main» */
  base?: string | undefined;
  baseHref?: string | undefined;
}

function Branch({ name, href, fixed = false }: { name: string; href?: string | undefined; fixed?: boolean }) {
  return (
    <span className={[s.branch, fixed ? s.fixed : ""].filter(Boolean).join(" ")}>
      <span className={s.icon} aria-hidden="true">
        <Icon name="branch" size={14} />
      </span>
      {/* длинная ветка — многоточие в чипе, полное имя — в подсказке */}
      {/* имя ветки — видимый текст чипа: describe не нужен, обёртка не focusable */}
      <Tooltip text={name} focusable={false} describe={false} whenTruncated>
        <span className={s.chip}>
          <CodeChip href={href} newTab={!!href}>
            {name}
          </CodeChip>
        </span>
      </Tooltip>
    </span>
  );
}

export function BranchRef({ name, href, base, baseHref }: BranchRefProps) {
  return (
    <span className={s.root}>
      <Branch name={name} href={href} />
      {base && (
        <>
          <span className={s.arrow} aria-label="в">
            →
          </span>
          {/* целевая ветка (main) короткая и не сжимается: многоточие — у исходной */}
          <Branch name={base} href={baseHref} fixed />
        </>
      )}
    </span>
  );
}
