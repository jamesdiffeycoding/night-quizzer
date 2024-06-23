import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BannerHeading from "@/components/BannerHeading";
export default async function DashPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: notes } = await supabase.from('notes').select()

  const { data: quizzes } = await supabase.from('quizzes').select().eq('private', 'false')

  return (
    <>
      <BannerHeading heading="All quizzes"></BannerHeading>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <h2>Row level security enabled</h2>
          <pre>{JSON.stringify(quizzes, null, 2)}</pre>
          <main className="flex-1 flex flex-col gap-6">
          </main>
        </div>
      </div>
    </>
  );
}
