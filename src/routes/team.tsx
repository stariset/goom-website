import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { Reveal } from "../components/site/Reveal";
import { SocialRow, type Social } from "../components/site/Socials";
import { ClosingCTA } from "../components/site/ClosingCTA";
import { supabase } from "../lib/supabase";
import { Skeleton } from "../components/ui/skeleton";
import betheImg from "../assets/team-bethe.jpg";
import bisratBImg from "../assets/team-bisrat-b.jpg";
import bisratGImg from "../assets/team-bisrat-g.jpg";
import abrehamImg from "../assets/team-abreham.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Goom" },
      { name: "description", content: "The senior engineering team behind Goom — operators, architects, and product builders." },
      { property: "og:title", content: "Team — Goom" },
      { property: "og:description", content: "Meet the engineers behind Goom." },
    ],
  }),
  component: Team,
});

type Discipline = "All" | "Product" | "Systems" | "Engineering" | "Innovation";

type Member = {
  id?: string;
  name: string;
  role: string;
  focus: string;
  discipline: Exclude<Discipline, "All">;
  bio: string;
  img: string;
  shipping: string;
  location: string;
  tenure: string;
  signal: string;
  social: Social;
};

function resolveTeamAvatar(imgUrl?: string, name?: string): string {
  if (imgUrl && (imgUrl.startsWith("http://") || imgUrl.startsWith("https://") || imgUrl.startsWith("data:"))) {
    return imgUrl;
  }
  const n = name?.toLowerCase() || "";
  if (n.includes("bethe")) return betheImg;
  if (n.includes("abreham")) return abrehamImg;
  if (n.includes("beriso")) return bisratBImg;
  if (n.includes("gulelat")) return bisratGImg;
  if (imgUrl && !imgUrl.startsWith("/team-")) return imgUrl;
  return "";
}

// Default fallback list
const defaultTeam: Member[] = [
  {
    name: "Bethe Bayou",
    role: "Co-Founder & Product Lead",
    focus: "Product strategy · Backend",
    discipline: "Product",
    bio: "Leads the company's overall direction and product strategy, specializing in backend engineering, system architecture, APIs, databases, scalable infrastructure, and AI-powered product development.",
    img: betheImg,
    shipping: "Company product strategy",
    location: "Addis Ababa",
    tenure: "Co-Founder",
    signal: "Architecture · APIs · AI products",
    social: { twitter: "bethebayou", github: "bethe", linkedin: "bethebayou" },
  },
  {
    name: "Abreham Nigus",
    role: "Co-Founder & Systems Lead",
    focus: "Distributed systems",
    discipline: "Systems",
    bio: "Leads backend and distributed systems engineering, specializing in microservices, data infrastructure, Kafka, Elasticsearch, Spark, and scalable system architecture.",
    img: abrehamImg,
    shipping: "Data infrastructure platform",
    location: "Addis Ababa",
    tenure: "Co-Founder",
    signal: "Kafka · Elasticsearch · Spark",
    social: { twitter: "abrehamnigus", github: "abreham", linkedin: "abrehamnigus" },
  },
  {
    name: "Bisrat Beriso",
    role: "Co-Founder & Engineering Lead",
    focus: "Full-stack · System design",
    discipline: "Engineering",
    bio: "Leads software engineering and technical architecture, focusing on full-stack development, system design, technical problem-solving, and building robust, maintainable solutions.",
    img: bisratBImg,
    shipping: "Core engineering architecture",
    location: "Addis Ababa",
    tenure: "Co-Founder",
    signal: "Full-stack · System design",
    social: { github: "bisratb", linkedin: "bisratberiso" },
  },
  {
    name: "Bisrat Gulelat",
    role: "Co-Founder & Innovation Lead",
    focus: "AI · Mobile · Emerging tech",
    discipline: "Innovation",
    bio: "Leads innovation initiatives, focusing on artificial intelligence, mobile development, emerging technologies, product ideation, and exploring new opportunities for the company.",
    img: bisratGImg,
    shipping: "AI & mobile initiatives",
    location: "Addis Ababa",
    tenure: "Co-Founder",
    signal: "AI · Mobile · R&D",
    social: { twitter: "bisratg", github: "bisratg", linkedin: "bisratgulelat" },
  },
];

const disciplines: Discipline[] = ["All", "Product", "Systems", "Engineering", "Innovation"];

