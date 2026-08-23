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
  return (
    <>
      <PageHero
        eyebrow="JOURNAL"
        title={<>Field notes <span className="italic">coming soon.</span></>}
        description="Our engineering journal is currently inactive while we focus on client delivery. Direct updates will resume here."
      />

      <section className="pb-32 min-h-[40vh] grid place-items-center">
        <div className="mx-auto max-w-md px-4 text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full hairline bg-surface/60 grid place-items-center text-muted-foreground">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="text-display text-2xl">Journal Inactive</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We are not publishing new field reports at this time. Check back soon or view our work and services.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Explore Our Services
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
