import React from "react";

/** Mono uppercase tag with hairline ring — the smallest data-layer chip. */
export function Tag({ tone = "dark", signal = false, style, children }) {
  const dark = tone === "dark";
  return (
    <span
      className="u-label"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 11,
        padding: "5px 11px",
        borderRadius: "var(--r-pill)",
        boxShadow: `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-dark)"}`,
        color: signal
          ? "var(--signal)"
          : dark ? "var(--text-inverse-muted)" : "var(--text-muted)",
        ...style,
      }}
    >
      {signal && (
        <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--signal)" }}></span>
      )}
      {children}
    </span>
  );
}
