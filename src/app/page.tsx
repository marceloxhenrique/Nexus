import Navbar from "@/components/navbar";

export default function Home() {
  
  return (
      <>
        <Navbar></Navbar>
        <main
          className={`bg-background md:px-8 px-4 py-62 mx-auto max-w-[90rem]`}
        >
          <h1 className="md:text-9xl text-8xl text-primary font-secondary ">Hello world!</h1>
          <h2 className="text-2xl text-primary font-main">
            Write and share your thoughts with the world.
          </h2>

        </main>
      </>
    
  );
}