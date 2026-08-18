import { useEffect, useRef, useState } from "react";

/**
 * Parses a value like "12+", "$2.41M", "<40ms", "99.99%" into:
 *   prefix, numericTarget, suffix
 */
function parseValue(raw: string) {
  const match = raw.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: raw, decimals: 0 };
  const numericStr = match[2].replace(/,/g, "");
  const decimals = numericStr.includes(".") ? numericStr.split(".")[1].length : 0;
  return {
    prefix: match[1],
    target: parseFloat(numericStr),
    suffix: match[3],
    decimals,
  };
}

export function useCountUp(value: string, options?: { duration?: number; enabled?: boolean }) {
  const duration = options?.duration ?? 1400;
  const enabled = options?.enabled ?? true;
  const ref = useRef<HTMLElement | null>(null);
  const [displayed, setDisplayed] = useState(value);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const { prefix, target, suffix, decimals } = parseValue(value);

    if (typeof IntersectionObserver === "undefined" || Number.isNaN(target) || target === 0) {
      setDisplayed(value);
      return;
    }

    setDisplayed(`${prefix}${(0).toFixed(decimals)}${suffix}`);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(1, elapsed / duration);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = target * eased;
              setDisplayed(`${prefix}${current.toFixed(decimals)}${suffix}`);
              if (progress < 1) requestAnimationFrame(tick);
              else setDisplayed(value);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, enabled]);

  return { ref, displayed };
}

export function CountUp({
  value,
  className,
  duration,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const { ref, displayed } = useCountUp(value, { duration });
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {displayed}
    </span>
  );
}
