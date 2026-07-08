/** Checkbox with hairline box and mono ✓. Controlled. */
export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  tone?: "dark" | "light";
  style?: React.CSSProperties;
}
