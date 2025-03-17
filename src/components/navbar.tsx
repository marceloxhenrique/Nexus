import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div>
      <nav className="mx-auto flex h-16 flex-row items-center justify-between">
        <Link href="/">
          <p className="font-secondary text-4xl font-bold text-text-main">
            Nexus
          </p>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="h-8 cursor-pointer rounded-lg border-[0.1rem] border-text-light px-2 text-sm text-text-main">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <ToggleTheme></ToggleTheme>
        </div>
      </nav>
      <div className="absolute left-0 w-full border-b-[0.01rem] border-primary"></div>
    </div>
  );
}
