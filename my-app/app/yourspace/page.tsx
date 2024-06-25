import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import QuizCard from "@/components/QuizCard";
import BannerHeading from "@/components/BannerHeading";


export default async function YourSpacePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: notes } = await supabase.from('notes').select()
  const { data: quizzes } = await supabase.from('quizzes').select().eq('user_id', `${user.id}`)

  return (
    <>
      <BannerHeading heading="Your space"></BannerHeading>
      <QuizCard quizInfo={quizzes} userId={user.id}></QuizCard>
    </>
  );
}
