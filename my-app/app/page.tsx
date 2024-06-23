import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BannerHeading from "@/components/BannerHeading";

export default async function DashPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  // FETCH QUIZ IDs TO FIND NUMBER OF QUIZZES MADE
const { data: quizFinalId } = await supabase.from('quizzes').select('*').order('id', { ascending: false }).limit(1);
let totalQuizNumber = quizFinalId[0].id


  return (
    <>
      <BannerHeading heading="HOME"></BannerHeading>
      <div className="">
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <h2 className="text-3xl font-bold">JOIN THE REVOLUTION</h2>
          <div>{totalQuizNumber} quizzes have been made so far.</div>
          <div>Join us at dark-quizzer.</div>
          <ul className="list-disc pl-4">
            <li>Create your own free private or public quizzes.</li>
            <li>Update your quizzes over time.</li>
            <li>Try other people's quizzes and record your progress.</li>
          </ul>
          <main className="flex-1 flex flex-col gap-6">
          </main>
        </div>
      </div>
    </>
);
}
