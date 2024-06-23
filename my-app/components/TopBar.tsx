import AuthButton from "./AuthButton";
import TopBarLink from "./TopBarLink";
export default function TopBar() {


    return (
      <>
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm flex-wrap">
            <div className="flex flex-wrap gap-5">
              <TopBarLink name="Home" link="/" current="Home" />
              <TopBarLink name="All quizzes" link="/public" current="All quizzes" />
              <TopBarLink name="Your space" link="/yourspace" current="Your space" />
            </div>
            <div className="ml-auto"> {/* Move AuthButton to the right */}
              <AuthButton />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}