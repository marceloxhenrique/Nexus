"use client";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { Button } from "./ui/button";
import { UserDropdownMenu } from "./UserDropdownMenu";
import { user } from "@/data/User";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
export default function Navbar() {
  const { data: session } = authClient.useSession();

  const pathname = usePathname();
  return (
    <div
      className={`${pathname !== "/" ? "bg-custom-background" : "bg-custom-background-home"}`}
    >
      <nav className="mx-auto flex h-16 max-w-[80rem] flex-row items-center justify-between px-3 transition-colors duration-500">
        <Link href="/">
          <p className="font-secondary text-4xl font-bold text-custom-text-primary">
            Nexus
          </p>
        </Link>
        <div className="flex flex-row items-center gap-4">
          {session && <UserDropdownMenu user={user}></UserDropdownMenu>}
          {!session && (
            <Button
              variant={"outline"}
              className="h-8 rounded-sm border-[0.09rem] border-custom-primary bg-transparent px-3 text-xs text-custom-primary md:h-9 md:text-base dark:border-white"
            >
              <Link href={"/sign-in"}>Sign in</Link>
            </Button>
          )}
          <ToggleTheme></ToggleTheme>
        </div>
      </nav>
      <div className="absolute left-0 w-full border-b-[0.01rem] border-neutral-400"></div>
    </div>
  );
}
