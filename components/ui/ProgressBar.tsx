"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[rgba(240,242,255,0.4)]">
          Progress
        </span>
        <span className="text-[12px] font-mono text-[#39F5A0] drop-shadow-[0_0_8px_rgba(57,245,160,0.4)]">
          {progress}%
        </span>
      </div>
      <div 
        className="w-full h-1 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden" 
        style={{ contentVisibility: "auto" }}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            background: "linear-gradient(90deg, #4F6EF7, #39F5A0)",
            height: "100%",
            borderRadius: "999px",
            boxShadow: "0 0 10px rgba(57, 245, 160, 0.4)",
          }}
        />
      </div>
    </div>
  );
}
