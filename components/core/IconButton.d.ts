/** Round glass/solid icon button carrying a mono glyph (→ ↗ × +) — UNIO uses no icon libraries. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Mono glyph, e.g. "→", "↗", "×", "+". Default "→". */
  glyph?: string;
  /** Accessible label. */
  label?: string;
  tone?: "dark" | "light";
  /** Diameter in px. Default 44 (minimum hit target). */
  size?: number;
  variant?: "glass" | "solid";
  style?: React.CSSProperties;
}
