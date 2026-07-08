/** Mono uppercase data label with optional signal marker dot — used instead of icons and eyebrows. */
export interface DataLabelProps {
  /** Contrast against dark or light ground. Default "dark". */
  tone?: "dark" | "light";
  /** 7px signal-orange dot before the text. Default false. */
  marker?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
