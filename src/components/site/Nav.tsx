import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  BookOpen,
  GitBranch,
  Sparkles,
  Newspaper,
  Compass,
  Users,
  Code2,
  Layers,
  Activity,
  Cpu,
  Shield,
  Briefcase,
  ScrollText,
} from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { LogoMark, Wordmark } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";

// ─── Desktop simple links ────────────────────────────────────────────────────
const simpleLinks = [
  { to: "/careers", label: "Careers" },
] as const;

// ─── Mobile mega sections (mirror the desktop MegaMenu quality) ──────────────
const mobileSections = [
  {
    heading: "Studio",
    items: [
      {
        to: "/services",
        label: "Services",
        description: "High-impact engineering for teams that ship seriously.",
        icon: <Code2 className="h-4 w-4" />,
      },
      {
        to: "/capabilities",
        label: "Capabilities",
        description: "A studio built like infrastructure — fast and observable.",
        icon: <Layers className="h-4 w-4" />,
      },
      {
        to: "/process",
        label: "Process",
        description: "How our engagements actually run, week by week.",
        icon: <Activity className="h-4 w-4" />,
      },
      {
        to: "/team",
        label: "Team",
        description: "The minds behind the machine.",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
  {
    heading: "Company",
    items: [
      {
        to: "/about",
        label: "Overview",
        description: "Thesis, beliefs, and the numbers behind it.",
        icon: <Compass className="h-4 w-4" />,
      },
      {
        to: "/about/story",
        label: "Story",
        description: "How Goom came to be.",
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        to: "/about/values",
        label: "Values",
        description: "The principles that decide what we build.",
        icon: <GitBranch className="h-4 w-4" />,
      },
      {
        to: "/about/manifesto",
        label: "Manifesto",
        description: "What we owe the work.",
        icon: <Sparkles className="h-4 w-4" />,
      },
      {
        to: "/about/press",
        label: "Press",
        description: "Mentions, assets, and inquiries.",
        icon: <Newspaper className="h-4 w-4" />,
      },
    ],
  },
  {
    heading: "More",
    items: [
      {
        to: "/careers",
        label: "Careers",
        description: "Small team. High autonomy. Real ownership.",
        icon: <Briefcase className="h-4 w-4" />,
      },
      {
        to: "/journal",
        label: "Journal",
        description: "Field reports from the engineering team.",
        icon: <ScrollText className="h-4 w-4" />,
      },
    ],
  },
] as const;



export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    return router.subscribe("onBeforeLoad", () => setOpen(false));
  }, [router]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────────────────── */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* ── Nav bar ──────────────────────────────────────────────────── */}
          <div
            className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full px-4 sm:px-6 py-2.5 transition-all duration-500 ${
              scrolled || open
                ? "bg-background/90 backdrop-blur-xl hairline shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]"
                : "bg-transparent"
            }`}
          >
            <Link to="/" className="flex items-center min-w-0" onClick={() => setOpen(false)}>
              <LogoMark className="block sm:hidden h-7 w-auto" />
              <Wordmark className="hidden sm:block h-[22px] w-auto" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center justify-center gap-7 text-sm text-muted-foreground">
              <MegaMenu
                label="Services"
                to="/services"
                sections={[
                  {
                    heading: "Offerings",
                    items: [
                      {
                        to: "/services",
                        label: "Overview",
                        description: "High-impact engineering for teams that ship.",
                        icon: <Code2 className="h-4 w-4" />,
                      },
                      {
                        to: "/capabilities",
                        label: "Capabilities",
                        description: "A studio built like infrastructure.",
                        icon: <Layers className="h-4 w-4" />,
                      },
                    ],
                  },
                  {
                    heading: "Operations",
                    items: [
                      {
                        to: "/process",
                        label: "Process",
                        description: "How engagements run, week by week.",
                        icon: <Activity className="h-4 w-4" />,
                      },
                      {
                        to: "/team",
                        label: "Team",
                        description: "The minds behind the machine.",
                        icon: <Users className="h-4 w-4" />,
                      },
                    ],
                  },
                ]}
                feature={{
                  eyebrow: "Our methodology",
                  title: "Measure twice. Build once.",
                  body: "How we ship complex distributed systems with unblocked velocity.",
                  to: "/process",
                  cta: "Read our process",
                }}
              />

              <MegaMenu
                label="About"
                to="/about"
                sections={[
                  {
                    heading: "Company",
                    items: [
                      {
                        to: "/about",
                        label: "Overview",
                        description: "Thesis, beliefs, and the numbers behind it.",
                        icon: <Compass className="h-4 w-4" />,
                      },
                      {
                        to: "/about/story",
                        label: "Story",
                        description: "How Goom came to be.",
                        icon: <BookOpen className="h-4 w-4" />,
                      },
                      {
                        to: "/about/values",
                        label: "Values",
                        description: "The principles that decide what we build.",
                        icon: <GitBranch className="h-4 w-4" />,
                      },
                      {
                        to: "/about/manifesto",
                        label: "Manifesto",
                        description: "What we owe the work.",
                        icon: <Sparkles className="h-4 w-4" />,
                      },
                    ],
                  },
                  {
                    heading: "Public",
                    items: [
                      {
                        to: "/about/press",
                        label: "Press",
                        description: "Mentions, assets, inquiries.",
                        icon: <Newspaper className="h-4 w-4" />,
                      },
                      {
                        to: "/team",
                        label: "Team",
                        description: "The minds behind the machine.",
                        icon: <Users className="h-4 w-4" />,
                      },
                    ],
                  },
                ]}
                feature={{
                  eyebrow: "Now hiring",
                  title: "Build with people who ship.",
                  body: "Small team. High autonomy. Real ownership.",
                  to: "/careers",
                  cta: "See open roles",
                }}
              />

              {simpleLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="hover:text-foreground transition-colors"
                  activeProps={{ className: "text-foreground" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2 justify-self-end">
              <ThemeToggle />
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden grid h-9 w-9 place-items-center rounded-full hairline bg-background/60 backdrop-blur-sm transition-colors hover:bg-background"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span
                  className={`absolute transition-all duration-200 ${
                    open ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
                  }`}
                >
                  <X className="h-4 w-4" />
                </span>
                <span
                  className={`absolute transition-all duration-200 ${
                    open ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                  }`}
                >
                  <Menu className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>

          {/* ── Mobile panel ─────────────────────────────────────────────── */}
          <div
            ref={panelRef}
            className={`lg:hidden mt-3 rounded-[28px] hairline bg-background/97 backdrop-blur-2xl shadow-[0_32px_80px_-24px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 origin-top ${
              open
                ? "opacity-100 scale-y-100 translate-y-0 max-h-[82vh] pointer-events-auto"
                : "opacity-0 scale-y-95 -translate-y-2 max-h-0 pointer-events-none"
            }`}
            style={{ transformOrigin: "top center" }}
          >
            <div className="overflow-y-auto max-h-[82vh] no-scrollbar p-4 pb-6 flex flex-col gap-5">

              {/* Sections */}
              {mobileSections.map((section) => (
                <div key={section.heading}>
                  <div className="px-1 mb-2 text-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {section.heading}
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-surface"
                        activeProps={{ className: "bg-surface" }}
                      >
                        {/* Icon */}
                        <span className="shrink-0 grid h-9 w-9 place-items-center rounded-xl hairline bg-background group-hover:bg-foreground group-hover:text-background transition-colors">
                          {item.icon}
                        </span>
                        {/* Text */}
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground leading-tight">
                            {item.label}
                          </span>
                          <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                            {item.description}
                          </span>
                        </span>
                        {/* Arrow */}
                        <ArrowUpRight className="ml-auto shrink-0 h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Featured CTA card */}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="group relative overflow-hidden rounded-2xl bg-foreground text-background p-5 flex items-center justify-between"
              >
                <span className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[var(--lime)] opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
                <div className="relative">
                  <div className="text-mono text-[10px] text-background/50 uppercase tracking-wider">Now open</div>
                  <div className="mt-1 text-display text-xl leading-tight">Start a project</div>
                  <div className="text-xs text-background/60 mt-0.5">Tell us what you're building.</div>
                </div>
                <div className="relative ml-4 shrink-0 grid h-10 w-10 place-items-center rounded-full bg-background/10 group-hover:bg-[var(--lime)] group-hover:text-[var(--ink)] transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>

            </div>
          </div>
        </div>
      </header>
    </>
  );
}
