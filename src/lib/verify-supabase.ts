import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://taqytoptjggkirreuora.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhcXl0b3B0amdna2lycmV1b3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NjgyNjMsImV4cCI6MjEwMzA0NDI2M30.6juObQXbAYF0rCWz9_Sr6I_oAGMoEmfvii3yG_Aixd0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verify() {
    const { data: posts } = await supabase.from("JournalPost").select("slug, title");
    const { data: team } = await supabase.from("TeamMember").select("name, role");
    const { data: jobs } = await supabase.from("JobOpening").select("title, team");

    console.log(`✅ Journal Posts in Supabase: ${posts?.length || 0}`);
    console.log(`✅ Team Members in Supabase: ${team?.length || 0}`);
    console.log(`✅ Job Openings in Supabase: ${jobs?.length || 0}`);
}

verify();
