"use client";

import { Fragment, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ArtifactView, type Artifact } from "../ArtifactView";
import { Body } from "../Body";
import { Caption } from "../Caption";
import { DescriptionList } from "../DescriptionList";
import { Dot } from "../Dot";
import { ExternalLink } from "../ExternalLink";
import { H3 } from "../H3";
import { Pill } from "../Pill";
import { Plate } from "../Plate";
import { Table, type TableColumn } from "../Table";
import s from "./ResultReport.module.css";

/** Тон серии графика и узла схемы — токены тонов */
export type ReportTone = "accent" | "warn" | "ink";

export interface DiagramNode {
  id: string;
  label: string;
  /** Левый верхний угол в единицах viewBox */
  x: number;
  y: number;
  /** Выделить узел (accent-soft) */
  accent?: boolean | undefined;
}

/** Блок отчёта: содержимое, которое агент собрал под решение */
export type ReportBlock =
  | { type: "text"; text: string }
  | { type: "list"; title?: string | undefined; items: string[] }
  | { type: "callout"; tone?: "info" | "warn" | undefined; title: string; text?: string | undefined; items?: string[] | undefined }
  | { type: "compare"; before: string; after: string }
  | { type: "link"; label: string; href: string }
  | { type: "findings"; title?: string | undefined; items: { tone: "error" | "warn" | "ok" | "info"; text: string }[] }
  | { type: "artifact"; artifact: Artifact }
  | {
      type: "table";
      title?: string | undefined;
      /** num — числа по правому краю */
      columns: { label: string; num?: boolean | undefined }[];
      /** Первая ячейка — заголовок строки; total — итог, pick — рекомендация */
      rows: { cells: ReactNode[]; total?: boolean | undefined; pick?: boolean | undefined }[];
    }
  | {
      type: "diagram";
      /** Что на схеме — для читалки */
      label: string;
      caption?: string | undefined;
      nodes: DiagramNode[];
      /** Стрелки: [откуда, куда, подпись?] */
      edges: [string, string, string?][];
      width?: number | undefined;
      height?: number | undefined;
      nodeWidth?: number | undefined;
    }
  | {
      type: "chart";
      label: string;
      caption?: string | undefined;
      /** Подписи по оси X */
      x: string[];
      series: { label: string; tone?: ReportTone | undefined; values: number[] }[];
      /** Верх шкалы; по умолчанию — максимум значений */
      max?: number | undefined;
      /** Деления шкалы Y; по умолчанию 0, половина, верх */
      ticks?: number[] | undefined;
      /** Подпись оси Y — единица: «мс», «тыс. ₽» */
      unit?: string | undefined;
      /** Подпись оси X: «задач в минуту» */
      xLabel?: string | undefined;
    };

/** «Что сделано»: отчёт агента из блоков содержимого — текст, списки, таблица, схема, график, вложения-артефакты */
export interface ResultReportProps {
  blocks: ReportBlock[];
  /** Заголовок карточки; по умолчанию «Что сделано» */
  title?: string | undefined;
  /** Подпись рядом с заголовком: «PM · 12 мин назад» */
  caption?: string | undefined;
  /** Без рамки и заголовка — внутри другой карточки (PhaseResult) */
  bare?: boolean | undefined;
  /** Свёрнут до 3 строк с «Показать результат полностью» */
  clamp?: boolean | undefined;
  /** clamp: «Показать результат полностью» ведёт сюда, а не раскрывает на месте */
  fullHref?: string | undefined;
  /** Промежуточный: Pill «промежуточный» у заголовка */
  interim?: boolean | undefined;
}

const FIND: Record<"error" | "warn" | "ok" | "info", ["danger" | "warn" | "accent" | "dim", string]> = {
  error: ["danger", "ошибка: "],
  warn: ["warn", "замечание: "],
  ok: ["accent", "в порядке: "],
  info: ["dim", ""],
};

