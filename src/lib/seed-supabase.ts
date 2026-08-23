import { createClient } from "@supabase/supabase-js";
import { posts } from "./journal-data";

const supabaseUrl = "https://taqytoptjggkirreuora.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhcXl0b3B0amdna2lycmV1b3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NjgyNjMsImV4cCI6MjEwMzA0NDI2M30.6juObQXbAYF0rCWz9_Sr6I_oAGMoEmfvii3yG_Aixd0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

async function seed() {
    console.log("🚀 Seeding Supabase over HTTPS REST API...");

    for (const post of posts) {
        const { error } = await supabase.from("JournalPost").upsert([
            {
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                content: post.excerpt,
                date: post.date,
                readTime: post.read,
                tag: post.tag,
                featured: post.featured,
                published: true,
            },
        ]);
        if (error) console.log("Post note:", error.message);
    }

    // Delete existing jobs and re-insert full data with skills & niceToHave
    const { error: delErr } = await supabase.from("JobOpening").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (delErr) console.log("Job delete note:", delErr.message);

    for (const job of jobs) {
        const { error } = await supabase.from("JobOpening").insert([job]);
        if (error) console.log("Job note:", error ? error.message : "Success");
    }

    console.log("✨ HTTPS Seed process completed!");
}

seed();
