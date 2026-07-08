import React from "react";
import { DataLabel } from "./DataLabel.jsx";
import { StatBlock } from "./StatBlock.jsx";

/**
 * E1 — Glass-Data-Overlay, the signature element. Frosted panel over
 * object photography carrying the data layer. Two tonalities:
 * "editorial" (one big number hierarchy) and "dashboard" (stacked cells).
 */
export function DataOverlay({
  variant = "editorial",
  tone = "dark",
  label,
  metric,
  rows = [],
  cells = [],
  animate = false,
  style,
  children,
}) {
  const dark = tone === "dark";
  const hairline = dark ? "var(--hairline-light)" : "var(--hairline-dark)";
  const muted = dark ? "var(--text-inverse-muted)" : "var(--text-muted)";

  return (
    <div
      className="u-grain"
      style={{
        background: dark ? "var(--glass-dark)" : "var(--glass-light)",
        WebkitBackdropFilter: "blur(var(--blur-panel))",
        backdropFilter: "blur(var(--blur-panel))",
        borderRadius: "var(--r-panel)",
        boxShadow: `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-light-strong)"}, var(--shadow-float)`,
        color: dark ? "var(--text-inverse)" : "var(--ink-2)",
        padding: variant === "editorial" ? "var(--sp-6)" : "var(--sp-4)",
        ...style,
      }}
    >
      {label && (
        <div style={{ marginBottom: variant === "editorial" ? 20 : 12 }}>
          <DataLabel tone={tone} marker>
            {label}
          </DataLabel>
        </div>
      )}

      {variant === "editorial" && metric && (
        <StatBlock
          value={metric.value}
          unit={metric.unit}
          label={metric.label}
          delta={metric.delta}
          tone={tone}
          size="clamp(56px, 6vw, 96px)"
          animate={animate}
        />
      )}

      {variant === "dashboard" && cells.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          {cells.map((c) => (
            <div
              key={c.label}
              style={{
                borderRadius: "var(--r-inner)",
                boxShadow: `inset 0 0 0 1px ${hairline}`,
                padding: "14px 16px",
              }}
            >
              <StatBlock
                value={c.value}
                unit={c.unit}
                label={c.label}
                delta={c.delta}
                tone={tone}
                size="28px"
                animate={animate}
              />
            </div>
          ))}
        </div>
      )}

      {rows.length > 0 && (
        <div style={{ marginTop: 18 }}>
          {rows.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 24,
                padding: "10px 0",
                borderTop: i === 0 && variant === "dashboard" ? "none" : `1px solid ${hairline}`,
              }}
            >
              <span className="u-label" style={{ color: muted }}>{row.label}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--size-data)",
                  color: row.highlight ? "var(--signal)" : "inherit",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
