import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2, Layers, Cpu, Shield, Sparkles, Activity } from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { ClosingCTA } from "../components/site/ClosingCTA";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Goom" },
      { name: "description", content: "High-impact software engineering, custom enterprise solutions, and scalable architecture." },
      { property: "og:title", content: "Services — Goom" },
      { property: "og:description", content: "Engineering services for teams that ship." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: <Code2 className="h-5 w-5" />, title: "High-impact engineering", desc: "Embedded senior teams that ship production systems alongside yours — not slide decks." },
  { icon: <Layers className="h-5 w-5" />, title: "Custom enterprise solutions", desc: "Bespoke platforms for finance, logistics, and operations — built around your reality." },
  { icon: <Cpu className="h-5 w-5" />, title: "Scalable architecture", desc: "Cloud-native foundations engineered for the load you'll have in three years, not three months." },
  { icon: <Shield className="h-5 w-5" />, title: "Security & compliance", desc: "SOC 2 mindset by default. Zero-trust patterns, audited pipelines, encrypted everything." },
  { icon: <Activity className="h-5 w-5" />, title: "Realtime systems", desc: "Event-driven backends, streaming pipelines, and sub-second user experiences." },
  { icon: <Sparkles className="h-5 w-5" />, title: "AI orchestration", desc: "LLM pipelines that ship — evaluations, guardrails, observability, and cost discipline." },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title={<>For teams that ship <span className="italic">seriously.</span></>}
        description="We embed with your engineering org, or run the build end-to-end. Either way, we ship."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden hairline">
            {services.map((s) => (
              <div key={s.title} className="group bg-background p-8 hover:bg-surface transition-colors duration-300 min-h-[260px] flex flex-col">
                <div className="grid h-10 w-10 place-items-center rounded-full hairline group-hover:lime-chip group-hover:border-transparent transition-colors">
                  {s.icon}
                </div>
                <h4 className="mt-8 text-display text-2xl">{s.title}</h4>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-6 inline-flex items-center gap-1.5 text-mono text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">
                  LEARN MORE <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t hairline bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12">
            <div className="text-mono text-[11px] text-muted-foreground">ENGAGEMENT MODELS</div>
            <h2 className="mt-4 text-display text-3xl sm:text-4xl">
              Three ways <span className="italic">to work with us.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                tag: "01",
                name: "Embedded",
                body: "Senior engineers integrated into your team for a quarter or longer. We work inside your org — your tools, your standup, your codebase.",
                bullets: ["Inside your Slack & tooling", "Weekly demos, always", "Code review & architecture input"],
                inverted: true,
              },
              {
                tag: "02",
                name: "Build & transfer",
                body: "We build the system end-to-end, ship it to production, and hand the keys over with full documentation and a 30-day support window.",
                bullets: ["Full-stack ownership", "Docs, runbooks, on-call guide", "30-day post-handoff support"],
                inverted: false,
              },
              {
                tag: "03",
                name: "Studio retainer",
                body: "Ongoing capacity for evolving products. A long-term relationship with a fixed monthly allocation and no handoff overhead.",
                bullets: ["Priority access to the team", "Flexible scope, fixed cadence", "Compounds month over month"],
                inverted: false,
              },
            ].map((m) => (
              <div
                key={m.tag}
                className={`group relative rounded-3xl hairline p-8 sm:p-10 flex flex-col justify-between min-h-[380px] overflow-hidden transition-colors ${m.inverted
                    ? "bg-foreground text-background"
                    : "bg-background hover:bg-surface"
                  }`}
              >
                {/* Large watermark number */}
                <span
                  className={`pointer-events-none absolute -bottom-4 -right-2 text-[120px] font-bold leading-none select-none ${m.inverted ? "text-background/8" : "text-foreground/5"
                    }`}
                >
                  {m.tag}
                </span>

                <div className="relative">
                  <div className={`text-mono text-[10px] ${m.inverted ? "text-background/50" : "text-muted-foreground"}`}>
                    {m.tag}
                  </div>
                  <h4 className="mt-4 text-display text-2xl sm:text-3xl">{m.name}</h4>
                  <p className={`mt-4 text-sm leading-relaxed ${m.inverted ? "text-background/65" : "text-muted-foreground"}`}>
                    {m.body}
                  </p>
                </div>

                <ul className="relative mt-8 space-y-2">
                  {m.bullets.map((b) => (
                    <li key={b} className={`flex items-center gap-2.5 text-sm ${m.inverted ? "text-background/75" : "text-muted-foreground"}`}>
                      <span className={`h-px w-4 shrink-0 ${m.inverted ? "bg-[var(--lime)]" : "bg-border"}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      <ClosingCTA />
    </>
  );
}