/** Схема: узлы-прямоугольники и стрелки; цвета — токены, не крупнее текста страницы */
function Diagram(b: Extract<ReportBlock, { type: "diagram" }>) {
  const arrow = `${useId()}arr`;
  const W = b.width ?? 560;
  const Hh = b.height ?? 200;
  const nw = b.nodeWidth ?? 140;
  const nh = 40; // высота узла в единицах viewBox
  const by = Object.fromEntries(b.nodes.map((n) => [n.id, n]));
  return (
    <svg className={s.dia} viewBox={`0 0 ${W} ${Hh}`} role="img" aria-label={b.label} style={{ minWidth: W }}>
      <defs>
        <marker id={arrow} viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className={s.diaHead} />
        </marker>
      </defs>
      {b.edges.map(([from, to, label], j) => {
        const a = by[from];
        const c = by[to];
        if (!a || !c) return null;
        // вправо — от правого края к левому; иначе — вниз, от низа к верху
        const right = c.x > a.x;
        const x1 = right ? a.x + nw : a.x + nw / 2;
        const y1 = right ? a.y + nh / 2 : a.y + nh;
        const x2 = right ? c.x - 2 : c.x + nw / 2;
        const y2 = right ? c.y + nh / 2 : c.y - 2;
        return (
          <g key={`e${j}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className={s.diaEdge} markerEnd={`url(#${arrow})`} />
            {label && (
              <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} textAnchor="middle" className={s.diaEdgeLabel}>
                {label}
              </text>
            )}
          </g>
        );
      })}
      {b.nodes.map((n) => (
        <g key={n.id}>
          <rect x={n.x} y={n.y} width={nw} height={nh} rx={6} className={[s.diaNode, n.accent ? s.diaAccent : ""].filter(Boolean).join(" ")} />
          <text x={n.x + nw / 2} y={n.y + nh / 2 + 4} textAnchor="middle" className={s.diaLabel}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const fmt = (v: number) => v.toLocaleString("ru-RU");

/** Линейный график: одна шкала, подписи осей, легенда тонами; последняя точка серии — крупнее */
function LineChart(b: Extract<ReportBlock, { type: "chart" }>) {
  const W = 600;
  const Hh = 220;
  const L = 52;
  const R = 16;
  const T = 24; // сверху — место под подпись оси Y
  const B = 40;
  const max = b.max ?? Math.max(...b.series.flatMap((x) => x.values), 1);
  const X = (j: number) => L + (W - L - R) * (b.x.length === 1 ? 0.5 : j / (b.x.length - 1));
  const Y = (v: number) => T + (Hh - T - B) * (1 - v / max);
  const ticks = b.ticks ?? [0, max / 2, max];
  return (
    <div className={s.chart}>
      {/* прокручивается только поле графика; легенда — всегда видна */}
      <div className={s.figScroll} tabIndex={0} role="region" aria-label={b.label}>
        <svg className={s.chartSvg} viewBox={`0 0 ${W} ${Hh}`} role="img" aria-label={b.label} style={{ minWidth: W }}>
          {ticks.map((t, j) => (
            <g key={`t${j}`}>
              <line x1={L} x2={W - R} y1={Y(t)} y2={Y(t)} className={s.grid} />
              <text x={L - 8} y={Y(t) + 4} textAnchor="end" className={s.tick}>
                {fmt(t)}
              </text>
            </g>
          ))}
          {b.x.map((x, j) => (
            <text key={`x${j}`} x={X(j)} y={Hh - B + 18} textAnchor="middle" className={s.tick}>
              {x}
            </text>
          ))}
          {b.unit && (
            <text x={L - 8} y={10} textAnchor="end" className={s.tick}>
              {b.unit}
            </text>
          )}
          {b.xLabel && (
            <text x={W - R} y={Hh - 4} textAnchor="end" className={s.tick}>
              {b.xLabel}
            </text>
          )}
          {b.series.map((sr, k) => (
            <g key={`s${k}`} className={s[`tone-${sr.tone ?? "ink"}`]}>
              <polyline points={sr.values.map((v, j) => `${X(j)},${Y(v)}`).join(" ")} className={s.line} />
              {sr.values.map((v, j) => (
                <circle key={j} cx={X(j)} cy={Y(v)} r={j === sr.values.length - 1 ? 4 : 2.5} className={s.point} />
              ))}
            </g>
          ))}
        </svg>
      </div>
      <ul className={s.legend}>
        {b.series.map((sr, k) => (
          <li key={k} className={s[`tone-${sr.tone ?? "ink"}`]}>
            <i aria-hidden="true" />
            {sr.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Block({ b }: { b: ReportBlock }) {
  switch (b.type) {
    case "text":
      return <Body tone="ink">{b.text}</Body>;
    case "list":
      return (
        <div className={s.part}>
          {b.title && (
            <Caption font="mono" tone="mute">
              {b.title}
            </Caption>
          )}
          <ul className={s.list}>
            {b.items.map((it, j) => (
              <li key={j}>
                <Body tone="ink-2" size="small">
                  {it}
                </Body>
              </li>
            ))}
          </ul>
        </div>
      );
    case "callout":
      return (
        <Plate variant={b.tone === "warn" ? "warning" : "info"}>
          <strong>{b.title}</strong>
          {b.items ? (
            <ol className={s.steps}>
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ol>
          ) : (
            b.text && <> {b.text}</>
          )}
        </Plate>
      );
    case "compare":
      return (
        <DescriptionList
          columns={2}
          items={[
            { label: "Было", value: b.before },
            { label: "Стало", value: b.after },
          ]}
        />
      );
    case "link":
      return (
        <div>
          <ExternalLink href={b.href} variant="action" newTab>
            {b.label}
          </ExternalLink>
        </div>
      );
    case "findings":
      return (
        <div className={s.part}>
          {b.title && (
            <Caption font="mono" tone="mute">
              {b.title}
            </Caption>
          )}
          <ul className={s.find}>
            {b.items.map((it, j) => {
              const [tone, say] = FIND[it.tone];
              return (
                <li key={j}>
                  <span className={s.findDot}>
                    <Dot variant="status" tone={tone} size="md" />
                  </span>
                  <Body tone="ink-2" size="small">
                    {say && <span className={s.srOnly}>{say}</span>}
                    {it.text}
                  </Body>
                </li>
              );
            })}
          </ul>
        </div>
      );
    case "artifact":
      return (
        <div className={s.art}>
          <ArtifactView artifact={b.artifact} />
        </div>
      );
    case "table": {
      const columns: TableColumn[] = b.columns.map((c, k) => ({ key: `c${k}`, label: c.label, numeric: c.num }));
      return (
        <div className={s.part}>
          {b.title && (
            <Caption font="mono" tone="mute">
              {b.title}
            </Caption>
          )}
          <Table
            dense
            rowHeaders
            caption={b.title}
            columns={columns}
            rows={b.rows.map((r, j) => ({
              id: String(j),
              total: r.total,
              pick: r.pick,
              cells: Object.fromEntries(r.cells.map((v, k) => [`c${k}`, v])),
            }))}
          />
        </div>
      );
    }
    case "diagram":
      return (
        <figure className={s.fig}>
          {/* уже своей ширины — прокрутка в рамке: подписи остаются в кегле 10.5–12px */}
          <div className={s.figScroll} tabIndex={0} role="region" aria-label={b.label}>
            <Diagram {...b} />
          </div>
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
    case "chart":
      return (
        <figure className={s.fig}>
          <LineChart {...b} />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}

export function ResultReport({ blocks, title = "Что сделано", caption, bare = false, clamp = false, fullHref, interim = false }: ResultReportProps) {
  const [open, setOpen] = useState(false);
  const [cut, setCut] = useState(false);
  const lead = useRef<HTMLDivElement>(null);
  const id = `${useId()}report`;
  const clamped = clamp && !open;
  // свёрнуто: первый абзац на 3 строки; остальные блоки — по «Показать результат полностью»
  const first = blocks[0]?.type === "text" ? blocks[0] : null;

  useLayoutEffect(() => {
    const el = lead.current;
    if (!clamped) return;
    setCut(blocks.length > 1 || !first || (!!el && el.scrollHeight > el.clientHeight + 1));
  }, [clamped, blocks, first]);

  const content = blocks.map((b, i) => <Fragment key={i}>{<Block b={b} />}</Fragment>);
  if (bare) return <div className={s.bare}>{content}</div>;

  return (
    <section className={s.rep} aria-label={title}>
      <div className={s.head}>
        <H3 size="card">{title}</H3>
        {interim && <Pill tone="dim">промежуточный</Pill>}
        {caption && (
          <Caption font="ui" tone="mute">
            {caption}
          </Caption>
        )}
      </div>
      <div id={id} className={s.blocks}>
        {clamped ? (
          first && (
            <div ref={lead} className={s.clamp}>
              <Body tone="ink">{first.text}</Body>
            </div>
          )
        ) : (
          content
        )}
      </div>
      {clamp && (cut || open) && (
        <div className={s.foot}>
          {fullHref ? (
            <ExternalLink href={fullHref} variant="action">
              Показать результат полностью
            </ExternalLink>
          ) : (
            <button type="button" className={s.more} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
              {open ? "Свернуть" : "Показать результат полностью"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
