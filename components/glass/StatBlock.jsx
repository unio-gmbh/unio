import React from "react";
import { DataLabel } from "./DataLabel.jsx";

/**
 * B2 — "Blur to Data": big metric that sharpens on viewport entry,
 * counts up, then reveals its mono label underneath.
 */
export function StatBlock({
  value,
  unit = "",
  label,
  delta,
  tone = "dark",
  size = "var(--size-metric)",
  animate = true,
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(!animate);
  const [display, setDisplay] = React.useState(animate ? 0 : value);

  React.useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
          const target = typeof value === "number" ? value : parseFloat(value) || 0;
          const t0 = performance.now();
          const dur = 1100;
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate, value]);

  const dark = tone === "dark";
  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "var(--track-display)",
          color: dark ? "var(--text-inverse)" : "var(--ink)",
          filter: shown ? "blur(0)" : "blur(24px)",
          opacity: shown ? 1 : 0.3,
          transition: `filter var(--dur-slow) var(--ease-unio), opacity var(--dur-slow) var(--ease-unio)`,
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
        }}
      >
        {typeof value === "number" ? display.toLocaleString("de-AT") : value}
        {unit && (
          <span style={{ fontSize: "0.45em", fontWeight: 400, marginLeft: 4 }}>{unit}</span>
        )}
        {delta && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--signal-deep)",
              marginLeft: 10,
              letterSpacing: 0,
            }}
          >
            {delta}
          </span>
        )}
      </div>
      {label && (
        <div
          style={{
            marginTop: 10,
            opacity: shown ? 1 : 0,
            transition: "opacity var(--dur-base) var(--ease-unio) 500ms",
          }}
        >
          <DataLabel tone={tone}>{label}</DataLabel>
        </div>
      )}
    </div>
  );
}
