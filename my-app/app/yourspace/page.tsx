import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import QuizCard from "@/components/QuizCard";
import BannerHeading from "@/components/BannerHeading";
import TopBar from "@/components/TopBar";
import ApiPostNewQuizButton from "@/components/ApiPostNewQuizButton";

export default async function YourSpacePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: fetchedQuizData } = await supabase.from('quizzes').select().eq('user_id', `${user.id}`)

  return (
    <>
      <TopBar></TopBar>

      <BannerHeading heading="Your space"></BannerHeading>
      {/* @ts-ignore */}
      <QuizCard fetchedQuizData={fetchedQuizData} userId={user.id}></QuizCard>
      {/* @ts-ignore */}
      <ApiPostNewQuizButton userId={user.id}></ApiPostNewQuizButton>
    </>
  );
}
