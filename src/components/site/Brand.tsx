import { brandConfig } from "../../brand.config";

/**
 * Goom brand assets — now dynamically pulling paths from brand.config.ts.
 *
 * LogoMark     → the standalone 'g' icon mark (tight spaces, favicon-adjacent)
 * Wordmark     → the 'goom' wordmark only
 * FullLogo     → the 'goom.et' full logo with domain
 *
 * `tone="invert"` applies CSS invert for use on dark (foreground) backgrounds.
 */

type Tone = "default" | "invert";

const toneClass = (tone: Tone) =>
  tone === "invert"
    ? "brightness-0 invert dark:invert-0" // White in light mode (on dark bg), Black in dark mode (on light bg)
    : "dark:brightness-0 dark:invert";    // Black in light mode (on light bg), White in dark mode (on dark bg)

/** The standalone icon mark — used in the nav and tight spots. */
export function LogoMark({
  className = "h-7 w-auto",
  tone = "default",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <img
      src={brandConfig.logos.mark}
      alt={brandConfig.companyName}
      className={`object-contain ${toneClass(tone)} ${className}`}
      draggable={false}
    />
  );
}

/** The main wordmark. */
export function Wordmark({
  className = "h-5 w-auto",
  tone = "default",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <img
      src={brandConfig.logos.wordmark}
      alt={brandConfig.companyName}
      className={`object-contain ${toneClass(tone)} ${className}`}
      draggable={false}
    />
  );
}

/** The full logo — use in the footer brand area. */
export function FullLogo({
  className = "h-6 w-auto",
  tone = "default",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <img
      src={brandConfig.logos.full}
      alt={brandConfig.companyName}
      className={`object-contain ${toneClass(tone)} ${className}`}
      draggable={false}
    />
  );
}

/**
 * @deprecated Use LogoMark instead.
 * Kept for backward compat with any existing imports of StarMark.
 */
export function StarMark({
  className = "h-7 w-7",
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "invert";
}) {
  return <LogoMark className={className} tone={tone} />;
}
