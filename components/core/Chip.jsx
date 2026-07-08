import React from "react";

/** Translucent pill chip (filters, milieu codes, amenities). Selectable. */
export function Chip({
  selected = false,
  tone = "dark",
  onToggle,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === "dark";
  const base = dark
    ? hover ? "var(--glass-dark-2)" : "var(--glass-dark)"
    : hover ? "var(--glass-light-2)" : "var(--glass-light)";
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-pressed={selected}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 1,
        padding: "9px 16px",
        borderRadius: "var(--r-pill)",
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: selected ? (dark ? "var(--paper)" : "var(--ink)") : base,
        color: selected
          ? dark ? "var(--ink)" : "var(--paper)"
          : dark ? "var(--text-inverse)" : "var(--ink-2)",
        WebkitBackdropFilter: selected ? "none" : "blur(var(--blur-card))",
        backdropFilter: selected ? "none" : "blur(var(--blur-card))",
        boxShadow: selected
          ? "none"
          : `inset 0 0 0 1px ${hover ? "var(--hairline-light-strong)" : "var(--hairline-light)"}`,
        transition: "all var(--dur-fast) var(--ease-unio)",
        ...style,
      }}
      {...rest}
    >
      {selected && (
        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>
      )}
      {children}
    </button>
  );
}
