import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCTA } from "../components/site/ClosingCTA";
import {
  ArrowUpRight,
  Zap,
  Globe,
  ShieldCheck,
  Database,
  MonitorSmartphone,
  BrainCircuit,
  Activity,
  GitMerge,
  BarChart3,
} from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title: "Capabilities — Goom" },
      { name: "description", content: "A studio built like infrastructure — composable, observable, and unreasonably fast." },
      { property: "og:title", content: "Capabilities — Goom" },
      { property: "og:description", content: "Composable, observable, and unreasonably fast." },
    ],
  }),
  component: Capabilities,
});

const capabilities = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Sub-50ms response times",
    desc: "Average response time across every system we run, globally. Not a benchmark — a measured production baseline.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Global edge delivery",
    desc: "Deployed across 4 active regions with automated failover, CDN-native routing, and zero-cold-start serverless.",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Realtime pipelines",
    desc: "Event-driven backends and streaming architectures that process millions of events with predictable tail latency.",
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Data-first architecture",
    desc: "Postgres, Redis, Clickhouse — chosen for the workload, not the trend. Schema correctness and migration discipline by default.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "99.99% uptime, 12 months",
    desc: "SOC 2 mindset from day one. Zero-trust pipelines, encrypted everything, automated rollback in under 3 minutes.",
  },
  {
    icon: <MonitorSmartphone className="h-5 w-5" />,
    title: "Performance-first frontend",
    desc: "LCP under 1.2s, INP under 200ms. React and TypeScript with a discipline around bundle size and render paths.",
  },
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: "AI & LLM orchestration",
    desc: "Evaluation suites before any model change. Guardrails, cost discipline, and observability baked into every pipeline.",
  },
  {
    icon: <GitMerge className="h-5 w-5" />,
    title: "Daily production deploys",
    desc: "Feature flags, automated test coverage above 92%, and staging environments that mirror production exactly.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Full observability",
    desc: "Every system ships with structured logging, distributed tracing, and alerting. On-call is never a surprise.",
  },
];



