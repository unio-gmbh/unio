/**
 * E1 — the signature glass data overlay over object photography.
 * "editorial": one big number hierarchy. "dashboard": grid of stat cells.
 * @startingPoint section="Glas-Primitive" subtitle="Daten-Panel über Objektfoto" viewport="700x520"
 */
export interface DataOverlayProps {
  variant?: "editorial" | "dashboard";
  tone?: "dark" | "light";
  /** Mono header label with signal marker. */
  label?: string;
  /** Editorial hero metric. */
  metric?: { value: number | string; unit?: string; label?: string; delta?: string };
  /** Dashboard stat cells (2-col grid). */
  cells?: { value: number | string; unit?: string; label: string; delta?: string }[];
  /** Key-value rows with hairline separators (both variants). */
  rows?: { label: string; value: string; highlight?: boolean }[];
  /** Blur-to-data entry animation. Default false. */
  animate?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
