import React from "react";
import { GlassPanel } from "./GlassPanel.jsx";
import { DataLabel } from "./DataLabel.jsx";

/**
 * E2 — Die Glaskarte. Double-rim architecture: outer shell + inner core
 * with concentric radii. `solid` renders the opaque "old market" variant
 * for before/after storytelling (B8).
 */
export function GlassCard({
  tone = "dark",
  solid = false,
  media,
  mediaAlt = "",
  mediaHeight = 200,
  title,
  label,
  price,
  tags = [],
  data = [],
  cta,
  onCta,
  style,
  children,
}) {
  const dark = tone === "dark" && !solid;
  const shellPad = 8;
  const inner = `calc(var(--r-card) - ${shellPad}px)`;
  const hairline = solid
    ? "inset 0 0 0 1px var(--hairline-dark)"
    : `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-light-strong)"}`;
  const textMuted = dark ? "var(--text-inverse-muted)" : "var(--text-muted)";

  const shell = {
    position: "relative",
    borderRadius: "var(--r-card)",
    padding: shellPad,
    background: solid
      ? "var(--surface-raised)"
      : dark
        ? "var(--glass-dark)"
        : "var(--glass-light)",
    WebkitBackdropFilter: solid ? "none" : "blur(var(--blur-card))",
    backdropFilter: solid ? "none" : "blur(var(--blur-card))",
    boxShadow: `${hairline}, var(--shadow-float)`,
    color: dark ? "var(--text-inverse)" : "var(--ink-2)",
    ...style,
  };

  return (
    <div style={shell}>
      {media && (
        <div style={{ borderRadius: inner, overflow: "hidden", marginBottom: shellPad }}>
          <img
            src={media}
            alt={mediaAlt}
            style={{ display: "block", width: "100%", height: mediaHeight, objectFit: "cover" }}
          />
        </div>
      )}
      <div style={{ padding: "var(--sp-4)" }}>
        {label && <DataLabel tone={dark ? "dark" : "light"}>{label}</DataLabel>}
        {title && (
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 24,
              letterSpacing: "var(--track-display)",
              lineHeight: 1.1,
              margin: "6px 0 0",
            }}
          >
            {title}
          </div>
        )}
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
            {tags.map((t) => (
              <span
                key={t}
                className="u-label"
                style={{
                  padding: "5px 10px",
                  borderRadius: "var(--r-pill)",
                  boxShadow: hairline,
                  fontSize: 11,
                  color: textMuted,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {data.length > 0 && (
          <div style={{ marginTop: 16 }}>
            {data.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "9px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${dark ? "var(--hairline-light)" : "var(--hairline-dark)"}`,
                }}
              >
                <span className="u-label" style={{ color: textMuted }}>{row.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--size-data)" }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        )}
        {children}
        {(price || cta) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 18,
              gap: 12,
            }}
          >
            {price && (
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 22,
                  letterSpacing: "var(--track-display)",
                }}
              >
                {price}
              </span>
            )}
            {cta && (
              <button
                onClick={onCta}
                style={{
                  font: "500 15px/1 var(--font-display)",
                  padding: "5px 5px 5px 20px",
                  borderRadius: "var(--r-pill)",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: dark ? "var(--paper)" : "var(--ink)",
                  color: dark ? "var(--ink)" : "var(--paper)",
                }}
              >
                <span>{cta}</span>
                <span
                  aria-hidden="true"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    background: dark ? "var(--ink)" : "var(--paper)",
                    color: dark ? "var(--paper)" : "var(--ink)",
                  }}
                >
                  →
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
