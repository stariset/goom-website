import { createFileRoute } from "@tanstack/react-router";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/about/manifesto")({
  head: () => ({
    meta: [
      { title: "About · Manifesto — Goom" },
      { name: "description", content: "The Goom manifesto — what we owe the work, the user, and each other." },
    ],
  }),
  component: Manifesto,
});

const items = [
  {
    n: "01",
    t: "Honesty.",
    body: "We tell the truth about what software can do, what it will cost, and how long it will take. The marketing is the product.",
  },
  {
    n: "02",
    t: "Care.",
    body: "Every system we ship is a system someone will run at 3am on a Saturday. We build for them.",
  },
  {
    n: "03",
    t: "Compounding.",
    body: "Each project teaches the next one. Each platform makes the next product faster to build. Nothing is one-off.",
  },
];

function Manifesto() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="text-center">
            <div className="text-mono text-[11px] text-muted-foreground">MANIFESTO · 001</div>
            <h2 className="mx-auto mt-4 max-w-2xl text-display text-3xl sm:text-5xl leading-[0.98]">
              We owe the work <span className="italic">three things.</span>
            </h2>
          </Reveal>

          <div className="mt-14 rounded-3xl hairline bg-background overflow-hidden divide-y divide-border">
            {items.map((item, i) => (
              <Reveal
                key={item.n}
                delay={i * 60}
                className="group relative grid sm:grid-cols-[auto_1fr] gap-3 sm:gap-10 items-baseline px-6 sm:px-10 py-8 sm:py-10 transition-colors duration-500 hover:bg-surface/60"
              >
                <span className="text-mono text-[11px] text-muted-foreground sm:pt-3">{item.n}</span>
                <div>
                  <h4 className="text-display text-3xl sm:text-[40px] leading-[1.05]">{item.t}</h4>
                  <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
                <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[var(--lime)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Reveal>
            ))}
          </div>

          {/* Closing quote */}
          <Reveal delay={240}>
            <div className="mt-16 text-center">
              <p className="text-display text-2xl sm:text-3xl lg:text-4xl leading-[1.1] text-foreground/80">
                "The fastest way to ship is to refuse to ship anything you wouldn't put your name on."
              </p>
              <div className="mt-6 text-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                — Four Engineers · Goom, 2025
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
