import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { Reveal } from "../components/site/Reveal";
import { ClosingCTA } from "../components/site/ClosingCTA";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Goom" },
      { name: "description", content: "How Goom engagements actually run, week by week." },
      { property: "og:title", content: "Process — Goom" },
      { property: "og:description", content: "Our engagement process." },
    ],
  }),
  component: Process,
});

const steps = [
  {
    n: "01",
    t: "Discovery",
    body: "One week. We map the system, the team, and the constraints. Zero slideware.",
    deliverables: [
      "System architecture audit",
      "Team & workflow mapping",
      "Constraint and risk identification",
      "Clear written scope document",
    ],
    duration: "1 week",
    highlighted: true,
  },
  {
    n: "02",
    t: "Architecture sprint",
    body: "Two weeks. We commit to a design and prove it with running code, not diagrams.",
    deliverables: [
      "Agreed technical architecture",
      "Proof-of-concept in production",
      "Data model draft",
      "Project roadmap with honest dates",
    ],
    duration: "2 weeks",
    highlighted: false,
  },
  {
    n: "03",
    t: "Build",
    body: "Six to twelve weeks. Weekly demos. Production-grade from day one.",
    deliverables: [
      "Weekly production deployments",
      "Automated test suite from day one",
      "Weekly recorded demo + async update",
      "Ongoing architecture decision log",
    ],
    duration: "6–12 weeks",
    highlighted: false,
  },
  {
    n: "04",
    t: "Transfer & evolve",
    body: "We hand the keys, document the system, and stay on call for as long as you need.",
    deliverables: [
      "Full system documentation",
      "Runbook and on-call guide",
      "Team knowledge transfer sessions",
      "30-day post-handoff support window",
    ],
    duration: "2–4 weeks",
    highlighted: false,
  },
];

const principles = [
  {
    t: "Senior engineers only",
    b: "Whoever designs the system also debugs it at 2am. No handoffs to junior talent mid-build.",
  },
  {
    t: "Production from day one",
    b: "We deploy to production in week one — even if it's a stub. The environment is never a surprise.",
  },
  {
    t: "Weekly demos, always",
    b: "Every Friday, something ships. Even on slow weeks, you see real progress.",
  },
  {
    t: "Honest scope",
    b: "We tell you what won't fit before you ask. Scope creep is a communication failure we refuse to accept.",
  },
];

function Process() {
  return (
    <>
      <PageHero
        eyebrow="PROCESS"
        title={<>How we <span className="italic">actually work.</span></>}
        description="No magic. Just senior engineers shipping in tight loops, with the discipline that makes those loops feel slow."
      />

      {/* ── Steps ────────────────────────────────────────────────────────── */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div
                className={`rounded-3xl hairline p-8 sm:p-10 grid sm:grid-cols-[100px_1fr] gap-6 sm:gap-10 ${
                  s.highlighted ? "bg-foreground text-background" : "bg-background"
                }`}
              >
                {/* Step number + duration */}
                <div>
                  <div className={`text-display text-5xl ${s.highlighted ? "" : ""}`}>{s.n}</div>
                  <div className={`mt-2 text-mono text-[10px] ${s.highlighted ? "text-background/50" : "text-muted-foreground"}`}>
                    {s.duration.toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-display text-3xl sm:text-4xl">{s.t}</h3>
                  <p className={`mt-3 text-base leading-relaxed ${s.highlighted ? "text-background/70" : "text-muted-foreground"}`}>
                    {s.body}
                  </p>

                  {/* Deliverables */}
                  <div className="mt-6 grid sm:grid-cols-2 gap-2">
                    {s.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`h-4 w-4 mt-0.5 shrink-0 ${
                            s.highlighted ? "text-[var(--lime)]" : "text-foreground/40"
                          }`}
                        />
                        <span className={`text-sm leading-snug ${s.highlighted ? "text-background/75" : "text-muted-foreground"}`}>
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────────────────────── */}
      <section className="py-20 border-t hairline bg-surface/60">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="text-mono text-[11px] text-muted-foreground">HOW WE THINK</div>
            <h2 className="mt-4 text-display text-3xl sm:text-4xl">
              Principles that run <span className="italic">under every engagement.</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <div className="rounded-2xl hairline bg-background p-6 h-full">
                  <h4 className="text-display text-xl">{p.t}</h4>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.b}</p>
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
