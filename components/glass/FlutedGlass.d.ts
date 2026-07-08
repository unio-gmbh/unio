/**
 * E4 — fluted / reeded glass distortion over an image; the visual symbol of market opacity.
 * Combine with `reveal` so part of the image is always clear (opacity → transparency story).
 * @startingPoint section="Glas-Primitive" subtitle="Riffelglas-Effekt mit Auflösung" viewport="700x420"
 */
export interface FlutedGlassProps {
  /** Cleared fraction 0–1 (0 = fully fluted). Animatable; transition built in. */
  reveal?: number;
  /** Which side becomes clear. Default "right". */
  side?: "left" | "right";
  /** Strip width in px. Default 14 (= --flute-width). */
  fluteWidth?: number;
  /** Max blur in px per flute. Default 12. */
  strength?: number;
  /** Border radius of the clipping container. Default 0. */
  radius?: number | string;
  style?: React.CSSProperties;
  /** The underlying real image (img / video / background div). */
  children?: React.ReactNode;
}
