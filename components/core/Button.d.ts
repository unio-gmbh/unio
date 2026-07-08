/**
 * The UNIO button: pill geometry, five variants, optional round knob circle.
 * @startingPoint section="Core UI" subtitle="Pill-Buttons mit Knob-Kreis: paper / solid / signal / glass" viewport="700x240"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** paper = cream pill + ink knob (reference look); solid = ink; signal = accent (sparingly!); glass = over imagery; ghost = hairline. Default "solid". */
  variant?: "paper" | "solid" | "signal" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Glass tint direction when variant="glass". Default "dark". */
  tone?: "dark" | "light";
  /** Leading mono glyph, e.g. "▷". */
  glyph?: string;
  /** Trailing round contrast circle with mono glyph; true = "→", or pass "›" etc. */
  knob?: boolean | string;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
