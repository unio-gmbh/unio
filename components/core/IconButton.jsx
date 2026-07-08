import React from "react";

/** Round glass icon button carrying a mono glyph (→ ↗ × +) instead of an icon set. */
export function IconButton({
  glyph = "→",
  label,
  tone = "dark",
  size = 44,
  variant = "glass",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const dark = tone === "dark";
  const bg =
    variant === "solid"
      ? hover ? "var(--ink-2)" : "var(--ink)"
      : dark
        ? hover ? "var(--glass-dark-2)" : "var(--glass-dark)"
        : hover ? "var(--glass-light-2)" : "var(--glass-light)";
  return (
    <button
      aria-label={label || glyph}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: size * 0.4,
        background: bg,
        color: variant === "solid" ? "var(--paper)" : dark ? "var(--text-inverse)" : "var(--ink)",
        WebkitBackdropFilter: variant === "glass" ? "blur(var(--blur-card))" : "none",
        backdropFilter: variant === "glass" ? "blur(var(--blur-card))" : "none",
        boxShadow:
          variant === "glass"
            ? `inset 0 0 0 1px ${hover ? "var(--hairline-light-strong)" : "var(--hairline-light)"}`
            : "none",
        transform: press ? "scale(0.985)" : "scale(1)",
        transition: "all var(--dur-fast) var(--ease-unio)",
        ...style,
      }}
      {...rest}
    >
      {glyph}
    </button>
  );
}
