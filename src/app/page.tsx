import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[80rem] grow flex-col justify-center px-4">
      <h1 className="font-secondary text-6xl text-custom-text-primary sm:text-7xl md:text-9xl">
        <p>Beyond</p>
        <p className="md:inline">Syntax</p>
        <p className="md:inline"> & Speech</p>
      </h1>
      <h2 className="mt-18 font-main text-[1.4rem] text-custom-text-primary">
        Write and share your ideas, experiences, and passions.
      </h2>
      <Link href="/articles">
        <button className="mt-10 mb-6 w-[100%] cursor-pointer rounded-lg bg-green-700 px-8 py-2 text-[1.4rem] text-white hover:bg-green-600 md:max-w-[16rem]">
          Start reading
        </button>
      </Link>
    </main>
  );
}
