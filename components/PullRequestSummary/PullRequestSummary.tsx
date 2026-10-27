import type { ReactNode } from "react";
import { BranchRef } from "../BranchRef";
import { CodeChip } from "../CodeChip";
import { Icon } from "../Icon";
import { ListItem, type ListItemTone } from "../ListItem";
import s from "./PullRequestSummary.module.css";

export type PullRequestState = "open" | "draft" | "merged" | "closed";

/** Pull request: строка PR (ListItem) — в списке или шапкой карточки с «Что изменилось» */
export interface PullRequestSummaryProps {
  /** full — одна карточка; row — строка в List */
  variant?: "full" | "row" | undefined;
  number: number;
  title: string;
  /** PR в GitHub: открывается в новой вкладке (↗) */
  href?: string | undefined;
  state: PullRequestState;
  /** Ветка PR → целевая */
  head: string;
  headHref?: string | undefined;
  base: string;
  baseHref?: string | undefined;
  additions?: number | undefined;
  deletions?: number | undefined;
  files?: number | undefined;
  /** Итог CI: пройдено из всех */
  checks?: { passed: number; total: number } | undefined;
  /** full: «Что изменилось» — пункты */
  description?: string[] | undefined;
  /** full: короткий хеш последнего коммита */
  commit?: string | undefined;
  commitHref?: string | undefined;
  /** full: кто открыл */
  author?: string | undefined;
  /** full: блок ниже карточки — изменённые файлы */
  children?: ReactNode;
}

const STATE: Record<PullRequestState, [string, ListItemTone]> = {
  open: ["Открыт", "accent"],
  draft: ["Черновик", "dim"],
  merged: ["Влит", "accent"],
  closed: ["Закрыт", "dim"],
};

const filesWord = (n: number) => {
  const d = n % 10;
  const dd = n % 100;
  return d === 1 && dd !== 11 ? "файл" : d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? "файла" : "файлов";
};

/** «+312 −41»: цифры цветом, для читалки — словами */
function Stat({ additions, deletions }: { additions: number; deletions: number }) {
  return (
    <span className={s.stat}>
      <span className={s.add} aria-hidden="true">
        +{additions}
      </span>{" "}
      <span className={s.del} aria-hidden="true">
        −{deletions}
      </span>
      <span className={s.srOnly}>
        добавлено {additions}, удалено {deletions}
      </span>
    </span>
  );
}

function Ci({ passed, total }: { passed: number; total: number }) {
  const ok = passed === total;
  return (
    <span className={[s.ci, ok ? s.ciOk : s.ciFail].join(" ")} title={`Проверки CI: ${passed} из ${total} пройдены`}>
      <Icon name={ok ? "check" : "alert"} size={14} />
      <span className={s.srOnly}>проверки CI </span>
      {passed} из {total}
    </span>
  );
}

function Row(p: PullRequestSummaryProps & { lead?: boolean }) {
  const [label, tone] = STATE[p.state];
  const hasDiff = p.additions != null && p.deletions != null;
  const diff = hasDiff ? (
    <span className={s.diff}>
      <Stat additions={p.additions!} deletions={p.deletions!} />
      {p.files != null && (
        <span className={s.files}>
          {" "}
          · {p.files} {filesWord(p.files)}
        </span>
      )}
    </span>
  ) : null;
  const ci = p.checks ? <Ci {...p.checks} /> : null;
  return (
    <ListItem
      leading={p.lead ? <Icon name={p.state === "merged" ? "pull-request-merged" : "pull-request"} size={16} /> : undefined}
      leadingTone={p.lead ? "mute" : undefined}
      entity={{ kind: "pr", id: `#${p.number}`, bare: !!p.lead }}
      title={p.title}
      href={p.href}
      newTab
      subtitle={<BranchRef name={p.head} href={p.headHref} base={p.base} baseHref={p.baseHref} />}
      // узкая колонка: вторая строка «● Открыт · +312 −41 · ✓ 4 из 4» — без ветки, без многоточия и без числа файлов
      subtitleShort={
        hasDiff || ci ? (
          <span className={s.short}>
            {hasDiff && <Stat additions={p.additions!} deletions={p.deletions!} />}
            {hasDiff && ci && " · "}
            {ci}
          </span>
        ) : undefined
      }
      state={{ label, tone, dot: true }}
      trailingStart={diff}
      trailing={ci}
    />
  );
}

export function PullRequestSummary(props: PullRequestSummaryProps) {
  const { variant = "full", number, description, commit, commitHref, author, children } = props;
  if (variant === "row") return <Row {...props} />;

  const what = description && description.length > 0;
  return (
    <div className={s.stack}>
      <section className={s.card} aria-label={`Pull request #${number}`}>
        <ul className={s.head}>
          <Row {...props} lead />
        </ul>
        {(what || commit) && (
          <div className={s.body}>
            {what && (
              <>
                <p className={s.h}>Что изменилось</p>
                <ul className={s.desc}>
                  {description!.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </>
            )}
            {commit && (
              <p className={s.meta}>
                коммит{" "}
                <CodeChip href={commitHref} newTab={!!commitHref} title="Коммит в GitHub" size="sm">
                  {commit}
                </CodeChip>
                {author && ` · открыл ${author}`}
              </p>
            )}
          </div>
        )}
      </section>
      {children}
    </div>
  );
}
