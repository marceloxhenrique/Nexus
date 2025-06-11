import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="my-auto flex w-full max-w-[76.3rem] lg:px-4">
      <section className="mr-10 flex-1">
        <h1 className="mt-18 font-secondary text-4xl font-bold tracking-tight text-custom-text-primary">
          Explore Articles
        </h1>
        <p className="max-w-2xl text-custom-text-light">
          Discover the latest insights, tutorials, and thoughts from our
          community of writers on a variety of topics.
        </p>
        <section className="flex flex-col gap-6 py-18">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex max-w-4xl flex-col gap-8 py-6 md:flex-row"
            >
              <div className="order-2 flex-1 space-y-4 md:order-1">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-4 w-40 rounded" />
                  </div>
                </div>
                <Skeleton className="h-6 w-3/4 rounded" />
                <Skeleton className="h-5 w-full max-w-md rounded" />
                <div className="mt-2 flex gap-2">
                  <Skeleton className="h-6 w-16 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
                <div className="mt-2 flex gap-4">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              </div>
              <div className="order-1 md:order-2 md:w-1/3">
                <Skeleton className="h-40 w-full rounded-md" />
              </div>
            </div>
          ))}
        </section>
      </section>
      <div className="hidden max-w-3xl border-l-[0.01rem] border-neutral-400 xl:block dark:border-zinc-600"></div>
      <aside className="mt-18 hidden max-w-[26em] pl-10 xl:block">
        <h2 className="mb-4 font-secondary text-2xl font-bold text-custom-text-primary">
          Most Read
        </h2>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <Skeleton className="h-5 w-56 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          ))}
        </div>
        <h2 className="mt-18 mb-4 font-secondary text-2xl font-bold text-custom-text-primary">
          Who to Follow
        </h2>
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
}
