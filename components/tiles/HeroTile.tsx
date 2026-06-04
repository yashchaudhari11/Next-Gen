"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import GlowBadge from "../ui/GlowBadge";

interface HeroTileProps {
  userName: string;
  streakCount: number;
}

export default function HeroTile({ userName, streakCount }: HeroTileProps) {
  const [greeting, setGreeting] = useState("Good day");
  const [greetingIcon, setGreetingIcon] = useState("☀️");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting("Good morning");
      setGreetingIcon("☀️");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Good afternoon");
      setGreetingIcon("🌤️");
    } else {
      setGreeting("Good evening");
      setGreetingIcon("🌙");
    }
  }, []);

  return (
    <div className="glass-card p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] md:min-h-[260px] z-10 select-none">
      
      {/* Background Floating Nebula Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blob 1: Indigo top-right */}
        <motion.div
          className="absolute w-[240px] h-[160px] rounded-full bg-[#4F6EF7]/15 blur-[40px] -right-10 -top-10"
          animate={{
            x: [0, 10, -10, 0],
            y: [0, -12, 12, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Blob 2: Deep Purple bottom-left */}
        <motion.div
          className="absolute w-[180px] h-[120px] rounded-full bg-[#7B5EA7]/10 blur-[30px] -left-10 -bottom-10"
          animate={{
            x: [0, -8, 8, 0],
            y: [0, 10, -10, 0],
            scale: [1, 0.97, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Blob 3: Cobalt center-right */}
        <motion.div
          className="absolute w-[100px] h-[100px] rounded-full bg-[#0EA5E9]/8 blur-[20px] right-[20%] top-[30%]"
          animate={{
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.6, 0.9, 0.5, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 z-10">
        <div className="space-y-3">
          <h1 className="font-display font-extrabold text-[#F0F2FF] leading-tight tracking-tight text-[2.2rem] md:text-[3.2rem]">
            {greeting}, {userName} {greetingIcon}
          </h1>
          <p className="font-sans text-[15px] md:text-[16px] text-[rgba(240,242,255,0.6)] max-w-md">
            You've been on a {streakCount}-day streak. Don't break it now.
          </p>
        </div>

        {/* Breathing Flame Icon */}
        <div className="flex items-center justify-center shrink-0">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            className="filter drop-shadow-[0_0_15px_rgba(255,107,53,0.5)]"
          >
            <defs>
              <filter id="flame-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                  <feFuncA type="linear" slope="0.8"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.path
              d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#flame-glow)"
              animate={{
                strokeDasharray: ["120 0", "80 40", "120 0"],
                strokeDashoffset: [0, 15, 0],
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: "12px", originY: "18px" }}
            />
          </svg>
        </div>
      </div>

      {/* Goal Chip bottom */}
      <div className="mt-8 md:mt-4 flex z-10">
        <GlowBadge className="bg-[rgba(79,110,247,0.15)] border-[rgba(79,110,247,0.45)] py-1.5 px-4">
          <Target size={14} className="text-[#4F6EF7]" />
          <span className="font-sans text-[13px] font-medium tracking-wide">3 of 5 lessons done</span>
        </GlowBadge>
      </div>

    </div>
  );
}
