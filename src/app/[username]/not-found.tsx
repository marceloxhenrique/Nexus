"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-custom-text-primary">
        Page Not Found
      </h1>
      <h2 className="text-3xl font-bold text-custom-text-primary">
        This user doens't exist
      </h2>
      <p className="text-custom-text-light">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-6 text-custom-text-primary underline">
        Go back to home
      </Link>
    </section>
  );
}
