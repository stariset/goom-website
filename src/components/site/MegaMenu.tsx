import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type MegaItem = {
  to: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  tag?: string;
};

export type MegaSection = {
  heading: string;
  items: MegaItem[];
};

export function MegaMenu({
  label,
  to,
  sections,
  feature,
}: {
  label: string;
  to: string;
  sections: MegaSection[];
  feature?: {
    eyebrow: string;
    title: string;
    body: string;
    to: string;
    cta: string;
  };
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <Link
        to={to}
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
        activeProps={{ className: "text-foreground" }}
        onFocus={openMenu}
      >
        {label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </Link>

      <div
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`w-[min(92vw,720px)] rounded-3xl hairline bg-background/95 backdrop-blur-2xl shadow-[0_24px_80px_-30px_rgba(0,0,0,0.25)] origin-top transition-all duration-300 ${
            open
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-1 scale-[0.98]"
          }`}
        >
          <div className={`grid ${feature ? "lg:grid-cols-[1.2fr_1fr]" : ""} gap-0`}>
            <div className="p-5 sm:p-6">
              {sections.map((section) => (
                <div key={section.heading} className="mb-3 last:mb-0">
                  <div className="px-3 pb-2 text-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                    {section.heading.toUpperCase()}
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-1">
                    {section.items.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-surface transition-colors"
                        >
                          {item.icon && (
                            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg hairline group-hover/item:bg-foreground group-hover/item:text-background transition-colors">
                              {item.icon}
                            </span>
                          )}
                          <span className="min-w-0">
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">
                                {item.label}
                              </span>
                              {item.tag && (
                                <span className="text-mono text-[9px] uppercase tracking-wider rounded-full lime-chip px-1.5 py-0.5">
                                  {item.tag}
                                </span>
                              )}
                            </span>
                            {item.description && (
                              <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                                {item.description}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {feature && (
              <Link
                to={feature.to}
                className="group/feature relative overflow-hidden rounded-3xl m-3 ml-0 bg-foreground text-background p-6 flex flex-col justify-between min-h-[200px]"
              >
                <span className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-[var(--lime)] opacity-25 blur-3xl transition-opacity duration-500 group-hover/feature:opacity-50" />
                <div className="relative">
                  <div className="text-mono text-[10px] text-background/60">
                    {feature.eyebrow.toUpperCase()}
                  </div>
                  <div className="mt-3 text-display text-2xl leading-tight">
                    {feature.title}
                  </div>
                  <p className="mt-2 text-xs text-background/70 leading-relaxed">
                    {feature.body}
                  </p>
                </div>
                <div className="relative inline-flex items-center gap-1.5 text-mono text-[11px] mt-4">
                  {feature.cta}
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover/feature:translate-x-0.5 group-hover/feature:-translate-y-0.5" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
