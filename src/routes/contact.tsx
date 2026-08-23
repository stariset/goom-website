import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowUpRight, Check, Clock, Globe, Mail, Loader2, UserCheck, Briefcase, ChevronDown, Building2 } from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { Reveal } from "../components/site/Reveal";
import { submitContactInquiry, fetchJobOpenings, type JobOpeningData } from "../lib/api-supabase";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { topic?: string; role?: string } => {
    return {
      topic: search.topic as string | undefined,
      role: search.role as string | undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Contact & Careers — Goom Engineering Studio" },
      {
        name: "description",
        content:
          "Tell us what you're building or submit your application to join the Goom engineering team.",
      },
      { property: "og:title", content: "Contact & Careers — Goom Engineering Studio" },
      {
        property: "og:description",
        content: "Client project inquiries and engineering candidate applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const contactChoices = [
  { id: "client", label: "Client Inquiry", description: "I'm looking to hire Goom or build a product" },
  { id: "candidate", label: "Candidate Application", description: "I'm applying to join the engineering team" },
] as const;

function Contact() {
  const search = useSearch({ from: "/contact" });
  const [choice, setChoice] = useState<"client" | "candidate">(
    search.topic === "Careers" || search.role ? "candidate" : "client"
  );
  const [selectedRole, setSelectedRole] = useState<string>(search.role || "Principal Systems Architect");
  const [openRoles, setOpenRoles] = useState<JobOpeningData[]>([]);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadRoles() {
      const roles = await fetchJobOpenings();
      setOpenRoles(roles);
      if (search.role) {
        const match = roles.find((r) => r.title.toLowerCase() === search.role?.toLowerCase());
        if (match) setSelectedRole(match.title);
      } else if (roles[0]) {
        setSelectedRole(roles[0].title);
      }
    }
    loadRoles();
  }, [search.role]);

  useEffect(() => {
    if (search.topic === "Careers" || search.role) {
      setChoice("candidate");
    }
  }, [search.topic, search.role]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (choice === "candidate") {
      const role = (formData.get("selectedRole") as string) || selectedRole;
      const github = formData.get("github") as string;
      const linkedin = formData.get("linkedin") as string;
      const portfolio = formData.get("portfolio") as string;
      const resume = formData.get("resume") as string;
      const coverNote = formData.get("brief") as string;

      const briefPayload = `APPLIED ROLE: ${role}\n` +
        (github ? `GITHUB: ${github}\n` : "") +
        (linkedin ? `LINKEDIN: ${linkedin}\n` : "") +
        (portfolio ? `PORTFOLIO / WEBSITE: ${portfolio}\n` : "") +
        (resume ? `RESUME / CV: ${resume}\n` : "") +
        `\nCOVER NOTE & SHIPS:\n${coverNote}`;

      await submitContactInquiry({
        name,
        email,
        company: github || linkedin || portfolio || "Applicant",
        topic: "Careers",
        brief: briefPayload,
      });
    } else {
      const company = formData.get("company") as string;
      const brief = formData.get("brief") as string;
      await submitContactInquiry({
        name,
        email,
        company: company || undefined,
        topic: "Client Inquiry",
        brief,
      });
    }

    setSubmitting(false);
    setSent(true);
  }

  const isCandidateMode = choice === "candidate";

  return (
    <>
      <PageHero
        eyebrow={isCandidateMode ? "CAREERS APPLICATION" : "CLIENT INQUIRY"}
        title={
          isCandidateMode ? (
            <>Apply to join <span className="italic">Goom Engineering.</span></>
          ) : (
            <>Tell us what <span className="italic">you're building.</span></>
          )
        }
        description={
          isCandidateMode
            ? "We hire senior engineers who'd rather ship than meet. Select your target role below to submit your application directly to our engineering lead."
            : "A short note is enough. If it's a fit, we'll come back with questions and a realistic shape for the work — not a sales deck."
        }
      />

      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-[1.25fr_0.75fr] gap-4 sm:gap-6 items-start">
          <Reveal className="rounded-3xl hairline bg-background p-6 sm:p-10">
            {sent ? (
              <div className="flex flex-col items-start gap-5 py-10">
                <span className="grid h-11 w-11 place-items-center rounded-full lime-chip">
                  <Check className="h-5 w-5" />
                </span>
                <h2 className="text-display text-4xl">
                  {isCandidateMode ? "Application Received." : "Message noted."}
                </h2>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  {isCandidateMode
                    ? "Thanks for reaching out! Our engineering team reads every application directly. Expect a reply within one working day."
                    : "Thanks — we read everything ourselves. Expect a reply within one working day."}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isCandidateMode ? "Submit Another Application" : "Send another note"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 2-CHOICE TOGGLE SELECTOR */}
                <fieldset>
                  <legend className="text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">
                    Select Inquiry Type
                  </legend>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {contactChoices.map((c) => {
                      const active = choice === c.id;
                      return (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => setChoice(c.id as "client" | "candidate")}
                          className={`flex flex-col text-left p-4 rounded-2xl hairline transition-all ${active
                            ? "bg-foreground text-background ring-2 ring-foreground/20 shadow-sm"
                            : "bg-surface/30 hover:bg-surface/70 text-muted-foreground"
                            }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-semibold text-sm">
                              {c.id === "client" ? (
                                <span className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4" /> {c.label}
                                </span>
                              ) : (
                                <span className="flex items-center gap-2">
                                  <UserCheck className="h-4 w-4" /> {c.label}
                                </span>
                              )}
                            </span>
                            {active && <Check className="h-4 w-4 text-[var(--lime)] shrink-0" />}
                          </div>
                          <span className={`text-xs mt-1.5 leading-snug ${active ? "text-background/80" : "text-muted-foreground/80"}`}>
                            {c.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* DEDICATED CAREER APPLICATION MODE */}
                {isCandidateMode ? (
                  <div className="space-y-6 pt-4 border-t hairline">
                    <div className="flex items-center justify-between text-xs font-mono text-[var(--lime)] uppercase font-semibold">
                      <span className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" /> Engineering Candidate Portal
                      </span>
                      <span className="text-[10px] text-muted-foreground">{openRoles.length} Active Positions</span>
                    </div>

                    {/* Enhanced Position Selector Dropdown */}
                    <div>
                      <label className="text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground block mb-2">
                        Select Target Role
                      </label>
                      <div className="relative">
                        <select
                          name="selectedRole"
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="w-full appearance-none rounded-2xl hairline bg-surface/60 px-4 py-3.5 pr-10 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:bg-background transition-colors cursor-pointer"
                        >
                          {openRoles.map((r, rIdx) => (
                            <option key={rIdx} value={r.title} className="bg-background text-foreground py-2 font-medium">
                              {r.title} — {r.team} ({r.location})
                            </option>
                          ))}
                          <option value="General Engineering Inquiry" className="bg-background text-foreground py-2 font-medium">
                            General / Other Engineering Role
                          </option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Full Name" name="name" placeholder="Bisrat Beriso" required />
                      <Field label="Email Address" name="email" type="email" placeholder="bisrat@goom.et" required />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="GitHub Profile / Repo Link" name="github" placeholder="https://github.com/username" />
                      <Field label="LinkedIn Profile URL" name="linkedin" placeholder="https://linkedin.com/in/username" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Portfolio / Personal Website" name="portfolio" placeholder="https://yourwebsite.com" />
                      <Field label="Resume / CV Link" name="resume" placeholder="https://drive.google.com/file/..." />
                    </div>

                    <div>
                      <label htmlFor="brief" className="text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        Tell us about your last great ship
                      </label>
                      <textarea
                        id="brief"
                        name="brief"
                        rows={5}
                        required
                        placeholder="What systems have you built? What tools or architecture are you proud of? Why Goom?"
                        className="mt-2.5 w-full rounded-2xl hairline bg-surface/40 p-4 text-sm leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  /* CLIENT INQUIRY MODE */
                  <div className="space-y-6 pt-4 border-t hairline">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Your Name" name="name" placeholder="Alex Rivers" required />
                      <Field label="Work Email" name="email" type="email" placeholder="alex@company.com" required />
                    </div>
                    <Field label="Company / Organization" name="company" placeholder="e.g. Acme Corp (Optional)" />

                    <div>
                      <label htmlFor="brief" className="text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        The Project Brief
                      </label>
                      <textarea
                        id="brief"
                        name="brief"
                        rows={6}
                        required
                        placeholder="What are you building, what's in the way, and when does it need to be live?"
                        className="mt-2.5 w-full rounded-2xl hairline bg-surface/40 p-4 text-sm leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {isCandidateMode ? "Submitting Application..." : "Submitting..."}
                      </>
                    ) : (
                      <>
                        {isCandidateMode ? "Submit Job Application" : "Send Client Message"}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Or email directly at{" "}
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

          {/* Sidebar */}
          <div className="space-y-4">
            <Reveal delay={80} className="rounded-3xl bg-foreground text-background p-8">
              {isCandidateMode ? <Briefcase className="h-5 w-5 text-[var(--lime)]" /> : <Mail className="h-5 w-5" />}
              <div className="mt-6 text-mono text-[11px] uppercase tracking-[0.16em] text-background/60">
                {isCandidateMode ? "Direct Careers Desk" : "Email"}
              </div>
              <a
                href={isCandidateMode ? "mailto:careers@goom.et" : "mailto:hello@goom.et"}
                className="mt-2 block text-display text-2xl hover:opacity-80 transition-opacity"
              >
                {isCandidateMode ? "careers@goom.et" : "hello@goom.et"}
              </a>
            </Reveal>

            <Reveal delay={160} className="rounded-3xl hairline bg-background p-8">
              <Clock className="h-5 w-5" />
              <div className="mt-6 text-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Reply time
              </div>
              <div className="mt-2 text-display text-3xl">One working day.</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {isCandidateMode
                  ? "Every application is evaluated by an engineering lead."
                  : "Every message is read by an engineer, not a funnel."}
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
        className="mt-2.5 w-full rounded-2xl hairline bg-surface/40 px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:bg-background transition-colors"
      />
    </div>
  );
}
