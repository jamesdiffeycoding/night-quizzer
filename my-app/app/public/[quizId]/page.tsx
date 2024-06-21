import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import DeleteQuizByIDButton from "@/components/DeleteQuizByIdButton";

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
  const { data: quizzes } = await supabase.from('quizzes').select().eq('private', 'false').eq('id', `${quizId}`)

  return (
<div></div>
  );
}
