import AuthButton from "./AuthButton";
import Link from "next/link";
export default function TopBarLink({name, link}) {
    return (
      <>
        <Link href={`${link}`} className="whitespace-nowrap left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-blue-900 hover:bg-btn-background-hover flex items-center group text-sm">{name}</Link>
      </>
    );
  }
  