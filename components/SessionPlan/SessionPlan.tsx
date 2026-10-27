"use client";

import { useState } from "react";
import { Caption } from "../Caption";
import { Icon, type IconName } from "../Icon";
import { IconArrow } from "../IconArrow";
import { ListItem } from "../ListItem";
import { PlanProgress } from "../PlanProgress";
import s from "./SessionPlan.module.css";

export type PlanItemStatus = "done" | "in_progress" | "interrupted" | "pending";

/** Пункт плана от раннера */
export interface PlanItem {
  text: string;
  status: PlanItemStatus;
  /** Метка у пункта, добавленного по ходу работы: «добавлен агентом» */
  added?: string | undefined;
}

/** План работы сессии: выполненные свёрнуты, видны текущий и следующий, остальные — «Ещё N пунктов» */
export interface SessionPlanProps {
  items: PlanItem[];
  /** Сессия идёт: список — живая область */
  live?: boolean | undefined;
  /** Список пунктов раскрыт; по умолчанию — да */
  defaultOpen?: boolean | undefined;
  /** Пока плана нет */
  empty?: string | undefined;
}

const ICON: Record<PlanItemStatus, IconName> = {
  done: "square-check",
  in_progress: "square-dot",
  interrupted: "square-dash",
  pending: "square",
};

const TONE: Record<PlanItemStatus, "accent" | "danger" | "mute"> = {
  done: "accent",
  in_progress: "accent",
  interrupted: "danger",
  pending: "mute",
};

const SAY: Record<PlanItemStatus, string> = {
  done: "сделано",
  in_progress: "в работе",
  interrupted: "прервано",
  pending: "ожидает",
};

const points = (n: number) => {
  const d = n % 10;
  const dd = n % 100;
  return d === 1 && dd !== 11 ? "пункт" : d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? "пункта" : "пунктов";
};

type Row = PlanItem & { i: number };

function PlanRow({ it }: { it: Row }) {
  const tag = [it.status === "interrupted" ? "прервано" : null, it.added ?? null].filter(Boolean).join(" · ");
  return (
    <ListItem
      density="compact"
      leading={<Icon name={ICON[it.status]} size={16} title={SAY[it.status]} />}
      leadingTone={TONE[it.status]}
      title={it.text}
      hint={`${it.text} — ${SAY[it.status]}`}
      emphasis={it.status === "done" ? "muted" : undefined}
      trailing={tag || undefined}
      action="none"
    />
  );
}

/** Заголовок группы «Выполнено N» / «Ещё N пунктов»: та же высота 32px и колонка иконки, что у пункта */
function GroupToggle({ label, open, onToggle, icon }: { label: string; open: boolean; onToggle: () => void; icon: IconName }) {
  return (
    <li className={s.groupRow}>
      <button type="button" className={s.group} aria-expanded={open} onClick={onToggle}>
        <span className={s.groupIc} aria-hidden="true">
          <Icon name={icon} size={14} />
        </span>
        <span>{label}</span>
        <IconArrow variant="chevron" direction={open ? "up" : "down"} size={11} />
      </button>
    </li>
  );
}

export function SessionPlan({ items, live = false, defaultOpen = true, empty = "План появится, когда агент его составит." }: SessionPlanProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [showDone, setShowDone] = useState(false);
  const [showRest, setShowRest] = useState(false);

  if (!items.length) {
    return (
      <section className={s.plan} aria-label="План работы">
        <div className={s.head}>
          <span className={s.title}>План работы</span>
        </div>
        <Caption font="ui" tone="mute">
          {empty}
        </Caption>
      </section>
    );
  }

  const rows: Row[] = items.map((it, i) => ({ ...it, i }));
  const done = rows.filter((it) => it.status === "done");
  let cur = rows.findIndex((it) => it.status === "in_progress" || it.status === "interrupted");
  if (cur < 0) cur = rows.findIndex((it) => it.status === "pending");
  // видны текущий и следующий пункт; остальные невыполненные — под «Ещё N пунктов»
  const focus = cur < 0 ? [] : rows.slice(cur, cur + 2).filter((it) => it.status !== "done");
  const rest = cur < 0 ? [] : rows.slice(cur + 2).filter((it) => it.status !== "done");
  const allDone = showDone || focus.length === 0;

  return (
    <section className={s.plan} aria-label="План работы">
      <button type="button" className={[s.head, s.headBtn].join(" ")} aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className={s.title}>План работы</span>
        <IconArrow variant="chevron" direction={open ? "up" : "down"} size={12} />
        <span className={s.count}>
          {done.length} из {items.length}
        </span>
      </button>
      <PlanProgress done={done.length} total={items.length} label="" />
      {open && (
        <ol className={s.items} aria-live={live ? "polite" : undefined}>
          {done.length > 0 && focus.length > 0 && (
            <GroupToggle label={`Выполнено ${done.length}`} open={showDone} onToggle={() => setShowDone(!showDone)} icon="check" />
          )}
          {allDone && done.map((it) => <PlanRow key={it.i} it={it} />)}
          {focus.map((it) => (
            <PlanRow key={it.i} it={it} />
          ))}
          {rest.length > 0 && (
            <GroupToggle label={`Ещё ${rest.length} ${points(rest.length)}`} open={showRest} onToggle={() => setShowRest(!showRest)} icon="ellipsis" />
          )}
          {showRest && rest.map((it) => <PlanRow key={it.i} it={it} />)}
        </ol>
      )}
    </section>
  );
}
