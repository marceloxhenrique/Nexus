"use client";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { UserDropdownMenu } from "./UserDropdownMenu";
import { user } from "@/data/User";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <div
      className={`${pathname !== "/" ? "bg-custom-background" : "bg-custom-background-home"}`}
    >
      <nav className="mx-auto flex h-16 max-w-[80rem] flex-row items-center justify-between px-3">
        <Link href="/">
          <p className="font-secondary text-4xl font-bold text-custom-text-primary">
            Nexus
          </p>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <UserDropdownMenu user={user}></UserDropdownMenu>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button
                variant={"outline"}
                className="h-8 rounded-sm border-[0.09rem] border-custom-primary bg-transparent px-3 text-xs text-custom-primary md:h-9 md:text-base dark:border-white"
              >
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <ToggleTheme></ToggleTheme>
        </div>
      </nav>
      <div className="absolute left-0 w-full border-b-[0.01rem] border-neutral-400"></div>
    </div>
  );
}
