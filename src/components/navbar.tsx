"use client";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { Button } from "./ui/button";
import { UserDropdownMenu } from "./UserDropdownMenu";

import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = useContext(UserContext);
  const pathname = usePathname();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;
      if (currentScrollPos > 100) {
        setVisible(!isScrollingDown);
      } else {
        setVisible(true);
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  return (
    <div
      className={`fixed z-50 w-full transition-transform duration-300 ${pathname !== "/" ? "bg-custom-background" : "bg-custom-background-home"} ${
        visible ? "lg:translate-y-0" : "lg:-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[80rem] flex-row items-center justify-between px-3 transition-colors duration-500">
        <Link href="/">
          <p className="font-secondary text-4xl font-bold text-custom-text-primary">
            Nexus
          </p>
        </Link>
        <div className="flex flex-row items-center gap-4">
          {session && <UserDropdownMenu user={user?.user}></UserDropdownMenu>}
          {!session && (
            <Button variant={"default"} className="">
              <Link href={"/sign-in"}>Sign in</Link>
            </Button>
          )}
          <ToggleTheme></ToggleTheme>
        </div>
      </nav>
      <div
        className={`${visible ? "block" : "hidden"} absolute left-0 w-full border-b-[0.01rem] border-neutral-400`}
      ></div>
    </div>
  );
}
