import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AdminDashboard from "../components/AdminDashboard";

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { session } } = await supabase.auth.getSession();

  // Redirect if not logged in
  if (!session) {
    return (
      <div className="text-center mt-20 text-red-600">
        Access Denied. Please <a href="/login" className="underline">login</a>.
      </div>
    );
  }

  return (
    <AdminDashboard
      session={session}
      Interviews={[]}
      exclusiveInterviews={[]}
      Articles={[]}
      Reports={[]}
      Events={[]}
    />
  );
}
