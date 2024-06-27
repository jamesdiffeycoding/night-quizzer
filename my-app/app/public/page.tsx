import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BannerHeading from "@/components/BannerHeading";
import QuizCard from "@/components/QuizCard";
import TopBar from "@/components/TopBar";
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
      <TopBar></TopBar>

      <BannerHeading heading="All quizzes"></BannerHeading>
      <QuizCard quizInfo={quizzes} userId={user.id}></QuizCard>
    </>
  );
}
