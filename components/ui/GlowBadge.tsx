"use client";

import React from "react";

interface GlowBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowBadge({ children, className = "" }: GlowBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium 
      background-[rgba(79,110,247,0.12)] border border-[rgba(79,110,247,0.3)] text-[#F0F2FF] 
      shadow-[0_0_15px_rgba(79,110,247,0.15)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}
