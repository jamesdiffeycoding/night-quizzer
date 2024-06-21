import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DeleteAPI({params}) {
  const quizId = params.quizId

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  if (quizId>=4) {
      const response = await supabase.from('quizzes').delete().eq('id', `${quizId}`).eq('user_id', `${user.id}`)
  }  

  return (
  <div></div>
  );
}
