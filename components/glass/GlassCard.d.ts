/**
 * E2 — the UNIO glass card (object cards, feature cards, case cards).
 * Double-rim: outer shell + inner core with concentric radii.
 * @startingPoint section="Glas-Primitive" subtitle="Objektkarte mit Doppelrand" viewport="700x520"
 */
export interface GlassCardProps {
  /** Tint direction. Default "dark". */
  tone?: "dark" | "light";
  /** Opaque "old market" variant (before/after storytelling). Default false. */
  solid?: boolean;
  /** Image URL for the inner media block. */
  media?: string;
  mediaAlt?: string;
  /** Media height in px. Default 200. */
  mediaHeight?: number;
  /** Mono label above the title (never an eyebrow pill). */
  label?: string;
  title?: React.ReactNode;
  /** Milieu/location/feature tags as translucent pills. */
  tags?: string[];
  /** Key-value data rows with hairline separators. */
  data?: { label: string; value: string }[];
  /** Price, bottom-left. */
  price?: string;
  /** CTA pill label, bottom-right. */
  cta?: string;
  onCta?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
