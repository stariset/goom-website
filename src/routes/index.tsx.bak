import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowRight, Quote, Star, ArrowUpRight, Code2, Layers, Cpu, Shield, Sparkles, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "../components/site/SectionHeader";
import { Reveal } from "../components/site/Reveal";
import { LogoMark } from "../components/site/Brand";
import { ClosingCTA } from "../components/site/ClosingCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Goom — Software Engineering Studio" },
      {
        name: "description",
        content:
          "Goom is a small engineering studio. We design and build software systems that hold up — architecture, realtime backends, and interfaces teams trust.",
      },
      { property: "og:title", content: "Goom — Software Engineering Studio" },
      {
        property: "og:description",
        content:
          "A small engineering studio building software systems that hold up in production.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutUsSummary />
      <CapabilitiesSummary />
      <ProcessSummary />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}

const HERO_WORDS = ["holds up.", "stays calm.", "ships early.", "outlives us."];

const orbit = [
  // Left side
  { label: "TypeScript", slug: "typescript", side: "left", top: "4%", x: "2%", delay: "0ms" },
  { label: "PostgreSQL", slug: "postgresql", side: "left", top: "28%", x: "12%", delay: "180ms" },
  { label: "Go", slug: "go", side: "left", top: "54%", x: "18%", delay: "360ms" },
  { label: "Redis", slug: "redis", side: "left", top: "78%", x: "8%", delay: "140ms" },
  { label: "Python", slug: "python", side: "left", top: "92%", x: "-2%", delay: "420ms" },
  { label: "Cloudflare", slug: "cloudflare", side: "left", top: "18%", x: "-3%", delay: "220ms" },

  // Right side
  { label: "Rust", slug: "rust", side: "right", top: "8%", x: "4%", delay: "90ms" },
  { label: "Kubernetes", slug: "kubernetes", side: "right", top: "34%", x: "16%", delay: "270ms" },
  { label: "React", slug: "react", side: "right", top: "62%", x: "19%", delay: "450ms" },
  { label: "ClickHouse", slug: "clickhouse", side: "right", top: "86%", x: "10%", delay: "310ms" },
  { label: "Terraform", slug: "terraform", side: "right", top: "96%", x: "-1%", delay: "150ms" },
  { label: "Kafka", slug: "apachekafka", side: "right", top: "22%", x: "-1%", delay: "380ms" },
] as const;



