import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UpdateQuizByIdButton from "@/components/UpdateQuizByIdButton";
import QuizFull from "@/components/QuizFull";
import DeleteQuizByIDButton from "@/components/DeleteQuizByIdButton";
export default async function YourSpacePage({params}) {
    let quizId = params.quizId
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: notes } = await supabase.from('notes').select()

  /* QUIZ FETCH REQUIREMENT: all your quizes */
  const { data: quizInfo } = await supabase.from('quizzes').select().eq('id', `${quizId}`)


  return (
    <>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
          {/* CONDITION FOR SHOWING QUIZ: it exists */}        
          { quizInfo.length !==0 ? 
              <QuizFull quizInfo={quizInfo}></QuizFull> : <div>This quiz either no longer exists, or you do not have permission to view it.</div>
          }
      </div>
    </>
  );
}
