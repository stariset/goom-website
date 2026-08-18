import { createFileRoute } from "@tanstack/react-router";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/about/values")({
  head: () => ({
    meta: [
      { title: "About · Values — Goom" },
      { name: "description", content: "The principles that decide what Goom builds and how." },
    ],
  }),
  component: Values,
});

const values = [
  { n: "01", t: "Ship to learn.", b: "Production beats theory. Every internal debate ends with a deployment." },
  { n: "02", t: "Senior, end to end.", b: "Whoever talks to the customer also reads the stack trace at 2am." },
  { n: "03", t: "Boring infrastructure.", b: "We pick proven primitives so we can be clever where it matters." },
  { n: "04", t: "Write less; delete more.", b: "A smaller surface area is the only sustainable speedup." },
  { n: "05", t: "Truthful timelines.", b: "We commit to dates we'd bet our reputation on, then beat them." },
  { n: "06", t: "Respect the user's attention.", b: "Performance is a feature. Latency is a tax we refuse to pass on." },
];

function Values() {
  return (
    <>
      <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="text-center">
          <div className="text-mono text-[11px] text-muted-foreground">SIX PRINCIPLES</div>
          <h2 className="mx-auto mt-4 max-w-2xl text-display text-3xl sm:text-5xl leading-[0.98]">
            What decides <span className="italic">what we build.</span>
          </h2>
        </Reveal>

        <div className="mt-14 rounded-3xl hairline bg-background overflow-hidden divide-y divide-border">
          {values.map((v, i) => (
            <Reveal
              key={v.n}
              delay={i * 60}
              className="group relative grid sm:grid-cols-[auto_1fr] gap-3 sm:gap-10 items-baseline px-6 sm:px-10 py-8 sm:py-10 transition-colors duration-500 hover:bg-surface/60"
            >
              <span className="text-mono text-[11px] text-muted-foreground sm:pt-3">{v.n}</span>
              <div>
                <h4 className="text-display text-3xl sm:text-[40px] leading-[1.05]">{v.t}</h4>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {v.b}
                </p>
              </div>
              <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[var(--lime)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
      <ClosingCTA />
    </>
  );
}

