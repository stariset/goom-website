import { createFileRoute } from "@tanstack/react-router";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/about/story")({
  head: () => ({
    meta: [
      { title: "About · Story — Goom" },
      { name: "description", content: "How Goom came to be — and where it's going." },
    ],
  }),
  component: Story,
});

const chapters = [
  {
    y: "2023–24",
    t: "Before Goom",
    body: "Four engineers, working across different companies and continents, kept running into the same class of problems. Bad architecture, bloated teams, and software that couldn't survive the people who built it. The pattern was obvious before the company was.",
  },
  {
    y: "2025",
    t: "Founded in Addis Ababa",
    body: "Goom opens — a software engineering studio of four. One rule from day one: everything we ship must hold in production without us holding it. No juniors. No exceptions. Four engineers, full ownership.",
  },
  {
    y: "2025",
    t: "First engagements",
    body: "Early client work across multiple continents. Not loud, not marketed heavily — the work did the talking. Each project deepened the playbook for the next.",
  },
  {
    y: "Now",
    t: "Building deeper",
    body: "Active client engagements across regions. SaaS products in development internally — not yet launched, but close. Engineering that compounds with every engagement.",
  },
];

function Story() {
  return (
    <>
      <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative pl-8 sm:pl-12">
          <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-border" />
          {chapters.map((c, i) => (
            <Reveal key={c.y + c.t} delay={i * 80} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[26px] sm:-left-[34px] top-2 grid place-items-center">
                <span className="h-3 w-3 rounded-full bg-foreground" />
                <span className="absolute h-3 w-3 rounded-full bg-foreground/40 animate-ping-soft" />
              </span>
              <div className="text-mono text-[11px] text-muted-foreground">{c.y}</div>
              <h3 className="mt-2 text-display text-3xl sm:text-4xl">{c.t}</h3>
              <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
      <ClosingCTA />
    </>
  );
}
