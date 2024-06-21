import AuthButton from "./AuthButton";
export default function TopBar() {



    return (
      <>
        <div className="w-full">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
              <h1>DARK QUIZZER</h1>
              <AuthButton />
            </div>
          </nav>
        </div>
      </>

    );
  }
  