function Team() {
  const [filter, setFilter] = useState<Discipline>("All");
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const { data, error } = await supabase
          .from("TeamMember")
          .select("*")
          .order("orderIndex", { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped: Member[] = data.map((db: any) => ({
            id: db.id,
            name: db.name,
            role: db.role,
            discipline: (db.discipline as any) || "Product",
            focus: db.focus || db.role,
            bio: db.bio || "",
            img: resolveTeamAvatar(db.imgUrl, db.name),
            shipping: db.shipping || "Studio operations",
            location: db.location || "Addis Ababa",
            tenure: db.tenure || "Senior Engineer",
            signal: db.signal || "Engineering",
            social: db.socials || {},
          }));
          setTeamMembers(mapped);
        } else {
          setTeamMembers(defaultTeam);
        }
      } catch (err) {
        console.warn("Error fetching TeamMembers from Supabase:", err);
        setTeamMembers(defaultTeam);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? teamMembers : teamMembers.filter((m) => m.discipline === filter)),
    [filter, teamMembers],
  );

  return (
    <>
      <PageHero
        eyebrow="THE TEAM · DOSSIER"
        title={
          <>
            The minds behind <span className="italic">the machine.</span>
          </>
        }
        description="A small, opinionated team of senior builders. Every one of us ships."
      />

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[22px] overflow-hidden bg-background hairline"
                >
                  {/* Photo area */}
                  <div className="m-2.5 mb-0 rounded-[16px] overflow-hidden">
                    <Skeleton className="aspect-[3/4] w-full rounded-[16px]" />
                  </div>
                  {/* Footer strip */}
                  <div className="p-4 pt-3 flex items-center justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-2.5 w-10 rounded-full" />
                      <Skeleton className="h-3.5 w-2/3 rounded-full" />
                    </div>
                    <div className="flex gap-1.5">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-mono text-[11px] text-muted-foreground mr-2">
                    FILTER · {String(filtered.length).padStart(2, "0")} / {String(teamMembers.length).padStart(2, "0")}
                  </span>
                  {disciplines.map((d) => {
                    const active = filter === d;
                    return (
                      <button
                        key={d}
                        onClick={() => setFilter(d)}
                        className={`rounded-full px-4 py-1.5 text-sm transition-all duration-300 ${active
                          ? "bg-foreground text-background hairline border-transparent"
                          : "hairline bg-background text-muted-foreground hover:text-foreground hover:-translate-y-0.5"
                          }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                <div className="hidden sm:flex items-center gap-2 text-mono text-[10px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  ROSTER · LIVE · v2026.06
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((m, i) => (
                  <Reveal key={m.id || m.name} delay={i * 70}>
                    <TeamCard member={m} index={i} />
                  </Reveal>
                ))}
              </div>

              {filter === "All" && (
                <Reveal delay={filtered.length * 70} className="mt-4">
                  <JoinCard />
                </Reveal>
              )}
            </>
          )}
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}

function TeamCard({ member, index }: { member: Member; index: number }) {
  const idx = String(index + 1).padStart(2, "0");
  return (
    <article className="group relative rounded-[22px] overflow-hidden bg-background hairline transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]">
      {/* Corner registration marks — editorial dossier feel */}
      <CornerMark className="top-2.5 left-2.5" />
      <CornerMark className="top-2.5 right-2.5 rotate-90" />
      <CornerMark className="bottom-2.5 left-2.5 -rotate-90" />
      <CornerMark className="bottom-2.5 right-2.5 rotate-180" />

      {/* Photo plate */}
      <div className="relative m-2.5 mb-0 rounded-[16px] overflow-hidden aspect-[3/4] bg-surface">
        <img
          src={member.img}
          alt={`${member.name} — ${member.role} at Goom`}
          loading="lazy"
          width={768}
          height={960}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-[1600ms] ease-out group-hover:scale-[1.07] [filter:grayscale(0.55)_contrast(1.02)] group-hover:[filter:grayscale(0)_contrast(1.05)]"
        />

        {/* Top meta strip */}
        <div className="absolute top-0 inset-x-0 p-3 flex items-start justify-between text-mono text-[9px] text-background mix-blend-difference">
          <div className="flex flex-col gap-1">
            <span className="opacity-90">GOOM / TEAM</span>
            <span className="opacity-60">FILE №{idx}</span>
          </div>
          <span className="rounded-full bg-background/15 backdrop-blur-md px-2.5 py-1 text-background mix-blend-normal hairline border-background/20">
            {member.discipline.toUpperCase()}
          </span>
        </div>

        {/* Giant numeral watermark — desktop only, can crowd mobile */}
        <span
          aria-hidden
          className="hidden sm:block pointer-events-none absolute -bottom-4 -right-1 text-display text-[120px] leading-none text-background/10 select-none transition-all duration-700 group-hover:text-background/20 group-hover:-translate-y-1"
        >
          {idx}
        </span>

        {/* Bottom gradient + name plate */}
        <div className="absolute inset-x-0 bottom-0 p-4 pt-16 bg-gradient-to-t from-foreground/95 via-foreground/55 to-transparent text-background">
          <div className="flex items-center gap-2 text-mono text-[9px] text-background/70">
            <span className="h-1 w-1 rounded-full lime-chip" />
            NOW SHIPPING · {member.shipping.toUpperCase()}
          </div>
          <h4 className="mt-1.5 text-display text-[22px] sm:text-[25px] leading-[0.95] tracking-tight">{member.name}</h4>
          <div className="mt-0.5 text-xs text-background/80">{member.role}</div>
        </div>

        {/* Bio reveal overlay — hover on desktop, hidden on mobile (bio rendered below instead) */}
        <div className="hidden sm:flex absolute inset-0 bg-foreground/92 text-background p-5 flex-col opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="text-mono text-[9px] text-background/60 flex items-center justify-between">
            <span>DOSSIER · №{idx}</span>
            <span>{member.tenure.toUpperCase()}</span>
          </div>
          <h5 className="mt-3 text-display text-2xl leading-tight">{member.name}</h5>
          <div className="mt-0.5 text-xs text-background/70">{member.role} — {member.focus}</div>
          <p className="mt-4 text-[13px] leading-relaxed text-background/85">{member.bio}</p>
          <div className="mt-auto pt-4 grid grid-cols-2 gap-3 border-t border-background/15">
            <Meta k="Based in" v={member.location} />
            <Meta k="Focus" v={member.focus} />
          </div>
          <div className="mt-3 text-mono text-[9px] text-background/50">{member.signal.toUpperCase()}</div>
        </div>
      </div>

      {/* Mobile-only bio strip below photo — no hover on touch */}
      <div className="sm:hidden px-5 pt-4">
        <p className="text-[13px] leading-relaxed text-muted-foreground">{member.bio}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-mono text-[10px] text-muted-foreground">
          <span>{member.location.toUpperCase()}</span>
          <span className="opacity-40">·</span>
          <span>{member.tenure.toUpperCase()}</span>
        </div>
      </div>


      {/* Footer strip — always visible */}
      <div className="p-4 pt-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-mono text-[9px] text-muted-foreground">FOCUS</div>
          <div className="mt-0.5 text-xs font-medium truncate">{member.focus}</div>
        </div>
        <div className="shrink-0">
          <SocialRow links={member.social} />
        </div>
      </div>
    </article>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-mono text-[10px] text-background/50">{k.toUpperCase()}</div>
      <div className="mt-1 text-sm">{v}</div>
    </div>
  );
}

function CornerMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`absolute h-3 w-3 text-foreground/30 z-10 ${className}`}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path d="M0 0H5M0 0V5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function JoinCard() {
  return (
    <article className="relative rounded-[22px] hairline bg-foreground text-background overflow-hidden group">
      {/* Lime glow blob */}
      <span className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[var(--lime)] opacity-20 blur-3xl animate-float group-hover:opacity-40 transition-opacity duration-700" />
      <span className="pointer-events-none absolute -top-16 left-1/3 h-48 w-48 rounded-full bg-[var(--lime)] opacity-10 blur-3xl" />

      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-8 p-7 sm:p-10">

        {/* Left — headline */}
        <div className="shrink-0">
          <div className="text-mono text-[10px] text-background/50 flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full lime-chip animate-pulse-dot" />
            OPEN ROLES · 2026
          </div>
          <div className="text-display text-[40px] sm:text-[52px] leading-[0.9]">
            Join the
            <br />
            <span className="italic">roster.</span>
          </div>
        </div>

        {/* Center divider + stats */}
        <div className="hidden sm:flex items-center gap-10 shrink-0 border-x border-background/10 px-10">
          <div className="text-center">
            <div className="text-display text-4xl">Remote</div>
            <div className="mt-1 text-mono text-[9px] text-background/50 uppercase tracking-widest">Work from anywhere</div>
          </div>
          <div className="text-center">
            <div className="text-display text-4xl">Hybrid</div>
            <div className="mt-1 text-mono text-[9px] text-background/50 uppercase tracking-widest">Flexible schedule</div>
          </div>
          <div className="text-center">
            <div className="text-display text-4xl">Full-time</div>
            <div className="mt-1 text-mono text-[9px] text-background/50 uppercase tracking-widest">Dedicated roles</div>
          </div>
        </div>

        {/* Right — body + CTA */}
        <div className="flex flex-col gap-5 max-w-xs">
          <p className="text-sm text-background/65 leading-relaxed">
            We're always looking for senior engineers who'd rather ship than meet. No bureaucracy. Real ownership.
          </p>
          <Link
            to="/careers"
            className="self-start inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium hover:gap-3 transition-all duration-300"
          >
            See open positions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <ArrowUpRight className="absolute top-6 right-6 h-4 w-4 opacity-30 group-hover:opacity-80 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
    </article>
  );
}
