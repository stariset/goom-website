import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
    {
        slug: "event-sourcing-ledger",
        date: "2026 · 05",
        title: "Why we rebuilt a ledger on event sourcing",
        excerpt:
            "Correctness was non-negotiable. After the third silent mutation bug, we decided the ledger needed an immutable log at its core — not as an afterthought, but as the source of truth itself.",
        content: `## The Problem with Mutable Ledgers\n\nTraditional CRUD ledgers update financial states in place. When a balance changes, an SQL \`UPDATE\` query mutates the row directly. This introduces dangerous edge cases when concurrent transactions occur or when historical audits are requested.\n\n### Why Event Sourcing?\n\nBy representing every financial event as an immutable sequence of facts, we achieve:\n\n- **100% Auditability**: Every balance is a deterministic projection of past events.\n- **Time Travel**: Reconstructing system state at any exact millisecond.\n- **Zero Silent Data Corruption**: Append-only logs eliminate overwrites.`,
        readTime: "8 min",
        tag: "Architecture",
        featured: true,
        published: true,
    },
    {
        slug: "sub-second-dispatch",
        date: "2026 · 04",
        title: "Sub-second dispatch with predictable tail latency",
        excerpt:
            "The transport client needed allocation decisions in under 400ms at the 99th percentile. Here's how we built a system that beats that number consistently.",
        content: `## High Velocity Dispatch Systems\n\nDispatching drivers and fleets in real-time requires evaluating spatial proximity, routing matrices, and driver availability simultaneously.\n\n### Benchmarks & Optimizations\n\n1. **In-Memory Spatial Indexing**: Using H3 hexagonal spatial indexes to eliminate expensive GIS spatial queries.\n2. **Backpressure Control**: Queue buffering prevents cascade failures during surge traffic spikes.`,
        readTime: "12 min",
        tag: "Realtime",
        featured: false,
        published: true,
    },
    {
        slug: "boring-database-schema",
        date: "2026 · 03",
        title: "The boring, beautiful database schema",
        excerpt:
            "We keep reaching for clever schema tricks and paying for it later. Here's a case for the utterly ordinary — and why it compounds.",
        content: `## The Cost of Cleverness\n\nClever database tricks feel productive on day one, but compound into technical debt as teams grow. Stick to normalized tables, clean foreign keys, and boring indexing strategies.`,
        readTime: "6 min",
        tag: "Engineering",
        featured: false,
        published: true,
    },
    {
        slug: "shipping-cadence-as-feature",
        date: "2026 · 02",
        title: "Shipping cadence as a feature",
        excerpt:
            "When you ship every week, the customer starts to trust the process itself. Cadence is a product decision, not just an engineering discipline.",
        content: `## Cadence Creates Trust\n\nConsistency beats intensity every single time. Small, steady deployments reduce blast radius and keep customer feedback loops extremely tight.`,
        readTime: "5 min",
        tag: "Process",
        featured: false,
        published: true,
    },
    {
        slug: "hiring-senior-engineers-2026",
        date: "2026 · 01",
        title: "Hiring senior engineers in 2026",
        excerpt:
            "The market is strange. Talented engineers are available, but the signals have changed. How we screen for the only thing that matters: judgment.",
        content: `## Evaluating Engineering Judgment\n\nWe don't test for memorized syntax or trivia. We look for how candidates reason about trade-offs, system boundaries, and failure modes.`,
        readTime: "7 min",
        tag: "Team",
        featured: false,
        published: true,
    },
    {
        slug: "ai-orchestration-in-production",
        date: "2025 · 12",
        title: "AI orchestration in production: what actually breaks",
        excerpt:
            "LLMs in demos look magical. In production, at 3am, with a hallucinated tool call chaining into a live database, they look very different. Here's our hard-won checklist.",
        content: `## Production LLM Guardrails\n\n1. Deterministic schema validation before tool execution.\n2. Strict timeout boundaries.\n3. Human-in-the-loop fallback hooks for critical actions.`,
        readTime: "10 min",
        tag: "AI",
        featured: false,
        published: true,
    },
];

