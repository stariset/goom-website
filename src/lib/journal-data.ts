// Shared journal post data — imported by both journal.index.tsx and journal.$slug.tsx

export interface Post {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  read: string;
  tag: string;
  featured: boolean;
  content?: string;
}

export const posts: Post[] = [
  {
    slug: "event-sourcing-ledger",
    date: "2026 · 05",
    title: "Why we rebuilt a ledger on event sourcing",
    excerpt:
      "Correctness was non-negotiable. After the third silent mutation bug, we decided the ledger needed an immutable log at its core — not as an afterthought, but as the source of truth itself.",
    read: "8 min",
    tag: "Architecture",
    featured: true,
  },
  {
    slug: "sub-second-dispatch",
    date: "2026 · 04",
    title: "Sub-second dispatch with predictable tail latency",
    excerpt:
      "The transport client needed allocation decisions in under 400ms at the 99th percentile. Here's how we built a system that beats that number consistently.",
    read: "12 min",
    tag: "Realtime",
    featured: false,
  },
  {
    slug: "boring-database-schema",
    date: "2026 · 03",
    title: "The boring, beautiful database schema",
    excerpt:
      "We keep reaching for clever schema tricks and paying for it later. Here's a case for the utterly ordinary — and why it compounds.",
    read: "6 min",
    tag: "Engineering",
    featured: false,
  },
  {
    slug: "shipping-cadence-as-feature",
    date: "2026 · 02",
    title: "Shipping cadence as a feature",
    excerpt:
      "When you ship every week, the customer starts to trust the process itself. Cadence is a product decision, not just an engineering discipline.",
    read: "5 min",
    tag: "Process",
    featured: false,
  },
  {
    slug: "hiring-senior-engineers-2026",
    date: "2026 · 01",
    title: "Hiring senior engineers in 2026",
    excerpt:
      "The market is strange. Talented engineers are available, but the signals have changed. How we screen for the only thing that matters: judgment.",
    read: "7 min",
    tag: "Team",
    featured: false,
  },
  {
    slug: "ai-orchestration-in-production",
    date: "2025 · 12",
    title: "AI orchestration in production: what actually breaks",
    excerpt:
      "LLMs in demos look magical. In production, at 3am, with a hallucinated tool call chaining into a live database, they look very different. Here's our hard-won checklist.",
    read: "10 min",
    tag: "AI",
    featured: false,
  },
];

export const tagColors: Record<string, string> = {
  Architecture: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Realtime: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Engineering: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Process: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Team: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  AI: "bg-[var(--lime)]/20 text-[color:var(--ink)]",
};
