/* @ds-bundle: {"format":4,"namespace":"UNIODesignSystem_b6216a","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"DataLabel","sourcePath":"components/glass/DataLabel.jsx"},{"name":"DataOverlay","sourcePath":"components/glass/DataOverlay.jsx"},{"name":"FlutedGlass","sourcePath":"components/glass/FlutedGlass.jsx"},{"name":"GlassCard","sourcePath":"components/glass/GlassCard.jsx"},{"name":"GlassPanel","sourcePath":"components/glass/GlassPanel.jsx"},{"name":"StatBlock","sourcePath":"components/glass/StatBlock.jsx"}],"sourceHashes":{"components/core/Button.jsx":"ba1a0eca31ab","components/core/Chip.jsx":"0e6393520533","components/core/IconButton.jsx":"37fcc42d44e6","components/core/Tag.jsx":"b222b94e9a7f","components/forms/Checkbox.jsx":"fcca8bebd7a2","components/forms/Input.jsx":"82bce3dab659","components/forms/Radio.jsx":"6516e4ca7027","components/forms/Select.jsx":"02529d9eaf4f","components/forms/Switch.jsx":"083d5ef07b4c","components/glass/DataLabel.jsx":"4f74d03c1f82","components/glass/DataOverlay.jsx":"1c8450e208d8","components/glass/FlutedGlass.jsx":"795117fb1883","components/glass/GlassCard.jsx":"507087d419c5","components/glass/GlassPanel.jsx":"1a5bc38daacb","components/glass/StatBlock.jsx":"e989d3275a9f","ui_kits/homepage/bento.jsx":"cbea939becc4","ui_kits/homepage/bt-system.jsx":"6b5779f61893","ui_kits/homepage/homepage.jsx":"c4285545f108","ui_kits/homepage/page-bautraeger.jsx":"9753bbd4e801","ui_kits/homepage/page-immobilien.jsx":"176c8f9fb219","ui_kits/homepage/page-kontakt.jsx":"64fed6812978","ui_kits/homepage/page-makler.jsx":"3ede756851e0","ui_kits/homepage/page-story.jsx":"807d5b67f27c","ui_kits/homepage/site-shared.jsx":"288b199ecf14","ui_kits/homepage/strecke.jsx":"e39daf046114","ui_kits/property/property.jsx":"4997d4019831","ui_kits/social/social.jsx":"d13506e16352","uploads/Unio Homepage/_src/core.jsx":"2e4e914557fb","uploads/Unio Homepage/_src/lens.jsx":"7ea33a713d4f","uploads/Unio Homepage/_src/makler_platform.jsx":"4254b9e02484","uploads/Unio Homepage/_src/page-bautraeger.jsx":"0e7231f11d14","uploads/Unio Homepage/_src/page-home.jsx":"60ded5a7fa92","uploads/Unio Homepage/_src/page-immobilien.jsx":"15712b85bc94","uploads/Unio Homepage/_src/page-kontakt.jsx":"6ccbb97d490b","uploads/Unio Homepage/_src/page-makler.jsx":"1e0d12964d2b","uploads/Unio Homepage/_src/page-story.jsx":"25cb5ef81ae1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.UNIODesignSystem_b6216a = window.UNIODesignSystem_b6216a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    pad: "9px 18px",
    padL: 18,
    font: 14,
    knob: 26
  },
  md: {
    pad: "13px 26px",
    padL: 24,
    font: 15,
    knob: 34
  },
  lg: {
    pad: "17px 34px",
    padL: 30,
    font: 17,
    knob: 44
  }
};

/**
 * UNIO button — pill geometry (E5/E6 CTA language).
 * Variants: paper (cream pill + ink knob, the C.Lab reference look),
 * solid (ink), signal (accent, sparingly), glass (over imagery), ghost (hairline).
 * `knob` appends a round contrast circle with a mono glyph (→ ›),
 * `glyph` prepends a mono glyph (▷).
 */
function Button({
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
    const io = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, {
      threshold: 0.5
    });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [doReveal]);
  const variants = {
    paper: {
      background: hover ? "#FFFFFF" : "var(--surface-raised)",
      color: "var(--ink)",
      boxShadow: "var(--shadow-float)"
    },
    solid: {
      background: hover ? "var(--ink-2)" : "var(--ink)",
      color: "var(--paper)",
      boxShadow: "none"
    },
    signal: {
      background: hover ? "var(--signal-press)" : "var(--signal)",
      color: "var(--on-signal)",
      boxShadow: "none"
    },
    glass: {
      background: dark ? hover ? "var(--glass-dark-2)" : "var(--glass-dark)" : hover ? "var(--glass-light-2)" : "var(--glass-light)",
      color: dark ? "var(--text-inverse)" : "var(--ink)",
      WebkitBackdropFilter: "blur(var(--blur-card))",
      backdropFilter: "blur(var(--blur-card))",
      boxShadow: `inset 0 0 0 1px ${hover ? "var(--hairline-light-strong)" : "var(--hairline-light)"}`
    },
    ghost: {
      background: hover ? "rgba(12,11,9,0.05)" : "transparent",
      color: "var(--ink)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)"
    }
  };
  const knobColors = {
    paper: {
      bg: "var(--ink)",
      fg: "var(--paper)"
    },
    solid: {
      bg: "var(--paper)",
      fg: "var(--ink)"
    },
    signal: {
      bg: "var(--ink)",
      fg: "var(--signal)"
    },
    glass: dark ? {
      bg: "var(--paper)",
      fg: "var(--ink)"
    } : {
      bg: "var(--ink)",
      fg: "var(--paper)"
    },
    ghost: {
      bg: "var(--ink)",
      fg: "var(--paper)"
    }
  }[variant] || {
    bg: "var(--paper)",
    fg: "var(--ink)"
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    ref: rootRef,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
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
      ...(variants[variant] || variants.solid),
      ...style
    }
  }, rest), glyph && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.8em"
    }
  }, glyph), /*#__PURE__*/React.createElement("span", {
    ref: textRef,
    style: doReveal ? {
      display: "inline-block",
      clipPath: shown ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
      opacity: shown ? 1 : 0,
      transition: "clip-path 700ms var(--ease-unio) 120ms, opacity 400ms var(--ease-unio) 120ms"
    } : undefined
  }, children), knob && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
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
      transition: doReveal ? "transform 700ms var(--ease-unio)" : "transform var(--dur-fast) var(--ease-unio)"
    }
  }, knob === true ? "→" : knob));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Translucent pill chip (filters, milieu codes, amenities). Selectable. */
function Chip({
  selected = false,
  tone = "dark",
  onToggle,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === "dark";
  const base = dark ? hover ? "var(--glass-dark-2)" : "var(--glass-dark)" : hover ? "var(--glass-light-2)" : "var(--glass-light)";
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onToggle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-pressed": selected,
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1,
      padding: "9px 16px",
      borderRadius: "var(--r-pill)",
      border: "none",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: selected ? dark ? "var(--paper)" : "var(--ink)" : base,
      color: selected ? dark ? "var(--ink)" : "var(--paper)" : dark ? "var(--text-inverse)" : "var(--ink-2)",
      WebkitBackdropFilter: selected ? "none" : "blur(var(--blur-card))",
      backdropFilter: selected ? "none" : "blur(var(--blur-card))",
      boxShadow: selected ? "none" : `inset 0 0 0 1px ${hover ? "var(--hairline-light-strong)" : "var(--hairline-light)"}`,
      transition: "all var(--dur-fast) var(--ease-unio)",
      ...style
    }
  }, rest), selected && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--signal)"
    }
  }), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Round glass icon button carrying a mono glyph (→ ↗ × +) instead of an icon set. */
function IconButton({
  glyph = "→",
  label,
  tone = "dark",
  size = 44,
  variant = "glass",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const dark = tone === "dark";
  const bg = variant === "solid" ? hover ? "var(--ink-2)" : "var(--ink)" : dark ? hover ? "var(--glass-dark-2)" : "var(--glass-dark)" : hover ? "var(--glass-light-2)" : "var(--glass-light)";
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label || glyph,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontSize: size * 0.4,
      background: bg,
      color: variant === "solid" ? "var(--paper)" : dark ? "var(--text-inverse)" : "var(--ink)",
      WebkitBackdropFilter: variant === "glass" ? "blur(var(--blur-card))" : "none",
      backdropFilter: variant === "glass" ? "blur(var(--blur-card))" : "none",
      boxShadow: variant === "glass" ? `inset 0 0 0 1px ${hover ? "var(--hairline-light-strong)" : "var(--hairline-light)"}` : "none",
      transform: press ? "scale(0.985)" : "scale(1)",
      transition: "all var(--dur-fast) var(--ease-unio)",
      ...style
    }
  }, rest), glyph);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/** Mono uppercase tag with hairline ring — the smallest data-layer chip. */
function Tag({
  tone = "dark",
  signal = false,
  style,
  children
}) {
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontSize: 11,
      padding: "5px 11px",
      borderRadius: "var(--r-pill)",
      boxShadow: `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-dark)"}`,
      color: signal ? "var(--signal)" : dark ? "var(--text-inverse-muted)" : "var(--text-muted)",
      ...style
    }
  }, signal && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--signal)"
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Checkbox: square hairline box, ink fill + mono ✓ when checked. */
function Checkbox({
  label,
  checked,
  onChange,
  tone = "light",
  style
}) {
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontSize: 16,
      color: dark ? "var(--text-inverse)" : "var(--ink-2)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      borderRadius: 6,
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: checked ? dark ? "var(--paper)" : "var(--ink)" : "transparent",
      boxShadow: checked ? "none" : `inset 0 0 0 1px ${dark ? "var(--hairline-light-strong)" : "var(--hairline-dark)"}`,
      color: checked ? dark ? "var(--ink)" : "var(--paper)" : "transparent",
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      transition: "all var(--dur-fast) var(--ease-unio)"
    }
  }, "\u2713"), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input: mono label above, hairline field, signal underline on focus. */
function Input({
  label,
  tone = "light",
  glass = false,
  type = "text",
  style,
  fieldStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "block",
      marginBottom: 8,
      color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      fontFamily: "var(--font-display)",
      fontSize: 16,
      padding: "13px 16px",
      borderRadius: "var(--r-inner)",
      border: "none",
      outline: "none",
      background: glass ? dark ? "var(--glass-dark)" : "var(--glass-light)" : "var(--surface-raised)",
      WebkitBackdropFilter: glass ? "blur(var(--blur-card))" : "none",
      backdropFilter: glass ? "blur(var(--blur-card))" : "none",
      color: dark ? "var(--text-inverse)" : "var(--ink-2)",
      boxShadow: focus ? `inset 0 0 0 1px ${dark ? "var(--hairline-light-strong)" : "var(--ink)"}, inset 0 -2px 0 0 var(--signal)` : `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-dark)"}`,
      transition: "box-shadow var(--dur-fast) var(--ease-unio)",
      ...fieldStyle
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio: hairline circle, signal dot when selected. */
function Radio({
  label,
  checked,
  onSelect,
  name,
  tone = "light",
  style
}) {
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontSize: 16,
      color: dark ? "var(--text-inverse)" : "var(--ink-2)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    onChange: () => onSelect && onSelect(),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `inset 0 0 0 1px ${checked ? "var(--ink)" : dark ? "var(--hairline-light-strong)" : "var(--hairline-dark)"}`,
      transition: "box-shadow var(--dur-fast) var(--ease-unio)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "var(--signal)",
      transform: checked ? "scale(1)" : "scale(0)",
      transition: "transform var(--dur-fast) var(--ease-unio)"
    }
  })), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Select styled like Input; mono ▾ affordance, no icon set. */
function Select({
  label,
  tone = "light",
  glass = false,
  options = [],
  style,
  fieldStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      position: "relative",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "block",
      marginBottom: 8,
      color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      appearance: "none",
      WebkitAppearance: "none",
      fontFamily: "var(--font-display)",
      fontSize: 16,
      padding: "13px 40px 13px 16px",
      borderRadius: "var(--r-inner)",
      border: "none",
      outline: "none",
      cursor: "pointer",
      background: glass ? dark ? "var(--glass-dark)" : "var(--glass-light)" : "var(--surface-raised)",
      WebkitBackdropFilter: glass ? "blur(var(--blur-card))" : "none",
      backdropFilter: glass ? "blur(var(--blur-card))" : "none",
      color: dark ? "var(--text-inverse)" : "var(--ink-2)",
      boxShadow: focus ? `inset 0 0 0 1px ${dark ? "var(--hairline-light-strong)" : "var(--ink)"}, inset 0 -2px 0 0 var(--signal)` : `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-dark)"}`,
      transition: "box-shadow var(--dur-fast) var(--ease-unio)",
      ...fieldStyle
    }
  }, rest), options.map(o => typeof o === "string" ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 16,
      top: "50%",
      transform: "translateY(-50%)",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)",
      pointerEvents: "none"
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** Switch: pill track, paper knob; ink track when on, signal marker dot. */
function Switch({
  label,
  checked,
  onChange,
  tone = "light",
  style
}) {
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontSize: 16,
      color: dark ? "var(--text-inverse)" : "var(--ink-2)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 46,
      height: 26,
      borderRadius: "var(--r-pill)",
      flex: "none",
      position: "relative",
      background: checked ? dark ? "var(--paper)" : "var(--ink)" : "transparent",
      boxShadow: checked ? "none" : `inset 0 0 0 1px ${dark ? "var(--hairline-light-strong)" : "var(--hairline-dark)"}`,
      transition: "all var(--dur-fast) var(--ease-unio)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 4,
      left: checked ? 24 : 4,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: checked ? "var(--signal)" : dark ? "var(--text-inverse-muted)" : "rgba(28,26,22,0.4)",
      transition: "all var(--dur-fast) var(--ease-unio)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/glass/DataLabel.jsx
try { (() => {
/** Mono uppercase label with optional signal marker dot. The UNIO "icon". */
function DataLabel({
  tone = "dark",
  marker = false,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      color: tone === "dark" ? "var(--text-inverse-muted)" : "var(--text-muted)",
      ...style
    }
  }, marker && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--signal)",
      flex: "none"
    }
  }), children);
}
Object.assign(__ds_scope, { DataLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glass/DataLabel.jsx", error: String((e && e.message) || e) }); }

// components/glass/FlutedGlass.jsx
try { (() => {
/**
 * E4 — Riffelglas / fluted distortion, the symbol of the opaque old market.
 * Vertical glass flutes shred the image into strips; `reveal` clears part
 * of the image (0 = fully fluted, 1 = fully clear). Drive it from scroll
 * for the A1 "Klarheits-Scroll".
 */
function FlutedGlass({
  reveal = 0,
  side = "right",
  fluteWidth = 14,
  strength = 12,
  radius = 0,
  style,
  children
}) {
  const strips = 120;
  const clearPct = Math.min(1, Math.max(0, reveal)) * 100;
  const clip = side === "right" ? `inset(0 ${clearPct}% 0 0)` : `inset(0 0 0 ${clearPct}%)`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: radius,
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      clipPath: clip,
      WebkitClipPath: clip,
      transition: "clip-path var(--dur-slow) var(--ease-unio)",
      pointerEvents: "none"
    }
  }, Array.from({
    length: strips
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: "none",
      width: fluteWidth,
      WebkitBackdropFilter: `blur(${i % 2 ? strength : Math.max(2, strength / 3)}px) saturate(1.05)`,
      backdropFilter: `blur(${i % 2 ? strength : Math.max(2, strength / 3)}px) saturate(1.05)`,
      backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.02) 2px, rgba(10,9,8,0.10) 55%, rgba(255,255,255,0.05) 100%)"
    }
  }))));
}
Object.assign(__ds_scope, { FlutedGlass });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glass/FlutedGlass.jsx", error: String((e && e.message) || e) }); }

// components/glass/GlassPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Base frosted panel — only ever place it over real photography. */
function GlassPanel({
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
  const blurVal = typeof blur === "number" ? blur + "px" : blur || "var(--blur-panel)";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      position: "relative",
      background: dark ? "var(--glass-dark)" : "var(--glass-light)",
      WebkitBackdropFilter: `blur(${blurVal})`,
      backdropFilter: `blur(${blurVal})`,
      borderRadius: radius,
      boxShadow: [hairline ? `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-light-strong)"}` : null, shadow ? "var(--shadow-float)" : null].filter(Boolean).join(", ") || "none",
      color: dark ? "var(--text-inverse)" : "var(--ink-2)",
      padding,
      overflow: "hidden",
      ...style
    }
  }, rest), children, grain && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "var(--grain)",
      opacity: "var(--grain-opacity)",
      pointerEvents: "none"
    }
  }));
}
Object.assign(__ds_scope, { GlassPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glass/GlassPanel.jsx", error: String((e && e.message) || e) }); }

// components/glass/GlassCard.jsx
try { (() => {
/**
 * E2 — Die Glaskarte. Double-rim architecture: outer shell + inner core
 * with concentric radii. `solid` renders the opaque "old market" variant
 * for before/after storytelling (B8).
 */
function GlassCard({
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
  children
}) {
  const dark = tone === "dark" && !solid;
  const shellPad = 8;
  const inner = `calc(var(--r-card) - ${shellPad}px)`;
  const hairline = solid ? "inset 0 0 0 1px var(--hairline-dark)" : `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-light-strong)"}`;
  const textMuted = dark ? "var(--text-inverse-muted)" : "var(--text-muted)";
  const shell = {
    position: "relative",
    borderRadius: "var(--r-card)",
    padding: shellPad,
    background: solid ? "var(--surface-raised)" : dark ? "var(--glass-dark)" : "var(--glass-light)",
    WebkitBackdropFilter: solid ? "none" : "blur(var(--blur-card))",
    backdropFilter: solid ? "none" : "blur(var(--blur-card))",
    boxShadow: `${hairline}, var(--shadow-float)`,
    color: dark ? "var(--text-inverse)" : "var(--ink-2)",
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    style: shell
  }, media && /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: inner,
      overflow: "hidden",
      marginBottom: shellPad
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: media,
    alt: mediaAlt,
    style: {
      display: "block",
      width: "100%",
      height: mediaHeight,
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--sp-4)"
    }
  }, label && /*#__PURE__*/React.createElement(__ds_scope.DataLabel, {
    tone: dark ? "dark" : "light"
  }, label), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: "var(--track-display)",
      lineHeight: 1.1,
      margin: "6px 0 0"
    }
  }, title), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginTop: 12
    }
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "u-label",
    style: {
      padding: "5px 10px",
      borderRadius: "var(--r-pill)",
      boxShadow: hairline,
      fontSize: 11,
      color: textMuted
    }
  }, t))), data.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, data.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: row.label,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "9px 0",
      borderTop: i === 0 ? "none" : `1px solid ${dark ? "var(--hairline-light)" : "var(--hairline-dark)"}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: textMuted
    }
  }, row.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-data)"
    }
  }, row.value)))), children, (price || cta) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 18,
      gap: 12
    }
  }, price && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontSize: 22,
      letterSpacing: "var(--track-display)"
    }
  }, price), cta && /*#__PURE__*/React.createElement("button", {
    onClick: onCta,
    style: {
      font: "500 15px/1 var(--font-display)",
      padding: "5px 5px 5px 20px",
      borderRadius: "var(--r-pill)",
      border: "none",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      background: dark ? "var(--paper)" : "var(--ink)",
      color: dark ? "var(--ink)" : "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("span", null, cta), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      background: dark ? "var(--ink)" : "var(--paper)",
      color: dark ? "var(--paper)" : "var(--ink)"
    }
  }, "\u2192")))));
}
Object.assign(__ds_scope, { GlassCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glass/GlassCard.jsx", error: String((e && e.message) || e) }); }

// components/glass/StatBlock.jsx
try { (() => {
/**
 * B2 — "Blur to Data": big metric that sharpens on viewport entry,
 * counts up, then reveals its mono label underneath.
 */
function StatBlock({
  value,
  unit = "",
  label,
  delta,
  tone = "dark",
  size = "var(--size-metric)",
  animate = true
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(!animate);
  const [display, setDisplay] = React.useState(animate ? 0 : value);
  React.useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setShown(true);
        io.disconnect();
        const target = typeof value === "number" ? value : parseFloat(value) || 0;
        const t0 = performance.now();
        const dur = 1100;
        const tick = t => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, {
      threshold: 0.4
    });
    io.observe(el);
    return () => io.disconnect();
  }, [animate, value]);
  const dark = tone === "dark";
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    style: {
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
      whiteSpace: "nowrap"
    }
  }, typeof value === "number" ? display.toLocaleString("de-AT") : value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.45em",
      fontWeight: 400,
      marginLeft: 4
    }
  }, unit), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      color: "var(--signal-deep)",
      marginLeft: 10,
      letterSpacing: 0
    }
  }, delta)), label && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      opacity: shown ? 1 : 0,
      transition: "opacity var(--dur-base) var(--ease-unio) 500ms"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.DataLabel, {
    tone: tone
  }, label)));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glass/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/glass/DataOverlay.jsx
try { (() => {
/**
 * E1 — Glass-Data-Overlay, the signature element. Frosted panel over
 * object photography carrying the data layer. Two tonalities:
 * "editorial" (one big number hierarchy) and "dashboard" (stacked cells).
 */
function DataOverlay({
  variant = "editorial",
  tone = "dark",
  label,
  metric,
  rows = [],
  cells = [],
  animate = false,
  style,
  children
}) {
  const dark = tone === "dark";
  const hairline = dark ? "var(--hairline-light)" : "var(--hairline-dark)";
  const muted = dark ? "var(--text-inverse-muted)" : "var(--text-muted)";
  return /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      background: dark ? "var(--glass-dark)" : "var(--glass-light)",
      WebkitBackdropFilter: "blur(var(--blur-panel))",
      backdropFilter: "blur(var(--blur-panel))",
      borderRadius: "var(--r-panel)",
      boxShadow: `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-light-strong)"}, var(--shadow-float)`,
      color: dark ? "var(--text-inverse)" : "var(--ink-2)",
      padding: variant === "editorial" ? "var(--sp-6)" : "var(--sp-4)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: variant === "editorial" ? 20 : 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.DataLabel, {
    tone: tone,
    marker: true
  }, label)), variant === "editorial" && metric && /*#__PURE__*/React.createElement(__ds_scope.StatBlock, {
    value: metric.value,
    unit: metric.unit,
    label: metric.label,
    delta: metric.delta,
    tone: tone,
    size: "clamp(56px, 6vw, 96px)",
    animate: animate
  }), variant === "dashboard" && cells.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8
    }
  }, cells.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      borderRadius: "var(--r-inner)",
      boxShadow: `inset 0 0 0 1px ${hairline}`,
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StatBlock, {
    value: c.value,
    unit: c.unit,
    label: c.label,
    delta: c.delta,
    tone: tone,
    size: "28px",
    animate: animate
  })))), rows.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, rows.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: row.label,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 24,
      padding: "10px 0",
      borderTop: i === 0 && variant === "dashboard" ? "none" : `1px solid ${hairline}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: muted
    }
  }, row.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--size-data)",
      color: row.highlight ? "var(--signal)" : "inherit"
    }
  }, row.value)))), children);
}
Object.assign(__ds_scope, { DataOverlay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/glass/DataOverlay.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/bento.jsx
try { (() => {
/* UNIO — System-Bento „Ein System für deinen gesamten Verkauf."
   Geteilt zwischen Startseite und Makler-Seite (window.SystemBento).
   Benötigt site-shared.jsx (window.useTick). */
/* ---------- System-Bento (weiß, animiert) ---------- */
function BCard({
  span = 2,
  orange = false,
  title,
  copy,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: `span ${span}`,
      background: orange ? "var(--signal)" : "#FFFFFF",
      color: orange ? "var(--on-signal)" : "var(--ink-2)",
      borderRadius: "var(--r-card)",
      padding: "26px 26px 24px",
      boxShadow: orange ? "var(--shadow-float)" : "inset 0 0 0 1px var(--hairline-dark), var(--shadow-1, 0 1px 2px rgba(11,10,9,0.04))",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      minHeight: 280,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 20px/1.2 var(--font-display)",
      letterSpacing: "-0.02em",
      color: orange ? "#FFFFFF" : "var(--ink)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 14.5px/1.55 var(--font-display)",
      color: orange ? "rgba(255,245,239,0.85)" : "var(--text-muted)",
      maxWidth: "36ch"
    }
  }, copy), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 16
    }
  }, children));
}
const chipStyle = on => ({
  font: "500 13px var(--font-display)",
  padding: "7px 13px",
  borderRadius: "var(--r-pill)",
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  background: on ? "var(--signal-soft)" : "transparent",
  color: on ? "var(--signal-deep)" : "var(--text-muted)",
  boxShadow: on ? "inset 0 0 0 1px rgba(255,170,9,0.35)" : "inset 0 0 0 1px var(--hairline-dark)",
  transition: "all var(--dur-fast) var(--ease-unio)"
});

/* 1 — KI-Suche: Text tippt sich selbst */
function AnimSuche({
  text = "Penthouse mit Terrasse, Hernals"
}) {
  const t = window.useTick(text.length + 14, 110);
  const typed = text.slice(0, Math.min(text.length, t));
  const done = t >= text.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--paper)",
      borderRadius: "var(--r-inner)",
      padding: "13px 16px",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      font: "14px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 15px var(--font-display)",
      color: "var(--ink-2)",
      minHeight: 20
    }
  }, typed, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 2,
      height: 15,
      background: "var(--signal)",
      marginLeft: 2,
      verticalAlign: "-2px"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: chipStyle(true)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--signal)"
    }
  }), "KI-Suche"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...chipStyle(false),
      opacity: done ? 1 : 0.25
    }
  }, done ? "14 Treffer" : "…"), /*#__PURE__*/React.createElement("span", {
    style: chipStyle(false)
  }, "Nur meine")));
}

/* 2 — Provisionssicherung: Haken poppt */
function AnimSchutz() {
  const t = window.useTick(4, 900);
  const on = t >= 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.45)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "32px var(--font-mono)",
      color: "#FFFFFF",
      transform: on ? "scale(1)" : "scale(0.55)",
      opacity: on ? 1 : 0,
      transition: "all 500ms var(--ease-unio)"
    }
  }, "\u2713"));
}

/* 3 — Suggested Actions: Zeilen steigen nacheinander auf */
function AnimActions() {
  const t = window.useTick(7, 700);
  const rows = [["Lead telefonisch kontaktieren", "Jetzt"], ["Besichtigung vorschlagen", "Heute"], ["Suchprofil ergänzen", "Diese Woche"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, rows.map(([txt, w], i) => {
    const on = t > i;
    return /*#__PURE__*/React.createElement("div", {
      key: txt,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "var(--paper)",
        borderRadius: 10,
        padding: "9px 13px",
        boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
        opacity: on ? i === 0 ? 1 : 0.75 : 0,
        transform: on ? "none" : "translateY(10px)",
        transition: "all 450ms var(--ease-unio)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: "50%",
        flex: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        font: "9px var(--font-mono)",
        background: t > i + 3 ? "var(--signal)" : "var(--signal-soft)",
        color: t > i + 3 ? "#FFFFFF" : "transparent",
        transition: "all 350ms var(--ease-unio)"
      }
    }, "\u2713"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "500 13px var(--font-display)",
        color: "var(--ink-2)"
      }
    }, txt), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        font: "10.5px var(--font-mono)",
        color: i === 0 ? "var(--signal-deep)" : "var(--text-muted)",
        letterSpacing: "0.06em",
        whiteSpace: "nowrap"
      }
    }, w));
  }));
}

/* 4 — Portal-Export: Sync-Häkchen poppen nacheinander */
function AnimPortale() {
  const t = window.useTick(5, 850);
  const tiles = [["IS", "var(--signal-deep)"], ["W", "var(--signal)"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 8
    }
  }, tiles.map(([n, bg], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: n
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 34,
      borderTop: "2px dashed rgba(255,170,9,0.5)",
      opacity: t >= 1 ? 1 : 0.3,
      transition: "opacity 400ms"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 54,
      height: 54,
      borderRadius: 14,
      background: bg,
      color: "#FFFFFF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "500 17px var(--font-display)",
      boxShadow: "var(--shadow-float)"
    }
  }, n, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: -6,
      bottom: -6,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "var(--ink)",
      color: "#FFFFFF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "10px var(--font-mono)",
      border: "2px solid #FFFFFF",
      transform: t >= i + 2 ? "scale(1)" : "scale(0)",
      transition: "transform 350ms var(--ease-unio)"
    }
  }, "\u2713")))));
}

/* 5 — Kalender: Termin wandert */
function AnimKalender() {
  const t = window.useTick(28, 260);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 15px)",
      gap: 5,
      justifyContent: "center",
      paddingBottom: 8
    }
  }, Array.from({
    length: 28
  }).map((_, k) => {
    const on = k === (t * 5 + 3) % 28;
    return /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        width: 15,
        height: 15,
        borderRadius: 4,
        background: on ? "var(--signal)" : "var(--paper-3)",
        boxShadow: on ? "0 0 0 3px var(--signal-soft)" : "none",
        transition: "all 250ms var(--ease-unio)"
      }
    });
  }));
}

/* LENS — Live-Signale ticken hoch */
function AnimLens() {
  const t = window.useTick(40, 900);
  const bars = [5, 8, 6, 9, 7, 8, 6];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 5,
      height: 30
    }
  }, bars.map((v, k) => {
    const on = t % bars.length >= k;
    return /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        flex: 1,
        height: v / 9 * 100 + "%",
        background: on ? "var(--signal)" : "var(--paper-3)",
        borderRadius: 1,
        transition: "background 300ms var(--ease-unio)"
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--signal)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "13px var(--font-mono)",
      color: "var(--ink-2)"
    }
  }, "Live \xB7 ", 120 + t % 12, " Signale / Tag")));
}

/* Lead Engine — Pipeline: Stufen füllen sich nacheinander */
function AnimLead() {
  const stages = [["Leads", 100], ["Qualifiziert", 62], ["Termin", 34], ["Close", 12]];
  const t = window.useTick(stages.length + 3, 720);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, stages.map(([n, w], i) => {
    const on = t > i;
    return /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        display: "grid",
        gridTemplateColumns: "84px 1fr 34px",
        gap: 10,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "u-label",
      style: {
        fontSize: 9,
        color: "var(--text-muted)"
      }
    }, n), /*#__PURE__*/React.createElement("span", {
      style: {
        height: 8,
        borderRadius: 4,
        background: "var(--paper-3)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        height: "100%",
        width: on ? w + "%" : "0%",
        background: i === stages.length - 1 ? "var(--signal)" : "var(--ink-3)",
        borderRadius: 4,
        transition: "width 500ms var(--ease-unio)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "11px var(--font-mono)",
        color: "var(--ink-2)",
        textAlign: "right"
      }
    }, on ? w : 0));
  }));
}

/* Bauträger — High-End-Marketing: Kanal-Performance-Balken */
function AnimBautraeger() {
  const chans = [["Meta", 9], ["Google", 6], ["willhaben", 7], ["IS24", 4]];
  const t = window.useTick(chans.length + 3, 640);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 8,
      height: 40
    }
  }, chans.map(([n, v], k) => {
    const on = t > k;
    return /*#__PURE__*/React.createElement("div", {
      key: n,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: "100%",
        height: on ? v / 9 * 40 : 0,
        background: "#FFFFFF",
        borderRadius: 2,
        transition: "height 500ms var(--ease-unio)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "7.5px var(--font-mono)",
        letterSpacing: "0.06em",
        color: "rgba(255,245,239,0.8)"
      }
    }, n));
  })), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      fontSize: 8.5,
      color: "rgba(255,245,239,0.85)",
      marginTop: 10
    }
  }, "Channel Performance \xB7 High-End-Kampagne"));
}

/* 6 — Matching: Chips poppen, dann Treffer */
function AnimMatching() {
  const chips = ["Wohnung", "€ 1,0–1,5 Mio", "4–5 Zi", "1020 Wien"];
  const t = window.useTick(chips.length + 4, 700);
  const found = t > chips.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, chips.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      ...chipStyle(true),
      opacity: t > i ? 1 : 0.15,
      transform: t > i ? "scale(1)" : "scale(0.9)"
    }
  }, c))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "12px var(--font-mono)",
      letterSpacing: "0.08em",
      color: "var(--signal-deep)",
      opacity: found ? 1 : 0,
      transform: found ? "none" : "translateY(6px)",
      transition: "all 400ms var(--ease-unio)"
    }
  }, "\u2713 PASSENDES OBJEKT GEFUNDEN"));
}

/* 7 — KI-Objektanlage: Zähler auf Orange */
function AnimAnlage({
  pct = 90
}) {
  const t = window.useTick(24, 260);
  const val = Math.min(pct, Math.round(t / 16 * pct));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 56px/1 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "#FFFFFF",
      fontVariantNumeric: "tabular-nums"
    }
  }, val, " %"), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.85)",
      marginTop: 10
    }
  }, "weniger Tipparbeit pro Objekt"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: "rgba(255,255,255,0.3)",
      borderRadius: 2,
      marginTop: 16,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: val / pct * 100 + "%",
      background: "#FFFFFF",
      borderRadius: 2,
      transition: "width 250ms linear"
    }
  })));
}

/* Ansprechpartner-Kachel (Makler): Software-Bento mit einem Gesicht darin */
function AnsprechTile() {
  return /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    title: "Dein Ansprechpartner im CIRCLE",
    copy: "Software automatisiert die Prozesse \u2014 entschieden und begleitet wird von Menschen."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 54,
      height: 54,
      borderRadius: "50%",
      flex: "none",
      border: "1px dashed var(--hairline-dark)",
      background: "var(--paper-2)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "8px var(--font-mono)",
      letterSpacing: "0.06em",
      color: "var(--text-muted)"
    }
  }, "FOTO"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 15px var(--font-display)",
      color: "var(--ink)"
    }
  }, "[PLATZHALTER: Name]"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 9,
      color: "var(--text-muted)"
    }
  }, "Partner-Management \xB7 Wien"))));
}
function SystemBento({
  makler = false
}) {
  const Kap = makler && window.BT ? window.BT.Kap : null;
  return /*#__PURE__*/React.createElement("section", {
    id: "system",
    "data-screen-label": "System",
    "data-track": makler ? "chapter_view_04" : null,
    style: {
      background: "#FFFFFF",
      padding: "120px 5vw 130px",
      position: "relative"
    }
  }, Kap ? /*#__PURE__*/React.createElement(Kap, {
    nr: "04",
    label: "System"
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      marginBottom: 88
    }
  }, (() => {
    const R = window.Reveal;
    const H = /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        font: "500 clamp(38px, 4.2vw, 72px)/1.02 var(--font-display)",
        letterSpacing: "-0.03em",
        color: "var(--ink)"
      }
    }, "Ein System f\xFCr deinen", /*#__PURE__*/React.createElement("br", null), "gesamten Verkauf.");
    return R ? /*#__PURE__*/React.createElement(R, null, H) : H;
  })(), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 0",
      font: "400 18px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 560
    }
  }, "Von der KI-Suche \xFCber abgesicherte Leads bis zum Portal-Export \u2014 jede Funktion arbeitet f\xFCr dich, damit du dich auf Abschl\xFCsse konzentrierst.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(BCard, {
    span: 4,
    title: "KI-Suche & Lead-Inbox",
    copy: "Frag in nat\xFCrlicher Sprache nach Objekten oder K\xE4ufern \u2014 die Plattform versteht dich und liefert sofort passende Treffer."
  }, /*#__PURE__*/React.createElement(AnimSuche, {
    text: makler ? "Penthouse mit Terrasse, 1190 Wien" : "Penthouse mit Terrasse, Hernals"
  })), /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    orange: true,
    title: "Provisionssicherung",
    copy: "Jeder Lead wird automatisch abgesichert \u2014 bevor du Zeit investierst."
  }, /*#__PURE__*/React.createElement(AnimSchutz, null)), /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    title: "Suggested Actions",
    copy: "Das System sagt dir den n\xE4chsten Schritt \u2014 priorisiert nach Wirkung."
  }, /*#__PURE__*/React.createElement(AnimActions, null)), /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    title: "Portal-Export",
    copy: "Ein Klick ver\xF6ffentlicht auf ImmobilienScout24 & willhaben \u2014 inkl. Update & R\xFCckzug."
  }, /*#__PURE__*/React.createElement(AnimPortale, null)), /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    title: "Besichtigung & Kalender",
    copy: "Termine direkt aus dem Lead heraus buchen \u2014 synchron mit deinem Kalender."
  }, /*#__PURE__*/React.createElement(AnimKalender, null)), makler ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    title: "Automatisches Matching",
    copy: "Aus jeder Anfrage entsteht ein Suchprofil \u2014 laufend gegen deinen Bestand gematcht."
  }, /*#__PURE__*/React.createElement(AnimMatching, null)), /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    orange: true,
    title: "KI-Objektanlage",
    copy: "Dokumente rein \u2014 Vermarktung raus."
  }, /*#__PURE__*/React.createElement("a", {
    href: "#objektanlage",
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      textDecoration: "none",
      color: "#FFFFFF"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 13px/1.5 var(--font-display)",
      color: "rgba(255,245,239,0.9)",
      maxWidth: "22ch"
    }
  }, "Die ganze Verwandlung \u2014 eine Scroll-Sequenz weiter unten."), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      flex: "none",
      background: "rgba(255,255,255,0.18)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "16px var(--font-mono)"
    }
  }, "\u2193"))), /*#__PURE__*/React.createElement(AnsprechTile, null)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    title: "Automatisches Matching",
    copy: "Aus jeder Anfrage entsteht ein Suchprofil \u2014 die Plattform matcht es laufend gegen deinen Bestand."
  }, /*#__PURE__*/React.createElement(AnimMatching, null)), /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    orange: true,
    title: "KI-Objektanlage",
    copy: "Dokumente reinziehen \u2014 die KI erstellt Expos\xE9, Daten und Suchprofil automatisch."
  }, /*#__PURE__*/React.createElement(AnimAnlage, null)), /*#__PURE__*/React.createElement(BCard, {
    span: 2,
    title: "LENS \u2014 Live-Dashboard",
    copy: "Pipeline, Nachfrage und Kosten in Echtzeit \u2014 du siehst jederzeit, wo ein Projekt steht."
  }, /*#__PURE__*/React.createElement(AnimLens, null)), /*#__PURE__*/React.createElement(BCard, {
    span: 3,
    title: "Lead Engine",
    copy: "Realtime Demand \xFCber die relevanten Kan\xE4le \u2014 mit KI-Qualifizierung, Intent Score und sauberem Tracking bis zum Close."
  }, /*#__PURE__*/React.createElement(AnimLead, null)), /*#__PURE__*/React.createElement(BCard, {
    span: 3,
    orange: true,
    title: "F\xFCr Bautr\xE4ger",
    copy: "Markttest vor dem Baustart, Vermarktung und Vertrieb als ein System \u2014 100 % erfolgsbasiert."
  }, /*#__PURE__*/React.createElement(AnimBautraeger, null), /*#__PURE__*/React.createElement("a", {
    href: "bautraeger.html",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none",
      color: "#FFFFFF",
      font: "500 14px var(--font-display)",
      marginTop: 16
    }
  }, "Projekt pr\xFCfen lassen", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.2)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "13px var(--font-mono)"
    }
  }, "\u2192"))))));
}
Object.assign(window, {
  SystemBento
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/bento.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/bt-system.jsx
try { (() => {
/* UNIO Bauträger v3 — Bausteine: Kapitel-Marker, Grid-Hairlines, Sticky-CTA,
   Kapitel 04 (Pipeline-Linie) + 05 (Lernkurve, gepinnt). Korrektur-Briefing 04.07. */
const {
  GlassPanel: GPsys,
  Button: Bsys
} = window.UNIODesignSystem_b6216a;
const BT_EASE = "var(--ease-unio)";
const BT_RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Einmaliger IntersectionObserver-Trigger */
function useOnceInView(threshold = 0.3) {
  const ref = React.useRef(null);
  const [inView, setIn] = React.useState(BT_RM);
  React.useEffect(() => {
    if (BT_RM) return;
    const io = new IntersectionObserver(es => {
      if (es[0].isIntersecting) {
        setIn(true);
        io.disconnect();
      }
    }, {
      threshold
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* Count-up (900 ms, Ease-Out) */
function CountUp({
  to,
  run,
  dur = 900,
  fmt
}) {
  const [v, setV] = React.useState(BT_RM ? to : 0);
  React.useEffect(() => {
    if (!run || BT_RM) return;
    const t0 = performance.now();
    let raf;
    const tick = now => {
      const k = Math.min(1, (now - t0) / dur),
        e = 1 - Math.pow(1 - k, 3);
      setV(Math.round(to * e));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, dur]);
  return /*#__PURE__*/React.createElement("span", null, fmt ? fmt(v) : v);
}

/* Reversibler Scroll-Trigger: blendet beim Rein- UND Rausscrollen (vor & zurück) */
function Fx({
  children,
  delay = 0,
  y = 26,
  style
}) {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(BT_RM);
  React.useEffect(() => {
    if (BT_RM) return;
    const io = new IntersectionObserver(es => setOn(es[0].isIntersecting), {
      threshold: 0.18
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: on ? 1 : 0,
      transform: on ? "none" : `translateY(${y}px)`,
      transition: `opacity 700ms ${BT_EASE} ${delay}ms, transform 700ms ${BT_EASE} ${delay}ms`,
      ...style
    }
  }, children);
}

/* Kapitel-Marker (RIVVA): Mono + vertikale Hairline am Sektionsrand */
function Kap({
  nr,
  label,
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "2.4vw",
      top: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 46,
      background: dark ? "var(--hairline-light)" : "var(--hairline-dark)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      writingMode: "vertical-rl",
      fontSize: 9,
      letterSpacing: "0.18em",
      color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)"
    }
  }, nr, " \u2014 ", label));
}

/* Vertikale Grid-Hairlines (helle Sektionen) */
function GridLines() {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none"
    }
  }, [25, 50, 75].map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    style: {
      position: "absolute",
      left: p + "%",
      top: 0,
      bottom: 0,
      width: 1,
      background: "rgba(11,10,9,0.05)"
    }
  })));
}

/* Sticky Micro-CTA: Glas-Pill ab 50 % Scrolltiefe, Desktop, nicht am Funnel */
function StickyCTA() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => {
      const max = document.body.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      setShow(innerWidth >= 900 && p > 0.5 && p < 0.93);
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);
  return /*#__PURE__*/React.createElement("a", {
    href: "#funnel",
    "data-track": "sticky_cta",
    style: {
      position: "fixed",
      right: 20,
      bottom: 20,
      zIndex: 70,
      height: 44,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "0 20px",
      borderRadius: "var(--r-pill)",
      textDecoration: "none",
      background: "var(--glass-dark-2)",
      WebkitBackdropFilter: "blur(18px)",
      backdropFilter: "blur(18px)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light), var(--shadow-float)",
      color: "var(--text-inverse)",
      font: "500 14px var(--font-display)",
      opacity: show ? 1 : 0,
      transform: show ? "none" : "translateY(14px)",
      pointerEvents: show ? "auto" : "none",
      transition: `all var(--dur-fast) ${BT_EASE}`
    }
  }, "Projekt pr\xFCfen ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12
    }
  }, "\u2192"));
}

/* ===== Kapitel 04 — DAS SYSTEM: Pipeline-Linie mit vier Erklär-Animationen ===== */

function St1Chips({
  run
}) {
  const chips = ["Preisband", "Grundrisse", "Zielgruppen", "Milieus"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, chips.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      font: "500 13px var(--font-display)",
      padding: "8px 14px",
      borderRadius: "var(--r-pill)",
      color: "var(--ink-2)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
      background: "#FFFFFF",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      opacity: run ? 1 : 0,
      transform: run ? "scale(1)" : "scale(0.88)",
      transition: `all 600ms ${BT_EASE} ${i * 110}ms`
    }
  }, c, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 15,
      height: 15,
      borderRadius: "50%",
      background: "var(--signal)",
      color: "#fff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transform: run ? "scale(1)" : "scale(0)",
      transition: `transform 400ms ${BT_EASE} ${500 + i * 110}ms`
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "8",
    viewBox: "0 0 10 10",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m1.5 5.5 2.5 2.5 4.5-6"
  }))))));
}
function St2Funnel({
  run
}) {
  const rows = [["Leads", 1], ["Qualifiziert", 0.62], ["Besichtigung", 0.34], ["Kauf", 0.16]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9,
      maxWidth: 360
    }
  }, rows.map(([n, w], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: "grid",
      gridTemplateColumns: "104px 1fr",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      fontSize: 9
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 4,
      background: "rgba(11,10,9,0.08)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 4,
      width: run ? w * 100 + "%" : "3%",
      background: i === rows.length - 1 ? "var(--signal)" : "var(--ink-3)",
      transition: `width 900ms ${BT_EASE} ${i * 120}ms`
    }
  })))));
}
function St3Matching({
  run
}) {
  const L = [22, 58, 94, 130],
    R = [30, 66, 102];
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 152",
    style: {
      width: "100%",
      maxWidth: 360,
      height: "auto"
    },
    "aria-hidden": "true"
  }, [["M20 22 L300 66", 0], ["M20 94 L300 30", 1], ["M20 130 L300 102", 2]].map(([d, i]) => /*#__PURE__*/React.createElement("path", {
    key: d,
    d: d,
    stroke: "rgba(11,10,9,0.16)",
    strokeWidth: "1",
    fill: "none",
    pathLength: "1",
    strokeDasharray: "1",
    strokeDashoffset: run ? 0 : 1,
    style: {
      transition: `stroke-dashoffset 900ms ${BT_EASE} ${i * 140}ms`
    }
  })), /*#__PURE__*/React.createElement("path", {
    d: "M20 58 L300 66",
    stroke: "var(--signal)",
    strokeWidth: "1.5",
    fill: "none",
    pathLength: "1",
    strokeDasharray: "1",
    strokeDashoffset: run ? 0 : 1,
    style: {
      transition: `stroke-dashoffset 1000ms ${BT_EASE} 500ms`
    }
  }), L.map((y, i) => /*#__PURE__*/React.createElement("circle", {
    key: "l" + y,
    cx: "20",
    cy: y,
    r: "5",
    fill: y === 58 ? "var(--signal)" : "rgba(11,10,9,0.3)",
    style: {
      opacity: run ? 1 : 0,
      transition: `opacity 400ms ${BT_EASE} ${i * 90}ms`
    }
  })), R.map((y, i) => /*#__PURE__*/React.createElement("circle", {
    key: "r" + y,
    cx: "300",
    cy: y,
    r: "5",
    fill: y === 66 ? "var(--signal)" : "rgba(11,10,9,0.3)",
    style: {
      opacity: run ? 1 : 0,
      transition: `opacity 400ms ${BT_EASE} ${200 + i * 90}ms`
    }
  })), /*#__PURE__*/React.createElement("text", {
    x: "14",
    y: "150",
    fill: "rgba(11,10,9,0.5)",
    style: {
      font: "9px var(--font-mono)",
      letterSpacing: "0.14em"
    }
  }, "EINHEITEN"), /*#__PURE__*/React.createElement("text", {
    x: "236",
    y: "150",
    fill: "rgba(11,10,9,0.5)",
    style: {
      font: "9px var(--font-mono)",
      letterSpacing: "0.14em"
    }
  }, "K\xC4UFERPROFILE"));
}
function St4Lens({
  run
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 360,
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)",
      background: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "9px 12px",
      background: "var(--paper-2)",
      borderBottom: "1px solid var(--hairline-dark)"
    }
  }, [0, 1, 2].map(k => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--paper-3)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      font: "10px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "app.unio.at"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      marginLeft: "auto",
      fontSize: 8,
      color: "var(--signal-deep)",
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--signal)"
    }
  }), "Anfragen \xB7 live")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 12px 12px"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 300 90",
    style: {
      width: "100%",
      height: "auto"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 76 L48 66 L90 70 L132 52 L174 56 L216 34 L258 26 L294 12",
    stroke: "var(--signal)",
    strokeWidth: "1.5",
    fill: "none",
    pathLength: "1",
    strokeDasharray: "1",
    strokeDashoffset: run ? 0 : 1,
    style: {
      transition: `stroke-dashoffset 1300ms ${BT_EASE} 200ms`
    }
  }), [76, 52, 26].map((y, i) => /*#__PURE__*/React.createElement("circle", {
    key: y,
    cx: [6, 132, 258][i],
    cy: y,
    r: "3",
    fill: "var(--signal)",
    style: {
      opacity: run ? 1 : 0,
      transition: `opacity 350ms ${BT_EASE} ${400 + i * 260}ms`
    }
  })))));
}
const BT_STATIONEN = [{
  mod: "NOVA",
  t: "Markttest, bevor gebaut wird",
  p: "Preisband, Grundrisse und Zielgruppen werden am echten Markt validiert — jede Projektentscheidung mit Beleg.",
  A: St1Chips
}, {
  mod: "LEAD ENGINE",
  t: "Nachfrage mit Substanz",
  p: "Kampagnen mit sauberem Tracking und Qualifizierung — aus Reichweite wird planbare Nachfrage.",
  A: St2Funnel
}, {
  mod: "CIRCLE",
  t: "Passende Käufer zuerst",
  p: "Einheiten und Käuferprofile finden zueinander, bevor das Inserat live ist — kuratierte Makler schließen ab.",
  A: St3Matching
}, {
  mod: "LENS",
  t: "Steuerung in Echtzeit",
  p: "Jeder Schritt live im Dashboard — was gelernt wird, fließt vorne wieder ein.",
  A: St4Lens
}];
function SystemLine() {
  const secRef = React.useRef(null);
  const [p, setP] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = secRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(Math.max(0, Math.min(1, (innerHeight * 0.75 - r.top) / r.height)));
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    return () => removeEventListener("scroll", on);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    ref: secRef,
    id: "system",
    "data-track": "chapter_view_04",
    "data-screen-label": "System",
    className: "u-grain",
    style: {
      position: "relative",
      background: "var(--paper)",
      padding: "185px 7vw 185px"
    }
  }, /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "04",
    label: "System"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Fx, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(34px, 3.6vw, 60px)/1.02 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Ein System.", /*#__PURE__*/React.createElement("br", null), "Vier Stationen."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginTop: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "50%",
      top: 0,
      bottom: 0,
      width: 1,
      background: "rgba(11,10,9,0.12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: p * 100 + "%",
      background: "var(--signal)"
    }
  })), BT_STATIONEN.map((s, i) => {
    const [ref, run] = useOnceInView(0.4);
    const left = i % 2 === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: s.mod,
      ref: ref,
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0 60px",
        padding: "80px 0",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        left: "50%",
        top: 94,
        transform: "translateX(-50%)",
        width: 11,
        height: 11,
        borderRadius: "50%",
        background: run ? "var(--signal)" : "var(--paper-3)",
        boxShadow: run ? "0 0 0 5px var(--signal-soft)" : "inset 0 0 0 1px var(--hairline-dark)",
        transition: `all 500ms ${BT_EASE}`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: left ? 1 : 2,
        gridRow: 1,
        textAlign: left ? "right" : "left",
        paddingRight: left ? 44 : 0,
        paddingLeft: left ? 0 : 44
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "11px var(--font-mono)",
        letterSpacing: "0.18em",
        color: "var(--signal-deep)"
      }
    }, s.mod), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: "12px 0 0",
        font: "500 24px/1.15 var(--font-display)",
        letterSpacing: "-0.02em",
        color: "var(--ink)"
      }
    }, s.t), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "10px 0 0",
        font: "400 14.5px/1.6 var(--font-display)",
        color: "var(--text-muted)",
        maxWidth: 380,
        marginLeft: left ? "auto" : 0
      }
    }, s.p)), /*#__PURE__*/React.createElement("div", {
      style: {
        gridColumn: left ? 2 : 1,
        gridRow: 1,
        paddingLeft: left ? 44 : 0,
        paddingRight: left ? 0 : 44,
        display: "flex",
        justifyContent: left ? "flex-start" : "flex-end",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(s.A, {
      run: run
    })));
  })));
}

/* ===== Kapitel 05 — DIE LERNKURVE: ein wachsendes LENS-Panel (gepinnt) ===== */
const LK_STAGES = [{
  tag: 30,
  t: "Kampagnen kalibrieren",
  rows: ["Erste Leads · Basisqualität", "Zielgruppen-Hypothesen im Test"]
}, {
  tag: 90,
  t: "Lead-Qualität steigt",
  rows: ["Cost/Lead sinkt messbar", "Makler-Feedback schärft das Targeting"]
}, {
  tag: 180,
  t: "Steuerbarer Abverkauf",
  rows: ["Lead-Volumen × Qualität planbar", "Zielgruppen-Treffsicherheit validiert"]
}];
const LK_BARS = [3, 4, 3, 5, 6, 5, 7, 6, 8, 9, 8, 10, 11, 12];
function Lernkurve() {
  const secRef = React.useRef(null);
  const [p, setP] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = secRef.current;
      if (!el) return;
      setP(Math.max(0, Math.min(1, (scrollY - el.offsetTop) / (el.offsetHeight - innerHeight))));
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    return () => removeEventListener("scroll", on);
  }, []);
  const stage = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
  const barsOn = [5, 10, 14][stage];
  return /*#__PURE__*/React.createElement("section", {
    ref: secRef,
    "data-track": "chapter_view_05",
    "data-screen-label": "Lernkurve",
    style: {
      height: "250vh",
      position: "relative",
      background: "var(--signal)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "sticky",
      top: 0,
      height: "100svh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 7vw"
    }
  }, /*#__PURE__*/React.createElement(Kap, {
    nr: "05",
    label: "Lernkurve",
    dark: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr) 56px",
      gap: "clamp(28px, 4vw, 64px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.85)"
    }
  }, "Ein Dashboard, das voller wird"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 4,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 clamp(80px, 9vw, 150px)/0.86 var(--font-display)",
      letterSpacing: "-0.05em",
      color: "transparent",
      WebkitTextStroke: "1.5px rgba(255,245,239,0.7)"
    }
  }, String(LK_STAGES[stage].tag).padStart(3, "0").slice(0, -2)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 clamp(80px, 9vw, 150px)/0.86 var(--font-display)",
      letterSpacing: "-0.05em",
      color: "#FFFFFF"
    }
  }, String(LK_STAGES[stage].tag).padStart(3, "0").slice(-2)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 clamp(20px, 2.2vw, 34px) var(--font-display)",
      letterSpacing: "-0.02em",
      color: "#FFFFFF",
      paddingBottom: "0.18em",
      marginLeft: 6
    }
  }, "Tage")), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "18px 0 0",
      font: "500 clamp(26px, 2.6vw, 42px)/1.05 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "#FFFFFF"
    }
  }, LK_STAGES[stage].t, "."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      font: "400 16px/1.6 var(--font-display)",
      color: "rgba(255,245,239,0.92)",
      maxWidth: 380
    }
  }, "Jede Kampagnen-Runde und jedes Makler-Feedback macht die Leads besser und die Zielgruppen sch\xE4rfer.")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 16,
      overflow: "hidden",
      background: "var(--paper)",
      boxShadow: "0 34px 80px -28px rgba(120,40,4,0.55)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "11px 14px",
      background: "var(--paper-2)",
      borderBottom: "1px solid var(--hairline-dark)"
    }
  }, [0, 1, 2].map(k => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: "var(--paper-3)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      font: "11px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "LENS \xB7 Performance"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      marginLeft: "auto",
      fontSize: 9,
      color: "var(--signal-deep)"
    }
  }, "Tag ", LK_STAGES[stage].tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 18px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 5,
      height: 64
    }
  }, LK_BARS.map((v, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      maxWidth: 10,
      borderRadius: 99,
      height: v / 12 * 100 + "%",
      background: i < barsOn ? i === barsOn - 1 ? "var(--signal)" : "rgba(11,10,9,0.22)" : "rgba(11,10,9,0.07)",
      transition: `background 400ms ${BT_EASE}`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      borderTop: "1px solid var(--hairline-dark)"
    }
  }, LK_STAGES.map((st, si) => /*#__PURE__*/React.createElement("div", {
    key: st.tag,
    style: {
      opacity: stage >= si ? 1 : 0.18,
      transform: stage >= si ? "none" : "translateY(6px)",
      transition: `all 600ms ${BT_EASE}`
    }
  }, st.rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      padding: "9px 0",
      borderBottom: "1px solid var(--hairline-dark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 13.5px var(--font-display)",
      color: "var(--ink-2)"
    }
  }, r), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 9,
      color: stage >= si ? "var(--signal-deep)" : "var(--text-muted)"
    }
  }, "Tag ", st.tag)))))))), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "relative",
      height: 320,
      alignSelf: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 26,
      top: 0,
      bottom: 0,
      width: 1,
      borderLeft: "1px solid rgba(255,255,255,0.45)",
      background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 20px)",
      backgroundSize: "8px 100%",
      backgroundRepeat: "no-repeat"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 22,
      top: `calc(${p * 100}% - 9px)`,
      width: 18,
      height: 2.5,
      borderRadius: 99,
      background: "var(--ink)",
      transition: BT_RM ? "none" : "top 120ms linear"
    }
  }), [["30", 20], ["90", 52], ["180", 88]].map(([d, y]) => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      position: "absolute",
      right: 0,
      top: y + "%",
      font: "10px var(--font-mono)",
      color: "rgba(255,245,239,0.9)"
    }
  }, d))))));
}
Object.assign(window, {
  BT: {
    useOnceInView,
    CountUp,
    Fx,
    Kap,
    GridLines,
    StickyCTA,
    SystemLine,
    Lernkurve,
    BT_EASE,
    BT_RM
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/bt-system.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/homepage.jsx
try { (() => {
/* UNIO Startseite — Endkunde zuerst (Suche + Highlights), animiertes System-Bento,
   Bauträger- & CIRCLE-Abholer. Bausteine aus site-shared.jsx. */
const {
  GlassPanel: GPx,
  GlassCard: GCx,
  DataOverlay: DOx,
  FlutedGlass: FGx,
  StatBlock: SBx,
  DataLabel: DLx,
  Button: Bx,
  IconButton: IBx
} = window.UNIODesignSystem_b6216a;
const {
  useTick,
  Reveal,
  SiteNav,
  Chapter,
  PropCard,
  OBJEKT_DB,
  SiteFooter,
  U_RM: RMx,
  LivePill: LPx,
  Annotation: Anx,
  SignalRaster: SRx,
  StatFrame: SFx
} = window;

/* ---------- Hero-Neubau: „Der Markt wird lesbar“ als Choreografie (Briefing v1) ---------- */
function Hero() {
  const [t, setT] = React.useState(RMx ? 99999 : 0);
  const [sy, setSy] = React.useState(0);
  const vidRef = React.useRef(null);
  React.useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = true;
    const go = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    go();
    v.addEventListener("canplay", go, {
      once: true
    });
    v.addEventListener("loadeddata", go, {
      once: true
    });
    return () => {
      v.removeEventListener("canplay", go);
      v.removeEventListener("loadeddata", go);
    };
  }, []);
  React.useEffect(() => {
    if (RMx) return;
    const t0 = performance.now();
    let raf;
    const tick = now => {
      const el = now - t0;
      setT(el);
      if (el < 3600) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  React.useEffect(() => {
    const on = () => setSy(window.scrollY);
    window.addEventListener("scroll", on, {
      passive: true
    });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const reveal = RMx ? 1 : Math.min(1, Math.max(0, (t - 900) / 1600)); // 900–2500 ms
  const annIn = t > 2500;
  const lineIn = i => t > 120 + i * 240;
  const panelIn = i => t > 300 + i * 260;
  const H = {
    margin: 0,
    font: "500 clamp(52px, 8.2vw, 138px)/0.96 var(--font-display)",
    letterSpacing: "-0.035em",
    color: "var(--ink)",
    whiteSpace: "nowrap"
  };
  const marg = {
    font: "11px var(--font-mono)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    whiteSpace: "nowrap"
  };
  const lineDir = [-110, 120, -90];
  const lineStyle = i => ({
    opacity: lineIn(i) ? 1 : 0,
    filter: lineIn(i) ? "blur(0)" : "blur(10px)",
    transform: `translateX(${lineIn(i) ? 0 : lineDir[i]}px)`,
    transition: "opacity 1000ms var(--ease-unio), filter 1000ms var(--ease-unio), transform 1100ms var(--ease-unio)"
  });
  const ctaStatic = {
    opacity: lineIn(2) ? 1 : 0,
    transform: lineIn(2) ? "none" : "translateY(16px)",
    transition: "opacity 900ms var(--ease-unio), transform 900ms var(--ease-unio)"
  };
  // Scroll → Hero wird vollflächig: Pudding + Radius kollabieren
  const bleed = RMx ? 0 : Math.min(1, sy / 320);
  const pad = (v, to) => to === undefined ? Math.round(v * (1 - bleed)) : Math.round(v + (to - v) * bleed);
  const panelStyle = (i, f) => ({
    position: "relative",
    overflow: "hidden",
    aspectRatio: "3 / 3.6",
    background: "var(--paper-2)",
    boxShadow: "inset 0 0 0 1px var(--ink-3)",
    borderRadius: 6,
    opacity: panelIn(i) ? 1 : 0,
    transform: `translateY(${panelIn(i) ? 0 : 30}px)`,
    transition: "opacity 800ms var(--ease-unio), box-shadow 400ms"
  });
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    "data-screen-label": "Hero",
    style: {
      position: "sticky",
      top: 0,
      zIndex: 0,
      height: "100svh",
      overflow: "hidden",
      background: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("video", {
    ref: vidRef,
    poster: "../../assets/img/vienna-facades.jpg",
    muted: true,
    loop: true,
    autoPlay: true,
    playsInline: true,
    preload: "auto",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: `scale(${1 + (RMx ? 0 : sy * 0.0002)})`
    }
  }, /*#__PURE__*/React.createElement("source", {
    src: "../../assets/video/hero-fenster.webm",
    type: "video/webm"
  }), /*#__PURE__*/React.createElement("source", {
    src: "../../assets/video/hero-fenster.mp4",
    type: "video/mp4"
  })), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.55) 0%, rgba(11,10,9,0.15) 30%, rgba(11,10,9,0.2) 60%, rgba(11,10,9,0.55))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "absolute",
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 clamp(24px, 5vw, 96px)",
      opacity: 1 - bleed * 1.4
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "500 clamp(56px, 9vw, 168px)/0.92 var(--font-display)",
      letterSpacing: "-0.04em",
      color: "#FFFFFF",
      maxWidth: 1200
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      ...lineStyle(0)
    }
  }, "Real Estate"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      ...lineStyle(1)
    }
  }, "Finally Simple", /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: "0.14em",
      height: "0.14em",
      borderRadius: 4,
      background: "var(--signal)",
      marginLeft: "0.08em",
      verticalAlign: "baseline"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 520,
      margin: "clamp(24px, 3vh, 40px) 0 0",
      font: "400 clamp(17px, 1.7vw, 21px)/1.6 var(--font-display)",
      color: "rgba(247,245,241,0.9)",
      ...ctaStatic
    }
  }, "Von der Suche bis zum Verkauf: Wir verbinden Daten, Software und Menschen, um Immobilien klar, transparent und nahbar zu machen."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: "clamp(28px, 4vh, 44px)",
      flexWrap: "wrap",
      ...ctaStatic
    }
  }, /*#__PURE__*/React.createElement(Bx, {
    size: "lg",
    variant: "paper",
    knob: true,
    onClick: () => location.hash = "suche"
  }, "Immobilie finden"), /*#__PURE__*/React.createElement(Bx, {
    size: "lg",
    variant: "glass",
    tone: "dark",
    glyph: "\u25B7"
  }, "Wie es funktioniert"))));
}

/* ---------- Suche + Highlight-Immobilien (Endkunde zuerst) ---------- */
function SucheHighlights() {
  const [q, setQ] = React.useState("");
  const [hov, setHov] = React.useState(-1);
  const treffer = OBJEKT_DB.filter(o => !q.trim() || (o.q + " " + o.t + " " + o.loc).toLowerCase().includes(q.trim().toLowerCase()));
  const shown = treffer.slice(0, 3);
  return /*#__PURE__*/React.createElement("section", {
    id: "suche",
    "data-screen-label": "Suche",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 2,
      background: "var(--paper)",
      borderRadius: "28px 28px 0 0",
      marginTop: "-4vh",
      boxShadow: "0 -30px 60px -30px rgba(11,10,9,0.4)",
      padding: "150px 6vw 185px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Chapter, {
    title: /*#__PURE__*/React.createElement("span", null, "Finden Sie Ihr", /*#__PURE__*/React.createElement("br", null), "n\xE4chstes Zuhause."),
    copy: "Kuratierte Wiener Projekte und Einzelobjekte \u2014 jedes davon live und transparent vermarktet.",
    style: {
      marginBottom: 72
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      maxWidth: 680,
      background: "var(--surface-raised)",
      borderRadius: "var(--r-pill)",
      padding: "8px 8px 8px 24px",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      font: "15px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Bezirk, Projekt oder Objektart \u2014 z. B. Penthouse 1020",
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "none",
      font: "400 16px var(--font-display)",
      color: "var(--ink-2)"
    }
  }), /*#__PURE__*/React.createElement(Bx, {
    variant: "signal",
    knob: true,
    onClick: () => window.open(window.UNIO_SEARCH_URL + (q ? "&search=" + encodeURIComponent(q) : ""), "_blank")
  }, "Suchen")), q.trim() ? /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      marginTop: 14,
      color: "var(--text-muted)",
      fontSize: 10
    }
  }, treffer.length, " Treffer im Bestand") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      marginTop: 24
    }
  }, shown.map((o, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: o.t,
    delay: i * 90
  }, /*#__PURE__*/React.createElement(PropCard, {
    o: o,
    hov: hov === i,
    onHov: v => setHov(v === false ? -1 : i)
  }))), shown.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span 3",
      padding: "40px 0",
      color: "var(--text-muted)",
      font: "400 16px var(--font-display)"
    }
  }, "Kein Treffer im kuratierten Bestand \u2014 starten Sie die Suche im Dashboard ", /*#__PURE__*/React.createElement("a", {
    href: window.UNIO_SEARCH_URL,
    target: "_blank",
    rel: "noopener",
    style: {
      color: "var(--signal-deep)"
    }
  }, "app.unio.at \u2197"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 32,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Bx, {
    variant: "ghost",
    onClick: () => location.assign("immobilien.html")
  }, "Alle Immobilien ansehen"), /*#__PURE__*/React.createElement(Bx, {
    variant: "ghost",
    onClick: () => window.open(window.UNIO_BEWERTUNG_URL, "_blank")
  }, "Eigene Immobilie bewerten \u2197"))));
}

/* ---------- Statement + Zahlen ---------- */
function Markt() {
  return /*#__PURE__*/React.createElement("section", {
    id: "markt",
    "data-screen-label": "Markt",
    className: "u-grain",
    style: {
      background: "var(--paper-2)",
      padding: "160px 6vw 160px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
      gap: 64,
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(40px, 4.4vw, 76px)/1.02 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Echte Deals", /*#__PURE__*/React.createElement("br", null), "durch echte Daten.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 18px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 420
    }
  }, "Der Immobilienmarkt ist fragmentiert, analog, intransparent. UNIO legt eine Schicht Klarheit dar\xFCber \u2014 Marktdaten werden Entscheidungen, Entscheidungen werden Abverkauf.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 48,
      marginTop: 120,
      borderTop: "1px solid var(--hairline-dark)",
      paddingTop: 60
    }
  }, /*#__PURE__*/React.createElement(SBx, {
    value: 94,
    label: "Nachfrage-Score \xB7 Median",
    tone: "light",
    size: "clamp(84px, 8.4vw, 148px)"
  }), /*#__PURE__*/React.createElement(SBx, {
    value: 38,
    unit: "Tage",
    label: "bis Abverkauf \xB7 \xD8 Pilotprojekte",
    tone: "light",
    size: "clamp(84px, 8.4vw, 148px)",
    delta: "\u221241 %"
  }), /*#__PURE__*/React.createElement(SBx, {
    value: 1240,
    label: "K\xE4uferprofile im Matching",
    tone: "light",
    size: "clamp(84px, 8.4vw, 148px)"
  })));
}

/* ---------- Bauträger & CIRCLE abholen ---------- */
function Zielgruppen() {
  return /*#__PURE__*/React.createElement("section", {
    id: "zielgruppen",
    "data-screen-label": "Zielgruppen",
    className: "u-grain",
    style: {
      background: "var(--paper-2)",
      padding: "160px 5vw 180px"
    }
  }, /*#__PURE__*/React.createElement(Chapter, {
    title: /*#__PURE__*/React.createElement("span", null, "F\xFCr die, die den Markt", /*#__PURE__*/React.createElement("br", null), "bewegen."),
    style: {
      marginBottom: 76
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      background: "var(--signal)",
      borderRadius: "var(--r-panel)",
      padding: "clamp(32px, 4vw, 52px)",
      color: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      minHeight: 420
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.85)",
      fontSize: 10
    }
  }, "F\xFCr Bautr\xE4ger"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "18px 0 0",
      font: "500 clamp(28px, 2.6vw, 42px)/1.05 var(--font-display)",
      letterSpacing: "-0.03em"
    }
  }, "Wissen, was funktioniert", /*#__PURE__*/React.createElement("br", null), "bevor gebaut wird."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      font: "400 16px/1.6 var(--font-display)",
      color: "rgba(255,245,239,0.9)",
      maxWidth: 420
    }
  }, "Wir testen Ihr Projekt live am Markt, steuern Marketing und Vertrieb datenbasiert bis zum Abverkauf \u2014 100 % erfolgsbasiert."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      marginTop: 30,
      borderTop: "1px solid rgba(255,255,255,0.35)",
      paddingTop: 22
    }
  }, [["+31 %", "über Zielpreis · Ecoluxe"], ["282", "Anfragen · ein Projekt"], ["T+38", "Ø Abverkauf"]].map(([v, k]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 26px/1 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "#FFFFFF"
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.85)",
      fontSize: 9,
      marginTop: 7
    }
  }, k)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 28
    }
  }, /*#__PURE__*/React.createElement(Bx, {
    variant: "paper",
    size: "lg",
    knob: true,
    onClick: () => location.assign("bautraeger.html")
  }, "Projekt pr\xFCfen lassen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--r-panel)",
      overflow: "hidden",
      minHeight: 420
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/lifestyle-wine.jpg",
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.2), rgba(11,10,9,0.62))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "clamp(32px, 4vw, 52px)",
      color: "var(--text-inverse)",
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-inverse-muted)",
      fontSize: 10
    }
  }, "F\xFCr Makler:innen \xB7 CIRCLE"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "18px 0 0",
      font: "500 clamp(28px, 2.6vw, 42px)/1.05 var(--font-display)",
      letterSpacing: "-0.03em",
      textShadow: "0 2px 24px rgba(0,0,0,0.4)"
    }
  }, "Nicht die Agentur.", /*#__PURE__*/React.createElement("br", null), "Nicht das Portal. Du."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      font: "400 16px/1.6 var(--font-display)",
      color: "rgba(247,245,241,0.85)",
      maxWidth: 400
    }
  }, "Behalte deine Provision, bau deine eigene Marke \u2014 mit Software, Dealflow und echter Unternehmensbeteiligung f\xFCr Top-Performer."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 28,
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Bx, {
    variant: "glass",
    tone: "dark",
    size: "lg",
    knob: true,
    onClick: () => location.assign("makler.html")
  }, "CIRCLE entdecken"))))));
}

/* ---------- Produkte ---------- */
const PRODUKTE = [["NOVA", "Marktvalidierung in Echtzeit. NOVA zeigt, ob Projekt, Pricing oder Grundrisse den Nerv der Zielgruppe treffen — und liefert datenbasierte Handlungsempfehlungen für fundierte Entscheidungen schon vor dem Verkaufsstart."], ["CIRCLE", "Circle verbindet die besten Makler:innen zu einer leistungsorientierten Community. Selbstständig im Handeln, aber mit dem Rückhalt eines starken Netzwerks — inklusive High-End-Software, Support und Beteiligung."], ["LEAD ENGINE", "Skalierbare Leadgenerierung über die relevanten Kanäle — mit sauberem Tracking, kreativer Iteration und einem Setup, das Nachfrage in planbaren Vertrieb übersetzt."], ["LENS", "Lens liefert volle Transparenz über Projekte, Leads und Vertriebsperformance. Von der Planung bis zum Abschluss zeigt das Dashboard alle relevanten Daten in Echtzeit — für präzise Steuerung und bessere Ergebnisse."]];
function Produkte() {
  const [hov, setHov] = React.useState(-1);
  return /*#__PURE__*/React.createElement("section", {
    id: "produkte",
    "data-screen-label": "Produkte",
    className: "u-grain",
    style: {
      background: "var(--paper)",
      padding: "175px 6vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      maxWidth: 900,
      margin: "0 auto 80px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "8px 16px",
      borderRadius: "var(--r-pill)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 13,
      height: 13,
      borderRadius: "50%",
      border: "2px solid var(--signal)",
      borderRightColor: "transparent",
      transform: "rotate(-45deg)"
    }
  }), "Produkte"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "26px 0 0",
      font: "500 clamp(36px, 4.6vw, 76px)/1.04 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "High-End-Software und", /*#__PURE__*/React.createElement("br", null), "Community vereint."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "26px auto 0",
      font: "400 17px/1.7 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 520
    }
  }, "Eine Plattform, die Daten, Workflows und ein Broker-Netzwerk verbindet \u2014 f\xFCr planbaren Abverkauf und messbare Performance.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 20
    }
  }, PRODUKTE.map(([t, c], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t,
    delay: i * 90
  }, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHov(i),
    onMouseLeave: () => setHov(-1),
    style: {
      height: "100%",
      background: "#FFFFFF",
      borderRadius: "var(--r-card)",
      padding: "34px 30px 40px",
      boxShadow: hov === i ? "inset 0 0 0 1px var(--hairline-dark), var(--shadow-soft)" : "inset 0 0 0 1px var(--hairline-dark)",
      transform: hov === i ? "translateY(-4px)" : "none",
      transition: "all var(--dur-fast) var(--ease-unio)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "500 26px/1 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)"
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--signal)",
      opacity: hov === i ? 1 : 0,
      transition: "opacity var(--dur-fast) var(--ease-unio)"
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "28px 0 0",
      font: "400 14px/1.7 var(--font-display)",
      color: "var(--text-muted)"
    }
  }, c))))));
}

/* ---------- Produkte-Ende ---------- */
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)"
    }
  }, /*#__PURE__*/React.createElement(SiteNav, {
    active: "index.html"
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(SucheHighlights, null), /*#__PURE__*/React.createElement(Markt, null), /*#__PURE__*/React.createElement(Produkte, null), /*#__PURE__*/React.createElement(window.SystemBento, null), /*#__PURE__*/React.createElement(Zielgruppen, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/homepage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/page-bautraeger.jsx
try { (() => {
/* UNIO — Bauträger v3 (Korrektur-Briefing 04.07.): 10 Kapitel, variierte Architekturen.
   01 Split-Hero · 02 Treppen-Statement · 03 Beweis · 04 Pipeline (bt-system) ·
   05 Lernkurve (bt-system) · 06 Nutzen-Bento · 07 100 % · 08 Simulator ·
   09 Einwände · 10 Strecke + Funnel. Tracking-Events: data-track. */
const {
  GlassPanel: GPb,
  FlutedGlass: FGb,
  StatBlock: SBb,
  DataLabel: DLb,
  Button: Bb,
  IconButton: IBb,
  Tag: Tgb
} = window.UNIODesignSystem_b6216a;
const {
  SiteNav,
  SiteFooter,
  Reveal
} = window;
const {
  Kap,
  GridLines,
  StickyCTA,
  SystemLine,
  Lernkurve,
  CountUp,
  useOnceInView,
  Fx,
  BT_EASE
} = window.BT;

/* ===== Bridge-Störer (Direktive v2): reines Duotone-Foto-Band, ohne Overlay, ohne Text ===== */
function BridgeBt({
  img
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Bridge",
    style: {
      position: "relative",
      height: "56vh",
      minHeight: 380,
      overflow: "hidden",
      background: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }));
}
Object.assign(window, {
  BridgeBt
});

/* ===== 01 · HERO — Split, Klarheits-Reveal als Lade-Choreografie ===== */
function DockPoint({
  top,
  right,
  label,
  show,
  delay
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top,
      right,
      display: "flex",
      alignItems: "center",
      opacity: show ? 1 : 0,
      transform: show ? "none" : "translateY(10px)",
      transition: `all 700ms ${BT_EASE} ${delay}ms`
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 40,
      height: 1,
      background: "var(--hairline-light-strong)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 10,
      color: "var(--text-inverse)",
      background: "var(--glass-dark)",
      WebkitBackdropFilter: "blur(14px)",
      backdropFilter: "blur(14px)",
      padding: "8px 13px",
      borderRadius: "var(--r-pill)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light)",
      whiteSpace: "nowrap"
    }
  }, label));
}
function HeroBt() {
  const [reveal, setReveal] = React.useState(window.BT.BT_RM ? 1 : 0.06);
  const [docked, setDocked] = React.useState(window.BT.BT_RM);
  React.useEffect(() => {
    if (window.BT.BT_RM) return;
    const t1 = setTimeout(() => setReveal(1), 400);
    const t2 = setTimeout(() => setDocked(true), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    "data-track": "chapter_view_01",
    "data-screen-label": "Hero",
    style: {
      position: "relative",
      background: "var(--paper)",
      padding: "98px 40px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 52fr) minmax(0, 48fr)",
      minHeight: "calc(100svh - 120px)",
      borderRadius: 22,
      overflow: "hidden",
      border: "0.5px solid var(--hairline-dark)",
      boxShadow: "0 1px 0 rgba(255,255,255,.6) inset"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "175px 4vw 120px 7vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-herglow",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-14%",
      top: "8%",
      width: "60%",
      height: "80%",
      zIndex: 0,
      pointerEvents: "none",
      background: "radial-gradient(60% 60% at 20% 40%, rgba(255,170,9,.18) 0%, rgba(255,219,87,.09) 44%, transparent 72%)",
      animation: BT_RM ? "none" : "heroGlowDrift 30s ease-in-out infinite alternate"
    }
  }), /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "500 clamp(40px, 4.4vw, 76px)/1.02 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block"
    }
  }, "Wissen, was funktioniert"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginLeft: "8%",
      color: "transparent",
      WebkitTextStroke: "1.5px var(--ink)"
    }
  }, "bevor"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginLeft: "16%"
    }
  }, "gebaut wird", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, "."))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "24px 0 0 16%",
      font: "400 17px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 380,
      position: "relative"
    }
  }, "Markttest, Marketing und Vertrieb als ein datengesteuertes System."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 30,
      marginLeft: "16%",
      alignItems: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Bb, {
    size: "lg",
    knob: true,
    "data-track": "hero_cta_primary",
    onClick: () => location.hash = "funnel"
  }, "Projekt pr\xFCfen lassen"), /*#__PURE__*/React.createElement(Bb, {
    size: "lg",
    variant: "ghost",
    "data-track": "hero_cta_secondary",
    onClick: () => location.hash = "system"
  }, "So arbeiten wir"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      minHeight: 480
    }
  }, /*#__PURE__*/React.createElement(FGb, {
    reveal: reveal,
    side: "left",
    strength: 13,
    style: {
      position: "absolute",
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/albrecht.jpg",
    alt: "Das Albrecht \u2014 Townh\xE4user, Wien 1170",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement(DockPoint, {
    top: "18%",
    right: "8%",
    label: "Preisband kalibriert",
    show: docked,
    delay: 0
  }), /*#__PURE__*/React.createElement(DockPoint, {
    top: "42%",
    right: "16%",
    label: "Nachfrage-Score 72",
    show: docked,
    delay: 160
  }), /*#__PURE__*/React.createElement(DockPoint, {
    top: "64%",
    right: "7%",
    label: "Top 4 reserviert",
    show: docked,
    delay: 320
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 5,
      margin: "150px auto 130px",
      paddingTop: 60,
      borderTop: "1px solid var(--hairline-dark)",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 48,
      maxWidth: 1200
    }
  }, /*#__PURE__*/React.createElement(SBb, {
    value: "1 Mrd",
    label: "Projektvolumen in der Pipeline",
    tone: "light",
    size: "clamp(84px, 8.4vw, 148px)"
  }), /*#__PURE__*/React.createElement(SBb, {
    value: 100,
    unit: "%",
    label: "Transparenz durch UNIO Lens",
    tone: "light",
    size: "clamp(84px, 8.4vw, 148px)"
  }), /*#__PURE__*/React.createElement(SBb, {
    value: "1 Mrd",
    label: "Reichweite mit unseren Kampagnen",
    tone: "light",
    size: "clamp(84px, 8.4vw, 148px)"
  })));
}

/* ===== 02 · DAS PROBLEM — Treppen-Statement ===== */
const PROBLEME = [["01", "Testing & Positionierung", "Brand Sprint, Creative Testing und Zielgruppen-Cluster liefern eine validierte Story — für höhere Preisresilienz und bessere Nachfrage."], ["02", "Lead Engine", "Realtime Demand, messbar bis zur Anfragequalität: KI-Qualifizierung, Intent Score und datenbasierte Sales-Execution bis zum Close."], ["03", "Circle", "Kuratierte Makler-Community (ab 100.000 € Jahresumsatz) sorgt für höhere Abschlussgeschwindigkeit, Fokus und messbar gesteuerten Vertrieb."], ["04", "Dashboard & Data Intelligence", "Live-Pipeline, Unit-Status und Predictions in Echtzeit — plus Data Engine, die aus Projekten lernt und jedes nächste Launch besser macht."]];
function ProblemBt() {
  return /*#__PURE__*/React.createElement("section", {
    "data-track": "chapter_view_02",
    "data-screen-label": "System",
    className: "u-grain",
    style: {
      position: "relative",
      background: "var(--paper)",
      padding: "185px 7vw 160px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      marginBottom: 100,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(34px, 4vw, 64px)/1.06 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Projekte ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic"
    }
  }, "planbarer"), /*#__PURE__*/React.createElement("br", null), "und erfolgreicher machen."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px 0 0",
      font: "400 16px/1.7 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 500
    }
  }, "Bautr\xE4ger brauchen kein weiteres Tool \u2014 sondern ein System, das den gesamten Projektzyklus optimiert: von Positionierung und Nachfrage bis zur Vertriebs-Execution und Echtzeit-Steuerung.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, PROBLEME.map(([nr, t, m], i) => /*#__PURE__*/React.createElement(Fx, {
    key: nr,
    delay: i * 90
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "64px minmax(0, 1.2fr) minmax(0, 1fr)",
      gap: "0 40px",
      padding: "48px 0",
      borderTop: "1px solid var(--hairline-dark)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "14px var(--font-mono)",
      color: "var(--signal-deep)",
      paddingTop: 6
    }
  }, nr), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "500 clamp(24px, 2.6vw, 38px)/1.1 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 15px/1.7 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 380
    }
  }, m))))));
}

/* ===== 03 · DER BEWEIS — Formora-Slide + Treppen-Stats ===== */
function ProofBt() {
  const [ref, run] = useOnceInView(0.3);
  const stats = [{
    v: 61,
    k: "Anfragen / 2 Wo. · Das Albrecht",
    off: 0
  }, {
    v: 27,
    k: "Anfragen / 2 Wo. · Beheim",
    off: 44
  }, {
    v: 40,
    k: "Anfragen nach Übernahme · Penthouse € 4 Mio",
    off: 88
  }, {
    v: 25,
    k: "hochqual. Anfragen / Wo. · ObenZwei",
    off: 132
  }];
  return /*#__PURE__*/React.createElement("section", {
    "data-track": "chapter_view_03",
    "data-screen-label": "Beweis",
    className: "u-grain",
    style: {
      position: "relative",
      background: "var(--paper-2)",
      padding: "175px 7vw 175px"
    }
  }, /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "03",
    label: "Beweis"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--r-panel)",
      overflow: "hidden",
      boxShadow: "var(--shadow-soft)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/ecoluxe-wide.jpg",
    alt: "Villa Ecoluxe",
    style: {
      display: "block",
      width: "100%",
      height: "min(70vh, 620px)",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.34), transparent 36%, transparent 58%, rgba(11,10,9,0.5))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 18,
      border: "1px solid rgba(255,255,255,0.34)",
      borderRadius: 14,
      pointerEvents: "none"
    }
  }), [["Case", "Villa Ecoluxe", {
    top: 34,
    left: 38
  }], ["Status", "Verkauft", {
    top: 34,
    right: 38,
    textAlign: "right"
  }, true], ["Vermarktung", "Vor Baustart getestet", {
    bottom: 34,
    left: 38
  }], ["Steuerung", "Live · LENS", {
    bottom: 34,
    right: 38,
    textAlign: "right"
  }]].map(([k, v, posi, sig]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      position: "absolute",
      color: "var(--text-inverse)",
      ...posi
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-inverse-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "16px var(--font-mono)",
      marginTop: 4,
      color: sig ? "var(--signal)" : "inherit"
    }
  }, v))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 38,
      right: 38,
      top: "45%",
      color: "var(--text-inverse)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(32px, 4vw, 64px)/1 var(--font-display)",
      letterSpacing: "-0.03em",
      textShadow: "0 2px 40px rgba(0,0,0,0.45)"
    }
  }, "Verkauft, bevor der", /*#__PURE__*/React.createElement("br", null), "Markt es glaubte."))), /*#__PURE__*/React.createElement("a", {
    href: "#funnel",
    "data-track": "inline_cta_beweis",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      marginTop: 72,
      font: "500 16px var(--font-display)",
      color: "var(--ink)",
      textDecoration: "none",
      borderBottom: "1px solid var(--hairline-dark)",
      paddingBottom: 4,
      position: "relative"
    }
  }, "Ihr Projekt so pr\xFCfen lassen ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13
    }
  }, "\u2192")));
}

/* ===== Lead-Funnel — UNIO-Effekt-Balken, horizontal, scrollgescrubbt (Briefing 06.07.) ===== */
const FUNNEL = [{
  n: "Angefragt",
  conv: 100,
  orange: 75,
  drv: "Meta & Google",
  up: "+75%"
}, {
  n: "Qualifiziert",
  conv: 52,
  orange: 38,
  drv: "Iteratives Testing",
  up: "+38%"
}, {
  n: "Besichtigt",
  conv: 34,
  orange: 44,
  drv: "CIRCLE-Community",
  up: "+44%"
}, {
  n: "Angebot gelegt",
  conv: 16,
  orange: 48,
  drv: "CIRCLE-Community",
  up: "+48%"
}, {
  n: "Kaufvertrag",
  conv: 3,
  orange: 52,
  drv: "CIRCLE-Community",
  up: "+52%"
}];
function FunnelGraphBt() {
  const secRef = React.useRef(null);
  const [p, setP] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = secRef.current;
      if (!el) return;
      setP(Math.max(0, Math.min(1, (scrollY - el.offsetTop) / (el.offsetHeight - innerHeight))));
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    return () => removeEventListener("scroll", on);
  }, []);
  const back = x => {
    const c = 1.7;
    return x < 0 ? 0 : x > 1 ? 1 : 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
  };
  return /*#__PURE__*/React.createElement("section", {
    ref: secRef,
    "data-track": "chapter_view_03b",
    "data-screen-label": "Funnel",
    style: {
      height: BT_RM ? "auto" : "250vh",
      position: "relative",
      background: "var(--paper-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: BT_RM ? "relative" : "sticky",
      top: 0,
      minHeight: "100svh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "150px 7vw 90px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: "3%",
      top: "12%",
      font: "500 clamp(120px, 20vw, 300px)/0.8 var(--font-display)",
      letterSpacing: "-0.05em",
      color: "transparent",
      WebkitTextStroke: "1px rgba(11,10,9,0.06)",
      pointerEvents: "none",
      userSelect: "none"
    }
  }, "Vertrieb"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: 640,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(30px, 3.4vw, 54px)/1.06 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Performance Marketing & Demand"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      font: "400 16px/1.7 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 520
    }
  }, "Skalierbare Leadgenerierung \xFCber die relevanten Kan\xE4le \u2014 mit sauberem Tracking, kreativer Iteration und einem Setup, das Nachfrage in planbaren Vertrieb \xFCbersetzt.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      gap: 22,
      justifyContent: "flex-end",
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      font: "11px var(--font-mono)",
      letterSpacing: "0.06em",
      color: "var(--signal-deep)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 3,
      background: "var(--signal)"
    }
  }), "Durch UNIO \u2014 der Zuwachs"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      font: "11px var(--font-mono)",
      letterSpacing: "0.06em",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 3,
      background: "#FFFFFF",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)"
    }
  }), "Basis")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: "clamp(12px, 2vw, 28px)",
      alignItems: "end",
      height: "clamp(300px, 44vh, 460px)"
    }
  }, FUNNEL.map((f, i) => {
    const win = BT_RM ? 1 : back(Math.max(0, Math.min(1, (p - i * 0.13) / 0.5)));
    const h = f.conv / 100 * 100 * win;
    const orangeH = f.orange;
    return /*#__PURE__*/React.createElement("div", {
      key: f.n,
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        justifyContent: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "500 12px var(--font-mono)",
        color: "var(--signal-deep)",
        marginBottom: 8,
        opacity: win
      }
    }, f.up), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "500 clamp(28px, 3.4vw, 52px)/1 var(--font-display)",
        letterSpacing: "-0.03em",
        color: "var(--ink)",
        marginBottom: 12
      }
    }, Math.round(f.conv * win), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.4em"
      }
    }, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: "100%",
        height: h + "%",
        minHeight: win > 0.02 ? 6 : 0,
        borderRadius: "8px 8px 0 0",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
        transition: BT_RM ? "none" : "height 80ms linear",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: orangeH + "%",
        background: "var(--signal)",
        position: "relative"
      }
    }, i === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 56,
        background: "#E8971A",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        font: "9px var(--font-mono)",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("span", null, "Meta"), /*#__PURE__*/React.createElement("span", null, "56%")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 19,
        background: "#F0A83F",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        font: "9px var(--font-mono)",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("span", null, "Google"), /*#__PURE__*/React.createElement("span", null, "19%")))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1.5px dashed rgba(11,10,9,0.4)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: "#FFFFFF",
        position: "relative"
      }
    }, i === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 19,
        borderBottom: "1px solid var(--hairline-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        font: "9px var(--font-mono)",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "willhaben"), /*#__PURE__*/React.createElement("span", null, "19%")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        font: "9px var(--font-mono)",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "ImmoScout24"), /*#__PURE__*/React.createElement("span", null, "6%"))))), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "500 14px var(--font-display)",
        color: "var(--ink)",
        marginTop: 14
      }
    }, f.n), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "9.5px var(--font-mono)",
        letterSpacing: "0.08em",
        color: "var(--text-muted)",
        marginTop: 5
      }
    }, f.drv));
  })), /*#__PURE__*/React.createElement("p", {
    className: "u-label",
    style: {
      marginTop: 32,
      color: "var(--text-muted)",
      fontSize: 10
    }
  }, "[PLATZHALTER: echte Splits & Uplift-% \u2014 an Live-Daten koppeln]")));
}

/* ===== 06 · NUTZEN-BENTO (der einzige Karten-Moment) ===== */
function NCard({
  span = 2,
  tone = "light",
  title,
  copy,
  children
}) {
  const bg = tone === "dark" ? "var(--ink)" : tone === "orange" ? "var(--signal)" : "#FFFFFF";
  const fg = tone === "dark" ? "var(--text-inverse)" : tone === "orange" ? "#FFFFFF" : "var(--ink)";
  const muted = tone === "dark" ? "var(--text-inverse-muted)" : tone === "orange" ? "rgba(255,245,239,0.85)" : "var(--text-muted)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: `span ${span}`,
      background: bg,
      borderRadius: "var(--r-card)",
      padding: "24px 24px 22px",
      boxShadow: tone === "light" ? "inset 0 0 0 1px var(--hairline-dark)" : "var(--shadow-float)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      minHeight: 230
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 19px/1.2 var(--font-display)",
      letterSpacing: "-0.02em",
      color: fg
    }
  }, title), copy && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 13.5px/1.55 var(--font-display)",
      color: muted,
      maxWidth: "40ch"
    }
  }, copy), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 12
    }
  }, children));
}
const nChip = {
  font: "500 12px var(--font-display)",
  padding: "6px 11px",
  borderRadius: "var(--r-pill)",
  background: "var(--signal-soft)",
  color: "var(--signal-deep)",
  boxShadow: "inset 0 0 0 1px rgba(255,170,9,0.35)",
  display: "inline-flex",
  alignItems: "center",
  gap: 6
};
function BentoBt() {
  const [ref, run] = useOnceInView(0.2);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-track": "chapter_view_06",
    "data-screen-label": "Nutzen",
    style: {
      position: "relative",
      background: "#FFFFFF",
      padding: "175px 7vw 175px"
    }
  }, /*#__PURE__*/React.createElement(Kap, {
    nr: "06",
    label: "Nutzen"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement(Fx, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(36px, 3.8vw, 64px)/1.02 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Was Sie davon haben."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(NCard, {
    span: 4,
    tone: "orange",
    title: "Schneller zur Vorverwertungsquote.",
    copy: "Vorgemerkte Nachfrage zahlt direkt auf die von Banken geforderte Vorverkaufsquote ein \u2014 fr\xFChere Finanzierungsfreigabe, fr\xFCherer Baustart."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 52px/1 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "#FFFFFF",
      fontVariantNumeric: "tabular-nums"
    }
  }, /*#__PURE__*/React.createElement(CountUp, {
    to: 1240,
    run: run,
    fmt: v => v.toLocaleString("de-AT")
  })), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.85)",
      fontSize: 9
    }
  }, "K\xE4uferprofile im Matching"))), /*#__PURE__*/React.createElement(NCard, {
    span: 2,
    title: "CIRCLE \u2014 kuratierter Vertrieb.",
    copy: "Top-Makler-Community ab \u20AC 100.000 Jahresumsatz schlie\xDFt schneller ab, gesteuert statt gehofft."
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 44px/1 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--signal-deep)",
      fontVariantNumeric: "tabular-nums"
    }
  }, "25+"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "block",
      marginTop: 8,
      fontSize: 9,
      color: "var(--text-muted)"
    }
  }, "Top-Performer im Pool")), /*#__PURE__*/React.createElement(NCard, {
    span: 2,
    title: "Standzeit kostet Zinsen.",
    copy: "Jeder Monat weniger Vermarktungsdauer senkt die Zwischenfinanzierung \u2014 Tempo als Euro-Gr\xF6\xDFe, nicht als Marketing-Wort."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 46",
    style: {
      width: "100%",
      maxWidth: 200,
      height: "auto"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "4,8 40,14 76,12 112,24 148,30 192,40",
    fill: "none",
    stroke: "rgba(11,10,9,0.3)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "192",
    cy: "40",
    r: "3.5",
    fill: "var(--signal)"
  }))), /*#__PURE__*/React.createElement(NCard, {
    span: 2,
    title: "Der Mix wird getestet, bevor er gebaut wird.",
    copy: "Grundrisse, Preisband und Zielgruppen am echten Markt validiert \u2014 weniger Umplanung, weniger Margen-Risiko."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, ["Preisband", "Grundrisse", "Zielgruppen"].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: nChip
  }, c)))), /*#__PURE__*/React.createElement(NCard, {
    span: 2,
    title: "Absagen flie\xDFen zur\xFCck ins Projekt.",
    copy: "Besichtigungs- und Absage-Gr\xFCnde als strukturierter R\xFCckkanal f\xFCr Ausstattungs- und Preisentscheidungen."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 40",
    style: {
      width: 130,
      height: "auto"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 12 H150 a20 20 0 0 1 0 24 H60",
    fill: "none",
    stroke: "rgba(11,10,9,0.3)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M70 28 60 36l10 8",
    fill: "none",
    stroke: "var(--signal)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    transform: "translate(0,-8)"
  }))), /*#__PURE__*/React.createElement(NCard, {
    span: 2,
    title: "Ein Ansprechpartner statt drei Schnittstellen.",
    copy: "Agentur, Makler und Portal-Koordination fallen in ein System \u2014 keine Reporting-Meetings, Sie sehen live."
  }), /*#__PURE__*/React.createElement(NCard, {
    span: 2,
    title: "CIRCLE verkauft, wo andere inserieren.",
    copy: "Vorgemerkte K\xE4ufer aus der kuratierten Community \u2014 Abschl\xFCsse oft, bevor das Projekt \xF6ffentlich wird."
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 40",
    style: {
      width: 110,
      height: "auto"
    },
    "aria-hidden": "true"
  }, [16, 40, 64, 88].map((x, i) => /*#__PURE__*/React.createElement("circle", {
    key: x,
    cx: x,
    cy: "20",
    r: "9",
    fill: "none",
    stroke: i === 3 ? "var(--signal)" : "rgba(11,10,9,0.3)",
    strokeWidth: "1.5"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "88",
    cy: "20",
    r: "3.5",
    fill: "var(--signal)"
  }))), /*#__PURE__*/React.createElement(NCard, {
    span: 2,
    title: "Nachfrage mit Substanz.",
    copy: "Zielgruppen nach Milieus statt Reichweite um jeden Preis."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, ["Eigennutzer", "1020–1220 Wien", "€ 0,6–1,8 Mio", "Familien & Paare"].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: nChip
  }, c))))));
}

/* ===== 07 · DAS MODELL — der große Zahlen-Moment ===== */
function ModellBt() {
  const [ref100, run100] = useOnceInView(0.35);
  return /*#__PURE__*/React.createElement("section", {
    "data-track": "chapter_view_07",
    "data-screen-label": "Modell",
    className: "u-grain",
    style: {
      position: "relative",
      background: "var(--paper)",
      padding: "175px 7vw 175px"
    }
  }, /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "07",
    label: "Modell"
  }), /*#__PURE__*/React.createElement("div", {
    ref: ref100,
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Fx, null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 clamp(110px, 18vw, 280px)/0.95 var(--font-display)",
      letterSpacing: "-0.05em",
      color: "transparent",
      WebkitTextStroke: "1.5px rgba(11,10,9,0.55)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(CountUp, {
    to: 100,
    run: run100
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      WebkitTextStroke: "0",
      color: "var(--signal)"
    }
  }, " %"))), /*#__PURE__*/React.createElement(Fx, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "20px 0 0",
      font: "500 clamp(26px, 2.6vw, 44px)/1.06 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "erfolgsbasiert. Null Risiko-Theater.")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 720,
      marginTop: 44,
      textAlign: "left"
    }
  }, [["Vergütung", "erfolgsbasiert am Abverkauf — kein Retainer"], ["Reporting", "entfällt — Sie sehen live (LENS)"], ["Markttest", "vor dem Baustart, am echten Markt"], ["Exit-Logik", "klare Meilensteine statt Bindungsfallen"]].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 24,
      padding: "16px 0",
      borderTop: i === 0 ? "none" : "1px solid var(--hairline-dark)",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 16px var(--font-display)",
      color: "var(--ink-2)",
      textAlign: "right"
    }
  }, v))))));
}

/* ===== 08 · SIMULATOR — Feinschliff + Soft-Conversion ===== */
function SimulatorBt() {
  const [einheiten, setEinheiten] = React.useState(12);
  const [leads, setLeads] = React.useState(400);
  const [mail, setMail] = React.useState("");
  const [pdfState, setPdfState] = React.useState("idle"); // idle | form | sent
  const RATES = [["Leads", 1], ["Qualifiziert", 0.3], ["Besichtigung", 0.084], ["Kauf", 0.025]];
  const kaufMonat = leads * 0.025;
  const monate = Math.max(1, Math.ceil(einheiten / kaufMonat));
  const mstr = String(monate);
  return /*#__PURE__*/React.createElement("section", {
    id: "simulator",
    "data-track": "chapter_view_08",
    "data-screen-label": "Simulator",
    className: "u-grain",
    style: {
      position: "relative",
      background: "var(--paper-2)",
      padding: "175px 7vw 175px"
    }
  }, /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "08",
    label: "Simulator"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      marginBottom: 76,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Fx, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(32px, 3.4vw, 56px)/1.03 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Rechnen Sie es", /*#__PURE__*/React.createElement("br", null), "selbst durch."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.15fr)",
      gap: 14,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      borderRadius: "var(--r-card)",
      padding: "28px 30px",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)"
    }
  }, [["Einheiten im Projekt", einheiten, 4, 60, 1, setEinheiten], ["Leads / Monat (Kampagne)", leads, 100, 1200, 50, setLeads]].map(([l, val, min, max, step, set]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      marginBottom: 24
    },
    "data-track": "simulator_interact"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)"
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 24px var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)",
      fontVariantNumeric: "tabular-nums"
    }
  }, val)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: val,
    onChange: e => set(+e.target.value),
    style: {
      width: "100%",
      marginTop: 14,
      accentColor: "#FFAA09"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--hairline-dark)",
      paddingTop: 16
    }
  }, RATES.map(([n, r], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: "grid",
      gridTemplateColumns: "175px 1fr 64px",
      gap: 12,
      alignItems: "center",
      padding: "7px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      fontSize: 10
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 4,
      background: "var(--paper-3)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: Math.max(3, r * 100) + "%",
      background: i === RATES.length - 1 ? "var(--signal)" : "var(--ink-3)",
      borderRadius: 4,
      transition: `width 400ms ${BT_EASE}`
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "12px var(--font-mono)",
      color: "var(--ink-2)",
      textAlign: "right"
    }
  }, Math.round(leads * r))))), /*#__PURE__*/React.createElement("p", {
    className: "u-label",
    style: {
      margin: "16px 0 0",
      color: "var(--text-muted)",
      fontSize: 10
    }
  }, "[PLATZHALTER: \u201EBenchmarks aus X Wiener Wohnbau-Kampagnen 2024\u20132026\" \u2014 Zahl folgt] \xB7 Arbeitswerte")), /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      background: "var(--signal)",
      borderRadius: "var(--r-card)",
      padding: "clamp(26px, 3vw, 38px)",
      color: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      boxShadow: "var(--shadow-float)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.85)",
      fontSize: 10
    }
  }, "Prognose Abverkauf"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 clamp(48px, 5vw, 84px)/1 var(--font-display)",
      letterSpacing: "-0.03em",
      marginTop: 16,
      fontVariantNumeric: "tabular-nums"
    }
  }, mstr.length < 2 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.3)"
    }
  }, "0"), mstr, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.38em",
      fontWeight: 400,
      marginLeft: 8
    }
  }, "Monate")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 32,
      marginTop: 22,
      borderTop: "1px solid rgba(255,255,255,0.35)",
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 24px/1 var(--font-display)",
      color: "#FFFFFF"
    }
  }, kaufMonat.toFixed(1)), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.85)",
      fontSize: 9,
      marginTop: 6
    }
  }, "K\xE4ufe / Monat")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 24px/1 var(--font-display)",
      color: "#FFFFFF"
    }
  }, einheiten), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.85)",
      fontSize: 9,
      marginTop: 6
    }
  }, "Einheiten"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      font: "400 13.5px/1.55 var(--font-display)",
      color: "rgba(255,245,239,0.92)",
      display: "flex",
      gap: 8,
      alignItems: "baseline"
    },
    title: "Qualitativer Zusammenhang \u2014 kein Zinssatz beziffert. Die konkrete Ersparnis h\xE4ngt von Ihrer Finanzierungsstruktur ab."
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.3",
    style: {
      flex: "none",
      transform: "translateY(2px)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 6.4v3.4M7 4.2v.2",
    strokeLinecap: "round"
  })), "Eingesparte Standzeit \u2248 eingesparte Zwischenfinanzierung."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 22
    }
  }, pdfState === "idle" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#funnel",
    "data-track": "simulator_cta",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      font: "500 15px var(--font-display)",
      color: "#FFFFFF",
      textDecoration: "none",
      borderBottom: "1px solid rgba(255,255,255,0.5)",
      paddingBottom: 3
    }
  }, "Mit echten Zahlen rechnen ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("button", {
    "data-track": "simulator_pdf",
    onClick: () => setPdfState("form"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      font: "400 13px var(--font-display)",
      color: "rgba(255,245,239,0.9)",
      fontFamily: "inherit",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, "Ergebnis mit Bezirks-Benchmarks als PDF")), pdfState === "form" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: mail,
    onChange: e => setMail(e.target.value),
    placeholder: "E-Mail f\xFCr den PDF-Versand",
    style: {
      flex: 1,
      font: "400 14px var(--font-display)",
      padding: "12px 14px",
      borderRadius: "var(--r-inner)",
      border: "none",
      outline: "none",
      background: "rgba(255,255,255,0.18)",
      color: "#FFFFFF",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)"
    }
  }), /*#__PURE__*/React.createElement(Bb, {
    variant: "paper",
    size: "sm",
    disabled: !mail.includes("@"),
    onClick: () => setPdfState("sent")
  }, "Senden")), pdfState === "sent" && /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "#FFFFFF",
      fontSize: 10
    }
  }, "PDF unterwegs \u2014 mit Bezirks-Benchmarks.")))));
}

/* ===== 09 · EINWÄNDE — Akkordeon (Granger) ===== */
const EINWAENDE = [["Was kostet es — und wann?", "100 % erfolgsbasiert: Wir verdienen am Abverkauf, nicht am Retainer — keine Setup-Kosten, kein monatliches Fixum. Unser Risiko liegt neben Ihrem."], ["Wie schnell sehen wir erste Daten?", "Der Markttest startet direkt nach der Unterlagen-Übergabe; erste Resonanzdaten liegen innerhalb des Testfensters vor. [PLATZHALTER: verbindliche Timeline]"], ["Was passiert mit unseren Bestandsmaklern?", "Ihre Bestandspartner bleiben eingebunden: CIRCLE ergänzt statt ersetzt, und die Zuordnung jeder Anfrage bleibt in LENS transparent nachvollziehbar. [PLATZHALTER: Details Partnermodell]"], ["Ist das bank- und beiratsfähig?", "Ja. Ihre Projektdaten bleiben Ihre, und die LENS-Auswertungen sind exportfähig — aufbereitet für Bank, Beirat und Gesellschafter."], ["Was, wenn das Projekt schon läuft?", "Ein Einstieg ist jederzeit möglich: Wir docken an den aktuellen Stand an und steuern ab dort datenbasiert weiter — auch mitten in der Vermarktung."], ["Wie steigen wir wieder aus?", "Über klare Meilensteine statt Bindungsfallen — definierte Exit-Punkte je Projektphase, vorab vereinbart."]];
function EinwaendeBt() {
  return /*#__PURE__*/React.createElement(window.FaqBlock, {
    nr: "09",
    label: "Fragen",
    title: /*#__PURE__*/React.createElement("span", null, "Was Sie", /*#__PURE__*/React.createElement("br", null), "wissen wollen."),
    subline: "Ehrliche Antworten \u2014 kein Kleingedrucktes.",
    items: EINWAENDE,
    anchor: {
      text: "Offene Frage? Wir rufen zurück — persönlich, nicht per Bot.",
      link: "Kontakt aufnehmen",
      img: "../../assets/team/portrait-02.jpg"
    }
  });
}

/* ===== 10 · FUNNEL — 3 Felder + Reassurance ===== */
function FunnelBt() {
  const [sent, setSent] = React.useState(false);
  const feld = {
    font: "400 15px var(--font-display)",
    padding: "15px 17px",
    borderRadius: "var(--r-inner)",
    border: "none",
    outline: "none",
    background: "#FFFFFF",
    color: "var(--ink-2)",
    boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
    width: "100%"
  };
  const selFeld = {
    ...feld,
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
    paddingRight: 40,
    fontFamily: "var(--font-display)",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235F5A54' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center"
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "funnel",
    "data-track": "chapter_view_10",
    "data-screen-label": "Funnel",
    className: "u-grain",
    style: {
      position: "relative",
      background: "var(--paper)",
      padding: "150px 7vw 185px"
    }
  }, /*#__PURE__*/React.createElement(Kap, {
    nr: "10",
    label: "Projekt pr\xFCfen"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680,
      margin: "0 auto",
      position: "relative",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Fx, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(30px, 3.2vw, 52px)/1.04 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Projekt pr\xFCfen lassen", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px auto 0",
      font: "400 16px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 520
    }
  }, "Unser Team pr\xFCft Ihr Projekt auf Marktresonanz, mit echten Daten, bevor Sie Budget binden.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      textAlign: "left",
      background: "var(--surface-raised)",
      borderRadius: "var(--r-card)",
      padding: "clamp(24px, 3vw, 36px)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "16px 0"
    },
    "data-track": "funnel_submit"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "var(--signal-soft)",
      color: "var(--signal-deep)",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m4 10.5 4 4 8-9"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 21px var(--font-display)",
      color: "var(--ink)",
      marginTop: 16
    }
  }, "Danke. Antwort in 48 h \u2014 mit Daten.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Name",
    style: feld
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "E-Mail",
    style: feld
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Firma (optional)",
    style: feld
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Telefon (optional)",
    style: feld
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Projekt-Standort \u2014 Bezirk oder Adresse",
    style: feld
  }), /*#__PURE__*/React.createElement("select", {
    defaultValue: "",
    style: selFeld
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Projektphase"), /*#__PURE__*/React.createElement("option", null, "Grundst\xFCck"), /*#__PURE__*/React.createElement("option", null, "Planung"), /*#__PURE__*/React.createElement("option", null, "Im Bau"), /*#__PURE__*/React.createElement("option", null, "Fertiggestellt"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("select", {
    defaultValue: "",
    style: selFeld
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Einheiten im Projekt"), /*#__PURE__*/React.createElement("option", null, "Unter 10"), /*#__PURE__*/React.createElement("option", null, "10\u201330"), /*#__PURE__*/React.createElement("option", null, "31\u201360"), /*#__PURE__*/React.createElement("option", null, "\xDCber 60")), /*#__PURE__*/React.createElement("select", {
    defaultValue: "",
    style: selFeld
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Geplanter Vermarktungsstart"), /*#__PURE__*/React.createElement("option", null, "Sofort"), /*#__PURE__*/React.createElement("option", null, "In 3\u20136 Monaten"), /*#__PURE__*/React.createElement("option", null, "In 6\u201312 Monaten"), /*#__PURE__*/React.createElement("option", null, "Sp\xE4ter / offen"))), /*#__PURE__*/React.createElement("input", {
    placeholder: "Projekt-Link oder Expos\xE9-PDF (optional)",
    style: feld
  }), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Kurzbeschreibung \u2014 Lage, Einheiten-Mix, Besonderheiten (optional)",
    rows: 3,
    style: {
      ...feld,
      resize: "vertical",
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18,
      flexWrap: "wrap",
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Bb, {
    variant: "signal",
    size: "lg",
    knob: true,
    onClick: () => setSent(true)
  }, "Projekt einreichen"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      fontSize: 10
    }
  }, "Vertraulich \xB7 Antwort in 48 h \xB7 mit Daten"))))));
}

/* ===== Referenz-Störer: Bild-Marquee mit Hover-Gap (Briefing 06.07.) ===== */
const STOERER_PROJ = [{
  img: "../../assets/img/ecoluxe.jpg",
  n: "Ecoluxe",
  b: "Wien 1190",
  g: "bars",
  d: [4, 6, 5, 8, 7, 9],
  cap: "Anfragen / Woche"
}, {
  video: "../../assets/video/hufhaus.mp4",
  img: "../../assets/img/vienna-garden.jpg",
  n: "Das Wimmer",
  b: "Wien-Umland",
  g: "ring",
  d: [72],
  cap: "Nachfrage-Index"
}, {
  img: "../../assets/img/beheim.jpg",
  n: "Das Beheim",
  b: "Wien 1170",
  g: "dots",
  d: [3],
  cap: "Vermarktungsphase"
}, {
  img: "../../assets/img/obenzwei.jpg",
  n: "ObenZwei",
  b: "Wien 1020",
  g: "bars",
  d: [3, 5, 4, 7, 6, 8],
  cap: "Anfragen / Woche"
}, {
  img: "../../assets/img/penthouse.jpg",
  n: "Origins",
  b: "Wien 1180",
  g: "ring",
  d: [64],
  cap: "Nachfrage-Index"
}, {
  img: "../../assets/img/albrecht.jpg",
  n: "Das Albrecht",
  b: "Wien 1170",
  g: "dots",
  d: [4],
  cap: "Vermarktungsphase"
}];
const PHASEN = ["Analyse", "Testing", "Kampagne", "Besichtigung", "Abschluss"];
function StoererGraphic({
  p
}) {
  const cap = {
    font: "8.5px var(--font-mono)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.82)"
  };
  if (p.g === "bars") {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-end",
        gap: 4,
        height: 24
      }
    }, p.d.map((v, k) => /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        flex: 1,
        height: v / 9 * 100 + "%",
        background: "rgba(255,255,255,0.9)",
        borderRadius: 1
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        ...cap,
        marginTop: 8
      }
    }, p.cap, " \xB7 steigend"));
  }
  if (p.g === "ring") {
    const C = 2 * Math.PI * 13;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "34",
      height: "34",
      viewBox: "0 0 30 30",
      style: {
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "15",
      cy: "15",
      r: "13",
      fill: "none",
      stroke: "rgba(255,255,255,0.3)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "15",
      cy: "15",
      r: "13",
      fill: "none",
      stroke: "#FFFFFF",
      strokeWidth: "2",
      strokeDasharray: C,
      strokeDashoffset: C * (1 - p.d[0] / 100),
      transform: "rotate(-90 15 15)",
      strokeLinecap: "round"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "500 16px/1 var(--font-display)",
        color: "#FFFFFF"
      }
    }, p.d[0], /*#__PURE__*/React.createElement("span", {
      style: {
        font: "9px var(--font-mono)",
        marginLeft: 2
      }
    }, "/100")), /*#__PURE__*/React.createElement("div", {
      style: {
        ...cap,
        marginTop: 5
      }
    }, p.cap)));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, PHASEN.map((_, k) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      width: k === p.d[0] ? 20 : 7,
      height: 7,
      borderRadius: 4,
      background: k <= p.d[0] ? "#FFFFFF" : "rgba(255,255,255,0.4)",
      transition: "all .4s"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...cap,
      marginTop: 8
    }
  }, p.cap, " \xB7 ", PHASEN[p.d[0]]));
}
function StoererBt() {
  const [hov, setHov] = React.useState(false);
  const [tip, setTip] = React.useState(-1);
  const [ref, run] = useOnceInView(0.2);
  const loop = STOERER_PROJ.concat(STOERER_PROJ);
  const first = STOERER_PROJ[0],
    last = STOERER_PROJ[STOERER_PROJ.length - 1];
  const words = "Der Vertrieb der Zukunft ist kein Inserat. Er ist ein System, das Nachfrage schafft, Makler vereint und alles sichtbar macht — in Echtzeit.".split(" ");
  const stRef = React.useRef(null);
  const [lit, setLit] = React.useState(BT_RM ? words.length : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = stRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, (innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.25)));
      setLit(Math.round(prog * words.length));
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    return () => removeEventListener("scroll", on);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Referenzen",
    className: "u-grain",
    style: {
      position: "relative",
      background: "var(--paper)",
      padding: "200px 0",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("p", {
    ref: stRef,
    style: {
      maxWidth: 1000,
      margin: "0 auto",
      padding: "0 7vw",
      textAlign: "center",
      font: "500 clamp(26px, 3vw, 52px)/1.3 var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, words.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      color: i < lit ? "var(--ink)" : "rgba(11,10,9,0.16)",
      transition: "color 300ms var(--ease-unio)"
    }
  }, w, i < words.length - 1 ? " " : ""))), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      marginTop: 130,
      overflow: "hidden",
      opacity: run ? 1 : 0,
      transition: "opacity 800ms var(--ease-unio)"
    },
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => {
      setHov(false);
      setTip(-1);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: hov ? 26 : 6,
      width: "max-content",
      animation: BT_RM ? "none" : "bMarquee 34s linear infinite",
      animationPlayState: hov ? "paused" : "running",
      transition: "gap .5s cubic-bezier(.32,.72,0,1)"
    }
  }, loop.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onMouseEnter: () => setTip(i),
    onMouseLeave: () => setTip(-1),
    style: {
      position: "relative",
      flex: "none",
      width: "clamp(210px, 22vw, 300px)",
      aspectRatio: "4 / 5",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "inset 0 0 0 0.5px var(--hairline-dark)",
      transform: tip === i ? "scale(1.02)" : "none",
      transition: "transform .5s cubic-bezier(.32,.72,0,1)"
    }
  }, p.video ? /*#__PURE__*/React.createElement("video", {
    src: p.video,
    poster: p.img,
    muted: true,
    loop: true,
    autoPlay: true,
    playsInline: true,
    preload: "auto",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      background: "var(--paper-3)"
    }
  }) : /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.n,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }), !p.plain && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.28) 0%, transparent 32%, transparent 58%, rgba(11,10,9,0.42))"
    }
  }), !p.plain && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 12,
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.5)",
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "14px 14px 12px",
      color: "#FFFFFF"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 18px/1 var(--font-display)",
      letterSpacing: "-0.01em"
    }
  }, p.n, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "10px var(--font-mono)",
      marginLeft: 6,
      verticalAlign: "2px"
    }
  }, "\u2197")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "9px var(--font-mono)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.82)",
      marginTop: 6
    }
  }, p.b)), /*#__PURE__*/React.createElement(StoererGraphic, {
    p: p
  })))))));
}
function BrandLaunchBt() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Brand",
    className: "u-grain",
    style: {
      position: "relative",
      background: "var(--paper)",
      padding: "185px 7vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--signal-deep)"
    }
  }, "Brand & Launch System"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px 0 0",
      font: "500 clamp(24px, 3vw, 46px)/1.32 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)",
      maxWidth: 620
    }
  }, "High-end Positionierung, Projektstory und eine digitale Pr\xE4senz auf Premium-Niveau \u2014 inklusive Homepage, Landingpages, Funnel und s\xE4mtlicher Vermarktungsunterlagen.")));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)"
    }
  }, /*#__PURE__*/React.createElement(SiteNav, {
    active: "bautraeger.html",
    cta: {
      label: "Projekt prüfen lassen",
      onClick: () => location.hash = "funnel"
    }
  }), /*#__PURE__*/React.createElement(HeroBt, null), /*#__PURE__*/React.createElement(StoererBt, null), /*#__PURE__*/React.createElement(ProblemBt, null), /*#__PURE__*/React.createElement(ProofBt, null), /*#__PURE__*/React.createElement(SystemLine, null), /*#__PURE__*/React.createElement(FunnelGraphBt, null), /*#__PURE__*/React.createElement(Lernkurve, null), /*#__PURE__*/React.createElement(BentoBt, null), /*#__PURE__*/React.createElement(ModellBt, null), /*#__PURE__*/React.createElement(window.ProjektStrecke, null), /*#__PURE__*/React.createElement(FunnelBt, null), /*#__PURE__*/React.createElement(EinwaendeBt, null), /*#__PURE__*/React.createElement(StickyCTA, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/page-bautraeger.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/page-immobilien.jsx
try { (() => {
/* UNIO — Immobilien (Sie-Register): „Ich suche" + „Ich verkaufe". */
const {
  GlassPanel: GPi,
  Button: Bi,
  Input: Ini,
  Select: Seli
} = window.UNIODesignSystem_b6216a;
const {
  SiteNav,
  SiteFooter,
  PageHero,
  Chapter,
  Reveal,
  PropCard,
  OBJEKT_DB
} = window;

/* Ich suche — Immobiliensuche (Filterleiste + Ergebnis-Grid, wie app.unio.at/listing) */
function SucheIm() {
  const [q, setQ] = React.useState("");
  const [typ, setTyp] = React.useState("Alle");
  const [bezirk, setBezirk] = React.useState("Alle");
  const [preis, setPreis] = React.useState("Alle");
  const [hov, setHov] = React.useState(-1);
  const typen = ["Alle", "Penthouse", "Haus", "Wohnung", "Neubau"];
  const priceVal = o => {
    const m = (o.price || "").match(/([\d.,]+)\s*Mio/);
    if (m) return parseFloat(m[1].replace(".", "").replace(",", ".")) * 1e6;
    const n = (o.price || "").replace(/[^\d]/g, "");
    return n ? +n : null;
  };
  const treffer = OBJEKT_DB.filter(o => {
    if (q.trim() && !(o.q + " " + o.t + " " + o.loc).toLowerCase().includes(q.trim().toLowerCase())) return false;
    if (typ !== "Alle" && !(o.tags.join(" ") + " " + o.q).toLowerCase().includes(typ.toLowerCase())) return false;
    if (bezirk !== "Alle" && !o.loc.includes(bezirk.replace("Wien ", ""))) return false;
    if (preis !== "Alle") {
      const v = priceVal(o);
      if (v == null) return false;
      if (preis === "bis 1 Mio" && v > 1e6) return false;
      if (preis === "1–2 Mio" && (v < 1e6 || v > 2e6)) return false;
      if (preis === "ab 2 Mio" && v < 2e6) return false;
    }
    return true;
  });
  const selStyle = {
    appearance: "none",
    WebkitAppearance: "none",
    font: "500 14px var(--font-display)",
    padding: "11px 34px 11px 16px",
    borderRadius: "var(--r-pill)",
    border: "none",
    cursor: "pointer",
    background: "var(--surface-raised)",
    color: "var(--ink-2)",
    boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
    outline: "none"
  };
  const wrapSel = (val, set, opts, label) => /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: val,
    onChange: e => set(e.target.value),
    style: selStyle
  }, opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o === "Alle" ? label : o))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      font: "11px var(--font-mono)",
      color: "var(--text-muted)",
      pointerEvents: "none"
    }
  }, "\u25BE"));
  return /*#__PURE__*/React.createElement("section", {
    id: "suche",
    className: "u-grain",
    style: {
      background: "var(--paper)",
      padding: "175px 6vw 175px"
    }
  }, /*#__PURE__*/React.createElement(Chapter, {
    title: /*#__PURE__*/React.createElement("span", null, "Ich suche."),
    copy: "Der aktuelle UNIO-Bestand \u2014 jedes Objekt live und transparent vermarktet.",
    style: {
      marginBottom: 72
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      maxWidth: 720,
      background: "var(--surface-raised)",
      borderRadius: "var(--r-pill)",
      padding: "8px 8px 8px 24px",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      font: "15px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "\u2192"), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Bezirk, Projekt oder Objektart",
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "none",
      font: "400 16px var(--font-display)",
      color: "var(--ink-2)"
    }
  }), /*#__PURE__*/React.createElement(Bi, {
    variant: "signal",
    knob: true,
    onClick: () => window.open(window.UNIO_SEARCH_URL, "_blank")
  }, "Zur App")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 18,
      alignItems: "center"
    }
  }, wrapSel(typ, setTyp, typen, "Objektart"), wrapSel(bezirk, setBezirk, ["Alle", "1020", "1040", "1170", "Innenstadt", "Umland"], "Bezirk"), wrapSel(preis, setPreis, ["Alle", "bis 1 Mio", "1–2 Mio", "ab 2 Mio"], "Preis"), (typ !== "Alle" || bezirk !== "Alle" || preis !== "Alle" || q) && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setQ("");
      setTyp("Alle");
      setBezirk("Alle");
      setPreis("Alle");
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      font: "500 13px var(--font-display)",
      color: "var(--signal-deep)",
      fontFamily: "inherit",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, "Zur\xFCcksetzen \xD7"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      marginLeft: "auto",
      color: "var(--text-muted)",
      fontSize: 10
    }
  }, treffer.length, " von ", OBJEKT_DB.length, " Objekten")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      marginTop: 28
    }
  }, treffer.map((o, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: o.t,
    delay: i % 3 * 70
  }, /*#__PURE__*/React.createElement(PropCard, {
    o: o,
    hov: hov === i,
    onHov: v => setHov(v === false ? -1 : i)
  }))), treffer.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span 3",
      padding: "48px 0",
      textAlign: "center",
      color: "var(--text-muted)",
      font: "400 16px var(--font-display)"
    }
  }, "Kein Treffer mit diesen Filtern \u2014 ", /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setQ("");
      setTyp("Alle");
      setBezirk("Alle");
      setPreis("Alle");
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      font: "inherit",
      color: "var(--signal-deep)",
      textDecoration: "underline"
    }
  }, "Filter zur\xFCcksetzen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Bi, {
    variant: "ghost",
    onClick: () => window.open(window.UNIO_SEARCH_URL, "_blank")
  }, "Alle Objekte in der App ansehen \u2197")));
}

/* Ich verkaufe — sechs Nutzen */
const NUTZEN = [["01", "Der richtige Preis", "Datenbasiert statt Bauchgefühl — Preisband aus echten Markt- und Nachfragedaten."], ["02", "Käufer, die passen", "Zielgruppen nach Milieu und Lebensphase — nicht nach Klick-Zufall."], ["03", "Verkauft, bevor es online geht", "Vorgemerkte Käufer-Community — auf Wunsch vollständig diskret."], ["04", "Vermarktung mit Wirkung", "Inszeniert statt nur inseriert — Story, Fotografie, Kampagne."], ["05", "Live-Transparenz", "Reichweite, Anfragen, Besichtigungen und Angebote in Echtzeit — Sie sehen alles."], ["06", "Sicher bis zum Notar", "Ein Ansprechpartner von der Bewertung bis zur Übergabe."]];
function VerkaufenIm() {
  return /*#__PURE__*/React.createElement("section", {
    id: "verkaufen",
    style: {
      background: "var(--paper-2)",
      padding: "175px 6vw 175px"
    },
    className: "u-grain"
  }, /*#__PURE__*/React.createElement(Chapter, {
    title: /*#__PURE__*/React.createElement("span", null, "Ich verkaufe."),
    copy: "Sechs Gr\xFCnde, warum Eigent\xFCmer:innen mit UNIO verkaufen \u2014 jeder davon belegbar.",
    style: {
      marginBottom: 84
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24
    }
  }, NUTZEN.map(([n, t, p], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: n,
    delay: i % 3 * 90
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-card)",
      padding: "26px 28px",
      background: "var(--surface-raised)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
      minHeight: 200
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "13px var(--font-mono)",
      color: "var(--signal-deep)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 20px/1.2 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)",
      marginTop: 30
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      font: "400 14.5px/1.6 var(--font-display)",
      color: "var(--text-muted)"
    }
  }, p))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--r-panel)",
      overflow: "hidden",
      marginTop: 64,
      minHeight: 420
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/obenzwei.jpg",
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(90deg, rgba(11,10,9,0.55), transparent 60%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "clamp(28px, 4vw, 52px)",
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement(GPi, {
    tone: "dark",
    padding: "26px 28px"
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-inverse-muted)",
      fontSize: 10
    }
  }, "Ihre Sicht in LENS \xB7 live"), [["Reichweite", "48 200"], ["Anfragen", "27"], ["Besichtigungen", "9"], ["Angebote", "2", true]].map(([k, v, sig], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "11px 0",
      borderTop: i === 0 ? "none" : "1px solid var(--hairline-light)",
      marginTop: i === 0 ? 12 : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-inverse-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "16px var(--font-mono)",
      color: sig ? "var(--signal)" : "var(--text-inverse)"
    }
  }, v)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 40,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Bi, {
    variant: "signal",
    size: "lg",
    knob: true,
    onClick: () => window.open(window.UNIO_BEWERTUNG_URL, "_blank")
  }, "Immobilie kostenlos bewerten"), /*#__PURE__*/React.createElement(Bi, {
    variant: "ghost",
    size: "lg",
    onClick: () => location.assign("kontakt.html")
  }, "Diskret verkaufen \u2014 Gespr\xE4ch")));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)"
    }
  }, /*#__PURE__*/React.createElement(SiteNav, {
    active: "immobilien.html"
  }), /*#__PURE__*/React.createElement(PageHero, {
    img: "../../assets/img/penthouse.jpg",
    pos: "center 40%",
    headline: /*#__PURE__*/React.createElement("span", null, "Suchen oder verkaufen"),
    sub: "Kuratierte Objekte f\xFCr Suchende. Volle Transparenz f\xFCr Eigent\xFCmer:innen."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Bi, {
    size: "lg",
    variant: "paper",
    knob: true,
    onClick: () => window.open(window.UNIO_BEWERTUNG_URL, "_blank")
  }, "Immobilie bewerten"), /*#__PURE__*/React.createElement(Bi, {
    size: "lg",
    variant: "glass",
    tone: "dark",
    onClick: () => location.hash = "suche"
  }, "Objekte ansehen"))), /*#__PURE__*/React.createElement(SucheIm, null), /*#__PURE__*/React.createElement(VerkaufenIm, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/page-immobilien.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/page-kontakt.jsx
try { (() => {
/* UNIO — Kontakt. Formular + direkte Wege. */
const {
  GlassPanel: GPk,
  Button: Bk,
  Input: Ink,
  Select: Selk,
  Checkbox: Chk
} = window.UNIODesignSystem_b6216a;
const {
  SiteNav,
  SiteFooter,
  Chapter
} = window;
function KontaktForm() {
  const [sent, setSent] = React.useState(false);
  const [einverst, setEinverst] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    className: "u-grain",
    style: {
      background: "var(--paper)",
      padding: "180px 6vw 120px",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Chapter, {
    title: /*#__PURE__*/React.createElement("span", null, "Sprechen wir.", /*#__PURE__*/React.createElement("br", null), "Mit Daten, nicht Floskeln."),
    copy: "Wir antworten innerhalb von 48 Stunden \u2014 mit einer ersten Einsch\xE4tzung, nicht mit einem Newsletter.",
    style: {
      marginBottom: 84
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
      gap: 48,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      borderRadius: "var(--r-card)",
      padding: "34px 36px",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "30px 0",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "var(--signal-soft)",
      color: "var(--signal-deep)",
      alignItems: "center",
      justifyContent: "center",
      font: "26px var(--font-mono)"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 22px var(--font-display)",
      color: "var(--ink)",
      marginTop: 18
    }
  }, "Danke. Sie h\xF6ren von uns."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      color: "var(--text-muted)",
      font: "400 15px var(--font-display)"
    }
  }, "Innerhalb von 48 Stunden, mit Daten.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Ink, {
    label: "Name",
    placeholder: "Vor- und Nachname"
  }), /*#__PURE__*/React.createElement(Ink, {
    label: "E-Mail",
    placeholder: "name@firma.at"
  })), /*#__PURE__*/React.createElement(Selk, {
    label: "Ich bin",
    options: ["Bauträger:in", "Makler:in", "Eigentümer:in", "Käufer:in"]
  }), /*#__PURE__*/React.createElement(Ink, {
    label: "Worum geht es?",
    placeholder: "Projekt, Objekt oder Frage \u2014 ein Satz gen\xFCgt"
  }), /*#__PURE__*/React.createElement(Chk, {
    label: "Ich bin einverstanden, dass UNIO mich kontaktiert.",
    checked: einverst,
    onChange: setEinverst
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Bk, {
    variant: "signal",
    size: "lg",
    knob: true,
    disabled: !einverst,
    onClick: () => setSent(true)
  }, "Nachricht senden")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, [["Demo buchen", "Live durch LENS und die Plattform — 30 Minuten.", "Demo anfragen"], ["Immobilie bewerten", "Kostenlos, datenbasiert, in 48 Stunden.", "Zur Bewertung ↗"], ["CIRCLE-Bewerbung", "Für Makler:innen mit Track-Record.", "Zur Makler-Seite"]].map(([t, p, cta], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      background: i === 0 ? "var(--signal)" : "var(--surface-raised)",
      color: i === 0 ? "#FFFFFF" : "var(--ink-2)",
      borderRadius: "var(--r-card)",
      padding: "24px 26px",
      boxShadow: i === 0 ? "var(--shadow-float)" : "inset 0 0 0 1px var(--hairline-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 19px var(--font-display)",
      letterSpacing: "-0.01em",
      color: i === 0 ? "#FFFFFF" : "var(--ink)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 14px",
      font: "400 14px/1.55 var(--font-display)",
      color: i === 0 ? "rgba(255,245,239,0.9)" : "var(--text-muted)"
    }
  }, p), /*#__PURE__*/React.createElement(Bk, {
    size: "sm",
    variant: i === 0 ? "paper" : "ghost",
    onClick: () => {
      if (i === 1) window.open(window.UNIO_BEWERTUNG_URL, "_blank");
      if (i === 2) location.assign("makler.html");
    }
  }, cta))), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      fontSize: 10,
      marginTop: 6
    }
  }, "UNIO \xB7 Wien \xB7 office@unio.at \xB7 app.unio.at"))));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)"
    }
  }, /*#__PURE__*/React.createElement(SiteNav, {
    active: "kontakt.html"
  }), /*#__PURE__*/React.createElement(KontaktForm, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/page-kontakt.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/page-makler.jsx
try { (() => {
/* UNIO — Makler / CIRCLE v2 (Korrektur-Briefing 04.07.): 9 Kapitel, Menschlichkeit als
   Gestaltungsprinzip. 01 Mensch-Raster-Hero · 02 Drei Fragen · 03 Gesichter des CIRCLE ·
   04 System-Bento (bento.jsx, makler-Variante) · 05 Admin-Porträt · 06 Rechner ·
   07 Beteiligung · 08 Bewegung (Ink) · 09 Schritte + Bewerbung. Du-Register. */
const {
  GlassPanel: GPm,
  Button: Bm
} = window.UNIODesignSystem_b6216a;
const {
  SiteNav,
  SiteFooter
} = window;
const {
  Kap,
  GridLines,
  Fx,
  CountUp,
  useOnceInView,
  BT_EASE,
  BT_RM
} = window.BT;

/* Raster-Zellen für den Hero-Dissolve (deterministisch) */
const MK_CELLS = [];
for (let c = 0; c < 6; c++) for (let r = 0; r < 11; r++) {
  const h = (r * 7 + c * 13) % 10 / 10;
  if (h < (c + 1) / 6 * 0.9) MK_CELLS.push([c, r, (r + c) % 2 === 0, (r * 5 + c * 3) % 19 === 0, (r + c) % 3]);
}

/* Sticky Micro-Pill „Bewerben" ab 50 % Scrolltiefe (Desktop) */
function MkSticky() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => {
      const max = document.body.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      setShow(innerWidth >= 900 && p > 0.5 && p < 0.92);
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);
  return /*#__PURE__*/React.createElement("a", {
    href: "#bewerben",
    "data-track": "sticky_cta",
    style: {
      position: "fixed",
      right: 20,
      bottom: 20,
      zIndex: 70,
      height: 44,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "0 20px",
      borderRadius: "var(--r-pill)",
      textDecoration: "none",
      background: "var(--glass-dark-2)",
      WebkitBackdropFilter: "blur(18px)",
      backdropFilter: "blur(18px)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light), var(--shadow-float)",
      color: "var(--text-inverse)",
      font: "500 14px var(--font-display)",
      opacity: show ? 1 : 0,
      transform: show ? "none" : "translateY(14px)",
      pointerEvents: show ? "auto" : "none",
      transition: `all var(--dur-fast) ${BT_EASE}`
    }
  }, "Bewerben ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12
    }
  }, "\u2192"));
}

/* ===== 01 · HERO — Mensch trifft Raster ===== */
function MkDock({
  top,
  label,
  show,
  delay
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top,
      left: 0,
      transform: "translateX(-40%)",
      display: "flex",
      alignItems: "center",
      opacity: show ? 1 : 0,
      transition: `opacity 700ms ${BT_EASE} ${delay}ms`,
      zIndex: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 10,
      color: "var(--text-inverse)",
      background: "var(--glass-dark)",
      WebkitBackdropFilter: "blur(14px)",
      backdropFilter: "blur(14px)",
      padding: "8px 13px",
      borderRadius: "var(--r-pill)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light)",
      whiteSpace: "nowrap"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 38,
      height: 1,
      background: "var(--hairline-light-strong)"
    }
  }));
}
function HeroMk() {
  const [docked, setDocked] = React.useState(BT_RM);
  React.useEffect(() => {
    if (BT_RM) return;
    const t = setTimeout(() => setDocked(true), 900);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    "data-track": "chapter_view_01",
    "data-screen-label": "Hero",
    style: {
      position: "sticky",
      top: 0,
      zIndex: 0,
      background: "var(--paper)",
      padding: "98px 40px 0"
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes mkDrift { from { transform: translateY(-4px); } to { transform: translateY(5px); } }`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 52fr) minmax(0, 48fr)",
      minHeight: "calc(100svh - 120px)",
      borderRadius: 22,
      overflow: "hidden",
      border: "0.5px solid var(--hairline-dark)",
      boxShadow: "0 1px 0 rgba(255,255,255,.6) inset"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "185px 4vw 120px 7vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-herglow",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-14%",
      top: "8%",
      width: "60%",
      height: "80%",
      zIndex: 0,
      pointerEvents: "none",
      background: "radial-gradient(60% 60% at 20% 40%, rgba(255,170,9,.18) 0%, rgba(255,219,87,.09) 44%, transparent 72%)",
      animation: BT_RM ? "none" : "heroGlowDrift 30s ease-in-out infinite alternate"
    }
  }), /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "500 clamp(40px, 4.4vw, 76px)/1.02 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)",
      position: "relative"
    }
  }, "Agent-First beginnt hier.", /*#__PURE__*/React.createElement("br", null), "Werde UNIO Partner", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "24px 0 0",
      font: "400 17px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 430,
      position: "relative"
    }
  }, "CIRCLE ist die Agent-First Community f\xFCr Top-Makler: mehr Netto, konstanter Dealflow, Personal Brand Growth und echte Ownership."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 30,
      flexWrap: "wrap",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Bm, {
    size: "lg",
    knob: true,
    "data-track": "hero_cta_primary",
    onClick: () => location.hash = "rechner"
  }, "Was bleibt f\xFCr dich? Zum Rechner"), /*#__PURE__*/React.createElement(Bm, {
    size: "lg",
    variant: "ghost",
    "data-track": "hero_cta_secondary",
    onClick: () => location.hash = "bewerben"
  }, "Jetzt bewerben"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: 480,
      background: "var(--paper-2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 32px 32px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: 420,
      borderRadius: "var(--r-panel)",
      overflow: "hidden",
      boxShadow: "var(--shadow-float)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/team/gruppe-serioes.jpg",
    alt: "Das UNIO Gr\xFCnderteam",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center top"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, transparent 45%, rgba(11,10,9,0.55))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      right: 16,
      bottom: 16,
      display: "flex",
      background: "var(--glass-dark)",
      WebkitBackdropFilter: "blur(20px)",
      backdropFilter: "blur(20px)",
      borderRadius: 16,
      boxShadow: "inset 0 0 0 1px var(--hairline-light)",
      overflow: "hidden",
      opacity: docked ? 1 : 0,
      transform: docked ? "none" : "translateY(12px)",
      transition: `all 700ms ${BT_EASE}`
    }
  }, [["100 %", "Provision"], ["Deine", "Marke"], ["Beteiligung", "möglich"]].map(([v, k], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1,
      padding: "14px 16px",
      borderLeft: i === 0 ? "none" : "1px solid var(--hairline-light)",
      color: "var(--text-inverse)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 18px/1 var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      fontSize: 8.5,
      color: "var(--text-inverse-muted)",
      marginTop: 5
    }
  }, k))))))));
}

/* ===== 02 · DIE DREI FRAGEN — gepinnt, große Hintergrundzahl 01→02→03 ===== */
const FRAGEN_MK = [["Warum gibst du die Hälfte ab", "an eine Marke, die nicht deine ist?"], ["Warum verwaltest du Papier", "statt Beziehungen zu führen?"], ["Warum baust du auf, was dir", "am Ende nicht gehört?"]];
const PILLARS_MK = [["01", "Ownership statt Abhängigkeit", "CIRCLE dreht das alte Margensystem um: Deine Provision gehört dir — und über das UNIO Share-Modell partizipierst du am Netzwerk, das du selbst mit aufbaust.", [["100 %", "Provision ab €150K p.a."], ["85 %", "Provision bis €150K p.a."]]], ["02", "Enablement durch Infrastruktur & Tech", "Statt Kontrolle: Enablement. Digitales Backoffice, KI-Portfoliomanagement, immersive Exposés, Smart Matching, intelligentes Lead Management, digitales Closing und KI-Telefonassistent.", [["8+", "Tech-Module"], ["~80 %", "weniger Admin"]]], ["03", "Unternehmertum mit Community-Power", "Du bleibst unabhängig und baust deine eigene Marke auf — aber nicht allein. Austausch, Standards, Zusammenarbeit und gemeinsames Momentum statt Einzelkämpfer-Modus.", [["20 %", "Gewinn-Ausschüttung"], ["49 %", "Share an Top-Performer"]]], ["04", "Projekt-Pipeline statt Zufalls-Dealflow", "Das UNIO-Akquise-Team holt exklusive, kuratierte Projekte. Alle Projekte werden aufbereitet, vom Inhouse-Marketing ins richtige Licht gerückt — und du bekommst vorqualifizierte Leads.", [["exklusiv", "kuratierter Dealflow"], ["25 %", "passiv aus Recruits"]]], ["05", "Deine Marketing-Superpower", "CIRCLE ist für Makler, die nicht „mitlaufen\" wollen. Individuelle Markenstrategie, Personal Branding und volle Content-Produktion unter deinem Namen.", [["3", "Kurzvideos / Monat"], ["10", "Fotos / Monat"]]]];
function FragenMk() {
  return /*#__PURE__*/React.createElement("section", {
    "data-track": "chapter_view_02",
    "data-screen-label": "Vorteile",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 2,
      background: "var(--paper)",
      padding: "150px 7vw 160px",
      borderRadius: "28px 28px 0 0",
      marginTop: -28,
      boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)"
    }
  }, /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "02",
    label: "Vorteile"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(34px, 3.8vw, 64px)/1.04 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "F\xFCnf Hebel, die dich", /*#__PURE__*/React.createElement("br", null), "skalieren lassen."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px 0 0",
      font: "400 17px/1.7 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 520
    }
  }, "CIRCLE kombiniert Einkommen, Dealflow, Growth und Ownership in einem Operating Model \u2014 damit du wie ein Unternehmer w\xE4chst, ohne deine Unabh\xE4ngigkeit zu verlieren.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, PILLARS_MK.map(([nr, t, c, stats], i) => /*#__PURE__*/React.createElement(Fx, {
    key: nr,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "64px minmax(0, 1.5fr) minmax(0, 1fr)",
      gap: "0 40px",
      padding: "56px 0",
      borderTop: "1px solid var(--hairline-dark)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "14px var(--font-mono)",
      color: "var(--signal-deep)",
      paddingTop: 6
    }
  }, nr), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "500 clamp(22px, 2.2vw, 30px)/1.15 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      font: "400 15px/1.7 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 460
    }
  }, c)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 36,
      justifyContent: "flex-end",
      alignItems: "baseline",
      flexWrap: "wrap"
    }
  }, stats.map(([v, k]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 clamp(30px, 3vw, 46px)/1 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--signal)"
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      fontSize: 9,
      color: "var(--text-muted)",
      marginTop: 8,
      maxWidth: 140
    }
  }, k)))))))));
}
/* CIRCLE-Antwort — eigener Beat, wortweise */
function AntwortMk() {
  const antwort = "CIRCLE ist die Antwort: eine kuratierte Community selbstständiger Makler:innen — mit Software, Dealflow und echter Beteiligung.".split(" ");
  const pRef = React.useRef(null);
  const [lit, setLit] = React.useState(BT_RM ? antwort.length : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = pRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const prog = oaClamp((innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.25));
      setLit(Math.round(prog * antwort.length));
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    return () => removeEventListener("scroll", on);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Antwort",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 2,
      background: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 8vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    ref: pRef,
    style: {
      margin: 0,
      font: "500 clamp(26px, 3vw, 52px)/1.3 var(--font-display)",
      letterSpacing: "-0.02em",
      maxWidth: 960,
      textAlign: "center"
    }
  }, antwort.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      color: i < lit ? "var(--ink)" : "rgba(11,10,9,0.16)",
      transition: "color 300ms var(--ease-unio)"
    }
  }, w, i < antwort.length - 1 ? " " : "")))));
}

/* ===== 03 · GESICHTER DES CIRCLE — Porträt-Datenkarten ===== */
function MkSpark({
  pts
}) {
  const max = Math.max(...pts),
    min = Math.min(...pts);
  const d = pts.map((p, i) => `${i / (pts.length - 1) * 100},${30 - (p - min) / (max - min) * 24}`).join(" ");
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 34",
    preserveAspectRatio: "none",
    style: {
      width: "100%",
      height: 22,
      display: "block",
      margin: "7px 0 5px"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: d,
    fill: "none",
    stroke: "var(--signal)",
    strokeWidth: "1.6",
    vectorEffect: "non-scaling-stroke"
  }));
}
const MK_FACES = [{
  img: "../../assets/team/portrait-01.jpg",
  pos: "center 22%",
  stat: "12 Abschlüsse",
  sub: "/25 · [PLATZHALTER]",
  spark: [2, 4, 3, 6, 8],
  off: 0
}, {
  img: "../../assets/team/portrait-02.jpg",
  pos: "center 20%",
  stat: "Seit 2024",
  sub: "im CIRCLE · [PLATZHALTER]",
  spark: [3, 5, 6, 6, 9],
  off: 32
}, {
  img: "../../assets/team/portrait-03.jpg",
  pos: "center 22%",
  stat: "1020–1220",
  sub: "Fokus Wien · [PLATZHALTER]",
  spark: [4, 3, 5, 7, 8],
  off: 64
}];
function GesichterMk() {
  return /*#__PURE__*/React.createElement("section", {
    "data-track": "chapter_view_03",
    "data-screen-label": "Gesichter",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 3,
      background: "var(--paper-2)",
      padding: "150px 7vw 175px",
      borderRadius: "28px 28px 0 0",
      marginTop: -28,
      boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)"
    }
  }, /*#__PURE__*/React.createElement(Kap, {
    nr: "03",
    label: "Gesichter"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 20,
      flexWrap: "wrap",
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(32px, 3.4vw, 56px)/1.04 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Gesichter des CIRCLE."), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)"
    }
  }, "Kuratiert \xB7 Wien zuerst")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
      alignItems: "start"
    }
  }, MK_FACES.map((f, i) => /*#__PURE__*/React.createElement(Fx, {
    key: f.stat,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: f.off,
      position: "relative",
      aspectRatio: "3 / 4",
      borderRadius: "var(--r-card)",
      overflow: "hidden",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: f.img,
    alt: "CIRCLE-Partner:in",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: f.pos
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.05), transparent 42%, rgba(11,10,9,0.5))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 12,
      borderRadius: "var(--r-inner)",
      background: "var(--glass-dark)",
      WebkitBackdropFilter: "blur(14px)",
      backdropFilter: "blur(14px)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light)",
      padding: "12px 14px",
      color: "var(--text-inverse)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 20px/1 var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, f.stat, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "11px var(--font-mono)",
      marginLeft: 6,
      color: "var(--signal)"
    }
  }, "\u2197")), /*#__PURE__*/React.createElement(MkSpark, {
    pts: f.spark
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 8,
      color: "var(--text-inverse-muted)"
    }
  }, f.sub))))), /*#__PURE__*/React.createElement(Fx, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      aspectRatio: "3 / 4",
      borderRadius: "var(--r-card)",
      background: "var(--signal)",
      color: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "22px 22px 20px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: "#FFFFFF",
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 20px/1.25 var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, "Die ersten Pl\xE4tze im CIRCLE werden gerade vergeben \u2014 deiner?"), /*#__PURE__*/React.createElement("a", {
    href: "#bewerben",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      marginTop: 16,
      font: "500 14px var(--font-display)",
      color: "#FFFFFF",
      textDecoration: "none"
    }
  }, "Bewerben ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12
    }
  }, "\u2192"))))));
}

/* ===== 04b · OBJEKTANLAGE, LIVE — gepinnte Verwandlungs-Sequenz (Briefing v2) ===== */
const OA_DOCS = ["BAB", "GRUNDRISSE", "ENERGIEAUSWEIS", "GRUNDBUCHSAUSZUG", "FOTOS", "NUTZWERTGUTACHTEN"];
const OA_START = [[-30, 14, -9], [118, 8, 7], [-26, 64, 6], [116, 68, -6], [-32, 40, 4], [120, 38, -8]];
const OA_MID = [[38, 30, -5], [50, 26, 6], [42, 46, 3], [54, 44, -7], [36, 38, 8], [52, 36, -3]];
const OA_ASSETS = ["EXPOSÉ", "ONLINE-INSERAT", "BROSCHÜRE", "FALTSCHILD / BAUTAFEL"];
const oaClamp = v => Math.min(1, Math.max(0, v));
function OaDocIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "17",
    viewBox: "0 0 14 17",
    fill: "none",
    stroke: "var(--ink-2)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1h8l4 4v11H1z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 1v4h4"
  }));
}
function ObjektanlageMk() {
  const [ref, p] = window.usePinProgress();
  if (BT_RM) {
    /* reduced-motion: statisches Vorher/Nachher-Diptychon */
    return /*#__PURE__*/React.createElement("section", {
      id: "objektanlage",
      "data-screen-label": "Objektanlage",
      className: "u-grain",
      style: {
        background: "var(--paper)",
        padding: "175px 7vw"
      }
    }, /*#__PURE__*/React.createElement(Kap, {
      nr: "04b",
      label: "Objektanlage"
    }), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: "0 0 40px",
        font: "500 clamp(30px, 3.2vw, 52px)/1.05 var(--font-display)",
        letterSpacing: "-0.03em",
        color: "var(--ink)"
      }
    }, "Objektanlage, live."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: 24,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 10
      }
    }, OA_DOCS.map(d => /*#__PURE__*/React.createElement("span", {
      key: d,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 16px",
        borderRadius: 10,
        background: "var(--surface-raised)",
        boxShadow: "inset 0 0 0 1px var(--ink-3)",
        font: "10px var(--font-mono)",
        letterSpacing: "0.1em"
      }
    }, /*#__PURE__*/React.createElement(OaDocIcon, null), d))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 120,
        height: 120,
        borderRadius: 14,
        overflow: "hidden",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(window.SignalRaster, {
      cols: 5,
      rows: 5
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 10
      }
    }, OA_ASSETS.map(a => /*#__PURE__*/React.createElement("span", {
      key: a,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 16px",
        borderRadius: 10,
        background: "var(--surface-raised)",
        boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
        font: "10px var(--font-mono)",
        letterSpacing: "0.1em"
      }
    }, a, " \u2713")))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "36px 0 0",
        font: "16px var(--font-mono)",
        color: "var(--ink)"
      }
    }, "42 % weniger Tipparbeit pro Objekt."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "10px 0 0",
        font: "400 15px var(--font-display)",
        color: "var(--text-muted)"
      }
    }, "Du pr\xFCfst und gibst frei \u2014 den Rest macht das System."));
  }
  const ph1 = oaClamp(p / 0.35),
    ph2 = oaClamp((p - 0.35) / 0.25),
    ph3 = oaClamp((p - 0.6) / 0.4);
  const headline = p < 0.35 ? "Drag and Drop deiner Dokumente" : p < 0.6 ? "Die UNIO KI liest, strukturiert und erstellt" : "Fertig zur Freigabe.";
  return /*#__PURE__*/React.createElement("section", {
    id: "objektanlage",
    ref: ref,
    "data-track": "chapter_view_04b",
    "data-screen-label": "Objektanlage",
    style: {
      height: "300vh",
      position: "relative",
      background: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "sticky",
      top: 0,
      height: "100svh",
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
      alignItems: "center",
      padding: "0 7vw",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "04b",
    label: "Objektanlage"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(30px, 3vw, 50px)/1.05 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)",
      minHeight: "2.2em"
    }
  }, headline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "34",
    height: "34",
    viewBox: "0 0 34 34",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "17",
    r: "14",
    fill: "none",
    stroke: "var(--hairline-dark)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "17",
    r: "14",
    fill: "none",
    stroke: "var(--signal)",
    strokeWidth: "1.5",
    strokeDasharray: 2 * Math.PI * 14,
    strokeDashoffset: (1 - p) * 2 * Math.PI * 14,
    transform: "rotate(-90 17 17)",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 10,
      color: "var(--text-muted)"
    }
  }, p < 0.35 ? "Der Papierstapel" : p < 0.6 ? "Der Kern" : "Die fertige Immobilie")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      opacity: ph3 > 0.55 ? 1 : 0,
      transform: ph3 > 0.55 ? "none" : "translateY(14px)",
      transition: `all 600ms ${BT_EASE}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 clamp(26px, 2.4vw, 40px)/1.1 var(--font-mono)",
      color: "var(--ink)"
    }
  }, "42 %"), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      marginTop: 6
    }
  }, "weniger Tipparbeit pro Objekt"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 18px",
      borderRadius: "var(--r-pill)",
      background: "var(--ink)",
      color: "var(--paper)",
      font: "500 13.5px var(--font-display)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "var(--signal)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "9px var(--font-mono)",
      color: "#FFF"
    }
  }, "\u2713"), "Freigeben"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 13.5px/1.5 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: "26ch"
    }
  }, "Du pr\xFCfst und gibst frei \u2014 den Rest macht das System.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "72svh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * ph2})`,
      width: 150,
      height: 150,
      borderRadius: 16,
      overflow: "hidden",
      opacity: Math.max(0.25, ph2),
      boxShadow: ph2 > 0.2 && ph3 < 0.9 ? "0 0 0 5px var(--signal-soft)" : "none",
      transition: "box-shadow 400ms"
    }
  }, /*#__PURE__*/React.createElement(window.SignalRaster, {
    cols: 5,
    rows: 5,
    pulse: ph2 > 0.3 && ph3 < 0.6,
    style: {
      position: "absolute",
      inset: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "calc(50% + 92px)",
      transform: "translateX(-50%)",
      width: 150,
      height: 1.5,
      background: "var(--hairline-dark)",
      opacity: ph2 > 0 && ph3 < 0.4 ? 1 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: ph2 * 100 + "%",
      background: "var(--signal)"
    }
  })), OA_DOCS.map((d, i) => {
    const [sx, sy, rot] = OA_START[i];
    const [mx, my, mrot] = OA_MID[i];
    const k = oaClamp(ph1 * 1.3 - i * 0.06);
    const x = sx + (mx - sx) * k,
      y = sy + (my - sy) * k,
      r = rot + (mrot - rot) * k;
    const shrink = ph2;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        position: "absolute",
        left: x + "%",
        top: y + "%",
        transform: `rotate(${r * (1 - shrink)}deg) scale(${1 - 0.75 * shrink}) translate(${shrink * (50 - x)}%, ${shrink * (42 - y)}%)`,
        opacity: 1 - oaClamp((ph2 - 0.55) / 0.3),
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        padding: "13px 17px",
        borderRadius: 10,
        background: "var(--surface-raised)",
        boxShadow: "inset 0 0 0 1px var(--ink-3), var(--shadow-float)",
        font: "10px var(--font-mono)",
        letterSpacing: "0.1em",
        color: "var(--ink-2)",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement(OaDocIcon, null), d);
  }), OA_ASSETS.map((a, i) => {
    const k = oaClamp(ph3 * 1.5 - i * 0.14);
    const on = k > 0.12;
    return /*#__PURE__*/React.createElement("div", {
      key: a,
      style: {
        position: "absolute",
        left: "58%",
        top: 14 + i * 19 + "%",
        transform: on ? "translateX(0)" : "translateX(-28px)",
        opacity: on ? 1 : 0,
        transition: `all 500ms ${BT_EASE}`,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "13px 17px",
        borderRadius: 10,
        background: "var(--surface-raised)",
        boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)",
        font: "10px var(--font-mono)",
        letterSpacing: "0.1em",
        color: "var(--ink-2)",
        whiteSpace: "nowrap"
      }
    }, a, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 17,
        height: 17,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 0 0 1.5px var(--signal)",
        color: "var(--signal-deep)",
        font: "9px var(--font-mono)",
        transform: on ? "scale(1)" : "scale(0)",
        transition: `transform 350ms ${BT_EASE} 180ms`
      }
    }, "\u2713"));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "58%",
      top: "90%",
      opacity: ph3 > 0.8 ? 1 : 0,
      transform: ph3 > 0.8 ? "none" : "translateX(-28px)",
      transition: `all 500ms ${BT_EASE}`,
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "11px 16px",
      borderRadius: "var(--r-pill)",
      background: "var(--signal-soft)",
      boxShadow: "inset 0 0 0 1px rgba(255,170,9,0.4)",
      font: "500 13px var(--font-display)",
      color: "var(--signal-deep)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--signal)"
    }
  }), "Passender K\xE4ufer gefunden"))));
}

/* ===== 05 · 80 % WENIGER ADMIN — Porträt-Moment mit Glas-Chips ===== */
function AdminMk() {
  const [ref, p] = window.usePinProgress();
  const chips = ["Exposé", "CRM", "Termine", "Closing", "Abrechnung"];
  const scatter = [[8, 8, -7], [52, 4, 5], [64, 40, 9], [6, 48, -4], [34, 26, 3]];
  const k = BT_RM ? 1 : oaClamp(p / 0.16 * 1.4); // 0–0.16: Chips sortieren
  const done = k > 0.8;
  const slide = BT_RM ? 0 : oaClamp((p - 0.34) / 0.14); // späterer Start: mehr Abstand, nächstes Panel bleibt länger verborgen
  const oaP = BT_RM ? 1 : oaClamp((p - 0.5) / 0.5); // Objektanlage-Animation
  const ph1 = oaClamp(oaP / 0.35),
    ph2 = oaClamp((oaP - 0.35) / 0.25),
    ph3 = oaClamp((oaP - 0.6) / 0.4);
  const oaHead = oaP < 0.35 ? "Drag and Drop deiner Dokumente" : oaP < 0.6 ? "Die UNIO KI liest, strukturiert und erstellt" : "Fertig zur Freigabe.";
  if (BT_RM) {
    return /*#__PURE__*/React.createElement("section", {
      "data-track": "chapter_view_05",
      "data-screen-label": "Admin",
      className: "u-grain",
      style: {
        background: "var(--paper-2)",
        padding: "175px 7vw"
      }
    }, /*#__PURE__*/React.createElement(Kap, {
      nr: "05",
      label: "Entlastung"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 56,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        font: "500 clamp(32px, 3.4vw, 54px)/1.04 var(--font-display)",
        letterSpacing: "-0.03em",
        color: "var(--ink)"
      }
    }, "80 % weniger Admin.", /*#__PURE__*/React.createElement("br", null), "100 % mehr Makeln."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "20px 0 0",
        font: "400 17px/1.6 var(--font-display)",
        color: "var(--text-muted)",
        maxWidth: 460
      }
    }, "Die Plattform r\xE4umt sichtbar weg, was dich vom Gespr\xE4ch abh\xE4lt.")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        height: 360,
        borderRadius: "var(--r-panel)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/photos/lifestyle-paar.jpg",
      alt: "[PLATZHALTER: Partner:in im Gespr\xE4ch]",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center 25%"
      }
    }))));
  }
  return /*#__PURE__*/React.createElement("section", {
    id: "objektanlage",
    ref: ref,
    "data-track": "chapter_view_05",
    "data-screen-label": "Admin",
    style: {
      height: "660vh",
      position: "relative",
      background: "var(--paper-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "sticky",
      top: 0,
      height: "100svh",
      overflow: "hidden",
      background: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--paper-2)",
      opacity: 1 - slide
    }
  }), /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "05",
    label: slide > 0.5 ? "Objektanlage" : "Entlastung"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      width: "200%",
      transform: `translateX(${-slide * 50}%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "50%",
      flex: "none",
      display: "flex",
      alignItems: "center",
      padding: "175px 11vw 110px 7vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
      gap: 56,
      alignItems: "center",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(32px, 3.4vw, 54px)/1.04 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "80 % weniger Admin.", /*#__PURE__*/React.createElement("br", null), "100 % mehr Makeln."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 0",
      font: "400 17px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 460
    }
  }, "Die Plattform r\xE4umt sichtbar weg, was dich vom Gespr\xE4ch abh\xE4lt \u2014 scroll, und der Stapel sortiert sich.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 400,
      borderRadius: "var(--r-panel)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photos/lifestyle-paar.jpg",
    alt: "[PLATZHALTER: Partner:in im Gespr\xE4ch]",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center 25%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.18), rgba(11,10,9,0.42))"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      position: "absolute",
      left: 16,
      top: 14,
      fontSize: 9,
      color: "var(--text-inverse)",
      textShadow: "0 1px 8px rgba(0,0,0,0.6)"
    }
  }, "[PLATZHALTER: Partner:in im Gespr\xE4ch]"), chips.map((c, i) => {
    const [sx, sy, rot] = scatter[i];
    const ki = oaClamp(k * 1.4 - i * 0.09);
    const x = sx + (66 - sx) * ki,
      y = sy + (11 + i * 13.5 - sy) * ki;
    return /*#__PURE__*/React.createElement("div", {
      key: c,
      style: {
        position: "absolute",
        left: x + "%",
        top: y + "%",
        transform: `rotate(${rot * (1 - ki)}deg)`,
        background: "var(--glass-dark)",
        WebkitBackdropFilter: "blur(18px)",
        backdropFilter: "blur(18px)",
        boxShadow: "inset 0 0 0 1px var(--hairline-light)",
        borderRadius: "var(--r-pill)",
        padding: "10px 18px",
        color: "var(--text-inverse)",
        font: "500 14px var(--font-display)",
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        whiteSpace: "nowrap"
      }
    }, c, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        font: "9px var(--font-mono)",
        background: ki > 0.92 ? "var(--signal)" : "rgba(255,255,255,0.15)",
        color: ki > 0.92 ? "#FFFFFF" : "transparent",
        transition: `all 300ms ${BT_EASE}`
      }
    }, "\u2713"));
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      position: "absolute",
      left: 16,
      bottom: 14,
      color: "var(--text-inverse)",
      fontSize: 10,
      textShadow: "0 1px 8px rgba(0,0,0,0.5)"
    }
  }, done ? "Sortiert · Automatisch" : "Dein Alltag heute")))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "50%",
      flex: "none",
      position: "relative",
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
      alignItems: "center",
      gap: 32,
      padding: "0 7vw 0 11vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "72svh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * ph2})`,
      width: 150,
      height: 150,
      borderRadius: 16,
      overflow: "hidden",
      opacity: Math.max(0.25, Math.max(1 - ph1, ph2)),
      boxShadow: ph2 > 0.2 && ph3 < 0.9 ? "0 0 0 5px var(--signal-soft)" : "none",
      transition: "box-shadow 400ms"
    }
  }, /*#__PURE__*/React.createElement(window.SignalRaster, {
    cols: 5,
    rows: 5,
    pulse: ph2 > 0.3 && ph3 < 0.6,
    style: {
      position: "absolute",
      inset: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "calc(50% + 92px)",
      transform: "translateX(-50%)",
      width: 150,
      height: 1.5,
      background: "var(--hairline-dark)",
      opacity: ph2 > 0 && ph3 < 0.4 ? 1 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: ph2 * 100 + "%",
      background: "var(--signal)"
    }
  })), OA_DOCS.map((d, i) => {
    const [sx, sy, rot] = OA_START[i];
    const [mx, my, mrot] = OA_MID[i];
    const kk = oaClamp(ph1 * 1.3 - i * 0.06);
    const x = sx + (mx - sx) * kk,
      y = sy + (my - sy) * kk,
      r = rot + (mrot - rot) * kk;
    const shrink = ph2;
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        position: "absolute",
        left: x + "%",
        top: y + "%",
        transform: `rotate(${r * (1 - shrink)}deg) scale(${1 - 0.75 * shrink}) translate(${shrink * (50 - x)}%, ${shrink * (42 - y)}%)`,
        opacity: 1 - oaClamp((ph2 - 0.55) / 0.3),
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        padding: "13px 17px",
        borderRadius: 10,
        background: "var(--surface-raised)",
        boxShadow: "inset 0 0 0 1px var(--ink-3), var(--shadow-float)",
        font: "10px var(--font-mono)",
        letterSpacing: "0.1em",
        color: "var(--ink-2)",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement(OaDocIcon, null), d);
  }), OA_ASSETS.map((a, i) => {
    const kk = oaClamp(ph3 * 1.5 - i * 0.14);
    const on = kk > 0.12;
    return /*#__PURE__*/React.createElement("div", {
      key: a,
      style: {
        position: "absolute",
        left: "56%",
        top: 14 + i * 19 + "%",
        transform: on ? "translateX(0)" : "translateX(-28px)",
        opacity: on ? 1 : 0,
        transition: `all 500ms ${BT_EASE}`,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "13px 17px",
        borderRadius: 10,
        background: "var(--surface-raised)",
        boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)",
        font: "10px var(--font-mono)",
        letterSpacing: "0.1em",
        color: "var(--ink-2)",
        whiteSpace: "nowrap"
      }
    }, a, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 17,
        height: 17,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "inset 0 0 0 1.5px var(--signal)",
        color: "var(--signal-deep)",
        font: "9px var(--font-mono)",
        transform: on ? "scale(1)" : "scale(0)",
        transition: `transform 350ms ${BT_EASE} 180ms`
      }
    }, "\u2713"));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "56%",
      top: "90%",
      opacity: ph3 > 0.8 ? 1 : 0,
      transform: ph3 > 0.8 ? "none" : "translateX(-28px)",
      transition: `all 500ms ${BT_EASE}`,
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "11px 16px",
      borderRadius: "var(--r-pill)",
      background: "var(--signal-soft)",
      boxShadow: "inset 0 0 0 1px rgba(255,170,9,0.4)",
      font: "500 13px var(--font-display)",
      color: "var(--signal-deep)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--signal)"
    }
  }), "Passender K\xE4ufer gefunden")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(28px, 3vw, 50px)/1.05 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)",
      minHeight: "2.2em"
    }
  }, oaHead), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "34",
    height: "34",
    viewBox: "0 0 34 34",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "17",
    r: "14",
    fill: "none",
    stroke: "var(--hairline-dark)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "17",
    r: "14",
    fill: "none",
    stroke: "var(--signal)",
    strokeWidth: "1.5",
    strokeDasharray: 2 * Math.PI * 14,
    strokeDashoffset: (1 - oaP) * 2 * Math.PI * 14,
    transform: "rotate(-90 17 17)",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 10,
      color: "var(--text-muted)"
    }
  }, oaP < 0.35 ? "Der Papierstapel" : oaP < 0.6 ? "Der Kern" : "Die fertige Immobilie")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      opacity: ph3 > 0.55 ? 1 : 0,
      transform: ph3 > 0.55 ? "none" : "translateY(14px)",
      transition: `all 600ms ${BT_EASE}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 clamp(26px, 2.4vw, 40px)/1.1 var(--font-mono)",
      color: "var(--ink)"
    }
  }, "42 %"), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      marginTop: 6
    }
  }, "weniger Tipparbeit pro Objekt"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 18px",
      borderRadius: "var(--r-pill)",
      background: "var(--ink)",
      color: "var(--paper)",
      font: "500 13.5px var(--font-display)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "var(--signal)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "9px var(--font-mono)",
      color: "#FFF"
    }
  }, "\u2713"), "Freigeben"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 13.5px/1.5 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: "24ch"
    }
  }, "Du pr\xFCfst und gibst frei \u2014 den Rest macht das System."))))))));
}

/* ===== 06 · DER RECHNER — hell, Count-up nach Slider-Release ===== */
function RechnerMk() {
  const [umsatz, setUmsatz] = React.useState(150000);
  const software = (599 + 199) * 12; // beide Pakete verpflichtend
  const unioCut = 0.15 * Math.min(umsatz, 150000); // 15 % bis 150K, 0 % darüber
  const unio = umsatz - unioCut - software;
  const klassisch = umsatz * 0.5;
  const delta = unio - klassisch;
  const dispRef = React.useRef(delta);
  const [disp, setDisp] = React.useState(delta);
  React.useEffect(() => {
    if (BT_RM) {
      dispRef.current = delta;
      setDisp(delta);
      return;
    }
    const id = setTimeout(() => {
      const from = dispRef.current,
        to = delta,
        t0 = performance.now();
      const step = now => {
        const k = Math.min(1, (now - t0) / 550),
          e = 1 - Math.pow(1 - k, 3);
        const v = from + (to - from) * e;
        dispRef.current = v;
        setDisp(v);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 200);
    return () => clearTimeout(id);
  }, [delta]);
  const fmt = n => "€ " + Math.round(n).toLocaleString("de-AT");
  return /*#__PURE__*/React.createElement("section", {
    id: "rechner",
    "data-track": "chapter_view_06",
    "data-screen-label": "Rechner",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 6,
      background: "var(--paper)",
      padding: "150px 7vw 175px",
      borderRadius: "28px 28px 0 0",
      marginTop: -28,
      boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)"
    }
  }, /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "06",
    label: "Rechner"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      marginBottom: 80,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Fx, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(32px, 3.4vw, 56px)/1.03 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Ein Modell, das", /*#__PURE__*/React.createElement("br", null), "Leistung belohnt."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      font: "400 17px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 440
    }
  }, "Unser Provisionsmodell ist darauf ausgelegt, dass du mit wachsendem Umsatz mehr beh\xE4ltst \u2014 transparent und unternehmerfreundlich. Deinen Vorteil berechnen. Beweg den Regler \u2014 der Unterschied ist keine Meinung, sondern Arithmetik."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.15fr)",
      gap: 14,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-card)",
      padding: "28px 30px",
      background: "var(--surface-raised)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)"
    },
    "data-track": "rechner_interact"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)"
    }
  }, "Dein Provisionsumsatz / Jahr"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 26px var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)",
      fontVariantNumeric: "tabular-nums"
    }
  }, fmt(umsatz))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "60000",
    max: "600000",
    step: "10000",
    value: umsatz,
    onChange: e => setUmsatz(+e.target.value),
    style: {
      width: "100%",
      marginTop: 44,
      accentColor: "#FFAA09"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "11px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "\u20AC 60K"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "11px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "\u20AC 600K")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      borderTop: "1px solid var(--hairline-dark)",
      paddingTop: 20,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, [["CIRCLE: dein Netto", unio, "var(--signal)", 1], ["Klassisches Büro: ~50 %", klassisch, "var(--ink-3)", klassisch / unio]].map(([l, v, c, w]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 13.5px var(--font-display)",
      color: "var(--text-muted)"
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "15px var(--font-mono)",
      color: "var(--ink-2)"
    }
  }, fmt(v))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 5,
      background: "var(--paper-3)",
      marginTop: 7,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: Math.max(4, w * 100) + "%",
      background: c,
      borderRadius: 5,
      transition: `width 400ms ${BT_EASE}`
    }
  }))))), /*#__PURE__*/React.createElement("p", {
    className: "u-label",
    style: {
      margin: "18px 0 0",
      color: "var(--text-muted)",
      fontSize: 10,
      lineHeight: 1.6
    }
  }, "Pflicht-Pakete: UNIO Plattform (\u20AC 199) + Infrastruktur (\u20AC 599) = \u20AC 798 / Monat abgezogen \xB7 15 % Provisionsanteil bis \u20AC 150K, 0 % dar\xFCber.")), /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      borderRadius: "var(--r-card)",
      padding: "clamp(28px, 3vw, 40px)",
      background: "var(--signal)",
      color: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      boxShadow: "var(--shadow-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.85)",
      fontSize: 10
    }
  }, "Dein Vorsprung / Jahr"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 clamp(48px, 5vw, 84px)/1 var(--font-display)",
      letterSpacing: "-0.03em",
      marginTop: 18,
      fontVariantNumeric: "tabular-nums"
    }
  }, fmt(disp)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      font: "400 16px/1.6 var(--font-display)",
      color: "rgba(255,245,239,0.9)",
      maxWidth: 380
    }
  }, "Gleiche Deals, gleiche Arbeit \u2014 aber deine Marke, deine Provision, dein Anteil an dem, was du aufbaust."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 26
    }
  }, /*#__PURE__*/React.createElement(Bm, {
    variant: "paper",
    size: "lg",
    knob: true,
    "data-track": "rechner_result_cta",
    onClick: () => location.hash = "bewerben"
  }, "Als CIRCLE Partner bewerben")))));
}

/* ===== 07 · ECHTE BETEILIGUNG — Typo-Moment ===== */
function BeteiligungMk() {
  return /*#__PURE__*/React.createElement("section", {
    "data-track": "chapter_view_07",
    "data-screen-label": "Beteiligung",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 7,
      background: "var(--paper-2)",
      padding: "clamp(120px, 18vh, 220px) 7vw",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      borderRadius: "28px 28px 0 0",
      marginTop: -28,
      boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)"
    }
  }, /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "07",
    label: "Beteiligung"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Fx, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(44px, 6vw, 104px)/1 var(--font-display)",
      letterSpacing: "-0.04em",
      color: "var(--ink)",
      maxWidth: 900
    }
  }, "Du baust auf,", /*#__PURE__*/React.createElement("br", null), "was ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "transparent",
      WebkitTextStroke: "1.5px var(--ink)"
    }
  }, "dir"), " geh\xF6rt", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, "."))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 720,
      marginTop: 84
    }
  }, [["Unternehmensbeteiligung", "für Top-Performer"], ["Gewinnbeteiligung", "für die Community"], ["Details", "im persönlichen Gespräch"]].map(([k, v], i) => /*#__PURE__*/React.createElement(Fx, {
    key: k,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 24,
      padding: "18px 0",
      borderTop: "1px solid var(--hairline-dark)",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 17px var(--font-display)",
      color: "var(--ink-2)",
      textAlign: "right"
    }
  }, v)))))));
}

/* ===== 08 · DIE BEWEGUNG — Orange, der Kreis schließt sich ===== */
function BewegungMk() {
  const faces = ["portrait-01.jpg", "portrait-02.jpg", "portrait-03.jpg", "portrait-04.jpg", "portrait-02.jpg", "portrait-03.jpg"];
  const ref = React.useRef(null);
  const [cp, setCp] = React.useState(BT_RM ? 1 : 0);
  React.useEffect(() => {
    if (BT_RM) return;
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setCp(oaClamp((innerHeight * 0.9 - r.top) / (r.height + innerHeight * 0.35)));
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    return () => removeEventListener("scroll", on);
  }, []);
  const R = 128,
    C = 2 * Math.PI * R;
  const N = faces.length + 1; // + Du
  const pos = i => {
    const a = (-90 + i * 360 / N) * (Math.PI / 180);
    return [160 + R * Math.cos(a), 160 + R * Math.sin(a)];
  };
  const duOn = cp > 0.96;
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-track": "chapter_view_08",
    "data-screen-label": "Bewegung",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 8,
      background: "var(--signal)",
      padding: "clamp(96px, 13vh, 150px) 7vw",
      color: "#FFFFFF",
      borderRadius: "28px 28px 0 0",
      marginTop: -28,
      boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.35)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
      gap: 56,
      alignItems: "center",
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Fx, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(32px, 3.6vw, 58px)/1.03 var(--font-display)",
      letterSpacing: "-0.03em"
    }
  }, "Eine Bewegung.", /*#__PURE__*/React.createElement("br", null), "Kein Maklerpool."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 0",
      font: "400 17px/1.6 var(--font-display)",
      color: "rgba(255,245,239,0.9)",
      maxWidth: 460
    }
  }, "Kuratiert statt offen f\xFCr alle: Wir nehmen Makler:innen auf, die Ownership wollen \u2014 und geben ihnen daf\xFCr Software, Dealflow und Beteiligung.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginTop: 44
    }
  }, ["Ownership", "Transparenz", "Kuratiert", "Wien zuerst"].map(v => /*#__PURE__*/React.createElement("span", {
    key: v,
    className: "u-label",
    style: {
      fontSize: 10,
      padding: "7px 14px",
      borderRadius: "var(--r-pill)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
      color: "rgba(255,245,239,0.9)"
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "min(100%, 360px)",
      aspectRatio: "1",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 320",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      overflow: "visible"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "160",
    cy: "160",
    r: R,
    fill: "none",
    stroke: "rgba(255,245,239,0.9)",
    strokeWidth: "1.5",
    strokeDasharray: C,
    strokeDashoffset: (1 - Math.min(1, cp * 1.04)) * C,
    transform: "rotate(-90 160 160)",
    strokeLinecap: "round"
  }), faces.map((_, i) => {
    const [x1, y1] = pos(i),
      [x2, y2] = pos(i + 1);
    const on = cp > (i + 1.6) / (N + 1);
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: "rgba(255,245,239,0.45)",
      strokeWidth: "1",
      style: {
        opacity: on ? 1 : 0,
        transition: "opacity 500ms"
      }
    });
  })), faces.map((f, i) => {
    const [x, y] = pos(i);
    const on = cp > (i + 1) / (N + 1);
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: "absolute",
        left: x / 320 * 100 + "%",
        top: y / 320 * 100 + "%",
        transform: `translate(-50%, -50%) scale(${on ? 1 : 0.4})`,
        opacity: on ? 1 : 0,
        transition: `all 500ms ${BT_EASE}`,
        width: 58,
        height: 58,
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: "0 0 0 3px var(--signal), inset 0 0 0 1px rgba(255,255,255,0.5)"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/team/" + f,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center 22%"
      }
    }));
  }), (() => {
    const [x, y] = pos(faces.length);
    return /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: x / 320 * 100 + "%",
        top: y / 320 * 100 + "%",
        transform: `translate(-50%, -50%) scale(${duOn ? 1 : 0.4})`,
        opacity: duOn ? 1 : 0,
        transition: `all 500ms ${BT_EASE}`,
        width: 58,
        height: 58,
        borderRadius: "50%",
        background: "#FFFFFF",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        font: "500 13px var(--font-display)",
        color: "var(--signal-deep)",
        animation: duOn && !BT_RM ? "uPulseInv 2s var(--ease-unio) infinite" : "none"
      }
    }, "+ Du");
  })(), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: 10,
      color: "rgba(255,245,239,0.9)",
      textAlign: "center"
    }
  }, "Der Kreis", /*#__PURE__*/React.createElement("br", null), "schlie\xDFt sich."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 120,
      borderTop: "1px solid rgba(255,255,255,0.28)",
      paddingTop: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 20,
      flexWrap: "wrap",
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "500 clamp(26px, 2.8vw, 42px)/1.05 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "#FFFFFF"
    }
  }, "Gesichter des CIRCLE."), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "rgba(255,245,239,0.82)"
    }
  }, "Kuratiert \xB7 Wien zuerst")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, MK_FACES.map((f, i) => /*#__PURE__*/React.createElement(Fx, {
    key: f.stat,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "3 / 4",
      borderRadius: "var(--r-card)",
      overflow: "hidden",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.28)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: f.img,
    alt: "CIRCLE-Partner:in",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: f.pos
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.05), transparent 42%, rgba(11,10,9,0.5))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 12,
      borderRadius: "var(--r-inner)",
      background: "var(--glass-dark)",
      WebkitBackdropFilter: "blur(14px)",
      backdropFilter: "blur(14px)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light)",
      padding: "12px 14px",
      color: "var(--text-inverse)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 20px/1 var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, f.stat, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "11px var(--font-mono)",
      marginLeft: 6,
      color: "var(--signal)"
    }
  }, "\u2197")), /*#__PURE__*/React.createElement(MkSpark, {
    pts: f.spark
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 8,
      color: "var(--text-inverse-muted)"
    }
  }, f.sub))))))));
}
function SchritteMk() {
  const [sent, setSent] = React.useState(false);
  const feld = {
    font: "400 15px var(--font-display)",
    padding: "15px 17px",
    borderRadius: "var(--r-inner)",
    border: "none",
    outline: "none",
    background: "#FFFFFF",
    color: "var(--ink-2)",
    boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
    width: "100%",
    fontFamily: "inherit"
  };
  const selFeld = {
    ...feld,
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
    paddingRight: 40,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235F5A54' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center"
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "bewerben",
    "data-track": "chapter_view_09",
    "data-screen-label": "Bewerbung",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 9,
      background: "var(--paper)",
      padding: "150px 7vw 185px",
      borderRadius: "28px 28px 0 0",
      marginTop: -28,
      boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)"
    }
  }, /*#__PURE__*/React.createElement(GridLines, null), /*#__PURE__*/React.createElement(Kap, {
    nr: "09",
    label: "Bewerben"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
      gap: 16,
      position: "relative",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-card)",
      padding: "clamp(24px, 3vw, 34px)",
      background: "var(--surface-raised)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 22px/1.2 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)"
    }
  }, "Jetzt bewerben"), [["01", "Bewerbung", "Track-Record & Motivation — zwei Zeilen genügen.", false], ["02", "Gespräch", "Persönlich, auf Augenhöhe — inkl. aller Beteiligungsdetails.", true], ["03", "Onboarding", "Plattform, Projekte, Community — du startest nie bei null.", false]].map(([n, t2, p, human]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: "grid",
      gridTemplateColumns: "40px 1fr",
      gap: 14,
      padding: "18px 0",
      borderBottom: "1px solid var(--hairline-dark)",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "12px var(--font-mono)",
      color: "var(--signal-deep)"
    }
  }, n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 16px var(--font-display)",
      color: "var(--ink)"
    }
  }, t2), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "5px 0 0",
      font: "400 13.5px/1.5 var(--font-display)",
      color: "var(--text-muted)"
    }
  }, p), human && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      flex: "none",
      border: "1px dashed var(--hairline-dark)",
      background: "var(--paper-2)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "7px var(--font-mono)",
      letterSpacing: "0.06em",
      color: "var(--text-muted)"
    }
  }, "FOTO"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 9,
      color: "var(--text-muted)",
      lineHeight: 1.5
    }
  }, "[PLATZHALTER: wer das Gespr\xE4ch f\xFChrt \u2014 Name, Rolle]", /*#__PURE__*/React.createElement("br", null), "Du sprichst mit einem Menschen, nicht mit einem Funnel.")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-card)",
      padding: "clamp(24px, 3vw, 34px)",
      background: "var(--surface-raised)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "26px 0"
    },
    "data-track": "bewerbung_submit"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "var(--signal-soft)",
      color: "var(--signal-deep)",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m4 10.5 4 4 8-9"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 21px var(--font-display)",
      color: "var(--ink)",
      marginTop: 16
    }
  }, "Danke. Wir melden uns \u2014 pers\xF6nlich."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      font: "400 14px var(--font-display)",
      color: "var(--text-muted)"
    }
  }, "Antwort in 48 h.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 22px/1.2 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)",
      marginBottom: 6
    }
  }, "Deine Bewerbung"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Name",
    style: feld
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "E-Mail",
    style: feld
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("select", {
    defaultValue: "",
    style: selFeld
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Spezialisierung"), /*#__PURE__*/React.createElement("option", null, "Wohnimmobilien"), /*#__PURE__*/React.createElement("option", null, "Anlage / Zinshaus"), /*#__PURE__*/React.createElement("option", null, "Neubau / Projekte"), /*#__PURE__*/React.createElement("option", null, "Luxus / Penthouse"), /*#__PURE__*/React.createElement("option", null, "Gewerbe")), /*#__PURE__*/React.createElement("select", {
    defaultValue: "",
    style: selFeld
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Bisheriges Anstellungsverh\xE4ltnis"), /*#__PURE__*/React.createElement("option", null, "Angestellt in Maklerb\xFCro"), /*#__PURE__*/React.createElement("option", null, "Selbstst\xE4ndig / eigene Firma"), /*#__PURE__*/React.createElement("option", null, "Freier Handelsvertreter"), /*#__PURE__*/React.createElement("option", null, "Quereinstieg"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("select", {
    defaultValue: "",
    style: selFeld
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Provisionsumsatz / Jahr"), /*#__PURE__*/React.createElement("option", null, "Unter \u20AC 100K"), /*#__PURE__*/React.createElement("option", null, "\u20AC 100K\u2013150K"), /*#__PURE__*/React.createElement("option", null, "\u20AC 150K\u2013300K"), /*#__PURE__*/React.createElement("option", null, "\xDCber \u20AC 300K")), /*#__PURE__*/React.createElement("input", {
    placeholder: "Fokus-Bezirke \u2014 z.\u202FB. 1020\u20131220",
    style: feld
  })), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Was treibt dich pers\xF6nlich an? \u2014 zwei Zeilen gen\xFCgen.",
    rows: 3,
    style: {
      ...feld,
      resize: "vertical"
    }
  }), "              ", /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18,
      flexWrap: "wrap",
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Bm, {
    variant: "signal",
    size: "lg",
    knob: true,
    onClick: () => setSent(true)
  }, "Als CIRCLE Partner bewerben")), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      fontSize: 10
    }
  }, "Pers\xF6nliches Gespr\xE4ch statt Auswahlverfahren \xB7 Antwort in 48 h")))));
}

/* ===== DEINE MARKE. DEIN ASSET — Personal Brand in Aktion ===== */
const MK_MARKETING = [{
  src: "../../assets/marketing/albrecht-print.png"
}, {
  src: "../../assets/marketing/ecoluxe-print.png"
}, {
  src: "../../assets/marketing/obenzwei-print.png"
}, {
  src: "../../assets/marketing/origins-print.png"
}, {
  src: "../../assets/marketing/beheim-print-1.png"
}, {
  src: "../../assets/marketing/beheim-print-2.png"
}];
const MK_MENSCHEN = [{
  src: "../../assets/marketing/albrecht-desk.jpg"
}, {
  src: "../../assets/team/community-duo.jpg"
}, {
  src: "../../assets/marketing/beheim-desk.jpg"
}, {
  src: "../../assets/team/community-spatenstich.jpg"
}, {
  src: "../../assets/marketing/albrecht-desk-2.jpg"
}, {
  src: "../../assets/team/portrait-05.jpg"
}, {
  src: "../../assets/marketing/obenzwei-phones.jpg"
}, {
  src: "../../assets/team/community-baustelle.jpg"
}, {
  src: "../../assets/team/portrait-01.jpg"
}, {
  src: "../../assets/team/community-dachfenster.jpg"
}];
function MkRow({
  items,
  reverse,
  hov,
  dur
}) {
  const [tip, setTip] = React.useState(-1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: hov ? 30 : 16,
      width: "max-content",
      animation: BT_RM ? "none" : `bMarquee ${dur}s linear infinite`,
      animationDirection: reverse ? "reverse" : "normal",
      animationPlayState: hov ? "paused" : "running",
      transition: "gap .5s cubic-bezier(.32,.72,0,1)"
    }
  }, items.concat(items).map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onMouseEnter: () => setTip(i),
    onMouseLeave: () => setTip(-1),
    style: {
      flex: "none",
      width: "clamp(300px, 30vw, 420px)",
      aspectRatio: "1 / 1",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "inset 0 0 0 0.5px var(--hairline-dark)",
      padding: tip === i ? 10 : 0,
      background: "var(--paper-2)",
      transition: "padding .5s cubic-bezier(.32,.72,0,1)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: m.src,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      borderRadius: tip === i ? 8 : 0,
      transition: "border-radius .5s"
    }
  })))));
}
function MarkeAssetMk() {
  const [mqHov, setMqHov] = React.useState(false);
  const dur = 58;
  const stats = [["116.525", "Aufrufe · 1 Reel · 16 Sek."], ["4.391", "Follower organisch"], ["541", "Saves = warme Leads"], ["173", "Profil-Klicks aus 1 Reel"]];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Marke",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 7,
      background: "var(--paper-2)",
      padding: "175px 7vw",
      borderRadius: "28px 28px 0 0",
      marginTop: -28,
      boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--signal-deep)"
    }
  }, "Personal Brand in Aktion"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "22px 0 0",
      font: "500 clamp(34px, 4.2vw, 68px)/1.04 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Deine Marke.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, "Dein Asset. Lebenslang.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "24px 0 0",
      font: "400 16px/1.7 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 440
    }
  }, "Ein Inhouse-Team produziert unter deinem Namen: 3 Kurzvideos, 10 Fotos und 2 Grafiken im Monat \u2014 inkl. deiner eigenen Personal-Brand-Website. Volle IP-Rechte ab Produktion. Verl\xE4sst du UNIO, nimmst du alles mit."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginTop: 28
    }
  }, ["Markenstrategie", "Content-Produktion", "Funnel-Integration", "Deine Website"].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    className: "u-label",
    style: {
      fontSize: 10,
      padding: "8px 15px",
      borderRadius: "var(--r-pill)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
      color: "var(--text-muted)"
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFFFFF",
      borderRadius: "var(--r-panel)",
      padding: "26px 26px 22px",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "var(--ink)",
      color: "var(--paper)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "500 13px var(--font-display)",
      flex: "none"
    }
  }, "LV"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 15px var(--font-display)",
      color: "var(--ink)"
    }
  }, "@linda.vienna"), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      fontSize: 9,
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, "Top-Maklerin im UNIO-Netzwerk \xB7 Wien")), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 9,
      color: "var(--signal-deep)",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--signal)"
    }
  }), "Live")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginTop: 20
    }
  }, stats.map(([v, k]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      background: "var(--paper-2)",
      borderRadius: "var(--r-inner)",
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 26px/1 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--signal)"
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      fontSize: 8.5,
      color: "var(--text-muted)",
      marginTop: 8
    }
  }, k)))), /*#__PURE__*/React.createElement("p", {
    className: "u-label",
    style: {
      margin: "18px 0 0",
      fontSize: 9,
      color: "var(--text-muted)"
    }
  }, "\u2733 Reichweite als Resultat eines Systems \u2014 kein Gl\xFCcksfall."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 96,
      display: "flex",
      flexDirection: "column",
      gap: 16
    },
    onMouseEnter: () => setMqHov(true),
    onMouseLeave: () => setMqHov(false)
  }, /*#__PURE__*/React.createElement(MkRow, {
    items: MK_MARKETING,
    reverse: false,
    hov: mqHov,
    dur: dur
  }), /*#__PURE__*/React.createElement(MkRow, {
    items: MK_MENSCHEN,
    reverse: true,
    hov: mqHov,
    dur: dur
  })));
}

/* ===== DER UNTERSCHIED — klassischer Makler vs. CIRCLE (clean, ohne Kachel) ===== */
const VERGLEICH = [["Provisionsaufteilung", "Splits oft mit Gebühren oder Bedingungen", "Bis 100 %, unabhängig vom Umsatz"], ["Eigene Marke", "Bleibt meist außen vor", "UNIO baut deine Brand für dich auf"], ["Dealflow", "Zufällig, Portfolios bei Agenturen", "Kontinuierlich & kuratiert"], ["Infrastruktur", "Fragmentiert und veraltet", "Integrierte High-End-Plattform"], ["Unternehmenswert", "Kein Anteil am Wachstum", "Echte Unternehmensbeteiligung"], ["Passives Einkommen", "Keine Quellen", "Referral + Gewinn-Ausschüttung"]];
function VergleichMk() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Vergleich",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 9,
      background: "var(--paper)",
      padding: "175px 7vw",
      borderRadius: "28px 28px 0 0",
      marginTop: -28,
      boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      maxWidth: 820,
      margin: "0 auto 80px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--signal-deep)"
    }
  }, "Der Unterschied"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "22px 0 0",
      font: "500 clamp(34px, 4.2vw, 68px)/1.05 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Der klassische Makler", /*#__PURE__*/React.createElement("br", null), "vs. UNIO CIRCLE.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr)",
      gap: 24,
      padding: "0 0 16px",
      borderBottom: "1px solid var(--hairline-dark)"
    }
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      textAlign: "right"
    }
  }, "Klassischer Makler"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--signal-deep)",
      textAlign: "right"
    }
  }, "UNIO CIRCLE")), VERGLEICH.map(([k, a, b], i) => /*#__PURE__*/React.createElement(Fx, {
    key: k,
    delay: i * 60
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr)",
      gap: 24,
      padding: "26px 0",
      borderBottom: "1px solid var(--hairline-dark)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 17px var(--font-display)",
      color: "var(--ink)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 14.5px/1.5 var(--font-display)",
      color: "var(--text-muted)",
      textAlign: "right"
    }
  }, a), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 14.5px/1.5 var(--font-display)",
      color: "var(--signal-deep)",
      textAlign: "right",
      display: "inline-flex",
      gap: 8,
      justifyContent: "flex-end",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--signal)"
    }
  }, "\u2713"), b))))));
}
function FaqMk() {
  return /*#__PURE__*/React.createElement(window.FaqBlock, {
    nr: "10",
    label: "Fragen",
    title: /*#__PURE__*/React.createElement("span", null, "Was du", /*#__PURE__*/React.createElement("br", null), "wissen willst."),
    subline: "Ehrliche Antworten \u2014 kein Kleingedrucktes.",
    items: [["Was kostet mich UNIO?", "Ein Software-Beitrag von € 599/Monat — dafür behältst du 85 % Provision ab dem ersten Deal und 100 % ab € 150k Track-Record. Keine versteckten Gebühren."], ["Behalte ich meine eigene Marke?", "Ja. Du trittst unter deinem eigenen Namen auf; UNIO liefert System, Software und Dealflow im Hintergrund, ohne sich vor deine Marke zu stellen."], ["Bin ich angestellt oder selbstständig?", "Du bleibst selbstständig und handelst auf eigene Rechnung — CIRCLE ist ein Netzwerk, kein Anstellungsverhältnis. [PLATZHALTER: rechtl. Konstruktion bestätigen]"], ["Wie funktioniert die Beteiligung?", "Top-Performer bekommen echte Unternehmensbeteiligung, die Community eine Gewinnbeteiligung — du baust also mit an dem, wovon du profitierst. [PLATZHALTER: Beteiligungsdetails]"], ["Muss ich meine Bestandskunden mitbringen?", "Nein. Deine Bestandskunden bleiben deine Sache — du kannst sie einbringen, musst aber nicht. Dealflow bekommst du ohnehin über das System."], ["Wie schnell bin ich startklar?", "Nach Bewerbung und Gespräch folgt ein kompaktes Onboarding auf Plattform, Projekte und Community — du startest nie bei null."], ["Für wen ist der CIRCLE nichts?", "Für alle, die nur einen Maklerpool suchen: CIRCLE ist kuratiert und auf Ownership ausgelegt — wer kein eigenes Geschäft aufbauen will, ist woanders besser aufgehoben."]],
    anchor: {
      text: "Noch was offen? Schreib uns zwei Zeilen — echte Antwort von einem Menschen.",
      link: "Schreib uns",
      img: "../../assets/team/portrait-01.jpg"
    }
  });
}

/* ===== BENEFITS — Pipeline ohne Freiheitsverlust (drei Karten) ===== */
function BenefitsMk() {
  const cards = [["Exklusiver Dealflow", "Das UNIO-Akquise Team holt für dich einen ständigen Projektflow. Exklusive, kuratierte Projekte und Einzelobjekte."], ["Bereits aufbereitete Projekte", "Alle Projekte werden vom UNIO Team aufbereitet und gepflegt. Marketingunterlagen werden erstellt und das Inhouse Marketing Team rückt das Projekt für dich ins richtige Licht."], ["Leadflow für UNIO Projekte", "Profitiere vom Inhouse Vertriebsteam von UNIO. Du bekommst bereits vorqualifizierte Leads und kannst dich ausschließlich auf den Verkauf konzentrieren."]];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Benefits",
    className: "u-grain",
    style: {
      position: "relative",
      zIndex: 6,
      background: "var(--paper)",
      padding: "175px 7vw",
      borderRadius: "28px 28px 0 0",
      marginTop: -28,
      boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      maxWidth: 820,
      margin: "0 auto 88px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      padding: "8px 16px",
      borderRadius: "var(--r-pill)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      borderRadius: "50%",
      border: "2px solid var(--signal)",
      borderRightColor: "transparent",
      transform: "rotate(-45deg)"
    }
  }), "Benefits"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "26px 0 0",
      font: "500 clamp(34px, 4.2vw, 68px)/1.06 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Eine st\xE4ndige Pipeline", /*#__PURE__*/React.createElement("br", null), "ohne deine Freiheit zu verlieren."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "26px auto 0",
      font: "400 17px/1.7 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 560
    }
  }, "Alleine eine gro\xDFe Pipeline aufzubauen ist nahezu unm\xF6glich: Beziehungen brauchen Zeit, Portfolios geh\xF6ren oft gro\xDFen Agenturen. UNIO \xF6ffnet den Zugang, damit dein Dealflow konstant bleibt und du unabh\xE4ngig skalierst.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24
    }
  }, cards.map(([t, c], i) => /*#__PURE__*/React.createElement(Fx, {
    key: t,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      borderRadius: "var(--r-card)",
      padding: "34px 32px",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
      minHeight: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 22px/1.2 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      font: "400 14.5px/1.7 var(--font-display)",
      color: "var(--text-muted)"
    }
  }, c))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(Bm, {
    size: "lg",
    variant: "signal",
    knob: true,
    onClick: () => location.hash = "bewerben"
  }, "Werde Teil der UNIO-Community")));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)"
    }
  }, /*#__PURE__*/React.createElement(SiteNav, {
    active: "makler.html",
    cta: {
      label: "Bewerben",
      onClick: () => location.hash = "bewerben"
    }
  }), /*#__PURE__*/React.createElement(HeroMk, null), /*#__PURE__*/React.createElement(FragenMk, null), /*#__PURE__*/React.createElement(AntwortMk, null), /*#__PURE__*/React.createElement(window.SystemBento, {
    makler: true
  }), /*#__PURE__*/React.createElement(AdminMk, null), /*#__PURE__*/React.createElement(BenefitsMk, null), /*#__PURE__*/React.createElement(RechnerMk, null), /*#__PURE__*/React.createElement(BeteiligungMk, null), /*#__PURE__*/React.createElement(MarkeAssetMk, null), /*#__PURE__*/React.createElement(BewegungMk, null), /*#__PURE__*/React.createElement(SchritteMk, null), /*#__PURE__*/React.createElement(VergleichMk, null), /*#__PURE__*/React.createElement(FaqMk, null), /*#__PURE__*/React.createElement(MkSticky, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/page-makler.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/page-story.jsx
try { (() => {
/* UNIO — Story v2 (Korrektur-Briefing 05.07.): ein oranger Punkt als roter Faden.
   Sequenz: 01 Ursprung (Hero) · 02 Erkenntnis (5 Seiten, horizontal) · 03 Fusion (Sankey)
   · 04 Warum·Wie·Was (Golden Circle) · 05 Menschen · 06 Roadmap (horizontal) · 07 Finale.
   Hinweis: der Faden nutzt var(--signal) #FFAA09 (System-Akzent) statt des Briefing-Hex
   #E96F2B, damit EIN Orange über die ganze Website konsistent bleibt. */
const {
  GlassPanel: GPs,
  Button: Bs,
  FlutedGlass: FGs
} = window.UNIODesignSystem_b6216a;
const {
  SiteNav,
  SiteFooter,
  Chapter,
  Reveal,
  usePinProgress,
  UIMiniLens,
  U_RM: RMs,
  SignalRaster: SRs
} = window;
const stC = v => Math.min(1, Math.max(0, v));

/* Kapitel-Marker mit vertikaler Hairline */
function KapSt({
  nr,
  label,
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "2.4vw",
      top: 96,
      zIndex: 5,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "11px var(--font-mono)",
      color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)"
    }
  }, nr), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 54,
      background: dark ? "var(--hairline-light)" : "var(--hairline-dark)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 8,
      color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)",
      writingMode: "vertical-rl"
    }
  }, label));
}
const stackCard = (z, bg) => ({
  position: "relative",
  zIndex: z,
  background: bg,
  borderRadius: "28px 28px 0 0",
  marginTop: -28,
  boxShadow: "0 -20px 44px -26px rgba(11,10,9,0.3)"
});

/* ===== 01 · URSPRUNG (Hero) — die Riffelung klärt sich wortlos ===== */
function HeroSt() {
  const [t, setT] = React.useState(RMs ? 99999 : 0);
  React.useEffect(() => {
    if (RMs) return;
    const t0 = performance.now();
    let raf;
    const tick = now => {
      const el = now - t0;
      setT(el);
      if (el < 2800) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const reveal = RMs ? 1 : stC((t - 700) / 1600);
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    "data-screen-label": "Hero",
    style: {
      position: "sticky",
      top: 0,
      zIndex: 0,
      background: "var(--paper)",
      padding: "98px 40px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 52fr) minmax(0, 48fr)",
      minHeight: "calc(100svh - 120px)",
      borderRadius: 22,
      overflow: "hidden",
      border: "0.5px solid var(--hairline-dark)",
      boxShadow: "0 1px 0 rgba(255,255,255,.6) inset"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "185px 4vw 120px 7vw"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "500 clamp(40px, 4.4vw, 76px)/1.02 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Der Markt war eine Blackbox.", /*#__PURE__*/React.createElement("br", null), "Also bauten wir", /*#__PURE__*/React.createElement("br", null), "Klarheit", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    className: "u-label",
    style: {
      margin: "26px 0 0",
      color: "var(--text-muted)"
    }
  }, "Die Geschichte hinter UNIO \xB7 Wien"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      font: "400 17px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 420
    }
  }, "Vertrieb, Marketing und Technologie haben einander jahrelang zugearbeitet. 2026 wurden sie ein Unternehmen.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--paper-3)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/vienna-facade.jpg",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "sepia(0.5) saturate(0.7)",
      opacity: 1 - reveal * 0.9,
      transition: "opacity 300ms linear"
    }
  }), /*#__PURE__*/React.createElement(FGs, {
    reveal: reveal,
    side: "left",
    strength: 13,
    style: {
      position: "absolute",
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/albrecht.jpg",
    alt: "Das Albrecht \u2014 Gegenwart",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      position: "absolute",
      left: 20,
      bottom: 16,
      fontSize: 9,
      color: "var(--text-inverse)",
      textShadow: "0 1px 10px rgba(0,0,0,0.6)"
    }
  }, reveal > 0.85 ? "Gegenwart · Das Albrecht" : "Herkunft"))));
}

/* ===== 02 · ERKENNTNIS — fünf Perspektiven als gepinnte Horizontal-Strecke ===== */
const PERSPEKT = [["01", "Der Eigentümer", "inseriert und hört monatelang — nichts."], ["02", "Die Maklerin", "verwaltet Papier, statt Menschen zu beraten."], ["03", "Der Bauträger", "baut auf Hoffnung, weil der Markt erst nach dem Baustart antwortet."], ["04", "Der Käufer", "vergleicht Inserate statt Wahrheiten."], ["05", "Der Vermarkter", "schaltet Kampagnen in eine Blackbox."]];
function ErkenntnisSt() {
  const [ref, p] = usePinProgress();
  const n = PERSPEKT.length;
  // Track fährt über 0–0.82 durch; danach kurzer Halt
  const shift = stC(p / 0.86) * (n - 1);
  if (RMs) {
    return /*#__PURE__*/React.createElement("section", {
      "data-screen-label": "Erkenntnis",
      className: "u-grain",
      style: {
        ...stackCard(3, "var(--paper)"),
        padding: "185px 7vw"
      }
    }, /*#__PURE__*/React.createElement(KapSt, {
      nr: "02",
      label: "Erkenntnis"
    }), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: "0 0 48px",
        font: "500 clamp(30px, 3.2vw, 52px)/1.08 var(--font-display)",
        letterSpacing: "-0.03em",
        color: "var(--ink)",
        maxWidth: 880
      }
    }, "Wir kannten dieselben Probleme", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-muted)"
      }
    }, "von f\xFCnf verschiedenen Seiten.")), PERSPEKT.map(([nr, wer, was]) => /*#__PURE__*/React.createElement("div", {
      key: nr,
      style: {
        display: "grid",
        gridTemplateColumns: "52px 220px 1fr",
        gap: 24,
        padding: "34px 0",
        borderTop: "1px solid var(--hairline-dark)",
        alignItems: "baseline"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "13px var(--font-mono)",
        color: "var(--signal-deep)"
      }
    }, nr), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "500 19px var(--font-display)",
        color: "var(--ink)"
      }
    }, wer), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "400 16px/1.6 var(--font-display)",
        color: "var(--text-muted)"
      }
    }, was))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "64px 0 0",
        font: "500 clamp(20px, 2vw, 30px)/1.4 var(--font-display)",
        letterSpacing: "-0.02em",
        color: "var(--ink)",
        maxWidth: 720
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        display: "inline-block",
        width: 11,
        height: 11,
        borderRadius: "50%",
        background: "var(--signal)",
        marginRight: 14
      }
    }), "Einzeln lindert man Symptome. Gemeinsam baut man ein System. Also taten wir, was in dieser Branche niemand tut: Wir haben fusioniert."));
  }
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "Erkenntnis",
    style: {
      height: "340vh",
      ...stackCard(3, "var(--paper)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "sticky",
      top: 0,
      height: "100svh",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(KapSt, {
    nr: "02",
    label: "Erkenntnis"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "7vw",
      top: "13vh",
      right: "7vw",
      zIndex: 4
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(26px, 2.8vw, 44px)/1.08 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)",
      maxWidth: 620
    }
  }, "Wir kannten dieselben Probleme", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, "von f\xFCnf verschiedenen Seiten."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      width: n * 100 + "%",
      transform: `translateX(${-(shift / n) * 100}%)`
    }
  }, PERSPEKT.map(([nr, wer, was]) => /*#__PURE__*/React.createElement("div", {
    key: nr,
    style: {
      width: 100 / n + "%",
      flex: "none",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 7vw"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "5vw",
      top: "22%",
      font: "500 clamp(180px, 34vw, 460px)/0.8 var(--font-display)",
      letterSpacing: "-0.05em",
      color: "rgba(11,10,9,0.06)",
      pointerEvents: "none",
      userSelect: "none"
    }
  }, nr), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "13px var(--font-mono)",
      color: "var(--signal-deep)"
    }
  }, nr, " / 05"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "18px 0 0",
      font: "500 clamp(34px, 4.6vw, 76px)/1.02 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, wer), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 0",
      font: "400 clamp(17px, 1.7vw, 24px)/1.5 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 440
    }
  }, was))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "7vw",
      bottom: "9vh",
      display: "flex",
      gap: 8
    }
  }, PERSPEKT.map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: i === Math.round(shift) ? 22 : 7,
      height: 7,
      borderRadius: 4,
      background: i === Math.round(shift) ? "var(--signal)" : "var(--hairline-dark)",
      transition: "all 300ms var(--ease-unio)"
    }
  })))));
}
/* orange Statement nach der Strecke — allein auf viel Weißraum */
function StatementSt() {
  const [ref, p] = usePinProgress();
  const words = "Einzeln lindert man Symptome. Gemeinsam baut man ein System. Also taten wir, was in dieser Branche niemand tut: Wir haben fusioniert.".split(" ");
  const lit = RMs ? words.length : Math.round(stC(p / 0.82) * words.length);
  if (RMs) {
    return /*#__PURE__*/React.createElement("section", {
      "data-screen-label": "Statement",
      className: "u-grain",
      style: {
        ...stackCard(3, "var(--paper)"),
        padding: "150px 7vw 170px"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "0 auto",
        font: "500 clamp(24px, 3vw, 46px)/1.32 var(--font-display)",
        letterSpacing: "-0.02em",
        color: "var(--ink)",
        maxWidth: 920,
        textAlign: "center"
      }
    }, words.join(" ")));
  }
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "Statement",
    style: {
      height: "300vh",
      ...stackCard(3, "var(--paper)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "sticky",
      top: 0,
      height: "100svh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 8vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "500 clamp(28px, 3.4vw, 56px)/1.3 var(--font-display)",
      letterSpacing: "-0.02em",
      maxWidth: 1000,
      textAlign: "center"
    }
  }, words.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      color: i < lit ? "var(--ink)" : "rgba(11,10,9,0.16)",
      transition: "color 300ms var(--ease-unio)"
    }
  }, w, i < words.length - 1 ? " " : "")))));
}

/* ===== 03 · FÜNF UNTERNEHMEN, EINE MISSION — Fusions-Fluss (ohne Trattner) ===== */
const FIRMEN = [["Boom Living", 0], ["Ad Boutique", 1], ["appworks", 2], ["marlin", 2], ["DCS", 2]];
const KNOTEN = ["Vertrieb", "Marketing", "Technologie & Automation"];
const DISZ_KARTEN = [["Vertrieb", "BOOM LIVING", "Jahrzehnte Wiener Abschlusserfahrung — Menschen, die Märkte lesen und Deals schließen."], ["Marketing", "Ad Boutique", "Kampagnen, Stories und Performance für Immobilien — 1 Mrd. Impressionen über Kampagnen."], ["Technologie & Automation", "appworks · marlin · Digital Contract Solutions", "Software, Daten und digitale Verträge — das Betriebssystem unter allem."]];
function FusionFlow() {
  const ref = React.useRef(null);
  const [fp, setFp] = React.useState(RMs ? 1 : 0);
  React.useEffect(() => {
    if (RMs) return;
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setFp(stC((innerHeight * 0.88 - r.top) / (r.height * 0.85)));
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    return () => removeEventListener("scroll", on);
  }, []);
  const seg = (a, b) => stC((fp - a) / (b - a));
  const l1 = seg(0.08, 0.45),
    l2 = seg(0.45, 0.75),
    fin = fp > 0.82;
  const srcY = i => 72 + i * 64;
  const nodeY = i => 96 + i * 104;
  const draw = (k, len) => ({
    strokeDasharray: len,
    strokeDashoffset: (1 - k) * len
  });
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Fusion",
    className: "u-grain",
    style: {
      ...stackCard(4, "var(--paper-2)"),
      padding: "150px 7vw 175px"
    }
  }, /*#__PURE__*/React.createElement(KapSt, {
    nr: "03",
    label: "Fusion"
  }), /*#__PURE__*/React.createElement(Chapter, {
    title: /*#__PURE__*/React.createElement("span", null, "F\xFCnf Unternehmen.", /*#__PURE__*/React.createElement("br", null), "Eine Mission."),
    copy: "2026 \u2014 Die Fusion: Drei Disziplinen verschmelzen zu einer Kategorie, die es so nicht gab.",
    style: {
      marginBottom: 76
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: "4%",
      top: "8%",
      font: "500 clamp(120px, 20vw, 300px)/0.8 var(--font-display)",
      letterSpacing: "-0.05em",
      color: "rgba(255,170,9,0.07)",
      pointerEvents: "none",
      userSelect: "none"
    }
  }, "1"), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 800 400",
    style: {
      width: "100%",
      display: "block",
      overflow: "visible",
      position: "relative"
    },
    "aria-label": "Fusions-Fluss: f\xFCnf Unternehmen flie\xDFen in drei Disziplinen und weiter in UNIO"
  }, FIRMEN.map(([f, k], i) => /*#__PURE__*/React.createElement("g", {
    key: f
  }, /*#__PURE__*/React.createElement("line", {
    x1: "150",
    y1: srcY(i),
    x2: "400",
    y2: nodeY(k),
    stroke: "var(--hairline-dark)",
    strokeWidth: "1.2",
    style: draw(stC(l1 * 1.35 - i * 0.07), 320)
  }), f === "Ad Boutique" && /*#__PURE__*/React.createElement("line", {
    x1: "150",
    y1: srcY(i),
    x2: "400",
    y2: nodeY(0),
    stroke: "var(--hairline-dark)",
    strokeWidth: "1.2",
    style: draw(stC(l1 * 1.35 - i * 0.07), 320)
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "150",
    cy: srcY(i),
    r: "4.5",
    fill: "var(--ink)",
    opacity: 0.2 + 0.8 * stC(l1 * 2 - i * 0.1)
  }), /*#__PURE__*/React.createElement("text", {
    x: "136",
    y: srcY(i) + 4,
    textAnchor: "end",
    style: {
      font: "10.5px var(--font-mono)",
      letterSpacing: "0.06em",
      fill: "var(--ink-2)"
    }
  }, f))), KNOTEN.map((nm, i) => /*#__PURE__*/React.createElement("g", {
    key: nm
  }, /*#__PURE__*/React.createElement("line", {
    x1: "400",
    y1: nodeY(i),
    x2: "700",
    y2: "200",
    stroke: "var(--hairline-dark)",
    strokeWidth: "1.2",
    style: draw(stC(l2 * 1.3 - i * 0.1), 330)
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "400",
    cy: nodeY(i),
    r: "6",
    fill: "none",
    stroke: "var(--ink)",
    strokeWidth: "1.5",
    opacity: 0.25 + 0.75 * stC(l1 * 1.6 - 0.4)
  }), /*#__PURE__*/React.createElement("text", {
    x: "400",
    y: nodeY(i) - 16,
    textAnchor: "middle",
    style: {
      font: "10.5px var(--font-mono)",
      letterSpacing: "0.1em",
      fill: "var(--ink)",
      textTransform: "uppercase",
      opacity: 0.3 + 0.7 * l1
    }
  }, nm))), /*#__PURE__*/React.createElement("circle", {
    cx: "700",
    cy: "200",
    r: fin ? 11 : 5,
    fill: "var(--signal)",
    style: {
      transition: "r 400ms var(--ease-unio)"
    }
  }), /*#__PURE__*/React.createElement("text", {
    x: "700",
    y: "238",
    textAnchor: "middle",
    style: {
      font: "12px var(--font-mono)",
      letterSpacing: "0.14em",
      fill: "var(--signal-deep)",
      opacity: fin ? 1 : 0,
      transition: "opacity 400ms"
    }
  }, "UNIO \xB7 2026"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      marginTop: 80
    }
  }, DISZ_KARTEN.map(([t, firms, ptxt], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-raised)",
      borderRadius: "var(--r-card)",
      padding: "26px 28px 24px",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
      minHeight: 210
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "11px var(--font-mono)",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--signal-deep)"
    }
  }, firms), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 22px/1.15 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)",
      marginTop: 34
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      font: "400 14px/1.6 var(--font-display)",
      color: "var(--text-muted)"
    }
  }, ptxt))))));
}

/* ===== 04 · WARUM · WIE · WAS — Golden Circle (Ring-Labels, Zentrum nur Punkt) ===== */
const HOW_LABELS = ["Raum", "Technologie", "Mensch"];
const WHAT_CHIPS = ["NOVA", "LEAD ENGINE", "CIRCLE", "LENS"];
const CIRCLE_COPY = [["WARUM", "Der Markt ist eine Blackbox. Menschen verdienen Klarheit.", "Die Überzeugung hinter der Fusion — und der Maßstab für jede Entscheidung seither."], ["WIE", "Raum · Technologie · Mensch.", "Drei Disziplinen, die einander brauchen — keine funktioniert allein."], ["WAS", "Ein Betriebssystem für Immobilienvertrieb.", "NOVA, LEAD ENGINE, CIRCLE und LENS — vier Module, ein System. Live in LENS."]];
function GoldenCircle() {
  const [ref, p] = usePinProgress();
  const seg = (a, b) => stC((p - a) / (b - a));
  const r1 = seg(0.04, 0.3),
    r2 = seg(0.32, 0.58),
    r3 = seg(0.6, 0.88);
  const R = [74, 128, 182];
  const pos = (r, deg) => {
    const a = deg * Math.PI / 180;
    return [210 + r * Math.cos(a), 210 + r * Math.sin(a)];
  };
  const ring = (r, k) => {
    const C = 2 * Math.PI * r;
    return /*#__PURE__*/React.createElement("circle", {
      cx: "210",
      cy: "210",
      r: r,
      fill: "none",
      stroke: "var(--ink-3)",
      strokeOpacity: "0.5",
      strokeWidth: "1.5",
      strokeDasharray: C,
      strokeDashoffset: (1 - k) * C,
      transform: "rotate(-90 210 210)",
      strokeLinecap: "round"
    });
  };
  const active = p < 0.32 ? 0 : p < 0.6 ? 1 : 2;
  const copy = CIRCLE_COPY[active];
  const ringLabel = (txt, r, k) => {
    const [x, y] = pos(r, -90);
    return /*#__PURE__*/React.createElement("span", {
      className: "u-label",
      style: {
        position: "absolute",
        left: x / 420 * 100 + "%",
        top: y / 420 * 100 + "%",
        transform: "translate(-50%, -50%)",
        fontSize: 10,
        padding: "5px 12px",
        borderRadius: "var(--r-pill)",
        background: "var(--paper)",
        boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
        color: k > 0.5 ? "var(--signal-deep)" : "var(--text-muted)",
        opacity: k > 0.2 ? 1 : 0,
        transition: "all 400ms var(--ease-unio)",
        whiteSpace: "nowrap"
      }
    }, txt);
  };
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "Warum",
    style: {
      height: "260vh",
      ...stackCard(5, "var(--paper-2)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "sticky",
      top: 0,
      height: "100svh",
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
      alignItems: "center",
      padding: "0 6vw",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(KapSt, {
    nr: "04",
    label: "Warum \xB7 Wie \xB7 Was"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "min(100%, 62svh)",
      aspectRatio: "1",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 420 420",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      overflow: "visible"
    },
    "aria-hidden": "true"
  }, ring(R[0], r1), ring(R[1], r2), ring(R[2], r3)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) scale(${0.6 + 0.4 * r1})`,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "var(--signal)",
      boxShadow: "0 0 0 6px var(--signal-soft)",
      animation: RMs ? "none" : "uPulse 2.4s var(--ease-unio) infinite"
    }
  }), ringLabel("Warum", R[0], r1), ringLabel("Wie", R[1], r2), ringLabel("Was", R[2], r3), HOW_LABELS.map((l, i) => {
    const [x, y] = pos(R[1], -30 + i * 120);
    const on = r2 > (i + 1) / 3.6;
    return /*#__PURE__*/React.createElement("span", {
      key: l,
      className: "u-label",
      style: {
        position: "absolute",
        left: x / 420 * 100 + "%",
        top: y / 420 * 100 + "%",
        transform: "translate(-50%, -50%)",
        fontSize: 10,
        padding: "6px 12px",
        borderRadius: "var(--r-pill)",
        background: "var(--paper)",
        boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
        color: "var(--ink-2)",
        opacity: on ? 1 : 0,
        transition: "opacity 400ms var(--ease-unio)",
        whiteSpace: "nowrap"
      }
    }, l);
  }), WHAT_CHIPS.map((c, i) => {
    const deg = -90 + i * 90 + 45;
    const [x, y] = pos(R[2], deg);
    const on = r3 > (i + 1) / 5;
    const isLens = c === "LENS";
    return /*#__PURE__*/React.createElement("div", {
      key: c,
      style: {
        position: "absolute",
        left: x / 420 * 100 + "%",
        top: y / 420 * 100 + "%",
        transform: "translate(-50%, -50%)",
        opacity: on ? 1 : 0,
        transition: "opacity 400ms var(--ease-unio)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "u-label",
      style: {
        fontSize: 9,
        padding: "6px 12px",
        borderRadius: "var(--r-pill)",
        background: isLens ? "var(--signal)" : "var(--paper)",
        color: isLens ? "#FFF" : "var(--ink-2)",
        boxShadow: isLens ? "none" : "inset 0 0 0 1px var(--hairline-dark)",
        whiteSpace: "nowrap"
      }
    }, c), isLens && on && /*#__PURE__*/React.createElement(UIMiniLens, {
      width: 150,
      play: on
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "12px var(--font-mono)",
      letterSpacing: "0.18em",
      color: "var(--signal-deep)"
    }
  }, copy[0]), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "14px 0 0",
      font: "500 clamp(28px, 2.8vw, 46px)/1.06 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)",
      minHeight: "2.2em"
    }
  }, copy[1]), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      font: "400 16px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 380
    }
  }, copy[2]))));
}

/* ===== 05 · DIE MENSCHEN DAHINTER ===== */
const TEAM_PORTRAITS = [{
  src: "../../assets/team/portrait-01.jpg",
  pos: "center 22%",
  nm: "Jacob Kapsch",
  role: "Founder",
  disz: "Marketing",
  v: "1 Mrd.",
  label: "Impressionen · Kampagnen",
  spark: [3, 5, 4, 7, 9]
}, {
  src: "../../assets/team/portrait-02.jpg",
  pos: "center 20%",
  nm: "Johannes Lindner",
  role: "Founder",
  disz: "Vertrieb",
  v: "300 Mio+",
  label: "€ Projektvolumen",
  spark: [2, 4, 6, 5, 8]
}, {
  src: "../../assets/team/portrait-03.jpg",
  pos: "center 22%",
  nm: "Nikita Neznamov",
  role: "Founder",
  disz: "Technologie",
  v: "140+",
  label: "Datenpunkte je Objekt",
  spark: [4, 3, 6, 8, 7]
}, {
  src: "../../assets/team/portrait-04.jpg",
  pos: "center 18%",
  nm: "Wenzel Waechter",
  role: "Founder",
  disz: "Vertrieb",
  v: "T+38",
  label: "Ø Tage bis Abverkauf",
  spark: [8, 7, 5, 4, 2]
}, {
  src: "../../assets/team/portrait-05.jpg",
  pos: "center 20%",
  nm: "Florian Hörmann",
  role: "Founder",
  disz: "Vertrieb",
  v: "25+",
  label: "Makler im CIRCLE",
  spark: [2, 4, 5, 7, 8]
}, {
  src: "../../assets/team/portrait-06.jpg",
  pos: "center 18%",
  nm: "Daniel Hayden",
  role: "Founder",
  disz: "Marketing",
  v: "9",
  label: "Kanäle im Kampagnen-Mix",
  spark: [3, 5, 6, 7, 9]
}, {
  src: "../../assets/team/portrait-07.jpg",
  pos: "center 20%",
  nm: "Marcin Fituch",
  role: "Founder",
  disz: "Technologie",
  v: "8+",
  label: "Tech-Module in LENS",
  spark: [2, 3, 5, 6, 8]
}, {
  src: "../../assets/team/portrait-08.jpg",
  pos: "center 18%",
  nm: "Fabian Fuhrmann",
  role: "Founder",
  disz: "Vertrieb",
  v: "5",
  label: "Unternehmen fusioniert",
  spark: [4, 5, 6, 8, 9]
}];
function SparkSt({
  pts
}) {
  const max = Math.max(...pts),
    min = Math.min(...pts);
  const d = pts.map((p, i) => `${i / (pts.length - 1) * 100},${34 - (p - min) / (max - min) * 28}`).join(" ");
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 38",
    preserveAspectRatio: "none",
    style: {
      width: "100%",
      height: 34,
      display: "block"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: d,
    fill: "none",
    stroke: "rgba(255,255,255,0.85)",
    strokeWidth: "1.2",
    vectorEffect: "non-scaling-stroke"
  }));
}
function PortraitSt({
  p,
  delay
}) {
  const [on, setOn] = React.useState(false);
  return /*#__PURE__*/React.createElement(Reveal, {
    delay: delay
  }, /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false),
    onClick: () => setOn(v => !v),
    style: {
      position: "relative",
      borderRadius: "var(--r-card)",
      overflow: "hidden",
      aspectRatio: "3 / 4",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark)",
      cursor: "pointer",
      background: "var(--paper-2)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.src,
    alt: "Gr\xFCnderportr\xE4t",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: p.pos,
      transform: on ? "scale(1.03)" : "scale(1)",
      filter: on ? "brightness(0.72)" : "brightness(1)",
      transition: "all var(--dur-base) var(--ease-unio)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 12,
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.55)",
      opacity: on ? 1 : 0,
      transition: "opacity var(--dur-base) var(--ease-unio)",
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "16px 16px 12px",
      color: "#FFFFFF"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 28px/1 var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, p.v, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "12px var(--font-mono)",
      marginLeft: 6
    }
  }, "\u2197")), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      fontSize: 9,
      marginTop: 7,
      color: "rgba(255,255,255,0.85)"
    }
  }, p.label)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SparkSt, {
    pts: p.spark
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "inline-block",
      fontSize: 9,
      padding: "5px 11px",
      borderRadius: "var(--r-pill)",
      background: "rgba(255,255,255,0.2)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)",
      marginTop: 10
    }
  }, p.disz)))), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "500 16px var(--font-display)",
      letterSpacing: "-0.01em",
      color: "var(--ink)"
    }
  }, p.nm), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      fontSize: 10,
      marginTop: 4,
      display: "block"
    }
  }, p.role))));
}
function TeamSt() {
  const [fun, setFun] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Menschen",
    className: "u-grain",
    style: {
      ...stackCard(6, "var(--paper)"),
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(KapSt, {
    nr: "05",
    label: "Menschen"
  }), /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setFun(true),
    onMouseLeave: () => setFun(false),
    onClick: () => setFun(v => !v),
    style: {
      position: "relative",
      width: "100%",
      height: "82svh",
      minHeight: 560,
      cursor: "pointer",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/team/gruppe-serioes.jpg",
    alt: "Das UNIO Gr\xFCnderteam",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center 30%"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/team/gruppe-lustig.jpg",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center 30%",
      opacity: fun ? 1 : 0,
      transition: "opacity var(--dur-base) var(--ease-unio)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.28), transparent 34%, transparent 52%, rgba(11,10,9,0.68))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "7vw",
      right: "7vw",
      bottom: "8vh",
      color: "var(--text-inverse)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(40px, 5vw, 88px)/1 var(--font-display)",
      letterSpacing: "-0.03em",
      textShadow: "0 2px 40px rgba(0,0,0,0.4)"
    }
  }, "Die Menschen dahinter."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 0",
      font: "400 18px/1.6 var(--font-display)",
      color: "rgba(247,245,241,0.9)",
      maxWidth: 520
    }
  }, "Acht Gr\xFCnder, drei Disziplinen, eine Firma. Ernst k\xF6nnen wir \u2014 Spa\xDF auch.")), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      position: "absolute",
      right: 22,
      top: 100,
      color: "var(--text-inverse)",
      fontSize: 10,
      background: "var(--glass-dark)",
      WebkitBackdropFilter: "blur(12px)",
      backdropFilter: "blur(12px)",
      padding: "7px 13px",
      borderRadius: "var(--r-pill)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light)"
    }
  }, fun ? "…und so wirklich." : "So sehen wir offiziell aus —")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "72px 7vw 175px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 14
    }
  }, TEAM_PORTRAITS.map((p, i) => /*#__PURE__*/React.createElement(PortraitSt, {
    key: p.src,
    p: p,
    delay: i % 4 * 80
  })))));
}

/* ===== 06 · WO WIR STEHEN. WOHIN WIR GEHEN — Roadmap, horizontal gepinnt ===== */
const MEILEN = [{
  j: "2024",
  t: "Die Säulen arbeiten getrennt",
  type: "past"
}, {
  j: "2025",
  t: "Erste gemeinsame Projekte — Ecoluxe, Albrecht",
  type: "past"
}, {
  j: "2026",
  t: "Die Fusion · Validierungsjahr — wir beweisen es gerade.",
  type: "now"
}, {
  j: "—",
  t: "[PLATZHALTER: Ziel CIRCLE-Partner]",
  type: "future"
}, {
  j: "—",
  t: "[PLATZHALTER: Projekte im System]",
  type: "future"
}, {
  j: "—",
  t: "[PLATZHALTER: Expansion]",
  type: "future"
}];
function marker(m) {
  return {
    width: 15,
    height: 15,
    borderRadius: "50%",
    flex: "none",
    background: m.type === "now" ? "var(--signal)" : m.type === "past" ? "var(--ink)" : "transparent",
    boxShadow: m.type === "future" ? "inset 0 0 0 1.5px var(--ink-3)" : m.type === "now" ? "0 0 0 5px var(--signal-soft)" : "none",
    animation: m.type === "now" && !RMs ? "uPulse 2.2s var(--ease-unio) infinite" : "none"
  };
}
function SkalaSt() {
  const [ref, p] = usePinProgress();
  const shift = stC(p / 0.9);
  if (RMs) {
    return /*#__PURE__*/React.createElement("section", {
      "data-screen-label": "Meilensteine",
      className: "u-grain",
      style: {
        ...stackCard(7, "var(--paper-2)"),
        padding: "175px 7vw"
      }
    }, /*#__PURE__*/React.createElement(KapSt, {
      nr: "06",
      label: "Roadmap"
    }), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: "0 0 56px",
        font: "500 clamp(32px, 3.4vw, 56px)/1.04 var(--font-display)",
        letterSpacing: "-0.03em",
        color: "var(--ink)"
      }
    }, "Wo wir stehen.", /*#__PURE__*/React.createElement("br", null), "Wohin wir gehen."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24
      }
    }, MEILEN.map((m, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: marker(m)
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "13px var(--font-mono)",
        color: m.type === "now" ? "var(--signal-deep)" : "var(--ink)"
      }
    }, m.j), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: "400 14px/1.5 var(--font-display)",
        color: m.type === "future" ? "var(--text-muted)" : "var(--ink-2)"
      }
    }, m.t)))), /*#__PURE__*/React.createElement("p", {
      className: "u-label",
      style: {
        margin: "48px 0 0",
        color: "var(--text-muted)",
        fontSize: 10
      }
    }, "Offene Punkte tragen wir ein, wenn sie erreicht sind \u2014 nicht vorher."));
  }
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "Meilensteine",
    style: {
      height: "320vh",
      ...stackCard(7, "var(--paper-2)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      position: "sticky",
      top: 0,
      height: "100svh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(KapSt, {
    nr: "06",
    label: "Roadmap"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "7vw",
      top: "13vh"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(28px, 3vw, 50px)/1.04 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Wo wir stehen.", /*#__PURE__*/React.createElement("br", null), "Wohin wir gehen.")), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: "5vw",
      top: "16vh",
      font: "500 clamp(140px, 22vw, 340px)/0.8 var(--font-display)",
      letterSpacing: "-0.05em",
      color: "rgba(255,170,9,0.07)",
      pointerEvents: "none",
      userSelect: "none"
    }
  }, "2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginTop: "6vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 30,
      height: 14,
      backgroundImage: "repeating-linear-gradient(90deg, var(--hairline-dark) 0 1px, transparent 1px 24px)",
      borderBottom: "1.5px solid var(--ink-3)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: MEILEN.length * 42 + "%",
      transform: `translateX(${-shift * (MEILEN.length * 42 - 100) * (100 / (MEILEN.length * 42))}%)`,
      transition: "none",
      paddingLeft: "7vw"
    }
  }, MEILEN.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 100 / MEILEN.length + "%",
      flex: "none",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      paddingRight: "4vw"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: marker(m)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "14px var(--font-mono)",
      color: m.type === "now" ? "var(--signal-deep)" : m.type === "future" ? "var(--text-muted)" : "var(--ink)"
    }
  }, m.j), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 15px/1.5 var(--font-display)",
      color: m.type === "future" ? "var(--text-muted)" : "var(--ink-2)",
      maxWidth: "22ch"
    }
  }, m.t))))), /*#__PURE__*/React.createElement("p", {
    className: "u-label",
    style: {
      position: "absolute",
      left: "7vw",
      bottom: "9vh",
      color: "var(--text-muted)",
      fontSize: 10
    }
  }, "Offene Punkte tragen wir ein, wenn sie erreicht sind \u2014 nicht vorher.")));
}

/* ===== 07 · FINALE ===== */
function FinaleSt() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Finale",
    className: "u-grain",
    style: {
      ...stackCard(8, "var(--paper)"),
      padding: "150px 7vw 175px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(KapSt, {
    nr: "07",
    label: "Finale"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 auto 30px",
      font: "400 clamp(17px, 1.8vw, 22px)/1.55 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 560
    }
  }, "Was als \xDCberzeugung begann, ist heute ein System. Und wir fangen gerade erst an."), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(40px, 5vw, 84px)/1 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Raum. Technologie.", /*#__PURE__*/React.createElement("br", null), "Mensch", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--signal)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement(Bs, {
    size: "lg",
    variant: "signal",
    knob: true,
    onClick: () => location.assign("kontakt.html")
  }, "Mit uns sprechen")));
}
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)"
    }
  }, /*#__PURE__*/React.createElement(SiteNav, {
    active: "story.html"
  }), /*#__PURE__*/React.createElement(HeroSt, null), /*#__PURE__*/React.createElement(ErkenntnisSt, null), /*#__PURE__*/React.createElement(StatementSt, null), /*#__PURE__*/React.createElement(FusionFlow, null), /*#__PURE__*/React.createElement(GoldenCircle, null), /*#__PURE__*/React.createElement(TeamSt, null), /*#__PURE__*/React.createElement(SkalaSt, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 9
    }
  }, /*#__PURE__*/React.createElement(SiteFooter, null)));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/page-story.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/site-shared.jsx
try { (() => {
/* UNIO Website — geteilte Bausteine für alle Seiten.
   Lädt vor den Seiten-Skripten; exportiert über window. */
const {
  GlassPanel,
  GlassCard,
  DataOverlay,
  FlutedGlass,
  StatBlock,
  DataLabel,
  Button,
  IconButton,
  Chip,
  Tag,
  Input,
  Select
} = window.UNIODesignSystem_b6216a;
const APP_URL = "https://app.unio.at";
const BEWERTUNG_URL = "https://bewertung.unio.at";
const SEARCH_URL = "https://app.unio.at/listing?listingType=SALE";
const PROJEKT_URL = "projekt.html";

/* Loop-Ticker für Bento-Animationen */
function useTick(steps, ms) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setT(x => (x + 1) % steps), ms);
    return () => clearInterval(id);
  }, [steps, ms]);
  return t;
}

/* Scroll-Reveal */
function Reveal({
  children,
  delay = 0,
  style
}) {
  const ref = React.useRef(null);
  const [inView, setIn] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        setIn(true);
        io.disconnect();
      }
    }, {
      threshold: 0.2
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(20px)",
      transition: `all var(--dur-base) var(--ease-unio) ${delay}ms`,
      ...style
    }
  }, children);
}

/* Navigation (alle Seiten) */
const NAV_LINKS = [["Makler", "makler.html"], ["Bauträger", "bautraeger.html"], ["Immobilien", "immobilien.html"], ["Story", "story.html"], ["Kontakt", "kontakt.html"]];
function NavLink({
  href,
  label,
  on,
  solid
}) {
  const [h, setH] = React.useState(false);
  const col = solid ? on || h ? "var(--ink)" : "var(--text-muted)" : on || h ? "#FFFFFF" : "rgba(247,245,241,0.72)";
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: "relative",
      color: col,
      textDecoration: "none",
      paddingBottom: 4,
      transition: "color 300ms var(--ease-unio)"
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 0,
      bottom: 0,
      height: 1.5,
      width: on || h ? "100%" : "0%",
      background: "var(--signal)",
      transition: "width 300ms var(--ease-unio)"
    }
  }));
}
function SiteNav({
  active,
  cta
}) {
  const c = cta || {
    label: "Login",
    onClick: () => window.open("https://app.unio.at", "_blank")
  };
  const [pill, setPill] = React.useState(false);
  React.useEffect(() => {
    const on = () => setPill(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, {
      passive: true
    });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      padding: pill ? "16px 40px" : "22px 40px",
      transition: "padding .55s var(--ease-unio)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: pill ? 760 : 1400,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      padding: pill ? "9px 10px 9px 22px" : "12px 12px 12px 26px",
      borderRadius: pill ? 12 : 16,
      background: pill ? "rgba(247,245,241,0.62)" : "rgba(247,245,241,0.5)",
      border: "0.5px solid " + (pill ? "rgba(20,18,16,0.12)" : "rgba(255,255,255,0.42)"),
      WebkitBackdropFilter: "blur(24px) saturate(1.8)",
      backdropFilter: "blur(24px) saturate(1.8)",
      boxShadow: pill ? "0 8px 30px rgba(20,18,16,.1), inset 0 1px 0 rgba(255,255,255,.6)" : "0 8px 34px rgba(11,10,9,.18), inset 0 1px 0 rgba(255,255,255,.5)",
      transition: "background .55s var(--ease-unio), border-color .55s var(--ease-unio), padding .55s var(--ease-unio), max-width .55s var(--ease-unio), box-shadow .55s var(--ease-unio), border-radius .55s var(--ease-unio)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: pill ? "0 0 auto" : "1 1 0",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    style: {
      display: "flex",
      alignItems: "center",
      flex: "0 0 auto",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/unio-logo-black.svg",
    alt: "UNIO",
    style: {
      height: 18,
      width: "auto",
      display: "block"
    }
  }))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: pill ? 22 : 28,
      marginLeft: pill ? 30 : 0,
      font: `500 ${pill ? 13 : 14}px var(--font-display)`,
      transition: "gap .55s var(--ease-unio)"
    }
  }, NAV_LINKS.map(([l, href]) => /*#__PURE__*/React.createElement(NavLink, {
    key: href,
    href: href,
    label: l,
    on: active === href,
    solid: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: pill ? "0 0 auto" : "1 1 0",
      display: "flex",
      justifyContent: "flex-end",
      marginLeft: pill ? "auto" : 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: c.onClick || undefined,
    style: {
      flex: "0 0 auto",
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontSize: 13,
      fontWeight: 500,
      padding: "10px 20px",
      borderRadius: pill ? 8 : 999,
      border: "0.5px solid " + (pill ? "var(--signal)" : "rgba(20,18,16,0.28)"),
      background: pill ? "var(--signal)" : "rgba(255,255,255,0.55)",
      color: pill ? "var(--on-signal)" : "var(--ink)",
      transition: "all .4s var(--ease-unio)"
    }
  }, c.label))));
}

/* Seiten-Hero mit Riffelglas-Streifen (Transparenz-Motiv) */
function PageHero({
  img,
  pos = "center",
  headline,
  sub,
  children,
  height = "88vh",
  reveal = 0.55,
  glow = false
}) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const on = () => setP(Math.min(1, window.scrollY / (window.innerHeight * 0.7)));
    on();
    window.addEventListener("scroll", on, {
      passive: true
    });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Hero",
    style: {
      position: "relative",
      background: "var(--paper)",
      padding: "98px 40px 0",
      overflow: "hidden"
    }
  }, glow && /*#__PURE__*/React.createElement("div", {
    className: "u-herglow",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-10%",
      top: "10%",
      width: "55%",
      height: "80%",
      zIndex: 0,
      pointerEvents: "none",
      background: "radial-gradient(60% 60% at 20% 40%, rgba(255,170,9,.20) 0%, rgba(255,219,87,.10) 42%, transparent 72%)",
      animation: p !== undefined ? "heroGlowDrift 30s ease-in-out infinite alternate" : "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      minHeight: 520,
      overflow: "hidden",
      borderRadius: 22,
      border: "0.5px solid var(--hairline-dark)",
      boxShadow: "0 1px 0 rgba(255,255,255,.6) inset",
      background: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement(FlutedGlass, {
    reveal: reveal + p * (1 - reveal),
    side: "left",
    strength: 12,
    style: {
      position: "absolute",
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: pos,
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.3), transparent 34%, transparent 52%, rgba(11,10,9,0.62))",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "clamp(28px, 4vw, 60px)",
      right: "clamp(28px, 4vw, 60px)",
      bottom: "clamp(40px, 6vh, 60px)",
      color: "var(--text-inverse)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "500 clamp(44px, 5.6vw, 96px)/1 var(--font-display)",
      letterSpacing: "-0.03em",
      textShadow: "0 2px 40px rgba(0,0,0,0.4)",
      maxWidth: 980
    }
  }, headline), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px 0 0",
      maxWidth: 500,
      font: "400 18px/1.55 var(--font-display)",
      color: "var(--text-inverse-muted)"
    }
  }, sub), children)));
}

/* Kapitel-Header (nr nur bei echten Aufzählungen setzen) */
function Chapter({
  nr,
  title,
  copy,
  tone = "light",
  style
}) {
  const dark = tone === "dark";
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(U_RM);
  React.useEffect(() => {
    if (U_RM || !ref.current) return;
    const io = new IntersectionObserver(e => setSeen(e[0].isIntersecting), {
      threshold: 0,
      rootMargin: "-12% 0px -12% 0px"
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const rev = d => ({
    opacity: seen ? 1 : 0,
    filter: seen ? "blur(0)" : "blur(8px)",
    transform: seen ? "none" : "translateY(20px)",
    transition: `opacity 900ms var(--ease-unio) ${d}ms, filter 900ms var(--ease-unio) ${d}ms, transform 950ms var(--ease-unio) ${d}ms`
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: "grid",
      gridTemplateColumns: nr ? "64px minmax(0, 1.35fr) minmax(0, 1fr)" : "minmax(0, 1.35fr) minmax(0, 1fr)",
      gap: 44,
      alignItems: "end",
      ...style
    }
  }, nr ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "14px var(--font-mono)",
      color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)",
      paddingBottom: 8,
      ...rev(0)
    }
  }, nr) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(34px, 3.6vw, 60px)/1.04 var(--font-display)",
      letterSpacing: "-0.03em",
      color: dark ? "var(--text-inverse)" : "var(--ink)",
      ...rev(90)
    }
  }, title), copy ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 17px/1.8 var(--font-display)",
      color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)",
      maxWidth: 440,
      ...rev(180)
    }
  }, copy) : /*#__PURE__*/React.createElement("span", null));
}

/* Objektkarte (Endkunde — ohne B2B-Metriken) */
function PropCard({
  o,
  hov,
  onHov
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: PROJEKT_URL,
    onMouseEnter: onHov,
    onMouseLeave: () => onHov && onHov(false),
    style: {
      textDecoration: "none",
      display: "block",
      background: "var(--surface-raised)",
      borderRadius: "var(--r-card)",
      padding: 8,
      boxShadow: hov ? "inset 0 0 0 1px var(--hairline-dark), var(--shadow-soft)" : "inset 0 0 0 1px var(--hairline-dark)",
      transform: hov ? "translateY(-4px)" : "none",
      transition: "all var(--dur-fast) var(--ease-unio)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "calc(var(--r-card) - 8px)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: o.img,
    alt: o.t,
    style: {
      display: "block",
      width: "100%",
      height: 210,
      objectFit: "cover",
      transform: hov ? "scale(1.04)" : "scale(1)",
      transition: "transform var(--dur-slow) var(--ease-unio)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 12,
      left: 12,
      display: "flex",
      gap: 6
    }
  }, o.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "u-label",
    style: {
      fontSize: 10,
      padding: "5px 10px",
      borderRadius: "var(--r-pill)",
      background: "var(--glass-dark)",
      WebkitBackdropFilter: "blur(12px)",
      backdropFilter: "blur(12px)",
      color: "var(--text-inverse)",
      boxShadow: "inset 0 0 0 1px var(--hairline-light)"
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 16px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)",
      fontSize: 10
    }
  }, o.loc), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 20px/1.15 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)",
      marginTop: 6
    }
  }, o.t), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 14,
      borderTop: "1px solid var(--hairline-dark)",
      paddingTop: 12
    }
  }, o.live ? /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 10,
      color: "var(--signal-deep)",
      display: "inline-flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--signal)"
    }
  }), "Live vermarktet") : /*#__PURE__*/React.createElement("span", {
    style: {
      font: "14px var(--font-mono)",
      color: "var(--ink-2)"
    }
  }, o.price), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "13px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, "\u2197"))));
}
const OBJEKT_DB = [{
  img: "../../assets/img/albrecht.jpg",
  t: "Das Albrecht — Townhäuser",
  loc: "Wien · 1170",
  tags: ["Neubau", "8 Einheiten"],
  live: true,
  q: "albrecht townhaus neubau 1170 hernals haus"
}, {
  img: "../../assets/img/obenzwei.jpg",
  t: "Obenzwei — Penthouse",
  loc: "Wien · 2. Bezirk",
  tags: ["Penthouse", "Bestlage"],
  price: "Auf Anfrage",
  q: "obenzwei penthouse terrasse 1020 leopoldstadt wohnung"
}, {
  img: "../../assets/img/beheim.jpg",
  t: "Penthouse Beheim",
  loc: "Wien · 1170",
  tags: ["2 Penthäuser", "Erstbezug"],
  price: "€ 1,7 Mio",
  q: "beheim penthouse erstbezug 1170 wohnung terrasse"
}, {
  img: "../../assets/img/vienna-garden.jpg",
  t: "Garten-Refugium Wienerwald",
  loc: "Wien-Umland",
  tags: ["Haus", "Pool"],
  price: "€ 1,9 Mio",
  q: "haus garten pool gruen wienerwald refugium"
}, {
  img: "../../assets/img/penthouse.jpg",
  t: "Penthouse über den Dächern",
  loc: "Wien · Innenstadt",
  tags: ["Penthouse", "Dachterrasse"],
  price: "€ 4 Mio",
  q: "penthouse dachterrasse innenstadt wohnung luxus"
}, {
  img: "../../assets/img/int-kitchen.jpg",
  t: "Stadtwohnung mit Charakter",
  loc: "Wien · 1040",
  tags: ["Altbau", "Saniert"],
  price: "€ 890.000",
  q: "altbau wohnung saniert 1040 wieden kueche"
}];

/* Footer */
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    "data-screen-label": "Footer",
    className: "u-grain",
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--paper-2)",
      color: "var(--ink-2)",
      padding: "175px 6vw 44px"
    }
  }, /*#__PURE__*/React.createElement(EmberGlow, {
    variant: "still",
    corner: "86% 88%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(44px, 5.4vw, 92px)/0.98 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Raum. Technologie.", /*#__PURE__*/React.createElement("br", null), "Mensch."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 36,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "paper",
    knob: true
  }, "Demo buchen"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "ghost",
    onClick: () => location.href = "kontakt.html"
  }, "Kontakt")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, auto)",
      justifyContent: "start",
      gap: "12px 48px",
      marginTop: 72,
      font: "400 14.5px var(--font-display)"
    }
  }, NAV_LINKS.map(([l, href]) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    style: {
      color: "var(--text-muted)",
      textDecoration: "none"
    }
  }, l)), /*#__PURE__*/React.createElement("a", {
    href: APP_URL,
    target: "_blank",
    rel: "noopener",
    style: {
      color: "var(--text-muted)",
      textDecoration: "none"
    }
  }, "Login \u2197"), /*#__PURE__*/React.createElement("a", {
    href: BEWERTUNG_URL,
    target: "_blank",
    rel: "noopener",
    style: {
      color: "var(--text-muted)",
      textDecoration: "none"
    }
  }, "Bewertung \u2197")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid var(--hairline-dark)",
      marginTop: 56,
      paddingTop: 24,
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/unio-logo-black.svg",
    alt: "UNIO",
    style: {
      height: 18,
      width: "auto"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: "400 13px var(--font-display)",
      color: "var(--text-muted)",
      textDecoration: "none"
    }
  }, "Impressum"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: "400 13px var(--font-display)",
      color: "var(--text-muted)",
      textDecoration: "none"
    }
  }, "Datenschutz"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)"
    }
  }, "\xA9 2026 UNIO \xB7 Wien")))));
}

/* ===== Software-Schicht-Bausteine (Startseiten-Briefing §3) ===== */
const U_RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
/* Globales Headline-Reveal: animiert alle Hero-/Section-Headlines (h1,h2) auf allen Seiten,
   beim Scroll-Eintritt, in beide Richtungen. Idempotent, überschreibt sich per IO neu. */
(() => {
  if (U_RM || window.__uHeadlineReveal) return;
  window.__uHeadlineReveal = true;
  const apply = (el, on) => {
    el.style.transition = "opacity 900ms cubic-bezier(.32,.72,0,1), transform 950ms cubic-bezier(.32,.72,0,1), filter 900ms cubic-bezier(.32,.72,0,1)";
    el.style.opacity = on ? "1" : "0";
    el.style.transform = on ? "none" : "translateY(22px)";
    el.style.filter = on ? "blur(0)" : "blur(9px)";
  };
  const io = new IntersectionObserver(es => es.forEach(e => apply(e.target, e.isIntersecting)), {
    threshold: 0,
    rootMargin: "-12% 0px -12% 0px"
  });
  const scan = () => {
    document.querySelectorAll("section h1, section h2").forEach(el => {
      if (el.dataset.rv || el.closest("[data-rv-skip]") || el.style && el.style.filter) return;
      el.dataset.rv = "1";
      const r = el.getBoundingClientRect();
      const vis = r.top < innerHeight && r.bottom > 0;
      apply(el, false);
      if (vis) requestAnimationFrame(() => requestAnimationFrame(() => apply(el, true)));
      io.observe(el);
    });
  };
  const boot = () => {
    scan();
    setTimeout(scan, 500);
    setTimeout(scan, 1500);
  };
  if (document.readyState === "complete" || document.readyState === "interactive") setTimeout(boot, 200);else addEventListener("DOMContentLoaded", boot);
})();
(() => {
  if (document.getElementById("u-shared-anim")) return;
  const s = document.createElement("style");
  s.id = "u-shared-anim";
  s.textContent = ["@keyframes uPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,170,9,.55)}70%{box-shadow:0 0 0 7px rgba(255,170,9,0)}}", "@keyframes uPulseInv{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.6)}70%{box-shadow:0 0 0 8px rgba(255,255,255,0)}}", "@keyframes uCell{from{opacity:.14}to{opacity:.85}}", "@keyframes uDraw{to{stroke-dashoffset:0}}", "@keyframes uMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}", "@keyframes bMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}", "@keyframes emberDrift{0%{transform:translate3d(-5%,-3%,0) rotate(-3deg) scale(1)}50%{transform:translate3d(4%,5%,0) rotate(4deg) scale(1.12)}100%{transform:translate3d(-2%,3%,0) rotate(-5deg) scale(1.05)}}", "@keyframes heroGlowDrift{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-6%,4.5%,0) scale(1.16)}100%{transform:translate3d(4%,-3%,0) scale(1.08)}}", "@media (prefers-reduced-motion: reduce){.u-herglow{animation:none!important}}", "@media (prefers-reduced-motion: reduce){.u-ember{animation:none!important}}", "@media (prefers-reduced-motion: reduce){.u-marquee{animation:none!important}}"].join("\n");
  document.head.appendChild(s);
})();

/* Live-Signal: Pill mit pulsierendem Orange-Punkt */
function LivePill({
  label = "Live",
  dark = true,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontSize: 10,
      padding: "6px 12px",
      borderRadius: "var(--r-pill)",
      background: dark ? "var(--glass-dark)" : "var(--surface-raised)",
      WebkitBackdropFilter: dark ? "blur(12px)" : "none",
      backdropFilter: dark ? "blur(12px)" : "none",
      boxShadow: dark ? "inset 0 0 0 1px var(--hairline-light)" : "inset 0 0 0 1px var(--hairline-dark)",
      color: dark ? "var(--text-inverse)" : "var(--ink-2)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--signal)",
      animation: U_RM ? "none" : "uPulse 2.2s var(--ease-unio) infinite"
    }
  }), label);
}

/* Ember-Signature (Direktive v2): Glüh-Zone in einer Ecke, driftet, nie unter Text. */
function EmberGlow({
  variant = "signatur",
  corner = "92% 88%",
  style
}) {
  const still = variant === "still";
  const mask = `radial-gradient(75% 75% at ${corner}, #000 35%, transparent 82%)`;
  return /*#__PURE__*/React.createElement("div", {
    className: "u-ember",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      willChange: "transform",
      animation: U_RM ? "none" : `emberDrift ${still ? 52 : 42}s ease-in-out infinite alternate`,
      opacity: still ? 0.55 : 0.85,
      filter: "blur(80px)",
      WebkitMaskImage: mask,
      maskImage: mask,
      background: [`radial-gradient(60% 70% at ${corner}, rgba(255,170,9,.34) 0%, rgba(255,170,9,.12) 44%, transparent 82%)`, "radial-gradient(56% 66% at 80% 78%, rgba(255,219,87,.34) 0%, rgba(255,219,87,.1) 46%, transparent 84%)", "radial-gradient(48% 56% at 66% 62%, rgba(255,170,9,.24) 0%, rgba(255,170,9,.06) 48%, transparent 86%)"].join(", "),
      ...style
    }
  });
}

/* Einblendungs-Grammatik: Hairline + Mono-Label + Wert, dockt an Fotos an */
function Annotation({
  top,
  left,
  right,
  bottom,
  label,
  value,
  show = true,
  delay = 0,
  dark = true,
  lineSide = "left",
  style
}) {
  const line = /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 38,
      height: 1,
      background: dark ? "var(--hairline-light-strong)" : "rgba(11,10,9,0.4)",
      flex: "none"
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top,
      left,
      right,
      bottom,
      display: "flex",
      alignItems: "center",
      zIndex: 5,
      opacity: show ? 1 : 0,
      transform: show ? "none" : "translateY(10px)",
      transition: `all 650ms var(--ease-unio) ${delay}ms`,
      pointerEvents: "none",
      ...style
    }
  }, lineSide === "left" && line, /*#__PURE__*/React.createElement("span", {
    style: {
      background: dark ? "var(--glass-dark)" : "rgba(253,252,250,0.9)",
      WebkitBackdropFilter: "blur(14px)",
      backdropFilter: "blur(14px)",
      boxShadow: `inset 0 0 0 1px ${dark ? "var(--hairline-light)" : "var(--hairline-dark)"}`,
      borderRadius: 10,
      padding: "8px 12px",
      color: dark ? "var(--text-inverse)" : "var(--ink-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      display: "block",
      fontSize: 9,
      color: dark ? "var(--text-inverse-muted)" : "var(--text-muted)"
    }
  }, label), value && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "13px var(--font-mono)",
      display: "block",
      marginTop: 3
    }
  }, value)), lineSide === "right" && line);
}

/* Signal-Raster: Dreiecks-Raster mit driftenden Orange-Zellen */
function SignalRaster({
  cols = 8,
  rows = 9,
  pulse = false,
  style
}) {
  const cells = React.useMemo(() => Array.from({
    length: cols * rows
  }, (_, i) => {
    const h = (i * 2654435761 + 971) % 1000;
    return {
      up: h % 2 === 0,
      sig: h % 11 === 0,
      dur: 2.6 + h % 5 * 0.7,
      del: h % 7 * 0.5
    };
  }), [cols, rows]);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridAutoRows: "1fr",
      width: "100%",
      height: "100%",
      ...style
    }
  }, cells.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      clipPath: c.up ? "polygon(50% 0, 0 100%, 100% 100%)" : "polygon(50% 100%, 0 0, 100% 0)",
      background: c.sig ? "var(--signal)" : "var(--paper-3)",
      opacity: c.sig ? 0.85 : 0.5,
      animation: U_RM ? "none" : `uCell ${pulse ? c.dur * 0.5 : c.dur}s ease-in-out ${c.del}s infinite alternate`
    }
  })));
}

/* UI-Miniatur: LENS-Browser mit selbstzeichnender Kurve */
function UIMiniLens({
  width = 200,
  play = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      borderRadius: 12,
      overflow: "hidden",
      background: "var(--surface-raised)",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      padding: "7px 10px",
      background: "var(--paper-2)",
      borderBottom: "1px solid var(--hairline-dark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "var(--paper-3)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "var(--paper-3)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "8px var(--font-mono)",
      color: "var(--text-muted)",
      marginLeft: 5,
      letterSpacing: "0.06em"
    }
  }, "app.unio.at \xB7 LENS"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "var(--signal)",
      animation: U_RM ? "none" : "uPulse 2.2s var(--ease-unio) infinite"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 10px 8px"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 120 44",
    style: {
      width: "100%",
      display: "block"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "36",
    x2: "120",
    y2: "36",
    stroke: "var(--hairline-dark)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "2,34 22,30 40,31 58,24 76,20 94,12 118,6",
    fill: "none",
    stroke: "var(--signal)",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      strokeDasharray: 150,
      strokeDashoffset: U_RM || !play ? 0 : 150,
      animation: U_RM || !play ? "none" : "uDraw 1.8s var(--ease-unio) 300ms forwards"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "8px var(--font-mono)",
      letterSpacing: "0.1em",
      color: "var(--text-muted)",
      textTransform: "uppercase"
    }
  }, "Anfragen"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "9px var(--font-mono)",
      color: "var(--signal-deep)"
    }
  }, "\u2197"))));
}

/* Scrub-Helper: Scroll-Progress 0..1 innerhalb einer gepinnten Sektion */
function usePinProgress() {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(U_RM ? 1 : 0);
  React.useEffect(() => {
    if (U_RM) return;
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      setP(Math.min(1, Math.max(0, -r.top / total)));
    };
    on();
    window.addEventListener("scroll", on, {
      passive: true
    });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return [ref, p];
}

/* Porträt-Datenkarte (Health-Card-Referenz): runder Hairline-Frame auf dem Bild,
   große Kennzahl + ↗, Sparkline mit Punkten, Caption unten */
function StatFrame({
  value,
  unit,
  label,
  caption,
  graph = "spark",
  children,
  spark = [4, 2.6, 5, 3.4, 6, 7.4],
  marks = ["Q1", "Q2", "Q3"],
  show = true,
  delay = 0,
  inset = 14,
  style
}) {
  const max = Math.max(...spark),
    min = Math.min(...spark);
  const pts = spark.map((p, i) => `${4 + i / (spark.length - 1) * 92},${30 - (p - min) / (max - min) * 24}`);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.55)",
      zIndex: 5,
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "16px 16px 12px",
      color: "#FFFFFF",
      textShadow: "0 1px 14px rgba(0,0,0,0.45)",
      opacity: show ? 1 : 0,
      transition: `opacity 800ms var(--ease-unio) ${delay}ms`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: show ? "none" : "translateY(-8px)",
      transition: `transform 800ms var(--ease-unio) ${delay}ms`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 clamp(26px, 2.4vw, 38px)/1 var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.5em",
      fontWeight: 400,
      marginLeft: 3
    }
  }, unit), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "12px var(--font-mono)",
      marginLeft: 7,
      verticalAlign: "6px"
    }
  }, "\u2197")), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      fontSize: 9.5,
      marginTop: 7,
      color: "rgba(255,255,255,0.92)",
      maxWidth: "14ch",
      lineHeight: 1.5
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      transform: show ? "none" : "translateY(8px)",
      transition: `transform 800ms var(--ease-unio) ${delay}ms`
    }
  }, children, graph === "spark" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 34",
    preserveAspectRatio: "none",
    style: {
      width: "100%",
      height: 34,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: pts.join(" "),
    fill: "none",
    stroke: "rgba(255,255,255,0.9)",
    strokeWidth: "1.1",
    vectorEffect: "non-scaling-stroke"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      margin: "4px 2px 0"
    }
  }, marks.map(m => /*#__PURE__*/React.createElement("span", {
    key: m,
    style: {
      font: "7.5px var(--font-mono)",
      letterSpacing: "0.08em",
      color: "rgba(255,255,255,0.7)",
      textTransform: "uppercase"
    }
  }, m)))), caption && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "9px 0 0",
      font: "400 11px/1.45 var(--font-display)",
      color: "rgba(255,255,255,0.92)",
      textAlign: "center"
    }
  }, caption)));
}

/* AI-ready FAQ — eine Komponente, beide Seiten. Antworten immer im DOM,
   FAQPage-JSON-LD wortgleich, natives button[aria-expanded]-Akkordeon. */
function FaqBlock({
  nr = "10",
  label = "Fragen",
  title,
  subline,
  items = [],
  anchor,
  defaultOpen = 0
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(U_RM);
  React.useEffect(() => {
    const id = "faq-jsonld-" + nr;
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = id;
      s.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: {
            "@type": "Answer",
            text: a
          }
        }))
      });
      document.head.appendChild(s);
    }
  }, [nr]);
  React.useEffect(() => {
    if (U_RM || !ref.current) return;
    const io = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, {
      threshold: 0.12
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-track": "chapter_view_" + nr,
    "data-screen-label": label,
    className: "u-grain",
    style: {
      position: "relative",
      background: "var(--paper)",
      padding: "175px 7vw 175px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "2.4vw",
      top: 96,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "11px var(--font-mono)",
      color: "var(--text-muted)"
    }
  }, nr), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 54,
      background: "var(--hairline-dark)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      fontSize: 8,
      color: "var(--text-muted)",
      writingMode: "vertical-rl"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 0.8fr) minmax(0, 1.2fr)",
      gap: 48,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "start",
      opacity: seen ? 1 : 0,
      transform: seen ? "none" : "translateY(18px)",
      transition: "all 700ms var(--ease-unio)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(30px, 3vw, 48px)/1.05 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, title), subline && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      font: "400 16px/1.6 var(--font-display)",
      color: "var(--text-muted)",
      maxWidth: 340
    }
  }, subline)), /*#__PURE__*/React.createElement("div", null, items.map(([q, a], i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: q,
      style: {
        borderTop: "1px solid var(--hairline-dark)",
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : "translateY(18px)",
        transition: `all 600ms var(--ease-unio) ${i * 70}ms`
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      "aria-expanded": isOpen,
      "aria-controls": "faq-" + nr + "-" + i,
      id: "faqq-" + nr + "-" + i,
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        padding: "22px 0",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "500 18px var(--font-display)",
        letterSpacing: "-0.01em",
        color: "var(--ink)"
      }
    }, q), /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      style: {
        flex: "none"
      },
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M2 8h12"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 2v12",
      style: {
        transformOrigin: "center",
        transform: isOpen ? "scaleY(0)" : "scaleY(1)",
        transition: "transform 360ms var(--ease-unio)"
      }
    })))), /*#__PURE__*/React.createElement("div", {
      id: "faq-" + nr + "-" + i,
      role: "region",
      "aria-labelledby": "faqq-" + nr + "-" + i,
      style: {
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        opacity: isOpen ? 1 : 0,
        transition: "grid-template-rows 360ms var(--ease-unio), opacity 360ms var(--ease-unio)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "0 0 22px",
        font: "400 15.5px/1.65 var(--font-display)",
        color: "var(--text-muted)",
        maxWidth: 600
      }
    }, a))));
  }), anchor && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--hairline-dark)",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "24px 0 0",
      opacity: seen ? 1 : 0,
      transform: seen ? "none" : "translateY(18px)",
      transition: `all 600ms var(--ease-unio) ${items.length * 70}ms`
    }
  }, anchor.img && /*#__PURE__*/React.createElement("img", {
    src: anchor.img,
    alt: "",
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      objectFit: "cover",
      objectPosition: "center 22%",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 15px/1.55 var(--font-display)",
      color: "var(--ink-2)"
    }
  }, anchor.text, " ", /*#__PURE__*/React.createElement("a", {
    href: "kontakt.html",
    style: {
      color: "var(--signal-deep)",
      textDecoration: "none",
      borderBottom: "1px solid var(--signal)"
    }
  }, anchor.link))))));
}
Object.assign(window, {
  UNIO_APP_URL: APP_URL,
  UNIO_BEWERTUNG_URL: BEWERTUNG_URL,
  UNIO_SEARCH_URL: SEARCH_URL,
  useTick,
  Reveal,
  SiteNav,
  PageHero,
  Chapter,
  PropCard,
  OBJEKT_DB,
  SiteFooter,
  FaqBlock,
  U_RM,
  LivePill,
  Annotation,
  SignalRaster,
  UIMiniLens,
  usePinProgress,
  StatFrame,
  EmberGlow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/site-shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/homepage/strecke.jsx
try { (() => {
/* UNIO — Referenz-Strecke (Bauträger) · exakte Portierung von unio-referenz-sequenz_3.html
   Phasen: 0–56 % Horizontalfahrt (P0–P4) · 56–66 % HALT · 66–78 % Marquee-Panel steigt
   von unten · 78–100 % Finale (Zeilen verdichten sich → CTA → Licht-Panel).
   Mobile: Pin bleibt, eigene Größenlogik. prefers-reduced-motion: vertikale Abfolge. */
const {
  Button: Bsq
} = window.UNIODesignSystem_b6216a;
const SEQ_NAMES = ["Ecoluxe", "Origins", "Albrecht", "ObenZwei", "Das Beheim", "Das Wimmer", "Jardin Hermes"];
const SEQ_CLAIM = "Echte Deals durch echte Daten";
const sqClamp = (v, a, b) => Math.max(a, Math.min(b, v));
const sstep = t => {
  t = sqClamp(t, 0, 1);
  return t * t * (3 - 2 * t);
};
const CREAM = "#F3F0EA";
const seqMono = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#98928A"
};
const SQ_IMG = "../../assets/img/",
  SQ_PH = "../../assets/photos/";
const SEQ_ROW_A = {
  top: [["../../assets/marketing/ecoluxe-print.png", 20], [SQ_IMG + "ecoluxe-wide.jpg", 30], ["../../assets/marketing/ecoluxe-unterlagen.png", 17]],
  low: [[SQ_IMG + "ecoluxe.jpg", 16], [SQ_PH + "hufhaus-pool-abend.jpg", 26]]
};
const SEQ_ROW_B = {
  top: [["../../assets/marketing/albrecht-print.png", 20], [SQ_IMG + "albrecht.jpg", 30], ["../../assets/marketing/albrecht-unterlagen.png", 17]],
  low: [[SQ_IMG + "beheim.jpg", 16], [SQ_IMG + "albrecht-dusk.jpg", 26]]
};
function SeqTile({
  src,
  w,
  mobile
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1.5px solid var(--ink)",
      background: CREAM,
      padding: "clamp(4px, 0.55vw, 9px)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    loading: "lazy",
    style: {
      display: "block",
      width: (mobile ? w * 1.9 : w) + "vw",
      height: "auto",
      filter: "saturate(0.92)"
    }
  }));
}
function SeqHl({
  ghost,
  px,
  children,
  mobile
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-px": px,
    style: {
      font: `700 clamp(46px, ${mobile ? "13vw" : "9.5vw"}, 150px)/0.98 var(--font-display)`,
      letterSpacing: "-0.04em",
      willChange: "transform",
      color: ghost ? "transparent" : "var(--ink)",
      WebkitTextStroke: ghost ? "1.5px var(--ink)" : "0"
    }
  }, children);
}
function SeqHead({
  name,
  sup,
  dat,
  desc,
  side,
  final,
  mobile
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-panel": "1",
    style: {
      height: "100%",
      flexShrink: 0,
      position: "relative",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 7vw",
      alignItems: final ? "center" : "flex-start",
      textAlign: final ? "center" : "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-px": "1.05",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: final ? "50%" : "10vw",
      top: mobile ? "10vh" : "14vh",
      marginLeft: final ? "-42vw" : 0,
      font: "700 clamp(64px, 13vw, 200px)/1 var(--font-display)",
      letterSpacing: "-0.04em",
      color: "transparent",
      WebkitTextStroke: "1.2px rgba(11,10,9,0.16)",
      willChange: "transform",
      whiteSpace: "nowrap"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    "data-px": final ? "1.18" : "1.2",
    style: {
      font: "700 clamp(46px, 10vw, 158px)/0.96 var(--font-display)",
      letterSpacing: "-0.04em",
      willChange: "transform",
      position: "relative",
      zIndex: 2,
      color: "var(--ink)"
    }
  }, name, /*#__PURE__*/React.createElement("sup", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.15em",
      fontWeight: 500,
      letterSpacing: "0.2em",
      color: "var(--signal)"
    }
  }, sup)), /*#__PURE__*/React.createElement("div", {
    "data-px": "0.94",
    style: {
      display: "flex",
      gap: "2.6em",
      marginTop: "4vh",
      willChange: "transform",
      flexWrap: "wrap",
      justifyContent: final ? "center" : "flex-start",
      ...seqMono
    }
  }, dat.map(([b, s]) => /*#__PURE__*/React.createElement("div", {
    key: s
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      font: "700 clamp(18px, 2.3vw, 32px)/1.1 var(--font-display)",
      letterSpacing: "-0.02em",
      color: "var(--ink)"
    }
  }, b), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 6
    }
  }, s)))), /*#__PURE__*/React.createElement("p", {
    "data-px": "0.94",
    style: {
      maxWidth: 420,
      margin: final ? "3.5vh auto 0" : "3.5vh 0 0",
      font: "400 15px/1.55 var(--font-display)",
      color: "#5F5A54",
      willChange: "transform"
    }
  }, desc), side && !mobile && /*#__PURE__*/React.createElement("div", {
    "data-px": "1.12",
    "data-side": "1",
    style: {
      position: "absolute",
      right: "-6vw",
      top: "50%",
      transform: "translateY(-50%)",
      border: "1.5px solid var(--ink)",
      background: CREAM,
      padding: 7,
      width: "20vw",
      willChange: "transform",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: side,
    alt: "",
    style: {
      display: "block",
      width: "100%",
      filter: "saturate(0.9)"
    }
  })));
}
function SeqMqRow({
  rowIdx,
  claim,
  registerRef
}) {
  const mkSet = k => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "set",
    style: {
      display: "flex",
      alignItems: "center",
      flexShrink: 0
    }
  }, claim ? Array.from({
    length: 4
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "clamp(10px, 1.1vw, 13px)",
      letterSpacing: "0.34em",
      textTransform: "uppercase",
      color: "rgba(243,240,234,0.5)",
      padding: "12px 0.9em",
      borderTop: "1px solid rgba(243,240,234,0.12)",
      borderBottom: "1px solid rgba(243,240,234,0.12)",
      whiteSpace: "nowrap"
    }
  }, SEQ_CLAIM + "  ▲")) : SEQ_NAMES.map((_, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 clamp(42px, 8.5vw, 124px)/1 var(--font-display)",
      letterSpacing: "-0.035em",
      padding: "0 0.32em",
      whiteSpace: "nowrap",
      color: (i + rowIdx) % 2 === 0 ? CREAM : "transparent",
      WebkitTextStroke: (i + rowIdx) % 2 === 0 ? "0" : "1.5px rgba(243,240,234,0.8)"
    }
  }, SEQ_NAMES[(i + rowIdx * 2) % SEQ_NAMES.length]), /*#__PURE__*/React.createElement("i", {
    "aria-hidden": "true",
    style: {
      width: "clamp(8px, 1.1vw, 16px)",
      height: "clamp(8px, 1.1vw, 16px)",
      flexShrink: 0,
      clipPath: "polygon(50% 100%, 0 0, 100% 0)",
      background: "var(--ink)"
    }
  }))));
  return /*#__PURE__*/React.createElement("div", {
    ref: registerRef,
    style: {
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      willChange: "transform, opacity",
      padding: "clamp(3px, 0.9vh, 10px) 0"
    }
  }, [0, 1, 2].map(mkSet));
}
const SEQ_MQ_CFG = [[1, 1, false], [-1, 0.75, false], [1, 0.45, true], [-1, 0.9, false], [1, 0.65, false]];
function SeqPinned({
  mobile
}) {
  const seqRef = React.useRef(null),
    trackRef = React.useRef(null),
    railRef = React.useRef(null),
    panelRef = React.useRef(null),
    ctaRef = React.useRef(null),
    lpRef = React.useRef(null);
  const mqEls = React.useRef([]);
  React.useEffect(() => {
    const seq = seqRef.current,
      track = trackRef.current,
      rail = railRef.current,
      panel = panelRef.current,
      ctaEl = ctaRef.current,
      lp = lpRef.current;
    if (!seq || !track) return;
    const layers = [...seq.querySelectorAll("[data-px]")].map(el => ({
      el,
      f: +el.dataset.px,
      panel: el.closest("[data-panel]")
    }));
    const mqs = SEQ_MQ_CFG.map(([dir, speed], i) => ({
      el: mqEls.current[i],
      dir,
      speed,
      x: 0,
      w: 0
    }));
    const measure = () => mqs.forEach(m => {
      if (m.el && m.el.firstChild) m.w = m.el.firstChild.getBoundingClientRect().width;
    });
    measure();
    addEventListener("resize", measure);
    let lastY = scrollY,
      vel = 0;
    const onScroll = () => {
      vel += (scrollY - lastY) * 0.07;
      lastY = scrollY;
    };
    addEventListener("scroll", onScroll, {
      passive: true
    });
    const T_END = 0.56,
      RISE_START = 0.66,
      RISE_END = 0.78;
    let raf,
      last = performance.now();
    const tick = now => {
      const dt = Math.min(50, now - last) / 16.6;
      last = now;
      vel *= 0.92;
      const r = seq.getBoundingClientRect();
      const p = sqClamp(-r.top / (r.height - innerHeight), 0, 1);
      const vw = innerWidth;
      const travel = track.scrollWidth - vw;
      const X = travel * sstep(p / T_END);
      track.style.transform = "translate3d(" + -X + "px,0,0)";
      if (rail) rail.style.width = p * 100 + "%";
      layers.forEach(l => {
        try {
          if (!l.panel) return;
          const off = l.panel.offsetLeft + l.panel.offsetWidth / 2 - X - vw / 2;
          l.el.style.transform = "translate3d(" + off * (l.f - 1) + "px,0,0)" + (l.el.dataset.side ? " translateY(-50%)" : "");
        } catch (e) {/* Layer nie die Fahrt blockieren lassen */}
      });
      const rise = sstep((p - RISE_START) / (RISE_END - RISE_START));
      panel.style.transform = "translateY(" + (101 - 101 * rise) + "%)";
      const baseRad = vw < 900 ? 20 : 28;
      const rad = baseRad * (1 - sstep((rise - 0.75) / 0.25));
      panel.style.borderRadius = rad + "px " + rad + "px 0 0";
      const fp = sqClamp((p - RISE_END) / (1 - RISE_END), 0, 1);
      const conv = sstep((fp - 0.28) / 0.34);
      const mid = (mqs.length - 1) / 2;
      mqs.forEach((m, i) => {
        if (!m.el) return;
        m.x += m.dir * (0.55 + vel) * m.speed * dt;
        if (m.w > 0) m.x = (m.x % m.w + m.w) % m.w;
        const ty = -(i - mid) * conv * (m.el.offsetHeight + 2) * 0.92;
        m.el.style.transform = "translate3d(" + -m.x + "px," + ty + "px,0)";
        m.el.style.opacity = String(1 - conv * (i === Math.round(mid) ? 0.9 : 1));
      });
      if (ctaEl) ctaEl.style.opacity = String(sstep((fp - 0.42) / 0.2));
      if (lp) lp.style.transform = "translateY(" + (101 - 101 * sstep((fp - 0.68) / 0.28)) + "%)";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", measure);
    };
  }, [mobile]);
  const pimgStyle = low => ({
    height: "100%",
    flexShrink: 0,
    position: "relative",
    width: mobile ? "170vw" : "118vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: mobile ? "2.6vh" : "3.5vh",
    padding: mobile ? "0 4vw" : "0 5vw"
  });
  const rowStyle = low => ({
    display: "flex",
    gap: mobile ? "3vw" : "2.2vw",
    alignItems: low ? "flex-start" : "flex-end",
    paddingLeft: low ? mobile ? "12vw" : "9vw" : 0,
    willChange: "transform"
  });
  return /*#__PURE__*/React.createElement("section", {
    ref: seqRef,
    "data-screen-label": "Referenz-Strecke",
    style: {
      height: mobile ? "820vh" : "780vh",
      position: "relative",
      background: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100svh",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      display: "flex",
      willChange: "transform"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-panel": "1",
    style: {
      height: "100%",
      flexShrink: 0,
      position: "relative",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 7vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...seqMono,
      marginBottom: "3.5vh"
    }
  }, "Referenzen \xB7 Wien 2024\u20132026"), /*#__PURE__*/React.createElement(SeqHl, {
    px: "1.14",
    mobile: mobile
  }, "Nicht inseriert."), /*#__PURE__*/React.createElement(SeqHl, {
    px: "0.92",
    ghost: true,
    mobile: mobile
  }, "Inszeniert."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "3vh",
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...seqMono,
      color: "var(--signal-deep)",
      marginBottom: 14
    }
  }, "Brand & Launch System"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 clamp(15px, 1.5vw, 19px)/1.6 var(--font-display)",
      color: "var(--text-muted)"
    }
  }, "High-end Positionierung, Projektstory und eine digitale Pr\xE4senz auf Premium-Niveau \u2014 inklusive Homepage, Landingpages, Funnel und s\xE4mtlicher Vermarktungsunterlagen.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "6vw",
      bottom: "7vh",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...seqMono,
      color: "var(--ink)"
    }
  }, "Scroll"), /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      width: mobile ? 38 : 56,
      height: 1.5,
      background: "var(--ink)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    "data-panel": "1",
    style: pimgStyle(false)
  }, /*#__PURE__*/React.createElement("div", {
    "data-px": "0.93",
    style: rowStyle(false)
  }, SEQ_ROW_A.top.map(([src, w]) => /*#__PURE__*/React.createElement(SeqTile, {
    key: src + w,
    src: src,
    w: w,
    mobile: mobile
  }))), /*#__PURE__*/React.createElement("div", {
    "data-px": "1.07",
    style: rowStyle(true)
  }, SEQ_ROW_A.low.map(([src, w]) => /*#__PURE__*/React.createElement(SeqTile, {
    key: src + w,
    src: src,
    w: w,
    mobile: mobile
  })))), /*#__PURE__*/React.createElement(SeqHead, {
    name: "Ecoluxe",
    sup: "/25",
    mobile: mobile,
    dat: [["282", "Anfragen"], ["+31 %", "über Zielpreis"], ["Wien", "Wohnbau · Neubau"]],
    desc: "Live am Markt getestet, positioniert und \xFCber dem Zielpreis abverkauft \u2014 bevor klassische Vermarktung \xFCberhaupt gestartet w\xE4re.",
    side: SQ_IMG + "vienna-garden.jpg"
  }), /*#__PURE__*/React.createElement("div", {
    "data-panel": "1",
    style: pimgStyle(true)
  }, /*#__PURE__*/React.createElement("div", {
    "data-px": "1.07",
    style: rowStyle(true)
  }, SEQ_ROW_B.low.map(([src, w]) => /*#__PURE__*/React.createElement(SeqTile, {
    key: src + w,
    src: src,
    w: w,
    mobile: mobile
  }))), /*#__PURE__*/React.createElement("div", {
    "data-px": "0.93",
    style: rowStyle(false)
  }, SEQ_ROW_B.top.map(([src, w]) => /*#__PURE__*/React.createElement(SeqTile, {
    key: src + w,
    src: src,
    w: w,
    mobile: mobile
  })))), /*#__PURE__*/React.createElement(SeqHead, {
    final: true,
    name: "Albrecht",
    sup: "/26",
    mobile: mobile,
    dat: [["61", "Anfragen · 2 Wochen"], ["Live", "Pipeline in LENS"], ["Wien", "Bestand · Revitalisierung"]],
    desc: "Vom ersten Test bis zur Besichtigung in einem System \u2014 jede Anfrage nachvollziehbar, jeder Schritt steuerbar."
  })), /*#__PURE__*/React.createElement("div", {
    ref: panelRef,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--signal)",
      zIndex: 10,
      transform: "translateY(101%)",
      willChange: "transform",
      borderRadius: "28px 28px 0 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      boxShadow: "0 -30px 80px -30px rgba(11,10,9,0.5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: "9vw",
      zIndex: 5,
      pointerEvents: "none",
      background: "linear-gradient(90deg, var(--signal), transparent)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: "9vw",
      zIndex: 5,
      pointerEvents: "none",
      background: "linear-gradient(-90deg, var(--signal), transparent)"
    }
  }), SEQ_MQ_CFG.map(([dir, speed, claim], i) => /*#__PURE__*/React.createElement(SeqMqRow, {
    key: i,
    rowIdx: i,
    claim: claim,
    registerRef: el => mqEls.current[i] = el
  })), /*#__PURE__*/React.createElement("div", {
    ref: ctaRef,
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 8,
      opacity: 0,
      pointerEvents: "none",
      padding: "0 6vw"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "700 clamp(42px, 8.5vw, 124px)/1 var(--font-display)",
      letterSpacing: "-0.035em",
      color: "#FFFFFF",
      textAlign: "center",
      textShadow: "0 2px 44px rgba(120,40,4,0.45)"
    }
  }, "Projekt pr\xFCfen", /*#__PURE__*/React.createElement("br", null), "lassen.")), /*#__PURE__*/React.createElement("div", {
    ref: lpRef,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--paper)",
      transform: "translateY(101%)",
      willChange: "transform",
      zIndex: 6
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: mobile ? "6vw" : "7vw",
      right: mobile ? "6vw" : "7vw",
      bottom: mobile ? 16 : 22,
      height: 1.5,
      background: "rgba(11,10,9,0.14)",
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("i", {
    ref: railRef,
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 0,
      background: "var(--signal)",
      display: "block"
    }
  }))));
}

/* reduced-motion: ruhige vertikale Abfolge */
function SeqVertikal() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Referenz-Strecke"
  }, /*#__PURE__*/React.createElement("div", {
    className: "u-grain",
    style: {
      background: "var(--paper)",
      padding: "90px 7vw 60px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...seqMono,
      marginBottom: 20
    }
  }, "Referenzen \xB7 Wien 2024\u20132026"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "700 clamp(44px, 7vw, 120px)/0.98 var(--font-display)",
      letterSpacing: "-0.04em",
      color: "var(--ink)"
    }
  }, "Nicht inseriert.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "transparent",
      WebkitTextStroke: "1.5px var(--ink)"
    }
  }, "Inszeniert."))), [["Ecoluxe", "/25", [["282", "Anfragen"], ["+31 %", "über Zielpreis"]], SEQ_ROW_A], ["Albrecht", "/26", [["61", "Anfragen · 2 Wochen"], ["Live", "Pipeline in LENS"]], SEQ_ROW_B]].map(([n, sup, dat, row]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: "u-grain",
    style: {
      background: "var(--paper)",
      padding: "40px 7vw 70px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 clamp(40px, 7vw, 110px)/1 var(--font-display)",
      letterSpacing: "-0.04em",
      color: "var(--ink)"
    }
  }, n, /*#__PURE__*/React.createElement("sup", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "0.15em",
      letterSpacing: "0.2em",
      color: "var(--signal)"
    }
  }, sup)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "2.4em",
      margin: "3vh 0",
      flexWrap: "wrap",
      ...seqMono
    }
  }, dat.map(([b, s]) => /*#__PURE__*/React.createElement("div", {
    key: s
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      font: "700 24px/1.1 var(--font-display)",
      color: "var(--ink)"
    }
  }, b), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 6
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      overflowX: "auto"
    }
  }, row.top.map(([src, w]) => /*#__PURE__*/React.createElement(SeqTile, {
    key: src,
    src: src,
    w: Math.min(w * 1.4, 34)
  }))))));
}
function ProjektStrecke() {
  const [mode, setMode] = React.useState(null);
  React.useEffect(() => {
    const decide = () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) setMode("vertikal");else setMode(window.innerWidth < 900 ? "mobile" : "pin");
    };
    decide();
    addEventListener("resize", decide);
    return () => removeEventListener("resize", decide);
  }, []);
  if (!mode) return null;
  if (mode === "vertikal") return /*#__PURE__*/React.createElement(SeqVertikal, null);
  return /*#__PURE__*/React.createElement(SeqPinned, {
    mobile: mode === "mobile"
  });
}

/* ===== Immobilien: reduzierte Variante (nur Hero-Slides, scroll-snap) ===== */
function ImmoGalerie({
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2,
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
      margin: "32px -6vw 0",
      padding: "0 6vw"
    }
  }, items.map(o => /*#__PURE__*/React.createElement("a", {
    key: o.t,
    href: "projekt.html",
    style: {
      scrollSnapAlign: "start",
      position: "relative",
      width: "min(72vw, 860px)",
      height: "min(62vh, 560px)",
      flex: "none",
      overflow: "hidden",
      borderRadius: "var(--r-card)",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: o.img,
    alt: o.t,
    loading: "lazy",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(11,10,9,0.22), transparent 34%, transparent 58%, rgba(11,10,9,0.55))"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      position: "absolute",
      top: 22,
      left: 26,
      color: "var(--text-inverse)",
      fontSize: 10,
      textShadow: "0 1px 10px rgba(0,0,0,0.5)"
    }
  }, o.loc), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      position: "absolute",
      top: 22,
      right: 26,
      color: "var(--text-inverse)",
      fontSize: 10,
      textShadow: "0 1px 10px rgba(0,0,0,0.5)"
    }
  }, o.live ? "LIVE VERMARKTET" : o.price), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 26,
      bottom: 24,
      right: 26,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 clamp(26px, 3vw, 44px)/1.02 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--text-inverse)",
      textShadow: "0 2px 30px rgba(0,0,0,0.4)"
    }
  }, o.t), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "14px var(--font-mono)",
      color: "var(--text-inverse)",
      flex: "none"
    }
  }, "\u2197")))));
}
Object.assign(window, {
  ProjektStrecke,
  ImmoGalerie
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/homepage/strecke.jsx", error: String((e && e.message) || e) }); }

// ui_kits/property/property.jsx
try { (() => {
const {
  GlassPanel,
  DataOverlay,
  StatBlock,
  DataLabel,
  Button,
  IconButton,
  Chip,
  Tag
} = window.UNIODesignSystem_b6216a;
const GALERIE = [{
  src: "../../assets/photos/hufhaus-front.jpg",
  label: "Ansicht Süd"
}, {
  src: "../../assets/photos/hufhaus-pool-abend.jpg",
  label: "Pool · Abend"
}, {
  src: "../../assets/photos/hufhaus-garten.jpg",
  label: "Garten"
}, {
  src: "../../assets/photos/hufhaus-hang.jpg",
  label: "Hanglage"
}, {
  src: "../../assets/photos/drohne-wienerwald.jpg",
  label: "Lage · Wienerwald"
}];
function Galerie({
  idx,
  setIdx
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Galerie",
    style: {
      position: "relative",
      height: "100vh",
      overflow: "hidden",
      background: "var(--ink)"
    }
  }, GALERIE.map((g, i) => /*#__PURE__*/React.createElement("img", {
    key: g.src,
    src: g.src,
    alt: g.label,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: i === idx ? 1 : 0,
      transition: "opacity var(--dur-base) var(--ease-unio)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 92,
      right: 32,
      display: "flex",
      gap: 8,
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Objekt 042"), /*#__PURE__*/React.createElement(Tag, {
    signal: true
  }, "Verf\xFCgbar")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 32,
      bottom: 32,
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-inverse)",
      textShadow: "0 1px 10px rgba(0,0,0,0.5)"
    }
  }, String(idx + 1).padStart(2, "0"), " / ", String(GALERIE.length).padStart(2, "0"), " \u2014 ", GALERIE[idx].label), /*#__PURE__*/React.createElement(IconButton, {
    glyph: "\u2190",
    label: "Zur\xFCck",
    onClick: () => setIdx((idx + GALERIE.length - 1) % GALERIE.length)
  }), /*#__PURE__*/React.createElement(IconButton, {
    glyph: "\u2192",
    label: "Weiter",
    onClick: () => setIdx((idx + 1) % GALERIE.length)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 32,
      bottom: 32,
      color: "var(--text-inverse)",
      maxWidth: 700
    }
  }, /*#__PURE__*/React.createElement(DataLabel, {
    marker: true
  }, "1140 Wien \xB7 48.1954\xB0 N, 16.2891\xB0 O"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "12px 0 0",
      font: "500 clamp(44px, 5vw, 84px)/0.98 var(--font-display)",
      letterSpacing: "-0.03em",
      textShadow: "0 2px 40px rgba(0,0,0,0.4)"
    }
  }, "Refugium", /*#__PURE__*/React.createElement("br", null), "am Waldrand")));
}
function FaktenLeiste() {
  const [tags, setTags] = React.useState(["Waldrand"]);
  const toggle = t => setTags(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t]);
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Faktenleiste",
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      marginTop: "-96px",
      padding: "0 32px"
    }
  }, /*#__PURE__*/React.createElement(GlassPanel, {
    tone: "dark",
    padding: "20px 28px",
    shadow: true,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 36,
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 30px var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, "\u20AC 2,4 Mio."), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "var(--text-inverse-muted)",
      marginTop: 4
    }
  }, "Kaufpreis \xB7 2 H\xE4user")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "16px var(--font-mono)"
    }
  }, "14 830 m\xB2"), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "var(--text-inverse-muted)",
      marginTop: 4
    }
  }, "Grundfl\xE4che")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "16px var(--font-mono)"
    }
  }, "25 Min."), /*#__PURE__*/React.createElement("div", {
    className: "u-label",
    style: {
      color: "var(--text-inverse-muted)",
      marginTop: 4
    }
  }, "ins Zentrum"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, ["Waldrand", "Pool", "2 Häuser"].map(t => /*#__PURE__*/React.createElement(Chip, {
    key: t,
    selected: tags.includes(t),
    onToggle: () => toggle(t)
  }, t)), /*#__PURE__*/React.createElement(Button, {
    variant: "paper",
    knob: true
  }, "Besichtigung anfragen"))));
}
function Daten() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Marktdaten",
    style: {
      position: "relative",
      padding: "160px 32px 120px",
      background: "url(../../assets/photos/hufhaus-garten.jpg) center / cover"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(280px, 380px) 1fr",
      gap: 48,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(DataOverlay, {
    variant: "editorial",
    label: "Marktlage 1140 Wien",
    animate: true,
    metric: {
      value: 94,
      label: "Nachfrage-Score",
      delta: "+12 %"
    },
    rows: [{
      label: "Preis / m²",
      value: "6 240 €"
    }, {
      label: "Vergleichsobjekte",
      value: "17"
    }, {
      label: "Ø Abverkauf",
      value: "T+38",
      highlight: true
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: "end",
      maxWidth: 460,
      color: "var(--text-inverse)",
      textShadow: "0 2px 30px rgba(0,0,0,0.35)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(32px, 3vw, 48px)/1.04 var(--font-display)",
      letterSpacing: "-0.03em"
    }
  }, "Exklusives Refugium im 14. Bezirk."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      font: "400 18px/1.6 var(--font-display)",
      color: "var(--text-inverse-muted)"
    }
  }, "Zwei H\xE4user \xFCber dem Wiental, 14.830 m\xB2 Grund, Pool und eigener Waldzugang \u2014 und nur 25 Minuten ins Zentrum. Die Marktdaten links sind live; jede Zahl ist belegbar."))));
}
function Anfrage() {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Anfrage",
    className: "u-grain",
    style: {
      background: "var(--paper)",
      padding: "120px 32px 100px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 64,
      maxWidth: 1100,
      margin: "0 auto",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "500 clamp(36px, 3.6vw, 60px)/1 var(--font-display)",
      letterSpacing: "-0.03em",
      color: "var(--ink)"
    }
  }, "Sprechen wir", /*#__PURE__*/React.createElement("br", null), "\xFCber dieses Objekt."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "20px 0 0",
      color: "var(--text-muted)",
      maxWidth: 380
    }
  }, "Wir antworten innerhalb von zwei Stunden \u2014 mit Daten, nicht mit Floskeln."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "< 2 h",
    label: "Antwortzeit \xB7 verbindlich",
    tone: "light",
    size: "40px",
    animate: false
  }))), /*#__PURE__*/React.createElement(GlassPanel, {
    tone: "light",
    padding: "var(--sp-6)",
    style: {
      background: "var(--surface-raised)",
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
      boxShadow: "inset 0 0 0 1px var(--hairline-dark), var(--shadow-float)"
    },
    grain: false
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "24px 0"
    }
  }, /*#__PURE__*/React.createElement(DataLabel, {
    tone: "light",
    marker: true
  }, "Anfrage \xFCbermittelt"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      color: "var(--ink-2)"
    }
  }, "Danke. Sie h\xF6ren von uns \u2014 mit Zahlen.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(window.UNIODesignSystem_b6216a.Input, {
    label: "Name",
    placeholder: "Vor- und Nachname"
  }), /*#__PURE__*/React.createElement(window.UNIODesignSystem_b6216a.Input, {
    label: "E-Mail",
    placeholder: "name@firma.at"
  }), /*#__PURE__*/React.createElement(window.UNIODesignSystem_b6216a.Select, {
    label: "Ich bin",
    options: ["Käufer:in", "Eigentümer:in", "Makler:in"]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "signal",
    size: "lg",
    knob: true,
    onClick: () => setSent(true)
  }, "Besichtigung anfragen")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      maxWidth: 1100,
      margin: "96px auto 0",
      paddingTop: 24,
      borderTop: "1px solid var(--hairline-dark)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)"
    }
  }, "Objekt 042 \xB7 Arbeitsstand"), /*#__PURE__*/React.createElement("span", {
    className: "u-label",
    style: {
      color: "var(--text-muted)"
    }
  }, "Antwort in < 2 h")));
}
function App() {
  const [idx, setIdx] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)"
    }
  }, /*#__PURE__*/React.createElement(window.SiteNav, {
    active: "immobilien.html",
    cta: {
      label: "Besichtigung",
      onClick: null
    }
  }), /*#__PURE__*/React.createElement(Galerie, {
    idx: idx,
    setIdx: setIdx
  }), /*#__PURE__*/React.createElement(FaktenLeiste, null), /*#__PURE__*/React.createElement(Daten, null), /*#__PURE__*/React.createElement(Anfrage, null), /*#__PURE__*/React.createElement(window.SiteFooter, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/property/property.jsx", error: String((e && e.message) || e) }); }

// ui_kits/social/social.jsx
try { (() => {
const {
  GlassPanel,
  Button
} = window.UNIODesignSystem_b6216a;

/* Serien-System nach Grid-Vorlage — warme Welt (Orange / Hellbraun / Creme).
   4:5-Kacheln (Design 540×675, Render 360×450). Kopfzeile = Mono-Label + ↘,
   Fußzeile = Wortmarke + Index. Dazwischen reine Video-Kacheln ohne Overlay. */

const M = 28;
const TERRA = "#B4633C";
function Tile({
  label,
  nr,
  bg,
  plain = false,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      height: 450,
      overflow: "hidden",
      borderRadius: 6,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: plain ? "" : "u-grain",
    style: {
      width: 540,
      height: 675,
      transform: "scale(0.6667)",
      transformOrigin: "top left",
      position: "relative",
      background: bg || "var(--paper)",
      overflow: "hidden",
      fontFamily: "var(--font-display)"
    }
  }, children, !plain && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 22,
      left: M,
      right: M,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      mixBlendMode: "difference",
      color: "var(--paper)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "10px var(--font-mono)",
      letterSpacing: "0.16em",
      textTransform: "uppercase"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "16px var(--font-mono)"
    }
  }, "\u2198")), !plain && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 20,
      left: M,
      right: M,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      mixBlendMode: "difference",
      color: "var(--paper)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 15px var(--font-display)",
      letterSpacing: "0.08em"
    }
  }, "UNIO"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "10px var(--font-mono)",
      letterSpacing: "0.14em"
    }
  }, nr, "/09"))));
}
function Foto({
  src,
  pos,
  filter
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: pos || "center",
      filter: filter || "none"
    }
  });
}
function Video({
  src
}) {
  return /*#__PURE__*/React.createElement("video", {
    src: src,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  });
}
const H = {
  margin: 0,
  fontWeight: 500,
  letterSpacing: "-0.03em",
  lineHeight: 0.98
};
const glassWord = {
  display: "inline-block",
  padding: "2px 16px 6px",
  background: "rgba(60,30,12,0.35)",
  WebkitBackdropFilter: "blur(18px)",
  backdropFilter: "blur(18px)",
  boxShadow: "inset 0 0 0 1px var(--hairline-light)",
  borderRadius: 10
};
const mono = (s, extra) => ({
  font: `${s}px var(--font-mono)`,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  ...extra
});
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--ink)",
      minHeight: "100vh",
      padding: "40px 48px 48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1128,
      margin: "0 auto 24px",
      display: "flex",
      justifyContent: "space-between",
      color: "var(--text-inverse-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: mono(11, {
      color: "var(--text-inverse)"
    })
  }, "UNIO \u2014 Serie 01"), /*#__PURE__*/React.createElement("span", {
    style: mono(11)
  }, "Betriebssystem \xB7 Immobilienvertrieb")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 360px)",
      gap: 24,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Tile, {
    label: "Makler \xB7 Mensch",
    nr: "01"
  }, /*#__PURE__*/React.createElement(Foto, {
    src: "../../assets/photos/lifestyle-paar.jpg",
    pos: "center 25%",
    filter: "sepia(0.14) saturate(1.05)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: M,
      right: M,
      bottom: 72,
      color: "var(--paper)",
      textShadow: "0 2px 24px rgba(40,16,4,0.4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...H,
      fontSize: 52,
      fontWeight: 300
    }
  }, "Mehr als"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...H,
      fontSize: 52,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: glassWord
  }, "makeln.")))), /*#__PURE__*/React.createElement(Tile, {
    label: "System",
    nr: "02",
    bg: "var(--paper)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: M,
      top: 64,
      color: "var(--signal)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...H,
      fontSize: 42
    }
  }, "Aus Rohdaten \u2198")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: M,
      right: M,
      top: 230,
      display: "flex",
      gap: 10
    }
  }, [["../../assets/photos/interieur-wurzelholz.jpg", "Raum"], ["../../assets/photos/terrasse-golden.png", "Daten"], ["../../assets/photos/hufhaus-pool-abend.jpg", "Deal"]].map(([src, cap]) => /*#__PURE__*/React.createElement("figure", {
    key: cap,
    style: {
      margin: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      display: "block",
      width: "100%",
      height: 118,
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      ...mono(9),
      color: TERRA,
      marginTop: 8
    }
  }, cap)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: M,
      bottom: 116,
      textAlign: "right",
      color: "var(--signal)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...H,
      fontSize: 42
    }
  }, "werden echte Deals."))), /*#__PURE__*/React.createElement(Tile, {
    nr: "03",
    plain: true,
    bg: "var(--ink-2)"
  }, /*#__PURE__*/React.createElement(Video, {
    src: "../../assets/video/hufhaus.mp4"
  })), /*#__PURE__*/React.createElement(Tile, {
    label: "Case \xB7 Vertrieb",
    nr: "04"
  }, /*#__PURE__*/React.createElement(Foto, {
    src: "../../assets/photos/interieur-esszimmer.jpg",
    filter: "sepia(0.1) saturate(1.05)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: M,
      right: M,
      top: 150
    }
  }, /*#__PURE__*/React.createElement(GlassPanel, {
    tone: "light",
    blur: 22,
    padding: "26px 26px 22px",
    radius: 18
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...H,
      fontSize: 30,
      color: "var(--ink)"
    }
  }, "Vertrieb ist mehr als inserieren."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "12px 0 18px",
      font: "400 13px/1.5 var(--font-display)",
      color: "var(--text-muted)"
    }
  }, "Akquise, Daten, Marketing, Matching und Closing \u2014 in einer Oberfl\xE4che statt in f\xFCnf Ordnern."), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "paper",
    knob: "\u203A"
  }, "Case ansehen")))), /*#__PURE__*/React.createElement(Tile, {
    label: "Transparenz",
    nr: "05",
    bg: TERRA
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: M,
      right: M,
      top: 200,
      color: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...H,
      fontSize: 62
    }
  }, "Schluss", /*#__PURE__*/React.createElement("br", null), "mit", /*#__PURE__*/React.createElement("br", null), "Blackbox.")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: M,
      top: 118,
      font: "300 34px var(--font-display)",
      color: "rgba(244,241,235,0.75)"
    }
  }, "20"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: M,
      bottom: 110,
      font: "300 34px var(--font-display)",
      color: "rgba(244,241,235,0.75)"
    }
  }, "26")), /*#__PURE__*/React.createElement(Tile, {
    label: "AI im Hintergrund",
    nr: "06",
    bg: "var(--paper)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 340,
      height: 340,
      transform: "translate(-50%, -50%)",
      borderRadius: "50%",
      background: "radial-gradient(closest-side, var(--signal) 0%, rgba(232,101,29,0.72) 55%, rgba(232,71,29,0) 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
      transform: "translateY(-58%)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "300 44px var(--font-display)",
      letterSpacing: "0.42em",
      marginLeft: "0.42em",
      color: "var(--paper)",
      mixBlendMode: "difference"
    }
  }, "MATCHING")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 110,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: mono(10, {
      color: TERRA
    })
  }, "Passende K\xE4ufer zuerst \xB7 1 : 9 statt 1 : 200"))), /*#__PURE__*/React.createElement(Tile, {
    nr: "07",
    plain: true,
    bg: "var(--ink-2)"
  }, /*#__PURE__*/React.createElement(Video, {
    src: "../../assets/video/transition-riffel-a.mp4"
  })), /*#__PURE__*/React.createElement(Tile, {
    label: "Echte Daten",
    nr: "08"
  }, /*#__PURE__*/React.createElement(Foto, {
    src: "../../assets/photos/terrasse-golden.png",
    pos: "center 70%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: M,
      right: M,
      top: 70,
      bottom: 70,
      background: "rgba(46,22,8,0.45)",
      WebkitBackdropFilter: "blur(24px)",
      backdropFilter: "blur(24px)",
      borderRadius: 8,
      boxShadow: "inset 0 0 0 1px var(--hairline-light)",
      color: "var(--paper)",
      padding: "28px 28px 24px",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: mono(10, {
      color: "rgba(244,241,235,0.7)"
    })
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 8,
      height: 8,
      background: "var(--signal)",
      marginRight: 10
    }
  }), "Nachfrage-Score \xB7 1020 Wien"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "500 110px/1 var(--font-display)",
      letterSpacing: "-0.04em",
      marginTop: 18
    }
  }, "94"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--hairline-light)",
      marginTop: "auto",
      paddingTop: 18,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: mono(9, {
      color: "rgba(244,241,235,0.7)"
    })
  }, "Preis / m\xB2"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "20px var(--font-mono)",
      marginTop: 6
    }
  }, "6 240 \u20AC")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: mono(9, {
      color: "rgba(244,241,235,0.7)"
    })
  }, "\xD8 Abverkauf"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "20px var(--font-mono)",
      marginTop: 6,
      color: "var(--signal)"
    }
  }, "T+38"))))), /*#__PURE__*/React.createElement(Tile, {
    nr: "09",
    plain: true,
    bg: "var(--ink-2)"
  }, /*#__PURE__*/React.createElement(Video, {
    src: "../../assets/video/transition-riffel-b.mp4"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1128,
      margin: "24px auto 0",
      display: "flex",
      justifyContent: "space-between",
      color: "var(--text-inverse-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: mono(11)
  }, "01\u201309 \xB7 Feed-System 4:5 \xB7 Video-Kacheln ohne Overlay"), /*#__PURE__*/React.createElement("span", {
    style: mono(11)
  }, "Wien \xB7 2026 \xB7 Arbeitsstand")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/social/social.jsx", error: String((e && e.message) || e) }); }

// uploads/Unio Homepage/_src/core.jsx
try { (() => {
/* ============================================================
   UNIO core — shared components (concatenated before page JSX)
   ============================================================ */
const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;
const LOGO_BLACK = "__LOGO_BLACK_URI__";
const LOGO_WHITE = "__LOGO_WHITE_URI__";
const ICON_URI = "__LOGO_ICON_URI__";
const IconMark = ({
  size = 32,
  className
}) => /*#__PURE__*/React.createElement("img", {
  src: ICON_URI,
  alt: "",
  "aria-hidden": "true",
  className: className,
  style: {
    width: size,
    height: size,
    display: 'block',
    objectFit: 'contain',
    flex: 'none'
  }
});
const Logo = ({
  className = "logo",
  white = false
}) => /*#__PURE__*/React.createElement("a", {
  href: "index.html",
  className: className,
  "aria-label": "UNIO Startseite"
}, /*#__PURE__*/React.createElement("img", {
  src: white ? LOGO_WHITE : LOGO_BLACK,
  alt: "UNIO"
}));

/* split-ring brand mark — matches the real UNIO icon (opening to the LEFT, thin slit at right) */
const Ring = ({
  size = 100,
  w = 12,
  color = "var(--orange)",
  track = null
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 100 100",
  fill: "none",
  "aria-hidden": "true"
}, track && /*#__PURE__*/React.createElement("circle", {
  cx: "50",
  cy: "50",
  r: "34",
  stroke: track,
  strokeWidth: w
}), /*#__PURE__*/React.createElement("path", {
  d: "M 83.98 48.81 A 34 34 0 0 0 18.05 38.37",
  stroke: color,
  strokeWidth: w,
  strokeLinecap: "butt"
}), /*#__PURE__*/React.createElement("path", {
  d: "M 83.98 51.19 A 34 34 0 0 1 18.05 61.63",
  stroke: color,
  strokeWidth: w,
  strokeLinecap: "butt"
}));

/* Loader: data points appear → connect into a network → become the UNIO logo (vector) */
function UnioLoader() {
  const S = 264,
    C = 132,
    R = 92,
    PTS = 64;
  const model = useRef(null);
  if (!model.current) {
    const pts = [];
    const ranges = [[200, 358], [2, 160]];
    for (let i = 0; i < PTS; i++) {
      const sx = -380 + Math.random() * (S + 760),
        sy = -300 + Math.random() * (S + 560); // spread wide across the screen
      const seg = ranges[i % 2];
      const f = Math.random();
      const ang = (seg[0] + (seg[1] - seg[0]) * f) * Math.PI / 180;
      const hx = C + R * Math.cos(ang),
        hy = C + R * Math.sin(ang);
      pts.push({
        sx,
        sy,
        hx,
        hy,
        delay: Math.round(Math.random() * 550)
      });
    }
    const edges = [];
    for (let i = 0; i < PTS; i++) {
      let cnt = 0;
      for (let j = i + 1; j < PTS && cnt < 3; j++) {
        const d = Math.hypot(pts[i].sx - pts[j].sx, pts[i].sy - pts[j].sy);
        if (d < 60) {
          edges.push([i, j, Math.round(Math.random() * 500)]);
          cnt++;
        }
      }
    }
    model.current = {
      pts,
      edges
    };
  }
  const {
    pts,
    edges
  } = model.current;
  const [vis, setVis] = useState(false);
  const [conn, setConn] = useState(false);
  const [form, setForm] = useState(false);
  const [icon, setIcon] = useState(false);
  const [cap, setCap] = useState(false);
  const [prog, setProg] = useState(false);
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setGone(true);
      return;
    }
    document.body.style.overflow = 'hidden';
    const t = [];
    t.push(setTimeout(() => {
      setVis(true);
      setProg(true);
    }, 150)); // points appear (spread across screen)
    t.push(setTimeout(() => setConn(true), 1500)); // network connects
    t.push(setTimeout(() => setForm(true), 3100)); // points migrate inward to the mark
    t.push(setTimeout(() => setIcon(true), 4100)); // the REAL icon fades in (no vector, no jump)
    t.push(setTimeout(() => setCap(true), 4450));
    t.push(setTimeout(() => setHide(true), 5900)); // zoom-fade reveal
    t.push(setTimeout(() => {
      setGone(true);
      document.body.style.overflow = '';
    }, 6900));
    return () => {
      t.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);
  if (gone) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "uloader" + (hide ? " hide" : ""),
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "uloader-stage"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "uload-net",
    width: S,
    height: S,
    viewBox: "0 0 " + S + " " + S,
    fill: "none"
  }, edges.map(([i, j, d], k) => /*#__PURE__*/React.createElement("line", {
    key: k,
    x1: pts[i].sx.toFixed(1),
    y1: pts[i].sy.toFixed(1),
    x2: pts[j].sx.toFixed(1),
    y2: pts[j].sy.toFixed(1),
    className: "uload-line" + (conn && !form ? " on" : "") + (form ? " off" : ""),
    style: {
      transitionDelay: (conn && !form ? d : 0) + 'ms'
    }
  })), pts.map((p, i) => /*#__PURE__*/React.createElement("g", {
    key: i,
    className: "uload-pt" + (vis ? " vis" : "") + (icon ? " dim" : ""),
    style: {
      transform: "translate(" + (form ? p.hx : p.sx).toFixed(1) + "px," + (form ? p.hy : p.sy).toFixed(1) + "px)",
      transitionDelay: (vis && !form ? p.delay : 0) + 'ms'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    r: "3"
  })))), /*#__PURE__*/React.createElement("img", {
    className: "uloader-icon" + (icon ? " in" : ""),
    src: ICON_URI,
    alt: "UNIO"
  })), /*#__PURE__*/React.createElement("div", {
    className: "uloader-cap" + (cap ? " in" : "")
  }, /*#__PURE__*/React.createElement(Logo, {
    className: "logo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "Data-Powered Real Estate"), /*#__PURE__*/React.createElement("div", {
    className: "uloader-prog" + (prog ? " go" : "")
  }, /*#__PURE__*/React.createElement("i", null))));
}

/* thin minimal icon set (lucide-style, 1.8px stroke) */
const I = ({
  d,
  size = 20,
  sw = 1.8,
  fill = false,
  vb = "0 0 24 24",
  children
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: vb,
  fill: fill ? "currentColor" : "none",
  stroke: fill ? "none" : "currentColor",
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, children || /*#__PURE__*/React.createElement("path", {
  d: d
}));
const Icon = {
  arrow: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m13 6 6 6-6 6"
  })),
  arrowUR: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M7 17 17 7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 7h10v10"
  })),
  building: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "3",
    width: "16",
    height: "18",
    rx: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01"
  })),
  users: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
  })),
  search: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  gauge: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "m12 14 4-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.34 19a10 10 0 1 1 17.32 0"
  })),
  pin: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  check: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })),
  spark: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"
  })),
  trending: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M16 7h6v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 7-8.5 8.5-5-5L2 17"
  })),
  layers: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "m12 2 9 5-9 5-9-5 9-5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3 12 9 5 9-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3 17 9 5 9-5"
  })),
  target: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1",
    fill: "currentColor"
  })),
  shield: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
  })),
  bolt: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M13 2 3 14h9l-1 8 10-12h-9l1-8Z"
  })),
  ruler: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7.5 10.5 2 2M11 7l2 2M14.5 3.5l2 2M4 14l2 2"
  })),
  clock: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 2"
  })),
  euro: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M18 7a6 6 0 1 0 0 10M5 10h7M5 14h7"
  })),
  menu: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18M3 12h18M3 18h18"
  })),
  close: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })),
  home: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 10.5 12 3l9 7.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 9.5V21h14V9.5"
  })),
  chart: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 3v18h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 14l3-3 3 3 4-5"
  }))
};

/* count-up on view */
function useCountUp(target, dur = 900) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  const done = useRef(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const t0 = performance.now();
        const tick = t => {
          const p = Math.min(1, (t - t0) / dur);
          setVal(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, {
      threshold: .4
    });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [target, dur]);
  return [val, ref];
}
function Reveal({
  children,
  style,
  as: Tag = "div",
  className = ""
}) {
  const ref = useRef();
  const [s, setS] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setS(true);
        o.disconnect();
      }
    }, {
      threshold: .14
    });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: "reveal" + (s ? " in" : "") + (className ? " " + className : ""),
    style: style
  }, children);
}

/* thin bar chart */
const Bars = ({
  data,
  accent = [],
  h = 52
}) => {
  const W = 300,
    n = data.length,
    bw = 4,
    gap = (W - n * bw) / (n - 1),
    max = Math.max(...data);
  return /*#__PURE__*/React.createElement("svg", {
    className: "fade-a",
    width: "100%",
    height: h,
    viewBox: `0 0 ${W} ${h}`,
    preserveAspectRatio: "none"
  }, data.map((v, i) => {
    const bh = v / max * h,
      x = i * (bw + gap);
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: x,
      y: h - bh,
      width: bw,
      height: bh,
      rx: "2",
      fill: accent.includes(i) ? 'var(--orange)' : 'var(--line)'
    });
  }));
};

/* dashed line + area */
const LineArea = ({
  data,
  h = 120,
  w = 320
}) => {
  const max = Math.max(...data),
    min = Math.min(...data),
    pad = 6;
  const pts = data.map((v, i) => [pad + i * ((w - pad * 2) / (data.length - 1)), h - pad - (v - min) / (max - min || 1) * (h - pad * 2)]);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = path + ` L ${pts[pts.length - 1][0].toFixed(1)} ${h} L ${pts[0][0].toFixed(1)} ${h} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    className: "fade-a"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "la",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "var(--orange)",
    stopOpacity: ".18"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "var(--orange)",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#la)"
  }), /*#__PURE__*/React.createElement("path", {
    d: path,
    fill: "none",
    stroke: "var(--orange)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: pts[pts.length - 1][0],
    cy: pts[pts.length - 1][1],
    r: "3.5",
    fill: "var(--orange)"
  }));
};

/* building silhouette for property placeholders */
const CitySilhouette = ({
  color = "rgba(20,20,18,.14)"
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 300 120",
  width: "100%",
  height: "100%",
  preserveAspectRatio: "xMidYMax meet",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("g", {
  fill: color
}, /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "58",
  width: "34",
  height: "62"
}), /*#__PURE__*/React.createElement("rect", {
  x: "20",
  y: "64",
  width: "6",
  height: "6",
  fill: "#fff",
  opacity: ".4"
}), /*#__PURE__*/React.createElement("rect", {
  x: "32",
  y: "64",
  width: "6",
  height: "6",
  fill: "#fff",
  opacity: ".4"
}), /*#__PURE__*/React.createElement("rect", {
  x: "56",
  y: "40",
  width: "40",
  height: "80"
}), /*#__PURE__*/React.createElement("rect", {
  x: "62",
  y: "48",
  width: "7",
  height: "7",
  fill: "#fff",
  opacity: ".4"
}), /*#__PURE__*/React.createElement("rect", {
  x: "76",
  y: "48",
  width: "7",
  height: "7",
  fill: "#fff",
  opacity: ".4"
}), /*#__PURE__*/React.createElement("rect", {
  x: "62",
  y: "62",
  width: "7",
  height: "7",
  fill: "#fff",
  opacity: ".4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M104 52 L124 36 L144 52 L144 120 L104 120 Z"
}), /*#__PURE__*/React.createElement("rect", {
  x: "150",
  y: "28",
  width: "46",
  height: "92"
}), /*#__PURE__*/React.createElement("rect", {
  x: "158",
  y: "38",
  width: "8",
  height: "8",
  fill: "#fff",
  opacity: ".4"
}), /*#__PURE__*/React.createElement("rect", {
  x: "174",
  y: "38",
  width: "8",
  height: "8",
  fill: "#fff",
  opacity: ".4"
}), /*#__PURE__*/React.createElement("rect", {
  x: "158",
  y: "54",
  width: "8",
  height: "8",
  fill: "#fff",
  opacity: ".4"
}), /*#__PURE__*/React.createElement("rect", {
  x: "204",
  y: "64",
  width: "36",
  height: "56"
}), /*#__PURE__*/React.createElement("path", {
  d: "M248 48 L268 36 L288 48 L288 120 L248 120 Z"
})));

/* ---- Photo: cover image with optional overlay + parallax ---- */
const Photo = ({
  src,
  alt = "",
  style = {},
  overlay = false,
  pos = "center"
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    ...style
  }
}, /*#__PURE__*/React.createElement("img", {
  src: src,
  alt: alt,
  loading: "lazy",
  style: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: pos,
    display: 'block'
  }
}), overlay && /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    background: typeof overlay === 'string' ? overlay : 'linear-gradient(180deg,rgba(14,15,17,0) 38%,rgba(14,15,17,.55) 100%)'
  }
}));

/* ---- PropMedia: photo or silhouette + tag pills ---- */
const PropMedia = ({
  img,
  tags = [],
  pos = "center",
  ratio,
  badge
}) => /*#__PURE__*/React.createElement("div", {
  className: "prop-media",
  style: ratio ? {
    aspectRatio: ratio
  } : undefined
}, img ? /*#__PURE__*/React.createElement(Photo, {
  src: img,
  pos: pos
}) : /*#__PURE__*/React.createElement("div", {
  className: "city"
}, /*#__PURE__*/React.createElement(CitySilhouette, null)), img && /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg,rgba(14,15,17,.10),rgba(14,15,17,0) 34%)'
  }
}), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
  className: "prop-tags"
}, tags.map(t => /*#__PURE__*/React.createElement("span", {
  key: t,
  className: "pill pill-w"
}, t))), badge && /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    bottom: 13,
    right: 13
  }
}, badge));

/* ---- count-up number component (in-view) ---- */
function Num({
  end,
  dur = 1100,
  dec = 0,
  prefix = "",
  suffix = "",
  sep = true
}) {
  const [v, ref] = useCountUp(end, dur);
  let s = v.toFixed(dec);
  if (sep) {
    const [a, b] = s.split('.');
    s = a.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (b ? ',' + b : '');
  } else if (dec > 0) {
    s = s.replace('.', ',');
  }
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: "tnum"
  }, prefix, s, suffix);
}

/* ---- Parallax: subtle translate on scroll ---- */
function Parallax({
  children,
  amount = 40,
  className = "",
  style = {}
}) {
  const ref = useRef();
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5 range-ish
        el.style.setProperty('--py', (p * amount).toFixed(1) + 'px');
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [amount]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: className,
    style: {
      ...style,
      transform: 'translate3d(0,var(--py,0),0)',
      willChange: 'transform'
    }
  }, children);
}

/* ---- scroll progress (0..1) for an element crossing viewport ---- */
function useScrollProgress(ref, {
  start = 0.85,
  end = 0.25
} = {}) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = (start - end) * vh;
      const done = start * vh - r.top;
      setP(Math.max(0, Math.min(1, done / total)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [ref, start, end]);
  return p;
}

/* ---- CaseCard: case study with image + metrics ---- */
function CaseCard({
  img,
  pos,
  badge,
  tag,
  title,
  loc,
  metrics = [],
  measures = [],
  site,
  dur,
  big = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "case" + (big ? " big" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-media"
  }, /*#__PURE__*/React.createElement(Photo, {
    src: img,
    pos: pos,
    overlay: "linear-gradient(180deg,rgba(14,15,17,0) 40%,rgba(14,15,17,.72) 100%)"
  }), tag && /*#__PURE__*/React.createElement("span", {
    className: "pill pill-w case-tag"
  }, tag), /*#__PURE__*/React.createElement("div", {
    className: "case-cap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-loc"
  }, /*#__PURE__*/React.createElement(Icon.pin, {
    size: 13
  }), " ", loc), /*#__PURE__*/React.createElement("h3", null, title), site && /*#__PURE__*/React.createElement("a", {
    className: "case-site",
    href: site.startsWith('http') ? site : 'https://' + site,
    target: "_blank",
    rel: "noopener"
  }, site, " ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 12
  })))), /*#__PURE__*/React.createElement("div", {
    className: "case-body"
  }, dur && /*#__PURE__*/React.createElement("div", {
    className: "case-dur"
  }, /*#__PURE__*/React.createElement(Icon.clock, {
    size: 13
  }), " ", dur), /*#__PURE__*/React.createElement("div", {
    className: "case-metrics"
  }, metrics.map((m, i) => /*#__PURE__*/React.createElement("div", {
    className: "cm",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "cmv"
  }, m.v), /*#__PURE__*/React.createElement("div", {
    className: "cmk"
  }, m.k)))), measures.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "case-measures"
  }, measures.map(m => /*#__PURE__*/React.createElement("span", {
    key: m,
    className: "cmeas"
  }, /*#__PURE__*/React.createElement(Icon.check, {
    size: 13,
    sw: 2.6
  }), " ", m)))));
}

/* ---- in-view trigger ---- */
function useInView(thr = 0.3) {
  const ref = useRef();
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        o.disconnect();
      }
    }, {
      threshold: thr
    });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [thr]);
  return [ref, seen];
}

/* ---- segmented bar (grey -> orange, left to right; reversible via progress) ---- */
function SegBar({
  value = 100,
  progress = null,
  segN = 28,
  height = 12,
  muted = false
}) {
  const [ref, seen] = useInView(0.4);
  const frac = progress != null ? Math.max(0, Math.min(1, progress)) : seen ? value / 100 : 0;
  const on = frac * segN;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "segbar" + (muted ? ' muted' : ''),
    style: {
      height
    }
  }, Array.from({
    length: segN
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: i < on ? 'on' : '',
    style: {
      transitionDelay: progress != null ? '0ms' : i * 16 + 'ms'
    }
  })));
}

/* ---- animated draw-on sparkline ---- */
const Sparkline = ({
  data,
  h = 44,
  w = 160,
  accent = "var(--orange)",
  dot = true,
  fill = true
}) => {
  const [ref, seen] = useInView(0.5);
  const max = Math.max(...data),
    min = Math.min(...data),
    pad = 4;
  const pts = data.map((v, i) => [pad + i * ((w - pad * 2) / (data.length - 1)), h - pad - (v - min) / (max - min || 1) * (h - pad * 2)]);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = path + ` L ${pts[pts.length - 1][0].toFixed(1)} ${h} L ${pts[0][0].toFixed(1)} ${h} Z`;
  const len = 420;
  return /*#__PURE__*/React.createElement("svg", {
    ref: ref,
    width: "100%",
    height: h,
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    style: {
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "spk",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: accent,
    stopOpacity: ".16"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: accent,
    stopOpacity: "0"
  }))), fill && /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#spk)",
    style: {
      opacity: seen ? 1 : 0,
      transition: 'opacity .8s .3s'
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: path,
    fill: "none",
    stroke: accent,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      strokeDasharray: len,
      strokeDashoffset: seen ? 0 : len,
      transition: 'stroke-dashoffset 1.1s var(--ease)'
    }
  }), dot && /*#__PURE__*/React.createElement("circle", {
    cx: pts[pts.length - 1][0],
    cy: pts[pts.length - 1][1],
    r: "3.2",
    fill: accent,
    style: {
      opacity: seen ? 1 : 0,
      transition: 'opacity .3s .9s'
    }
  }));
};

/* ---- semicircle gauge (animated) ---- */
const Gauge = ({
  value = 72,
  size = 120,
  label,
  sub,
  color = "var(--orange)"
}) => {
  const [ref, seen] = useInView(0.5);
  const r = 42,
    cx = 50,
    cy = 50,
    circ = Math.PI * r;
  const off = seen ? circ * (1 - value / 100) : circ;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size * 0.62,
    viewBox: "0 0 100 60"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 50 A42 42 0 0 1 92 50",
    fill: "none",
    stroke: "var(--track)",
    strokeWidth: "8",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 50 A42 42 0 0 1 92 50",
    fill: "none",
    stroke: color,
    strokeWidth: "8",
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: off,
    style: {
      transition: 'stroke-dashoffset 1.2s var(--ease)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: -size * 0.18,
      fontWeight: 600,
      fontSize: size * 0.26,
      letterSpacing: '-.03em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, seen ? /*#__PURE__*/React.createElement(Num, {
    end: value
  }) : 0), label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg3)',
      fontWeight: 600,
      marginTop: 4
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg4)',
      marginTop: 2
    }
  }, sub));
};

/* ---- forecast mini-bars with delta pill (Hikari/Garmin style) ---- */
const ForecastBars = ({
  data,
  accentIdx,
  delta,
  h = 70
}) => {
  const [ref, seen] = useInView(0.5);
  const max = Math.max(...data);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '6%',
      height: h,
      position: 'relative'
    }
  }, data.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: (seen ? v / max * 100 : 0) + '%',
      background: i === accentIdx ? 'var(--orange)' : 'var(--track)',
      borderRadius: 3,
      transition: 'height .9s var(--ease)',
      transitionDelay: i * 60 + 'ms',
      minHeight: 3
    }
  }))), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      fontSize: 11,
      fontWeight: 700,
      color: '#3E8E41',
      background: '#E9F6E8',
      borderRadius: 999,
      padding: '3px 8px',
      opacity: seen ? 1 : 0,
      transform: seen ? 'none' : 'translateY(-4px)',
      transition: 'all .4s .8s'
    }
  }, "+", delta, "%"));
};

/* ---- DataStory: ported DS canvas animation (Sammeln→Lernen→Optimieren→Verkaufen) ---- */
function DataStory() {
  const rootRef = useRef();
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const PHASES = [{
      key: 'Sammeln',
      sub: 'Echtzeit-Daten aus Markt, Kampagnen und Käuferverhalten strömen ein.',
      dur: 3800
    }, {
      key: 'Lernen',
      sub: 'Predictive Models erkennen Muster in tausenden Datenpunkten.',
      dur: 3800
    }, {
      key: 'Optimieren',
      sub: 'Jede Iteration macht die Vorhersage messbar schärfer.',
      dur: 4200
    }, {
      key: 'Verkaufen',
      sub: 'Validierte Story wird zum steuerbaren, planbaren Abverkauf.',
      dur: 3800
    }];
    const ACC = [79, 87, 92, 96],
      NOISEK = [1, 0.74, 0.52, 0.36],
      N = 120;
    const C_ORANGE = '#FFAA09',
      C_TEAL = '#C8920A',
      C_BLUE = '#9BA0AA';
    const cv = root.querySelector('canvas'),
      ctx = cv.getContext('2d');
    let W = 0,
      H = 0,
      dpr = 1;
    function resize() {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    const pts = [];
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random(),
        noise: Math.random() * 2 - 1,
        col: Math.random(),
        sp: 0.4 + Math.random() * 0.8,
        ph: Math.random() * Math.PI * 2,
        chaosY: 0.08 + Math.random() * 0.84
      });
    }
    const trueY = x => 0.80 - 0.56 * x - 0.10 * Math.sin(x * Math.PI);
    const PADL = 58,
      PADR = 58,
      PADT = 120,
      PADB = 86;
    const px = x => PADL + x * (W - PADL - PADR),
      py = yn => PADT + yn * (H - PADT - PADB);
    const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      lerp = (a, b, t) => a + (b - a) * t;
    let phase = 0,
      iter = 0,
      t0 = performance.now(),
      raf = 0,
      alive = true;
    const stepEls = [...root.querySelectorAll('.ds-step')];
    stepEls.forEach((el, i) => {
      el.onclick = () => {
        phase = i;
        t0 = performance.now();
      };
    });
    const rData = root.querySelector('.ds-data'),
      rIter = root.querySelector('.ds-iter'),
      rAcc = root.querySelector('.ds-acc'),
      gauge = root.querySelector('.ds-gauge');
    const capt = root.querySelector('.ds-t'),
      caps = root.querySelector('.ds-s');
    const GC = 2 * Math.PI * 17,
      fmt = n => Math.round(n).toLocaleString('de-DE');
    function draw(now) {
      if (!alive) return;
      const ph = PHASES[phase];
      let prog = Math.min((now - t0) / ph.dur, 1);
      if (prog >= 1) {
        if (phase < 3) {
          phase++;
        } else {
          phase = 0;
          iter = Math.min(iter + 1, ACC.length - 1);
        }
        t0 = now;
      }
      stepEls.forEach((el, i) => {
        el.classList.toggle('on', i === phase);
        el.querySelector('i').style.width = (i < phase ? 100 : i === phase ? prog * 100 : 0) + '%';
      });
      capt.textContent = ph.key;
      caps.textContent = ph.sub;
      rIter.textContent = '0' + (iter + 1);
      const dataTarget = 6200 + iter * 1100,
        accFinal = ACC[iter],
        accStart = 44 + iter * 3;
      let dataShown = phase === 0 ? ease(prog) * dataTarget : dataTarget,
        acc = accStart;
      if (phase === 1) {
        acc = lerp(accStart, accFinal - 12, ease(prog));
      } else if (phase === 2) {
        acc = lerp(accFinal - 12, accFinal, ease(prog));
      } else if (phase === 3) {
        acc = accFinal;
      }
      rData.textContent = fmt(dataShown);
      rAcc.textContent = Math.round(acc) + '%';
      gauge.setAttribute('stroke-dasharray', (acc / 100 * GC).toFixed(1) + ' ' + GC.toFixed(1));
      // "order": 0 = ungeordnete Punktwolke (keine Richtung), 1 = klare Richtung auf der Modelllinie.
      // Steigt innerhalb von "Optimieren" und mit jeder Iteration weiter (fortlaufend besser).
      const FULL = [0.50, 0.68, 0.82, 0.93],
        START = [0.00, 0.46, 0.64, 0.78];
      const ord = phase <= 1 ? START[iter] : phase === 2 ? lerp(START[iter], FULL[iter], ease(prog)) : FULL[iter];
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(20,20,18,0.05)';
      ctx.lineWidth = 1;
      for (let g = 0; g < 4; g++) {
        const yy = PADT + g * (H - PADT - PADB) / 3;
        ctx.beginPath();
        ctx.moveTo(PADL, yy);
        ctx.lineTo(W - PADR, yy);
        ctx.stroke();
      }
      const tt = now * 0.001,
        revealN = phase === 0 ? Math.floor(ease(prog) * N) : N;
      if (phase >= 1) {
        let lineProg = phase === 1 ? ease(prog) : 1;
        const wav = phase === 1 ? (1 - ease(prog)) * 0.05 : phase === 2 ? (1 - ease(prog)) * 0.03 : 0;
        ctx.lineWidth = 2.6;
        ctx.strokeStyle = C_ORANGE;
        ctx.beginPath();
        const steps = 60;
        for (let s = 0; s <= steps * lineProg; s++) {
          const xn = s / steps;
          const yn = trueY(xn) + Math.sin(xn * 9 + tt * 2) * wav;
          const X = px(xn),
            Y = py(yn);
          if (s === 0) ctx.moveTo(X, Y);else ctx.lineTo(X, Y);
        }
        ctx.stroke();
        if (phase === 3) {
          const pr = ease(prog);
          ctx.save();
          ctx.setLineDash([6, 5]);
          ctx.strokeStyle = 'rgba(255,170,9,0.55)';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          const x1 = 1,
            x2 = 1 + 0.18 * pr,
            y1 = trueY(1);
          ctx.moveTo(px(x1), py(y1));
          const yEnd = trueY(1) - 0.10 * pr;
          ctx.lineTo(px(x2), py(yEnd));
          ctx.stroke();
          ctx.restore();
          const gx = px(x2),
            gy = py(yEnd),
            pulse = 2 + Math.sin(tt * 4) * 1.5;
          const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, 16);
          grd.addColorStop(0, 'rgba(255,170,9,.5)');
          grd.addColorStop(1, 'rgba(255,170,9,0)');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(gx, gy, 16, 0, 7);
          ctx.fill();
          ctx.fillStyle = C_ORANGE;
          ctx.beginPath();
          ctx.arc(gx, gy, 4 + pulse * 0.4, 0, 7);
          ctx.fill();
        }
      }
      for (let i = 0; i < revealN; i++) {
        const p = pts[i],
          xn = p.x,
          lineYn = trueY(xn);
        const baseYn = lerp(p.chaosY, lineYn, ord); // Wolke -> Linie
        const residual = (1 - ord) * 0.05; // Reststreuung schrumpft mit ord
        const drift = Math.sin(tt * p.sp + p.ph) * 0.012 * (1 - ord * 0.7);
        const scatterYn = baseYn + p.noise * residual + drift;
        const scatterXn = xn + Math.cos(tt * p.sp * 0.7 + p.ph) * 0.004 * (1 - ord * 0.5);
        const X = px(scatterXn),
          Y = py(scatterYn);
        let a = 1,
          rad = 2.6;
        if (phase === 0) {
          const localT = ease(prog) * N - i;
          a = Math.max(0, Math.min(1, localT));
          rad = 2.6 * a;
        }
        let col = p.col > 0.84 ? C_BLUE : p.col > 0.68 ? C_TEAL : C_ORANGE;
        ctx.globalAlpha = 0.78 * a;
        if (ord > 0.25) {
          // Residual-Verbindung zur Linie, wenn Richtung entsteht
          ctx.globalAlpha = 0.10 * a * ord;
          ctx.strokeStyle = col;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(X, Y);
          ctx.lineTo(px(xn), py(lineYn));
          ctx.stroke();
          ctx.globalAlpha = 0.85 * a;
        }
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(X, Y, rad, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-card",
    ref: rootRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-stage"
  }, /*#__PURE__*/React.createElement("canvas", null), /*#__PURE__*/React.createElement("div", {
    className: "ds-steps"
  }, ['Sammeln', 'Lernen', 'Optimieren', 'Verkaufen'].map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "ds-step",
    key: s
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, s), /*#__PURE__*/React.createElement("div", {
    className: "pr"
  }, /*#__PURE__*/React.createElement("i", null))))), /*#__PURE__*/React.createElement("div", {
    className: "ds-live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), "LIVE"), /*#__PURE__*/React.createElement("div", {
    className: "ds-cap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Der UNIO-Datenkreislauf"), /*#__PURE__*/React.createElement("div", {
    className: "t ds-t"
  }, "Sammeln"), /*#__PURE__*/React.createElement("div", {
    className: "s ds-s"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ds-reads"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-read"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk"
  }, "Datenpunkte"), /*#__PURE__*/React.createElement("div", {
    className: "rv ds-data"
  }, "0")), /*#__PURE__*/React.createElement("div", {
    className: "ds-read"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk"
  }, "Iteration"), /*#__PURE__*/React.createElement("div", {
    className: "rv ds-iter"
  }, "01")), /*#__PURE__*/React.createElement("div", {
    className: "ds-read"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rk"
  }, "Genauigkeit"), /*#__PURE__*/React.createElement("div", {
    className: "ds-gaugewrap"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "42",
    height: "42",
    viewBox: "0 0 42 42"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "21",
    cy: "21",
    r: "17",
    fill: "none",
    stroke: "#ECECE8",
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    className: "ds-gauge",
    cx: "21",
    cy: "21",
    r: "17",
    fill: "none",
    stroke: "#FFAA09",
    strokeWidth: "5",
    strokeLinecap: "round",
    transform: "rotate(-90 21 21)",
    strokeDasharray: "0 200"
  })), /*#__PURE__*/React.createElement("div", {
    className: "rv ds-acc"
  }, "40%"))))));
}

/* deterministic avatar palette */
const AV_COLORS = ["#C77F00", "#5C5E62", "#B7791F", "#3E8E41", "#8A6D3B", "#6E727A", "#D9760A", "#4A4C50"];
const Avatar = ({
  name,
  size = 46
}) => {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AV_COLORS.length;
  return /*#__PURE__*/React.createElement("span", {
    className: "av",
    style: {
      background: AV_COLORS[h],
      width: size,
      height: size,
      fontSize: size * 0.3
    }
  }, initials);
};
const APP_URL = "https://app.unio.at";
const BEWERTUNG_URL = "https://bewertung.unio.at";
const SEARCH_URL = "https://app.unio.at/listing?listingType=SALE";

/* shared hero FX: scroll progress (--heroP) + smooth mouse-parallax gradient (--mx/--my) */
function useHeroFx(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let sraf = 0;
    const calcScroll = () => {
      sraf = 0;
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / (vh * 0.85)));
      el.style.setProperty('--heroP', p.toFixed(3));
    };
    const onScroll = () => {
      if (!sraf) sraf = requestAnimationFrame(calcScroll);
    };
    calcScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    let mraf = 0,
      tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.10;
      cy += (ty - cy) * 0.10;
      el.style.setProperty('--mx', cx.toFixed(4));
      el.style.setProperty('--my', cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) {
        mraf = requestAnimationFrame(tick);
      } else {
        mraf = 0;
      }
    };
    const onMove = e => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!mraf) mraf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!mraf) mraf = requestAnimationFrame(tick);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(mraf);
      cancelAnimationFrame(sraf);
    };
  }, []);
}
function HeroBg({
  blend = true,
  grid = true
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, grid && /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }));
}

/* hero search → opens the live listing search, passing the typed term so it runs there too */
function HeroSearch() {
  const go = e => {
    e.preventDefault();
    const q = (e.currentTarget.querySelector('.si').value || '').trim();
    const url = SEARCH_URL + (q ? '&search=' + encodeURIComponent(q) : '');
    window.open(url, '_blank', 'noopener');
  };
  return /*#__PURE__*/React.createElement("form", {
    className: "search-bar",
    onSubmit: go
  }, /*#__PURE__*/React.createElement(Icon.search, {
    size: 19
  }), /*#__PURE__*/React.createElement("input", {
    className: "si",
    placeholder: "Immobilie suchen \u2014 Ort, Typ, Preis\u2026",
    "aria-label": "Immobiliensuche"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-p",
    type: "submit"
  }, "Suchen"));
}
const NAV_LINKS = [{
  href: "bautraeger.html",
  label: "Bauträger",
  key: "bautraeger"
}, {
  href: "makler.html",
  label: "CIRCLE",
  key: "makler"
}, {
  href: "story.html",
  label: "Story",
  key: "story"
}];
function Nav({
  active,
  cta
}) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const primary = cta || {
    label: "Immobilie bewerten",
    href: BEWERTUNG_URL
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "nav" + (solid ? " solid" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-in"
  }, /*#__PURE__*/React.createElement(Logo, {
    className: "logo"
  }), /*#__PURE__*/React.createElement("nav", {
    className: "nav-links"
  }, NAV_LINKS.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    className: active === l.key ? "active" : ""
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "nav-cta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-login",
    href: APP_URL,
    target: "_blank",
    rel: "noopener"
  }, "Login"), primary.onClick ? /*#__PURE__*/React.createElement("button", {
    className: "nav-outline",
    onClick: primary.onClick
  }, primary.label, " ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 15
  })) : /*#__PURE__*/React.createElement("a", {
    className: "nav-outline",
    href: primary.href,
    target: primary.href.startsWith("http") ? "_blank" : undefined,
    rel: "noopener"
  }, primary.label, " ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    className: "menu-btn",
    onClick: () => setOpen(o => !o),
    "aria-label": "Men\xFC"
  }, open ? /*#__PURE__*/React.createElement(Icon.close, null) : /*#__PURE__*/React.createElement(Icon.menu, null))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 72,
      left: 0,
      right: 0,
      background: "var(--bg)",
      borderBottom: "1px solid var(--bd)",
      padding: "16px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      boxShadow: "var(--shadow-2)"
    }
  }, NAV_LINKS.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    style: {
      padding: "12px 0",
      fontSize: 16,
      fontWeight: 500,
      borderBottom: "1px solid var(--bdf)"
    }
  }, l.label)), /*#__PURE__*/React.createElement("a", {
    href: APP_URL,
    target: "_blank",
    rel: "noopener",
    style: {
      padding: "12px 0",
      fontSize: 16,
      fontWeight: 600,
      color: "var(--orange-deep)"
    }
  }, "Dashboard Login \u2192"))));
}
function Ticker({
  ink = false,
  items
}) {
  const data = items || [['300+ Mio €', 'Volumen vermittelt'], ['1 Mrd', 'Reichweite über Kampagnen'], ['25+', 'Top-Performer im CIRCLE'], ['50 Mio+', 'Zeilen Code'], ['3 Mio €', 'Umsatz 2025'], ['100%', 'erfolgsbasiert für Bauträger']];
  const set = k => data.map(([a, b], i) => /*#__PURE__*/React.createElement("span", {
    className: "tick",
    key: k + i
  }, /*#__PURE__*/React.createElement("b", {
    className: "o"
  }, a), /*#__PURE__*/React.createElement("span", null, b), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/")));
  return /*#__PURE__*/React.createElement("div", {
    className: "ticker" + (ink ? " ink" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ticker-track"
  }, set('a'), set('b')));
}

/* Scroll-driven word reveal for headlines (grey → color, word by word) */
function RevealText({
  children,
  className,
  style,
  tag
}) {
  const Tag = tag || 'h2';
  const ref = useRef();
  const tokens = [];
  (function walk(node, accent) {
    if (node == null || node === false) return;
    if (typeof node === 'string' || typeof node === 'number') {
      String(node).split(/(\s+)/).forEach(part => {
        if (part === '') return;
        if (/^\s+$/.test(part)) tokens.push({
          space: true
        });else tokens.push({
          word: part,
          accent
        });
      });
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(n => walk(n, accent));
      return;
    }
    if (React.isValidElement(node)) {
      if (node.type === 'br') {
        tokens.push({
          br: true
        });
        return;
      }
      const cls = node.props && node.props.className ? String(node.props.className) : '';
      walk(node.props.children, accent || cls.includes('accent'));
    }
  })(children, false);
  const accWords = tokens.filter(t => t.word && t.accent).length;
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!accWords) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const v = (vh * 0.9 - r.top) / ((0.9 - 0.42) * vh);
      setP(Math.max(0, Math.min(1, v)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [accWords]);
  // no orange word → render statically (black/plain headlines do not animate)
  if (!accWords) return /*#__PURE__*/React.createElement(Tag, {
    className: className,
    style: style
  }, children);
  let ai = 0;
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    className: "rvtext" + (className ? " " + className : ""),
    style: {
      ...(style || {}),
      "--n": accWords,
      "--p": p.toFixed(3)
    }
  }, tokens.map((t, k) => {
    if (t.br) return /*#__PURE__*/React.createElement("br", {
      key: k
    });
    if (t.space) return /*#__PURE__*/React.createElement("span", {
      key: k,
      className: "rv-sp"
    }, " ");
    if (t.accent) {
      const i = ai++;
      return /*#__PURE__*/React.createElement("span", {
        key: k,
        className: "rv-w acc",
        style: {
          "--i": i
        }
      }, t.word);
    }
    return /*#__PURE__*/React.createElement("span", {
      key: k,
      className: "rv-w"
    }, t.word);
  }));
}

/* scroll-driven rounded→sharp top corners for full-bleed bands */
function useEdgeRadius(ref, maxR) {
  useEffect(() => {
    let raf = 0;
    const max = maxR || 40;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const t = Math.max(0, Math.min(1, r.top / (vh * 0.62)));
      el.style.setProperty('--edgeR', (t * max).toFixed(1) + 'px');
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
}
function Footer() {
  const ref = useRef();
  const [fp, setFp] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 1.0,
        end = vh * 0.32;
      const p = (start - r.top) / (start - end);
      setFp(Math.max(0, Math.min(1, p)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  return /*#__PURE__*/React.createElement("footer", {
    ref: ref,
    style: {
      "--footP": fp.toFixed(3)
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-aura"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-brand"
  }, /*#__PURE__*/React.createElement("p", null, "Data-Powered Real Estate. Testen. Lernen. Optimieren. Verkaufen. \u2014 F\xFCnf Unternehmen, eine Mission."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g",
    href: APP_URL,
    target: "_blank",
    rel: "noopener",
    style: {
      fontSize: 13
    }
  }, "Dashboard ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 15
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g",
    href: BEWERTUNG_URL,
    target: "_blank",
    rel: "noopener",
    style: {
      fontSize: 13
    }
  }, "Bewertung ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Plattform"), /*#__PURE__*/React.createElement("a", {
    href: "bautraeger.html"
  }, "NOVA"), /*#__PURE__*/React.createElement("a", {
    href: "index.html#plattform"
  }, "Lead Engine"), /*#__PURE__*/React.createElement("a", {
    href: "makler.html"
  }, "CIRCLE"), /*#__PURE__*/React.createElement("a", {
    href: APP_URL,
    target: "_blank",
    rel: "noopener"
  }, "LENS")), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, "F\xFCr wen"), /*#__PURE__*/React.createElement("a", {
    href: "bautraeger.html"
  }, "Bautr\xE4ger"), /*#__PURE__*/React.createElement("a", {
    href: "makler.html"
  }, "Makler"), /*#__PURE__*/React.createElement("a", {
    href: "immobilien.html"
  }, "K\xE4ufer & Suchende"), /*#__PURE__*/React.createElement("a", {
    href: BEWERTUNG_URL,
    target: "_blank",
    rel: "noopener"
  }, "Immobilie bewerten")), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Unternehmen"), /*#__PURE__*/React.createElement("a", {
    href: "story.html"
  }, "Story"), /*#__PURE__*/React.createElement("a", {
    href: "story.html#team"
  }, "\xDCber uns"), /*#__PURE__*/React.createElement("a", {
    href: "makler.html#bewerben"
  }, "Karriere"), /*#__PURE__*/React.createElement("a", {
    href: "kontakt.html"
  }, "Kontakt"))), /*#__PURE__*/React.createElement("div", {
    className: "foot-bot"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Real Unio GmbH \xB7 K\xE4rntner Stra\xDFe 12, 1010 Wien"), /*#__PURE__*/React.createElement("a", {
    className: "foot-top-link",
    href: "#top",
    onClick: e => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, "Zur\xFCck zum Anfang ", /*#__PURE__*/React.createElement("span", {
    className: "up"
  }, /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 13
  }))), /*#__PURE__*/React.createElement("span", null, "Impressum \xB7 Datenschutz \xB7 AGB"))), /*#__PURE__*/React.createElement("div", {
    className: "foot-mark",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO_BLACK,
    alt: "UNIO"
  })));
}

/* ---- Funnel framework ---- */
function FunnelShell({
  title,
  step,
  total,
  onClose,
  progress,
  children,
  footer
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "funnel-overlay",
    onMouseDown: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "funnel",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "funnel-top"
  }, /*#__PURE__*/React.createElement(Logo, {
    className: "logo sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ft-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "ft-step"
  }, "Schritt ", step, " von ", total)), /*#__PURE__*/React.createElement("button", {
    className: "funnel-close",
    onClick: onClose,
    "aria-label": "Schlie\xDFen"
  }, /*#__PURE__*/React.createElement(Icon.close, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "funnel-progress"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: progress + "%"
    }
  })), children, footer));
}
function OptionList({
  options,
  value,
  onChange,
  multi = false
}) {
  const toggle = v => {
    if (multi) {
      const arr = value || [];
      onChange(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
    } else onChange(v);
  };
  const isSel = v => multi ? (value || []).includes(v) : value === v;
  return /*#__PURE__*/React.createElement("div", {
    className: "opts" + (options.length === 4 && options.every(o => !o.d) ? " two" : "")
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: o.v,
    className: "opt" + (isSel(o.v) ? " sel" : ""),
    onClick: () => toggle(o.v)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ob"
  }, isSel(o.v) && /*#__PURE__*/React.createElement(Icon.check, {
    size: 14,
    sw: 3
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "ol"
  }, o.l), o.d && /*#__PURE__*/React.createElement("span", {
    className: "od"
  }, o.d)))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Unio Homepage/_src/core.jsx", error: String((e && e.message) || e) }); }

// uploads/Unio Homepage/_src/lens.jsx
try { (() => {
/* compact segmented progress (Progress/breakdown form) */
function CompactSeg({
  value,
  note
}) {
  const [ref, seen] = useInView(0.4);
  const segN = 24,
    on = Math.round(value / 100 * segN);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "mv"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tnum"
  }, seen ? /*#__PURE__*/React.createElement(Num, {
    end: value
  }) : 0), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.5em',
      color: 'var(--fg3)'
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "lx-seg",
    style: {
      marginTop: 12
    }
  }, Array.from({
    length: segN
  }).map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: seen && i < on ? 'on' : '',
    style: {
      height: 14,
      transition: 'background .35s',
      transitionDelay: i * 22 + 'ms'
    }
  }))), note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg3)',
      marginTop: 10,
      lineHeight: 1.4
    }
  }, note));
}

/* ===================== LENS DASHBOARD KIT (ported from DS) ===================== */

/* KPI mini bar-spark */
const LKSpark = ({
  data,
  col = "var(--orange)"
}) => {
  const [ref, seen] = useInView(0.5);
  const W = 120,
    H = 26,
    n = data.length,
    bw = W / n * 0.55,
    gap = W / n;
  return /*#__PURE__*/React.createElement("svg", {
    ref: ref,
    className: "lx-kspark",
    width: W,
    height: H,
    viewBox: `0 0 ${W} ${H}`
  }, data.map((v, i) => {
    const h = Math.max(2, v / 100 * H);
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: (i * gap).toFixed(1),
      y: (H - h).toFixed(1),
      width: bw.toFixed(1),
      height: (seen ? h : 2).toFixed(1),
      rx: "1.3",
      fill: i >= n - 3 ? col : 'var(--track)',
      style: {
        transition: 'height .6s var(--ease)',
        transitionDelay: i * 40 + 'ms'
      }
    });
  }));
};

/* Marketing funnel — Lead → Angebot, orange→gold scale + conversion */
const FUN_COLS = ['var(--orange)', '#FFC24D', '#F2B43A', '#E0A52A', 'var(--lx-gold)'];
function MarketingFunnel({
  rows,
  total
}) {
  const [ref, seen] = useInView(0.4);
  const max = rows[0].v || 1;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-funnel"
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: "lx-frow",
    key: r.l
  }, /*#__PURE__*/React.createElement("div", {
    className: "ftop"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fl"
  }, r.l), /*#__PURE__*/React.createElement("span", {
    className: "fr"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fv"
  }, r.v), /*#__PURE__*/React.createElement("span", {
    className: "fp"
  }, r.p))), /*#__PURE__*/React.createElement("div", {
    className: "lx-fbar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: (seen ? Math.max(3, r.v / max * 100) : 0) + '%',
      background: FUN_COLS[i % FUN_COLS.length],
      transition: 'width 1s var(--ease)',
      transitionDelay: i * 90 + 'ms'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "lx-ftot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Gesamt-Conversion"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, total)));
}

/* Progress KPI — segmented or solid */
function ProgressKpi({
  variant = "seg",
  title,
  desc,
  value,
  note,
  inset = false
}) {
  const [ref, seen] = useInView(0.4);
  const segN = 28,
    on = Math.round(value / 100 * segN);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "lx-pk",
    style: inset ? {
      background: 'var(--inset)',
      borderRadius: 16,
      padding: 26
    } : {}
  }, /*#__PURE__*/React.createElement("h4", null, title), desc && /*#__PURE__*/React.createElement("p", null, desc), /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, seen ? /*#__PURE__*/React.createElement(Num, {
    end: value
  }) : 0, /*#__PURE__*/React.createElement("small", null, "%")), variant === "seg" ? /*#__PURE__*/React.createElement("div", {
    className: "lx-seg"
  }, Array.from({
    length: segN
  }).map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: seen && i < on ? 'on' : '',
    style: {
      transition: 'background .4s',
      transitionDelay: i * 22 + 'ms'
    }
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "lx-solid"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: (seen ? value : 0) + '%',
      transition: 'width 1s var(--ease)'
    }
  })), note && /*#__PURE__*/React.createElement("div", {
    className: "note"
  }, note));
}

/* Segmented donut on UNIO palette */
function SegDonut({
  segs,
  center,
  label,
  size = 130
}) {
  const [ref, seen] = useInView(0.5);
  const tot = segs.reduce((a, s) => a + s.v, 0),
    R = 46,
    C = 2 * Math.PI * R;
  let acc = 0;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 120 120"
  }, /*#__PURE__*/React.createElement("g", {
    transform: "rotate(-90 60 60)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: R,
    fill: "none",
    stroke: "var(--track)",
    strokeWidth: "13"
  }), segs.map((s, i) => {
    const len = s.v / tot * C,
      off = acc;
    acc += len;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: "60",
      cy: "60",
      r: R,
      fill: "none",
      stroke: s.c,
      strokeWidth: "13",
      strokeLinecap: "butt",
      strokeDasharray: `${seen ? len : 0} ${C}`,
      strokeDashoffset: -off,
      style: {
        transition: 'stroke-dasharray 1s var(--ease)',
        transitionDelay: i * 180 + 'ms'
      }
    });
  })), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "56",
    textAnchor: "middle",
    style: {
      font: '600 23px var(--f)',
      letterSpacing: '-.03em',
      fill: 'var(--fg1)'
    }
  }, center), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "73",
    textAnchor: "middle",
    style: {
      font: '600 9.5px var(--f)',
      letterSpacing: '.1em',
      fill: 'var(--fg3)'
    }
  }, label)));
}

/* Activity rings — UNIO split-ring form, concentric */
function ActivityRings({
  rings,
  size = 150
}) {
  const [ref, seen] = useInView(0.5);
  // each ring: open-C arc (300deg) from -90deg
  const arc = (r, frac) => {
    const a0 = -220,
      sweep = 260 * frac;
    const a1 = a0 + sweep;
    const rad = d => d * Math.PI / 180;
    const x0 = 50 + r * Math.cos(rad(a0)),
      y0 = 50 + r * Math.sin(rad(a0)),
      x1 = 50 + r * Math.cos(rad(a1)),
      y1 = 50 + r * Math.sin(rad(a1));
    const large = sweep > 180 ? 1 : 0;
    return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  };
  const RS = [34, 25, 16];
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 100 100"
  }, RS.map((r, i) => /*#__PURE__*/React.createElement("path", {
    key: 't' + i,
    d: arc(r, 1),
    fill: "none",
    stroke: "var(--track)",
    strokeWidth: "6",
    strokeLinecap: "round"
  })), rings.map((rg, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: arc(RS[i], seen ? rg.v / 100 : 0),
    fill: "none",
    stroke: rg.c,
    strokeWidth: "6",
    strokeLinecap: "round",
    style: {
      transition: 'all 1.1s var(--ease)',
      transitionDelay: i * 160 + 'ms'
    }
  }))));
}

/* multi-series smooth area chart */
function smoothPath(pts) {
  let d = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i],
      [x1, y1] = pts[i + 1],
      mx = (x0 + x1) / 2;
    d += ' C' + mx.toFixed(1) + ',' + y0.toFixed(1) + ' ' + mx.toFixed(1) + ',' + y1.toFixed(1) + ' ' + x1.toFixed(1) + ',' + y1.toFixed(1);
  }
  return d;
}
function LensActivityChart() {
  const W = 620,
    H = 210,
    n = 15;
  const series = [{
    c: 'var(--orange)',
    d: [6, 10, 8, 22, 12, 70, 40, 95, 28, 60, 30, 18, 40, 22, 55]
  }, {
    c: 'var(--lx-gold)',
    d: [10, 18, 14, 30, 20, 40, 55, 75, 48, 98, 70, 42, 80, 35, 90]
  }, {
    c: 'var(--lx-grey)',
    d: [3, 6, 5, 10, 8, 14, 18, 30, 55, 40, 22, 12, 18, 10, 30]
  }];
  const xs = i => 20 + i / (n - 1) * (W - 30),
    ys = v => H - 20 - v / 100 * (H - 40);
  return /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: H,
    viewBox: `0 0 ${W} ${H}`,
    preserveAspectRatio: "none"
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "20",
    x2: W - 10,
    y1: 20 + i * (H - 40) / 3,
    y2: 20 + i * (H - 40) / 3,
    stroke: "rgba(20,20,18,.05)",
    strokeWidth: "1"
  })), series.map((s, si) => {
    const pts = s.d.map((v, i) => [xs(i), ys(v)]);
    const line = smoothPath(pts);
    const area = line + ` L${W - 10},${H - 20} L20,${H - 20} Z`;
    return /*#__PURE__*/React.createElement("g", {
      key: si
    }, /*#__PURE__*/React.createElement("path", {
      className: "fade-a",
      d: area,
      fill: s.c,
      opacity: "0.10"
    }), /*#__PURE__*/React.createElement("path", {
      className: "lx-line",
      d: line,
      fill: "none",
      stroke: s.c,
      strokeWidth: "2.4",
      style: {
        animationDelay: si * 0.15 + 's'
      }
    }));
  }));
}

/* Assembled LENS board (fixed design width ~1180) */
function LensBoard({
  title,
  sub,
  nav,
  active,
  banner,
  kpis,
  wide,
  right,
  extra
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "lx-board",
    style: {
      width: 1180
    }
  }, /*#__PURE__*/React.createElement("aside", {
    className: "lx-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-brand"
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 24,
    w: 13
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "Unio"), /*#__PURE__*/React.createElement("div", {
    className: "sb"
  }, title === 'Makler-Cockpit' ? 'CIRCLE' : 'Immobilien'))), nav.map((g, gi) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: gi
  }, g.h && /*#__PURE__*/React.createElement("div", {
    className: "lx-ng"
  }, g.h), g.items.map(([t, ic]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    className: "lx-ni" + (t === active ? ' on' : '')
  }, Icon[ic] ? Icon[ic]({
    size: 16
  }) : /*#__PURE__*/React.createElement(Icon.layers, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, t)))))), /*#__PURE__*/React.createElement("div", {
    className: "lx-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-h1"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "lx-sub"
  }, sub), /*#__PURE__*/React.createElement("div", {
    className: "lx-banner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "upd"
  }, "Aktualisiert \xB7 live"), /*#__PURE__*/React.createElement("div", {
    className: "lx-chips"
  }, banner.chips.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "lx-chip " + c.t
  }, c.l))), /*#__PURE__*/React.createElement("h3", null, banner.h), /*#__PURE__*/React.createElement("p", null, banner.p)), /*#__PURE__*/React.createElement("div", {
    className: "lx-kpis"
  }, kpis.map(k => /*#__PURE__*/React.createElement("div", {
    className: "lx-kpi",
    key: k.k
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, k.k), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, k.v), /*#__PURE__*/React.createElement(LKSpark, {
    data: k.spark,
    col: k.col || 'var(--orange)'
  }), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, k.s), /*#__PURE__*/React.createElement("div", {
    className: "chip"
  }, Icon[k.icon] ? Icon[k.icon]({
    size: 17
  }) : /*#__PURE__*/React.createElement(Icon.layers, {
    size: 17
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "lx-row2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-card lx-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-ct"
  }, wide.t), /*#__PURE__*/React.createElement("div", {
    className: "lx-cs"
  }, wide.s), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(LensActivityChart, null)), /*#__PURE__*/React.createElement("div", {
    className: "lx-legend"
  }, wide.legend.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "lx-lg"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      background: l.c
    }
  }), l.l)))), /*#__PURE__*/React.createElement("div", {
    className: "lx-rcol"
  }, right)), extra && extra.map((e, i) => /*#__PURE__*/React.createElement("div", {
    className: "lx-card " + e.cls,
    key: i,
    style: {
      marginTop: 12
    }
  }, e.node))));
}

/* Channel Performance — acquisition bars + cost-per-lead */
const CHAN = [{
  n: 'Meta Ads',
  leads: 470,
  cpl: 18,
  c: 'var(--orange)'
}, {
  n: 'Google Ads',
  leads: 210,
  cpl: 16,
  c: '#FFD27A'
}, {
  n: 'willhaben',
  leads: 250,
  cpl: 14,
  c: 'var(--lx-gold)'
}, {
  n: 'ImmobilienScout',
  leads: 72,
  cpl: 22,
  c: '#8A6308'
}, {
  n: 'derStandard',
  leads: 30,
  cpl: 32,
  c: 'var(--lx-grey)'
}, {
  n: 'Organisch',
  leads: 12,
  cpl: 0,
  c: '#EAD9A8'
}];
function ChannelBars() {
  const [ref, seen] = useInView(0.4);
  const max = 600;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-ct"
  }, "Channel Performance ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg3)',
      fontWeight: 500
    }
  }, "\xB7 Cost / Lead")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      marginTop: 18
    }
  }, CHAN.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.n,
    style: {
      display: 'grid',
      gridTemplateColumns: '140px 1fr',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--fg2)',
      textAlign: 'right'
    }
  }, c.n), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 17
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: (seen ? Math.max(2, c.leads / max * 100) : 0) + '%',
      background: c.c,
      borderRadius: 5,
      transition: 'width 1s var(--ease)',
      transitionDelay: i * 70 + 'ms'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0 40px',
      marginTop: 18,
      paddingTop: 6
    }
  }, CHAN.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 13.5,
      padding: '9px 0',
      borderBottom: '1px solid var(--bdf)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: c.c,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg2)'
    }
  }, c.n), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontWeight: 700,
      fontVariantNumeric: 'tabular-nums'
    }
  }, c.cpl, " \u20AC")))));
}

/* Einheiten & Nachfrage — unit demand table */
const UNITS = [['TOP 7b', '3. OG', '74,84', '679k', 'Reserviert', 18, 5, 'B', 233], ['TOP 8', '4. OG', '102,8', '958k', 'Heiß', 50, 15, 'A', 229], ['TOP 9a', '4. OG', '50,0', '400k', 'Heiß', 25, 6, 'A', 281], ['TOP 9b', '4. OG', '74,84', '699k', 'Cold', 8, 2, 'B', 358], ['TOP 10', '5. OG', '102,8', '988k', 'Heiß', 40, 11, 'A', 189], ['TOP 11', '5. OG', '50,03', '404k', 'Reserviert', 8, 2, 'B', 355]];
const stClr = s => s === 'Heiß' ? {
  bg: 'var(--orange-wash)',
  fg: 'var(--orange-deep)'
} : {
  bg: 'var(--inset)',
  fg: 'var(--fg3)'
};
const qClr = q => q === 'A' ? {
  bg: 'var(--orange-wash)',
  fg: 'var(--orange-deep)'
} : q === 'B' ? {
  bg: '#FBEFD3',
  fg: 'var(--lx-gold)'
} : {
  bg: 'var(--inset)',
  fg: 'var(--fg3)'
};
const UCOLS = '1.1fr .7fr .7fr .8fr 1fr 1.5fr .55fr .6fr .6fr';
function UnitTable() {
  const [ref, seen] = useInView(0.35);
  const max = 50;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-ct"
  }, "Einheiten & Nachfrage"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--fg3)'
    }
  }, "Verf\xFCgbar \u25BE")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: UCOLS,
      gap: 10,
      fontSize: 10.5,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--fg4)',
      fontWeight: 600,
      paddingBottom: 10,
      borderBottom: '1px solid var(--bdf)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Einheit"), /*#__PURE__*/React.createElement("span", null, "Etage"), /*#__PURE__*/React.createElement("span", null, "m\xB2"), /*#__PURE__*/React.createElement("span", null, "Preis"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "Nachfrage"), /*#__PURE__*/React.createElement("span", null, "Leads"), /*#__PURE__*/React.createElement("span", null, "Qual."), /*#__PURE__*/React.createElement("span", null, "Tage")), UNITS.map((u, i) => {
    const sc = stClr(u[4]),
      qc = qClr(u[7]);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: UCOLS,
        gap: 10,
        alignItems: 'center',
        fontSize: 13,
        padding: '12px 0',
        borderBottom: '1px solid var(--bdf)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon.home, {
      size: 14
    }), " ", u[0]), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--fg2)'
      }
    }, u[1]), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--fg2)'
      }
    }, u[2]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600
      }
    }, u[3]), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        fontWeight: 600,
        padding: '4px 9px',
        borderRadius: 999,
        background: sc.bg,
        color: sc.fg
      }
    }, u[4])), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 6,
        background: 'var(--track)',
        borderRadius: 3,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        height: '100%',
        width: (seen ? u[5] / max * 100 : 0) + '%',
        background: 'var(--orange)',
        borderRadius: 3,
        transition: 'width .9s var(--ease)',
        transitionDelay: i * 60 + 'ms'
      }
    })), /*#__PURE__*/React.createElement("b", {
      style: {
        fontVariantNumeric: 'tabular-nums'
      }
    }, u[5])), /*#__PURE__*/React.createElement("span", {
      style: {
        fontVariantNumeric: 'tabular-nums'
      }
    }, u[6]), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        width: 23,
        height: 23,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        background: qc.bg,
        color: qc.fg
      }
    }, u[7])), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--fg3)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, u[8]));
  })));
}

/* Live-Besichtigungsstatus — viewing table w/ score rings */
const VIEWS = [['Maria Huber', 'David Klein', 'TOP 4', '497.000', 'Besichtigt gerade', 87, 72], ['Stefan Mayer', 'Cayan Cankaya', 'TOP 6', '462.000', 'Folgetermin', 74, 58], ['Anna Gruber', 'David Klein', 'TOP 7', '398.000', 'Zusage erwartet', 92, 85], ['Peter Wimmer', 'Wenzel Waechter', 'TOP 3', '336.000', 'Folgetermin', 68, 45], ['Sandra Fischer', 'Cayan Cankaya', 'TOP 8', '623.000', 'Besichtigt gerade', 56, 32]];
function ScoreRing({
  v
}) {
  const R = 15,
    C = 2 * Math.PI * R;
  const [ref, seen] = useInView(0.5);
  return /*#__PURE__*/React.createElement("svg", {
    ref: ref,
    width: "38",
    height: "38",
    viewBox: "0 0 38 38"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "19",
    r: R,
    fill: "none",
    stroke: "var(--track)",
    strokeWidth: "3.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "19",
    r: R,
    fill: "none",
    stroke: "var(--orange)",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeDasharray: C.toFixed(1),
    strokeDashoffset: (seen ? C * (1 - v / 100) : C).toFixed(1),
    transform: "rotate(-90 19 19)",
    style: {
      transition: 'stroke-dashoffset 1s var(--ease)'
    }
  }), /*#__PURE__*/React.createElement("text", {
    x: "19",
    y: "22.5",
    textAnchor: "middle",
    style: {
      font: '600 11px var(--f)',
      fill: 'var(--fg1)'
    }
  }, v));
}
const VCOLS = '1.2fr 1.1fr .7fr .9fr 1.25fr .6fr .65fr';
function ViewingTable() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-ct"
  }, "Live-Besichtigungsstatus"), /*#__PURE__*/React.createElement("span", {
    className: "lx-livechip",
    style: {
      position: 'static'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), "2 aktiv")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: VCOLS,
      gap: 10,
      fontSize: 10.5,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--fg4)',
      fontWeight: 600,
      paddingBottom: 10,
      borderBottom: '1px solid var(--bdf)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Interessent"), /*#__PURE__*/React.createElement("span", null, "Makler"), /*#__PURE__*/React.createElement("span", null, "Einheit"), /*#__PURE__*/React.createElement("span", null, "Preis \u20AC"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "Score"), /*#__PURE__*/React.createElement("span", null, "Wahrsch.")), VIEWS.map((v, i) => {
    const hot = v[4] === 'Zusage erwartet' || v[4] === 'Besichtigt gerade';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: VCOLS,
        gap: 10,
        alignItems: 'center',
        fontSize: 13,
        padding: '11px 0',
        borderBottom: '1px solid var(--bdf)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600
      }
    }, v[0]), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--fg2)'
      }
    }, v[1]), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        color: 'var(--fg2)'
      }
    }, /*#__PURE__*/React.createElement(Icon.home, {
      size: 13
    }), v[2]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums'
      }
    }, v[3]), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        fontWeight: 600,
        padding: '4px 9px',
        borderRadius: 999,
        background: hot ? 'var(--orange-wash)' : 'var(--inset)',
        color: hot ? 'var(--orange-deep)' : 'var(--fg3)'
      }
    }, v[4])), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(ScoreRing, {
      v: v[5]
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: v[6] >= 50 ? 'var(--orange-deep)' : 'var(--fg3)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, v[6], " %"));
  })));
}

/* Scroll-driven LENS section (sticky camera) */
function LensScrollSection({
  kicker,
  h,
  sub,
  board,
  steps,
  id,
  cta
}) {
  const wrapRef = useRef();
  const p = useStickyProgress(wrapRef);
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const tourP = Math.min(1, p / 0.82);
  const zoom = ease(Math.max(0, Math.min(1, (p - 0.82) / 0.18)));
  const zStyle = {
    transform: `scale(${(1 + zoom * 0.85).toFixed(3)})`,
    opacity: (1 - zoom).toFixed(3),
    willChange: 'transform,opacity'
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground",
    id: id
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, kicker), /*#__PURE__*/React.createElement("h2", null, h), /*#__PURE__*/React.createElement("p", null, sub))), /*#__PURE__*/React.createElement("div", {
    className: "lens-scroll",
    ref: wrapRef,
    style: {
      height: steps.length * 60 + 80 + 'vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lens-sticky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-zoom" + (zoom > 0.02 ? " zooming" : ""),
    style: zStyle
  }, /*#__PURE__*/React.createElement(LensTour, {
    board: board,
    steps: steps,
    progress: tourP
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      marginTop: 18,
      display: 'flex',
      gap: 13,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g btn-lg",
    href: APP_URL,
    target: "_blank",
    rel: "noopener"
  }, cta, " ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg3)'
    }
  }, "Demodaten \xB7 live unter app.unio.at \xB7 scrolle durch das Dashboard")));
}

/* progress through a tall sticky container (0..1) */
function useStickyProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      setP(Math.max(0, Math.min(1, scrolled / Math.max(1, total))));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [ref]);
  return p;
}

/* LENS TOUR — a camera that pans/zooms across the board with callouts */
function LensTour({
  title,
  sub,
  board,
  steps,
  height,
  step: stepProp,
  progress
}) {
  const continuous = progress != null;
  const controlled = stepProp != null;
  const vpRef = useRef(),
    stageRef = useRef();
  const [vw, setVw] = useState(0),
    [vh, setVh] = useState(0),
    [stepS, setStepS] = useState(0),
    [rects, setRects] = useState(null);
  const easeIO = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const pc = continuous ? Math.max(0, Math.min(1, progress)) : 0;
  const step = continuous ? Math.round(pc * (steps.length - 1)) : controlled ? Math.max(0, Math.min(steps.length - 1, stepProp)) : stepS;
  useEffect(() => {
    const el = vpRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setVw(el.clientWidth);
      setVh(el.clientHeight);
    });
    ro.observe(el);
    setVw(el.clientWidth);
    setVh(el.clientHeight);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = steps.map(st => {
      if (!st.sel) return {
        x: 0,
        y: 0,
        w: 1180,
        h: stage.offsetHeight || 760
      };
      const el = stage.querySelector(st.sel);
      if (!el) return {
        x: 0,
        y: 0,
        w: 1180,
        h: stage.offsetHeight || 760
      };
      let x = 0,
        y = 0,
        node = el;
      while (node && node !== stage) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent;
      }
      const pad = st.pad || 18;
      return {
        x: x - pad,
        y: y - pad,
        w: el.offsetWidth + 2 * pad,
        h: el.offsetHeight + 2 * pad
      };
    });
    setRects(r);
  }, [vw, steps]);
  useEffect(() => {
    if (controlled) return;
    const id = setInterval(() => setStepS(s => (s + 1) % steps.length), 4600);
    return () => clearInterval(id);
  }, [steps.length, controlled]);
  useEffect(() => {
    if (controlled || continuous) return;
    const id = setInterval(() => setStepS(s => (s + 1) % steps.length), 4600);
    return () => clearInterval(id);
  }, [steps.length, controlled, continuous]);
  let scale = vw / 1180,
    tx = 0,
    ty = 0;
  if (rects && vw > 0) {
    let rc = rects[step];
    if (continuous && rects.length > 1) {
      const fp = pc * (steps.length - 1),
        i = Math.max(0, Math.min(steps.length - 2, Math.floor(fp))),
        t = easeIO(fp - i);
      const a = rects[i],
        b = rects[i + 1] || a;
      rc = {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        w: a.w + (b.w - a.w) * t,
        h: a.h + (b.h - a.h) * t
      };
    }
    scale = vw / rc.w;
    tx = -rc.x * scale;
    ty = -rc.y * scale + Math.max(0, (vh - rc.h * scale) / 2);
  }
  const s = steps[step];
  return /*#__PURE__*/React.createElement("div", {
    className: "lx-tour",
    style: height ? {
      aspectRatio: 'auto',
      height
    } : {}
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-vp",
    ref: vpRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-stage",
    ref: stageRef,
    style: {
      transform: `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      transition: continuous ? 'transform .12s linear' : undefined
    }
  }, board)), /*#__PURE__*/React.createElement("div", {
    className: "lx-brackets"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
    className: "lx-livechip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), "LENS \xB7 LIVE"), /*#__PURE__*/React.createElement("div", {
    className: "lx-callout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cobox"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cok"
  }, s.k), /*#__PURE__*/React.createElement("div", {
    className: "cot"
  }, s.t), /*#__PURE__*/React.createElement("div", {
    className: "cop"
  }, s.p), /*#__PURE__*/React.createElement("div", {
    className: "lx-dots"
  }, steps.map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: i === step ? 'on' : '',
    onClick: controlled ? undefined : () => setStepS(i),
    "aria-label": "Schritt " + (i + 1)
  }))))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Unio Homepage/_src/lens.jsx", error: String((e && e.message) || e) }); }

// uploads/Unio Homepage/_src/makler_platform.jsx
try { (() => {
/* ===================== MAKLER PLATFORM — Bento overview + Screenshot tour ===================== */

/* ---- typing search (KI-Suche) ---- */
function KITyper() {
  const Q = ["Wohnungen im 1. Bezirk unter 800k", "Penthouse mit Terrasse, Hernals", "3 Zimmer, Nähe U1, ab 110 m²", "Anlegerwohnung mit Rendite > 3 %"];
  const [qi, setQi] = useState(0),
    [n, setN] = useState(0),
    [del, setDel] = useState(false);
  useEffect(() => {
    const full = Q[qi];
    let t;
    if (!del && n < full.length) {
      t = setTimeout(() => setN(n + 1), 45);
    } else if (!del && n === full.length) {
      t = setTimeout(() => setDel(true), 1400);
    } else if (del && n > 0) {
      t = setTimeout(() => setN(n - 1), 22);
    } else {
      t = setTimeout(() => {
        setDel(false);
        setQi((qi + 1) % Q.length);
      }, 250);
    }
    return () => clearTimeout(t);
  }, [n, del, qi]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mp-searchbar"
  }, /*#__PURE__*/React.createElement(Icon.search, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "tw"
  }, Q[qi].slice(0, n) || '\u00a0', /*#__PURE__*/React.createElement("span", {
    className: "mp-caret"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mp-chip on"
  }, /*#__PURE__*/React.createElement(Icon.spark, {
    size: 12
  }), " KI-Suche"), /*#__PURE__*/React.createElement("span", {
    className: "mp-chip"
  }, "14 Treffer"), /*#__PURE__*/React.createElement("span", {
    className: "mp-chip"
  }, "Nur meine")));
}
function ShieldAnim() {
  const [ref, seen] = useInView(0.4);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let v = 0;
    const id = setInterval(() => {
      v = (v + 4) % 128;
      setP(Math.min(100, v));
    }, 45);
    return () => clearInterval(id);
  }, [seen]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "mp-shield"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "118",
    height: "138",
    viewBox: "0 0 118 138",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M59 6 L106 24 V70 C106 102 84 122 59 132 C34 122 12 102 12 70 V24 Z",
    fill: "var(--inset)",
    stroke: "var(--bdf)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("clipPath", {
    id: "shc"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M59 6 L106 24 V70 C106 102 84 122 59 132 C34 122 12 102 12 70 V24 Z"
  })), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: 138 - 138 * p / 100,
    width: "118",
    height: "138",
    fill: "var(--orange-wash)",
    clipPath: "url(#shc)",
    style: {
      transition: 'y .15s linear'
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: "M42 70 L54 82 L78 54",
    stroke: p >= 100 ? 'var(--pos)' : 'var(--orange)',
    strokeWidth: "5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    style: {
      transition: 'stroke .3s'
    }
  })));
}
function ActionsAnim() {
  const [ref, seen] = useInView(0.4);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => setK(x => x + 1), 2600);
    return () => clearInterval(id);
  }, [seen]);
  const rows = [["Lead telefonisch kontaktieren", "Jetzt"], ["Besichtigung vorschlagen", "Heute"], ["Kaufanbot-Link senden", "+1 Tag"]];
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "mp-actionstack",
    key: k
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: "mp-arow",
    key: i,
    style: {
      animationDelay: i * 0.22 + 's'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, r[0]), /*#__PURE__*/React.createElement("span", {
    className: "go"
  }, r[1]))));
}
function PortalAnim() {
  const [ref, seen] = useInView(0.4);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => setOn(o => !o), 1900);
    return () => clearInterval(id);
  }, [seen]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "mp-portals"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mp-portal",
    style: {
      background: '#F75C03'
    }
  }, "IS", /*#__PURE__*/React.createElement("span", {
    className: "tick" + (on ? " on" : "")
  }, /*#__PURE__*/React.createElement(Icon.check, {
    size: 12
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mp-syncline"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mp-portal",
    style: {
      background: '#EA6E2D'
    }
  }, "W", /*#__PURE__*/React.createElement("span", {
    className: "tick" + (on ? " on" : ""),
    style: {
      animationDelay: '.12s'
    }
  }, /*#__PURE__*/React.createElement(Icon.check, {
    size: 12
  }))));
}
function CalAnim() {
  const [ref, seen] = useInView(0.4);
  const [d, setD] = useState(10);
  useEffect(() => {
    if (!seen) return;
    const days = [3, 10, 17, 24, 12];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % days.length;
      setD(days[i]);
    }, 1500);
    return () => clearInterval(id);
  }, [seen]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "mp-cal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mp-calgrid"
  }, Array.from({
    length: 28
  }).map((_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: i === d ? 'on' : ''
  }))));
}
function MatchAnim() {
  const [ref, seen] = useInView(0.4);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!seen) return;
    const id = setInterval(() => setOn(o => !o), 2200);
    return () => clearInterval(id);
  }, [seen]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "mp-match"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mp-matchrow"
  }, ["Wohnung", "€1,0–1,5 Mio", "4–5 Zi", "1020 Wien"].map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "mp-chip" + (on ? " on" : ""),
    style: {
      transition: 'all .3s ' + i * 0.08 + 's'
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "mp-matchcheck" + (on ? " on" : "")
  }, /*#__PURE__*/React.createElement(Icon.check, {
    size: 16
  }), " Passendes Objekt gefunden"));
}
function PlatformBento() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "plattform"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Deine Makler-Plattform"), /*#__PURE__*/React.createElement("h2", null, "Ein System f\xFCr deinen", /*#__PURE__*/React.createElement("br", null), "gesamten Verkauf."), /*#__PURE__*/React.createElement("p", null, "Von der KI-Suche \xFCber abgesicherte Leads bis zum Portal-Export \u2014 jede Funktion arbeitet f\xFCr dich, damit du dich auf Abschl\xFCsse konzentrierst.")), /*#__PURE__*/React.createElement("div", {
    className: "mp-bento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mp-card mp-c4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh"
  }, "KI-Suche & Lead-Inbox"), /*#__PURE__*/React.createElement("div", {
    className: "mp"
  }, "Frag in nat\xFCrlicher Sprache nach Objekten oder K\xE4ufern \u2014 die Plattform versteht dich und liefert sofort passende Treffer."), /*#__PURE__*/React.createElement("div", {
    className: "mstage",
    style: {
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(KITyper, null))), /*#__PURE__*/React.createElement("div", {
    className: "mp-card mp-c2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh"
  }, "Provisionssicherung"), /*#__PURE__*/React.createElement("div", {
    className: "mp"
  }, "Jeder Lead wird automatisch abgesichert \u2014 bevor du Zeit investierst."), /*#__PURE__*/React.createElement("div", {
    className: "mstage"
  }, /*#__PURE__*/React.createElement(ShieldAnim, null))), /*#__PURE__*/React.createElement("div", {
    className: "mp-card mp-c2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh"
  }, "Suggested Actions"), /*#__PURE__*/React.createElement("div", {
    className: "mp"
  }, "Das System sagt dir den n\xE4chsten Schritt \u2014 priorisiert nach Wirkung."), /*#__PURE__*/React.createElement("div", {
    className: "mstage"
  }, /*#__PURE__*/React.createElement(ActionsAnim, null))), /*#__PURE__*/React.createElement("div", {
    className: "mp-card mp-c2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh"
  }, "Portal-Export"), /*#__PURE__*/React.createElement("div", {
    className: "mp"
  }, "Ein Klick ver\xF6ffentlicht auf ImmobilienScout24 & willhaben \u2014 inkl. Update & R\xFCckzug."), /*#__PURE__*/React.createElement("div", {
    className: "mstage"
  }, /*#__PURE__*/React.createElement(PortalAnim, null))), /*#__PURE__*/React.createElement("div", {
    className: "mp-card mp-c2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh"
  }, "Besichtigung & Kalender"), /*#__PURE__*/React.createElement("div", {
    className: "mp"
  }, "Termine direkt aus dem Lead heraus buchen \u2014 synchron mit deinem Kalender."), /*#__PURE__*/React.createElement("div", {
    className: "mstage"
  }, /*#__PURE__*/React.createElement(CalAnim, null))), /*#__PURE__*/React.createElement("div", {
    className: "mp-card mp-c3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh"
  }, "Automatisches Matching"), /*#__PURE__*/React.createElement("div", {
    className: "mp"
  }, "Aus jeder Anfrage entsteht ein Suchprofil \u2014 und die Plattform matcht es laufend gegen deinen Bestand."), /*#__PURE__*/React.createElement("div", {
    className: "mstage"
  }, /*#__PURE__*/React.createElement(MatchAnim, null))), /*#__PURE__*/React.createElement("div", {
    className: "mp-card mp-c3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh"
  }, "KI-Objektanlage"), /*#__PURE__*/React.createElement("div", {
    className: "mp"
  }, "Dokumente reinziehen \u2014 die KI erstellt Expos\xE9, Daten und Suchprofil automatisch."), /*#__PURE__*/React.createElement("div", {
    className: "mstage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mp-bignum"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement(Num, {
    end: 90
  }), " %"), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "weniger Tipparbeit pro Objekt")))))));
}

/* ---------------- Screenshot scroll-tour ---------------- */
const PT_STEPS = [{
  img: 'mk_19',
  addr: 'app.unio.at/dashboard',
  n: '01',
  t: 'Dein Cockpit.',
  p: 'Aktivität, Status-Mix und Kontakt-Funnel auf einen Blick — du siehst sofort, wo Bewegung ist und worauf du dich heute konzentrieren solltest.',
  lb: 'Dashboard'
}, {
  img: 'mk_05',
  addr: 'app.unio.at/interessenten',
  n: '02',
  t: 'Jeder Lead. Abgesichert.',
  p: 'Alle Interessenten an einem Ort — mit Status, Kaufabsicht und automatischer Provisionssicherung, bevor du Zeit investierst.',
  lb: 'Interessenten'
}, {
  img: 'mk_06',
  addr: 'app.unio.at/leads',
  n: '03',
  t: 'Suggested Actions führen dich.',
  p: 'Pro Lead siehst du den vollständigen Verlauf und den klar empfohlenen nächsten Schritt — Anruf, Besichtigung oder Kaufanbot.',
  lb: 'Lead-Detail'
}, {
  img: 'mk_08',
  addr: 'app.unio.at/matching',
  n: '04',
  t: 'Automatisches Matching.',
  p: 'Aus jeder Anfrage entsteht ein Suchprofil, das laufend gegen deinen Bestand gematcht wird — kein Lead geht verloren.',
  lb: 'Matching'
}, {
  img: 'mk_01',
  addr: 'app.unio.at/immobilien',
  n: '05',
  t: 'Dein Bestand, durchsuchbar.',
  p: 'Alle Objekte und Entwürfe mit KI-Suche in natürlicher Sprache — Filter, Ansichten und Status in Echtzeit.',
  lb: 'Immobilien'
}, {
  img: 'mk_04',
  addr: 'app.unio.at/immobilien/detail',
  n: '06',
  t: 'Objekte, die verkaufen.',
  p: 'Hochwertige Exposés mit Galerie, Interessenten, Plattform-Export und Abschluss — alles am selben Objekt.',
  lb: 'Objekt'
}, {
  img: 'mk_13',
  addr: 'app.unio.at/portale',
  n: '07',
  t: 'Ein Klick. Alle Portale.',
  p: 'Veröffentliche, aktualisiere und ziehe zurück auf ImmobilienScout24 & willhaben — mit vollständigem Übertragungs-Log.',
  lb: 'Portale'
}, {
  img: 'mk_03',
  addr: 'app.unio.at/immobilien/neu',
  n: '08',
  t: 'Die KI legt das Objekt an.',
  p: 'Dokumente reinziehen — die KI erstellt den ersten Entwurf inkl. Exposé, Daten und Suchprofil. Du prüfst nur noch.',
  lb: 'KI-Anlage'
}];
function PlatformTour() {
  const wrapRef = useRef();
  const p = useStickyProgress(wrapRef);
  const N = PT_STEPS.length;
  const auto = Math.max(0, Math.min(N - 1, Math.floor(p * N * 0.999)));
  const [manual, setManual] = useState(null);
  const active = manual != null ? manual : auto;
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground",
    id: "tour"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "LENS \xB7 Die Plattform live"), /*#__PURE__*/React.createElement("h2", null, "Scrolle durch deine Plattform."), /*#__PURE__*/React.createElement("p", null, "So arbeitest du im CIRCLE \u2014 echte Screens aus dem UNIO-Dashboard, Schritt f\xFCr Schritt."))), /*#__PURE__*/React.createElement("div", {
    className: "pt-scroll",
    ref: wrapRef,
    style: {
      height: N * 62 + 'vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-sticky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-copy"
  }, PT_STEPS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "pt-step" + (i === active ? " on" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-num"
  }, s.n, " / 0", N), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.p))), /*#__PURE__*/React.createElement("div", {
    className: "pt-dots"
  }, PT_STEPS.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "pt-dot" + (i === active ? " on" : ""),
    onClick: () => setManual(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("span", {
    className: "lb"
  }, s.lb))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-frame"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-chrome"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("span", {
    className: "addr"
  }, PT_STEPS[active].addr)), /*#__PURE__*/React.createElement("div", {
    className: "pt-live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), "LIVE"), /*#__PURE__*/React.createElement("div", {
    className: "pt-shots"
  }, PT_STEPS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "pt-shot" + (i === active ? " on" : ""),
    style: {
      transform: i === active ? 'scale(1)' : 'scale(1.03)',
      transition: 'opacity .6s var(--ease), transform 4s ease-out'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG[s.img],
    alt: s.lb,
    loading: "lazy"
  }))))))))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      marginTop: 18,
      display: 'flex',
      gap: 13,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g btn-lg",
    href: APP_URL,
    target: "_blank",
    rel: "noopener"
  }, "Dashboard \xF6ffnen ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--fg3)'
    }
  }, "Live unter app.unio.at \xB7 echte Screens")));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Unio Homepage/_src/makler_platform.jsx", error: String((e && e.message) || e) }); }

// uploads/Unio Homepage/_src/page-bautraeger.jsx
try { (() => {
/* ===================== BAUTRÄGER ===================== */

function HeroB({
  onOpen
}) {
  const ref = useRef();
  useHeroFx(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    ref: ref
  }, /*#__PURE__*/React.createElement(HeroBg, null), /*#__PURE__*/React.createElement("div", {
    className: "hero-orb ring-spin",
    style: {
      right: '-90px',
      top: '2%'
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 340,
    w: 2.5,
    color: "rgba(255,170,9,.4)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide hero-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "F\xFCr Bautr\xE4ger"), /*#__PURE__*/React.createElement(RevealText, {
    tag: "h1",
    style: {
      fontSize: 'clamp(38px,5vw,64px)'
    }
  }, "Testen. Lernen.", /*#__PURE__*/React.createElement("br", null), "Optimieren. ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "Verkaufen.")), /*#__PURE__*/React.createElement("p", {
    className: "sub",
    style: {
      maxWidth: 540
    }
  }, "Wir validieren Projekte mit Echtzeitdaten, richten sie konsequent an K\xE4uferbed\xFCrfnissen aus und steuern Marketing und Vertrieb transparent bis zum Abverkauf."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-p btn-xl",
    onClick: onOpen
  }, "Projekt pr\xFCfen lassen ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g btn-xl",
    href: "#conversion"
  }, "Conversion-Modell")), /*#__PURE__*/React.createElement("div", {
    className: "statline",
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "300", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Mio \u20AC Volumen vermittelt")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "1 Mrd"), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Reichweite \xFCber Kampagnen")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "100", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "erfolgsbasiert")))), /*#__PURE__*/React.createElement("div", {
    className: "hero-photo"
  }, /*#__PURE__*/React.createElement(Photo, {
    src: IMG.penthouse,
    pos: "center",
    overlay: "linear-gradient(180deg,rgba(14,15,17,0) 52%,rgba(14,15,17,.5) 100%)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "pill pill-w hp-tag"
  }, "Live vermarktet"), /*#__PURE__*/React.createElement("div", {
    className: "hp-cap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '-.01em',
      textShadow: '0 2px 14px rgba(0,0,0,.4)'
    }
  }, "Penthouse \xB7 Wien")))));
}
function Logos() {
  const names = ["RHOMBERG", "WINEGG", "SORAVIA"];
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 36,
      flexWrap: 'wrap',
      padding: '30px 40px',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--fg3)',
      fontWeight: 600
    }
  }, "Bautr\xE4ger, die bereits mit uns arbeiten"), names.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      fontWeight: 600,
      fontSize: 22,
      letterSpacing: '.04em',
      color: 'var(--fg2)',
      opacity: .75
    }
  }, n)));
}
const PROBSB = [['01', 'In der Planung', 'Bauträger planen auf Annahmen: Zielgruppe, Preispunkt, Grundrisslogik, Story — nicht validiert. Der Fehler zeigt sich erst, wenn Zeit, Budget und Produkt fixiert sind.'], ['02', 'Im Marketing', 'Falsche Zielgruppen, unklare Positionierung, fehlendes Tracking. Volumen ohne Qualität — teure Leads ohne echte Kaufabsicht.'], ['03', 'Im Vertrieb', 'Status, Geschwindigkeit und Abschlusswahrscheinlichkeit sind nicht transparent. Entscheidungen zu Preis, Produkt und Vertrieb kommen zu spät.']];
function ProblemB() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ink"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker on-dark"
  }, "Marktrealit\xE4t 2026"), /*#__PURE__*/React.createElement(RevealText, null, "Immobilienprojekte scheitern nicht an der Bauqualit\xE4t.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "Sondern an Unsicherheit.")), /*#__PURE__*/React.createElement("p", null, "Kapital ist teuer geworden, K\xE4ufer kritischer, Vermarktungszeiten l\xE4nger. Was heute funktioniert, sind Systeme, die aus jedem Klick, jeder Besichtigung und jedem Abschluss lernen.")), /*#__PURE__*/React.createElement("div", {
    className: "probs"
  }, PROBSB.map(([n, t, d], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: n,
    style: {
      transitionDelay: i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "prob"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pn"
  }, n), /*#__PURE__*/React.createElement("h4", null, t), /*#__PURE__*/React.createElement("p", null, d)))))));
}
const SYS = [{
  tag: 'NOVA · Live-Testing',
  icon: /*#__PURE__*/React.createElement(Icon.spark, {
    size: 22
  }),
  h: 'Performance Marketing',
  d: 'Echtes Performance-Marketing mit dynamischer Budget-Steuerung. Hypothesen werden live am Markt getestet — Budgets wandern wöchentlich dorthin, wo sie messbar performen.'
}, {
  tag: 'LENS · Echtzeit-KPIs',
  icon: /*#__PURE__*/React.createElement(Icon.chart, {
    size: 22
  }),
  h: 'Eigene Software-Infrastruktur',
  d: 'Steuerungslogik in Echtzeit — kein Tool-Flickwerk, sondern eine integrierte Plattform. Vertriebsergebnisse fließen direkt zurück ins Marketing und schärfen Zielgruppen und Kreation.'
}, {
  tag: 'CIRCLE · 25+ Top-Performer',
  icon: /*#__PURE__*/React.createElement(Icon.users, {
    size: 22
  }),
  h: 'Top-Performer Pool',
  d: 'Kuratierte Community selbstständiger Top-Vertriebsleute (min. €150K Track-Record). Schließt auf Basis der gelernten Käuferprofile aus dem laufenden System ab.'
}];
function SystemB() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Das System"), /*#__PURE__*/React.createElement("h2", null, "Drei Dinge, die sonst getrennt laufen. Jetzt in einem System."), /*#__PURE__*/React.createElement("p", null, "Marketing, Software und Vertrieb in einer Schleife \u2014 nicht in drei Silos.")), /*#__PURE__*/React.createElement("div", {
    className: "routes"
  }, SYS.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.h,
    style: {
      transitionDelay: i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "route",
    style: {
      minHeight: 280
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ricon"
  }, s.icon), /*#__PURE__*/React.createElement("div", {
    className: "pill pill-o",
    style: {
      alignSelf: 'flex-start',
      marginTop: 18
    }
  }, s.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 12
    }
  }, s.h), /*#__PURE__*/React.createElement("p", null, s.d)))))));
}
const STAGES = [{
  d: 'Tag 30',
  t: 'Initial Testing',
  p: 'Erste Hypothesen zu Zielgruppe, Preis, Story laufen live. Performance-Daten werden gesammelt, erste Muster werden sichtbar.',
  val: 42
}, {
  d: 'Tag 90',
  t: 'Muster erkannt',
  p: 'Budgets wandern in performante Segmente. Top-Personas sind validiert. CIRCLE schließt mit qualifizierten Profilen ab. Anfragequalität steigt messbar.',
  val: 71
}, {
  d: 'Tag 180',
  t: 'System im Flow',
  p: 'Self-optimizing Loop: jede Besichtigung schärft Marketing, jeder Abschluss schärft Vertrieb. Conversion und Pipeline-Speed auf Bestwert.',
  val: 96
}];
function LearningSystem() {
  const trackRef = useRef();
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const H = r.height;
      // p=0 when the first card is centered in the viewport, p=1 when the last card is centered → each card animates as it passes the middle
      const startTop = vh * 0.62 - H / 6;
      const span = vh * 0.17 + H * (2 / 3);
      const prog = (startTop - r.top) / span;
      setP(Math.max(0, Math.min(1, prog)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  const active = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length * 0.999));
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '.85fr 1.15fr',
      gap: 64,
      alignItems: 'start'
    },
    className: "comm-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 108
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Das lernende System"), /*#__PURE__*/React.createElement(RevealText, {
    style: {
      fontWeight: 600,
      letterSpacing: '-.03em',
      fontSize: 'clamp(28px,3.4vw,44px)',
      marginTop: 14,
      lineHeight: 1.08
    }
  }, "Mit jeder Iteration", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent-deep"
  }, "ein St\xFCck besser.")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg2)',
      fontSize: 16,
      lineHeight: 1.6,
      marginTop: 16,
      maxWidth: 420
    }
  }, "Ein UNIO-Projekt startet nicht mit einer Kampagne, die am Tag 1 fertig ist und dann hofft. Es startet mit einem System, das mit jedem Datenpunkt besser wird."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, (() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const sv = STAGES.map(s => s.val);
    const fp = p * (sv.length - 1);
    const i0 = Math.min(sv.length - 1, Math.floor(fp));
    const i1 = Math.min(sv.length - 1, i0 + 1);
    const val = Math.round(lerp(sv[i0], sv[i1], fp - i0));
    const R = 21,
      C = 2 * Math.PI * R;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
      width: "54",
      height: "54",
      viewBox: "0 0 54 54",
      style: {
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "27",
      cy: "27",
      r: R,
      fill: "none",
      stroke: "var(--track)",
      strokeWidth: "5.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "27",
      cy: "27",
      r: R,
      fill: "none",
      stroke: "var(--orange)",
      strokeWidth: "5.5",
      strokeLinecap: "round",
      strokeDasharray: C.toFixed(1),
      strokeDashoffset: (C * (1 - Math.max(0.02, p))).toFixed(1),
      transform: "rotate(-90 27 27)",
      style: {
        transition: 'stroke-dashoffset .15s linear'
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 26,
        letterSpacing: '-.02em',
        color: 'var(--orange)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, val), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--fg3)'
      }
    }, "Conversion-Index \xB7 ", STAGES[active].d)));
  })())), /*#__PURE__*/React.createElement("div", {
    className: "learn-track",
    ref: trackRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "learn-fill",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      height: p * 100 + '%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, STAGES.map((s, i) => {
    const sp = Math.max(0, Math.min(1, (p - i / STAGES.length) / (1 / STAGES.length)));
    return /*#__PURE__*/React.createElement("div", {
      key: s.d,
      className: "lstage" + (sp > 0.05 ? ' on' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "ldot"
    }), /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        padding: 28,
        opacity: (0.45 + 0.55 * sp).toFixed(2),
        transition: 'opacity .15s linear'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pill pill-o"
    }, s.d), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 18,
        color: 'var(--orange)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, Math.round(sp * s.val))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 20,
        marginTop: 16,
        letterSpacing: '-.01em'
      }
    }, s.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        color: 'var(--fg2)',
        lineHeight: 1.6,
        marginTop: 10
      }
    }, s.p), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(SegBar, {
      progress: sp * s.val / 100,
      segN: 26,
      height: 12
    }))));
  }))))));
}
const MODEL = [{
  h: '100 % erfolgsbasiert',
  d: 'Die Wertschöpfung beginnt mit dem ersten verkauften Objekt. Vorher fließt kein Honorar.',
  icon: /*#__PURE__*/React.createElement(Icon.target, {
    size: 22
  })
}, {
  h: 'Kein Setup, keine Fixkosten',
  d: 'Kein Onboarding-Honorar, keine Implementierungsgebühr. Wir investieren in die Validierung — nicht der Bauträger.',
  icon: /*#__PURE__*/React.createElement(Icon.shield, {
    size: 22
  })
}, {
  h: 'Kein Retainer',
  d: 'Keine monatlichen Mindestbeträge. Kein Vertrag mit Vendor-Logik. Reines Performance-Modell.',
  icon: /*#__PURE__*/React.createElement(Icon.bolt, {
    size: 22
  })
}];
function CommercialModel({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "modell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '.9fr 1.1fr',
      gap: 64,
      alignItems: 'center'
    },
    className: "comm-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Das Commercial Model"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 600,
      letterSpacing: '-.03em',
      fontSize: 'clamp(30px,3.6vw,46px)',
      marginTop: 14,
      lineHeight: 1.05
    }
  }, "Skin in the game."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg2)',
      fontSize: 17,
      lineHeight: 1.6,
      marginTop: 16,
      maxWidth: 460
    }
  }, "Dasselbe Risiko wie der Bautr\xE4ger. Dasselbe Interesse. Werbekosten zu Google und Meta laufen als reine Durchl\xE4ufer ohne Aufschlag \u2014 bei besonders performanten Projekten erstatten wir auch diese zur\xFCck."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-p btn-lg",
    style: {
      marginTop: 28
    },
    onClick: onOpen
  }, "Projekt pr\xFCfen lassen ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, MODEL.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.h,
    style: {
      display: 'grid',
      gridTemplateColumns: '52px 1fr',
      gap: 18,
      alignItems: 'start',
      padding: '24px 0',
      borderTop: i ? '1px solid var(--bd)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ricon",
    style: {
      width: 52,
      height: 52
    }
  }, m.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '-.01em'
    }
  }, m.h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--fg2)',
      lineHeight: 1.55,
      marginTop: 8
    }
  }, m.d))))))));
}

/* ---------- CONVERSION SIMULATOR ---------- */
const fmtE = n => '€' + Math.round(n).toLocaleString('de-DE');
const fmtShort = n => n >= 1e6 ? '€' + (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace('.', ',') + ' Mio' : '€' + Math.round(n / 1000) + 'k';
function ConversionSim() {
  const [simRef, seen] = useInView(0.3);
  const [budget, setBudget] = useState(2000);
  const [units, setUnits] = useState(12);
  const cap = Math.max(1, units * 0.5);
  // Klassisch: mehr Budget = mehr Streuverlust (man weiß nicht, wie man es richtig ausspielt) → Qualität kippt ab einem Punkt.
  // UNIO: Branding + Ad-Konzept senken die Lead-Kosten, Intent-Targeting skaliert sauber mit dem Budget.
  const kAnfr = budget / 15,
    uAnfr = budget / 5;
  const kQual = Math.max(1, budget * 0.006 - budget * budget * 0.0000011); // steigt, kippt ab ~€2.700 wieder ab
  const uQual = budget * 0.0075; // skaliert sauber mit dem Budget
  const kClose = Math.min(cap, kQual * 0.10),
    uClose = Math.min(cap, uQual * 0.16);
  const moreQual = Math.max(0, uQual - kQual);
  // Abverkaufsdauer in Monaten (realistisch gedeckelt)
  const clampM = m => Math.max(3, Math.min(36, Math.round(m)));
  const kMonths = clampM(units / Math.max(0.2, kClose));
  const uMonths = clampM(units / Math.max(0.2, uClose));
  const monthsSaved = Math.max(0, kMonths - uMonths);
  const ROWS = [{
    k: 'Anfragen / Mt.',
    kd: Math.round(kAnfr),
    ud: Math.round(uAnfr),
    kv: kAnfr,
    uv: uAnfr
  }, {
    k: 'Qualifiziert / Mt.',
    kd: Math.round(kQual),
    ud: Math.round(uQual),
    kv: kQual,
    uv: uQual
  }, {
    k: 'Abschlüsse / Mt.',
    kd: kClose.toFixed(1).replace('.', ','),
    ud: uClose.toFixed(1).replace('.', ','),
    kv: kClose,
    uv: uClose,
    big: true
  }];
  const Col = ({
    win
  }) => /*#__PURE__*/React.createElement("div", {
    className: "ccol",
    style: {
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cch",
    style: {
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: win ? 'var(--orange-deep)' : 'var(--fg3)',
      fontSize: 13.5,
      fontWeight: 700
    }
  }, win ? 'UNIO System' : 'Klassische Vermarktung'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg4)',
      fontWeight: 600
    }
  }, win ? '~€5 / Lead' : '~€15 / Lead')), ROWS.map((r, i) => {
    const max = Math.max(r.kv, r.uv, 0.001);
    const val = win ? r.uv : r.kv;
    const d = win ? r.ud : r.kd;
    return /*#__PURE__*/React.createElement("div", {
      key: r.k
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 12,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--fg3)'
      }
    }, r.k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        color: win && r.big ? 'var(--orange)' : 'var(--fg1)'
      }
    }, d)), /*#__PURE__*/React.createElement(SegBar, {
      progress: seen ? Math.max(0.02, val / max) : 0,
      segN: r.big ? 30 : 24,
      height: r.big ? 26 : 12,
      muted: !win
    }));
  }));
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "conversion"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Conversion-Modell"), /*#__PURE__*/React.createElement(RevealText, null, "Gleiches Budget.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent-deep"
  }, "Schnellerer Abverkauf.")), /*#__PURE__*/React.createElement("p", null, "Mehr qualifizierte Anfragen bedeuten schnelleren Abverkauf: Branding + Ad-Konzept senken die Lead-Kosten, Intent-Targeting hebt die Lead-Qualit\xE4t, transparente Vertriebssteuerung die Abschlussquote \u2014 so sind alle Einheiten messbar fr\xFCher verkauft.")), /*#__PURE__*/React.createElement("div", {
    className: "calc",
    ref: simRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "calc-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crange"
  }, /*#__PURE__*/React.createElement("label", null, "Werbebudget / Monat ", /*#__PURE__*/React.createElement("b", null, fmtE(budget))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "500",
    max: "5000",
    step: "100",
    value: budget,
    onChange: e => setBudget(+e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11.5,
      color: 'var(--fg4)',
      marginTop: 8,
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u20AC500"), /*#__PURE__*/React.createElement("span", null, "\u20AC5.000"))), /*#__PURE__*/React.createElement("div", {
    className: "crange"
  }, /*#__PURE__*/React.createElement("label", null, "Einheiten im Projekt ", /*#__PURE__*/React.createElement("b", null, units)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "4",
    max: "120",
    step: "1",
    value: units,
    onChange: e => setUnits(+e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11.5,
      color: 'var(--fg4)',
      marginTop: 8,
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("span", null, "4"), /*#__PURE__*/React.createElement("span", null, "120"))), /*#__PURE__*/React.createElement("div", {
    className: "funnel-feedback",
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ficon"
  }, /*#__PURE__*/React.createElement(Icon.trending, {
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "ftxt"
  }, "Bei ", /*#__PURE__*/React.createElement("b", null, fmtE(budget)), "/Monat: das UNIO-System macht aus demselben Budget ", /*#__PURE__*/React.createElement("b", null, Math.round(uQual)), " qualifizierte Anfragen \u2014 klassisch sind es ", /*#__PURE__*/React.createElement("b", null, Math.round(kQual)), budget > 2800 ? ', und mehr Budget verpufft hier sogar, weil es ohne System falsch ausgespielt wird.' : '.'))), /*#__PURE__*/React.createElement("div", {
    className: "calc-out"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Col, {
    win: false
  }), /*#__PURE__*/React.createElement(Col, {
    win: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "calc-delta",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cdlabel"
  }, "Mehr qualifizierte Anfragen / Mt."), /*#__PURE__*/React.createElement("div", {
    className: "cdval",
    style: {
      color: 'var(--orange)'
    }
  }, "+", Math.round(moreQual)), /*#__PURE__*/React.createElement("div", {
    className: "cdsub"
  }, "aus demselben Budget \u2014 g\xFCnstigere Leads, h\xF6here Qualit\xE4t.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cdlabel"
  }, "Schnellerer Abverkauf"), /*#__PURE__*/React.createElement("div", {
    className: "cdval",
    style: {
      color: 'var(--orange)'
    }
  }, "\u2212", monthsSaved, " Mt."), /*#__PURE__*/React.createElement("div", {
    className: "cdsub"
  }, "alle ", units, " Einheiten in ", /*#__PURE__*/React.createElement("b", null, uMonths), " statt ", /*#__PURE__*/React.createElement("b", null, kMonths), " Monaten verkauft."))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--fg4)',
      marginTop: 16,
      maxWidth: 780,
      lineHeight: 1.5
    }
  }, "Conversion-Modell zur Veranschaulichung auf Basis realer Kampagnen-Benchmarks (CTR, Lead-Qualit\xE4t, Abschlussquoten). Reale Ergebnisse variieren je nach Lage, Produkt und Preis.")));
}

/* ---------- CASE STUDIES ---------- */
const CASES_B = [{
  img: 'ecoluxe',
  pos: 'center',
  tag: 'Villa · Performance',
  title: 'Villa Ecoluxe',
  loc: 'Wien · Einzelobjekt',
  site: 'ecoluxe.unio.at',
  dur: 'Verkauft über Zielpreis',
  metrics: [{
    v: /*#__PURE__*/React.createElement(Num, {
      end: 282
    }),
    k: 'Anfragen'
  }, {
    v: /*#__PURE__*/React.createElement(React.Fragment, null, "+31", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '.6em'
      }
    }, "%")),
    k: 'über Zielpreis'
  }],
  measures: ['Eigene Projekt-Homepage gebaut', 'Performance-Kampagnen geschaltet', 'Integrativ getestet', 'Transparente Vertriebssteuerung'],
  note: 'Angebot über €6,8 Mio statt ausgerufener €5,2 Mio.'
}, {
  img: 'albrecht',
  pos: 'center',
  tag: '8 Einheiten',
  title: 'Das Albrecht',
  loc: 'Townhäuser & Altbau',
  site: 'albrecht.unio.at',
  dur: '61 Anfragen in 2 Wochen',
  metrics: [{
    v: /*#__PURE__*/React.createElement(Num, {
      end: 61
    }),
    k: 'Anfragen'
  }, {
    v: '8',
    k: 'Einheiten'
  }],
  measures: ['Eigene Projekt-Homepage gebaut', 'Performance-Kampagnen geschaltet', 'Integrativ getestet', 'Transparente Vertriebssteuerung']
}, {
  img: 'beheim',
  pos: 'center',
  tag: '2 Penthäuser',
  title: 'Penthouse Beheim',
  loc: 'Wien · €1,7 Mio',
  site: 'beheim.unio.at',
  dur: '27 Anfragen in 2 Wochen',
  metrics: [{
    v: /*#__PURE__*/React.createElement(Num, {
      end: 27
    }),
    k: 'Anfragen'
  }, {
    v: '2',
    k: 'Penthäuser'
  }],
  measures: ['Eigene Projekt-Homepage gebaut', 'Performance-Kampagnen geschaltet', 'Integrativ getestet', 'Transparente Vertriebssteuerung']
}, {
  img: 'obenzwei',
  pos: 'center',
  tag: 'Penthouse · 2. Bezirk',
  title: 'Obenzwei',
  loc: 'Wien · 2. Bezirk',
  site: 'obenzwei.unio.at',
  dur: '25 Anfragen in 1 Woche',
  metrics: [{
    v: /*#__PURE__*/React.createElement(Num, {
      end: 25
    }),
    k: 'hochqual. Anfragen / Woche'
  }, {
    v: '€1,3 Mio',
    k: 'Angebotspreis'
  }],
  measures: ['Eigene Projekt-Homepage gebaut', 'Performance-Kampagnen geschaltet', 'Integrativ getestet', 'Transparente Vertriebssteuerung']
}, {
  img: 'penthouse',
  pos: 'center',
  tag: 'Turnaround',
  title: 'Penthouse €4 Mio',
  loc: 'Wien · eigenes Projekt',
  site: '',
  dur: '40 Anfragen nach Übernahme',
  metrics: [{
    v: /*#__PURE__*/React.createElement(Num, {
      end: 40
    }),
    k: 'Anfragen'
  }, {
    v: '€4 Mio',
    k: 'Preisklasse'
  }],
  measures: ['Performance-Kampagnen inkl. Click-Funnel', 'Integrativ getestet', 'Transparente Vertriebssteuerung']
}];
function CaseStudiesB() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground",
    id: "cases"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Proof \xB7 Live im Markt"), /*#__PURE__*/React.createElement(RevealText, null, "Bewiesen im Markt.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent-deep"
  }, "Nicht am Papier.")), /*#__PURE__*/React.createElement("p", null, "Echte Projekte, echte Zahlen. Jede Vermarktung mit eigener Story, eigener Homepage und datenbasierter Vertriebssteuerung.")), /*#__PURE__*/React.createElement("div", {
    className: "cases"
  }, CASES_B.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: c.title,
    style: {
      transitionDelay: i % 3 * 70 + 'ms'
    }
  }, /*#__PURE__*/React.createElement(CaseCard, {
    img: IMG[c.img],
    pos: c.pos,
    tag: c.tag,
    title: c.title,
    loc: c.loc,
    site: c.site,
    dur: c.dur,
    metrics: c.metrics,
    measures: c.measures
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      flexWrap: 'wrap',
      color: 'var(--fg3)',
      fontSize: 13.5
    }
  }, /*#__PURE__*/React.createElement(Icon.spark, {
    size: 16
  }), " Bei Villa Ecoluxe: Angebot \xFCber \u20AC6,8 Mio statt ausgerufener \u20AC5,2 Mio.")));
}

/* ---------- FUNNEL ---------- */
const B_UNITS = [{
  v: '1-10',
  l: '1 – 10 Einheiten'
}, {
  v: '11-30',
  l: '11 – 30 Einheiten'
}, {
  v: '31-80',
  l: '31 – 80 Einheiten'
}, {
  v: '80+',
  l: '80+ Einheiten'
}];
function FunnelB({
  onClose
}) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    typ: null,
    ort: '',
    units: null,
    phase: null,
    ziele: [],
    name: '',
    firma: '',
    email: '',
    tel: ''
  });
  const total = 5;
  const set = (k, v) => setD(s => ({
    ...s,
    [k]: v
  }));
  const next = () => setStep(s => Math.min(total, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));
  const canNext = [!!d.typ, d.ort.trim().length > 1 && !!d.units, !!d.phase, d.ziele.length > 0, d.name.trim() && /.+@.+\..+/.test(d.email)][step];
  if (step === total) {
    return /*#__PURE__*/React.createElement(FunnelShell, {
      title: "Projekt-Check",
      step: total,
      total: total,
      progress: 100,
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "funnel-done"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ring-wrap"
    }, /*#__PURE__*/React.createElement(Ring, {
      size: 84,
      w: 9,
      color: "var(--orange)",
      track: "var(--track)"
    })), /*#__PURE__*/React.createElement("h3", null, "Danke, ", d.name.split(' ')[0] || 'wir melden uns', "!"), /*#__PURE__*/React.createElement("p", null, "Unser Akquise-Team pr\xFCft dein Projekt und meldet sich innerhalb von 48 Stunden mit einer ersten datenbasierten Einsch\xE4tzung. 100 % unverbindlich, 100 % erfolgsbasiert."), /*#__PURE__*/React.createElement("div", {
      className: "summary"
    }, /*#__PURE__*/React.createElement("div", {
      className: "srow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sk"
    }, "Projektart"), /*#__PURE__*/React.createElement("span", {
      className: "sv"
    }, d.typ)), /*#__PURE__*/React.createElement("div", {
      className: "srow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sk"
    }, "Standort"), /*#__PURE__*/React.createElement("span", {
      className: "sv"
    }, d.ort)), /*#__PURE__*/React.createElement("div", {
      className: "srow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sk"
    }, "Einheiten"), /*#__PURE__*/React.createElement("span", {
      className: "sv"
    }, d.units)), /*#__PURE__*/React.createElement("div", {
      className: "srow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sk"
    }, "Phase"), /*#__PURE__*/React.createElement("span", {
      className: "sv"
    }, d.phase)), /*#__PURE__*/React.createElement("div", {
      className: "srow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sk"
    }, "Ziel"), /*#__PURE__*/React.createElement("span", {
      className: "sv"
    }, d.ziele.join(', ')))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-p btn-lg",
      onClick: onClose
    }, "Schlie\xDFen"), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-g btn-lg",
      href: APP_URL,
      target: "_blank",
      rel: "noopener"
    }, "Dashboard ansehen ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
      size: 15
    })))));
  }
  return /*#__PURE__*/React.createElement(FunnelShell, {
    title: "Projekt-Check",
    step: step + 1,
    total: total,
    progress: step / total * 100,
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement("div", {
      className: "funnel-foot"
    }, step > 0 && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-g back",
      onClick: back
    }, "Zur\xFCck"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-p btn-lg",
      style: {
        marginLeft: step > 0 ? 0 : 'auto'
      },
      disabled: !canNext,
      onClick: next
    }, step === total - 1 ? 'Anfrage senden' : 'Weiter', " ", /*#__PURE__*/React.createElement(Icon.arrow, {
      size: 16
    })))
  }, /*#__PURE__*/React.createElement("div", {
    className: "funnel-body"
  }, step === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Um welche Art Projekt geht es?"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "So ordnen wir die richtige Persona-Datenbank und Vergleichsprojekte zu."), /*#__PURE__*/React.createElement(OptionList, {
    value: d.typ,
    onChange: v => set('typ', v),
    options: [{
      v: 'Wohnbau',
      l: 'Wohnbau',
      d: 'Eigentums- oder Vorsorgewohnungen'
    }, {
      v: 'Gewerbe',
      l: 'Gewerbe / Anlage',
      d: 'Büro, Retail, Anlageobjekte'
    }, {
      v: 'Mixed-Use',
      l: 'Mixed-Use',
      d: 'Wohnen + Gewerbe kombiniert'
    }, {
      v: 'Sanierung',
      l: 'Sanierung / Bestand',
      d: 'Revitalisierung, Dachausbau'
    }]
  })), step === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Standort & Gr\xF6\xDFe"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "Wo entsteht das Projekt \u2014 und wie viele Einheiten umfasst es?"), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("label", null, "Standort (Ort / Bezirk)"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "z. B. Wien 1020, Korneuburg\u2026",
    value: d.ort,
    onChange: e => set('ort', e.target.value)
  })), /*#__PURE__*/React.createElement(OptionList, {
    value: d.units,
    onChange: v => set('units', v),
    options: B_UNITS
  }), d.units && /*#__PURE__*/React.createElement("div", {
    className: "funnel-feedback"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ficon"
  }, /*#__PURE__*/React.createElement(Icon.spark, {
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "ftxt"
  }, "Bei ", /*#__PURE__*/React.createElement("b", null, d.units, " Einheiten"), " testen wir dein Projekt vorab live an ", /*#__PURE__*/React.createElement("b", null, "mehreren tausend K\xE4uferprofilen"), " \u2014 und priorisieren die Personas mit der h\xF6chsten Kaufabsicht."))), step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "In welcher Phase befindet sich das Projekt?"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "Je fr\xFCher, desto mehr kann NOVA vor fixierten Entscheidungen validieren."), /*#__PURE__*/React.createElement(OptionList, {
    value: d.phase,
    onChange: v => set('phase', v),
    options: [{
      v: 'Grundstück / Idee',
      l: 'Grundstück / Idee'
    }, {
      v: 'In Planung',
      l: 'In Planung'
    }, {
      v: 'In Bau',
      l: 'In Bau'
    }, {
      v: 'Im Abverkauf',
      l: 'Im Abverkauf'
    }]
  }), d.phase && /*#__PURE__*/React.createElement("div", {
    className: "funnel-feedback good"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ficon"
  }, /*#__PURE__*/React.createElement(Icon.check, {
    size: 18,
    sw: 2.5
  })), /*#__PURE__*/React.createElement("span", {
    className: "ftxt"
  }, d.phase === 'Grundstück / Idee' || d.phase === 'In Planung' ? /*#__PURE__*/React.createElement(React.Fragment, null, "Perfekter Zeitpunkt: ", /*#__PURE__*/React.createElement("b", null, "NOVA validiert Pricing, Grundrisse und Story vor dem Baustart"), " \u2014 bevor Budget und Produkt fixiert sind.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Auch jetzt holen wir messbar mehr heraus: ", /*#__PURE__*/React.createElement("b", null, "LENS macht Status, Tempo und Abschlusswahrscheinlichkeit pro Einheit transparent."))))), step === 3 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Was ist euer Hauptziel?"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "Mehrfachauswahl m\xF6glich \u2014 wir gewichten das System entsprechend."), /*#__PURE__*/React.createElement(OptionList, {
    multi: true,
    value: d.ziele,
    onChange: v => set('ziele', v),
    options: [{
      v: 'Schnellerer Abverkauf',
      l: 'Schnellerer Abverkauf'
    }, {
      v: 'Höherer erzielbarer Preis',
      l: 'Höherer erzielbarer Preis'
    }, {
      v: 'Validierung vor dem Bau',
      l: 'Validierung vor dem Bau'
    }, {
      v: 'Volle Transparenz & Steuerung',
      l: 'Volle Transparenz & Steuerung'
    }]
  })), step === 4 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Wohin d\xFCrfen wir die Einsch\xE4tzung schicken?"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "Unverbindlich. Wir melden uns innerhalb von 48 Stunden."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "Name *"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: d.name,
    onChange: e => set('name', e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "Unternehmen"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: d.firma,
    onChange: e => set('firma', e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "E-Mail *"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "email",
    value: d.email,
    onChange: e => set('email', e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "Telefon"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: d.tel,
    onChange: e => set('tel', e.target.value)
  }))))));
}
function ProofBand() {
  const ref = useRef();
  useEdgeRadius(ref, 44);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo-band",
    ref: ref
  }, /*#__PURE__*/React.createElement(Photo, {
    src: IMG.albrecht_dusk,
    pos: "center",
    overlay: "linear-gradient(90deg,rgba(14,15,17,.62),rgba(14,15,17,.12) 60%,rgba(14,15,17,.4))"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pb-cap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#fff',
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill pill-w",
    style: {
      marginBottom: 14
    }
  }, "Live vermarktet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 'clamp(24px,3vw,38px)',
      letterSpacing: '-.02em',
      lineHeight: 1.08,
      textShadow: '0 2px 20px rgba(0,0,0,.4)'
    }
  }, "Premium-Projekte, datenbasiert zum Abverkauf gef\xFChrt.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 36,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 'clamp(26px,3vw,40px)',
      letterSpacing: '-.03em'
    }
  }, "300", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'rgba(255,255,255,.8)'
    }
  }, "Mio \u20AC Volumen")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 'clamp(26px,3vw,40px)',
      letterSpacing: '-.03em'
    }
  }, "1 Mrd"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'rgba(255,255,255,.8)'
    }
  }, "Reichweite"))))));
}
function CTAB({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ringbg"
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 260,
    w: 9,
    color: "var(--orange)"
  })), /*#__PURE__*/React.createElement(RevealText, null, "Von validierter Story zu", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "steuerbarem Abverkauf.")), /*#__PURE__*/React.createElement("p", null, "UNIO macht aus Vermarktung ein steuerbares System \u2014 mit Daten, Technologie und Vertriebspower. 100 % erfolgsbasiert."), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-p btn-xl",
    onClick: onOpen
  }, "Jetzt Projekt pr\xFCfen lassen ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 18
  }))))));
}
function MetricsBand() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec-sm ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Live aus laufenden Kampagnen"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 'clamp(22px,2.6vw,30px)',
      letterSpacing: '-.02em',
      marginTop: 10
    }
  }, "Performance, die man messen kann")), /*#__PURE__*/React.createElement("span", {
    className: "live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), "LIVE \xB7 anonymisiert")), /*#__PURE__*/React.createElement("div", {
    className: "metrics-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mtile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk"
  }, "\xD8 Cost / Lead"), /*#__PURE__*/React.createElement("div", {
    className: "mv"
  }, "\u20AC", /*#__PURE__*/React.createElement(Num, {
    end: 3.32,
    dec: 2
  })), /*#__PURE__*/React.createElement(Sparkline, {
    data: [7, 6, 5.5, 4.8, 4.2, 3.8, 3.4, 3.3],
    h: 30,
    accent: "var(--orange)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mtile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk"
  }, "\xD8 Klickrate"), /*#__PURE__*/React.createElement("div", {
    className: "mv"
  }, /*#__PURE__*/React.createElement(Num, {
    end: 2.47,
    dec: 2
  }), "%"), /*#__PURE__*/React.createElement(Sparkline, {
    data: [1.4, 1.7, 1.9, 2.0, 2.2, 2.3, 2.47],
    h: 30
  })), /*#__PURE__*/React.createElement("div", {
    className: "mtile",
    style: {
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk",
    style: {
      alignSelf: 'flex-start'
    }
  }, "Lead-Qualit\xE4t"), /*#__PURE__*/React.createElement(Gauge, {
    value: 73,
    size: 96,
    label: "\xD8 Intent"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mtile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk",
    style: {
      marginBottom: 6
    }
  }, "Leads mit hoher Kaufabsicht"), /*#__PURE__*/React.createElement(CompactSeg, {
    value: 41,
    note: "Intent-Score \u2265 75 \xB7 bereit f\xFCr den n\xE4chsten Schritt"
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--fg4)',
      marginTop: 14
    }
  }, "Anonymisierte Kennzahlen aus realen UNIO-Kampagnen. Projektnamen vertraulich.")));
}
function LearningLoopB() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Testen. Lernen. Optimieren. Verkaufen."), /*#__PURE__*/React.createElement("h2", null, "Aus ungeordneten Daten wird eine Richtung."), /*#__PURE__*/React.createElement("p", null, "Am Anfang steht eine Punktwolke ohne Muster. Mit jedem Durchlauf f\xFChrt das System die Daten zusammen, erkennt die Richtung und sch\xE4rft sie weiter \u2014 bis aus Streuung ein verl\xE4sslicher Trend wird, der zu immer besseren Ergebnissen f\xFChrt.")), /*#__PURE__*/React.createElement(DataStory, null)));
}
function LensSectionB() {
  const nav = [{
    items: [['Dashboard', 'chart'], ['Immobilien', 'building'], ['Projekte', 'layers'], ['Kampagnen', 'target'], ['Analyse', 'trending']]
  }, {
    h: 'Vertrieb',
    items: [['Pipeline', 'users'], ['Angebote', 'euro'], ['Kalender', 'clock']]
  }];
  const kpis = [{
    k: 'Anfragen · 30 T',
    v: '182',
    s: '+31,8 % vs. Vormonat',
    icon: 'trending',
    spark: [30, 38, 34, 48, 44, 55, 60, 66, 72, 80]
  }, {
    k: 'Ø Intent Score',
    v: '73',
    s: 'pro qualifiziertem Lead',
    icon: 'gauge',
    col: 'var(--lx-gold)',
    spark: [40, 46, 44, 52, 50, 58, 60, 62, 68, 73]
  }, {
    k: 'Verkaufsstand',
    v: '42 %',
    s: '8 von 19 Einheiten',
    icon: 'check',
    spark: [10, 14, 18, 22, 28, 30, 34, 38, 40, 42]
  }, {
    k: 'Pipeline',
    v: '€84 Mio',
    s: '142 Einheiten gesamt',
    icon: 'euro',
    col: 'var(--lx-grey)',
    spark: [50, 54, 52, 60, 58, 66, 70, 74, 80, 84]
  }, {
    k: 'Ø Cost / Lead',
    v: '€5,40',
    s: '−34 % durch Optimierung',
    icon: 'target',
    col: 'var(--lx-gold)',
    spark: [80, 74, 70, 64, 60, 55, 50, 46, 44, 40]
  }, {
    k: 'Besichtigungen',
    v: '46',
    s: 'geplant & durchgeführt',
    icon: 'home',
    spark: [12, 16, 14, 22, 26, 30, 34, 38, 42, 46]
  }];
  const wide = {
    t: 'Nachfrageverlauf',
    s: 'Anfragen, Besichtigungen & Angebote · 30 Tage',
    legend: [{
      c: 'var(--orange)',
      l: 'Anfragen'
    }, {
      c: 'var(--lx-gold)',
      l: 'Besichtigungen'
    }, {
      c: 'var(--lx-grey)',
      l: 'Angebote'
    }]
  };
  const right = [/*#__PURE__*/React.createElement("div", {
    className: "lx-card",
    key: "d"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-ct"
  }, "Verkaufsstand"), /*#__PURE__*/React.createElement("div", {
    className: "lx-cs"
  }, "Einheiten nach Status"), /*#__PURE__*/React.createElement("div", {
    className: "lx-smixwrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-smix"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-srow"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 3,
      background: 'var(--orange)'
    }
  }), "Verkauft"), /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, "38")), /*#__PURE__*/React.createElement("div", {
    className: "lx-srow"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 3,
      background: '#FFC24D'
    }
  }), "Reserviert"), /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, "21")), /*#__PURE__*/React.createElement("div", {
    className: "lx-srow"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 3,
      background: 'var(--lx-gold)'
    }
  }), "Verf\xFCgbar"), /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, "83"))), /*#__PURE__*/React.createElement(SegDonut, {
    segs: [{
      c: 'var(--orange)',
      v: 38
    }, {
      c: '#FFC24D',
      v: 21
    }, {
      c: 'var(--lx-gold)',
      v: 83
    }],
    center: "142",
    label: "EINHEITEN"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "lx-card",
    key: "f"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-ct"
  }, "Marketing-Funnel"), /*#__PURE__*/React.createElement("div", {
    className: "lx-cs"
  }, "Lead \u2192 Angebot"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(MarketingFunnel, {
    rows: [{
      l: 'Leads',
      v: 945,
      p: '100 %'
    }, {
      l: 'Besichtigungswunsch',
      v: 73,
      p: '7,7 %'
    }, {
      l: 'Besichtigung',
      v: 46,
      p: '4,9 %'
    }, {
      l: 'Angebote',
      v: 25,
      p: '2,6 %'
    }],
    total: "2,65 %"
  })))];
  const board = /*#__PURE__*/React.createElement(LensBoard, {
    title: "Projekt-Cockpit",
    sub: "Live-Status Ihres Projekts \u2014 Nachfrage, Einheiten, Pipeline.",
    nav: nav,
    active: "Dashboard",
    banner: {
      chips: [{
        t: 'ink',
        l: 'Projektsicht'
      }, {
        t: 'org',
        l: 'Das Albrecht'
      }, {
        t: 'gold',
        l: 'Zeitraum: 30 Tage'
      }],
      h: 'Vermarktungs-Performance',
      p: 'Aufgaben, Kampagnen-Daten und Vertrieb in einer Sicht — von der ersten Anfrage bis zum verkauften Objekt.'
    },
    kpis: kpis,
    wide: wide,
    right: right,
    extra: [{
      cls: 'lx-channel',
      node: /*#__PURE__*/React.createElement(ChannelBars, null)
    }, {
      cls: 'lx-units',
      node: /*#__PURE__*/React.createElement(UnitTable, null)
    }, {
      cls: 'lx-viewing',
      node: /*#__PURE__*/React.createElement(ViewingTable, null)
    }]
  });
  const steps = [{
    k: 'Überblick',
    t: 'Ihr Projekt in einem Cockpit',
    p: 'Jede Anfrage, jede Besichtigung, jeder Abschluss — live und an einem Ort. Volle Transparenz statt Blackbox.',
    sel: null
  }, {
    k: 'Kennzahlen',
    t: 'KPIs in Echtzeit',
    p: 'Anfragen, Intent-Score, Verkaufsstand und Cost-per-Lead — aktualisiert mit jeder Interaktion.',
    sel: '.lx-kpis',
    pad: 14
  }, {
    k: 'Kanäle',
    t: 'Welcher Kanal liefert?',
    p: 'Volumen und Cost-per-Lead je Kanal — Budget wandert dorthin, wo es messbar performt.',
    sel: '.lx-channel'
  }, {
    k: 'Einheiten',
    t: 'Nachfrage pro Einheit',
    p: 'Status (Heiß/Reserviert/Cold), Nachfrage, Leads und A/B/C-Qualität — für jede einzelne Einheit.',
    sel: '.lx-units'
  }, {
    k: 'Live-Besichtigungen',
    t: 'Wer kauft als Nächstes?',
    p: 'Laufende Besichtigungen mit Intent-Score und Abschlusswahrscheinlichkeit — in Echtzeit.',
    sel: '.lx-viewing'
  }, {
    k: 'Verkaufsstand',
    t: 'Vom Lead zum Abschluss',
    p: 'Verkaufsstand pro Einheit und der vollständige Marketing-Funnel — jederzeit nachvollziehbar.',
    sel: '.lx-rcol'
  }];
  return /*#__PURE__*/React.createElement(LensScrollSection, {
    id: "lens",
    kicker: "LENS \xB7 Dashboard & Data Intelligence",
    h: "Ihr Projekt, live im Blick.",
    sub: "Schon vor dem Start bekommen Sie einen Vorgeschmack: Scrollen Sie durch Ihr LENS-Dashboard \u2014 die Kamera f\xFChrt Sie durch die wichtigsten Bereiche.",
    board: board,
    steps: steps,
    cta: "Echtes Dashboard \xF6ffnen"
  });
}
function App() {
  const [open, setOpen] = useState(false);
  const openF = () => setOpen(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    active: "bautraeger",
    cta: {
      label: "Projekt prüfen lassen",
      onClick: openF
    }
  }), /*#__PURE__*/React.createElement(HeroB, {
    onOpen: openF
  }), /*#__PURE__*/React.createElement("div", {
    className: "ticker",
    style: {
      borderTop: '1px solid var(--bdf)',
      borderBottom: '1px solid var(--bdf)'
    }
  }, /*#__PURE__*/React.createElement(Logos, null)), /*#__PURE__*/React.createElement(ProblemB, null), /*#__PURE__*/React.createElement(SystemB, null), /*#__PURE__*/React.createElement(MetricsBand, null), /*#__PURE__*/React.createElement(ConversionSim, null), /*#__PURE__*/React.createElement(LensSectionB, null), /*#__PURE__*/React.createElement(LearningSystem, null), /*#__PURE__*/React.createElement(LearningLoopB, null), /*#__PURE__*/React.createElement(ProofBand, null), /*#__PURE__*/React.createElement(CaseStudiesB, null), /*#__PURE__*/React.createElement(CommercialModel, {
    onOpen: openF
  }), /*#__PURE__*/React.createElement(CTAB, {
    onOpen: openF
  }), /*#__PURE__*/React.createElement(Footer, null), open && /*#__PURE__*/React.createElement(FunnelB, {
    onClose: () => setOpen(false)
  }));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Unio Homepage/_src/page-bautraeger.jsx", error: String((e && e.message) || e) }); }

// uploads/Unio Homepage/_src/page-home.jsx
try { (() => {
/* ===================== HOME ===================== */

function HeroPanel() {
  const pipe = [['Testing', 92], ['Leads', 74], ['Qualifiziert', 58], ['Besichtigung', 41], ['Closing', 27]];
  const [vol, volRef] = useCountUp(84.2, 1000);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    },
    ref: volRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel glass-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: '#FF5F57'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: '#FEBC2E'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: '#28C840'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "ttl"
  }, "LENS \xB7 Live Pipeline"), /*#__PURE__*/React.createElement("span", {
    className: "live",
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), "LIVE")), /*#__PURE__*/React.createElement("div", {
    className: "panel-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Volumen Pipeline"), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "\u20AC", vol.toFixed(1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--fg3)'
    }
  }, " Mio")), /*#__PURE__*/React.createElement("div", {
    className: "kspark"
  }, /*#__PURE__*/React.createElement(Sparkline, {
    data: [40, 44, 42, 52, 49, 58, 63, 71, 84],
    h: 30
  }))), /*#__PURE__*/React.createElement("div", {
    className: "kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "\xD8 Intent Score"), /*#__PURE__*/React.createElement(Gauge, {
    value: 73,
    size: 92,
    label: "von 100"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "chart-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, "Nachfrage \xB7 30 Tage"), /*#__PURE__*/React.createElement("span", {
    className: "up",
    style: {
      fontWeight: 700,
      fontSize: 14
    }
  }, "+31,8 %")), /*#__PURE__*/React.createElement(ForecastBars, {
    data: [34, 40, 38, 48, 44, 55, 50, 62, 58, 70, 66, 80, 76, 86],
    accentIdx: 13,
    delta: 12,
    h: 62
  })), /*#__PURE__*/React.createElement("div", {
    className: "pipe"
  }, pipe.map(([n, pp], idx) => /*#__PURE__*/React.createElement("div", {
    className: "pipe-row",
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, n), /*#__PURE__*/React.createElement(SegBar, {
    value: pp,
    segN: 20,
    height: 8
  }), /*#__PURE__*/React.createElement("span", {
    className: "pct"
  }, pp, "%")))))), /*#__PURE__*/React.createElement("div", {
    className: "glass-tint float-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      fontWeight: 600,
      letterSpacing: '.04em'
    }
  }, "NEUE ANFRAGE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "av",
    style: {
      width: 30,
      height: 30,
      fontSize: 11,
      background: 'var(--orange)',
      color: 'var(--oo)'
    }
  }, "OB"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13
    }
  }, "Obenzwei \xB7 2. Bez."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--pos)',
      fontWeight: 600
    }
  }, "Intent 91 \xB7 Hot Lead")))));
}
function Hero() {
  const ref = useRef();
  useHeroFx(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    ref: ref
  }, /*#__PURE__*/React.createElement(HeroBg, null), /*#__PURE__*/React.createElement("div", {
    className: "hero-orb ring-spin",
    style: {
      right: '-90px',
      top: '6%'
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 360,
    w: 2.5,
    color: "rgba(255,170,9,.45)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide hero-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Data-Powered Real Estate"), /*#__PURE__*/React.createElement(RevealText, {
    tag: "h1"
  }, "Real Estate.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "Finally Simple.")), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Daten, Software und Menschen \u2014 vereint. Wir steuern Marketing und Vertrieb transparent bis zum Abverkauf."), /*#__PURE__*/React.createElement(HeroSearch, null), /*#__PURE__*/React.createElement("div", {
    className: "hero-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "300", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Mio \u20AC Volumen")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "1 Mrd"), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Reichweite")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "25", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Top-Makler")))), /*#__PURE__*/React.createElement(HeroPanel, null)), /*#__PURE__*/React.createElement("div", {
    className: "hero-cue"
  }, "Mehr entdecken", /*#__PURE__*/React.createElement("span", {
    className: "scrollline"
  })));
}
const ROUTES = [{
  icon: /*#__PURE__*/React.createElement(Icon.building, {
    size: 22
  }),
  h: "Ich bin Bauträger",
  p: "Projekt vor dem Baustart validieren, Marketing & Vertrieb datenbasiert steuern — 100 % erfolgsbasiert.",
  go: "Projekt prüfen lassen",
  href: "bautraeger.html"
}, {
  icon: /*#__PURE__*/React.createElement(Icon.users, {
    size: 22
  }),
  h: "Ich bin Makler",
  p: "Behalte deine Provision, bau deine eigene Marke und werde Mitgesellschafter im CIRCLE-Netzwerk.",
  go: "CIRCLE entdecken",
  href: "makler.html"
}, {
  icon: /*#__PURE__*/React.createElement(Icon.home, {
    size: 22
  }),
  h: "Ich suche eine Immobilie",
  p: "Kuratierte Wiener Projekte & Einzelobjekte — oder lass deine Immobilie kostenlos bewerten.",
  go: "Immobilien ansehen",
  href: "immobilien.html"
}];
function Routes() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Wo willst du hin?"), /*#__PURE__*/React.createElement("h2", null, "Ein System. Drei Wege hinein."), /*#__PURE__*/React.createElement("p", null, "UNIO bringt Bautr\xE4ger, Makler und Suchende auf einer Plattform zusammen \u2014 und holt jeden genau dort ab, wo er gerade steht.")), /*#__PURE__*/React.createElement("div", {
    className: "routes"
  }, ROUTES.map((r, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: r.h,
    style: {
      transitionDelay: i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: r.href,
    className: "route"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ricon"
  }, r.icon), /*#__PURE__*/React.createElement("h3", null, r.h), /*#__PURE__*/React.createElement("p", null, r.p), /*#__PURE__*/React.createElement("span", {
    className: "go"
  }, r.go, " ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 16
  }))))))));
}
const PRODUCTS = [{
  n: 'NOVA',
  d: 'Marktvalidierung in Echtzeit',
  h: 'Test before you build.',
  desc: 'NOVA testet Projekt, Pricing, Grundrisse und Zielgruppen live an tausenden Käuferprofilen. Predictive Models zeigen schon vor dem Baustart, was funktioniert — jede Entscheidung datenbasiert, nicht gehofft.',
  feat: ['Creative Testing', 'Persona-Cluster', 'Pricing-Sim', 'Predictive Demand'],
  viz: [['+18%', 'Preisresilienz'], ['7,4k', 'Käuferprofile'], ['92', 'Match-Score']],
  spark: [40, 38, 46, 44, 55, 52, 63, 68, 80]
}, {
  n: 'LEAD ENGINE',
  d: 'Nachfrage mit Intent',
  h: 'Realtime Demand bis zum Close.',
  desc: 'Skalierbare Leadgenerierung über alle relevanten Kanäle — mit sauberem Tracking, KI-Qualifizierung und Intent-Score. Aus Nachfrage wird planbarer, messbarer Vertrieb.',
  feat: ['Intent Score', 'KI-Qualifizierung', 'Budget-Attribution', 'Sales Execution'],
  viz: [['73', 'Ø Intent Score'], ['−34%', 'Cost / Lead'], ['2,1d', 'Time to Close']],
  spark: [30, 42, 38, 50, 47, 58, 64, 60, 72]
}, {
  n: 'CIRCLE',
  d: 'Top-Performer statt Masse',
  h: 'Agent-first beginnt hier.',
  desc: 'Eine kuratierte Makler-Community ab €150K Track-Record. Selbstständig im Handeln, mit dem Rückhalt eines starken Netzwerks — inklusive Software, Support und echter Unternehmensbeteiligung.',
  feat: ['100% Provision', 'Share-Modell', 'Dealflow', 'Personal Branding'],
  viz: [['100%', 'Provision'], ['49%', 'Community Share'], ['25+', 'Partner']],
  spark: [44, 48, 46, 55, 60, 58, 66, 72, 78]
}, {
  n: 'LENS',
  d: 'Dashboard & Data Intelligence',
  h: 'Jeder Schritt messbar.',
  desc: 'Volle Transparenz über Projekte, Leads und Vertriebsperformance. Live-Pipeline, Unit-Status und Predictions in Echtzeit — plus eine Data Engine, die aus jedem Projekt lernt.',
  feat: ['Live Pipeline', 'Unit Status', 'ROI-Tracking', 'Feedback-Loop'],
  viz: [['€84M', 'Pipeline'], ['31,8%', 'Abschlussquote'], ['Live', 'Echtzeit']],
  spark: [36, 40, 44, 42, 52, 58, 55, 64, 70]
}];
const PROD_CHARTS = [/*#__PURE__*/React.createElement(ForecastBars, {
  data: [40, 38, 46, 44, 55, 52, 63, 68, 82],
  accentIdx: 8,
  delta: 18,
  h: 72
}), /*#__PURE__*/React.createElement(Gauge, {
  value: 73,
  size: 108,
  label: "\xD8 Intent"
}), /*#__PURE__*/React.createElement(ActivityRings, {
  rings: [{
    c: 'var(--orange)',
    v: 100
  }, {
    c: 'var(--lx-gold)',
    v: 49
  }, {
    c: 'var(--lx-grey)',
    v: 25
  }],
  size: 120
}), /*#__PURE__*/React.createElement(SegDonut, {
  segs: [{
    c: 'var(--orange)',
    v: 38
  }, {
    c: '#FFC24D',
    v: 21
  }, {
    c: 'var(--lx-gold)',
    v: 83
  }],
  center: "42",
  label: "% VERKAUFT",
  size: 120
})];
function Products() {
  const [i, setI] = useState(0);
  const p = PRODUCTS[i];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground",
    id: "plattform"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Die Plattform"), /*#__PURE__*/React.createElement("h2", null, "High-End-Software und Community, vereint"), /*#__PURE__*/React.createElement("p", null, "Marketing, Software und Vertrieb in einer Schleife \u2014 nicht in drei Silos. Vier Module, ein lernendes System.")), /*#__PURE__*/React.createElement("div", {
    className: "prod"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prod-tabs"
  }, PRODUCTS.map((x, k) => /*#__PURE__*/React.createElement("button", {
    className: "ptab" + (k === i ? " on" : ""),
    key: x.n,
    onClick: () => setI(k)
  }, /*#__PURE__*/React.createElement("span", {
    className: "idx"
  }, "0", k + 1), /*#__PURE__*/React.createElement("div", {
    className: "pn"
  }, x.n), /*#__PURE__*/React.createElement("div", {
    className: "pd"
  }, x.d))), /*#__PURE__*/React.createElement("div", {
    className: "ptab-foot"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--fg3)'
    }
  }, "Ein lernendes System"), /*#__PURE__*/React.createElement("span", {
    className: "live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), "LIVE")), /*#__PURE__*/React.createElement(Sparkline, {
    data: [30, 36, 33, 44, 40, 52, 49, 61, 57, 68, 72],
    h: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginTop: 8,
      lineHeight: 1.45
    }
  }, "Vier Module, eine Schleife \u2014 jedes Signal sch\xE4rft das n\xE4chste."))), /*#__PURE__*/React.createElement("div", {
    className: "prod-detail",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, p.d), /*#__PURE__*/React.createElement("h3", null, p.h), /*#__PURE__*/React.createElement("p", {
    className: "pdesc"
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "feat"
  }, p.feat.map(f => /*#__PURE__*/React.createElement("span", {
    className: "chip",
    key: f
  }, f))), /*#__PURE__*/React.createElement("div", {
    className: "prod-visual"
  }, /*#__PURE__*/React.createElement("div", {
    className: "viz"
  }, p.viz.map(([v, k]) => /*#__PURE__*/React.createElement("div", {
    className: "vstat",
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    className: "v",
    style: {
      color: v === 'Live' ? 'var(--pos)' : v[0] === '−' ? 'var(--neg)' : 'var(--orange-deep)'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, k))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 130,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    key: 'c' + i
  }, PROD_CHARTS[i])))))));
}
const PROC = [['01', 'Analyse', 'Makro/Mikro, Leistbarkeit, Wettbewerb'], ['02', 'NOVA', 'Mix, Grundrisse, Pricing, Personas'], ['03', 'Positionierung', 'Messaging, Visuals, Content-System'], ['04', 'Performance', 'KI-Audience, Creatives, Attribution'], ['05', 'CIRCLE', 'Lead-Qualifizierung & Vertrieb'], ['06', 'LENS', 'Real-Time KPIs, ROI, Feedback-Loop']];
function Process() {
  const ref = useRef();
  const p = useScrollProgress(ref, {
    start: 0.58,
    end: 0.3
  });
  const lit = p * PROC.length;
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "prozess"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Der UNIO-Prozess"), /*#__PURE__*/React.createElement("h2", null, "Von validierter Story zu steuerbarem Abverkauf"), /*#__PURE__*/React.createElement("p", null, "Sechs Schritte, eine Schleife. Was am Ende gelernt wird, flie\xDFt vorne wieder ein \u2014 das System wird mit jedem Projekt besser.")), /*#__PURE__*/React.createElement("div", {
    className: "flow",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-line"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: Math.min(1, p * 1.05) * 100 + '%'
    }
  })), PROC.map(([n, t, d], k) => /*#__PURE__*/React.createElement("div", {
    className: "fnode" + (k < lit ? ' on' : ''),
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    className: "fdot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "fnum"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "ft"
  }, t), /*#__PURE__*/React.createElement("div", {
    className: "fp"
  }, d))))));
}
const COMMUNITY_NAMES = ["Marcin Fituch", "Nikita Neznamov", "Patrycja Szpak", "Wenzel Wächter", "Marcus Anthofer-Weiss", "Laurenz Wurzer"];
function Community() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground",
    id: "community"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr .9fr',
      gap: 64,
      alignItems: 'center'
    },
    className: "comm-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Die Community"), /*#__PURE__*/React.createElement(RevealText, {
    style: {
      fontWeight: 600,
      letterSpacing: '-.03em',
      lineHeight: 1.05,
      fontSize: 'clamp(30px,3.8vw,48px)',
      marginTop: 14
    }
  }, "Automation where it ", /*#__PURE__*/React.createElement("span", {
    className: "accent-deep"
  }, "matters."), /*#__PURE__*/React.createElement("br", null), "Human where it counts."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg2)',
      fontSize: 17,
      lineHeight: 1.6,
      marginTop: 18,
      maxWidth: 520
    }
  }, "Software automatisiert die Prozesse \u2014 damit unsere Makler tun, was z\xE4hlt: echte Beziehungen, ehrliche Beratung, Abschl\xFCsse. Eine kuratierte Bewegung statt Einzelk\xE4mpfer."), /*#__PURE__*/React.createElement("div", {
    className: "av-row",
    style: {
      marginTop: 28
    }
  }, COMMUNITY_NAMES.map(n => /*#__PURE__*/React.createElement(Avatar, {
    key: n,
    name: n,
    size: 50
  })), /*#__PURE__*/React.createElement("span", {
    className: "av",
    style: {
      background: 'var(--orange)',
      color: 'var(--oo)',
      width: 50,
      height: 50,
      fontSize: 13
    }
  }, "+19")), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta",
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-p btn-lg",
    href: "makler.html#bewerben"
  }, "Teil der Bewegung werden ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 17
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g btn-lg",
    href: "makler.html"
  }, "CIRCLE entdecken"))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 36,
      boxShadow: 'var(--shadow-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '2px solid var(--orange)',
      paddingLeft: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "quote"
  }, "\u201EIch akquiriere, verhandle, schlie\xDFe ab \u2014 ", /*#__PURE__*/React.createElement("span", {
    className: "accent-deep"
  }, "und baue endlich etwas Eigenes auf."), " Meine Provision, meine Marke, mein Anteil am Netzwerk.\""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Marcin Fituch",
    size: 44
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15
    }
  }, "CIRCLE Partner"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg3)'
    }
  }, "Selbstst\xE4ndiger Makler, Wien")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 14,
      marginTop: 30,
      paddingTop: 26,
      borderTop: '1px solid var(--bdf)'
    }
  }, [['100%', 'Provision ab €150K'], ['49%', 'Anteile an Top-Performer'], ['20%', 'Gewinn-Ausschüttung']].map(([v, k]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 'clamp(22px,2.4vw,30px)',
      letterSpacing: '-.02em',
      color: 'var(--orange)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginTop: 6,
      lineHeight: 1.4
    }
  }, k))))))));
}
const HIGHLIGHTS = [{
  t: 'Das Albrecht — Townhäuser',
  loc: 'Townhäuser & Altbau',
  img: 'albrecht',
  tags: ['Neubau', '8 Einheiten'],
  price: 'live vermarktet',
  m: [['61', 'Anfragen / 2 Wo.'], ['8', 'Einheiten']]
}, {
  t: 'Obenzwei — Penthouse',
  loc: 'Wien · 2. Bezirk',
  img: 'obenzwei',
  tags: ['Penthouse', 'Bestlage'],
  price: 'auf Anfrage',
  m: [['25', 'Anfragen / Woche'], ['Leopoldstadt', 'Lage']]
}, {
  t: 'Penthouse Beheim',
  loc: 'Wien · €1,7 Mio',
  img: 'beheim',
  tags: ['2 Penthäuser', 'Erstbezug'],
  price: '€ 1,7 Mio',
  m: [['27', 'Anfragen / 2 Wo.'], ['2', 'Penthäuser']]
}];
function ImmoTeaser() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 20,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Immobiliensuche"), /*#__PURE__*/React.createElement("h2", null, "Objekte, die du jetzt entdecken kannst")), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g",
    href: "immobilien.html"
  }, "Alle Immobilien ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "props"
  }, HIGHLIGHTS.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.t,
    style: {
      transitionDelay: i * 70 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: APP_URL,
    target: "_blank",
    rel: "noopener",
    className: "prop"
  }, /*#__PURE__*/React.createElement(PropMedia, {
    img: IMG[p.img],
    tags: p.tags
  }), /*#__PURE__*/React.createElement("div", {
    className: "prop-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prop-loc"
  }, /*#__PURE__*/React.createElement(Icon.pin, {
    size: 14
  }), " ", p.loc), /*#__PURE__*/React.createElement("h4", null, p.t), /*#__PURE__*/React.createElement("div", {
    className: "prop-meta"
  }, p.m.map(([v, k]) => /*#__PURE__*/React.createElement("div", {
    className: "m",
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv"
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "pk"
  }, k)))), /*#__PURE__*/React.createElement("div", {
    className: "prop-foot"
  }, p.price === 'live vermarktet' ? /*#__PURE__*/React.createElement("span", {
    className: "prop-status"
  }, /*#__PURE__*/React.createElement("i", null), "Live vermarktet") : /*#__PURE__*/React.createElement("span", {
    className: "price"
  }, p.price), /*#__PURE__*/React.createElement("span", {
    className: "go"
  }, "Im Dashboard ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 15
  })))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      gap: 13,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-p btn-lg",
    href: SEARCH_URL,
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement(Icon.search, {
    size: 17
  }), " Immobiliensuche starten"), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-ghost",
    href: BEWERTUNG_URL,
    target: "_blank",
    rel: "noopener"
  }, "Oder: eigene Immobilie bewerten ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 16
  })))));
}

/* ---- Proof / Case strip ---- */
const HCASES = [{
  img: 'ecoluxe',
  tag: 'Villa Ecoluxe',
  v: '+31%',
  k: 'über Zielpreis · 282 Anfragen'
}, {
  img: 'penthouse',
  tag: 'Penthouse €4 Mio',
  v: '40',
  k: 'Anfragen nach Übernahme'
}, {
  img: 'obenzwei_dinner',
  tag: 'Obenzwei · 2. Bezirk',
  v: '25',
  k: 'hochqual. Anfragen / Woche'
}];
function ProofStrip() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Proof \xB7 Live im Markt"), /*#__PURE__*/React.createElement("h2", null, "Bewiesen im Markt.", /*#__PURE__*/React.createElement("br", null), "Nicht am Papier."), /*#__PURE__*/React.createElement("p", null, "Echte Projekte, echte Zahlen \u2014 jede Vermarktung mit eigener Story, Performance-Kampagnen und transparenter Vertriebssteuerung.")), /*#__PURE__*/React.createElement("div", {
    className: "cases"
  }, HCASES.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: c.tag,
    style: {
      transitionDelay: i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "case"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-media"
  }, /*#__PURE__*/React.createElement(Photo, {
    src: IMG[c.img],
    pos: "center",
    overlay: "linear-gradient(180deg,rgba(14,15,17,0) 42%,rgba(14,15,17,.72) 100%)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "case-cap"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 19
    }
  }, c.tag))), /*#__PURE__*/React.createElement("div", {
    className: "case-body",
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cmv"
  }, c.v)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg2)',
      lineHeight: 1.4
    }
  }, c.k)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g btn-lg",
    href: "bautraeger.html#cases"
  }, "Alle Case Studies ansehen ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 16
  })))));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ringbg"
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 260,
    w: 9,
    color: "var(--orange)"
  })), /*#__PURE__*/React.createElement(RevealText, null, "Von validierter Story zu", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "steuerbarem Abverkauf.")), /*#__PURE__*/React.createElement("p", null, "UNIO macht aus Vermarktung ein steuerbares System \u2014 mit Daten, Technologie und Vertriebspower. W\xE4hle deinen Einstieg."), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-p btn-xl",
    href: "bautraeger.html"
  }, "Projekt pr\xFCfen lassen ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g btn-xl",
    href: "makler.html#bewerben"
  }, "CIRCLE Partner werden")))));
}
function HumanBand() {
  const ref = useRef();
  useEdgeRadius(ref, 44);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo-band",
    ref: ref
  }, /*#__PURE__*/React.createElement(Parallax, {
    amount: 50,
    style: {
      position: 'absolute',
      inset: '-8% 0'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    src: IMG.lifestyle_wine,
    pos: "center",
    overlay: "linear-gradient(90deg,rgba(14,15,17,.6),rgba(14,15,17,.15) 55%,rgba(14,15,17,.35))"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#fff',
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker",
    style: {
      color: 'var(--orange)'
    }
  }, "Data + Human"), /*#__PURE__*/React.createElement(RevealText, {
    style: {
      fontWeight: 600,
      letterSpacing: '-.03em',
      fontSize: 'clamp(28px,3.8vw,52px)',
      lineHeight: 1.04,
      marginTop: 14,
      textShadow: '0 2px 24px rgba(0,0,0,.4)',
      color: '#fff'
    }
  }, "Daten als Beweis.", /*#__PURE__*/React.createElement("br", null), "Menschen als Herz."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      marginTop: 18,
      color: 'rgba(255,255,255,.86)',
      maxWidth: 460
    }
  }, "Wir bauen Technologie, damit am Ende ein Mensch im richtigen Moment f\xFCr den richtigen Menschen da ist. Vom ersten Klick bis zum Schl\xFCssel.")))));
}
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UnioLoader, null), /*#__PURE__*/React.createElement(Nav, {
    active: "home"
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(ImmoTeaser, null), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement(Routes, null), /*#__PURE__*/React.createElement(Products, null), /*#__PURE__*/React.createElement(Process, null), /*#__PURE__*/React.createElement(HumanBand, null), /*#__PURE__*/React.createElement(Community, null), /*#__PURE__*/React.createElement(ProofStrip, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Unio Homepage/_src/page-home.jsx", error: String((e && e.message) || e) }); }

// uploads/Unio Homepage/_src/page-immobilien.jsx
try { (() => {
/* ===================== IMMOBILIEN (KÄUFER) ===================== */

const PROPS = [{
  t: 'Das Albrecht — Townhäuser',
  loc: 'Townhäuser & Altbau',
  img: 'albrecht',
  pos: 'center',
  tags: ['Neubau', '8 Einheiten'],
  price: 'live vermarktet',
  m: [['8', 'Einheiten'], ['Erstbezug', 'Qualität']]
}, {
  t: 'Traum Penthouse mit Terrasse',
  loc: 'Wien · Dachgeschoss',
  img: 'penthouse',
  pos: 'center',
  tags: ['Penthouse', 'Erstbezug'],
  price: 'auf Anfrage',
  m: [['Dachterrasse', 'Weitblick'], ['Bestlage', 'Wien']]
}, {
  t: 'Obenzwei — Rooftop Penthouse',
  loc: 'Wien · 2. Bezirk',
  img: 'obenzwei',
  pos: 'center',
  tags: ['Penthouse', 'Terrasse'],
  price: 'auf Anfrage',
  m: [['25 / Wo', 'Anfragen'], ['Leopoldstadt', 'Lage']]
}, {
  t: 'Penthouse Beheim · Erstbezug',
  loc: 'Wien · €1,7 Mio',
  img: 'beheim',
  pos: 'center',
  tags: ['2 Penthäuser', 'Hell'],
  price: '€ 1,7 Mio',
  m: [['2', 'Penthäuser'], ['DG', 'Maisonette']]
}, {
  t: 'Villa im Grünen mit Pool',
  loc: 'Wien · Stadtrand',
  img: 'ecoluxe',
  pos: 'center',
  tags: ['Villa', 'Garten'],
  price: 'auf Anfrage',
  m: [['Pool', 'Privatgarten'], ['Ruhelage', 'Grün']]
}, {
  t: 'Familienhaus mit Weitblick',
  loc: 'Wienerwald',
  img: 'ecoluxe_wide',
  pos: 'center',
  tags: ['Haus', 'Großer Garten'],
  price: 'auf Anfrage',
  m: [['Garten', 'großzügig'], ['Ruhelage', 'Natur']]
}];
function HeroI() {
  const ref = useRef();
  useHeroFx(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    ref: ref
  }, /*#__PURE__*/React.createElement(HeroBg, null), /*#__PURE__*/React.createElement("div", {
    className: "hero-orb ring-spin",
    style: {
      right: '-90px',
      top: '2%'
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 340,
    w: 2.5,
    color: "rgba(255,170,9,.4)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide hero-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Immobilien finden"), /*#__PURE__*/React.createElement(RevealText, {
    tag: "h1",
    style: {
      fontSize: 'clamp(38px,5vw,68px)'
    }
  }, "Finde dein Zuhause.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "Datengest\xFCtzt.")), /*#__PURE__*/React.createElement("p", {
    className: "sub",
    style: {
      maxWidth: 520
    }
  }, "Kuratierte Wiener Projekte und Einzelobjekte \u2014 von UNIO datenbasiert vermarktet. Starte deine Suche und sieh in Echtzeit, was verf\xFCgbar ist."), /*#__PURE__*/React.createElement("form", {
    className: "search-bar",
    style: {
      marginTop: 28
    },
    onSubmit: e => {
      e.preventDefault();
      window.open(APP_URL, '_blank');
    }
  }, /*#__PURE__*/React.createElement(Icon.search, {
    size: 19
  }), /*#__PURE__*/React.createElement("input", {
    className: "si",
    placeholder: "Ort, Bezirk, Projekt oder Stichwort\u2026",
    "aria-label": "Immobiliensuche"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-p",
    type: "submit"
  }, "Suchen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      marginTop: 18,
      flexWrap: 'wrap'
    }
  }, ['Wien 1020', 'Wien 1170', 'Penthouse', 'Villa', 'Familienhaus'].map(c => /*#__PURE__*/React.createElement("a", {
    key: c,
    href: APP_URL,
    target: "_blank",
    rel: "noopener",
    className: "chip",
    style: {
      cursor: 'pointer'
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "hero-photo"
  }, /*#__PURE__*/React.createElement(Photo, {
    src: IMG.albrecht_dusk,
    pos: "center",
    overlay: "linear-gradient(180deg,rgba(14,15,17,0) 45%,rgba(14,15,17,.6) 100%)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "pill pill-w hp-tag"
  }, "Live vermarktet"), /*#__PURE__*/React.createElement("div", {
    className: "hp-cap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 20,
      letterSpacing: '-.01em',
      textShadow: '0 2px 14px rgba(0,0,0,.4)'
    }
  }, "Das Albrecht \u2014 Townh\xE4user"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'rgba(255,255,255,.82)',
      marginTop: 3
    }
  }, "8 Einheiten \xB7 datenbasiert vermarktet")))));
}
function PropGrid() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Aktuelle Highlights"), /*#__PURE__*/React.createElement("h2", null, "Ausgew\xE4hlte Objekte & Projekte")), /*#__PURE__*/React.createElement("span", {
    className: "live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), "Live aus dem UNIO-Dashboard")), /*#__PURE__*/React.createElement("div", {
    className: "props"
  }, PROPS.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.t,
    style: {
      transitionDelay: i % 3 * 70 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: APP_URL,
    target: "_blank",
    rel: "noopener",
    className: "prop"
  }, /*#__PURE__*/React.createElement(PropMedia, {
    img: IMG[p.img],
    pos: p.pos,
    tags: p.tags
  }), /*#__PURE__*/React.createElement("div", {
    className: "prop-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prop-loc"
  }, /*#__PURE__*/React.createElement(Icon.pin, {
    size: 14
  }), " ", p.loc), /*#__PURE__*/React.createElement("h4", null, p.t), /*#__PURE__*/React.createElement("div", {
    className: "prop-meta"
  }, p.m.map(([v, k]) => /*#__PURE__*/React.createElement("div", {
    className: "m",
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv"
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "pk"
  }, k)))), /*#__PURE__*/React.createElement("div", {
    className: "prop-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "price"
  }, p.price), /*#__PURE__*/React.createElement("span", {
    className: "go"
  }, "Details ansehen ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 15
  })))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-p btn-lg",
    href: SEARCH_URL,
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement(Icon.search, {
    size: 17
  }), " Alle Immobilien im Dashboard durchsuchen"))));
}
const SCORES = [['Walk Score', '99', 'Sehr gut zu Fuß'], ['Alltag', '89', 'Sehr gute Nahversorgung'], ['Schulen', '10/10', 'Überdurchschnittlich'], ['Transit', '25', 'Auto empfohlen']];
function Featured() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.05fr .95fr',
      gap: 48,
      alignItems: 'center'
    },
    className: "comm-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-photo",
    style: {
      aspectRatio: '4/3'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    src: IMG.albrecht,
    pos: "center",
    overlay: "linear-gradient(180deg,rgba(14,15,17,0) 55%,rgba(14,15,17,.5) 100%)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "pill pill-w hp-tag"
  }, "Featured Projekt"), /*#__PURE__*/React.createElement("div", {
    className: "hp-cap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '-.01em',
      textShadow: '0 2px 14px rgba(0,0,0,.4)'
    }
  }, "Das Albrecht"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'rgba(255,255,255,.84)',
      marginTop: 3
    }
  }, "Townh\xE4user & Altbauwohnungen"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Featured Projekt"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 600,
      letterSpacing: '-.03em',
      fontSize: 'clamp(28px,3.2vw,40px)',
      marginTop: 14,
      lineHeight: 1.06
    }
  }, "Das Albrecht \u2014 Townh\xE4user & Altbau"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg2)',
      fontSize: 16,
      lineHeight: 1.6,
      marginTop: 16,
      maxWidth: 460
    }
  }, "Acht Einheiten zwischen modernem Townhouse und charmantem Altbau \u2014 hochwertige Ausstattung, private G\xE4rten und Terrassen. In den ersten zwei Wochen \xFCber 61 qualifizierte Anfragen."), /*#__PURE__*/React.createElement("div", {
    className: "statline",
    style: {
      marginTop: 24,
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "8"), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Einheiten")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "61"), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Anfragen / 2 Wo.")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "99"), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Walk Score"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12,
      marginTop: 24
    }
  }, SCORES.map(([k, v, d]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "card-inset",
    style: {
      padding: 15
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '.08em'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-.03em',
      marginTop: 6,
      fontVariantNumeric: 'tabular-nums'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg3)',
      marginTop: 4
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-p btn-lg",
    href: APP_URL,
    target: "_blank",
    rel: "noopener"
  }, "Projekt & Einheiten ansehen ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 16
  })))))));
}
const STEPS_I = [{
  n: '01',
  h: 'Suchen & entdecken',
  p: 'Durchsuche kuratierte Projekte und Einzelobjekte — gefiltert nach Ort, Preis, Typ und mehr.'
}, {
  n: '02',
  h: 'Match & anfragen',
  p: 'Hinterlege deine Suchkriterien. Smart Matching meldet dir neue Objekte, die wirklich passen.'
}, {
  n: '03',
  h: 'Besichtigen & kaufen',
  p: 'Termin, digitales Exposé, Kaufanbot — begleitet von einem CIRCLE-Makler, transparent bis zum Closing.'
}];
function HowItWorks() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "So einfach geht's"), /*#__PURE__*/React.createElement("h2", null, "Vom ersten Klick bis zum Schl\xFCssel")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20
    },
    className: "routes"
  }, STEPS_I.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.n,
    style: {
      transitionDelay: i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 30,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--orange)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20,
      marginTop: 14,
      fontWeight: 700,
      letterSpacing: '-.01em'
    }
  }, s.h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--fg2)',
      lineHeight: 1.6,
      marginTop: 10
    }
  }, s.p)))))));
}
function SellCTA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ringbg"
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 260,
    w: 9,
    color: "var(--orange)"
  })), /*#__PURE__*/React.createElement("span", {
    className: "kicker on-dark"
  }, "Du willst verkaufen?"), /*#__PURE__*/React.createElement(RevealText, {
    style: {
      marginTop: 14
    }
  }, "Was ist deine Immobilie", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "heute wirklich wert?")), /*#__PURE__*/React.createElement("p", null, "Kostenlose, datenbasierte Bewertung in wenigen Minuten \u2014 und auf Wunsch ein klarer Plan f\xFCr den Abverkauf."), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-p btn-xl",
    href: BEWERTUNG_URL,
    target: "_blank",
    rel: "noopener"
  }, "Immobilie bewerten ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g btn-xl",
    href: APP_URL,
    target: "_blank",
    rel: "noopener"
  }, "Immobiliensuche starten")))));
}
function Gallery() {
  const tiles = [{
    img: 'beheim',
    cap: 'Lichtdurchflutete Penthäuser',
    tall: true
  }, {
    img: 'int_kitchen',
    cap: 'Markenküchen & Naturstein'
  }, {
    img: 'obenzwei_dinner',
    cap: 'Dachterrassen über Wien'
  }, {
    img: 'vienna_garden',
    cap: 'Lage & Lebensqualität'
  }, {
    img: 'beheim_2',
    cap: 'Erstbezug, schlüsselfertig'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Einblicke"), /*#__PURE__*/React.createElement("h2", null, "Wohnen, das sich sehen l\xE4sst"), /*#__PURE__*/React.createElement("p", null, "Jedes Objekt wird mit eigener Story, professioneller Inszenierung und datenbasierter Vermarktung in Szene gesetzt.")), /*#__PURE__*/React.createElement("div", {
    className: "gallery"
  }, tiles.map((t, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t.img,
    className: "gtile" + (t.tall ? ' tall' : ''),
    style: {
      transitionDelay: i * 70 + 'ms'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    src: IMG[t.img],
    pos: "center",
    overlay: "linear-gradient(180deg,rgba(14,15,17,0) 50%,rgba(14,15,17,.6) 100%)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "gcap"
  }, t.cap))))));
}
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    active: "immobilien"
  }), /*#__PURE__*/React.createElement(HeroI, null), /*#__PURE__*/React.createElement(PropGrid, null), /*#__PURE__*/React.createElement(Featured, null), /*#__PURE__*/React.createElement(Gallery, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(SellCTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Unio Homepage/_src/page-immobilien.jsx", error: String((e && e.message) || e) }); }

// uploads/Unio Homepage/_src/page-kontakt.jsx
try { (() => {
/* ===================== KONTAKT ===================== */

const ROUTES_K = [{
  icon: /*#__PURE__*/React.createElement(Icon.building, {
    size: 20
  }),
  h: 'Bauträger',
  p: 'Projekt prüfen lassen — 100 % erfolgsbasiert.',
  go: 'Zur Bauträger-Seite',
  href: 'bautraeger.html'
}, {
  icon: /*#__PURE__*/React.createElement(Icon.users, {
    size: 20
  }),
  h: 'Makler',
  p: 'Als CIRCLE Partner bewerben.',
  go: 'Zur CIRCLE-Seite',
  href: 'makler.html'
}, {
  icon: /*#__PURE__*/React.createElement(Icon.home, {
    size: 20
  }),
  h: 'Käufer & Suchende',
  p: 'Immobilien entdecken oder bewerten.',
  go: 'Immobilien ansehen',
  href: 'immobilien.html'
}];
function ContactForm() {
  const [d, setD] = useState({
    name: '',
    email: '',
    anliegen: 'Allgemeine Anfrage',
    msg: ''
  });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setD(s => ({
    ...s,
    [k]: v
  }));
  const valid = d.name.trim() && /.+@.+\..+/.test(d.email) && d.msg.trim().length > 3;
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        padding: '48px 36px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement(Ring, {
      size: 72,
      w: 8,
      color: "var(--orange)",
      track: "var(--track)"
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: '-.02em'
      }
    }, "Danke, ", d.name.split(' ')[0], "!"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--fg2)',
        fontSize: 15.5,
        lineHeight: 1.6,
        marginTop: 12,
        maxWidth: 380,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    }, "Deine Nachricht ist bei uns. Wir melden uns innerhalb von 48 Stunden."), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-g btn-lg",
      style: {
        marginTop: 24
      },
      onClick: () => {
        setSent(false);
        setD({
          name: '',
          email: '',
          anliegen: 'Allgemeine Anfrage',
          msg: ''
        });
      }
    }, "Neue Nachricht"));
  }
  return /*#__PURE__*/React.createElement("form", {
    className: "card",
    style: {
      padding: '34px 36px'
    },
    onSubmit: e => {
      e.preventDefault();
      if (valid) setSent(true);
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontWeight: 700,
      fontSize: 21,
      letterSpacing: '-.01em'
    }
  }, "Schreib uns"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg3)',
      fontSize: 14,
      marginTop: 6,
      marginBottom: 22
    }
  }, "Wir antworten pers\xF6nlich \u2014 kein Bot, keine Warteschleife."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "Name *"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: d.name,
    onChange: e => set('name', e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "E-Mail *"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "email",
    value: d.email,
    onChange: e => set('email', e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("label", null, "Anliegen"), /*#__PURE__*/React.createElement("select", {
    className: "select",
    value: d.anliegen,
    onChange: e => set('anliegen', e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Allgemeine Anfrage"), /*#__PURE__*/React.createElement("option", null, "Ich bin Bautr\xE4ger"), /*#__PURE__*/React.createElement("option", null, "Ich bin Makler (CIRCLE)"), /*#__PURE__*/React.createElement("option", null, "Ich suche eine Immobilie"), /*#__PURE__*/React.createElement("option", null, "Presse & Partnerschaften"))), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginTop: 14,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("label", null, "Nachricht *"), /*#__PURE__*/React.createElement("textarea", {
    className: "textarea",
    value: d.msg,
    onChange: e => set('msg', e.target.value),
    placeholder: "Wie k\xF6nnen wir helfen?"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-p btn-lg",
    type: "submit",
    disabled: !valid
  }, "Nachricht senden ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 16
  })));
}
function HeroK() {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide hero-in",
    style: {
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Kontakt"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(38px,5vw,64px)'
    }
  }, "Sprich mit uns."), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Egal ob Bautr\xE4ger, Makler oder auf der Suche nach dem n\xE4chsten Zuhause \u2014 wir holen dich genau dort ab, wo du gerade stehst."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 32
    }
  }, ROUTES_K.map(r => /*#__PURE__*/React.createElement("a", {
    key: r.h,
    href: r.href,
    className: "card",
    style: {
      padding: '18px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      transition: 'all .18s var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ricon",
    style: {
      width: 42,
      height: 42
    }
  }, r.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16
    }
  }, r.h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--fg3)',
      marginTop: 2
    }
  }, r.p)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--orange-deep)',
      fontWeight: 600,
      fontSize: 13,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, r.go, " ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 15
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      paddingTop: 24,
      borderTop: '1px solid var(--bdf)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 14.5,
      color: 'var(--fg2)'
    }
  }, /*#__PURE__*/React.createElement(Icon.pin, {
    size: 17
  }), " Real Unio GmbH \xB7 K\xE4rntner Stra\xDFe 12, 1010 Wien"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g",
    href: APP_URL,
    target: "_blank",
    rel: "noopener"
  }, "Dashboard Login ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 15
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g",
    href: BEWERTUNG_URL,
    target: "_blank",
    rel: "noopener"
  }, "Immobilie bewerten ", /*#__PURE__*/React.createElement(Icon.arrowUR, {
    size: 15
  }))))), /*#__PURE__*/React.createElement(ContactForm, null)));
}
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    active: "kontakt"
  }), /*#__PURE__*/React.createElement(HeroK, null), /*#__PURE__*/React.createElement(Footer, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Unio Homepage/_src/page-kontakt.jsx", error: String((e && e.message) || e) }); }

// uploads/Unio Homepage/_src/page-makler.jsx
try { (() => {
/* ===================== MAKLER / CIRCLE ===================== */

function HeroM({
  onOpen
}) {
  const ref = useRef();
  useHeroFx(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    ref: ref
  }, /*#__PURE__*/React.createElement(HeroBg, null), /*#__PURE__*/React.createElement("div", {
    className: "hero-orb ring-spin",
    style: {
      right: '-90px',
      top: '2%'
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 340,
    w: 2.5,
    color: "rgba(255,170,9,.4)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide hero-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "CIRCLE \xB7 Agent-first"), /*#__PURE__*/React.createElement(RevealText, {
    tag: "h1",
    style: {
      fontSize: 'clamp(38px,5vw,64px)'
    }
  }, "Agent-first", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "beginnt hier.")), /*#__PURE__*/React.createElement("p", {
    className: "sub",
    style: {
      maxWidth: 540
    }
  }, "Werde Teil der Bewegung und Mitgesellschafter, bau deine Marke auf, profitiere von st\xE4ndigem Dealflow und unvergleichbaren Konditionen \u2014 auf der Plattform und in der Community, die die Immobilienbranche umkrempelt."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-p btn-xl",
    onClick: onOpen
  }, "Als CIRCLE Partner bewerben ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g btn-xl",
    href: "#rechner"
  }, "Was bleibt f\xFCr dich?")), /*#__PURE__*/React.createElement("div", {
    className: "statline",
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "100", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Provision ab \u20AC150K p.a.")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "49", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Anteile an Top-Performer")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "25", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Partner im Netzwerk")))), /*#__PURE__*/React.createElement("div", {
    className: "hero-photo"
  }, /*#__PURE__*/React.createElement(Photo, {
    src: IMG.lifestyle_wine,
    pos: "center",
    overlay: "linear-gradient(180deg,rgba(14,15,17,0) 50%,rgba(14,15,17,.5) 100%)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "pill pill-w hp-tag"
  }, "Die Community"), /*#__PURE__*/React.createElement("div", {
    className: "hp-cap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '-.01em',
      textShadow: '0 2px 14px rgba(0,0,0,.4)'
    }
  }, "Unternehmer. Nicht Einzelk\xE4mpfer.")))));
}
const PROBSM = [['01', 'Du arbeitest. Andere verdienen.', 'Du akquirierst, verhandelst, schließt ab — doch ein großer Teil deiner Provision bleibt beim Arbeitgeber. Kein Eigenkapital, keine Beteiligung.'], ['02', 'Keine eigene Brand.', 'Dein Name steht hinter dem Agentur-Logo. Du baust Reichweite für eine Marke auf, die dir nicht gehört. Dein Marktwert bleibt begrenzt.'], ['03', 'Du arbeitest im System. Nicht am System.', 'Langsame Prozesse, Medienbrüche, manuelle Abläufe. Zeit, die du für Deals brauchst, geht für Administration verloren. Du verwaltest, statt zu skalieren.']];
function ProblemM() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ink"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker on-dark"
  }, "Das Problem"), /*#__PURE__*/React.createElement(RevealText, null, "Du arbeitest hart.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "Aber baust nichts Eigenes auf.")), /*#__PURE__*/React.createElement("p", null, "Egal ob angestellt, als Kooperationspartner oder eigenst\xE4ndig \u2014 das alte System deckelt deinen Erfolg, kostet dich deine Marke und gibt dir keinen echten Unternehmenswert.")), /*#__PURE__*/React.createElement("div", {
    className: "probs"
  }, PROBSM.map(([n, t, d], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: n,
    style: {
      transitionDelay: i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "prob"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pn"
  }, n), /*#__PURE__*/React.createElement("h4", null, t), /*#__PURE__*/React.createElement("p", null, d)))))));
}
const PILLARS = [{
  i: '01',
  h: 'Ownership statt Abhängigkeit',
  p: 'CIRCLE dreht das alte Margensystem um: Deine Provision gehört dir — und über das UNIO Share-Modell partizipierst du am Netzwerk, das du selbst mit aufbaust.',
  m: [['100%', 'Provision ab €150K p.a.'], ['85%', 'Provision bis €150K p.a.']]
}, {
  i: '02',
  h: 'Enablement durch Infrastruktur & Tech',
  p: 'Statt Kontrolle: Enablement. Digitales Backoffice, KI-Portfoliomanagement, immersive Exposés, Smart Matching, intelligentes Lead Management, digitales Closing und KI-Telefonassistent.',
  m: [['8+', 'Tech-Module'], ['~80%', 'weniger Admin']]
}, {
  i: '03',
  h: 'Unternehmertum mit Community-Power',
  p: 'Du bleibst unabhängig und baust deine eigene Marke auf — aber nicht allein. Austausch, Standards, Zusammenarbeit und gemeinsames Momentum statt Einzelkämpfer-Modus.',
  m: [['20%', 'Gewinn-Ausschüttung'], ['49%', 'Share an Top-Performer']]
}, {
  i: '04',
  h: 'Projekt-Pipeline statt Zufalls-Dealflow',
  p: 'Das UNIO-Akquise-Team holt exklusive, kuratierte Projekte. Alle Projekte werden aufbereitet, vom Inhouse-Marketing ins richtige Licht gerückt — und du bekommst vorqualifizierte Leads.',
  m: [['exklusiv', 'kuratierter Dealflow'], ['25%', 'passiv aus Recruits']]
}, {
  i: '05',
  h: 'Deine Marketing-Superpower',
  p: 'CIRCLE ist für Makler, die nicht „mitlaufen" wollen. Individuelle Markenstrategie, Personal Branding und volle Content-Produktion unter deinem Namen.',
  m: [['3', 'Kurzvideos / Monat'], ['10', 'Fotos / Monat']]
}];
function WhatIf() {
  const wrapRef = useRef();
  const p = useStickyProgress(wrapRef);
  const TOK = [{
    w: "Was"
  }, {
    w: "wäre,"
  }, {
    w: "wenn"
  }, {
    w: "der"
  }, {
    w: "Makler",
    acc: true
  }, {
    w: "im",
    acc: true
  }, {
    w: "Zentrum",
    acc: true
  }, {
    w: "steht?"
  }];
  const N = TOK.length;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const reveal = Math.min(1, p / 0.5);
  const exit = ease(Math.max(0, Math.min(1, (p - 0.66) / 0.32)));
  const qStyle = {
    transform: `translateY(${(-exit * 64).toFixed(1)}px) scale(${(1 - exit * 0.09).toFixed(3)})`,
    opacity: (1 - exit * 0.92).toFixed(3)
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "whatif"
  }, /*#__PURE__*/React.createElement("div", {
    className: "whatif-scroll",
    ref: wrapRef,
    style: {
      height: '200vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "whatif-sticky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker",
    style: {
      display: 'block',
      marginBottom: 26,
      opacity: (1 - exit).toFixed(2)
    }
  }, "Die Frage"), /*#__PURE__*/React.createElement("h2", {
    className: "whatif-q",
    style: qStyle
  }, TOK.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "wq-w" + (t.acc ? " acc" : ""),
    style: {
      opacity: (0.10 + 0.90 * Math.max(0, Math.min(1, reveal * (N + 1.5) - i))).toFixed(3)
    }
  }, t.w), " "))), /*#__PURE__*/React.createElement("div", {
    className: "whatif-cue",
    style: {
      opacity: Math.max(0, Math.min(1, (reveal - 0.8) * 6 - exit * 4)).toFixed(2)
    }
  }, "Die Antwort ", /*#__PURE__*/React.createElement("span", {
    className: "ch"
  }, /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 14
  })))))));
}
function Solution() {
  const ref = useRef();
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = -r.top / vh;
      setP(Math.max(0, prog));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
  const TOK = [{
    w: "Nicht"
  }, {
    w: "die"
  }, {
    w: "Agentur."
  }, {
    w: "Nicht"
  }, {
    w: "das"
  }, {
    w: "Portal."
  }, {
    w: "Du.",
    acc: true,
    br: true
  }];
  const N = TOK.length;
  const reveal = Math.min(1, p / 0.42);
  const bg = Math.max(0, Math.min(1, (p - 0.12) / 0.5));
  const lerp = (a, b) => Math.round(a + (b - a) * bg);
  const bgc = `rgb(${lerp(244, 255)},${lerp(244, 255)},${lerp(242, 255)})`;
  const subOp = Math.max(0, Math.min(1, (reveal - 0.7) * 4)).toFixed(2);
  return /*#__PURE__*/React.createElement("section", {
    className: "sol",
    id: "modell",
    ref: ref,
    style: {
      background: bgc
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sol-pin",
    style: {
      background: bgc
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide sol-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker",
    style: {
      display: 'block',
      marginBottom: 16,
      opacity: Math.min(1, reveal * 2).toFixed(2)
    }
  }, "Die Antwort"), /*#__PURE__*/React.createElement("h2", {
    className: "sol-q"
  }, TOK.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "wq-w" + (t.acc ? " acc" : ""),
    style: {
      opacity: (0.10 + 0.90 * Math.max(0, Math.min(1, reveal * (N + 1.5) - i))).toFixed(3)
    }
  }, t.w), t.br ? /*#__PURE__*/React.createElement("br", null) : " "))), /*#__PURE__*/React.createElement("p", {
    className: "sol-sub",
    style: {
      opacity: subOp
    }
  }, "F\xFCnf Hebel, die aus \u201Eangestellt sein\" echtes Mitunternehmertum machen."))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide sol-listwrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pillars sol-list"
  }, PILLARS.map((pl, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: pl.i,
    style: {
      transitionDelay: i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pi"
  }, pl.i), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, pl.h), /*#__PURE__*/React.createElement("p", null, pl.p)), /*#__PURE__*/React.createElement("div", {
    className: "pmetric"
  }, pl.m.map(([v, k]) => /*#__PURE__*/React.createElement("div", {
    className: "mm",
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    className: "mv"
  }, v), /*#__PURE__*/React.createElement("div", {
    className: "mk"
  }, k))))))))));
}
function Values() {
  const v = ['Fairness', 'Empowerment', 'Technologie', 'Ownership'];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      display: 'flex',
      gap: 'clamp(20px,4vw,56px)',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    }
  }, v.map(x => /*#__PURE__*/React.createElement("div", {
    key: x,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flex: '1 1 200px',
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement(IconMark, {
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 'clamp(18px,2vw,24px)',
      letterSpacing: '-.01em'
    }
  }, x)))));
}
const COMP = [['Provisionsaufteilung', 'Splits oft mit Gebühren oder Bedingungen', 'Bis 100 %, unabhängig vom Umsatz'], ['Eigene Marke', 'Bleibt meist außen vor', 'UNIO baut deine Brand für dich auf'], ['Dealflow', 'Zufällig, Portfolios bei Agenturen', 'Kontinuierlich & kuratiert'], ['Infrastruktur', 'Fragmentiert und veraltet', 'Integrierte High-End-Plattform'], ['Unternehmenswert', 'Kein Anteil am Wachstum', 'Echte Unternehmensbeteiligung'], ['Passives Einkommen', 'Keine Quellen', 'Referral + Gewinn-Ausschüttung']];
function Compare() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Der Unterschied"), /*#__PURE__*/React.createElement("h2", null, "Der klassische Makler vs. UNIO CIRCLE")), /*#__PURE__*/React.createElement("div", {
    className: "compare"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crow head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl"
  }, "\xA0"), /*#__PURE__*/React.createElement("div", {
    className: "cc"
  }, "Klassischer Makler"), /*#__PURE__*/React.createElement("div", {
    className: "cc unio"
  }, "UNIO CIRCLE")), COMP.map(([l, a, b]) => /*#__PURE__*/React.createElement("div", {
    className: "crow",
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    className: "cl"
  }, l), /*#__PURE__*/React.createElement("div", {
    className: "cc",
    style: {
      color: 'var(--fg3)'
    }
  }, a), /*#__PURE__*/React.createElement("div", {
    className: "cc unio"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon.check, {
    size: 16,
    sw: 2.5
  }), " ", b)))))));
}

/* ---------- DREI FRAGEN ---------- */
const QS = [['Verdienst du, was deine Leistung wert ist?', 'Du trägst unternehmerisches Risiko — aber ein fixer Anteil deiner Provision geht dauerhaft an die Agentur.'], ['Baust du Unternehmenswert auf — oder Provisionen?', 'Ohne Beteiligung bleibt am Ende deiner Karriere kein Asset, das dir gehört. Nur Umsatz, der durchläuft.'], ['Gehört deine Marke dir — oder deinem Arbeitgeber?', 'Du baust Reichweite und Vertrauen auf. Für eine Marke, die nicht deinen Namen trägt.']];
function ThreeQuestions() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Warum du hier bist"), /*#__PURE__*/React.createElement(RevealText, null, "Drei Fragen.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent-deep"
  }, "Wenn du auch nur bei einer z\xF6gerst \u2014 lies weiter."))), /*#__PURE__*/React.createElement("div", {
    className: "probs"
  }, QS.map(([q, a], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    style: {
      transitionDelay: i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "prob",
    style: {
      borderTopColor: 'var(--orange)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pn"
  }, "0", i + 1), /*#__PURE__*/React.createElement("h4", null, q), /*#__PURE__*/React.createElement("p", null, a)))))));
}

/* ---------- COMMISSION CALCULATOR ---------- */
const MODELS = [{
  k: 'Angestellt',
  keep: 0.50,
  fix: 0,
  note: 'Du behältst rund die Hälfte deiner Provision — den Rest behält der Arbeitgeber.',
  costNote: 'Tools & Büro im Gehalt'
}, {
  k: 'Kooperationspartner',
  keep: 0.72,
  fix: 12000,
  note: 'Bessere Splits, aber mit Gebühren, Tool- und Bürokosten obendrauf.',
  costNote: '~€1.000/Mt Kosten'
}, {
  k: 'Eigenständig',
  keep: 1.0,
  fix: 57060,
  note: '100 % deiner Provision — aber Infrastruktur (Büro, Daten, Portale, Tools) kostet dich rund €4.755 im Monat.',
  costNote: '~€4.755/Mt Eigenbau'
}];
const fmtEUR = n => '€' + Math.round(n).toLocaleString('de-DE');
function CommissionCalc({
  onOpen
}) {
  const [calcRef, seen] = useInView(0.3);
  const [gross, setGross] = useState(220000);
  const [mi, setMi] = useState(0);
  const m = MODELS[mi];
  const UNIO_INFRA = 599 * 12;
  const TIER = 150000;
  const unioGross = Math.min(gross, TIER) * 0.85 + Math.max(0, gross - TIER) * 1.0;
  const effSplit = gross > 0 ? unioGross / gross : 0.85;
  const tradNet = Math.max(0, gross * m.keep - m.fix);
  const unioNet = unioGross - UNIO_INFRA;
  const delta = unioNet - tradNet;
  const max = Math.max(tradNet, unioNet, 1);
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground",
    id: "rechner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Der Provisions-Rechner"), /*#__PURE__*/React.createElement("h2", null, "Rechne dein Modell gegen UNIO CIRCLE."), /*#__PURE__*/React.createElement("p", null, "Stell deinen Jahres-Provisionsumsatz ein und vergleiche, was am Ende wirklich bei dir bleibt \u2014 heute vs. mit CIRCLE.")), /*#__PURE__*/React.createElement("div", {
    className: "calc",
    ref: calcRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "calc-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crange"
  }, /*#__PURE__*/React.createElement("label", null, "Dein Provisionsumsatz / Jahr ", /*#__PURE__*/React.createElement("b", null, fmtEUR(gross))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "150000",
    max: "600000",
    step: "10000",
    value: gross,
    onChange: e => setGross(+e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11.5,
      color: 'var(--fg4)',
      marginTop: 8,
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u20AC150k \xB7 Zugang"), /*#__PURE__*/React.createElement("span", null, "\u20AC600k"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--fg2)',
      marginBottom: 12
    }
  }, "Dein heutiges Modell"), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, MODELS.map((x, i) => /*#__PURE__*/React.createElement("button", {
    key: x.k,
    className: i === mi ? 'on' : '',
    onClick: () => setMi(i)
  }, x.k))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--fg3)',
      lineHeight: 1.55,
      marginTop: 14
    }
  }, m.note)), /*#__PURE__*/React.createElement("div", {
    className: "funnel-feedback good",
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ficon"
  }, /*#__PURE__*/React.createElement(Icon.check, {
    size: 18,
    sw: 2.5
  })), /*#__PURE__*/React.createElement("span", {
    className: "ftxt"
  }, "CIRCLE-Zugang ab ", /*#__PURE__*/React.createElement("b", null, "\u20AC150K"), " Track-Record. Dein Split ist gestaffelt: die ersten ", /*#__PURE__*/React.createElement("b", null, "\u20AC150K zu 85 %"), ", jeder weitere Euro zu ", /*#__PURE__*/React.createElement("b", null, "100 %"), " \u2014 im Schnitt ", Math.round(effSplit * 100), " %."))), /*#__PURE__*/React.createElement("div", {
    className: "calc-out"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calc-compare"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ccol"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cch"
  }, /*#__PURE__*/React.createElement("span", null, "Heute \xB7 ", m.k), /*#__PURE__*/React.createElement("span", {
    className: "ccv"
  }, fmtEUR(tradNet))), /*#__PURE__*/React.createElement(SegBar, {
    progress: seen ? tradNet / max : 0,
    segN: 32,
    height: 26,
    muted: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg4)',
      marginTop: 6
    }
  }, m.keep < 1 ? Math.round(m.keep * 100) + ' % Split' : '100 % Split', " \xB7 ", m.costNote)), /*#__PURE__*/React.createElement("div", {
    className: "ccol win"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cch"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--orange)'
    }
  }, "Mit UNIO CIRCLE"), /*#__PURE__*/React.createElement("span", {
    className: "ccv"
  }, fmtEUR(unioNet))), /*#__PURE__*/React.createElement(SegBar, {
    progress: seen ? unioNet / max : 0,
    segN: 32,
    height: 26
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--fg4)',
      marginTop: 6
    }
  }, "\xD8 ", Math.round(effSplit * 100), " % Split \xB7 \u20AC599/Mt Paket inkl. allem"))), /*#__PURE__*/React.createElement("div", {
    className: "calc-delta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cdlabel"
  }, "Das bleibt zus\xE4tzlich bei dir"), /*#__PURE__*/React.createElement("div", {
    className: "cdval",
    style: {
      color: delta >= 0 ? 'var(--orange-deep)' : 'var(--fg2)'
    }
  }, delta >= 0 ? '+' : '', fmtEUR(delta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.42em',
      color: 'var(--fg3)',
      fontWeight: 600
    }
  }, " / Jahr")), /*#__PURE__*/React.createElement("div", {
    className: "cdsub"
  }, "Gestaffelter Split (85 % bis \u20AC150K, 100 % dar\xFCber) abz\xFCglich Infrastruktur (CIRCLE: \u20AC599/Monat statt Eigenbau). Plus: Dealflow, Personal Brand & Unternehmensbeteiligung \u2014 hier nicht eingerechnet."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-p btn-lg",
    style: {
      marginTop: 22
    },
    onClick: onOpen
  }, "Mein 100 %-Modell sichern ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 16
  }))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--fg4)',
      marginTop: 16,
      maxWidth: 760,
      lineHeight: 1.5
    }
  }, "Modellrechnung zur Veranschaulichung auf Basis realer CIRCLE-Konditionen. Tats\xE4chliche Werte h\xE4ngen von Split-Vereinbarung, Kostenstruktur und genutzten Modulen ab.")));
}

/* ---------- COMMUNITY ACCESS ---------- */
const ACCESS = [{
  icon: /*#__PURE__*/React.createElement(Icon.building, {
    size: 20
  }),
  h: 'Büro · 1010 Wien',
  d: 'Tegetthoffstraße 3 — freie Platzwahl, Besprechungsraum, Meeting Lounge, Kaffee & Drucker.'
}, {
  icon: /*#__PURE__*/React.createElement(Icon.chart, {
    size: 20
  }),
  h: 'ImmoUnited-Zugriff',
  d: 'ImmoMapping, ImmoStats, Developer Wien & NÖ, ImmoFarming — die volle Datenbasis.'
}, {
  icon: /*#__PURE__*/React.createElement(Icon.layers, {
    size: 20
  }),
  h: 'Digitale Infrastruktur',
  d: 'Google Workspace mit eigener Domain, Kalender, Docs — plus KI-Assistent.'
}, {
  icon: /*#__PURE__*/React.createElement(Icon.shield, {
    size: 20
  }),
  h: 'Rechtlicher Schutz',
  d: 'Haftpflicht (1 Mio €) und Rechtsschutz (bis 25.000 €) — UNIO als Haftungsdach.'
}, {
  icon: /*#__PURE__*/React.createElement(Icon.trending, {
    size: 20
  }),
  h: 'Inserate-Power',
  d: '15 Inserate / Monat auf Willhaben, ImmoScout24, ImmoWelt & FindHeim.'
}, {
  icon: /*#__PURE__*/React.createElement(Icon.bolt, {
    size: 20
  }),
  h: 'UNIO Platform',
  d: 'Automatisiertes Backoffice, Makler-CRM, intelligentes Lead Management, digitales Closing.'
}];
function CommunityAccess() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 24,
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head",
    style: {
      marginBottom: 0,
      maxWidth: 620
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Community Access \xB7 ab Tag 1"), /*#__PURE__*/React.createElement("h2", null, "Sechs Bereiche. Ein Paket."), /*#__PURE__*/React.createElement("p", null, "Was ein selbstst\xE4ndiger Makler sonst einzeln zusammensucht und verhandelt \u2014 bei UNIO inklusive.")), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: '22px 26px',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      fontWeight: 600
    }
  }, "Eigenbau ~\u20AC4.755/M vs. UNIO \u20AC599/M"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 34,
      letterSpacing: '-.03em',
      color: 'var(--orange)',
      marginTop: 6
    }
  }, "+", /*#__PURE__*/React.createElement(Num, {
    end: 23292,
    prefix: "\u20AC",
    suffix: " / Jahr",
    dur: 1300
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginTop: 4
    }
  }, "plus die Zeit, die du nicht in Verwaltung verlierst"))), /*#__PURE__*/React.createElement("div", {
    className: "props",
    style: {
      gridTemplateColumns: 'repeat(3,1fr)'
    }
  }, ACCESS.map((a, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: a.h,
    style: {
      transitionDelay: i % 3 * 70 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 26,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ricon",
    style: {
      width: 42,
      height: 42
    }
  }, a.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16.5,
      marginTop: 16,
      letterSpacing: '-.01em'
    }
  }, a.h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      color: 'var(--fg2)',
      lineHeight: 1.55,
      marginTop: 8
    }
  }, a.d)))))));
}

/* ---------- BRAND CASE (@linda.vienna) ---------- */
function BrandCase() {
  const stats = [[116525, 'Aufrufe · 1 Reel · 16 Sek.', ''], [4391, 'Follower organisch', ''], [541, 'Saves = warme Leads', ''], [173, 'Profil-Klicks aus 1 Reel', '']];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '.95fr 1.05fr',
      gap: 56,
      alignItems: 'center'
    },
    className: "comm-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Personal Brand in Aktion"), /*#__PURE__*/React.createElement(RevealText, {
    style: {
      fontWeight: 600,
      letterSpacing: '-.03em',
      fontSize: 'clamp(28px,3.4vw,44px)',
      marginTop: 14,
      lineHeight: 1.06
    }
  }, "Deine Marke.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent-deep"
  }, "Dein Asset. Lebenslang.")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg2)',
      fontSize: 16,
      lineHeight: 1.6,
      marginTop: 16,
      maxWidth: 480
    }
  }, "Ein Inhouse-Team produziert unter deinem Namen: 3 Kurzvideos, 10 Fotos und 2 Grafiken im Monat \u2014 inkl. deiner eigenen Personal-Brand-Website. Volle IP-Rechte ab Produktion. Verl\xE4sst du UNIO, nimmst du alles mit."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 22,
      flexWrap: 'wrap'
    }
  }, ['Markenstrategie', 'Content-Produktion', 'Funnel-Integration', 'Deine Website'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    className: "chip"
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 34,
      boxShadow: 'var(--shadow-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Linda Vienna",
    size: 44
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15
    }
  }, "@linda.vienna"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--fg3)'
    }
  }, "Top-Maklerin im UNIO-Netzwerk \xB7 Wien")), /*#__PURE__*/React.createElement("span", {
    className: "live",
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), "LIVE")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginTop: 18
    }
  }, stats.map(([n, k]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "card-inset",
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 28,
      letterSpacing: '-.03em',
      color: 'var(--orange)'
    }
  }, /*#__PURE__*/React.createElement(Num, {
    end: n
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginTop: 6,
      lineHeight: 1.35
    }
  }, k)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 12.5,
      color: 'var(--fg3)',
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon.spark, {
    size: 14
  }), " Reichweite als Resultat eines Systems \u2014 kein Gl\xFCcksfall.")))));
}
function LensSectionM() {
  const nav = [{
    items: [['Dashboard', 'chart'], ['Suggested Actions', 'spark'], ['Kontakte', 'users'], ['Immobilien', 'building'], ['Angebote', 'euro'], ['Kalender', 'clock']]
  }, {
    h: 'Brand',
    items: [['Personal Brand', 'trending']]
  }];
  const kpis = [{
    k: 'Offene Leads',
    v: '57',
    s: '12 mit hoher Kaufabsicht',
    icon: 'layers',
    spark: [30, 36, 34, 44, 40, 50, 54, 58, 62, 57]
  }, {
    k: 'Intent ≥ 75',
    v: '41 %',
    s: 'bereit für nächsten Schritt',
    icon: 'gauge',
    col: 'var(--lx-gold)',
    spark: [20, 24, 28, 30, 34, 36, 38, 40, 41, 41]
  }, {
    k: 'Provisionssicherung',
    v: '64 %',
    s: '38 von 59 Interessenten',
    icon: 'shield',
    spark: [30, 36, 40, 44, 50, 54, 58, 60, 62, 64]
  }, {
    k: 'Abschlüsse · 30 T',
    v: '20',
    s: 'erledigte Actions',
    icon: 'check',
    spark: [6, 8, 10, 12, 14, 16, 17, 18, 19, 20]
  }, {
    k: 'Ø Reaktionszeit',
    v: '40,4 h',
    s: 'bis erster View',
    icon: 'clock',
    col: 'var(--lx-grey)',
    spark: [70, 66, 64, 58, 55, 50, 48, 46, 44, 40]
  }, {
    k: 'Pipeline',
    v: '€3,1 Mio',
    s: 'in aktiver Betreuung',
    icon: 'euro',
    col: 'var(--lx-gold)',
    spark: [40, 44, 48, 52, 55, 60, 64, 68, 72, 78]
  }];
  const wide = {
    t: 'Aktivitätsverlauf',
    s: 'Erstellte, angesehene & erledigte Actions · 30 Tage',
    legend: [{
      c: 'var(--orange)',
      l: 'Erstellt'
    }, {
      c: 'var(--lx-gold)',
      l: 'Angesehen'
    }, {
      c: 'var(--lx-grey)',
      l: 'Erledigt'
    }]
  };
  const right = [/*#__PURE__*/React.createElement("div", {
    className: "lx-card",
    key: "r"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-ct"
  }, "Conversion-Ringe"), /*#__PURE__*/React.createElement("div", {
    className: "lx-cs"
  }, "\xDCberg\xE4nge entlang des Funnels"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(ActivityRings, {
    rings: [{
      c: 'var(--orange)',
      v: 78
    }, {
      c: 'var(--lx-grey)',
      v: 54
    }, {
      c: 'var(--lx-gold)',
      v: 31
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "lx-ringlegend",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lx-rl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--orange)'
    }
  }), "Leads \u2192 Besichtigung", /*#__PURE__*/React.createElement("span", {
    className: "rn"
  }, "78 %")), /*#__PURE__*/React.createElement("div", {
    className: "lx-rl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--lx-grey)'
    }
  }), "Besichtigung \u2192 Angebot", /*#__PURE__*/React.createElement("span", {
    className: "rn"
  }, "54 %")), /*#__PURE__*/React.createElement("div", {
    className: "lx-rl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--lx-gold)'
    }
  }), "Angebot \u2192 Abschluss", /*#__PURE__*/React.createElement("span", {
    className: "rn"
  }, "31 %"))))), /*#__PURE__*/React.createElement("div", {
    className: "lx-card",
    key: "p"
  }, /*#__PURE__*/React.createElement(ProgressKpi, {
    variant: "solid",
    title: "Provisionssicherung best\xE4tigt",
    value: 64,
    note: "38 von 59 Interessenten"
  }))];
  const board = /*#__PURE__*/React.createElement(LensBoard, {
    title: "Makler-Cockpit",
    sub: "Deine Leads, dein Intent, deine Provision \u2014 in Echtzeit.",
    nav: nav,
    active: "Dashboard",
    banner: {
      chips: [{
        t: 'ink',
        l: 'Maklersicht'
      }, {
        t: 'org',
        l: 'Daniel Hayden'
      }, {
        t: 'gold',
        l: '30 Tage'
      }],
      h: 'Deine Suggested Actions',
      p: 'Lead-Status, Intent-Score und Provisionssicherung in einer Sicht — damit du nur dort Zeit investierst, wo es zählt.'
    },
    kpis: kpis,
    wide: wide,
    right: right
  });
  const steps = [{
    k: 'Überblick',
    t: 'Dein Cockpit, nicht das der Agentur',
    p: 'Deine Kunden, deine Pipeline, deine Provision — transparent und jederzeit abrufbar.',
    sel: null
  }, {
    k: 'Kennzahlen',
    t: 'Deine Zahlen, live',
    p: 'Offene Leads, Intent-Score und Provisionssicherung — automatisch aktualisiert.',
    sel: '.lx-kpis',
    pad: 14
  }, {
    k: 'Aktivität',
    t: 'Was deine Leads tun',
    p: 'Erstellt, angesehen, erledigt — du siehst, wo Bewegung ist und wann du dran bist.',
    sel: '.lx-wide'
  }, {
    k: 'Conversion',
    t: 'Vom Intent zur Provision',
    p: 'Conversion-Ringe und gesicherte Provision — das System priorisiert deinen nächsten Schritt.',
    sel: '.lx-rcol'
  }];
  return /*#__PURE__*/React.createElement(LensScrollSection, {
    id: "lens",
    kicker: "LENS \xB7 Dein Operating System",
    h: "Dein Cockpit. Ein Vorgeschmack.",
    sub: "So arbeitest du im CIRCLE: scrolle durch dein Dashboard, das deine Leads qualifiziert, priorisiert und deine Provision sichert.",
    board: board,
    steps: steps,
    cta: "Dashboard ansehen"
  });
}

/* ---------- FUNNEL ---------- */
function FunnelM({
  onClose
}) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    status: null,
    umsatz: null,
    region: '',
    fokus: null,
    wichtig: [],
    name: '',
    email: '',
    tel: '',
    social: ''
  });
  const total = 5;
  const set = (k, v) => setD(s => ({
    ...s,
    [k]: v
  }));
  const next = () => setStep(s => Math.min(total, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));
  const qualifies = d.umsatz === '150-300k' || d.umsatz === '300k+';
  const canNext = [!!d.status, !!d.umsatz, d.region.trim().length > 1 && !!d.fokus, d.wichtig.length > 0, d.name.trim() && /.+@.+\..+/.test(d.email)][step];
  if (step === total) {
    return /*#__PURE__*/React.createElement(FunnelShell, {
      title: "CIRCLE Bewerbung",
      step: total,
      total: total,
      progress: 100,
      onClose: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "funnel-done"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ring-wrap"
    }, /*#__PURE__*/React.createElement(Ring, {
      size: 84,
      w: 9,
      color: "var(--orange)",
      track: "var(--track)"
    })), /*#__PURE__*/React.createElement("h3", null, "Willkommen in der Bewegung, ", d.name.split(' ')[0], "!"), /*#__PURE__*/React.createElement("p", null, qualifies ? 'Dein Track-Record erfüllt das Zugangskriterium. Wir melden uns innerhalb von 48 Stunden für ein persönliches Kennenlernen — und zeigen dir dein gestaffeltes 85/100 %-Modell.' : 'Danke für deine Bewerbung! CIRCLE-Zugang beginnt bei €150K Track-Record — wir prüfen dein Profil persönlich und melden uns innerhalb von 48 Stunden mit deinem Weg dahin.'), /*#__PURE__*/React.createElement("div", {
      className: "summary"
    }, /*#__PURE__*/React.createElement("div", {
      className: "srow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sk"
    }, "Status"), /*#__PURE__*/React.createElement("span", {
      className: "sv"
    }, d.status)), /*#__PURE__*/React.createElement("div", {
      className: "srow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sk"
    }, "Track-Record"), /*#__PURE__*/React.createElement("span", {
      className: "sv"
    }, d.umsatz)), /*#__PURE__*/React.createElement("div", {
      className: "srow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sk"
    }, "Region \xB7 Fokus"), /*#__PURE__*/React.createElement("span", {
      className: "sv"
    }, d.region, " \xB7 ", d.fokus)), /*#__PURE__*/React.createElement("div", {
      className: "srow"
    }, /*#__PURE__*/React.createElement("span", {
      className: "sk"
    }, "Konditionsmodell"), /*#__PURE__*/React.createElement("span", {
      className: "sv",
      style: {
        color: 'var(--orange)'
      }
    }, qualifies ? '85 % / 100 % gestaffelt' : 'Zugang ab €150K'))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-p btn-lg",
      onClick: onClose
    }, "Schlie\xDFen"))));
  }
  return /*#__PURE__*/React.createElement(FunnelShell, {
    title: "CIRCLE Bewerbung",
    step: step + 1,
    total: total,
    progress: step / total * 100,
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement("div", {
      className: "funnel-foot"
    }, step > 0 && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-g back",
      onClick: back
    }, "Zur\xFCck"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-p btn-lg",
      style: {
        marginLeft: step > 0 ? 0 : 'auto'
      },
      disabled: !canNext,
      onClick: next
    }, step === total - 1 ? 'Bewerbung senden' : 'Weiter', " ", /*#__PURE__*/React.createElement(Icon.arrow, {
      size: 16
    })))
  }, /*#__PURE__*/React.createElement("div", {
    className: "funnel-body"
  }, step === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Wo stehst du heute?"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "Damit wir verstehen, was dich aktuell ausbremst."), /*#__PURE__*/React.createElement(OptionList, {
    value: d.status,
    onChange: v => set('status', v),
    options: [{
      v: 'Angestellter Makler',
      l: 'Angestellter Makler',
      d: 'Provision großteils beim Arbeitgeber'
    }, {
      v: 'Selbstständiger Kooperationspartner',
      l: 'Selbstständiger Kooperationspartner',
      d: 'Selbstständig, aber nicht unabhängig'
    }, {
      v: 'Eigenständiger Makler',
      l: 'Eigenständiger Makler',
      d: 'Eigenes Unternehmen, viel Admin'
    }, {
      v: 'Quereinsteiger',
      l: 'Quereinsteiger / Aufbau',
      d: 'Auf dem Weg in den Vertrieb'
    }]
  })), step === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Dein bisheriger Provisionsumsatz (p. a.)?"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "CIRCLE-Zugang beginnt bei \u20AC150K Track-Record \u2014 darunter ist (noch) kein Einstieg m\xF6glich."), /*#__PURE__*/React.createElement(OptionList, {
    value: d.umsatz,
    onChange: v => set('umsatz', v),
    options: [{
      v: '<50k',
      l: 'Unter €50.000'
    }, {
      v: '50-150k',
      l: '€50.000 – €150.000'
    }, {
      v: '150-300k',
      l: '€150.000 – €300.000'
    }, {
      v: '300k+',
      l: 'Über €300.000'
    }]
  }), d.umsatz && (qualifies ? /*#__PURE__*/React.createElement("div", {
    className: "funnel-feedback good"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ficon"
  }, /*#__PURE__*/React.createElement(Icon.check, {
    size: 18,
    sw: 2.5
  })), /*#__PURE__*/React.createElement("span", {
    className: "ftxt"
  }, "Du erf\xFCllst das Zugangskriterium (ab \u20AC150K). Dein Split ist gestaffelt: ", /*#__PURE__*/React.createElement("b", null, "85 % bis \u20AC150K, 100 % dar\xFCber"), " \u2014 plus Beteiligung am Netzwerk.")) : /*#__PURE__*/React.createElement("div", {
    className: "funnel-feedback"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ficon"
  }, /*#__PURE__*/React.createElement(Icon.spark, {
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "ftxt"
  }, "CIRCLE-Zugang beginnt bei ", /*#__PURE__*/React.createElement("b", null, "\u20AC150K"), " Track-Record. Aktuell noch nicht erreicht \u2014 wir zeigen dir gerne den Weg dahin.")))), step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Region & Schwerpunkt"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "So matchen wir dich mit dem passenden Dealflow."), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("label", null, "Region / Markt"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "z. B. Wien & Umgebung",
    value: d.region,
    onChange: e => set('region', e.target.value)
  })), /*#__PURE__*/React.createElement(OptionList, {
    value: d.fokus,
    onChange: v => set('fokus', v),
    options: [{
      v: 'Wohnen',
      l: 'Wohnen'
    }, {
      v: 'Anlage / Vorsorge',
      l: 'Anlage / Vorsorge'
    }, {
      v: 'Gewerbe',
      l: 'Gewerbe'
    }, {
      v: 'Neubauprojekte',
      l: 'Neubauprojekte'
    }]
  })), step === 3 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Was ist dir am wichtigsten?"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "Mehrfachauswahl \u2014 daran richten wir dein Onboarding aus."), /*#__PURE__*/React.createElement(OptionList, {
    multi: true,
    value: d.wichtig,
    onChange: v => set('wichtig', v),
    options: [{
      v: 'Eigene Marke aufbauen',
      l: 'Eigene Marke aufbauen'
    }, {
      v: 'Mehr von meiner Provision',
      l: 'Mehr von meiner Provision'
    }, {
      v: 'Verlässlicher Dealflow',
      l: 'Verlässlicher Dealflow'
    }, {
      v: 'Beteiligung & Ownership',
      l: 'Beteiligung & Ownership'
    }]
  })), step === 4 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Wie erreichen wir dich?"), /*#__PURE__*/React.createElement("p", {
    className: "fsub"
  }, "Wir melden uns pers\xF6nlich innerhalb von 48 Stunden."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "Name *"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: d.name,
    onChange: e => set('name', e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "Telefon"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: d.tel,
    onChange: e => set('tel', e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "E-Mail *"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "email",
    value: d.email,
    onChange: e => set('email', e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, "Instagram / LinkedIn"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    placeholder: "@\u2026",
    value: d.social,
    onChange: e => set('social', e.target.value)
  }))))));
}
function CTAM({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground",
    id: "bewerben"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ringbg"
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 260,
    w: 9,
    color: "var(--orange)"
  })), /*#__PURE__*/React.createElement("span", {
    className: "kicker on-dark"
  }, "Werde Teil der Community"), /*#__PURE__*/React.createElement(RevealText, {
    style: {
      marginTop: 14
    }
  }, "Dein Anteil.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "Deine Provision.")), /*#__PURE__*/React.createElement("p", null, "CIRCLE gibt dir System, Dealflow und Upside. Bewirb dich \u2014 und werde CIRCLE Partner."), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-p btn-xl",
    onClick: onOpen
  }, "Jetzt bewerben ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 18
  }))))));
}
function App() {
  const [open, setOpen] = useState(false);
  const openF = () => setOpen(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    active: "makler",
    cta: {
      label: "Jetzt bewerben",
      onClick: openF
    }
  }), /*#__PURE__*/React.createElement(HeroM, {
    onOpen: openF
  }), /*#__PURE__*/React.createElement(Ticker, {
    items: [['100%', 'Provision ab €150K'], ['49%', 'Share an Top-Performer'], ['20%', 'Gewinn-Ausschüttung'], ['25%', 'passiv aus Recruits'], ['3 Mio €', 'Umsatz 2025'], ['1 Mrd', 'Reichweite']]
  }), /*#__PURE__*/React.createElement(ThreeQuestions, null), /*#__PURE__*/React.createElement(ProblemM, null), /*#__PURE__*/React.createElement(WhatIf, null), /*#__PURE__*/React.createElement(Solution, null), /*#__PURE__*/React.createElement(CommissionCalc, {
    onOpen: openF
  }), /*#__PURE__*/React.createElement(CommunityAccess, null), /*#__PURE__*/React.createElement(PlatformBento, null), /*#__PURE__*/React.createElement(PlatformTour, null), /*#__PURE__*/React.createElement(Values, null), /*#__PURE__*/React.createElement(BrandCase, null), /*#__PURE__*/React.createElement(Compare, null), /*#__PURE__*/React.createElement(CTAM, {
    onOpen: openF
  }), /*#__PURE__*/React.createElement(Footer, null), open && /*#__PURE__*/React.createElement(FunnelM, {
    onClose: () => setOpen(false)
  }));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Unio Homepage/_src/page-makler.jsx", error: String((e && e.message) || e) }); }

// uploads/Unio Homepage/_src/page-story.jsx
try { (() => {
/* ===================== STORY / ÜBER UNS ===================== */

function HeroS() {
  const ref = useRef();
  useHeroFx(ref);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero hero-1col",
    ref: ref
  }, /*#__PURE__*/React.createElement(HeroBg, null), /*#__PURE__*/React.createElement("div", {
    className: "hero-orb ring-spin",
    style: {
      right: '8%',
      top: '0%'
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 300,
    w: 2.5,
    color: "rgba(255,170,9,.38)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide hero-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "2054 \u2014 Fusion"), /*#__PURE__*/React.createElement(RevealText, {
    tag: "h1",
    style: {
      fontSize: 'clamp(38px,5vw,68px)'
    }
  }, "F\xFCnf Unternehmen.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "Eine Mission.")), /*#__PURE__*/React.createElement("p", {
    className: "sub",
    style: {
      maxWidth: 580
    }
  }, "Drei etablierte Wiener Spieler \u2014 Vertrieb, Marketing und Technologie \u2014 die in der Branche sonst getrennt arbeiten. Jetzt unter einem Dach und in einer Logik: Data-Powered Real Estate."), /*#__PURE__*/React.createElement("div", {
    className: "statline",
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "300", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Mio \u20AC vermittelt")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "50 Mio", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Zeilen Code")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "3 Mio \u20AC"), /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, "Umsatz 2025"))))));
}
const TEAM = [{
  tag: '01 · Vertrieb',
  n: 'BOOM LIVING',
  d: 'Wiener Vertriebshaus, 1. Bezirk. 20 Mitarbeiter. Lange Liste erfolgreich abverkaufter Wohnbauprojekte.',
  note: 'Closing-Power & Vertriebs-DNA',
  icon: /*#__PURE__*/React.createElement(Icon.users, {
    size: 22
  })
}, {
  tag: '02 · Marketing',
  n: 'AD BOUTIQUE',
  d: 'Performance-Marketing-Einheit mit Real-Estate-Fokus. Gegründet vom ehemaligen Head of Digital Marketing bei Soravia.',
  note: 'Betreut Rhomberg · Winegg · Soravia',
  icon: /*#__PURE__*/React.createElement(Icon.trending, {
    size: 22
  })
}, {
  tag: '03 · Technologie',
  n: 'appworks',
  d: 'Eigenständiges Entwicklungsteam. Liefert die technologische Infrastruktur — NOVA, CIRCLE-Tools, LENS.',
  note: 'Eigene Plattform, kein Stack-Flickwerk',
  icon: /*#__PURE__*/React.createElement(Icon.layers, {
    size: 22
  })
}];
function Team() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec",
    id: "team"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Wer wir sind"), /*#__PURE__*/React.createElement("h2", null, "Drei Disziplinen, ein System."), /*#__PURE__*/React.createElement("p", null, "Marketing, Software und Vertrieb in einer Schleife \u2014 nicht in drei Silos.")), /*#__PURE__*/React.createElement("div", {
    className: "routes"
  }, TEAM.map((t, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t.n,
    style: {
      transitionDelay: i * 80 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "route",
    style: {
      minHeight: 268
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ricon"
  }, t.icon), /*#__PURE__*/React.createElement("div", {
    className: "pill pill-o",
    style: {
      alignSelf: 'flex-start',
      marginTop: 18
    }
  }, t.tag), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 12,
      fontSize: 24
    }
  }, t.n), /*#__PURE__*/React.createElement("p", null, t.d), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 16,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--orange)',
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon.check, {
    size: 15,
    sw: 2.5
  }), " ", t.note)))))));
}
function Category() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ink"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker on-dark"
  }, "Die Kategorie"), /*#__PURE__*/React.createElement(RevealText, {
    style: {
      fontWeight: 600,
      letterSpacing: '-.03em',
      fontSize: 'clamp(32px,4.6vw,60px)',
      lineHeight: 1.04,
      marginTop: 18,
      maxWidth: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, "Nicht graduell besser.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent-deep"
  }, "Strukturell anders.")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg2)',
      fontSize: 18,
      lineHeight: 1.6,
      marginTop: 22,
      maxWidth: 640,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, "UNIO baut im Wiener Wohnbau eine neue Vertriebskategorie auf \u2014 ein lernendes System statt einer statischen Kampagne. Jeder generiert Leads. Kaum jemand verkauft planbar.")));
}
const CAPS = [['Top-Performer Makler', 'Zugriff auf die UNIO Agent Community aus selbstständigen Maklern mit min. €150K Track-Record.'], ['High-End Marketing', 'Performance-getriebene Leadgenerierung, die Projekte schneller abverkauft — vom Echtzeit-Testing bis zur Anfragequalität.'], ['State-of-the-Art Software', 'Ein Operating System, das Leads, Pipeline und Closing strukturiert — damit Makler schneller abschließen.'], ['Data Analytics', 'Scoring, Insights und Prognosen zeigen, was wirklich funktioniert — und wo als Nächstes anzusetzen ist.']];
function Capabilities() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Fusion"), /*#__PURE__*/React.createElement("h2", null, "Was in einem System zusammenkommt")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    },
    className: "props"
  }, CAPS.map(([h, d], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: h,
    style: {
      transitionDelay: i * 70 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 30,
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 40,
    w: 7,
    color: "var(--orange)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 19,
      letterSpacing: '-.01em'
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      color: 'var(--fg2)',
      lineHeight: 1.6,
      marginTop: 8
    }
  }, d))))))));
}
const PROCS = [['01', 'Analyse', 'Makro/Mikro, Leistbarkeit, Wettbewerb'], ['02', 'NOVA', 'Mix, Grundrisse, Pricing, Personas'], ['03', 'Positionierung', 'Messaging, Visuals, Content-System'], ['04', 'Performance', 'KI-Audience, Creatives, Attribution'], ['05', 'CIRCLE', 'Lead-Qualifizierung & Vertrieb'], ['06', 'LENS', 'Real-Time KPIs, ROI, Feedback-Loop']];
function ProcessS() {
  const ref = useRef();
  const p = useScrollProgress(ref, {
    start: 0.58,
    end: 0.3
  });
  const lit = p * PROCS.length;
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker"
  }, "Der UNIO-Prozess"), /*#__PURE__*/React.createElement("h2", null, "Von der Analyse zum lernenden Feedback-Loop")), /*#__PURE__*/React.createElement("div", {
    className: "flow",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-line"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: Math.min(1, p * 1.05) * 100 + '%'
    }
  })), PROCS.map(([n, t, d], k) => /*#__PURE__*/React.createElement("div", {
    className: "fnode" + (k < lit ? ' on' : ''),
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    className: "fdot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "fnum"
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "ft"
  }, t), /*#__PURE__*/React.createElement("div", {
    className: "fp"
  }, d))))));
}
function ViennaBand() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo-band",
    style: {
      height: 'clamp(300px,38vw,480px)'
    }
  }, /*#__PURE__*/React.createElement(Parallax, {
    amount: 44,
    style: {
      position: 'absolute',
      inset: '-8% 0'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    src: IMG.schoenbrunn,
    pos: "center",
    overlay: "linear-gradient(90deg,rgba(14,15,17,.55),rgba(14,15,17,.1) 60%)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#fff',
      maxWidth: 540
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kicker",
    style: {
      color: 'var(--orange)'
    }
  }, "Wien \xB7 Heimmarkt"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontWeight: 600,
      letterSpacing: '-.03em',
      fontSize: 'clamp(26px,3.4vw,46px)',
      lineHeight: 1.06,
      marginTop: 14,
      textShadow: '0 2px 22px rgba(0,0,0,.4)'
    }
  }, "Gebaut f\xFCr den Wiener Wohnbau."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      marginTop: 16,
      color: 'rgba(255,255,255,.86)',
      maxWidth: 460
    }
  }, "Drei etablierte Wiener H\xE4user \u2014 Vertrieb, Marketing, Technologie \u2014 die den Markt kennen, in dem sie Kategorie neu definieren.")))));
}
function ValuesS() {
  const v = ['Transparency', 'Empowerment', 'Technologie', 'Data Ownership'];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      display: 'flex',
      gap: 'clamp(20px,4vw,56px)',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    }
  }, v.map(x => /*#__PURE__*/React.createElement("div", {
    key: x,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flex: '1 1 200px'
    }
  }, /*#__PURE__*/React.createElement(IconMark, {
    size: 30
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 'clamp(17px,1.9vw,23px)',
      letterSpacing: '-.01em'
    }
  }, x)))));
}
function VisionCTA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec ground",
    style: {
      paddingBottom: 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ringbg"
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 260,
    w: 9,
    color: "var(--orange)"
  })), /*#__PURE__*/React.createElement(RevealText, null, "Automation where it ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "matters."), /*#__PURE__*/React.createElement("br", null), "Human where it counts."), /*#__PURE__*/React.createElement("p", null, "UNIO verwandelt komplexe Daten in klare Handlungsentscheidungen \u2014 vom Testing bis zum Verkauf. Messbar, transparent, effizient."), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-p btn-xl",
    href: "bautraeger.html"
  }, "F\xFCr Bautr\xE4ger ", /*#__PURE__*/React.createElement(Icon.arrow, {
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-g btn-xl",
    href: "makler.html"
  }, "F\xFCr Makler")))));
}
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    active: "story"
  }), /*#__PURE__*/React.createElement(HeroS, null), /*#__PURE__*/React.createElement(Ticker, null), /*#__PURE__*/React.createElement(Team, null), /*#__PURE__*/React.createElement(ViennaBand, null), /*#__PURE__*/React.createElement(Category, null), /*#__PURE__*/React.createElement(Capabilities, null), /*#__PURE__*/React.createElement(ProcessS, null), /*#__PURE__*/React.createElement(ValuesS, null), /*#__PURE__*/React.createElement(VisionCTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "uploads/Unio Homepage/_src/page-story.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.DataLabel = __ds_scope.DataLabel;

__ds_ns.DataOverlay = __ds_scope.DataOverlay;

__ds_ns.FlutedGlass = __ds_scope.FlutedGlass;

__ds_ns.GlassCard = __ds_scope.GlassCard;

__ds_ns.GlassPanel = __ds_scope.GlassPanel;

__ds_ns.StatBlock = __ds_scope.StatBlock;

})();