function Capabilities() {
  return (
    <>
      <PageHero
        eyebrow="CAPABILITIES"
        title={<>A studio built like <span className="italic">infrastructure.</span></>}
        description="Composable, observable, and unreasonably fast. Every number below is measured in production — not on a benchmark."
      />

      {/* ── Main capabilities grid — mirrors services layout ─────────── */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden hairline">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="group bg-background p-8 hover:bg-surface transition-colors duration-300 min-h-[260px] flex flex-col"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full hairline group-hover:lime-chip group-hover:border-transparent transition-colors">
                  {c.icon}
                </div>
                <h4 className="mt-8 text-display text-2xl">{c.title}</h4>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full stack — logo wall ─────────────────────────────────────── */}
      <section className="py-24 border-t hairline bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          {/* Header row */}
          <Reveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-mono text-[11px] text-muted-foreground">FULL STACK</div>
                <h2 className="mt-3 text-display text-3xl sm:text-4xl">
                  Tools chosen for <span className="italic">the job, not the hype.</span>
                </h2>
              </div>
              <p className="hidden lg:block text-sm text-muted-foreground leading-relaxed max-w-xs text-right">
                Proven primitives. Boring infrastructure. Clever where it actually matters.
              </p>
            </div>
          </Reveal>

          {/* Single unified card */}
          <Reveal delay={80}>
            <div className="rounded-3xl bg-foreground text-background overflow-hidden divide-y divide-background/10">
              {[
                {
                  k: "Languages",
                  logos: [
                    { name: "TypeScript", slug: "typescript" },
                    { name: "Rust", slug: "rust" },
                    { name: "Go", slug: "go" },
                    { name: "Python", slug: "python" },
                  ],
                },
                {
                  k: "Datastores",
                  logos: [
                    { name: "PostgreSQL", slug: "postgresql" },
                    { name: "Redis", slug: "redis" },
                    { name: "ClickHouse", slug: "clickhouse" },
                    { name: "Kafka", slug: "apachekafka" },
                  ],
                },
                {
                  k: "Infrastructure",
                  logos: [
                    { name: "Kubernetes", slug: "kubernetes" },
                    { name: "Terraform", slug: "terraform" },
                    { name: "Cloudflare", slug: "cloudflare" },
                    { name: "AWS", slug: "amazonaws" },
                  ],
                },
                {
                  k: "AI & LLM",
                  logos: [
                    { name: "OpenAI", slug: "openai" },
                    { name: "Anthropic", slug: "anthropic" },
                    { name: "Hugging Face", slug: "huggingface" },
                    { name: "LangChain", slug: "langchain" },
                  ],
                },
              ].map((group) => (
                <div
                  key={group.k}
                  className="grid sm:grid-cols-[160px_1fr] items-center gap-0"
                >
                  {/* Category label */}
                  <div className="px-7 py-6 sm:py-8 border-b sm:border-b-0 sm:border-r border-background/10">
                    <span className="text-mono text-[10px] text-background/50 tracking-widest">
                      {group.k.toUpperCase()}
                    </span>
                  </div>

                  {/* Logo row */}
                  <div className="grid grid-cols-4 divide-x divide-background/10">
                    {group.logos.map((logo) => (
                      <div
                        key={logo.name}
                        className="group flex flex-col items-center justify-center gap-3 py-7 px-4 hover:bg-background/8 transition-colors"
                      >
                        <img
                          src={`https://cdn.simpleicons.org/${logo.slug}/ffffff`}
                          alt={logo.name}
                          className="h-8 w-8 opacity-50 group-hover:opacity-100 transition-opacity"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <span className="text-mono text-[9px] text-background/45 group-hover:text-background/70 transition-colors text-center leading-tight">
                          {logo.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>





      {/* ── Ship cadence ─────────────────────────────────────────────── */}
      <section className="py-24 border-t hairline">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="text-mono text-[11px] text-muted-foreground mb-8">WEEKLY BY DEFAULT</div>
          </Reveal>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-4">

            {/* Left: dark chart card */}
            <Reveal>
              <div className="rounded-3xl bg-foreground text-background p-8 sm:p-10 relative overflow-hidden">
                <span className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[var(--lime)] opacity-10 blur-3xl" />

                <div className="relative">
                  <div className="text-mono text-[10px] text-background/50 tracking-widest">
                    DEPLOY CADENCE · TRAILING 14 WEEKS
                  </div>

                  {/* Bar chart */}
                  <div className="mt-8 flex items-end gap-1.5 h-32">
                    {[4, 7, 5, 9, 8, 11, 7, 12, 10, 13, 12, 14, 13, 15].map((h, i, arr) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t transition-colors ${
                          i === arr.length - 1
                            ? "bg-[var(--lime)]"
                            : "bg-background/25 hover:bg-background/40"
                        }`}
                        style={{ height: `${(h / 15) * 100}%` }}
                        title={`Week ${i + 1}: ${h} deploys`}
                      />
                    ))}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-mono text-[9px] text-background/40">
                    <span>14 WKS AGO</span>
                    <span className="text-[var(--lime)]">THIS WEEK ↑</span>
                  </div>

                  {/* Stat row */}
                  <div className="mt-8 grid grid-cols-3 gap-3 pt-6 border-t border-background/10">
                    {[
                      { v: "15", k: "Deploys\nthis week" },
                      { v: "100%", k: "Straight to\nproduction" },
                      { v: "<3 min", k: "Rollback\nwindow" },
                    ].map((s) => (
                      <div key={s.k}>
                        <div className="text-display text-2xl sm:text-3xl text-background">{s.v}</div>
                        <div className="mt-1 text-mono text-[9px] text-background/45 leading-tight whitespace-pre-line">
                          {s.k}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: copy + checklist */}
            <Reveal delay={100}>
              <div className="rounded-3xl hairline bg-background p-8 sm:p-10 flex flex-col justify-between min-h-[360px]">
                <div>
                  <h3 className="text-display text-3xl sm:text-4xl">
                    Production every<br /><span className="italic">Friday. Always.</span>
                  </h3>
                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                    Not to staging. Not to a sandbox. To production. The cadence enforces everything else — tests, feature flags, observability.
                  </p>
                </div>

                <ul className="mt-10 space-y-3">
                  {[
                    "Automated test coverage on every PR",
                    "Staging mirrors production exactly",
                    "Feature flags for safe dark launches",
                    "Rollback in under 3 minutes",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="h-px w-5 shrink-0 bg-foreground/20" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>
        </div>
      </section>


      <ClosingCTA />
    </>
  );
}
