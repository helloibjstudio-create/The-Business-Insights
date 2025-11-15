import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AdminDashboard from "../components/page";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AdminDashboard 
    session={session}
  Interviews={[]}
  exclusiveInterviews={[]}
  Articles={[]}
  Reports={[]}
  Events={[]}
  />;
}
