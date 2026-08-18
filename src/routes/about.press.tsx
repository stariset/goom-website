import { createFileRoute } from "@tanstack/react-router";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { ArrowUpRight, Download } from "lucide-react";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/about/press")({
  head: () => ({
    meta: [
      { title: "About · Press — Goom" },
      { name: "description", content: "Press resources, mentions, and brand assets for Goom." },
    ],
  }),
  component: Press,
});

const mentions = [
  { src: "TechBrief", t: "The studio betting on senior-only engineering", d: "2026 · 05" },
  { src: "Builder Weekly", t: "Inside the studio shipping at startup speed for enterprise scale", d: "2026 · 04" },
  { src: "The Stack", t: "Sub-second dispatch: rewiring fleets in realtime", d: "2026 · 03" },
  { src: "Distributed", t: "Why senior-only engineering teams keep winning", d: "2026 · 02" },
];

const assets = [
  { t: "Brand kit", d: "Logos, wordmark, and clearspace rules (SVG · PNG)" },
  { t: "Studio imagery", d: "Workspace and systems diagrams for press use" },
  { t: "Team portraits", d: "High-resolution editorial portraits" },
];

function Press() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div>
            <Reveal>
              <div className="text-mono text-[11px] text-muted-foreground">PRESS · IN THE WILD</div>
            </Reveal>
            <Reveal delay={100} className="mt-6 rounded-3xl hairline bg-background overflow-hidden divide-y hairline">
              {mentions.map((m, i) => (
                <a
                  key={i}
                  href="#"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 p-6 sm:p-8 hover:bg-surface transition-colors"
                >
                  <div className="text-mono text-[11px] text-muted-foreground">{m.d}</div>
                  <div>
                    <div className="text-display text-2xl sm:text-3xl leading-tight">{m.t}</div>
                    <div className="text-mono text-[11px] text-muted-foreground mt-1">{m.src.toUpperCase()}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </Reveal>
          </div>

          <div className="space-y-4">
            <Reveal>
              <div className="text-mono text-[11px] text-muted-foreground">BRAND ASSETS</div>
            </Reveal>
            {assets.map((a, i) => (
              <Reveal key={a.t} delay={i * 90}>
                <a
                  href="#"
                  className="group flex items-center gap-4 rounded-2xl hairline bg-background p-5 hover:bg-surface transition-colors"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full hairline group-hover:lime-chip group-hover:border-transparent transition-colors">
                    <Download className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{a.t}</div>
                    <div className="text-xs text-muted-foreground">{a.d}</div>
                  </div>
                </a>
              </Reveal>
            ))}
            <Reveal delay={300} className="rounded-3xl lime-chip p-6 mt-4">
              <div className="text-mono text-[11px]">PRESS INQUIRIES</div>
              <a href="mailto:press@goom.et" className="mt-2 block text-display text-2xl">press@goom.et</a>
            </Reveal>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}
