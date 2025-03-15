import Link from "next/link";
import ToggleTheme from "./ToggleTheme";

export default function Navbar() {
  return (
    <div>
      <nav className="mx-auto flex h-16 flex-row items-center justify-between">
        <Link href="/">
          <p className="font-secondary text-4xl font-bold text-text-main">
            Nexus
          </p>
        </Link>
        <ToggleTheme></ToggleTheme>
      </nav>
      <div className="absolute left-0 w-full border-b-[0.01rem] border-primary"></div>
    </div>
  );
}
