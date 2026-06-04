"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Layers } from "lucide-react";
import GlowBadge from "../ui/GlowBadge";
import NoiseTexture from "../ui/NoiseTexture";

const intensityColors = [
  "rgba(255, 255, 255, 0.05)",  // empty (level 0)
  "rgba(79, 110, 247, 0.2)",    // light (level 1)
  "rgba(79, 110, 247, 0.45)",   // medium (level 2)
  "rgba(79, 110, 247, 0.7)",    // high (level 3)
  "rgba(79, 110, 247, 1.0)",    // max (level 4)
];

// 12 columns x 7 rows deterministic contribution data
const activityGrid = [
  [0, 1, 0, 2, 0, 3, 1], // Wk 1
  [1, 0, 3, 0, 4, 1, 2], // Wk 2
  [2, 3, 1, 0, 2, 0, 0], // Wk 3
  [0, 1, 2, 4, 3, 1, 0], // Wk 4
  [4, 0, 1, 2, 0, 3, 2], // Wk 5
  [1, 2, 0, 0, 4, 2, 1], // Wk 6
  [3, 1, 2, 3, 1, 0, 4], // Wk 7
  [0, 4, 3, 1, 2, 1, 0], // Wk 8
  [2, 1, 0, 4, 0, 3, 2], // Wk 9
  [1, 0, 4, 2, 3, 1, 1], // Wk 10
  [3, 2, 1, 0, 4, 0, 3], // Wk 11
  [2, 4, 2, 3, 1, 2, 4], // Wk 12
];

const months = ["Jan", "Feb", "Mar"];

export default function ActivityTile() {
  return (
    <div className="glass-card p-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[380px] z-10 select-none">
      <NoiseTexture />

      {/* Title */}
      <div className="relative z-10">
        <span className="text-[10px] font-medium tracking-[0.2em] text-[rgba(240,242,255,0.4)] uppercase block mb-1">
          Activity Graph
        </span>
        <h3 className="text-[18px] font-bold text-[#F0F2FF]">Learning Progress</h3>
      </div>

      {/* Contribution Graph Container */}
      <div className="relative z-10 my-6 flex flex-col items-center justify-center overflow-x-auto w-full">
        {/* Month Headers */}
        <div className="flex w-[214px] justify-between pl-6 mb-1 text-[9px] font-medium text-[rgba(240,242,255,0.4)] self-start">
          {months.map((m, idx) => (
            <span key={idx} className="w-12 text-left">{m}</span>
          ))}
        </div>

        {/* Graph Grid */}
        <div className="flex gap-[3px] self-start items-center">
          {/* Day Labels */}
          <div className="flex flex-col gap-[3px] text-[9px] font-medium text-[rgba(240,242,255,0.4)] w-6 text-right pr-2 select-none">
            <span>Mon</span>
            <span className="opacity-0">Tue</span>
            <span>Wed</span>
            <span className="opacity-0">Thu</span>
            <span>Fri</span>
            <span className="opacity-0">Sat</span>
            <span className="opacity-0">Sun</span>
          </div>

          {/* Grid Columns */}
          <div className="flex gap-[3px]">
            {activityGrid.map((column, colIdx) => (
              <motion.div
                key={colIdx}
                className="flex flex-col gap-[3px]"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: colIdx * 0.04,
                    },
                  },
                }}
              >
                {column.map((intensity, rowIdx) => (
                  <motion.div
                    key={rowIdx}
                    className="w-[10px] h-[10px] rounded-[3px] transition-colors duration-200"
                    style={{
                      backgroundColor: intensityColors[intensity],
                      boxShadow: intensity > 2 ? `0 0 8px ${intensityColors[intensity]}66` : "none",
                      transformOrigin: "bottom",
                    }}
                    variants={{
                      hidden: { opacity: 0, scaleY: 0 },
                      show: {
                        opacity: 1,
                        scaleY: 1,
                        transition: {
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.3,
                      boxShadow: "0 0 10px rgba(79, 110, 247, 0.8)",
                      zIndex: 20,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Chips below */}
      <div className="relative z-10 flex flex-wrap gap-2 justify-start mt-auto">
        <GlowBadge className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] py-1 px-2.5">
          <BookOpen size={12} className="text-[#4F6EF7]" />
          <span className="font-mono text-[11px]">48 lessons</span>
        </GlowBadge>

        <GlowBadge className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] py-1 px-2.5">
          <Clock size={12} className="text-[#39F5A0]" />
          <span className="font-mono text-[11px]">12 hrs</span>
        </GlowBadge>

        <GlowBadge className="bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] py-1 px-2.5">
          <Layers size={12} className="text-[#FF6B35]" />
          <span className="font-mono text-[11px]">6 subjects</span>
        </GlowBadge>
      </div>

    </div>
  );
}