const team = [
    {
        name: "Bethe Bayou",
        role: "Co-Founder & Product Lead",
        focus: "Product strategy · Backend",
        discipline: "Product",
        bio: "Leads the company's overall direction and product strategy, specializing in backend engineering, system architecture, APIs, databases, scalable infrastructure, and AI-powered product development.",
        imgUrl: "/team-bethe.jpg",
        shipping: "Company product strategy",
        location: "Addis Ababa",
        tenure: "Co-Founder",
        signal: "Architecture · APIs · AI products",
        socials: { twitter: "bethebayou", github: "bethe", linkedin: "bethebayou" },
        orderIndex: 1,
    },
    {
        name: "Abreham Nigus",
        role: "Co-Founder & Systems Lead",
        focus: "Distributed systems",
        discipline: "Systems",
        bio: "Leads backend and distributed systems engineering, specializing in microservices, data infrastructure, Kafka, Elasticsearch, Spark, and scalable system architecture.",
        imgUrl: "/team-abreham.jpg",
        shipping: "Data infrastructure platform",
        location: "Addis Ababa",
        tenure: "Co-Founder",
        signal: "Kafka · Elasticsearch · Spark",
        socials: { twitter: "abrehamnigus", github: "abreham", linkedin: "abrehamnigus" },
        orderIndex: 2,
    },
    {
        name: "Bisrat Beriso",
        role: "Co-Founder & Engineering Lead",
        focus: "Full-stack · System design",
        discipline: "Engineering",
        bio: "Leads software engineering and technical architecture, focusing on full-stack development, system design, technical problem-solving, and building robust, maintainable solutions.",
        imgUrl: "/team-bisrat-b.jpg",
        shipping: "Core engineering architecture",
        location: "Addis Ababa",
        tenure: "Co-Founder",
        signal: "Full-stack · System design",
        socials: { github: "bisratb", linkedin: "bisratberiso" },
        orderIndex: 3,
    },
    {
        name: "Bisrat Gulelat",
        role: "Co-Founder & Innovation Lead",
        focus: "AI · Mobile · Emerging tech",
        discipline: "Innovation",
        bio: "Leads innovation initiatives, focusing on artificial intelligence, mobile development, emerging technologies, product ideation, and exploring new opportunities for the company.",
        imgUrl: "/team-bisrat-g.jpg",
        shipping: "AI & mobile initiatives",
        location: "Addis Ababa",
        tenure: "Co-Founder",
        signal: "AI · Mobile · R&D",
        socials: { twitter: "bisratg", github: "bisratg", linkedin: "bisratgulelat" },
        orderIndex: 4,
    },
];

const jobs = [
    {
        title: "Principal Systems Architect",
        location: "Remote · Global",
        type: "Full-time",
        team: "Engineering",
        about:
            "Own the core of a client ledger system every other surface depends on. You will design for correctness first and performance close behind.",
        bullets: [
            "8+ years shipping production systems at scale",
            "Deep experience with PostgreSQL, Go/Rust, and event sourcing",
            "Comfortable owning a service end to end, including system architecture",
        ],
        skills: ["Go", "Rust", "PostgreSQL", "Event Sourcing", "eBPF", "Distributed Systems"],
        niceToHave: [
            "Experience designing kernel modules or high-throughput ledgers",
            "Open source contributions to infrastructure projects",
        ],
        active: true,
        orderIndex: 1,
    },
    {
        title: "Staff Platform Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Infrastructure",
        about:
            "Build the platform every Goom engagement is launched from. Less ticket-taking; more setting the bar.",
        bullets: [
            "Strong Kubernetes and multi-region infrastructure experience",
            "Bias for boring, observable primitives over clever ones",
            "Track record turning developer experience into a moat",
        ],
        skills: ["Kubernetes", "Terraform", "AWS / GCP", "Observability", "Go", "Docker"],
        niceToHave: [
            "Multi-region cluster federation",
            "eBPF / Cilium networking experience",
        ],
        active: true,
        orderIndex: 2,
    },
    {
        title: "Realtime Systems Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Realtime",
        about:
            "Sub-second dispatch across live fleets. You will work on the part of a system where milliseconds become dollars.",
        bullets: [
            "Experience with streaming systems (Kafka, NATS, Redpanda, or similar)",
            "Comfortable reasoning about backpressure, ordering, and partial failure",
            "Geospatial or routing experience a plus",
        ],
        skills: ["Kafka", "NATS", "Redpanda", "Rust / C++", "WebSockets", "Spatial Indexes (H3)"],
        niceToHave: [
            "Geospatial routing algorithms",
            "Low-latency IPC design",
        ],
        active: true,
        orderIndex: 3,
    },
    {
        title: "Design Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Product",
        about:
            "Ship interfaces that feel as considered as the systems under them. Equally fluent in TypeScript and Figma.",
        bullets: [
            "Senior-level React and TypeScript",
            "Has shipped a design system that other engineers actually used",
            "Cares about typography, motion, and the first 100ms",
        ],
        skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma", "Design Systems"],
        niceToHave: [
            "Custom WebGL / Canvas shader implementation",
            "Experience designing dark-mode technical dossier UIs",
        ],
        active: true,
        orderIndex: 4,
    },
    {
        title: "Founding GTM Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Delivery",
        about:
            "Half engineer, half operator. You will own onboarding, integrations, and the loop between clients and the engineering team.",
        bullets: [
            "Engineering background plus customer-facing instincts",
            "Comfortable writing code in front of a prospect",
            "Has worked closely with finance, ops, or logistics teams",
        ],
        skills: ["TypeScript", "Node.js", "REST / GraphQL", "Python", "Technical Writing"],
        niceToHave: [
            "Prior experience as a developer advocate or solutions architect",
        ],
        active: true,
        orderIndex: 5,
    },
];

async function main() {
    console.log("🌱 Seeding Goom Supabase database...");

    // Seed Articles
    for (const post of posts) {
        await prisma.journalPost.upsert({
            where: { slug: post.slug },
            update: post,
            create: post,
        });
    }

    // Seed Team
    for (const member of team) {
        await prisma.teamMember.create({
            data: member,
        });
    }

    // Seed Jobs
    for (const job of jobs) {
        await prisma.jobOpening.create({
            data: job,
        });
    }

    console.log("✅ Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
