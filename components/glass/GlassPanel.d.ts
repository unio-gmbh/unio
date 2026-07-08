/**
 * Frosted glass panel — the base layer of every UNIO glass element.
 * Must sit over real photography (never over empty gradients).
 * @startingPoint section="Glas-Primitive" subtitle="Frosted Panel über Objektfoto" viewport="700x420"
 */
export interface GlassPanelProps {
  /** Tint direction; pick by image brightness. Default "dark". */
  tone?: "dark" | "light";
  /** backdrop-filter blur; number (px) or CSS length. Default var(--blur-panel) = 28px. */
  blur?: number | string;
  /** Corner radius. Default var(--r-panel). */
  radius?: string;
  /** 1px white hairline ring. Default true. */
  hairline?: boolean;
  /** Film-grain overlay at 3% opacity. Default true. */
  grain?: boolean;
  /** Soft floating shadow. Default false. */
  shadow?: boolean;
  /** CSS padding. Default var(--sp-5). */
  padding?: string;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}
