import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UpdateQuizByIdButton from "@/components/UpdateQuizByIdButton";
import QuizFull from "@/components/QuizFull";
import BannerHeading from "@/components/BannerHeading";
import TopBar from "@/components/TopBar";

export default async function YourSpacePage({params}) {
    let quizId = params.quizId
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  /* QUIZ FETCH REQUIREMENT: all your quizes */
  const { data: quizInfo } = await supabase.from('quizzes').select().eq('id', `${quizId}`)


  return (
    <>
      <TopBar></TopBar>
      <BannerHeading heading="Your space"></BannerHeading>

      <div className="flex-1 w-full flex flex-col gap-20 items-center p-0 m-0">
          {/* CONDITION FOR SHOWING QUIZ: it exists */}        
          { quizInfo.length !==0 ? 
              <QuizFull quizInfo={quizInfo[0]} userId={user.id}></QuizFull> : <div>This quiz either no longer exists, or you do not have permission to view it.</div>
          }
      </div>
    </>
  );
}
