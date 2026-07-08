import React from "react";

/** Base frosted panel — only ever place it over real photography. */
export function GlassPanel({
  tone = "dark",
  blur,
  radius = "var(--r-panel)",
  hairline = true,
  grain = true,
  shadow = false,
  padding = "var(--sp-5)",
  style,
  className,
  children,
  ...rest
}) {
  const dark = tone === "dark";
  const blurVal =
    typeof blur === "number" ? blur + "px" : blur || "var(--blur-panel)";
  return (
    <div
      className={className}
      style={{
        position: "relative",
        background: dark ? "var(--glass-dark)" : "var(--glass-light)",
        WebkitBackdropFilter: `blur(${blurVal})`,
        backdropFilter: `blur(${blurVal})`,
        borderRadius: radius,
        boxShadow: [
          hairline
            ? `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-light-strong)"}`
            : null,
          shadow ? "var(--shadow-float)" : null,
        ]
          .filter(Boolean)
          .join(", ") || "none",
        color: dark ? "var(--text-inverse)" : "var(--ink-2)",
        padding,
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {children}
      {grain && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "var(--grain)",
            opacity: "var(--grain-opacity)",
            pointerEvents: "none",
          }}
        ></div>
      )}
    </div>
  );
}
