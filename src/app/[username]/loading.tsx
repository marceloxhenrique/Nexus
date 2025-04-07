import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex w-full grow bg-custom-background">
      <div className="mx-auto flex w-full max-w-[80rem] grow flex-col px-4 py-10">
        <div className="mb-12 flex flex-col items-start gap-8 md:flex-row">
          <Skeleton className="h-32 w-32 rounded-full" />
          <section className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-16 w-full max-w-lg rounded-md" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          </section>
        </div>
        <h2 className="py-6 text-2xl font-bold text-custom-text-light">
          Articles
        </h2>
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    </section>
  );
}
