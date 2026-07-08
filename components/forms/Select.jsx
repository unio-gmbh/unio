import React from "react";

/** Select styled like Input; mono ▾ affordance, no icon set. */
export function Select({
  label,
  tone = "light",
  glass = false,
  options = [],
  style,
  fieldStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const dark = tone === "dark";
  return (
    <label style={{ display: "block", position: "relative", ...style }}>
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
      <span style={{ position: "relative", display: "block" }}>
        <select
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%",
            appearance: "none",
            WebkitAppearance: "none",
            fontFamily: "var(--font-display)",
            fontSize: 16,
            padding: "13px 40px 13px 16px",
            borderRadius: "var(--r-inner)",
            border: "none",
            outline: "none",
            cursor: "pointer",
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
        >
          {options.map((o) =>
            typeof o === "string" ? (
              <option key={o} value={o}>{o}</option>
            ) : (
              <option key={o.value} value={o.value}>{o.label}</option>
            )
          )}
        </select>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)",
            pointerEvents: "none",
          }}
        >
          ▾
        </span>
      </span>
    </label>
  );
}
