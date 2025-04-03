"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ERROR BOUNDARY:", error);
  }, [error]);

  return (
    <div className="flex w-full grow flex-col items-center justify-center gap-3 bg-custom-background">
      <h1 className="text-3xl font-bold text-custom-text-primary">
        User Not Found
      </h1>
      <p className="text-custom-text-light">
        The user you are looking for does not exist.
      </p>
      <Button onClick={() => reset()}>Go Back</Button>
    </div>
  );
}
