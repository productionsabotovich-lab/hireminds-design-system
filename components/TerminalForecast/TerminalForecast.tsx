/**
 * Pattern: data/products/hireminds/design/system/patterns/terminal-forecast.md
 * Mockup: https://preview.sabotovich.pro/hireminds/e1-byok.html (секция «ЧТО ПРОИЗОЙДЁТ ПОСЛЕ»)
 *
 * Светлый блок-превью следующих шагов после действия пользователя.
 * Используется в: BYOK, workspace create, onboarding steps.
 */

import s from "./TerminalForecast.module.css";

export interface TerminalForecastItem {
  text: string;
  /** Выделить зелёным — важный шаг */
  accent?: boolean | undefined;
}

export interface TerminalForecastProps {
  /** Заголовок блока, например «ЧТО ПРОИЗОЙДЁТ» */
  title: string;
  /** Метка справа в заголовке, например «ПОСЛЕ» */
  subtitle?: string | undefined;
  items: TerminalForecastItem[];
  footer?: {
    label: string;
    value: string;
  };
}

export function TerminalForecast({
  title,
  subtitle,
  items,
  footer,
}: TerminalForecastProps) {
  return (
    <div className={s.root}>
      <div className={s.hd}>
        <span className={s.dot} />
        <span className={s.ttl}>{title}</span>
        {subtitle && <span className={s.sub}>{subtitle}</span>}
      </div>
      <div className={s.body}>
        {items.map((item, i) => (
          <div key={i} className={s.row}>
            <span className={s.arrow}>→</span>
            <span className={item.accent ? s.valAcc : s.val}>{item.text}</span>
          </div>
        ))}
        {footer && (
          <div className={`${s.row} ${s.footerRow}`}>
            <span className={s.footerLabel}>{footer.label}</span>
            <span className={s.valAcc}>{footer.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
