"use client";

import React from "react";
import { motion } from "framer-motion";
import { Course } from "@/types";
import DynamicIcon from "../ui/DynamicIcon";
import ProgressBar from "../ui/ProgressBar";
import NoiseTexture from "../ui/NoiseTexture";

const cardAccents = [
  { from: "#4F6EF7", to: "#7B5EA7" }, // Cobalt → Purple
  { from: "#39F5A0", to: "#0EA5E9" }, // Green → Sky
  { from: "#F59E0B", to: "#EF4444" }, // Amber → Red
  { from: "#EC4899", to: "#8B5CF6" }, // Pink → Violet
];

interface CourseTileProps {
  course: Course;
  index: number;
}

export default function CourseTile({ course, index }: CourseTileProps) {
  const accent = cardAccents[index % cardAccents.length];

  return (
    <motion.article
      className="glass-card p-6 relative overflow-hidden flex flex-col justify-between h-[180px] select-none"
      whileHover={{
        scale: 1.02,
        borderColor: accent.from + "99", // 60% opacity of accent from
        boxShadow: `0 0 0 1px ${accent.from}4d, 0 8px 40px ${accent.from}26, inset 0 1px 0 rgba(255,255,255,0.15)`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* SVG Noise overlay */}
      <NoiseTexture />

      {/* Card Header Content */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Icon Box */}
        <div
          className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0 border"
          style={{
            background: `radial-gradient(135deg, ${accent.from}33, ${accent.to}33)`,
            borderColor: `${accent.from}4d`,
          }}
        >
          <DynamicIcon
            name={course.icon_name}
            size={20}
            style={{ color: accent.from }}
          />
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="font-sans text-[16px] font-semibold text-[#F0F2FF] leading-snug tracking-wide line-clamp-2">
            {course.title}
          </h3>
          <p className="text-[11px] font-mono text-[rgba(240,242,255,0.4)] mt-0.5">
            Module {index + 1}
          </p>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative z-10 w-full mt-auto">
        <ProgressBar progress={course.progress} />
      </div>
    </motion.article>
  );
}
