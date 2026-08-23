import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://taqytoptjggkirreuora.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhcXl0b3B0amdna2lycmV1b3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NjgyNjMsImV4cCI6MjEwMzA0NDI2M30.6juObQXbAYF0rCWz9_Sr6I_oAGMoEmfvii3yG_Aixd0"
);

const jobs = [
    {
        title: "Principal Systems Architect",
        location: "Remote · Global",
        type: "Full-time",
        team: "Engineering",
        about: "Own the core of a client ledger system every other surface depends on. You will design for correctness first and performance close behind.",
        bullets: ["8+ years shipping production systems at scale", "Deep experience with PostgreSQL, Go/Rust, and event sourcing", "Comfortable owning a service end to end, including system architecture"],
        skills: ["Go", "Rust", "PostgreSQL", "Event Sourcing", "eBPF", "Distributed Systems"],
        niceToHave: ["Experience designing kernel modules or high-throughput ledgers", "Open source contributions to infrastructure projects"],
        active: true, orderIndex: 1,
    },
    {
        title: "Staff Platform Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Infrastructure",
        about: "Build the platform every Goom engagement is launched from. Less ticket-taking; more setting the bar.",
        bullets: ["Strong Kubernetes and multi-region infrastructure experience", "Bias for boring, observable primitives over clever ones", "Track record turning developer experience into a moat"],
        skills: ["Kubernetes", "Terraform", "AWS / GCP", "Observability", "Go", "Docker"],
        niceToHave: ["Multi-region cluster federation", "eBPF / Cilium networking experience"],
        active: true, orderIndex: 2,
    },
    {
        title: "Realtime Systems Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Realtime",
        about: "Sub-second dispatch across live fleets. You will work on the part of a system where milliseconds become dollars.",
        bullets: ["Experience with streaming systems (Kafka, NATS, Redpanda, or similar)", "Comfortable reasoning about backpressure, ordering, and partial failure", "Geospatial or routing experience a plus"],
        skills: ["Kafka", "NATS", "Redpanda", "Rust / C++", "WebSockets", "Spatial Indexes (H3)"],
        niceToHave: ["Geospatial routing algorithms", "Low-latency IPC design"],
        active: true, orderIndex: 3,
    },
    {
        title: "Design Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Product",
        about: "Ship interfaces that feel as considered as the systems under them. Equally fluent in TypeScript and Figma.",
        bullets: ["Senior-level React and TypeScript", "Has shipped a design system that other engineers actually used", "Cares about typography, motion, and the first 100ms"],
        skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma", "Design Systems"],
        niceToHave: ["Custom WebGL / Canvas shader implementation", "Experience designing dark-mode technical dossier UIs"],
        active: true, orderIndex: 4,
    },
    {
        title: "Founding GTM Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Delivery",
        about: "Half engineer, half operator. You will own onboarding, integrations, and the loop between clients and the engineering team.",
        bullets: ["Engineering background plus customer-facing instincts", "Comfortable writing code in front of a prospect", "Has worked closely with finance, ops, or logistics teams"],
        skills: ["TypeScript", "Node.js", "REST / GraphQL", "Python", "Technical Writing"],
        niceToHave: ["Prior experience as a developer advocate or solutions architect"],
        active: true, orderIndex: 5,
    },
];

async function seed() {
    console.log("🚀 Full seed with skills + niceToHave...\n");

    // Delete all existing rows first
    const { error: delErr } = await supabase.from("JobOpening").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (delErr) console.warn("Delete note:", delErr.message);

    let ok = 0;
    for (const job of jobs) {
        const { data, error } = await supabase.from("JobOpening").insert([job]).select();
        if (error) {
            console.error(`❌ "${job.title}": ${error.message}`);
        } else {
            console.log(`  ✅ ${job.title} [skills: ${job.skills.length}, niceToHave: ${job.niceToHave.length}]`);
            ok++;
        }
    }

    const { data: final } = await supabase.from("JobOpening").select("id,title,active,skills,niceToHave").order("orderIndex");
    console.log(`\n✨ ${ok}/${jobs.length} jobs seeded:`);
    final?.forEach((j) => console.log(`  - ${j.title} | skills: ${Array.isArray(j.skills) ? j.skills.join(", ") : "MISSING"}`));
}

seed().catch(console.error);
