import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowUpRight, Plus, Loader2 } from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { fetchJobOpenings, type JobOpeningData } from "../lib/api-supabase";

// Helper to render markdown bold (**), italic (*), code (`) safely in JSX
function renderMarkdownText(text: string) {
  if (!text) return "";

  // Split by bold (**text**)
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={index} className="italic text-foreground/90">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code key={index} className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs text-[var(--lime)]">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

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

function Careers() {
  const [roles, setRoles] = useState<JobOpeningData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    async function loadRoles() {
      setLoading(true);
      const liveRoles = await fetchJobOpenings();
      setRoles(liveRoles);
      setLoading(false);
    }
    loadRoles();
  }, []);

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
          <div className="text-mono text-[11px] text-muted-foreground mb-6 uppercase tracking-wider">
            OPEN ROLES · {loading ? "..." : roles.length}
          </div>

          {loading ? (
            <div className="rounded-3xl hairline bg-background p-16 text-center flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--lime)]" />
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Fetching Open Engineering Positions...
              </span>
            </div>
          ) : roles.length === 0 ? (
            <div className="rounded-3xl hairline bg-background p-12 text-center text-muted-foreground text-sm">
              No open positions at this time.
            </div>
          ) : (
            <div className="rounded-3xl hairline bg-background overflow-hidden divide-y hairline">
              {roles.map((r, i) => {
                const open = openIdx === i;
                return (
                  <div key={r.title + i} className="group">
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="w-full text-left grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr_1fr_auto] items-center gap-6 p-6 sm:p-8 hover:bg-surface transition-colors"
                    >
                      <div>
                        <div className="text-display text-2xl sm:text-3xl">{r.title}</div>
                        <div className="text-mono text-[11px] text-muted-foreground mt-1 uppercase tracking-wider">
                          {r.team}
                        </div>
                      </div>
                      <div className="hidden sm:block text-sm text-muted-foreground">{r.location}</div>
                      <div className="hidden sm:block text-sm text-muted-foreground">{r.type}</div>
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full hairline transition-all duration-500 ${open ? "bg-foreground text-background rotate-45" : ""
                          }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 sm:px-8 pb-8 grid lg:grid-cols-[1.4fr_1fr] gap-8">
                          <div>
                            <div className="text-base text-foreground/85 leading-relaxed max-w-2xl whitespace-pre-wrap">
                              {renderMarkdownText(r.about)}
                            </div>

                            {/* Skills Pills */}
                            {(() => {
                              const skillsArr: string[] = Array.isArray(r.skills)
                                ? r.skills
                                : typeof r.skills === "string"
                                  ? (r.skills as string).split(",").map((s) => s.trim()).filter(Boolean)
                                  : [];
                              if (skillsArr.length === 0) return null;
                              return (
                                <div className="mt-5 flex flex-wrap gap-2">
                                  {skillsArr.map((skill, sIdx) => (
                                    <span
                                      key={sIdx}
                                      className="rounded-full bg-surface px-3 py-1 text-mono text-[10px] uppercase font-medium text-foreground/80 hairline"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              );
                            })()}

                            {/* Requirements / Bullets */}
                            {(() => {
                              const reqArr: string[] = Array.isArray(r.bullets)
                                ? r.bullets
                                : typeof r.bullets === "string"
                                  ? (r.bullets as string).split("\n").map((b) => b.trim()).filter(Boolean)
                                  : [];
                              if (reqArr.length === 0) return null;
                              return (
                                <div className="mt-6">
                                  <div className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">Requirements</div>
                                  <ul className="mt-3 space-y-2.5">
                                    {reqArr.map((b, bIdx) => (
                                      <li key={bIdx} className="flex gap-3 text-sm text-muted-foreground">
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                                        {b}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })()}

                            {/* Nice To Have Section */}
                            {(() => {
                              const nthArr: string[] = Array.isArray(r.niceToHave)
                                ? r.niceToHave
                                : typeof r.niceToHave === "string"
                                  ? (r.niceToHave as string).split("\n").map((n) => n.trim()).filter(Boolean)
                                  : [];
                              if (nthArr.length === 0) return null;
                              return (
                                <div className="mt-6">
                                  <div className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">Nice to Have</div>
                                  <ul className="mt-3 space-y-2.5">
                                    {nthArr.map((nth, nIdx) => (
                                      <li key={nIdx} className="flex gap-3 text-sm text-muted-foreground">
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--lime)]" />
                                        {nth}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })()}
                          </div>
                          <div className="rounded-2xl hairline bg-surface/60 p-6 flex flex-col gap-3 lg:self-start">
                            <div className="text-mono text-[11px] text-muted-foreground">APPLY</div>
                            <div className="text-display text-2xl leading-tight">
                              Tell us about your last great ship.
                            </div>
                            <Link
                              to="/contact"
                              search={{ topic: "Careers", role: r.title }}
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
          )}

          <div className="mt-12 rounded-3xl bg-foreground text-background p-8 sm:p-12 relative overflow-hidden">
            <span className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[var(--lime)] opacity-20 blur-3xl" />
            <div className="relative">
              <div className="text-mono text-[11px] text-background/60 uppercase tracking-wider">
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
