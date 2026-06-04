"use client";

import React from "react";
import { motion } from "framer-motion";
import { Course } from "@/types";
import HeroTile from "../tiles/HeroTile";
import CourseTile from "../tiles/CourseTile";
import ActivityTile from "../tiles/ActivityTile";
import StreakTile from "../tiles/StreakTile";

interface BentoGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const tileVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

export default function BentoGrid({ courses }: BentoGridProps) {
  // Ensure we have at least 3 courses, default to placeholder if empty
  const displayCourses = courses.length >= 3 
    ? courses.slice(0, 3) 
    : [
        ...courses,
        ...Array.from({ length: Math.max(0, 3 - courses.length) }).map((_, idx) => ({
          id: `placeholder-${idx}`,
          title: "Explore New Course Paths",
          progress: 0,
          icon_name: "Compass",
          created_at: new Date().toISOString(),
        })),
      ].slice(0, 3);

  // Remaining courses if any (e.g. 4th course)
  const extraCourses = courses.slice(3);

  return (
    <div className="space-y-6">
      <motion.div
        className="bento-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Hero Tile */}
        <motion.div 
          variants={tileVariants} 
          style={{ gridArea: "hero", willChange: "filter" }}
        >
          <HeroTile userName="Yash" streakCount={14} />
        </motion.div>

        {/* Activity Tile */}
        <motion.div 
          variants={tileVariants} 
          style={{ gridArea: "activity", willChange: "filter" }}
          className="h-full"
        >
          <ActivityTile />
        </motion.div>

        {/* Course 1 Tile */}
        <motion.div 
          variants={tileVariants} 
          style={{ gridArea: "course1", willChange: "filter" }}
        >
          <CourseTile course={displayCourses[0]} index={0} />
        </motion.div>

        {/* Course 2 Tile */}
        <motion.div 
          variants={tileVariants} 
          style={{ gridArea: "course2", willChange: "filter" }}
        >
          <CourseTile course={displayCourses[1]} index={1} />
        </motion.div>

        {/* Course 3 Tile */}
        <motion.div 
          variants={tileVariants} 
          style={{ gridArea: "course3", willChange: "filter" }}
        >
          <CourseTile course={displayCourses[2]} index={2} />
        </motion.div>

        {/* Streak Tile */}
        <motion.div 
          variants={tileVariants} 
          style={{ gridArea: "streak", willChange: "filter" }}
        >
          <StreakTile streakCount={14} />
        </motion.div>
      </motion.div>

      {/* Extra Courses (renders gracefully below Bento if database has > 3 courses) */}
      {extraCourses.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="px-6 pb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[14px] font-medium tracking-[0.15em] uppercase text-[rgba(240,242,255,0.4)]">
              Additional Enrolled Courses
            </h4>
            <span className="text-[12px] text-[#4F6EF7] font-mono">
              {extraCourses.length} more
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {extraCourses.map((course, idx) => (
              <CourseTile 
                key={course.id} 
                course={course} 
                index={idx + 3} 
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
