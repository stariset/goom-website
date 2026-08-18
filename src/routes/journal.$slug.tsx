import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "../components/site/Reveal";
import { posts, tagColors } from "../lib/journal-data";

// Re-export for journal.index.tsx
export { posts } from "../lib/journal-data";

export const Route = createFileRoute("/journal/$slug")({
  head: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) return { meta: [{ title: "Not Found — Goom" }] };
    return {
      meta: [
        { title: `${post.title} — Goom Journal` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: `${post.title} — Goom Journal` },
        { property: "og:description", content: post.excerpt },
      ],
    };
  },
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  component: ArticlePage,
});

// ── Full article body map ────────────────────────────────────────────────────
const articleBodies: Record<string, { sections: { heading?: string; body: string }[] }> = {
  "event-sourcing-ledger": {
    sections: [
      {
        body: "For the first six months, the ledger looked fine. It handled deposits, withdrawals, and transfers across a small but growing set of accounts. The bugs were invisible — not crashes, not errors, just numbers that quietly drifted from where they should have been.",
      },
      {
        heading: "The problem with mutation",
        body: "A traditional ledger stores state. A row in the database says \"Account 4821 has a balance of 14,320 ETB.\" When a transaction happens, that number changes. The history is implicit — it lives in logs, if you remembered to write them, or in the imagination of the developer who happened to be on call when something went wrong.",
      },
      {
        body: "We tracked down the third silent mutation bug to a race condition in the transfer flow. Two concurrent withdrawals, both reading the same balance, both succeeding, both decrementing — the result was a negative balance that passed validation because the check happened before the write, not after.",
      },
      {
        heading: "Events as the source of truth",
        body: "The insight behind event sourcing is simple: instead of storing what the system looks like now, store every event that ever happened to it. The current state is derived, not stored. It's always reproducible. It's always auditable. And — critically — it's always correct, because the log is append-only.",
      },
      {
        body: "We rebuilt the ledger around three primitive events: MoneyDeposited, MoneyWithdrawn, and TransferInitiated / TransferCompleted / TransferFailed. Every transaction produces one or more of these events. Balance is computed by replaying the relevant events — in memory, from the last snapshot, in microseconds.",
      },
      {
        heading: "What we learned",
        body: "The rebuild took four weeks. The resulting system has run for fourteen months without a single silent mutation bug. Auditors can replay any account's history to any point in time. The compliance team can generate reports that used to require a weekend of manual reconciliation. The on-call rotation is quieter.",
      },
      {
        body: "The lesson isn't that event sourcing is always the answer. It comes with real costs: snapshot management, projection rebuild times, event schema evolution. But for a financial ledger, where correctness is non-negotiable and auditability is a legal requirement, it's the right primitive. We'd make the same call again.",
      },
    ],
  },
  "sub-second-dispatch": {
    sections: [
      {
        body: "The brief was simple: a driver allocation system that could assign the nearest available driver to a booking request in under 400 milliseconds — at the 99th percentile, under production load, across a city.",
      },
      {
        heading: "Why tail latency matters",
        body: "Mean latency is a comfortable lie. In a dispatch system where thousands of bookings happen per hour during peak, the 99th percentile is the experience of dozens of real customers every minute. A 400ms p99 target is honest engineering — it forces you to design for the pathological case, not the average.",
      },
      {
        body: "Our initial implementation used a PostgreSQL query with a PostGIS distance function over an indexed driver location table. On a warm cache with 200 active drivers, p50 was 18ms. p99 was 1,200ms. The outliers were savage.",
      },
      {
        heading: "The architecture that worked",
        body: "We moved driver locations into a Redis sorted set, keyed by a geohash-derived score. Proximity queries became O(log n) lookups against an in-memory index. We kept Postgres as the system of record for driver state, but stopped querying it in the hot path. Allocation decisions now read from Redis, write a provisional assignment, and reconcile with Postgres asynchronously.",
      },
      {
        body: "Under the new architecture: p50 is 12ms. p99 is 87ms. We haven't seen a request cross 400ms in three months of production traffic. The system now handles 40% more load than the original brief assumed, because allocation is no longer the bottleneck.",
      },
      {
        heading: "The unglamorous parts",
        body: "The hardest part wasn't the Redis architecture — it was handling the edge cases. Drivers going offline between allocation and confirmation. GPS location staleness during underground routes. The occasional driver who declined a job without tapping the decline button. Real-time systems are only as good as their failure modes, and we spent more time on those than on the happy path.",
      },
    ],
  },
  "boring-database-schema": {
    sections: [
      {
        body: "There is a kind of engineering intelligence that expresses itself through schema complexity. Polymorphic associations. Entity-attribute-value tables. JSONB columns used as a grab-bag for anything that doesn't fit. We have all written these schemas. We have all inherited them at 11pm when something broke.",
      },
      {
        heading: "Cleverness has a cost",
        body: "The seductive thing about clever schemas is that they solve a real problem: flexibility. A generic event table that can represent any domain event without a migration sounds like a win. Until you need to query it. Until you need to index it. Until the type field becomes a load-bearing column with 47 values and no enum constraint.",
      },
      {
        body: "We've started keeping a simple rule: every table should be readable by a new engineer in under sixty seconds. If they need to ask what entity_type means, or trace through three levels of polymorphic joins to understand what a row represents, the schema is failing at its primary job — being a model of the domain.",
      },
      {
        heading: "The boring alternative",
        body: "Boring schemas have dedicated tables for dedicated things. Accounts are accounts. Orders are orders. If you need flexibility, you add a nullable column and deploy a migration. Yes, migrations take time. Yes, sometimes you'll add a column and use it for six months before realizing you don't need it. These are acceptable costs.",
      },
      {
        body: "The schema we're most proud of is one we've deleted the most from. It started at 47 tables, absorbed two years of feature work, and now sits at 31. Every deletion was a clarification. Every clarification made the next feature faster to build.",
      },
    ],
  },
  "shipping-cadence-as-feature": {
    sections: [
      {
        body: "We used to treat shipping cadence as an internal metric — something we tracked, reported in retrospectives, and tried to improve. Then a client told us something that changed how we think about it: \"Knowing that something new will be in production by Friday is the only thing that keeps our team engaged with the project.\"",
      },
      {
        heading: "Trust is built in increments",
        body: "Software projects fail for many reasons, but a common one is quiet: the gap between what's happening and what the client believes is happening grows slowly, then catastrophically. Weekly deployments close that gap by force. There's nothing to misrepresent when the evidence is in production every seven days.",
      },
      {
        body: "The discipline required for weekly shipping is also the discipline that produces good software. You can't deploy weekly if you don't have automated tests. You can't deploy weekly if your staging environment diverges from production. You can't deploy weekly if your feature branches live for three weeks. The cadence enforces the practices.",
      },
      {
        heading: "What we ship on quiet weeks",
        body: "Not every week produces a user-visible feature. Some weeks, what ships is an instrumentation pass that makes the next incident easier to debug. Some weeks it's a schema migration, a dependency upgrade, or a refactor that pays down six months of accumulated shortcuts. These still count. We still demo them. The discipline is the same.",
      },
    ],
  },
  "hiring-senior-engineers-2026": {
    sections: [
      {
        body: "The market for senior engineers in 2026 is strange. Rates are high. Supply feels constrained. But the actual talent pool is deeper than it appears — it's just that the signals have degraded. Leetcode scores don't correlate with production judgment. GitHub activity is gameable. Referrals are the most reliable signal, and we've nearly exhausted our network.",
      },
      {
        heading: "What we're actually screening for",
        body: "We screen for one thing, expressed in many ways: judgment. Can this person make a defensible tradeoff under uncertainty? Can they identify the load-bearing constraint in a system they've never seen? Can they tell the difference between a problem that needs more engineering and a problem that needs clearer requirements?",
      },
      {
        body: "Our interview process has three stages. First, a short asynchronous technical write-up — not a coding challenge, but a description of a system they've built and something they'd change about it. Second, a sixty-minute architecture conversation about a real problem we've solved, discussed openly. Third, a two-day paid trial on a real but non-critical piece of work.",
      },
      {
        heading: "What we've stopped doing",
        body: "We stopped giving whiteboard algorithm questions two years ago. We stopped asking candidates to implement sorting algorithms. We stopped testing trivia. These things measure whether someone has recently studied for interviews, not whether they can run a production system at 2am when something inexplicable is happening to the database.",
      },
      {
        body: "The best hires we've made in the last eighteen months came from former clients, from open source contributors to projects we use, and from referrals from engineers we'd worked alongside. We're building the culture that makes those referrals happen naturally — and that's a longer game than any interview process.",
      },
    ],
  },
  "ai-orchestration-in-production": {
    sections: [
      {
        body: "There's a specific kind of confidence that comes from building an AI-powered feature in a demo environment with a perfect prompt, a cooperative model, and no concurrent users. It is a false confidence. Production is a different animal — and it has teeth.",
      },
      {
        heading: "What actually breaks",
        body: "In order of frequency, from our deployments in 2025: prompt injection from unexpected user inputs, tool call hallucinations that chain into downstream systems, context window exhaustion causing silent truncation, rate limit cascades during peak traffic, and — the hardest to debug — semantic drift where the model's behavior changes subtly between model versions without any error.",
      },
      {
        body: "The tool call problem deserves special attention. When you give an LLM access to real tools — API calls, database writes, external services — a hallucinated tool call isn't a wrong answer in a text box. It's a real side effect in a live system. We've seen models attempt to call functions with argument structures that look plausible but are semantically impossible.",
      },
      {
        heading: "The checklist we actually use",
        body: "For every AI feature going to production: explicit output schemas with validation before any tool is called; idempotency on all tool implementations; a human-readable audit log of every model decision; circuit breakers that fall back to deterministic logic when confidence scores drop below threshold; canary deployments with shadow mode evaluation before full rollout.",
      },
      {
        body: "Evaluations are not optional. Before any model upgrade, we run a regression suite of several hundred production-representative inputs and compare outputs against a labeled baseline. Model changes that look like minor version bumps have produced measurable behavioral regressions. Treat model updates like dependency updates: test them.",
      },
      {
        heading: "The honest take",
        body: "AI features in production are not harder to build than traditional features — they're harder to reason about. The failure modes are probabilistic, not deterministic. The debugging loop is longer. The testing surface is wider. Teams that ship AI reliably have invested in observability first, features second. That's the order that matters.",
      },
    ],
  },
};

