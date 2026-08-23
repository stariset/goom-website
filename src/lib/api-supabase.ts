import { supabase } from "./supabase";
import { posts as staticPosts, type Post } from "./journal-data";

export interface TeamMemberData {
    id?: string;
    name: string;
    role: string;
    discipline: "Product" | "Systems" | "Engineering" | "Innovation";
    focus: string;
    bio: string;
    imgUrl: string;
    shipping: string;
    location: string;
    tenure: string;
    signal: string;
    socials: { twitter?: string; github?: string; linkedin?: string };
    orderIndex?: number;
}

export interface JobOpeningData {
    id?: string;
    title: string;
    team: string;
    location: string;
    type: string;
    about: string;
    bullets: string[];
    skills?: string[];
    niceToHave?: string[];
    active: boolean;
    orderIndex?: number;
}

export interface ContactInquiryData {
    id?: string;
    name: string;
    email: string;
    company?: string;
    topic: string;
    brief: string;
    status?: "UNREAD" | "READ" | "ARCHIVED";
    createdAt?: string;
}

// ── JOURNAL API ─────────────────────────────────────────────────────────────

export async function fetchJournalPosts(): Promise<Post[]> {
    try {
        const { data, error } = await supabase
            .from("JournalPost")
            .select("*")
            .eq("published", true)
            .order("createdAt", { ascending: false });

        if (error || !data || data.length === 0) {
            console.info("Using static journal posts fallback");
            return staticPosts;
        }

        return data.map((p) => ({
            slug: p.slug,
            date: p.date,
            title: p.title,
            excerpt: p.excerpt,
            read: p.readTime || p.read,
            tag: p.tag,
            featured: p.featured,
            content: p.content,
        }));
    } catch {
        return staticPosts;
    }
}

export async function fetchJournalPostBySlug(slug: string): Promise<Post | undefined> {
    try {
        const { data, error } = await supabase
            .from("JournalPost")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error || !data) {
            return staticPosts.find((p) => p.slug === slug);
        }

        return {
            slug: data.slug,
            date: data.date,
            title: data.title,
            excerpt: data.excerpt,
            read: data.readTime || data.read,
            tag: data.tag,
            featured: data.featured,
            content: data.content,
        };
    } catch {
        return staticPosts.find((p) => p.slug === slug);
    }
}

// ── TEAM API ────────────────────────────────────────────────────────────────

export async function fetchTeamMembers(): Promise<TeamMemberData[]> {
    try {
        const { data, error } = await supabase
            .from("TeamMember")
            .select("*")
            .order("orderIndex", { ascending: true });

        if (error || !data || data.length === 0) {
            return [];
        }
        return data;
    } catch {
        return [];
    }
}

// ── CAREERS API ─────────────────────────────────────────────────────────────

export const defaultJobOpenings: JobOpeningData[] = [
    {
        title: "Principal Systems Architect",
        location: "Remote · Global",
        type: "Full-time",
        team: "Engineering",
        about: "Own the core of a client ledger system every other surface depends on. You will design for correctness first and performance close behind.",
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
    },
    {
        title: "Staff Platform Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Infrastructure",
        about: "Build the platform every Goom engagement is launched from. Less ticket-taking; more setting the bar.",
        bullets: [
            "Strong Kubernetes and multi-region infrastructure experience",
            "Bias for boring, observable primitives over clever ones",
            "Track record turning developer experience into a moat",
        ],
        skills: ["Kubernetes", "Terraform", "AWS / GCP", "Prometheus", "eBPF", "Go"],
        niceToHave: [
            "Multi-tenant isolation architectures",
            "Custom Kubernetes operator creation",
        ],
        active: true,
    },
    {
        title: "Realtime Systems Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Realtime",
        about: "Sub-second dispatch across live fleets. You will work on the part of a system where milliseconds become dollars.",
        bullets: [
            "Experience with streaming systems (Kafka, NATS, Redpanda, or similar)",
            "Comfortable reasoning about backpressure, ordering, and partial failure",
            "Geospatial or routing experience a plus",
        ],
        skills: ["Rust", "NATS JetStream", "Kafka", "WebSockets", "gRPC", "Spatial Indexes (H3)"],
        niceToHave: [
            "H3 / Uber geospatial indexing experience",
            "High-frequency message serializing protocols (FlatBuffers / Cap'n Proto)",
        ],
        active: true,
    },
    {
        title: "Design Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Product",
        about: "Ship interfaces that feel as considered as the systems under them. Equally fluent in TypeScript and Figma.",
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
    },
    {
        title: "Founding GTM Engineer",
        location: "Remote · Global",
        type: "Full-time",
        team: "Delivery",
        about: "Half engineer, half operator. You will own onboarding, integrations, and the loop between clients and the engineering team.",
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
    },
];

function normalizeJob(job: any): JobOpeningData {
    return {
        ...job,
        skills: (job.skills && Array.isArray(job.skills))
            ? job.skills
            : (typeof job.skills === "string" && job.skills.length > 0 ? job.skills.split(",").map((s: string) => s.trim()) : []),
        niceToHave: (job.niceToHave && Array.isArray(job.niceToHave))
            ? job.niceToHave
            : (typeof job.niceToHave === "string" && job.niceToHave.length > 0 ? job.niceToHave.split("\n").map((s: string) => s.trim()) : []),
    };
}

export async function fetchJobOpenings(): Promise<JobOpeningData[]> {
    try {
        const { data, error } = await supabase
            .from("JobOpening")
            .select("*")
            .eq("active", true)
            .order("orderIndex", { ascending: true });

        if (error) {
            console.warn("fetchJobOpenings error:", error.message);
            return [];
        }

        return (data || []).map(normalizeJob);
    } catch (err) {
        console.warn("fetchJobOpenings network error:", err);
        return [];
    }
}


// ── CONTACT INQUIRIES API ───────────────────────────────────────────────────

export async function submitContactInquiry(inquiry: Omit<ContactInquiryData, "id" | "createdAt" | "status">) {
    try {
        const { data, error } = await supabase
            .from("ContactInquiry")
            .insert([
                {
                    name: inquiry.name,
                    email: inquiry.email,
                    company: inquiry.company || null,
                    topic: inquiry.topic,
                    brief: inquiry.brief,
                    status: "UNREAD",
                },
            ])
            .select();

        if (error) throw error;
        return { success: true, data };
    } catch (err) {
        console.error("Failed to submit inquiry to Supabase:", err);
        return { success: false, error: err };
    }
}

export async function uploadAssetToSupabase(file: File, folder: "avatars" | "journal" = "avatars"): Promise<string | null> {
    try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from("goom-assets")
            .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (!uploadError) {
            const { data } = supabase.storage.from("goom-assets").getPublicUrl(filePath);
            if (data?.publicUrl) return data.publicUrl;
        }
    } catch {
        // Fall back to Data URL below
    }

    // Reliable Fallback: Read file as Data URL string (guaranteed to render & store in DB)
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
    });
}
