"use client";

import React from "react";
import { motion } from "framer-motion";
import NoiseTexture from "../ui/NoiseTexture";

interface StreakTileProps {
  streakCount: number;
}

export default function StreakTile({ streakCount }: StreakTileProps) {
  // Let's assume the goal is 18 days, so 14 days is ~80% filled (77.7%)
  const maxGoal = 18;
  const progressPercent = Math.min(streakCount / maxGoal, 1); // e.g. 14 / 18 = 0.777 (78%)
  const radius = 50;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressPercent);

  // Compute tip dot coordinate
  // The circle starts at -90 degrees (top center) and goes clockwise
  const angle = -Math.PI / 2 + 2 * Math.PI * progressPercent;
  const dotX = cx + radius * Math.cos(angle);
  const dotY = cy + radius * Math.sin(angle);

  return (
    <div className="glass-card p-6 relative overflow-hidden flex flex-col items-center justify-between h-full min-h-[220px] md:min-h-[260px] z-10 select-none">
      <NoiseTexture />

      {/* Top Label */}
      <span className="text-[10px] font-medium tracking-[0.2em] text-[rgba(240,242,255,0.4)] uppercase mt-1">
        Current Streak
      </span>

      {/* SVG Ring Stack */}
      <div className="relative w-[120px] height-[120px] flex items-center justify-center my-4">
        
        {/* Glow Filters */}
        <svg className="w-[120px] h-[120px] transform -rotate-90">
          <defs>
            <filter id="ring-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Underlay Track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="4"
            fill="none"
          />

          {/* Animated Progress Ring */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke="#39F5A0"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            style={{ filter: "drop-shadow(0 0 8px rgba(57,245,160,0.6))" }}
          />
        </svg>

        {/* Large Number Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="font-display font-extrabold text-[4rem] text-[#4F6EF7]"
            style={{ textShadow: "0 0 30px rgba(79,110,247,0.6)" }}
          >
            {streakCount}
          </span>
        </div>

        {/* Pulsing Dot at Tip */}
        <motion.div
          className="absolute w-[6px] h-[6px] bg-[#39F5A0] rounded-full z-20"
          style={{
            left: `${dotX}px`,
            top: `${dotY}px`,
            marginLeft: "-3px",
            marginTop: "-3px",
            boxShadow: "0 0 10px #39F5A0, 0 0 20px #39F5A0",
            transformOrigin: "center",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Sub Label & Motivational Micro-text */}
      <div className="text-center space-y-1.5 mb-1 z-10">
        <span className="text-[12px] font-medium text-[rgba(240,242,255,0.4)] block">
          days in a row
        </span>
        <span className="text-[11px] font-semibold text-[#39F5A0] tracking-wide block">
          🔥 Top 5% of learners
        </span>
      </div>

    </div>
  );
}
