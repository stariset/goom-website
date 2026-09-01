import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Goom" },
      { name: "description", content: "Goom — a small engineering studio founded in 2025. Story, values, and manifesto." },
      { property: "og:title", content: "About — Goom" },
      { property: "og:description", content: "Four engineers. One standard. Built to last." },
    ],
  }),
  component: AboutLayout,
});

const tabs = [
  { to: "/about", label: "Overview" },
  { to: "/about/story", label: "Story" },
  { to: "/about/values", label: "Values" },
  { to: "/about/manifesto", label: "Manifesto" },
] as const;

function AboutLayout() {
  const location = useLocation();
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-36 pb-0 overflow-hidden">
        <div className="absolute inset-0 grain-bg opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Top meta row */}
          <div className="flex items-center gap-4 text-mono text-[11px] text-muted-foreground">
            <span>ABOUT · GOOM</span>
            <span className="h-px w-6 bg-border" />
            <span>EST. 2025 · ADDIS ABABA</span>
          </div>

          {/* Split headline layout */}
          <div className="mt-8 grid lg:grid-cols-[1fr_0.55fr] gap-8 lg:gap-16 items-end pb-12 sm:pb-16">
            <h1 className="text-display text-4xl sm:text-5xl lg:text-6xl leading-[0.97]">
              Four engineers.<br />
              <span className="italic">One standard.</span><br />
              Built to last.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-sm">
              A small engineering studio, founded in 2025. We take on the hard problems and stay until the systems run quietly — then hand them over for good.
            </p>
          </div>
        </div>
      </section>

      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <section className="sticky top-[60px] sm:top-[72px] z-30 backdrop-blur-xl bg-background/80 border-y hairline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
            {tabs.map((t) => {
              const active =
                location.pathname === t.to ||
                (t.to === "/about" && location.pathname === "/about/");
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`relative shrink-0 px-4 py-3.5 text-[13px] transition-colors ${
                    active
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                  {active && (
                    <span className="absolute left-3 right-3 -bottom-px h-[2px] bg-foreground rounded-full" />
                  )}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="ml-auto hidden sm:inline-flex items-center gap-1.5 my-2 rounded-full bg-foreground text-background px-4 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              Work with us <ArrowUpRight className="h-3 w-3" />
            </Link>
          </nav>
        </div>
      </section>

      <Outlet />
    </>
  );
}
