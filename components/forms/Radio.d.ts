/** Radio with hairline circle and signal dot when selected. Controlled. */
export interface RadioProps {
  label?: React.ReactNode;
  checked?: boolean;
  onSelect?: () => void;
  /** HTML radio group name. */
  name?: string;
  tone?: "dark" | "light";
  style?: React.CSSProperties;
}
