"use client";

import React, { useEffect } from "react";
import ErrorTile from "./ErrorTile";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if available
    console.error("Dashboard route crash caught:", error);
  }, [error]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ErrorTile 
        message={error.message || "An unexpected system anomaly has occurred."}
        onUseDemo={() => {
          // Redirect or reload with a demo flag to load mock data
          const url = new URL(window.location.href);
          url.searchParams.set("demo", "true");
          window.location.href = url.toString();
        }}
      />
    </div>
  );
}
