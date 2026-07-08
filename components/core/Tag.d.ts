/** Smallest data-layer element: mono uppercase tag with hairline ring. */
export interface TagProps {
  tone?: "dark" | "light";
  /** Signal color + marker dot for active/highlight states. */
  signal?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
