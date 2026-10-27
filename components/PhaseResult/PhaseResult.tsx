"use client";

import { useState } from "react";
import { ArtifactView, type Artifact } from "../ArtifactView";
import { Caption } from "../Caption";
import { EntityRef } from "../EntityRef";
import { IconArrow } from "../IconArrow";
import { Pill } from "../Pill";
import { ResultReport, type ReportBlock } from "../ResultReport";
import { UserAvatar } from "../UserAvatar";
import s from "./PhaseResult.module.css";

/** Версия результата фазы: отчёт роли и артефакты */
export interface PhaseVersion {
  /** Подпись версии: «v1 · вернул QA» */
  label?: string | undefined;
  report?: ReportBlock[] | undefined;
  artifacts?: Artifact[] | undefined;
}

/** Раздел «Результата» по фазе workflow: фаза, роль, сессия; отчёт и артефакты последней версии, прошлые — свёрнуты */
export interface PhaseResultProps {
  /** Фаза: «Code», «QA», «Маркетинг» */
  phase: string;
  /** Роль: «Developer», «Безопасность» */
  role: string;
  /** Роль — человек (круглый аватар) */
  human?: boolean | undefined;
  /** «из сессии S-118 ↗» */
  session?: { id: string; href?: string | undefined } | undefined;
  /** Когда: «сегодня, 14:20» */
  at?: string | undefined;
  /** Фаза ещё не дала результата: одна строка состояния без содержимого */
  status?: "running" | "error" | "waiting" | undefined;
  /** Подпись к строке состояния: «восстановится в 18:00» */
  note?: string | undefined;
  /** Последняя версия */
  report?: ReportBlock[] | undefined;
  artifacts?: Artifact[] | undefined;
  /** Прошлые версии, новые сначала */
  earlier?: PhaseVersion[] | undefined;
  /** Подпись к «ранее: 2 версии»: «— до возврата из QA» */
  earlierNote?: string | undefined;
  /** Прошлые версии раскрыты */
  openEarlier?: boolean | undefined;
}

const STATUS: Record<NonNullable<PhaseResultProps["status"]>, ["accent" | "danger" | "warn", string, boolean]> = {
  running: ["accent", "идёт", true],
  error: ["danger", "ошибка", false],
  waiting: ["warn", "ждёт решения", false],
};

const versions = (n: number) => {
  const d = n % 10;
  const dd = n % 100;
  return d === 1 && dd !== 11 ? "версия" : d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? "версии" : "версий";
};

function Version({ label, report, artifacts }: PhaseVersion) {
  return (
    <div className={s.version}>
      {label && (
        <Caption font="mono" tone="mute">
          {label}
        </Caption>
      )}
      {report && report.length > 0 && <ResultReport bare blocks={report} />}
      {(artifacts ?? []).map((a, i) => (
        <ArtifactView key={i} artifact={a} />
      ))}
    </div>
  );
}

export function PhaseResult({ phase, role, human = false, session, at, status, note, report, artifacts, earlier = [], earlierNote, openEarlier = false }: PhaseResultProps) {
  const [open, setOpen] = useState(openEarlier);
  const who = (
    <span className={s.role}>
      <UserAvatar name={role} size="xs" shape={human ? "circle" : "square"} color={human ? undefined : "var(--ink-3)"} />
      {role}
    </span>
  );
  const src = session && (
    <span className={s.src}>
      из сессии <EntityRef kind="session" id={session.id} href={session.href} />
      {session.href && (
        <span className={s.go} aria-hidden="true">
          ↗
        </span>
      )}
    </span>
  );

  if (status) {
    const [tone, label, pulse] = STATUS[status];
    return (
      <div className={s.line} role={status === "running" ? "status" : undefined}>
        <Pill tone="ink">{phase}</Pill>
        <Pill tone={tone} dot pulse={pulse}>
          {label}
        </Pill>
        {who}
        {src}
        {note && (
          <Caption font="ui" tone="mute">
            {note}
          </Caption>
        )}
      </div>
    );
  }

  return (
    <section className={s.ph} aria-label={`Фаза ${phase}: ${role}`}>
      <div className={s.head}>
        <Pill tone="ink">{phase}</Pill>
        {who}
        {src}
        <span className={s.sp} />
        {at && (
          <Caption font="ui" tone="mute">
            {at}
          </Caption>
        )}
      </div>
      <div className={s.body}>
        <Version report={report} artifacts={artifacts} />
        {earlier.length > 0 && (
          <div className={s.earlier}>
            <button type="button" className={s.toggle} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? "свернуть " : "ранее: "}
              {earlier.length} {versions(earlier.length)}
              {earlierNote ? ` ${earlierNote}` : ""}
              <IconArrow variant="chevron" direction={open ? "up" : "down"} size={11} />
            </button>
            {open && earlier.map((v, i) => <Version key={i} {...v} />)}
          </div>
        )}
      </div>
    </section>
  );
}
