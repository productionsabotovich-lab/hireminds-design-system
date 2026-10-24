"use client";
/**
 * Pattern: data/products/hireminds/design/system/patterns/switcher.md
 */

import type { KeyboardEvent } from "react";
import styles from "./Switcher.module.css";

export interface SwitcherTab {
  id: string;
  label: string;
}

export interface SwitcherProps {
  tabs: SwitcherTab[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string | undefined;
  /** Подпись группы для диктора: «Вид журнала» */
  label?: string | undefined;
  /** id панели с содержимым вкладок: вкладки получают aria-controls и id вида `${panelId}-tab-${tab.id}` */
  panelId?: string | undefined;
}

/** id вкладки для aria-labelledby панели: <div role="tabpanel" id={panelId} aria-labelledby={switcherTabId(panelId, activeId)}> */
export const switcherTabId = (panelId: string, tabId: string) => `${panelId}-tab-${tabId}`;

/**
 * Switcher — compact tab-row, used on signin/create-account screen.
 * Renders as role="tablist" for accessibility.
 * Mirrors .switcher pattern from e1-signin-create-account.html.
 *
 * Styling: CSS Modules (Switcher.module.css). Design tokens from globals.css.
 */
export function Switcher({ tabs, activeId, onSelect, className, label, panelId }: SwitcherProps) {
  // клавиатура по шаблону WAI-ARIA tabs: в порядке Tab — только активная вкладка, стрелки и Home/End — по вкладкам
  // если activeId не совпал ни с одной вкладкой, в порядок Tab встаёт первая — иначе группа недоступна с клавиатуры
  const focusId = tabs.some((t) => t.id === activeId) ? activeId : tabs[0]?.id;
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // с модификаторами — клавиши браузера и системы (Alt+← — «назад»), не перехватываем
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const i = tabs.findIndex((t) => t.id === focusId);
    const next =
      e.key === "ArrowRight" ? (i + 1) % tabs.length
      : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length
      : e.key === "Home" ? 0
      : e.key === "End" ? tabs.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    onSelect(tabs[next]!.id);
    const buttons = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons[next]?.focus();
  };

  return (
    <div
      className={[styles.switcher, className].filter(Boolean).join(" ")}
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          id={panelId ? switcherTabId(panelId, tab.id) : undefined}
          aria-controls={panelId}
          aria-selected={tab.id === activeId}
          tabIndex={tab.id === focusId ? 0 : -1}
          type="button"
          onClick={() => onSelect(tab.id)}
          className={[styles.tab, tab.id === activeId ? styles.tabActive : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
