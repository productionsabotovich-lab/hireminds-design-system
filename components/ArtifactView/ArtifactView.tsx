"use client";

import type { ReactNode } from "react";
import { BranchRef } from "../BranchRef";
import { Caption } from "../Caption";
import { DiffView, type DiffHunk } from "../DiffView";
import { Dot } from "../Dot";
import { EntityRef, type EntityKind } from "../EntityRef";
import { ExternalLink } from "../ExternalLink";
import { Icon, iconForFile, type IconName } from "../Icon";
import { List } from "../List";
import { ListItem, type ListItemEntity } from "../ListItem";
import { Pill, type PillTone } from "../Pill";
import { DiffStat, PullRequestSummary, type PullRequestSummaryProps } from "../PullRequestSummary";
import { TerminalBox, TerminalLine } from "../TerminalBox";
import { UserAvatar } from "../UserAvatar";
import s from "./ArtifactView.module.css";

/** Проверка: CI, тесты, линтер, проверка роли */
export interface ArtifactCheck {
  label: string;
  /** ok — пройдена, fail — нет, warn — с замечаниями, running — идёт, skip — пропущена */
  state?: "ok" | "fail" | "warn" | "running" | "skip" | undefined;
  /** Моноширинное название: команда */
  mono?: boolean | undefined;
  /** Полный текст, если название обрезано */
  hint?: string | undefined;
  /** Где прошла: песочница, GitHub CI, роль */
  source?: { kind: "sandbox" } | { kind: "github" } | { kind: "role"; role: string } | undefined;
  /** Результат: «без замечаний», «3 ошибки в MemberMenu.tsx» */
  result?: string | undefined;
  /** Вывод — раскрывается TerminalBox под строкой */
  out?: string[] | undefined;
  open?: boolean | undefined;
  /** Ссылки: сессия, прогон CI, отчёт */
  links?: { kind: EntityKind; id: string; href?: string | undefined; newTab?: boolean | undefined; hint?: string | undefined }[] | undefined;
}

export interface ArtifactFile {
  path: string;
  additions?: number | undefined;
  deletions?: number | undefined;
  href?: string | undefined;
  /** Изменения файла: строка раскрывает DiffView */
  diff?: DiffHunk[] | undefined;
}

/** Группа файлов по месту: репозиторий с веткой или диск проекта */
export interface ArtifactFileGroup {
  place: "repo" | "disk";
  /** repo: репозиторий */
  repo?: string | undefined;
  branch?: string | undefined;
  branchHref?: string | undefined;
  /** repo: branch — «в ветке», merged — «влиты в main», pending — «не отправлены в ветку»; disk: saved — «сохранены» */
  state?: "branch" | "merged" | "pending" | "saved" | undefined;
  base?: string | undefined;
  pr?: { number: number; href?: string | undefined } | undefined;
  /** disk: название, по умолчанию «Файлы проекта» */
  name?: string | undefined;
  files: ArtifactFile[];
  /** Ещё N файлов — ссылкой */
  more?: number | undefined;
  moreHref?: string | undefined;
}

/** Артефакт фазы или решения: закрытый каталог типов; неизвестный тип — ссылкой с подписью */
export type Artifact =
  | { type: "pr"; title?: string | undefined; items: PullRequestSummaryProps[]; emptyText?: string | undefined }
  | { type: "doc"; title?: string | undefined; revision?: string | undefined; path: string; href?: string | undefined; meta?: string | undefined; additions?: number | undefined; deletions?: number | undefined }
  | { type: "checks"; title?: string | undefined; rows: ArtifactCheck[]; emptyText?: string | undefined }
  | { type: "files"; title?: string | undefined; groups: ArtifactFileGroup[]; emptyText?: string | undefined }
  | { type: "images"; title?: string | undefined; items: { src: string; alt: string; caption: string; href?: string | undefined }[] }
  | {
      type: "link";
      title?: string | undefined;
      items: { title: string; href: string; subtitle?: string | undefined; meta?: string | undefined; icon?: IconName | undefined; entity?: ListItemEntity | undefined; newTab?: boolean | undefined }[];
    }
  | { type: "decision"; listTitle?: string | undefined; id: string; title: string; sub?: string | undefined; href?: string | undefined; outcome?: { label: string; tone: PillTone } | undefined };

export interface ArtifactViewProps {
  artifact: Artifact;
}

const CHECK_ICON: Record<"ok" | "fail" | "warn", [IconName, "accent" | "danger" | "warn"]> = {
  ok: ["check", "accent"],
  fail: ["x", "danger"],
  warn: ["alert", "warn"],
};

