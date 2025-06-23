import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-6 border-b border-gray-100 py-6 last:border-0 md:flex-row"
        >
          <div className="order-2 flex-1 space-y-4 md:order-1">
            <Skeleton className="h-8 w-3/4 rounded" />
            <Skeleton className="h-5 w-full max-w-md rounded" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-6 w-16 rounded" />
              ))}
            </div>
            <div className="flex items-center justify-between text-custom-text-light">
              <Skeleton className="h-4 w-32 rounded" />
              <div className="flex space-x-1">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 md:w-1/3">
            <Skeleton className="h-40 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
