import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check, Clock, Globe, Mail } from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Goom Engineering Studio" },
      {
        name: "description",
        content:
          "Tell us what you're building. Goom takes on architecture, realtime systems, and long-horizon product engineering.",
      },
      { property: "og:title", content: "Contact — Goom Engineering Studio" },
      {
        property: "og:description",
        content: "Tell us what you're building — we reply within one working day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const topics = [
  "Embedded engineering",
  "Architecture review",
  "Zero-to-one build",
  "Careers",
  "Something else",
] as const;

function Contact() {
  const [topic, setTopic] = useState<string>(topics[0]);
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={<>Tell us what <span className="italic">you're building.</span></>}
        description="A short note is enough. If it's a fit, we'll come back with questions and a realistic shape for the work — not a sales deck."
      />

      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.25fr_0.75fr] gap-4 sm:gap-6 items-start">
          <Reveal className="rounded-3xl hairline bg-background p-6 sm:p-10">
            {sent ? (
              <div className="flex flex-col items-start gap-5 py-10">
                <span className="grid h-11 w-11 place-items-center rounded-full lime-chip">
                  <Check className="h-5 w-5" />
                </span>
                <h2 className="text-display text-4xl">Message noted.</h2>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  Thanks — we read everything ourselves. Expect a reply within one working
                  day.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-7"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" name="name" placeholder="Your name" required />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <Field label="Company" name="company" placeholder="Optional" />

                <fieldset>
                  <legend className="text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    What's this about
                  </legend>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {topics.map((t) => {
                      const active = topic === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTopic(t)}
                          aria-pressed={active}
                          className={`rounded-full px-4 py-2 text-sm transition-all ${
                            active
                              ? "bg-foreground text-background"
                              : "hairline hover:bg-surface"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label
                    htmlFor="brief"
                    className="text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    The brief
                  </label>
                  <textarea
                    id="brief"
                    name="brief"
                    rows={6}
                    required
                    placeholder="What are you building, what's in the way, and when does it need to be live?"
                    className="mt-3.5 w-full rounded-2xl hairline bg-surface/40 p-4 text-sm leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:bg-background transition-colors"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Send message
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Or email us directly at{" "}
                    <a
                      href="mailto:hello@goom.et"
                      className="underline decoration-border underline-offset-4 hover:text-foreground transition-colors"
                    >
                      hello@goom.et
                    </a>
                  </span>
                </div>
              </form>
            )}
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={80} className="rounded-3xl bg-foreground text-background p-8">
              <Mail className="h-5 w-5" />
              <div className="mt-6 text-mono text-[11px] uppercase tracking-[0.16em] text-background/60">
                Email
              </div>
              <a
                href="mailto:hello@goom.et"
                className="mt-2 block text-display text-3xl hover:opacity-80 transition-opacity"
              >
                hello@goom.et
              </a>
            </Reveal>

            <Reveal delay={160} className="rounded-3xl hairline bg-background p-8">
              <Clock className="h-5 w-5" />
              <div className="mt-6 text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Reply time
              </div>
              <div className="mt-2 text-display text-3xl">One working day.</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Every message is read by an engineer, not a funnel.
              </p>
            </Reveal>

            <Reveal delay={240} className="rounded-3xl hairline bg-surface/60 p-8">
              <Globe className="h-5 w-5" />
              <div className="mt-6 text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Where we work
              </div>
              <div className="mt-2 text-display text-3xl">Remote-first.</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Based in Addis Ababa, working across European and North American hours.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-3.5 w-full rounded-2xl hairline bg-surface/40 px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:bg-background transition-colors"
      />
    </div>
  );
}