const SOURCE = { sandbox: ["box", "локально в песочнице"], github: ["workflow", "GitHub CI"] } as const;

const plural = (n: number, one: string, few: string, many: string) => {
  const d = n % 10;
  const dd = n % 100;
  return d === 1 && dd !== 11 ? one : d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? few : many;
};

function Source({ source }: { source: NonNullable<ArtifactCheck["source"]> }) {
  if (source.kind === "role")
    return (
      <span className={s.src} title={`роль ${source.role}`}>
        <UserAvatar name={source.role} size="xs" shape="square" color="var(--ink-3)" />
        <span className={s.srOnly}>роль {source.role}</span>
      </span>
    );
  const [icon, label] = SOURCE[source.kind];
  return (
    <span className={s.src} title={label}>
      <Icon name={icon} size={14} />
      <span className={s.srOnly}>{label}</span>
    </span>
  );
}

function CheckRow({ row }: { row: ArtifactCheck }) {
  const state = row.state ?? "ok";
  const ic = state === "ok" || state === "fail" || state === "warn" ? CHECK_ICON[state] : null;
  const lead =
    state === "running" ? <Dot variant="status" tone="accent" size="md" pulse /> : ic ? <Icon name={ic[0]} size={14} title={{ ok: "пройдена", fail: "не пройдена", warn: "с замечаниями" }[state as "ok"]} /> : <span aria-hidden="true">–</span>;
  const links = (row.links ?? []).map((l) => <EntityRef key={l.id} kind={l.kind} id={l.id} href={l.href} newTab={l.newTab} hint={l.hint} />);
  return (
    <ListItem
      cells
      leading={lead}
      leadingTone={ic ? ic[1] : "mute"}
      title={row.label}
      mono={row.mono}
      hint={row.hint}
      emphasis={state === "skip" ? "muted" : undefined}
      badge={row.source ? <Source source={row.source} /> : undefined}
      trailing={row.result}
      resultTone={state === "fail" ? "danger" : undefined}
      expand={
        row.out
          ? {
              open: row.open,
              label: "вывод",
              content: (
                <TerminalBox variant="log">
                  {row.out.map((o, j) => (
                    <TerminalLine key={j}>{o}</TerminalLine>
                  ))}
                </TerminalBox>
              ),
            }
          : undefined
      }
      action={links.length ? <>{links}</> : "none"}
    />
  );
}

function fileState(g: ArtifactFileGroup): ReactNode {
  if (g.state === "pending") return <span className={s.warn}>не отправлены в ветку</span>;
  if (g.state === "saved") return "сохранены";
  const pr = g.pr ? <EntityRef kind="pr" id={`#${g.pr.number}`} href={g.pr.href} newTab hint={`PR #${g.pr.number} в GitHub`} /> : null;
  return (
    <>
      {g.state === "merged" ? `влиты в ${g.base ?? "main"}` : "в ветке"}
      {pr && " · "}
      {pr}
    </>
  );
}

function fileSections(groups: ArtifactFileGroup[]) {
  return groups.map((g) => {
    const disk = g.place === "disk";
    const name = disk ? g.name ?? "Файлы проекта" : g.repo ?? "";
    const rows: ReactNode[] = g.files.map((f) => (
      <ListItem
        key={f.path}
        density="compact"
        leading={<Icon name={iconForFile(f.path)} size={16} />}
        leadingTone="mute"
        path={f.path}
        href={f.diff ? undefined : f.href}
        newTab={!!f.href}
        trailing={
          f.additions != null && f.deletions != null ? (
            <span className={s.stat}>
              <DiffStat additions={f.additions} deletions={f.deletions} />
            </span>
          ) : undefined
        }
        action={f.diff || f.href ? undefined : "none"}
        expand={f.diff ? { content: <DiffView path={f.path} hunks={f.diff} /> } : undefined}
      />
    ));
    if (g.more)
      rows.push(
        <li key="more" className={s.moreRow}>
          {g.moreHref ? (
            <ExternalLink href={g.moreHref} variant="inline" newTab>
              ещё {g.more} {plural(g.more, "файл", "файла", "файлов")}
              {g.pr ? ` в PR #${g.pr.number}` : ""}
            </ExternalLink>
          ) : (
            `ещё ${g.more} ${plural(g.more, "файл", "файла", "файлов")}`
          )}
        </li>,
      );
    return {
      label: disk ? name : `Репозиторий ${name}`,
      header: (
        <>
          <span className={s.ic}>
            <Icon name={disk ? "hard-drive" : "repo"} size={14} />
          </span>
          <span className={s.place}>{name}</span>
          {!disk && g.branch && <BranchRef name={g.branch} href={g.branchHref} />}
          <span className={s.sp} />
          <span>{fileState(g)}</span>
        </>
      ),
      items: rows,
    };
  });
}

