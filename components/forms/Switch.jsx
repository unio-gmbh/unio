import React from "react";

/** Switch: pill track, paper knob; ink track when on, signal marker dot. */
export function Switch({ label, checked, onChange, tone = "light", style }) {
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
        role="switch"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span
        aria-hidden="true"
        style={{
          width: 46,
          height: 26,
          borderRadius: "var(--r-pill)",
          flex: "none",
          position: "relative",
          background: checked
            ? dark ? "var(--paper)" : "var(--ink)"
            : "transparent",
          boxShadow: checked
            ? "none"
            : `inset 0 0 0 1px ${dark ? "var(--hairline-light-strong)" : "var(--hairline-dark)"}`,
          transition: "all var(--dur-fast) var(--ease-unio)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 4,
            left: checked ? 24 : 4,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: checked
              ? "var(--signal)"
              : dark ? "var(--text-inverse-muted)" : "rgba(28,26,22,0.4)",
            transition: "all var(--dur-fast) var(--ease-unio)",
          }}
        ></span>
      </span>
      {label}
    </label>
  );
}
