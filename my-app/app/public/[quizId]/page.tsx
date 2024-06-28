import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import BannerHeading from "@/components/BannerHeading";
import TopBar from "@/components/TopBar";
export default async function DashPage({params}) {
  const quizId = params.quizId
  
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user)
  if (!user) {
    return redirect("/login");
  }

  /* QUIZ FETCH REQUIREMENT: can be from any user id as long as it is NOT private */
  const { data: fetchedQuizData } = await supabase.from('quizzes').select().eq('public', 'true').eq('id', `${quizId}`)

  return (
    <>
      <TopBar></TopBar>

      <BannerHeading heading="All quizzes"></BannerHeading>

      <div className="flex-1 w-full flex flex-col gap-20 items-center">
          {/* CONDITION FOR SHOWING QUIZ: it exists */}        
          { fetchedQuizData.length !==0 ? 
              <QuizFull fetchedQuizData={fetchedQuizData}></QuizFull> : <div>This quiz either no longer exists, or you do not have permission to view it.</div>
          }
      </div>
      </>
  );
}
