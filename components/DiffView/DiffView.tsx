"use client";

import { useState } from "react";
import s from "./DiffView.module.css";

/** Фрагмент изменений: начало в старой и новой версии, строки с первым символом «+», «-» или « » */
export interface DiffHunk {
  oldStart: number;
  newStart: number;
  /** Функция или блок, где фрагмент: «export function MemberMenu(…) {» */
  context?: string | undefined;
  /** Строки unified diff: «+добавлено», «-удалено», « контекст» */
  lines: string[];
}

/** Изменения одного файла — unified diff: номера строк старой и новой версии, добавленные и удалённые строки цветом */
export interface DiffViewProps {
  /** Путь файла — для читалки: «Изменения в apps/web/…» */
  path: string;
  hunks: DiffHunk[];
  /** Сколько строк показать до «показать всё (N строк)» */
  limit?: number | undefined;
}

type Row =
  | { type: "hunk"; text: string; key: string }
  | { type: "add" | "del" | "ctx"; o: number | ""; n: number | ""; text: string; key: string };

function toRows(hunks: DiffHunk[]): Row[] {
  const rows: Row[] = [];
  hunks.forEach((hk, k) => {
    rows.push({ type: "hunk", text: `@@ −${hk.oldStart} +${hk.newStart} @@${hk.context ? ` ${hk.context}` : ""}`, key: `h${k}` });
    let o = hk.oldStart;
    let n = hk.newStart;
    hk.lines.forEach((ln, i) => {
      const sign = ln.charAt(0);
      const text = ln.slice(1);
      const key = `${k}-${i}`;
      if (sign === "+") rows.push({ type: "add", o: "", n: n++, text, key });
      else if (sign === "-") rows.push({ type: "del", o: o++, n: "", text, key });
      else rows.push({ type: "ctx", o: o++, n: n++, text, key });
    });
  });
  return rows;
}

const lines = (n: number) => {
  const d = n % 10;
  const dd = n % 100;
  return d === 1 && dd !== 11 ? "строка" : d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? "строки" : "строк";
};

const SIGN = { add: "+", del: "−", ctx: " " };
const SAY = { add: "добавлено", del: "удалено", ctx: "" };

export function DiffView({ path, hunks, limit = 20 }: DiffViewProps) {
  const [all, setAll] = useState(false);
  const rows = toRows(hunks);
  const shown = all || rows.length <= limit ? rows : rows.slice(0, limit);

  return (
    <div className={s.diff} role="region" aria-label={`Изменения в ${path}`}>
      {/* широкие строки прокручиваются внутри блока, страница — нет */}
      <div className={s.scroll} tabIndex={0}>
        <table className={s.table}>
          <tbody>
            {shown.map((r) =>
              r.type === "hunk" ? (
                <tr key={r.key} className={s.hunk}>
                  <td colSpan={4}>{r.text}</td>
                </tr>
              ) : (
                <tr key={r.key} className={s[r.type]}>
                  <td className={s.no} aria-hidden="true">
                    {r.o}
                  </td>
                  <td className={s.no} aria-hidden="true">
                    {r.n}
                  </td>
                  <td className={s.sign}>
                    <span aria-hidden="true">{SIGN[r.type]}</span>
                    {SAY[r.type] && <span className={s.srOnly}>{SAY[r.type]}</span>}
                  </td>
                  <td className={s.code}>{r.text || " "}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      {rows.length > limit && (
        <button type="button" className={s.more} aria-expanded={all} onClick={() => setAll(!all)}>
          {all ? "свернуть" : `показать всё (${rows.length} ${lines(rows.length)})`}
        </button>
      )}
    </div>
  );
}
