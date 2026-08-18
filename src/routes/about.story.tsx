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
    y: "2023",
    t: "Before Goom",
    body: "Four engineers, scattered across two continents, kept solving the same class of problems for different employers. The pattern was obvious; the company was not yet.",
  },
  {
    y: "2024",
    t: "Founded in Addis Ababa",
    body: "Goom — a software engineering studio — opens with one rule: every engineer in the door must have shipped real production systems. No exceptions.",
  },
  {
    y: "2024",
    t: "First enterprise build",
    body: "A six-week sprint replaces a six-month roadmap for an enterprise client. Word of mouth begins.",
  },
  {
    y: "2025",
    t: "A ledger, rebuilt",
    body: "A client accounting core is rebuilt on event sourcing — correctness first, performance close behind. It still runs today.",
  },
  {
    y: "2025",
    t: "Realtime practice",
    body: "A live dispatch system for a transport operator: sub-second allocation across active fleets, built on the same primitives.",
  },
  {
    y: "Now",
    t: "What's next",
    body: "Fewer, deeper engagements. The same team. Engineering that compounds.",
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
