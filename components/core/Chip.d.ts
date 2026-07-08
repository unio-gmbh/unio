/** Translucent pill chip for filters, milieu codes, amenities. Selected = inverted with signal dot. */
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  tone?: "dark" | "light";
  onToggle?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
