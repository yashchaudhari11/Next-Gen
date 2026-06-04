import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import BentoGrid from "@/components/layout/BentoGrid";
import { Suspense } from "react";
import ErrorTileWrapper from "./ErrorTileWrapper";
import Loading from "./loading";
import { Course } from "@/types";

// Ensure Next.js dynamic rendering for headers/cookies
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  // Await searchParams in Next.js 15
  const params = await searchParams;
  const isDemo = params?.demo === "true";

  // Check for presence of credentials
  const hasCredentials =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let courses: Course[] = [];
  let fetchError = null;

  if (isDemo) {
    // Populate demo dataset
    courses = [
      {
        id: "demo-1",
        title: "Advanced React Patterns",
        progress: 75,
        icon_name: "Code2",
        created_at: new Date().toISOString(),
      },
      {
        id: "demo-2",
        title: "System Design Fundamentals",
        progress: 42,
        icon_name: "Server",
        created_at: new Date().toISOString(),
      },
      {
        id: "demo-3",
        title: "TypeScript Mastery",
        progress: 88,
        icon_name: "FileCode",
        created_at: new Date().toISOString(),
      },
      {
        id: "demo-4",
        title: "UI/UX Principles",
        progress: 31,
        icon_name: "Palette",
        created_at: new Date().toISOString(),
      },
    ];
  } else if (!hasCredentials) {
    fetchError = "Supabase API keys are not configured. Click below to enter Demo Mode with seed data.";
  } else {
    try {
      const cookieStore = await cookies();
      const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore as any });
      
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        fetchError = `Supabase Error: ${error.message}`;
      } else {
        courses = data || [];
      }
    } catch (e: any) {
      fetchError = e?.message || "An exception occurred while connecting to Supabase client.";
    }
  }

  if (fetchError) {
    return <ErrorTileWrapper message={fetchError} />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <BentoGrid courses={courses} />
    </Suspense>
  );
}
