import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Goom" },
      { name: "description", content: "Open engineering roles at Goom." },
      { property: "og:title", content: "Careers — Goom" },
      { property: "og:description", content: "We're hiring senior engineers who'd rather ship than meet." },
    ],
  }),
  component: Careers,
});

type Role = {
  title: string;
  loc: string;
  type: string;
  team: string;
  about: string;
  bullets: string[];
};

const roles: Role[] = [
  {
    title: "Senior Backend Engineer",
    loc: "Remote · Global",
    type: "Full-time",
    team: "Systems",
    about:
      "Own the core of a client ledger system every other surface depends on. You will design for correctness first and performance close behind.",
    bullets: [
      "8+ years shipping production systems at scale",
      "Deep experience with PostgreSQL and event sourcing",
      "Comfortable owning a service end to end, including its on-call",
    ],
  },
  {
    title: "Staff Platform Engineer",
    loc: "Remote · Global",
    type: "Full-time",
    team: "Infrastructure",
    about:
      "Build the platform every Goom engagement is launched from. Less ticket-taking; more setting the bar.",
    bullets: [
      "Strong Kubernetes and multi-region infrastructure experience",
      "Bias for boring, observable primitives over clever ones",
      "Track record turning developer experience into a moat",
    ],
  },
  {
    title: "Realtime Systems Engineer",
    loc: "Remote · Global",
    type: "Full-time",
    team: "Realtime",
    about:
      "Sub-second dispatch across live fleets. You will work on the part of a system where milliseconds become dollars.",
    bullets: [
      "Experience with streaming systems (Kafka, NATS, Redpanda, or similar)",
      "Comfortable reasoning about backpressure, ordering, and partial failure",
      "Geospatial or routing experience a plus",
    ],
  },
  {
    title: "Design Engineer",
    loc: "Remote · Global",
    type: "Full-time",
    team: "Product",
    about:
      "Ship interfaces that feel as considered as the systems under them. Equally fluent in TypeScript and Figma.",
    bullets: [
      "Senior-level React and TypeScript",
      "Has shipped a design system that other engineers actually used",
      "Cares about typography, motion, and the first 100ms",
    ],
  },
  {
    title: "Founding GTM Engineer",
    loc: "Remote · Global",
    type: "Full-time",
    team: "Delivery",
    about:
      "Half engineer, half operator. You will own onboarding, integrations, and the loop between clients and the engineering team.",
    bullets: [
      "Engineering background plus customer-facing instincts",
      "Comfortable writing code in front of a prospect",
      "Has worked closely with finance, ops, or logistics teams",
    ],
  },
];

function Careers() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <PageHero
        eyebrow="CAREERS"
        title={
          <>
            Build with people who <span className="italic">actually ship.</span>
          </>
        }
        description="Small team. High autonomy. Real ownership. If you're a senior engineer who'd rather build than meet, we'd like to talk."
      />

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="text-mono text-[11px] text-muted-foreground mb-6">
            OPEN ROLES · {roles.length}
          </div>
          <div className="rounded-3xl hairline bg-background overflow-hidden divide-y hairline">
            {roles.map((r, i) => {
              const open = openIdx === i;
              return (
                <div key={r.title} className="group">
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full text-left grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr_auto] items-center gap-6 p-6 sm:p-8 hover:bg-surface transition-colors"
                  >
                    <div>
                      <div className="text-display text-2xl sm:text-3xl">{r.title}</div>
                      <div className="text-mono text-[11px] text-muted-foreground mt-1">
                        {r.team.toUpperCase()}
                      </div>
                    </div>
                    <div className="hidden sm:block text-sm text-muted-foreground">{r.loc}</div>
                    <div className="hidden sm:block text-sm text-muted-foreground">{r.type}</div>
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full hairline transition-all duration-500 ${
                        open ? "bg-foreground text-background rotate-45" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 sm:px-8 pb-8 grid lg:grid-cols-[1.4fr_1fr] gap-8">
                        <div>
                          <p className="text-base text-foreground/85 leading-relaxed max-w-2xl">
                            {r.about}
                          </p>
                          <ul className="mt-6 space-y-3">
                            {r.bullets.map((b) => (
                              <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl hairline bg-surface/60 p-6 flex flex-col gap-3 lg:self-start">
                          <div className="text-mono text-[11px] text-muted-foreground">APPLY</div>
                          <div className="text-display text-2xl leading-tight">
                            Tell us about your last great ship.
                          </div>
                          <Link
                            to="/contact"
                            className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90"
                          >
                            Apply for {r.title.split(" ").slice(-1)[0]}{" "}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 rounded-3xl bg-foreground text-background p-8 sm:p-12 relative overflow-hidden">
            <span className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[var(--lime)] opacity-20 blur-3xl" />
            <div className="relative">
              <div className="text-mono text-[11px] text-background/60">
                DON'T SEE YOUR ROLE?
              </div>
              <h3 className="mt-5 text-display text-4xl sm:text-5xl">Tell us anyway.</h3>
              <p className="mt-4 text-background/70 max-w-xl">
                If you're exceptional at what you do, we want to know — even if we don't have a
                role posted for it yet.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Get in touch <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