function ArticlePage() {
  const { post } = Route.useLoaderData() as any;
  const body = articleBodies[post.slug];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-44 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 grain-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Journal
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-mono text-[10px] uppercase tracking-wider font-medium ${tagColors[post.tag] ?? "bg-surface text-muted-foreground"}`}
              >
                {post.tag}
              </span>
              <span className="text-mono text-[11px] text-muted-foreground">{post.date}</span>
              <span className="flex items-center gap-1 text-mono text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {post.read}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-6 text-display text-3xl sm:text-5xl lg:text-6xl leading-[0.95]">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 pt-8 border-t hairline flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background text-xs font-bold">
                G
              </div>
              <div>
                <div className="text-sm font-medium">Goom Engineering</div>
                <div className="text-mono text-[10px] text-muted-foreground">GOOM STUDIO</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {body ? (
            <div className="max-w-none space-y-8">
              {body.sections.map((section, i) => (
                <Reveal key={i} delay={i * 40}>
                  {section.heading && (
                    <h2 className="text-display text-2xl sm:text-3xl mt-12 mb-4 first:mt-0">
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-base sm:text-lg text-muted-foreground leading-[1.75]">
                    {section.body}
                  </p>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <p className="text-muted-foreground text-lg">Full article coming soon.</p>
            </Reveal>
          )}

          {/* ── End CTA ──────────────────────────────────────────────── */}
          <Reveal delay={200}>
            <div className="mt-20 pt-12 border-t hairline flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
              <div>
                <div className="text-mono text-[11px] text-muted-foreground">HAVE A BUILD IN MIND?</div>
                <div className="mt-1 text-display text-2xl">Let's talk.</div>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* ── More articles ─────────────────────────────────────────── */}
          <Reveal delay={260}>
            <div className="mt-16">
              <div className="text-mono text-[11px] text-muted-foreground mb-6">MORE FROM THE JOURNAL</div>
              <div className="grid sm:grid-cols-2 gap-4">
                {posts
                  .filter((p) => p.slug !== post.slug)
                  .slice(0, 2)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      to="/journal/$slug"
                      params={{ slug: p.slug }}
                      className="group rounded-2xl hairline bg-background p-5 hover:bg-surface transition-colors"
                    >
                      <div className="text-mono text-[10px] text-muted-foreground">{p.tag.toUpperCase()} · {p.date}</div>
                      <div className="mt-2 text-display text-xl leading-tight group-hover:text-foreground transition-colors">
                        {p.title}
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1 text-mono text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">
                        Read <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
