import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { ArrowUpRight, CheckCircle2, Globe, Package, Users, Zap } from "lucide-react";
import { Reveal } from "../components/site/Reveal";
import { CountUp } from "../hooks/use-count-up";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About · Overview — Goom" },
      { name: "description", content: "Goom at a glance — thesis, beliefs, and a short timeline." },
    ],
  }),
  component: AboutOverview,
});

function AboutOverview() {
  return (
    <>
      {/* ── Opening statement ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 border-b hairline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_0.5fr] gap-10 lg:gap-24 items-end">
            <Reveal>
              <div className="text-mono text-[10px] text-muted-foreground tracking-widest mb-6">WHO WE ARE</div>
              <p className="text-display text-2xl sm:text-3xl leading-[1.2]">
                We are four engineers who build software that companies run on.
                Systems designed to be <span className="italic">inherited</span>,
                not rewritten. Infrastructure that holds at 3am without anyone holding it.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-base text-muted-foreground leading-relaxed">
                Founded in 2025 in Addis Ababa. We take on the hard parts and stay until they run quietly — then hand over systems the client can own indefinitely.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Icon stats grid ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: <Users className="h-5 w-5" />,
                v: "4",
                k: "Engineers",
                sub: "Small team. High ownership.",
              },
              {
                icon: <Globe className="h-5 w-5" />,
                v: "3+",
                k: "Continents served",
                sub: "Clients across multiple time zones",
              },
              {
                icon: <Package className="h-5 w-5" />,
                v: "2+",
                k: "SaaS products in progress",
                sub: "Building internally. Not launched yet.",
              },
              {
                icon: <Zap className="h-5 w-5" />,
                v: "2025",
                k: "Founded",
                sub: "Addis Ababa, Ethiopia",
              },
            ].map((s, i) => (
              <Reveal key={s.k} delay={i * 60}>
                <div className="rounded-2xl hairline bg-background p-6 sm:p-7 flex flex-col gap-5 hover:bg-surface transition-colors group">
                  <div className="grid h-9 w-9 place-items-center rounded-xl hairline text-muted-foreground group-hover:bg-foreground group-hover:text-background group-hover:border-transparent transition-colors">
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-display text-3xl sm:text-4xl tabular-nums">
                      <CountUp value={s.v} />
                    </div>
                    <div className="mt-1.5 text-sm font-medium">{s.k}</div>
                    <div className="mt-0.5 text-mono text-[10px] text-muted-foreground leading-snug">{s.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ── How we think: two large cards ────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-mono text-[10px] text-muted-foreground tracking-widest mb-10">HOW WE THINK</div>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Thesis */}
            <Reveal>
              <div className="rounded-2xl hairline bg-background p-8 sm:p-10 flex flex-col justify-between min-h-[320px]">
                <div className="text-mono text-[10px] text-muted-foreground tracking-widest">OUR THESIS</div>
                <p className="mt-auto pt-10 text-display text-xl sm:text-2xl leading-[1.25]">
                  Software is judged years after it ships. We build for the second year — not the launch.
                  Small teams. Honest scope. Systems the client can own without us.
                </p>
              </div>
            </Reveal>

            {/* Beliefs stacked */}
            <Reveal delay={80}>
              <div className="rounded-2xl hairline bg-background overflow-hidden divide-y hairline">
                {[
                  "Senior engineers, end to end.",
                  "Speed and craft are the same discipline.",
                  "Boring infrastructure beats clever infrastructure.",
                  "Latency is a feature — not a footnote.",
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-5 px-7 py-5">
                    <span className="text-mono text-[10px] text-muted-foreground shrink-0 w-5">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm sm:text-base">{b}</span>
                  </div>
                ))}
                <div className="px-7 py-5 bg-surface/60">
                  <span className="text-display text-sm italic text-muted-foreground">Write less; delete more.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────── */}
      <section className="border-t hairline py-16 sm:py-24 bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center justify-between mb-12">
              <div className="text-mono text-[10px] text-muted-foreground tracking-widest">TIMELINE</div>
              <div className="h-px flex-1 mx-6 bg-border" />
              <div className="text-mono text-[10px] text-muted-foreground">2025 → NOW</div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { y: "2023–24", t: "Before Goom", b: "Four engineers, scattered across different companies, kept solving the same class of problems. The pattern was clear before the company was." },
              { y: "2025", t: "Studio opens", b: "Goom founded in Addis Ababa. A team of four SWEs. One rule: everything we ship must hold in production without us babysitting it." },
              { y: "2025", t: "First clients", b: "Early engagements across multiple continents. Word spreads quietly — not through marketing, through the work itself." },
              { y: "Now", t: "Building deeper", b: "Active client engagements. SaaS products in development. Engineering that compounds with every project." },
            ].map((e, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="group bg-background rounded-xl hairline p-6 sm:p-8 min-h-[200px] flex flex-col justify-between hover:bg-surface transition-colors">
                  <div className="text-display text-3xl text-foreground/20 font-bold">{e.y}</div>
                  <div>
                    <div className="text-base font-medium mb-2">{e.t}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
