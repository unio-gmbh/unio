import React from "react";

const SIZES = {
  sm: { pad: "9px 18px", padL: 18, font: 14, knob: 26 },
  md: { pad: "13px 26px", padL: 24, font: 15, knob: 34 },
  lg: { pad: "17px 34px", padL: 30, font: 17, knob: 44 },
};

/**
 * UNIO button — pill geometry (E5/E6 CTA language).
 * Variants: paper (cream pill + ink knob, the C.Lab reference look),
 * solid (ink), signal (accent, sparingly), glass (over imagery), ghost (hairline).
 * `knob` appends a round contrast circle with a mono glyph (→ ›),
 * `glyph` prepends a mono glyph (▷).
 */
export function Button({
  variant = "solid",
  size = "md",
  tone = "dark",
  disabled = false,
  glyph,
  knob,
  reveal = true,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const dark = tone === "dark";
  const rm = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doReveal = !!knob && reveal && !rm;
  const rootRef = React.useRef(null);
  const textRef = React.useRef(null);
  const [shown, setShown] = React.useState(!doReveal);
  const [tw, setTw] = React.useState(0);
  React.useEffect(() => {
    if (!doReveal) return;
    if (textRef.current) setTw(textRef.current.offsetWidth);
    const el = rootRef.current;
    const r = el && el.getBoundingClientRect();
    if (r && r.top < innerHeight && r.bottom > 0) {
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return;
    }
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.5 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [doReveal]);

  const variants = {
    paper: {
      background: hover ? "#FFFFFF" : "var(--surface-raised)",
      color: "var(--ink)",
      boxShadow: "var(--shadow-float)",
    },
    solid: {
      background: hover ? "var(--ink-2)" : "var(--ink)",
      color: "var(--paper)",
      boxShadow: "none",
    },
    signal: {
      background: hover ? "var(--signal-press)" : "var(--signal)",
      color: "var(--on-signal)",
      boxShadow: "none",
    },
    glass: {
      background: dark
        ? hover ? "var(--glass-dark-2)" : "var(--glass-dark)"
        : hover ? "var(--glass-light-2)" : "var(--glass-light)",
      color: dark ? "var(--text-inverse)" : "var(--ink)",
      WebkitBackdropFilter: "blur(var(--blur-card))",
      backdropFilter: "blur(var(--blur-card))",
      boxShadow: `inset 0 0 0 1px ${hover ? "var(--hairline-light-strong)" : "var(--hairline-light)"}`,
    },
    ghost: {
      background: hover ? "rgba(12,11,9,0.05)" : "transparent",
      color: "var(--ink)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
    },
  };

  const knobColors = {
    paper: { bg: "var(--ink)", fg: "var(--paper)" },
    solid: { bg: "var(--paper)", fg: "var(--ink)" },
    signal: { bg: "var(--ink)", fg: "var(--signal)" },
    glass: dark
      ? { bg: "var(--paper)", fg: "var(--ink)" }
      : { bg: "var(--ink)", fg: "var(--paper)" },
    ghost: { bg: "var(--ink)", fg: "var(--paper)" },
  }[variant] || { bg: "var(--paper)", fg: "var(--ink)" };

  return (
    <button
      ref={rootRef}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: s.font,
        lineHeight: 1,
        padding: knob ? `5px 5px 5px ${s.padL}px` : s.pad,
        borderRadius: "var(--r-pill)",
        border: "none",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.4 : 1,
        display: "inline-flex",
        alignItems: "center",
        gap: knob ? 12 : 10,
        transform: press ? "scale(0.985)" : "scale(1)",
        transition: "all var(--dur-fast) var(--ease-unio)",
        ...variants[variant] || variants.solid,
        ...style,
      }}
      {...rest}
    >
      {glyph && (
        <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8em" }}>{glyph}</span>
      )}
      <span ref={textRef} style={doReveal ? { display: "inline-block", clipPath: shown ? "inset(0 0 0 0)" : "inset(0 100% 0 0)", opacity: shown ? 1 : 0, transition: "clip-path 700ms var(--ease-unio) 120ms, opacity 400ms var(--ease-unio) 120ms" } : undefined}>{children}</span>
      {knob && (
        <span
          aria-hidden="true"
          style={{
            width: s.knob,
            height: s.knob,
            borderRadius: "50%",
            flex: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            fontSize: Math.round(s.knob * 0.42),
            background: knobColors.bg,
            color: knobColors.fg,
            transform: doReveal && !shown ? `translateX(${-(tw + 12)}px)` : hover ? "translateX(2px)" : "none",
            transition: doReveal ? "transform 700ms var(--ease-unio)" : "transform var(--dur-fast) var(--ease-unio)",
          }}
        >
          {knob === true ? "→" : knob}
        </span>
      )}
    </button>
  );
}