export function ArtifactView({ artifact: a }: ArtifactViewProps) {
  switch (a.type) {
    case "pr": {
      const x = a as Extract<Artifact, { type: "pr" }>;
      return (
        <List title={x.title ?? "Pull requests"} count={x.items.length} emptyText={x.emptyText ?? "PR пока не открыт"}>
          {x.items.map((it) => (
            <PullRequestSummary key={it.number} {...it} variant="row" />
          ))}
        </List>
      );
    }
    case "doc": {
      const x = a as Extract<Artifact, { type: "doc" }>;
      return (
        <List title={`${x.title ?? "Документ"}${x.revision ? ` · ${x.revision}` : ""}`}>
          <ListItem
            leading={<Icon name={iconForFile(x.path)} size={16} />}
            leadingTone="mute"
            path={x.path}
            href={x.href}
            newTab
            subtitle={x.meta}
            trailing={x.additions != null && x.deletions != null ? <DiffStat additions={x.additions} deletions={x.deletions} /> : undefined}
          />
        </List>
      );
    }
    case "checks": {
      const x = a as Extract<Artifact, { type: "checks" }>;
      // счётчик — число не пройденных (danger), если такие есть; иначе — всего проверок
      const failed = x.rows.filter((r) => r.state === "fail").length;
      return (
        <List
          title={x.title ?? "Проверки"}
          grid="cells"
          count={x.rows.length ? failed || x.rows.length : undefined}
          countTone={failed ? "danger" : undefined}
          emptyText={x.emptyText ?? "Проверки не запускались"}
        >
          {x.rows.map((r, i) => (
            <CheckRow key={`${r.label}${i}`} row={r} />
          ))}
        </List>
      );
    }
    case "files": {
      const x = a as Extract<Artifact, { type: "files" }>;
      const total = x.groups.reduce((n, g) => n + g.files.length + (g.more ?? 0), 0);
      return <List title={x.title ?? "Изменённые файлы"} count={total} emptyText={x.emptyText ?? "Файлов пока нет"} sections={fileSections(x.groups)} />;
    }
    case "images": {
      const x = a as Extract<Artifact, { type: "images" }>;
      return (
        <section className={s.shots} aria-label={x.title ?? "Изображения"}>
          <div className={s.head}>
            <span className={s.title}>{x.title ?? "Изображения"}</span>
            <span className={s.count}>{x.items.length}</span>
          </div>
          <ul className={s.grid}>
            {x.items.map((it, i) => (
              <li key={i}>
                <figure className={s.shot}>
                  <a className={s.img} href={it.href ?? it.src} target="_blank" rel="noopener noreferrer" aria-label={`Открыть: ${it.caption}`}>
                    <img src={it.src} alt={it.alt} loading="lazy" />
                  </a>
                  <figcaption>
                    <Caption font="ui" tone="mute">
                      {it.caption}
                    </Caption>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      );
    }
    case "link": {
      const x = a as Extract<Artifact, { type: "link" }>;
      return (
        <List title={x.title ?? "Ссылки"} count={x.items.length}>
          {x.items.map((l, i) => (
            <ListItem
              key={i}
              entity={l.entity}
              leading={l.icon ? <Icon name={l.icon} size={16} /> : undefined}
              leadingTone="mute"
              title={l.title}
              subtitle={l.subtitle}
              trailing={l.meta}
              href={l.href}
              newTab={l.newTab !== false}
            />
          ))}
        </List>
      );
    }
    case "decision": {
      const x = a as Extract<Artifact, { type: "decision" }>;
      return (
        <List title={x.listTitle ?? "Решение"}>
          <ListItem
            entity={{ kind: "decision", id: x.id }}
            title={x.title}
            subtitle={x.sub}
            href={x.href}
            trailing={x.outcome ? <Pill tone={x.outcome.tone}>{x.outcome.label}</Pill> : undefined}
          />
        </List>
      );
    }
    default: {
      // вид, которого нет в каталоге, — ссылкой с подписью
      const x = a as { type: string; title?: string; href?: string; sub?: string };
      return (
        <div className={s.unknown}>
          {x.href ? (
            <ExternalLink href={x.href} variant="action" newTab>
              {x.title ?? "Открыть"}
            </ExternalLink>
          ) : (
            <span className={s.title}>{x.title ?? x.type}</span>
          )}
          <Caption font="ui" tone="mute">
            Вид «{x.type}» показан ссылкой{x.sub ? ` · ${x.sub}` : ""}
          </Caption>
        </div>
      );
    }
  }
}
