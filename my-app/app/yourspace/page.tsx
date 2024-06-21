import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import QuizCard from "@/components/QuizCard";


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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <h1>All your quizzes</h1>
        <QuizCard quizInfo={quizzes}></QuizCard>
      </div>

    </div>
  );
}
