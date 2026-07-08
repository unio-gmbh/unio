/**
 * B2 — "Blur to Data" metric: sharpens on viewport entry, counts up, label fades in under it.
 * @startingPoint section="Glas-Primitive" subtitle="Kennzahl mit Blur-to-Data-Motion" viewport="700x260"
 */
export interface StatBlockProps {
  /** Number (animates + de-AT formatting) or preformatted string (static). */
  value: number | string;
  /** Unit suffix at 45% size, e.g. "%", "€/m²". */
  unit?: string;
  /** Mono label rendered UNDER the number. */
  label?: string;
  /** Small signal-colored delta, e.g. "+12 %". */
  delta?: string;
  tone?: "dark" | "light";
  /** Font size of the number. Default var(--size-metric). */
  size?: string;
  /** Blur-to-sharp + counter on scroll into view. Default true. */
  animate?: boolean;
}
