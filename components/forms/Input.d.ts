/** Text input with mono label above and signal underline on focus. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono uppercase label above the field. */
  label?: string;
  tone?: "dark" | "light";
  /** Translucent field for use over imagery. Default false. */
  glass?: boolean;
  style?: React.CSSProperties;
  fieldStyle?: React.CSSProperties;
}
