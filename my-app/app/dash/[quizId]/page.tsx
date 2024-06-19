import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashPage({params}) {
  const quizId = params.quizId
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }
  const { data: notes } = await supabase.from('notes').select()

  const { data: quizzes } = await supabase.from('quizzes').select().eq('private', 'false')

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            {/* <DeployButton /> */}
            <h1>SPECIFIC QUIZ- ID: {quizId}</h1>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        {/* <Header /> */}
        {/* <h2>Row level security disabled</h2> */}
        {/* <pre>{JSON.stringify(notes, null, 2)}</pre> */}
        <h2>Row level security enabled</h2>
        <pre>{JSON.stringify(quizzes, null, 2)}</pre>
        <main className="flex-1 flex flex-col gap-6">
          {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2> */}
          {/* <FetchDataSteps /> */}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Next JS, React, Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
