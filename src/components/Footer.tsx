"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer
      className={`px-4" flex h-16 w-full ${pathname !== "/" ? "bg-custom-background" : "bg-custom-background-home"}`}
    >
      <ul className="flex w-[100%] items-end justify-center gap-4 pb-2.5 text-primary md:gap-7">
        <li>
          <Link
            href="/terms"
            className="text-sm text-primary md:hover:underline"
          >
            Terms
          </Link>
        </li>
        <li>
          <Link
            href="/privacy"
            className="text-sm text-primary md:hover:underline"
          >
            Privacy
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-sm text-primary md:hover:underline"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-sm text-primary md:hover:underline"
          >
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
