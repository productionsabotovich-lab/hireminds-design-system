"use client";
/**
 * Pattern: data/products/hireminds/design/system/patterns/switcher.md
 */

import styles from "./Switcher.module.css";

export interface SwitcherTab {
  id: string;
  label: string;
}

export interface SwitcherProps {
  tabs: SwitcherTab[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

/**
 * Switcher — compact tab-row, used on signin/create-account screen.
 * Renders as role="tablist" for accessibility.
 * Mirrors .switcher pattern from e1-signin-create-account.html.
 *
 * Styling: CSS Modules (Switcher.module.css). Design tokens from globals.css.
 */
export function Switcher({ tabs, activeId, onSelect, className }: SwitcherProps) {
  return (
    <div
      className={[styles.switcher, className].filter(Boolean).join(" ")}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeId}
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
