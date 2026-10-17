/** Pattern: data/products/hireminds/design/system/patterns/brand-signature.md */
import s from "./BrandSignature.module.css";

export interface BrandSignatureProps {
  /** Additional segment after HM (e.g., "auth.v2", "S2") */
  version?: string | undefined;
  /** Year */
  year?: number | undefined;
  /** Custom segments — overrides default HM · {version} · {year} */
  segments?: string[] | undefined;
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
