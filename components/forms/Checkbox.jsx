import React from "react";

/** Checkbox: square hairline box, ink fill + mono ✓ when checked. */
export function Checkbox({ label, checked, onChange, tone = "light", style }) {
  const dark = tone === "dark";
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        fontFamily: "var(--font-display)",
        fontSize: 16,
        color: dark ? "var(--text-inverse)" : "var(--ink-2)",
        ...style,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span
        aria-hidden="true"
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          flex: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: checked ? (dark ? "var(--paper)" : "var(--ink)") : "transparent",
          boxShadow: checked
            ? "none"
            : `inset 0 0 0 1px ${dark ? "var(--hairline-light-strong)" : "var(--hairline-dark)"}`,
          color: checked ? (dark ? "var(--ink)" : "var(--paper)") : "transparent",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          transition: "all var(--dur-fast) var(--ease-unio)",
        }}
      >
        ✓
      </span>
      {label}
    </label>
  );
}
