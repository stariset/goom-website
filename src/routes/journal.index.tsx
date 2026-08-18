import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { Reveal } from "../components/site/Reveal";
import { posts } from "../lib/journal-data";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Goom" },
      { name: "description", content: "Notes from the Goom engineering team — practice over theory." },
      { property: "og:title", content: "Journal — Goom" },
      { property: "og:description", content: "Engineering notes from Goom." },
    ],
  }),
  component: Journal,
});

const tagColors: Record<string, string> = {
  Architecture: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Realtime: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Engineering: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Process: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Team: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  AI: "bg-[var(--lime)]/20 text-[color:var(--ink)]",
};

function TagBadge({ tag }: { tag: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-mono text-[10px] uppercase tracking-wider font-medium ${tagColors[tag] ?? "bg-surface text-muted-foreground"}`}
    >
      {tag}
    </span>
  );
}

function Journal() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        eyebrow="JOURNAL"
        title={<>Notes from <span className="italic">the build.</span></>}
        description="Field reports from the engineering team. Practice over theory."
      />

      <section className="pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-6">

          {/* ── Featured post ──────────────────────────────────────────── */}
          {featured && (
            <Reveal>
              <Link
                to="/journal/$slug"
                params={{ slug: featured.slug }}
                className="group block rounded-3xl hairline bg-foreground text-background p-8 sm:p-12 hover:opacity-95 transition-opacity relative overflow-hidden"
              >
                <span className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[var(--lime)] opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
                <div className="relative">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-mono text-[11px] text-background/50">{featured.date}</span>
                    <span className="w-px h-3 bg-background/20" />
                    <span className="inline-flex items-center gap-1 text-mono text-[11px] text-background/50">
                      <Clock className="h-3 w-3" /> {featured.read}
                    </span>
                    <span className="rounded-full bg-[var(--lime)] text-[var(--ink)] px-2.5 py-0.5 text-mono text-[10px] uppercase tracking-wider font-medium">
                      {featured.tag}
                    </span>
                  </div>
                  <h2 className="mt-5 text-display text-3xl sm:text-4xl lg:text-5xl leading-[0.97]">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-base sm:text-lg text-background/65 leading-relaxed max-w-2xl">
                    {featured.excerpt}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2 text-mono text-[11px] group-hover:text-background transition-colors text-background/70">
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* ── Article list ───────────────────────────────────────────── */}
          <div className="divide-y hairline rounded-3xl hairline bg-background overflow-hidden">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  to="/journal/$slug"
                  params={{ slug: p.slug }}
                  className="group grid grid-cols-[1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-start gap-4 sm:gap-6 p-6 sm:p-8 hover:bg-surface transition-colors"
                >
                  {/* Date (desktop) */}
                  <div className="text-mono text-[11px] text-muted-foreground hidden sm:block pt-1 min-w-[70px]">
                    {p.date}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <TagBadge tag={p.tag} />
                      <span className="text-mono text-[10px] text-muted-foreground sm:hidden">{p.date}</span>
                    </div>
                    <div className="text-display text-xl sm:text-2xl lg:text-3xl">{p.title}</div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl line-clamp-2">
                      {p.excerpt}
                    </p>
                  </div>

                  {/* Read time (desktop) */}
                  <div className="hidden sm:flex items-center gap-1 text-mono text-[11px] text-muted-foreground whitespace-nowrap pt-1">
                    <Clock className="h-3 w-3" />
                    {p.read}
                  </div>

                  {/* Arrow */}
                  <div className="grid h-10 w-10 place-items-center rounded-full hairline group-hover:bg-foreground group-hover:text-background transition-colors self-center shrink-0">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
