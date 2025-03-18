import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div>
      <nav className="mx-auto flex h-16 flex-row items-center justify-between">
        <Link href="/">
          <p className="font-secondary text-4xl font-bold text-custom-text-primary">
            Nexus
          </p>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className="h-8 rounded-sm px-3 text-xs md:h-9 md:text-base">
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <ToggleTheme></ToggleTheme>
        </div>
      </nav>
      <div className="absolute left-0 w-full border-b-[0.01rem] border-primary"></div>
    </div>
  );
}
