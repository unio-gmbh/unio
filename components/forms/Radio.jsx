import React from "react";

/** Radio: hairline circle, signal dot when selected. */
export function Radio({ label, checked, onSelect, name, tone = "light", style }) {
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
        type="radio"
        name={name}
        checked={checked}
        onChange={() => onSelect && onSelect()}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span
        aria-hidden="true"
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          flex: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `inset 0 0 0 1px ${
            checked
              ? "var(--ink)"
              : dark ? "var(--hairline-light-strong)" : "var(--hairline-dark)"
          }`,
          transition: "box-shadow var(--dur-fast) var(--ease-unio)",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "var(--signal)",
            transform: checked ? "scale(1)" : "scale(0)",
            transition: "transform var(--dur-fast) var(--ease-unio)",
          }}
        ></span>
      </span>
      {label}
    </label>
  );
}
