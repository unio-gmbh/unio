import React from "react";

/** Mono uppercase label with optional signal marker dot. The UNIO "icon". */
export function DataLabel({ tone = "dark", marker = false, style, children }) {
  return (
    <span
      className="u-label"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: tone === "dark" ? "var(--text-inverse-muted)" : "var(--text-muted)",
        ...style,
      }}
    >
      {marker && (
        <span
          aria-hidden="true"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--signal)",
            flex: "none",
          }}
        ></span>
      )}
      {children}
    </span>
  );
}
