import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { Reveal } from "../components/site/Reveal";
import { SocialRow, type Social } from "../components/site/Socials";
import { ClosingCTA } from "../components/site/ClosingCTA";
import betheImg from "../assets/team-bethe.jpg";
import bisratBImg from "../assets/team-bisrat-b.jpg";
import bisratGImg from "../assets/team-bisrat-g.jpg";
import abrehamImg from "../assets/team-abreham.jpg";
// yordanos image temporarily hidden — card removed per request

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

// Order: Bethe, Abreham Nigus, Bisrat Beriso, Bisrat Gulelat
const team: Member[] = [
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
  const filtered = useMemo(
    () => (filter === "All" ? team : team.filter((m) => m.discipline === filter)),
    [filter],
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
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-mono text-[11px] text-muted-foreground mr-2">
                FILTER · {String(filtered.length).padStart(2, "0")} / {String(team.length).padStart(2, "0")}
              </span>
              {disciplines.map((d) => {
                const active = filter === d;
                return (
                  <button
                    key={d}
                    onClick={() => setFilter(d)}
                    className={`rounded-full px-4 py-1.5 text-sm transition-all duration-300 ${
                      active
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((m) => (
              <Reveal key={m.name} delay={team.indexOf(m) * 70}>
                <TeamCard member={m} index={team.indexOf(m)} />
              </Reveal>
            ))}
            {filter === "All" && (
              <Reveal delay={filtered.length * 70}>
                <JoinCard />
              </Reveal>
            )}
          </div>
        </div>
      </section>
      <ClosingCTA />
    </>
  );
}

function TeamCard({ member, index }: { member: Member; index: number }) {
  const idx = String(index + 1).padStart(2, "0");
  return (
    <article className="group relative rounded-[28px] overflow-hidden bg-background hairline transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)]">
      {/* Corner registration marks — editorial dossier feel */}
      <CornerMark className="top-3 left-3" />
      <CornerMark className="top-3 right-3 rotate-90" />
      <CornerMark className="bottom-3 left-3 -rotate-90" />
      <CornerMark className="bottom-3 right-3 rotate-180" />

      {/* Photo plate */}
      <div className="relative m-3 mb-0 rounded-[20px] overflow-hidden aspect-[4/5] bg-surface">
        <img
          src={member.img}
          alt={`${member.name} — ${member.role} at Goom`}
          loading="lazy"
          width={768}
          height={960}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-[1600ms] ease-out group-hover:scale-[1.07] [filter:grayscale(0.55)_contrast(1.02)] group-hover:[filter:grayscale(0)_contrast(1.05)]"
        />

        {/* Top meta strip */}
        <div className="absolute top-0 inset-x-0 p-4 flex items-start justify-between text-mono text-[10px] text-background mix-blend-difference">
          <div className="flex flex-col gap-1">
            <span className="opacity-90">STARISE / TEAM</span>
            <span className="opacity-60">FILE №{idx}</span>
          </div>
          <span className="rounded-full bg-background/15 backdrop-blur-md px-2.5 py-1 text-background mix-blend-normal hairline border-background/20">
            {member.discipline.toUpperCase()}
          </span>
        </div>

        {/* Giant numeral watermark — desktop only, can crowd mobile */}
        <span
          aria-hidden
          className="hidden sm:block pointer-events-none absolute -bottom-6 -right-2 text-display text-[180px] leading-none text-background/10 select-none transition-all duration-700 group-hover:text-background/20 group-hover:-translate-y-1"
        >
          {idx}
        </span>

        {/* Bottom gradient + name plate */}
        <div className="absolute inset-x-0 bottom-0 p-5 pt-24 bg-gradient-to-t from-foreground/95 via-foreground/55 to-transparent text-background">
          <div className="flex items-center gap-2 text-mono text-[10px] text-background/70">
            <span className="h-1 w-1 rounded-full lime-chip" />
            NOW SHIPPING · {member.shipping.toUpperCase()}
          </div>
          <h4 className="mt-2 text-display text-[30px] sm:text-[34px] leading-[0.95] tracking-tight">{member.name}</h4>
          <div className="mt-1 text-sm text-background/80">{member.role}</div>
        </div>

        {/* Bio reveal overlay — hover on desktop, hidden on mobile (bio rendered below instead) */}
        <div className="hidden sm:flex absolute inset-0 bg-foreground/92 text-background p-6 flex-col opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="text-mono text-[10px] text-background/60 flex items-center justify-between">
            <span>DOSSIER · №{idx}</span>
            <span>{member.tenure.toUpperCase()}</span>
          </div>
          <h5 className="mt-4 text-display text-3xl leading-tight">{member.name}</h5>
          <div className="mt-1 text-sm text-background/70">{member.role} — {member.focus}</div>
          <p className="mt-5 text-[15px] leading-relaxed text-background/85">{member.bio}</p>
          <div className="mt-auto pt-6 grid grid-cols-2 gap-4 border-t border-background/15">
            <Meta k="Based in" v={member.location} />
            <Meta k="Focus" v={member.focus} />
          </div>
          <div className="mt-5 text-mono text-[10px] text-background/50">{member.signal.toUpperCase()}</div>
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
      <div className="p-5 pt-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-mono text-[10px] text-muted-foreground">FOCUS</div>
          <div className="mt-1 text-sm font-medium truncate">{member.focus}</div>
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
    <article className="relative rounded-[28px] hairline p-6 sm:p-8 bg-foreground text-background overflow-hidden flex flex-col justify-between gap-8 min-h-[440px] sm:min-h-[560px] group">
      <div className="flex items-center justify-between text-mono text-[10px] text-background/60">
        <span>OPEN ROLES · 2026</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full lime-chip animate-pulse-dot" />
          HIRING
        </span>
      </div>
      <div className="relative">
        <div className="text-display text-[56px] sm:text-[68px] leading-[0.9]">Join the<br/><span className="italic">roster.</span></div>
        <p className="mt-5 text-sm text-background/70 max-w-xs">
          We're always looking for senior engineers who'd rather ship than meet. Bring receipts.
        </p>
        <Link
          to="/careers"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-5 py-3 text-sm font-medium hover:gap-3 transition-all"
        >
          See positions <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 text-mono text-[10px] text-background/60 border-t border-background/10 pt-5 relative">
        <div>
          <div className="opacity-60">OPEN</div>
          <div className="mt-1 text-display text-2xl text-background">04</div>
        </div>
        <div>
          <div className="opacity-60">CONTINENTS</div>
          <div className="mt-1 text-display text-2xl text-background">04</div>
        </div>
      </div>
      <span className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[var(--lime)] opacity-25 blur-3xl animate-float group-hover:opacity-45 transition-opacity duration-700" />
      <ArrowUpRight className="absolute top-6 right-6 h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
    </article>
  );
}
