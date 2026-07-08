/** Select field matching Input, with a mono ▾ affordance. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  tone?: "dark" | "light";
  glass?: boolean;
  /** Strings or {value,label} pairs. */
  options?: (string | { value: string; label: string })[];
  style?: React.CSSProperties;
  fieldStyle?: React.CSSProperties;
}
