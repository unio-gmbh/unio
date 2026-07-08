import React from "react";

/** Text input: mono label above, hairline field, signal underline on focus. */
export function Input({
  label,
  tone = "light",
  glass = false,
  type = "text",
  style,
  fieldStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const dark = tone === "dark";
  return (
    <label style={{ display: "block", ...style }}>
      {label && (
        <span
          className="u-label"
          style={{
            display: "block",
            marginBottom: 8,
            color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)",
          }}
        >
          {label}
        </span>
      )}
      <input
        type={type}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%",
          fontFamily: "var(--font-display)",
          fontSize: 16,
          padding: "13px 16px",
          borderRadius: "var(--r-inner)",
          border: "none",
          outline: "none",
          background: glass
            ? dark ? "var(--glass-dark)" : "var(--glass-light)"
            : "var(--surface-raised)",
          WebkitBackdropFilter: glass ? "blur(var(--blur-card))" : "none",
          backdropFilter: glass ? "blur(var(--blur-card))" : "none",
          color: dark ? "var(--text-inverse)" : "var(--ink-2)",
          boxShadow: focus
            ? `inset 0 0 0 1px ${dark ? "var(--hairline-light-strong)" : "var(--ink)"}, inset 0 -2px 0 0 var(--signal)`
            : `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-dark)"}`,
          transition: "box-shadow var(--dur-fast) var(--ease-unio)",
          ...fieldStyle,
        }}
        {...rest}
      />
    </label>
  );
}
