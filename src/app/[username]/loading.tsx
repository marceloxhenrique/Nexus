import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex w-full grow bg-custom-background">
      <section className="mx-auto flex w-full max-w-[80rem] grow flex-col justify-between gap-4 px-0 py-10 lg:flex-row-reverse">
        <div className="mb-12 flex flex-col gap-4 lg:w-full lg:max-w-[24rem]">
          <div className="flex items-center gap-2">
            <Skeleton className="size-15 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-40 rounded-md" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
            <Skeleton className="h-10 w-full max-w-sm rounded-md" />
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
          </div>
        </div>
        <section className="flex w-full flex-col gap-4">
          <Skeleton className="hidden h-10 w-64 rounded-md lg:block" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          <div className="mt-4 space-y-4">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </section>
      </section>
    </main>
  );
}
