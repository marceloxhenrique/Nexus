import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl py-20">
      <Skeleton className="mb-4 h-10 w-3/4 rounded-md" /> {/* Title */}
      <section className="flex items-center gap-3 py-8 text-sm">
        <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar */}
        <Skeleton className="h-4 w-24 rounded-md" /> {/* Author name */}
        <Skeleton className="h-4 w-32 rounded-md" /> {/* Date */}
      </section>
      <section className="mb-8 flex flex-wrap gap-3 text-sm">
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-4 w-20 rounded-md" />
      </section>
      <Skeleton className="mb-8 h-[1px] w-full max-w-3xl" /> {/* Divider */}
      <Skeleton className="h-64 w-full rounded-lg" /> {/* Article image */}
      <article className="mt-6 space-y-4 text-lg">
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-6 w-5/6 rounded-md" />
        <Skeleton className="h-6 w-4/6 rounded-md" />
        <Skeleton className="h-6 w-3/6 rounded-md" />
      </article>
      <section className="mt-12 flex flex-wrap gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </section>
    </main>
  );
}
