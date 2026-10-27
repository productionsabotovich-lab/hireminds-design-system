"use client";

import { useState, type ReactNode } from "react";
import { Dot } from "../Dot";
import { EntityRef, type EntityKind } from "../EntityRef";
import { IconArrow } from "../IconArrow";
import { Pill } from "../Pill";
import s from "./ListItem.module.css";

export type ListItemTone = "accent" | "warn" | "danger" | "dim" | "ink";

/** Состояние строки: Pill в широкой колонке, точка с подписью во второй строке в узкой */
export interface ListItemState {
  tone: ListItemTone;
  label: string;
  /** Живое: точка пульсирует */
  pulse?: boolean | undefined;
  /** Точка в Pill (широкая колонка) */
  dot?: boolean | undefined;
}

/** Сущность строки: EntityRef перед названием */
export interface ListItemEntity {
  kind: EntityKind;
  id: string;
  hint?: string | undefined;
  /** Без иконки: иконка типа стоит в leading (List делает это сам) */
  bare?: boolean | undefined;
}

/** Строка любого списка: leading · entity и название · подпись · состояние · trailing · action. Только внутри List */
export interface ListItemProps {
  /** Колонка слева: иконка типа, аватар или точка; по центру первой строки */
  leading?: ReactNode;
  /** Цвет иконки в leading */
  leadingTone?: "ink" | "mute" | "accent" | "warn" | "danger" | undefined;
  /** EntityRef перед названием: «D-44», «S-118» */
  entity?: ListItemEntity | undefined;
  /** Название */
  title?: ReactNode;
  /** Путь файла вместо названия: каталог приглушённо, имя файла — моно */
  path?: string | undefined;
  /** Название моноширинным */
  mono?: boolean | undefined;
  /** Вторая строка: кто, когда, канал */
  subtitle?: ReactNode;
  /** Вторая строка в узкой колонке (до 360px): только имя */
  subtitleShort?: ReactNode;
  /** Состояние: Pill справа; в узкой колонке — точка с подписью во второй строке */
  state?: ListItemState | undefined;
  /** Колонка состояния постоянной ширины, px: состояние прижато вправо, строки списка — одна сетка (строка задачи) */
  stateWidth?: number | undefined;
  /** Справа перед состоянием */
  trailingStart?: ReactNode;
  /** Справа после состояния: мета, «+n −m», время. В узкой колонке (до 360px) trailingStart и trailing скрыты */
  trailing?: ReactNode;
  /** Справа в узкой колонке вместо trailing: аватар и точка состояния у строки задачи; по умолчанию — ничего */
  trailingNarrow?: ReactNode;
  /** Действие справа; по умолчанию — шеврон у ссылки, ↗ у новой вкладки, ▸/▾ у раскрытия; "none" — без действия */
  action?: ReactNode | "none";
  /** Вся строка — ссылка */
  href?: string | undefined;
  newTab?: boolean | undefined;
  /** Подсказка к строке (title): полное название */
  hint?: string | undefined;
  /** regular — 44px; compact — 32px (файлы, проверки) */
  density?: "regular" | "compact" | undefined;
  /** attention — открытое, ждёт действия; muted — закрытое, приглушённо */
  emphasis?: "attention" | "muted" | undefined;
  /** Вся строка раскрывает содержимое под собой */
  expand?: { content: ReactNode; open?: boolean | undefined; label?: string | undefined } | undefined;
  /** Строка в сетке колонок списка (List grid="cells"): иконка · название · источник (badge) · результат (trailing) · действия */
  cells?: boolean | undefined;
  /** cells: источник */
  badge?: ReactNode;
  /** cells: тон результата */
  resultTone?: "danger" | undefined;
}

const dirName = (p: string) => (p.includes("/") ? p.slice(0, p.lastIndexOf("/") + 1) : "");
const baseName = (p: string) => p.slice(p.lastIndexOf("/") + 1);

