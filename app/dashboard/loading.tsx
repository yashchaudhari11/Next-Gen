"use client";

import React from "react";
import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Loading() {
  return (
    <div className="bento-grid select-none">
      
      {/* Hero Tile Skeleton */}
      <div 
        className="glass-card p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] md:min-h-[260px]" 
        style={{ gridArea: "hero" }}
      >
        <div className="space-y-4">
          <div className="h-10 w-[60%] rounded skeleton-shimmer" />
          <div className="h-4 w-[40%] rounded skeleton-shimmer" />
        </div>
        <div className="h-8 w-32 rounded-full skeleton-shimmer mt-6" />
      </div>

      {/* Activity Tile Skeleton */}
      <div 
        className="glass-card p-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[380px]" 
        style={{ gridArea: "activity" }}
      >
        <div className="space-y-2">
          <div className="h-3 w-16 rounded skeleton-shimmer" />
          <div className="h-5 w-36 rounded skeleton-shimmer" />
        </div>
        
        {/* Graph grid skeleton */}
        <div className="my-6 space-y-2">
          <div className="h-24 w-full rounded skeleton-shimmer" />
        </div>

        <div className="flex gap-2">
          <div className="h-6 w-20 rounded-full skeleton-shimmer" />
          <div className="h-6 w-16 rounded-full skeleton-shimmer" />
          <div className="h-6 w-20 rounded-full skeleton-shimmer" />
        </div>
      </div>

      {/* Course 1 Skeleton */}
      <div style={{ gridArea: "course1" }}>
        <SkeletonCard />
      </div>

      {/* Course 2 Skeleton */}
      <div style={{ gridArea: "course2" }}>
        <SkeletonCard />
      </div>

      {/* Course 3 Skeleton */}
      <div style={{ gridArea: "course3" }}>
        <SkeletonCard />
      </div>

      {/* Streak Tile Skeleton */}
      <div 
        className="glass-card p-6 relative overflow-hidden flex flex-col items-center justify-between h-full min-h-[220px] md:min-h-[260px]" 
        style={{ gridArea: "streak" }}
      >
        <div className="h-3 w-20 rounded skeleton-shimmer" />
        
        {/* Ring skeleton */}
        <div className="w-[100px] h-[100px] rounded-full border-4 border-white/5 skeleton-shimmer my-3" />

        <div className="h-3 w-24 rounded skeleton-shimmer" />
      </div>

    </div>
  );
}
