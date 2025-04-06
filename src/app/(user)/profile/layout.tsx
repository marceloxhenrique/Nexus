"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <main className="min-h-screen py-12">
      <h1 className="py-4 font-main text-4xl font-bold tracking-tight text-custom-text-primary">
        Settings
      </h1>
      <p className="pb-2 text-lg text-custom-text-light">
        Manage your account settings and preferences.
      </p>

      <div className="flex flex-col justify-between gap-6 py-10 lg:flex-row lg:gap-0">
        <nav className="flex w-full max-w-[16rem] lg:mr-4 lg:flex-col lg:space-y-1">
          <Link
            href="/profile"
            className={`${
              pathname === "/profile"
                ? "bg-custom-primary text-custom-secondary shadow-md"
                : "text-custom-text-primary"
            } inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-custom-text-light hover:text-custom-secondary hover:shadow-md`}
          >
            Profile
          </Link>
          <Link
            href="/profile/account"
            className={`${
              pathname.includes("/account")
                ? "bg-custom-primary text-custom-secondary shadow-md"
                : "text-custom-text-primary"
            } inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-custom-text-light hover:text-custom-secondary hover:shadow-md`}
          >
            Account
          </Link>
          <Link
            href="/profile/myarticles"
            className={`${
              pathname.includes("/myarticles")
                ? "bg-custom-primary text-custom-secondary shadow-md"
                : "text-custom-text-primary"
            } inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-custom-text-light hover:text-custom-secondary hover:shadow-md`}
          >
            My Articles
          </Link>
        </nav>
        <div className="w-full max-w-5xl">{children}</div>
      </div>
    </main>
  );
}
