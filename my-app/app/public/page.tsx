import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BannerHeading from "@/components/BannerHeading";
import QuizCard from "@/components/QuizCard";
import TopBar from "@/components/TopBar";
export default async function DashPage() {
  const supabase = createClient();


  /* Allow user to view public quizzes without loggin in. */
  let userId = ""
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    userId= user.id} else {
      userId="No user logged in";
    }

  const { data: quizzes } = await supabase.from('quizzes').select().eq('public', 'true')

  return (
    <>
      <TopBar></TopBar>

      <BannerHeading heading="All quizzes"></BannerHeading>
      {/* @ts-ignore */}
      <QuizCard fetchedQuizData={quizzes} userId={userId}></QuizCard>
    </>
  );
}
