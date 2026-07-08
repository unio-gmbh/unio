import React from "react";

/**
 * E4 — Riffelglas / fluted distortion, the symbol of the opaque old market.
 * Vertical glass flutes shred the image into strips; `reveal` clears part
 * of the image (0 = fully fluted, 1 = fully clear). Drive it from scroll
 * for the A1 "Klarheits-Scroll".
 */
export function FlutedGlass({
  reveal = 0,
  side = "right",
  fluteWidth = 14,
  strength = 12,
  radius = 0,
  style,
  children,
}) {
  const strips = 120;
  const clearPct = Math.min(1, Math.max(0, reveal)) * 100;
  const clip =
    side === "right"
      ? `inset(0 ${clearPct}% 0 0)`
      : `inset(0 0 0 ${clearPct}%)`;
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: radius, ...style }}>
      {children}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          clipPath: clip,
          WebkitClipPath: clip,
          transition: "clip-path var(--dur-slow) var(--ease-unio)",
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: strips }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: "none",
              width: fluteWidth,
              WebkitBackdropFilter: `blur(${i % 2 ? strength : Math.max(2, strength / 3)}px) saturate(1.05)`,
              backdropFilter: `blur(${i % 2 ? strength : Math.max(2, strength / 3)}px) saturate(1.05)`,
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.02) 2px, rgba(10,9,8,0.10) 55%, rgba(255,255,255,0.05) 100%)",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
