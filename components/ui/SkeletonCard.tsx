"use client";

import React from "react";

export default function SkeletonCard() {
  return (
    <div className="glass-card p-6 relative overflow-hidden flex flex-col justify-between h-[180px] w-full min-w-[200px]">
      {/* Top Section */}
      <div className="flex items-center gap-4">
        {/* Icon box skeleton */}
        <div className="w-[40px] h-[40px] rounded-[10px] skeleton-shimmer shrink-0" />
        
        {/* Title / Subtitle lines */}
        <div className="flex-1 space-y-2">
          <div className="h-4 w-[70%] rounded skeleton-shimmer" />
          <div className="h-3 w-[45%] rounded skeleton-shimmer" />
        </div>
      </div>

      {/* Bottom Section: Progress bar skeleton */}
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-3 w-[30%] rounded skeleton-shimmer" />
          <div className="h-3 w-[15%] rounded skeleton-shimmer" />
        </div>
        <div className="h-[4px] w-full rounded-full skeleton-shimmer" />
      </div>
    </div>
  );
}