export function ListItem({
  leading,
  leadingTone,
  entity,
  title,
  path,
  mono = false,
  subtitle,
  subtitleShort,
  state,
  stateWidth,
  trailingStart,
  trailing,
  trailingNarrow,
  action,
  href,
  newTab = false,
  hint,
  density = "regular",
  emphasis,
  expand,
  cells = false,
  badge,
  resultTone,
}: ListItemProps) {
  const [open, setOpen] = useState(!!expand?.open);
  const titleText = typeof title === "string" ? title : path;
  const titleNode = path ? (
    <>
      <span className={s.dir}>{dirName(path)}</span>
      <span className={s.file}>{baseName(path)}</span>
    </>
  ) : (
    title
  );
  const lead =
    leading != null ? <span className={[s.lead, leadingTone ? s[`tone-${leadingTone}`] : ""].filter(Boolean).join(" ")}>{leading}</span> : null;
  const detail = expand && open ? <div className={s.detail}>{expand.content}</div> : null;

  // проверки: строка в сетке колонок списка
  if (cells) {
    const exBtn = expand ? (
      <button type="button" className={s.linkBtn} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? "свернуть" : expand.label ?? "вывод"}
      </button>
    ) : null;
    return (
      <li className={[s.wrap, s.cellsWrap].join(" ")}>
        <div className={[s.row, s.compact, s.cells].join(" ")} title={hint}>
          <span className={[s.lead, leadingTone ? s[`tone-${leadingTone}`] : ""].filter(Boolean).join(" ")}>{leading}</span>
          <span className={[s.title, mono ? s.mono : ""].filter(Boolean).join(" ")} title={titleText}>
            {titleNode}
          </span>
          <span className={s.badge}>{badge}</span>
          <span className={[s.res, resultTone === "danger" ? s.resDanger : ""].filter(Boolean).join(" ")}>{trailing}</span>
          <span className={s.cellAct}>
            {exBtn}
            {action !== "none" ? action : null}
          </span>
        </div>
        {detail}
      </li>
    );
  }

  const chevron = (dir: "right" | "down") => (
    <span className={s.go} aria-hidden="true">
      <IconArrow variant="chevron" direction={dir} size={12} />
    </span>
  );
  const act =
    action === "none"
      ? null
      : action != null
        ? action
        : expand
          ? chevron(open ? "down" : "right")
          : href
            ? newTab
              ? <span className={s.go} aria-hidden="true">↗</span>
              : chevron("right")
            : null;

  // полоса у левого края по наведению и фокусу — тоном состояния: закрытые mute, без состояния — нейтральная
  const edge =
    emphasis === "muted" ? "mute" : state && (state.tone === "accent" || state.tone === "warn" || state.tone === "danger") ? state.tone : "neutral";

  const body = (
    <>
      {lead}
      <span className={[s.title, mono || path ? s.mono : ""].filter(Boolean).join(" ")} title={hint ?? titleText}>
        {entity && (
          <>
            <EntityRef kind={entity.kind} id={entity.id} hint={entity.hint} bare={entity.bare} />{" "}
          </>
        )}
        {titleNode}
      </span>
      {(subtitle != null || state) && (
        <span className={[s.sub, subtitleShort != null ? s.hasShort : ""].filter(Boolean).join(" ")}>
          {state && (
            // узкая колонка: состояние точкой с подписью во второй строке
            <span className={[s.nstate, s[`tone-${state.tone}`]].join(" ")}>
              <Dot variant="status" tone={state.tone} size="sm" pulse={!!state.pulse} />
              {/* подпись и «·» одним текстом: зазор flex только между точкой и подписью */}
              <span>
                {state.label}
                {subtitle != null && <span className={s.nsep}> · </span>}
              </span>
            </span>
          )}
          {subtitle != null && <span className={s.subFull}>{subtitle}</span>}
          {subtitleShort != null && <span className={s.subShort}>{subtitleShort}</span>}
        </span>
      )}
      {/* слот trailing есть всегда: action — в последней колонке во всех строках */}
      <span className={s.trail}>
        {trailingStart}
        {state && (
          <span className={s.wstate} style={stateWidth ? { minWidth: stateWidth } : undefined}>
            {emphasis === "attention" ? (
              // открытое — без заливки: точка и подпись тоном состояния
              <span className={[s.plain, s[`tone-${state.tone}`]].join(" ")}>
                <Dot variant="status" tone={state.tone} size="sm" pulse={!!state.pulse} />
                {state.label}
              </span>
            ) : (
              <Pill tone={state.tone} dot={!!state.dot} pulse={!!state.pulse}>
                {state.label}
              </Pill>
            )}
          </span>
        )}
        {trailing}
      </span>
      {trailingNarrow != null && <span className={s.ntrail}>{trailingNarrow}</span>}
      <span className={s.act}>{act}</span>
    </>
  );

  const cls = [
    s.row,
    density === "compact" ? s.compact : "",
    lead ? "" : s.noLead,
    href || expand ? s.link : "",
    expand ? s.toggle : "",
    emphasis ? s[emphasis] : "",
    s[`edge-${edge}`],
  ]
    .filter(Boolean)
    .join(" ");

  const row = expand ? (
    <button type="button" className={cls} aria-expanded={open} onClick={() => setOpen(!open)}>
      {body}
    </button>
  ) : href ? (
    <a className={cls} href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );

  return (
    <li className={[s.wrap, density === "compact" ? s.wrapCompact : ""].filter(Boolean).join(" ")}>
      {row}
      {detail}
    </li>
  );
}
