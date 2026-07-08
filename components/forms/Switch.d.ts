/** Pill switch; on = ink track with signal knob. Controlled. */
export interface SwitchProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  tone?: "dark" | "light";
  style?: React.CSSProperties;
}
