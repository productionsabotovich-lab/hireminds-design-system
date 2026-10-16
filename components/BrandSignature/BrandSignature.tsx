/** Pattern: data/products/hireminds/design/system/patterns/brand-signature.md */
import s from "./BrandSignature.module.css";

export interface BrandSignatureProps {
  /** Additional segment after HM (e.g., "auth.v2", "S2") */
  version?: string;
  /** Year */
  year?: number;
  /** Custom segments — overrides default HM · {version} · {year} */
  segments?: string[];
}

export function BrandSignature({
  version = "S2",
  year = new Date().getFullYear(),
  segments,
}: BrandSignatureProps) {
  const parts = segments ?? ["HM", version, String(year)].filter(Boolean);

  return (
    <span className={s.sig}>
      {parts.join(" · ")}
    </span>
  );
}
