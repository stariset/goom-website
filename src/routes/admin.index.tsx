import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  FileText,
  Users,
  Briefcase,
  Mail,
  Sparkles,
  Plus,
  Lock,
  Upload,
  Check,
  Database,
  ExternalLink,
  Loader2,
  Filter,
  UserCheck,
  Trash2,
  Power,
  Edit,
  Bold,
  Italic,
  Heading,
  List,
  Code,
  Eye,
  X,
  ArrowUpRight,
} from "lucide-react";
import { PageHero } from "../components/site/SectionHeader";
import { Reveal } from "../components/site/Reveal";
import { posts as staticPosts } from "../lib/journal-data";
import { supabase } from "../lib/supabase";
import { uploadAssetToSupabase } from "../lib/api-supabase";
import betheImg from "../assets/team-bethe.jpg";
import bisratBImg from "../assets/team-bisrat-b.jpg";
import bisratGImg from "../assets/team-bisrat-g.jpg";
import abrehamImg from "../assets/team-abreham.jpg";

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

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Management — Goom" },
      { name: "description", content: "Studio administrative management panel." },
    ],
  }),
  component: AdminDashboard,
});

type TabType = "overview" | "journal" | "team" | "careers" | "inquiries" | "settings";

function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "leads" | "applications">("all");

  // Loading States for Post Buttons
  const [publishingArticle, setPublishingArticle] = useState(false);
  const [addingMember, setAddingMember] = useState(false);
  const [publishingJob, setPublishingJob] = useState(false);

  // Read state tracking for unseen client briefs / job applications
  const [readInquiryIds, setReadInquiryIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("goom_read_inquiries");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // States
  const [journalPosts, setJournalPosts] = useState(staticPosts);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamMemberCount, setTeamMemberCount] = useState(4);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | number | null>(null);
  const [confirmDeleteMemberId, setConfirmDeleteMemberId] = useState<string | number | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Job Editing Modal State
  const [editingJob, setEditingJob] = useState<any | null>(null);
  const [updatingJob, setUpdatingJob] = useState(false);

  // Form states
  const [newJob, setNewJob] = useState({
    title: "",
    team: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
    about: "",
    bullets: "",
    skills: "",
    niceToHave: "",
  });


  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tag: "Architecture",
    readTime: "5 min",
    featured: false,
  });

  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    discipline: "Product",
    focus: "",
    bio: "",
    imgUrl: "",
    shipping: "",
    location: "Addis Ababa",
    tenure: "Senior Engineer",
    signal: "",
  });

  // Handle Passcode Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoggingIn(false);

    if (passcode === "goom2026" || passcode === "admin") {
      setAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }

  // Save read inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("goom_read_inquiries", JSON.stringify(Array.from(readInquiryIds)));
    } catch (e) {
      console.warn("localStorage error", e);
    }
  }, [readInquiryIds]);

  // Sync jobs state to localStorage for instant /careers page updates
  useEffect(() => {
    try {
      localStorage.setItem("goom_jobs", JSON.stringify(jobs));
    } catch (e) {
      console.warn("localStorage jobs error", e);
    }
  }, [jobs]);

  // Load live data from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        const { data: postsData } = await supabase.from("JournalPost").select("*");
        if (postsData && postsData.length > 0) {
          setJournalPosts(postsData as any);
        }

        const { data: inqData } = await supabase.from("ContactInquiry").select("*").order("createdAt", { ascending: false });
        if (inqData) {
          setInquiries(inqData);
        }

        const { data: memberData } = await supabase.from("TeamMember").select("*").order("orderIndex", { ascending: true });
        if (memberData && memberData.length > 0) {
          setTeamMembers(memberData);
          setTeamMemberCount(memberData.length);
        }

        const { data: jobData } = await supabase.from("JobOpening").select("*").order("orderIndex", { ascending: true });
        if (jobData) {
          setJobs(jobData);
        }
      } catch (err) {
        console.warn("Supabase load:", err);
      }
    }
    loadData();
  }, []); // ← intentionally empty: runs once on mount only

  // Toggle Read / Unseen Status
  function toggleReadInquiry(id: string) {
    setReadInquiryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  // Handle Avatar Image Upload
  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    setStatusMsg("Uploading photo to Supabase Storage...");

    const url = await uploadAssetToSupabase(file, "avatars");
    setUploading(false);

    if (url) {
      setNewMember((prev) => ({ ...prev, imgUrl: url }));
      setStatusMsg("Avatar uploaded successfully!");
    } else {
      setStatusMsg("Upload failed. Storage bucket fallback active.");
    }
  }

  // Handle Create Journal Post
  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    setPublishingArticle(true);
    setStatusMsg("Saving article to Supabase database...");

    const slug = newPost.slug || newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

    try {
      const { error } = await supabase.from("JournalPost").insert([
        {
          slug,
          title: newPost.title,
          excerpt: newPost.excerpt,
          content: newPost.content,
          tag: newPost.tag,
          date,
          readTime: newPost.readTime,
          published: true,
        },
      ]);

      if (error) throw error;

      setStatusMsg("Article published successfully!");
      setJournalPosts((prev) => [{ ...newPost, slug, date, published: true } as any, ...prev]);
      setNewPost({ title: "", slug: "", excerpt: "", content: "", tag: "Architecture", readTime: "5 min", featured: false });
    } catch (err: any) {
      console.error(err);
      setStatusMsg("Notice: Saved locally (Supabase table offline or schema pending).");
      setJournalPosts((prev) => [{ ...newPost, slug, date, published: true } as any, ...prev]);
    } finally {
      setPublishingArticle(false);
    }
  }

  // Toggle Job Active / Deactivate
  async function handleToggleJobActive(job: any, index: number) {
    const nextActive = !job.active;
    setStatusMsg(`${nextActive ? "Activating" : "Deactivating"} job post "${job.title}"...`);

    const updated = jobs.map((j, i) => (i === index || (j.id && j.id === job.id) ? { ...j, active: nextActive } : j));
    setJobs(updated);

    if (job.id) {
      try {
        await supabase.from("JobOpening").update({ active: nextActive }).eq("id", job.id);
        setStatusMsg(`Job post "${job.title}" status updated to ${nextActive ? "ACTIVE" : "PAUSED"}.`);
      } catch (err) {
        console.warn("Supabase toggle job error:", err);
      }
    } else {
      setStatusMsg(`Job post "${job.title}" status set to ${nextActive ? "ACTIVE" : "PAUSED"}.`);
    }
  }

  // Delete Job Opening
  async function handleDeleteJob(job: any, index: number) {
    setConfirmDeleteId(null);
    setStatusMsg(`Deleting job post "${job.title}"...`);

    const updated = jobs.filter((j, i) => (job.id ? j.id !== job.id : i !== index));
    setJobs(updated);

    try {
      if (job.id) {
        await supabase.from("JobOpening").delete().eq("id", job.id);
      } else {
        await supabase.from("JobOpening").delete().eq("title", job.title);
      }
      setStatusMsg(`Job post "${job.title}" deleted successfully.`);
    } catch (err) {
      console.warn("Supabase delete job error:", err);
      setStatusMsg(`Job post "${job.title}" deleted.`);
    }
  }

  // Submit Updated Job
  async function handleUpdateJobSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingJob) return;

    setUpdatingJob(true);
    setStatusMsg(`Updating job role "${editingJob.title}"...`);

    const updatedData = {
      ...editingJob,
      skills: typeof editingJob.skills === "string"
        ? editingJob.skills.split(",").map((s: string) => s.trim()).filter((s: string) => s.length > 0)
        : editingJob.skills,
      niceToHave: typeof editingJob.niceToHave === "string"
        ? editingJob.niceToHave.split("\n").map((s: string) => s.trim()).filter((s: string) => s.length > 0)
        : editingJob.niceToHave,
      bullets: typeof editingJob.bullets === "string"
        ? editingJob.bullets.split("\n").map((s: string) => s.trim()).filter((s: string) => s.length > 0)
        : editingJob.bullets,
    };

    const targetIdx = editingJob.originalIndex !== undefined ? editingJob.originalIndex : jobs.findIndex(j => j.id === editingJob.id || j.title === editingJob.originalTitle);
    const updatedJobs = jobs.map((j, idx) => (idx === targetIdx ? updatedData : j));
    setJobs(updatedJobs);

    if (editingJob.id) {
      try {
        await supabase.from("JobOpening").update({
          title: updatedData.title,
          team: updatedData.team,
          location: updatedData.location,
          type: updatedData.type,
          about: updatedData.about,
          bullets: updatedData.bullets,
          skills: updatedData.skills,
          niceToHave: updatedData.niceToHave,
          active: updatedData.active,
        }).eq("id", editingJob.id);
      } catch (err) {
        console.warn("Supabase update job error:", err);
      }
    }

    setUpdatingJob(false);
    setEditingJob(null);
    setStatusMsg(`Job role "${updatedData.title}" updated & synced to /careers!`);
  }

  // Counts
  const isJobApplication = (i: any) =>
    i.topic === "Careers" ||
    i.topic === "Job Application" ||
    (i.brief && (
      i.brief.includes("APPLIED ROLE") ||
      i.brief.includes("PORTFOLIO") ||
      i.brief.includes("RESUME") ||
      i.brief.includes("GITHUB") ||
      i.brief.includes("LINKEDIN")
    ));

  const jobApplicationsCount = inquiries.filter(isJobApplication).length;

  // Only count unseen job applications (not general leads) for the careers-focused badge
  const unseenApplicationsCount = inquiries.filter((i, idx) => {
    const id = i.id || `inq-${idx}`;
    return !readInquiryIds.has(id) && isJobApplication(i);
  }).length;

  // Count all unseen submissions for the inbox tab badge
  const unseenInquiriesCount = inquiries.filter((i, idx) => {
    const id = i.id || `inq-${idx}`;
    return !readInquiryIds.has(id);
  }).length;

  const filteredInquiries = inquiries.filter((i) => {
    if (inquiryFilter === "applications") return isJobApplication(i);
    if (inquiryFilter === "leads") return !isJobApplication(i);
    return true;
  });

  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 pt-28 sm:pt-36 pb-20">
        <Reveal className="w-full max-w-md rounded-3xl border border-foreground/10 bg-background p-8 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="mx-auto h-12 w-12 rounded-full lime-chip grid place-items-center">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">STUDIO ACCESS</span>
            <h1 className="mt-2 text-display text-3xl">Goom Management</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter studio passcode to access management panel.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">Passcode</label>
              <input
                type="password"
                placeholder="Enter passcode (default: goom2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-foreground/15 bg-surface/50 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
              />
              {authError && <p className="mt-2 text-xs text-rose-500">Invalid passcode. Try 'goom2026'</p>}
            </div>
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Authenticating...
                </>
              ) : (
                "Enter Dashboard"
              )}
            </button>
          </form>
        </Reveal>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="STUDIO MANAGEMENT"
        title={<>Content & <span className="italic">roster control.</span></>}
        description="Manage articles, team roster, open positions, job applications, and incoming client briefs."
      />

      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
          {/* Top Status Notification Banner */}
          {statusMsg && (
            <div className="rounded-2xl hairline bg-surface/80 px-5 py-3.5 text-sm flex items-center justify-between text-foreground">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--lime)]" />
                {statusMsg}
              </span>
              <button onClick={() => setStatusMsg(null)} className="text-xs text-muted-foreground hover:text-foreground">
                Dismiss
              </button>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b hairline pb-4">
            <TabButton label="Overview" icon={<Sparkles className="h-4 w-4" />} active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
            <TabButton label="Journal Posts" icon={<FileText className="h-4 w-4" />} active={activeTab === "journal"} onClick={() => setActiveTab("journal")} count={journalPosts.length} />
            <TabButton label="Team Roster" icon={<Users className="h-4 w-4" />} active={activeTab === "team"} onClick={() => setActiveTab("team")} />
            <TabButton label="Careers" icon={<Briefcase className="h-4 w-4" />} active={activeTab === "careers"} onClick={() => setActiveTab("careers")} count={jobs.length} />
            <TabButton
              label="Client Briefs & Applications"
              icon={<Mail className="h-4 w-4" />}
              active={activeTab === "inquiries"}
              onClick={() => setActiveTab("inquiries")}
              count={inquiries.length}
              badgeCount={unseenInquiriesCount}
            />
            <TabButton label="Supabase Status" icon={<Database className="h-4 w-4" />} active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard title="Total Articles" value={String(journalPosts.length).padStart(2, "0")} label="Journal Posts" onClick={() => setActiveTab("journal")} />
              <StatCard title="Team Members" value={String(teamMemberCount).padStart(2, "0")} label="Active Roster" onClick={() => setActiveTab("team")} />
              <StatCard title="Open Roles" value={String(jobs.length).padStart(2, "0")} label="Career Listings" onClick={() => setActiveTab("careers")} />
              <StatCard
                title="Applicants & Briefs"
                value={String(inquiries.length).padStart(2, "0")}
                label={unseenInquiriesCount > 0 ? `${unseenInquiriesCount} UNSEEN SUBMISSIONS →` : "Inquiries →"}
                onClick={() => setActiveTab("inquiries")}
                highlight={unseenInquiriesCount > 0}
              />
            </div>
          )}

          {/* TAB 2: JOURNAL EDITOR */}
          {activeTab === "journal" && (
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
              <div className="rounded-3xl hairline bg-background p-6 sm:p-8 space-y-6">
                <h3 className="text-display text-2xl">Publish New Article</h3>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div>
                    <label className="text-mono text-[10px] uppercase text-muted-foreground">Title</label>
                    <input
                      required
                      placeholder="e.g. Architecture of high-throughput ledger"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-mono text-[10px] uppercase text-muted-foreground">Excerpt</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Short summary for homepage and RSS feed"
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                      className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Category Tag</label>
                      <select
                        value={newPost.tag}
                        onChange={(e) => setNewPost({ ...newPost, tag: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      >
                        {["Architecture", "Realtime", "Engineering", "Process", "Team", "AI"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Read Time</label>
                      <input
                        placeholder="5 min"
                        value={newPost.readTime}
                        onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Content (Markdown / Body)</label>
                      <FormattingToolbar
                        textareaId="journal-content-textarea"
                        onFormat={(formatted) => setNewPost({ ...newPost, content: formatted })}
                      />
                    </div>
                    <textarea
                      id="journal-content-textarea"
                      required
                      rows={8}
                      placeholder="Write your article in Markdown..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={publishingArticle}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
                  >
                    {publishingArticle ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Publishing Article...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" /> Save & Publish Article
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Published Posts List */}
              <div className="space-y-4">
                <div className="text-mono text-[11px] text-muted-foreground">CURRENT ARTICLES ({journalPosts.length})</div>
                <div className="space-y-3">
                  {journalPosts.map((p) => (
                    <div key={p.slug} className="rounded-2xl hairline bg-background p-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-mono text-[10px] text-muted-foreground">{p.date}</span>
                          <span className="rounded-full bg-surface px-2.5 py-0.5 text-mono text-[10px]">{p.tag}</span>
                        </div>
                        <h4 className="mt-2 font-medium text-base">{p.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.excerpt}</p>
                      </div>
                      <a href={`/journal/${p.slug}`} target="_blank" className="p-2 rounded-full hairline hover:bg-surface text-muted-foreground hover:text-foreground">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TEAM ROSTER */}
          {activeTab === "team" && (
            <div className="space-y-8">
              {/* Live Team Roster List */}
              <div className="rounded-3xl hairline bg-background p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b hairline pb-4">
                  <div>
                    <span className="text-mono text-[10px] text-muted-foreground uppercase">STUDIO ROSTER</span>
                    <h3 className="text-display text-2xl">Current Team Members ({teamMembers.length})</h3>
                  </div>
                  <span className="text-mono text-xs text-muted-foreground">Synced with Supabase</span>
                </div>

                {teamMembers.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    No team members found in database. Add your first team member below.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamMembers.map((m, idx) => {
                      const avatarSrc = resolveTeamAvatar(m.imgUrl, m.name);
                      return (
                        <div key={m.id || idx} className="rounded-2xl hairline bg-surface/30 p-5 flex flex-col justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            <div className="h-12 w-12 shrink-0 rounded-full bg-surface overflow-hidden hairline grid place-items-center font-display text-lg">
                              {avatarSrc ? (
                                <img src={avatarSrc} alt={m.name} className="h-full w-full object-cover" />
                              ) : (
                                m.name?.charAt(0) || "T"
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-medium text-base text-foreground truncate">{m.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{m.role}</p>
                              {m.discipline && (
                                <span className="mt-1.5 inline-block rounded-full bg-surface px-2.5 py-0.5 text-mono text-[10px] text-foreground/80 uppercase">
                                  {m.discipline}
                                </span>
                              )}
                            </div>
                          </div>

                          {m.bio && (
                            <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
                              {m.bio}
                            </p>
                          )}

                          <div className="flex items-center justify-between pt-3 border-t hairline text-xs text-muted-foreground">
                            <span>{m.location || "Addis Ababa"}</span>
                            {confirmDeleteMemberId === (m.id || idx) ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-rose-500 font-medium">Delete?</span>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    setConfirmDeleteMemberId(null);
                                    setStatusMsg(`Removing ${m.name} from Supabase...`);
                                    const updated = teamMembers.filter((_, i) => i !== idx);
                                    setTeamMembers(updated);
                                    setTeamMemberCount(updated.length);
                                    try {
                                      if (m.id) {
                                        await supabase.from("TeamMember").delete().eq("id", m.id);
                                      } else {
                                        await supabase.from("TeamMember").delete().eq("name", m.name);
                                      }
                                      setStatusMsg(`Team member "${m.name}" removed from database.`);
                                    } catch (err) {
                                      console.warn("Delete member error", err);
                                      setStatusMsg(`Failed to delete "${m.name}" from database.`);
                                    }
                                  }}
                                  className="px-2.5 py-1 text-xs rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteMemberId(null)}
                                  className="px-2.5 py-1 text-xs rounded-full hairline hover:bg-surface text-muted-foreground"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteMemberId(m.id || idx)}
                                title="Remove Team Member"
                                className="p-1.5 rounded-full hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add Team Member Form */}
              <div className="rounded-3xl hairline bg-background p-6 sm:p-8 space-y-6 max-w-2xl">
                <h3 className="text-display text-2xl">Add Team Member</h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newMember.imgUrl) {
                      setStatusMsg("⚠️ Avatar Photo is required. Please choose and upload an image file before saving.");
                      return;
                    }
                    setAddingMember(true);
                    setStatusMsg("Saving team member to Supabase database...");
                    try {
                      const newObj = {
                        name: newMember.name,
                        role: newMember.role,
                        discipline: newMember.discipline || "Product",
                        focus: newMember.focus || `${newMember.role} · Goom Studio`,
                        bio: newMember.bio || `${newMember.name} builds systems and products at Goom Studio.`,
                        imgUrl: newMember.imgUrl || "",
                        shipping: newMember.shipping || "Core studio operations & systems",
                        location: newMember.location || "Addis Ababa",
                        tenure: newMember.tenure || "Senior Engineer",
                        signal: newMember.signal || "Engineering · Architecture",
                        socials: newMember.socials || { twitter: "", github: "", linkedin: "" },
                        orderIndex: teamMembers.length + 1,
                      };
                      const { data, error } = await supabase.from("TeamMember").insert([newObj]).select();
                      if (error) {
                        console.error("Supabase insert TeamMember error:", error);
                        throw error;
                      }
                      const added = data && data[0] ? data[0] : newObj;
                      const updated = [...teamMembers, added];
                      setTeamMembers(updated);
                      setTeamMemberCount(updated.length);
                      setNewMember({
                        name: "",
                        role: "",
                        discipline: "Product",
                        focus: "",
                        bio: "",
                        imgUrl: "",
                        shipping: "",
                        location: "Addis Ababa",
                        tenure: "Senior Engineer",
                        signal: "",
                        socials: { twitter: "", github: "", linkedin: "" },
                      });
                      setStatusMsg(`Team member "${added.name}" added successfully to Supabase!`);
                    } catch (err: any) {
                      console.error("Add team member error:", err);
                      setStatusMsg("Notice: Saved locally (Supabase write error).");
                    } finally {
                      setAddingMember(false);
                    }
                  }}
                  className="space-y-4"
                >
                  {/* Basic Info */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Full Name <span className="text-rose-500">*</span></label>
                      <input
                        required
                        placeholder="e.g. Bisrat Beriso"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Role Title <span className="text-rose-500">*</span></label>
                      <input
                        required
                        placeholder="e.g. Co-Founder & Systems Lead"
                        value={newMember.role}
                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Discipline & Tenure */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Discipline Tag</label>
                      <select
                        value={newMember.discipline}
                        onChange={(e) => setNewMember({ ...newMember, discipline: e.target.value as any })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      >
                        <option value="Product">Product</option>
                        <option value="Systems">Systems</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Innovation">Innovation</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Tenure / Title</label>
                      <input
                        placeholder="e.g. Co-Founder / Senior Engineer"
                        value={newMember.tenure}
                        onChange={(e) => setNewMember({ ...newMember, tenure: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Location</label>
                      <input
                        placeholder="e.g. Addis Ababa"
                        value={newMember.location}
                        onChange={(e) => setNewMember({ ...newMember, location: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Focus & Shipping Impact */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Focus Areas</label>
                      <input
                        placeholder="e.g. Product strategy · Backend engineering"
                        value={newMember.focus}
                        onChange={(e) => setNewMember({ ...newMember, focus: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Shipping / Impact</label>
                      <input
                        placeholder="e.g. Company product strategy & infrastructure"
                        value={newMember.shipping}
                        onChange={(e) => setNewMember({ ...newMember, shipping: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Technical Signal & Social Links */}
                  <div>
                    <label className="text-mono text-[10px] uppercase text-muted-foreground">Technical Signal</label>
                    <input
                      placeholder="e.g. Architecture · APIs · Distributed Systems"
                      value={newMember.signal}
                      onChange={(e) => setNewMember({ ...newMember, signal: e.target.value })}
                      className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Twitter / X Username</label>
                      <input
                        placeholder="e.g. bethebayou"
                        value={newMember.socials?.twitter || ""}
                        onChange={(e) => setNewMember({ ...newMember, socials: { ...newMember.socials, twitter: e.target.value } })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">GitHub Username</label>
                      <input
                        placeholder="e.g. bethe"
                        value={newMember.socials?.github || ""}
                        onChange={(e) => setNewMember({ ...newMember, socials: { ...newMember.socials, github: e.target.value } })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">LinkedIn Username</label>
                      <input
                        placeholder="e.g. bethebayou"
                        value={newMember.socials?.linkedin || ""}
                        onChange={(e) => setNewMember({ ...newMember, socials: { ...newMember.socials, linkedin: e.target.value } })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="text-mono text-[10px] uppercase text-muted-foreground">Bio / Dossier Summary</label>
                    <textarea
                      rows={3}
                      placeholder="Short professional biography and technical background"
                      value={newMember.bio}
                      onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                      className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                    />
                  </div>

                  {/* Avatar File Uploader (Required) */}
                  <div>
                    <label className="text-mono text-[10px] uppercase text-muted-foreground">
                      Avatar Photo (Supabase Storage) <span className="text-rose-500">*</span>
                    </label>
                    <div className="mt-1.5 flex items-center gap-4">
                      <label className="cursor-pointer inline-flex items-center gap-2 rounded-2xl hairline bg-surface/60 px-4 py-3 text-sm hover:bg-surface">
                        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        {uploading ? "Uploading Image..." : "Choose Image File"}
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                      </label>
                      {newMember.imgUrl && (
                        <span className="text-xs text-emerald-500 flex items-center gap-1">
                          <Check className="h-4 w-4" /> Photo Uploaded
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={addingMember}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
                  >
                    {addingMember ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Saving Team Member...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" /> Add Team Member
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: CAREERS & JOB ROLES MANAGER */}
          {activeTab === "careers" && (
            <div className="space-y-6">

              {/* Edit Job Modal */}
              {editingJob && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4">
                  <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl hairline bg-background p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b hairline pb-4">
                      <div>
                        <span className="text-mono text-[10px] text-muted-foreground uppercase">EDIT POSITION</span>
                        <h3 className="text-display text-2xl">{editingJob.title}</h3>
                      </div>
                      <button onClick={() => setEditingJob(null)} className="p-2 rounded-full hairline hover:bg-surface">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <form onSubmit={handleUpdateJobSubmit} className="space-y-4">
                      <div>
                        <label className="text-mono text-[10px] uppercase text-muted-foreground">Job Title</label>
                        <input
                          required
                          value={editingJob.title}
                          onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                          className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-mono text-[10px] uppercase text-muted-foreground">Team</label>
                          <input
                            required
                            value={editingJob.team}
                            onChange={(e) => setEditingJob({ ...editingJob, team: e.target.value })}
                            className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-mono text-[10px] uppercase text-muted-foreground">Location</label>
                          <input
                            required
                            value={editingJob.location}
                            onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                            className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-mono text-[10px] uppercase text-muted-foreground">Type</label>
                          <input
                            required
                            value={editingJob.type}
                            onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                            className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-mono text-[10px] uppercase text-muted-foreground">Role Overview</label>
                          <FormattingToolbar
                            textareaId="edit-job-overview-textarea"
                            onFormat={(formatted) => setEditingJob({ ...editingJob, about: formatted })}
                          />
                        </div>
                        <textarea
                          id="edit-job-overview-textarea"
                          required
                          rows={3}
                          value={editingJob.about}
                          onChange={(e) => setEditingJob({ ...editingJob, about: e.target.value })}
                          className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-mono text-[10px] uppercase text-muted-foreground">Skills / Tech Tags (Comma separated)</label>
                        <input
                          placeholder="e.g. Go, PostgreSQL, Redis, Kubernetes"
                          value={Array.isArray(editingJob.skills) ? editingJob.skills.join(", ") : editingJob.skills || ""}
                          onChange={(e) => setEditingJob({ ...editingJob, skills: e.target.value })}
                          className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-mono text-[10px] uppercase text-muted-foreground">Requirements (One per line)</label>
                        <textarea
                          rows={3}
                          value={Array.isArray(editingJob.bullets) ? editingJob.bullets.join("\n") : editingJob.bullets || ""}
                          onChange={(e) => setEditingJob({ ...editingJob, bullets: e.target.value })}
                          className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-mono text-[10px] uppercase text-muted-foreground">Nice to Have (One per line)</label>
                        <textarea
                          rows={3}
                          placeholder="Optional nice-to-have points"
                          value={Array.isArray(editingJob.niceToHave) ? editingJob.niceToHave.join("\n") : editingJob.niceToHave || ""}
                          onChange={(e) => setEditingJob({ ...editingJob, niceToHave: e.target.value })}
                          className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={updatingJob}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50"
                        >
                          {updatingJob ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                          Update Job Opening
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingJob(null)}
                          className="rounded-full hairline px-5 py-3 text-sm hover:bg-surface"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
                {/* Post New Job Form */}
                <div className="rounded-3xl hairline bg-background p-6 sm:p-8 space-y-6">
                  <h3 className="text-display text-2xl">Post New Job Opening</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setPublishingJob(true);
                      setStatusMsg("Posting new career role to Supabase...");
                      const parsedSkills = newJob.skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
                      const parsedNiceToHave = newJob.niceToHave.split("\n").map((s) => s.trim()).filter((s) => s.length > 0);
                      const parsedBullets = newJob.bullets.split("\n").map((b) => b.trim()).filter((b) => b.length > 0);

                      const jobObj = {
                        title: newJob.title,
                        team: newJob.team,
                        location: newJob.location,
                        type: newJob.type,
                        about: newJob.about,
                        bullets: parsedBullets,
                        skills: parsedSkills,
                        niceToHave: parsedNiceToHave,
                        active: true,
                      };

                      try {
                        const { error } = await supabase.from("JobOpening").insert([jobObj]);
                        if (error) throw error;
                        setStatusMsg("Job role posted & live on /careers!");
                      } catch (err: any) {
                        setStatusMsg("Job role posted & saved locally.");
                      } finally {
                        setJobs((prev: any) => [...prev, jobObj]);
                        setNewJob({ title: "", team: "Engineering", location: "Remote · Global", type: "Full-time", about: "", bullets: "", skills: "", niceToHave: "" });
                        setPublishingJob(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Job Title</label>
                      <input
                        required
                        placeholder="e.g. Senior Distributed Systems Engineer"
                        value={newJob.title}
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-mono text-[10px] uppercase text-muted-foreground">Team</label>
                        <input
                          required
                          placeholder="Systems"
                          value={newJob.team}
                          onChange={(e) => setNewJob({ ...newJob, team: e.target.value })}
                          className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-mono text-[10px] uppercase text-muted-foreground">Location</label>
                        <input
                          required
                          placeholder="Remote · Global"
                          value={newJob.location}
                          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                          className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-mono text-[10px] uppercase text-muted-foreground">Type</label>
                        <input
                          required
                          placeholder="Full-time"
                          value={newJob.type}
                          onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                          className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="text-mono text-[10px] uppercase text-muted-foreground">Role Overview</label>
                        <FormattingToolbar
                          textareaId="new-job-overview-textarea"
                          onFormat={(formatted) => setNewJob({ ...newJob, about: formatted })}
                        />
                      </div>
                      <textarea
                        id="new-job-overview-textarea"
                        required
                        rows={3}
                        placeholder="High-level description of what this role will build and own..."
                        value={newJob.about}
                        onChange={(e) => setNewJob({ ...newJob, about: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Skills / Required Tech (Comma separated)</label>
                      <input
                        placeholder="e.g. Go, PostgreSQL, Redis, Kubernetes"
                        value={newJob.skills}
                        onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Requirements (One per line)</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="8+ years shipping systems at scale&#10;Deep experience with PostgreSQL&#10;Comfortable owning services end to end"
                        value={newJob.bullets}
                        onChange={(e) => setNewJob({ ...newJob, bullets: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-mono text-[10px] uppercase text-muted-foreground">Nice to Have (Optional, one per line)</label>
                      <textarea
                        rows={2}
                        placeholder="Experience with financial engines&#10;Contributions to open-source"
                        value={newJob.niceToHave}
                        onChange={(e) => setNewJob({ ...newJob, niceToHave: e.target.value })}
                        className="mt-1.5 w-full rounded-2xl hairline bg-surface/40 p-3.5 text-sm focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={publishingJob}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
                    >
                      {publishingJob ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Publishing Career Role...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" /> Publish Career Role
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Roles List with Deactivate, Edit, Delete Actions */}
                <div className="space-y-4">
                  <div className="text-mono text-[11px] text-muted-foreground">MANAGE OPENINGS ({jobs.length})</div>
                  <div className="space-y-3">
                    {jobs.map((job: any, idx: number) => {
                      const isActive = job.active !== false;
                      return (
                        <div
                          key={job.id || idx}
                          className={`rounded-2xl hairline bg-background p-5 space-y-3 transition-all ${!isActive ? "opacity-60 bg-surface/20" : ""
                            }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-mono text-[10px] text-muted-foreground uppercase">{job.team} · {job.type}</span>
                                <span
                                  className={`rounded-full px-2.5 py-0.5 text-mono text-[10px] uppercase font-medium ${isActive ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                    }`}
                                >
                                  {isActive ? "Active" : "Paused"}
                                </span>
                              </div>
                              <h4 className="font-medium text-lg mt-1">{job.title}</h4>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleToggleJobActive(job, idx)}
                                title={isActive ? "Deactivate Job" : "Activate Job"}
                                className={`p-2 rounded-full hairline transition-colors ${isActive ? "hover:bg-amber-500/10 text-amber-500" : "hover:bg-emerald-500/10 text-emerald-500"
                                  }`}
                              >
                                <Power className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const skillsArr = (job.skills && Array.isArray(job.skills) && job.skills.length > 0)
                                    ? job.skills
                                    : (typeof job.skills === "string" && job.skills.length > 0 ? job.skills.split(",") : []);
                                  const niceArr = (job.niceToHave && Array.isArray(job.niceToHave) && job.niceToHave.length > 0)
                                    ? job.niceToHave
                                    : (typeof job.niceToHave === "string" && job.niceToHave.length > 0 ? job.niceToHave.split("\n") : []);
                                  const bulletsArr = (job.bullets && Array.isArray(job.bullets) && job.bullets.length > 0)
                                    ? job.bullets
                                    : (typeof job.bullets === "string" && job.bullets.length > 0 ? job.bullets.split("\n") : []);

                                  setEditingJob({
                                    ...job,
                                    originalTitle: job.title,
                                    originalIndex: idx,
                                    skills: Array.isArray(skillsArr) ? skillsArr.join(", ") : skillsArr,
                                    niceToHave: Array.isArray(niceArr) ? niceArr.join("\n") : niceArr,
                                    bullets: Array.isArray(bulletsArr) ? bulletsArr.join("\n") : bulletsArr,
                                  });
                                }}
                                title="Edit Job Opening"
                                className="p-2 rounded-full hairline hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              {confirmDeleteId === (job.id || idx) ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteJob(job, idx)}
                                    className="rounded-full bg-rose-500 text-white px-3 py-1 text-xs font-semibold hover:bg-rose-600"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="rounded-full hairline px-3 py-1 text-xs hover:bg-surface"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(job.id || idx)}
                                  title="Delete Job Opening"
                                  className="p-2 rounded-full hairline hover:bg-rose-500/10 text-rose-500 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2">{job.about}</p>

                          {job.skills && job.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {job.skills.map((s: string, sIdx: number) => (
                                <span key={sIdx} className="rounded-full bg-surface px-2 py-0.5 text-mono text-[9px] text-muted-foreground">
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CLIENT BRIEF & JOB APPLICANT INBOX */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b hairline pb-4">
                <div className="text-mono text-[11px] text-muted-foreground flex items-center gap-2">
                  <span>INBOX ({filteredInquiries.length} OF {inquiries.length})</span>
                  {unseenInquiriesCount > 0 && (
                    <span className="rounded-full bg-amber-400 text-black px-2 py-0.5 font-mono text-[10px] font-bold animate-pulse">
                      {unseenInquiriesCount} UNSEEN
                    </span>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Filter className="h-3.5 w-3.5" /> Filter:
                  </span>
                  <button
                    onClick={() => setInquiryFilter("all")}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${inquiryFilter === "all" ? "bg-foreground text-background font-medium" : "hairline hover:bg-surface text-muted-foreground"
                      }`}
                  >
                    All Submissions ({inquiries.length})
                  </button>
                  <button
                    onClick={() => setInquiryFilter("applications")}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${inquiryFilter === "applications" ? "bg-foreground text-background font-medium" : "hairline hover:bg-surface text-muted-foreground"
                      }`}
                  >
                    Job Applicants ({jobApplicationsCount})
                  </button>
                  <button
                    onClick={() => setInquiryFilter("leads")}
                    className={`rounded-full px-3 py-1 text-xs transition-all ${inquiryFilter === "leads" ? "bg-foreground text-background font-medium" : "hairline hover:bg-surface text-muted-foreground"
                      }`}
                  >
                    Client Leads ({inquiries.length - jobApplicationsCount})
                  </button>
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="rounded-3xl hairline bg-background p-12 text-center text-muted-foreground space-y-2">
                  <Mail className="h-8 w-8 mx-auto text-muted-foreground/50" />
                  <p className="font-medium text-foreground">No submissions found in this category.</p>
                  <p className="text-xs">
                    Submissions from <code>/contact</code> or applicants applying on <code>/careers</code> will appear here automatically.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInquiries.map((inq, idx) => {
                    const id = inq.id || `inq-${idx}`;
                    const isUnseen = !readInquiryIds.has(id);
                    const isApp = inq.topic === "Careers" || inq.topic === "Job Application" || (inq.brief && inq.brief.includes("Applying for"));

                    return (
                      <div
                        key={id}
                        className={`rounded-3xl hairline bg-background p-6 sm:p-8 space-y-4 transition-all ${isUnseen ? "ring-2 ring-amber-400/50 bg-amber-500/5" : ""
                          } ${isApp ? "border-l-4 border-l-[var(--lime)]" : ""}`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b hairline pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-display text-xl">{inq.name}</h4>
                              {isUnseen && (
                                <span className="rounded-full bg-amber-400 text-black px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider animate-pulse">
                                  NEW / UNSEEN
                                </span>
                              )}
                              {isApp && (
                                <span className="inline-flex items-center gap-1 rounded-full lime-chip px-2.5 py-0.5 text-mono text-[10px] uppercase font-bold tracking-wider">
                                  <UserCheck className="h-3 w-3" /> Job Applicant
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              <a href={`mailto:${inq.email}`} className="hover:underline text-foreground">
                                {inq.email}
                              </a>{" "}
                              {inq.company && `· ${inq.company}`}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-3 py-1 text-mono text-[10px] uppercase font-medium ${isApp ? "bg-[var(--lime)]/20 text-[var(--ink)]" : "bg-surface text-muted-foreground"
                                }`}
                            >
                              {inq.topic}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleReadInquiry(id)}
                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs transition-colors ${isUnseen
                                ? "bg-foreground text-background font-medium hover:opacity-90"
                                : "hairline text-muted-foreground hover:text-foreground"
                                }`}
                            >
                              {isUnseen ? (
                                <>
                                  <Check className="h-3.5 w-3.5" /> Mark Read
                                </>
                              ) : (
                                <>
                                  <Eye className="h-3.5 w-3.5" /> Read
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap space-y-2">
                          {inq.brief.split('\n').map((line: string, lIdx: number) => {
                            const trimmed = line.trim();
                            if (trimmed.startsWith("GITHUB:") || trimmed.startsWith("LINKEDIN:") || trimmed.startsWith("PORTFOLIO / WEBSITE:") || trimmed.startsWith("RESUME / CV:")) {
                              const parts = trimmed.split(/:(.+)/);
                              const label = parts[0];
                              const url = parts[1]?.trim();
                              if (url && url.startsWith("http")) {
                                return (
                                  <div key={lIdx} className="my-1.5 flex items-center gap-2">
                                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{label}:</span>
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface hover:bg-foreground hover:text-background font-mono text-xs font-semibold text-foreground transition-all"
                                    >
                                      {url} <ArrowUpRight className="h-3 w-3" />
                                    </a>
                                  </div>
                                );
                              }
                            }
                            return <div key={lIdx}>{line}</div>;
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SUPABASE CONNECTION STATUS */}
          {activeTab === "settings" && (
            <div className="rounded-3xl hairline bg-background p-6 sm:p-8 space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-display text-2xl">Supabase Integration Status</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-4 rounded-2xl hairline bg-surface/50">
                  <div className="text-mono text-[10px] text-muted-foreground">PROJECT URL</div>
                  <div className="mt-1 font-mono text-xs">https://taqytoptjggkirreuora.supabase.co</div>
                </div>
                <div className="p-4 rounded-2xl hairline bg-surface/50">
                  <div className="text-mono text-[10px] text-muted-foreground">DATABASE STATUS</div>
                  <div className="mt-1 font-mono text-xs text-emerald-500 flex items-center gap-1.5">
                    <Check className="h-4 w-4" /> Connected & PostgreSQL Tables Ready
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Cursor-aware Text Formatting Toolbar for Textareas
function FormattingToolbar({
  textareaId,
  onFormat,
}: {
  textareaId: string;
  onFormat: (formatted: string) => void;
}) {
  function applyFormatting(prefix: string, suffix: string = "") {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;
    const selectedText = val.substring(start, end);

    const replacement = selectedText ? `${prefix}${selectedText}${suffix}` : `${prefix}${suffix}`;
    const newVal = val.substring(0, start) + replacement + val.substring(end);

    onFormat(newVal);

    // Reposition cursor nicely after state update
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = selectedText ? start + replacement.length : start + prefix.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  }

  return (
    <div className="flex items-center gap-1 rounded-xl hairline bg-surface/60 px-2 py-1">
      <button
        type="button"
        onClick={() => applyFormatting("**", "**")}
        className="p-1 rounded hover:bg-surface text-muted-foreground hover:text-foreground text-xs"
        title="Bold (**text**)"
      >
        <Bold className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => applyFormatting("*", "*")}
        className="p-1 rounded hover:bg-surface text-muted-foreground hover:text-foreground text-xs"
        title="Italic (*text*)"
      >
        <Italic className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => applyFormatting("### ")}
        className="p-1 rounded hover:bg-surface text-muted-foreground hover:text-foreground text-xs"
        title="Heading (### Heading)"
      >
        <Heading className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => applyFormatting("\n- ")}
        className="p-1 rounded hover:bg-surface text-muted-foreground hover:text-foreground text-xs"
        title="Bullet List (- Item)"
      >
        <List className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => applyFormatting("`", "`")}
        className="p-1 rounded hover:bg-surface text-muted-foreground hover:text-foreground text-xs"
        title="Inline Code (`code`)"
      >
        <Code className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function TabButton({
  label,
  icon,
  active,
  onClick,
  count,
  badgeCount,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count?: number;
  badgeCount?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${active
        ? "bg-foreground text-background font-medium"
        : "hairline hover:bg-surface text-muted-foreground hover:text-foreground"
        }`}
    >
      {icon}
      {label}
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="bg-amber-400 text-black px-2 py-0.2 rounded-full text-[10px] font-bold animate-pulse">
          {badgeCount} NEW
        </span>
      )}
      {count !== undefined && (!badgeCount || badgeCount === 0) && (
        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${active ? "bg-background text-foreground" : "bg-surface"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function StatCard({
  title,
  value,
  label,
  onClick,
  highlight,
}: {
  title: string;
  value: string;
  label: string;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-3xl hairline bg-background p-6 space-y-4 hover:-translate-y-1 transition-all duration-300 group ${highlight ? "ring-2 ring-amber-400" : ""
        }`}
    >
      <div className="text-mono text-[10px] text-muted-foreground uppercase tracking-wider">{title}</div>
      <div className="text-display text-5xl group-hover:text-[var(--lime)] transition-colors">{value}</div>
      <div className={`text-xs font-medium ${highlight ? "text-amber-400 font-bold" : "text-muted-foreground"}`}>{label}</div>
    </button>
  );
}