function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % HERO_WORDS.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* simple, quiet background: one soft lime bloom */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[440px] w-[720px] rounded-full bg-[var(--lime)] opacity-[0.12] blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">


        <h1 className="mt-7 text-display text-[clamp(2.1rem,6.2vw,4.15rem)] leading-[1.02] animate-rise">
          We build software
          <br />
          that{" "}
          <span className="relative inline-block align-baseline">
            {HERO_WORDS.map((w, idx) => (
              <span
                key={w}
                aria-hidden={idx !== i}
                className={`italic whitespace-nowrap transition-all duration-700 ${idx === i ? "relative" : "absolute left-0 top-0"
                  }`}
                style={{
                  opacity: idx === i ? 1 : 0,
                  transform: idx === i ? "translateY(0)" : "translateY(0.18em)",
                }}
              >
                {w}
              </span>
            ))}
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed animate-rise"
          style={{ animationDelay: "100ms" }}
        >
          A small, senior engineering studio. Architecture, realtime systems, and data you
          can't lose — run quietly in production.
        </p>

        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-rise"
          style={{ animationDelay: "170ms" }}
        >
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition-all"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full hairline px-6 py-3.5 text-sm font-medium hover:bg-surface transition-colors"
          >
            How we work
          </Link>
        </div>
      </div>

      {/* Convergence field — quiet straight rays pulling tool logos into one core */}
      <div className="relative mx-auto mt-14 sm:mt-20 max-w-6xl px-4 sm:px-6">
        <div className="relative h-[220px] sm:h-[300px]">
          <svg
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full pointer-events-none"
            aria-hidden="true"
          >
            {Array.from({ length: 11 }).map((_, k) => {
              const y = 20 + k * 28;
              return (
                <g key={k} stroke="var(--lime)" strokeOpacity={0.38} fill="none" strokeWidth="1">
                  <line x1="0" y1={y} x2="600" y2="160" />
                  <line x1="1200" y1={y} x2="600" y2="160" />
                </g>
              );
            })}
          </svg>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 pointer-events-none" />

          {/* Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-3xl bg-[var(--lime)] blur-2xl opacity-50" />
            <div className="relative grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-3xl lime-chip shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
              <LogoMark className="h-8 w-8 sm:h-10 sm:w-10 opacity-90" />
            </div>
          </div>

          {/* Tool logos */}
          {orbit.map((o) => (
            <div
              key={o.label}
              className="absolute animate-rise"
              style={{
                top: o.top,
                [o.side]: o.x,
                animationDelay: o.delay,
              } as React.CSSProperties}
            >
              <div
                title={o.label}
                className="group relative grid h-12 w-12 sm:h-16 sm:w-16 place-items-center rounded-[1.25rem] hairline bg-background/50 backdrop-blur-md shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-background/80 hover:shadow-[0_12px_24px_-10px_var(--lime)] hover:border-[var(--lime)]/30 overflow-hidden"
              >
                {/* Subtle internal lime glow on hover */}
                <div className="absolute inset-0 bg-[var(--lime)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <img
                  src={`https://cdn.simpleicons.org/${o.slug}`}
                  alt={`${o.label} logo`}
                  loading="lazy"
                  className="relative z-10 h-6 w-6 sm:h-7 sm:w-7 grayscale opacity-50 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}

function Marquee() {
  const techStack = [
    { name: "TypeScript", slug: "typescript" },
    { name: "Rust", slug: "rust" },
    { name: "Go", slug: "go" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Kubernetes", slug: "kubernetes" },
    { name: "Redis", slug: "redis" },
    { name: "ClickHouse", slug: "clickhouse" },
    { name: "Kafka", slug: "apachekafka" },
    { name: "React", slug: "react" },
    { name: "GraphQL", slug: "graphql" },
    { name: "Docker", slug: "docker" },
    { name: "AWS", slug: "amazonaws" },
  ];

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="text-center mb-10 relative z-20">
        <span className="text-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          Powered By
        </span>
      </div>

      <div className="relative">
        {/* Edge gradient masks for a smooth fade in/out */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-16 sm:gap-24 animate-marquee whitespace-nowrap items-center w-max">
          {[...techStack, ...techStack, ...techStack, ...techStack].map((it, i) => (
            <div
              key={`${it.slug}-${i}`}
              className="flex items-center gap-4 group opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              <img
                src={`https://cdn.simpleicons.org/${it.slug}`}
                alt={it.name}
                className="h-7 w-7 sm:h-9 sm:w-9 transition-all duration-300 object-contain group-hover:scale-110 drop-shadow-sm"
                loading="lazy"
              />
              <span className="text-display text-xl sm:text-3xl font-medium tracking-tight text-foreground">
                {it.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function AboutUsSummary() {
  return (
    <section className="relative py-24 sm:py-32 bg-background border-y hairline">
      <div className="absolute inset-0 bg-surface/20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_0.75fr] gap-12 lg:gap-24 items-start">
            <div>
              <div className="text-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-8">About Us</div>
              <h2 className="text-display text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight">
                A studio. <br />
                A product company. <br />
                <span className="italic font-light">Both, on purpose.</span>
              </h2>
            </div>

            <div className="flex flex-col pt-4 lg:pt-16">
              <p className="text-lg sm:text-xl leading-relaxed text-foreground/80 mb-8">
                We are a small, senior engineering studio based in Addis Ababa.
                We build architecture, realtime backends, and interfaces that teams can trust.
                No slide decks. No junior developers learning on your dime.
              </p>

              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-[var(--lime)] transition-colors">
                Read our full story <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CapabilitiesSummary() {
  const services = [
    {
      icon: <Code2 className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "High-impact engineering",
      desc: "Embedded senior teams that ship production systems alongside yours. We don't just advise; we drop into the repo and accelerate your timeline.",
      span: "md:col-span-2 md:row-span-2",
      hero: true
    },
    {
      icon: <Activity className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Realtime systems",
      desc: "Event-driven backends and streaming pipelines.",
      span: "md:col-span-1"
    },
    {
      icon: <Cpu className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Scalable architecture",
      desc: "Cloud-native foundations built for heavy loads.",
      span: "md:col-span-1"
    },
    {
      icon: <Layers className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Enterprise solutions",
      desc: "Bespoke platforms for logistics and operations.",
      span: "md:col-span-1"
    },
    {
      icon: <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "AI orchestration",
      desc: "LLM pipelines with strict guardrails.",
      span: "md:col-span-1"
    },
    {
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Security & compliance",
      desc: "SOC 2 mindset by default.",
      span: "md:col-span-1"
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <div className="text-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-4">Capabilities</div>
              <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-2xl">
                Built to work <span className="italic font-light">with your team.</span>
              </h2>
            </div>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-lg hairline px-5 py-2.5 text-sm font-medium bg-background hover:bg-surface-2 transition-colors shrink-0 shadow-sm">
              View all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[minmax(140px,auto)]">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 50} className={`${s.span} h-full`}>
              <Link to="/services" className={`group relative block rounded-xl hairline bg-background hover:border-foreground/20 hover:shadow-lg transition-all duration-500 h-full flex flex-col overflow-hidden ${s.hero ? 'p-6 sm:p-8' : 'p-4 sm:p-5'}`}>

                <div className="absolute inset-0 bg-gradient-to-br from-[var(--lime)]/0 to-[var(--lime)]/0 group-hover:from-[var(--lime)]/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />

                <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-foreground opacity-0 -translate-x-3 translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-auto">
                    <div className={`inline-flex items-center justify-center rounded-lg bg-surface/50 text-foreground group-hover:bg-[var(--lime)] group-hover:text-background transition-colors duration-500 transform group-hover:scale-110 group-hover:rotate-3 ease-out ${s.hero ? 'h-12 w-12 mb-6' : 'h-8 w-8 sm:h-10 sm:w-10 mb-4'}`}>
                      {s.icon}
                    </div>
                  </div>
                  <div className="mt-3 transition-transform duration-500 group-hover:-translate-y-1">
                    <h4 className={`text-display font-bold tracking-tight mb-1.5 text-foreground ${s.hero ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>{s.title}</h4>
                    <p className={`text-muted-foreground leading-relaxed ${s.hero ? 'text-sm sm:text-base max-w-md mt-3' : 'text-xs max-w-sm mt-1.5'}`}>{s.desc}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSummary() {
  const steps = [
    { n: "01", title: "Measure Twice.", desc: "We spend the first two weeks mapping the domain, tearing down assumptions, and designing the architecture." },
    { n: "02", title: "Build Once.", desc: "Small, senior teams execute the plan. No junior devs learning on your dime. Just pure, unblocked velocity." },
    { n: "03", title: "Run Quietly.", desc: "The system goes into production with full observability, structured logging, and zero-downtime deployment pipelines." },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-background border-t hairline">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-4">The Process</div>
              <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                How we <span className="italic font-light">ship.</span>
              </h2>
            </div>
            <Link to="/process" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-[var(--lime)] transition-colors">
              Read our methodology <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="relative pl-8 border-l border-border hover:border-foreground transition-colors duration-500 py-2 group">
                {/* Active node dot */}
                <div className="absolute left-[-5px] top-4 h-2.5 w-2.5 rounded-full bg-border group-hover:bg-foreground transition-colors duration-500" />

                <div className="text-mono text-[10px] text-muted-foreground mb-3">{step.n}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "They replaced a six-month roadmap with a six-week build — and that system is still the spine of our platform two years later.",
      who: "VP Engineering",
      where: "Global logistics operator",
      initials: "VP",
    },
    {
      quote:
        "Senior, opinionated, and calm under pressure. They ship the way you wish your own team did.",
      who: "Founder",
      where: "Series B fintech",
      initials: "FN",
    },
    {
      quote:
        "The rare team that tells you what a thing will actually cost, then delivers it on that number.",
      who: "Head of Platform",
      where: "Enterprise SaaS",
      initials: "HP",
    },
    {
      quote:
        "We handed them a vague brief on a Monday. By Friday they had a working prototype we could demo to investors.",
      who: "CEO",
      where: "Early-stage AI startup",
      initials: "CE",
    },
    {
      quote:
        "Our previous vendor took eight months and shipped something we couldn't maintain. Goom did the same scope in ten weeks and left us full documentation.",
      who: "CTO",
      where: "Healthcare data platform",
      initials: "CT",
    },
  ];

  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = items.length;

  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);
  const goTo = useCallback((i: number) => setActive(i), []);

  // Auto-play
  useEffect(() => {
    if (isHovered || isDragging) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHovered, isDragging, next]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch / drag
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
  };
  const handleDragEnd = (clientX: number) => {
    setIsDragging(false);
    const delta = dragStart - clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
  };

  return (
    <section
      className="relative py-20 sm:py-28 border-y hairline overflow-hidden"
      aria-label="Client testimonials"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-surface/20 pointer-events-none" />

      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16 flex flex-col items-center text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-6 sm:w-12 bg-border/60" />
            <div className="text-mono text-[10px] text-muted-foreground tracking-widest uppercase">02 — In their words</div>
            <div className="h-px w-6 sm:w-12 bg-border/60" />
          </div>
          <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Teams who <span className="italic font-light">measure twice.</span>
          </h2>
        </Reveal>
      </div>

      {/* Track wrapper */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Overflow clip + drag zone */}
        <div
          className="overflow-hidden"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
          style={{ cursor: isDragging ? "grabbing" : "grab", userSelect: "none" }}
        >
          {/* Sliding track — 1 card mobile, 3 on lg */}
          <div
            className="flex gap-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(calc(-${active} * (100% / 3 + 20px / 3)))` }}
          >
            {items.map((it, i) => {
              const isActive = i === active;
              return (
                <figure
                  key={i}
                  className="relative flex-none w-full lg:w-[calc(33.333%-14px)] rounded-2xl p-6 sm:p-8 hairline bg-background overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.07)]"
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-5">
                    {[0,1,2,3,4].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-foreground/80 text-foreground/80" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-base leading-[1.6] tracking-tight font-medium text-foreground/90 mb-6">
                    "{it.quote}"
                  </blockquote>

                  {/* Footer */}
                  <figcaption className="pt-5 border-t hairline flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foreground text-background text-mono text-[10px] font-bold tracking-widest">
                      {it.initials}
                    </span>
                    <div>
                      <span className="block text-xs font-bold text-foreground">{it.who}</span>
                      <span className="block text-mono text-[9px] tracking-widest text-muted-foreground mt-0.5 uppercase">
                        {it.where}
                      </span>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        {/* Dots only */}
        <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Testimonial navigation">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className="relative flex items-center justify-center transition-all duration-300 focus:outline-none"
              style={{ width: i === active ? "24px" : "8px", height: "8px" }}
            >
              <span
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  background: i === active ? "var(--lime)" : "var(--border)",
                  opacity: i === active ? 1 : 0.5,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes testimonialIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}



