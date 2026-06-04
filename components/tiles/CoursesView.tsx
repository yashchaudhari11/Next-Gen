"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, BookOpen, ExternalLink, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/types";
import { supabase } from "@/lib/supabase";
import ProgressBar from "../ui/ProgressBar";
import DynamicIcon from "../ui/DynamicIcon";
import NoiseTexture from "../ui/NoiseTexture";

const cardAccents = [
  { from: "#4F6EF7", to: "#7B5EA7" }, // Cobalt → Purple
  { from: "#39F5A0", to: "#0EA5E9" }, // Green → Sky
  { from: "#F59E0B", to: "#EF4444" }, // Amber → Red
  { from: "#EC4899", to: "#8B5CF6" }, // Pink → Violet
];

export default function CoursesView() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      const isDemo = new URLSearchParams(window.location.search).get("demo") === "true";
      
      if (isDemo) {
        setCourses([
          { id: "demo-1", title: "Advanced React Patterns", progress: 75, icon_name: "Code2", created_at: "" },
          { id: "demo-2", title: "System Design Fundamentals", progress: 42, icon_name: "Server", created_at: "" },
          { id: "demo-3", title: "TypeScript Mastery", progress: 88, icon_name: "FileCode", created_at: "" },
          { id: "demo-4", title: "UI/UX Principles", progress: 31, icon_name: "Palette", created_at: "" },
        ]);
        setLoading(false);
      } else {
        try {
          const { data, error } = await supabase
            .from("courses")
            .select("*")
            .order("created_at", { ascending: true });
          
          if (!error && data) {
            setCourses(data);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    }
    loadCourses();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    if (filter === "completed") return matchesSearch && c.progress === 100;
    if (filter === "active") return matchesSearch && c.progress < 100 && c.progress > 0;
    return matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 select-none max-w-6xl mx-auto w-full">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono tracking-[0.2em] text-[#4F6EF7] uppercase block mb-1">
          Academy Mission Control
        </span>
        <h2 className="font-display font-extrabold text-3xl text-[#F0F2FF]">All Courses</h2>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search path..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#080810]/60 border border-white/10 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-[#4F6EF7]/60 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 w-full sm:w-auto">
          {["all", "active", "completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-[12px] font-medium border capitalize cursor-pointer transition-all ${
                filter === type
                  ? "bg-[#4F6EF7]/20 border-[#4F6EF7]/50 text-white"
                  : "bg-transparent border-white/5 text-white/50 hover:border-white/10 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-44 w-full rounded-2xl skeleton-shimmer" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course, idx) => {
            const accent = cardAccents[idx % cardAccents.length];
            return (
              <motion.div
                key={course.id}
                className="glass-card p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px] border border-white/5 hover:border-[#4F6EF7]/40 transition-colors group"
                whileHover={{ scale: 1.01 }}
              >
                <NoiseTexture />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                      style={{
                        background: `radial-gradient(135deg, ${accent.from}33, ${accent.to}33)`,
                        borderColor: `${accent.from}4d`,
                      }}
                    >
                      <DynamicIcon name={course.icon_name} size={22} style={{ color: accent.from }} />
                    </div>
                    {/* Details */}
                    <div>
                      <h3 className="font-sans text-[17px] font-semibold text-white group-hover:text-[#4F6EF7] transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <span className="text-[11px] font-mono text-white/40 block mt-0.5">
                        CREATED_AT: {course.created_at ? new Date(course.created_at).toLocaleDateString() : "GEN_DATA"}
                      </span>
                    </div>
                  </div>

                  <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#4F6EF7]/20 hover:border-[#4F6EF7]/40 cursor-pointer transition-colors">
                    <Play size={12} fill="currentColor" />
                  </button>
                </div>

                <div className="relative z-10 mt-6 w-full">
                  <ProgressBar progress={course.progress} />
                </div>
              </motion.div>
            );
          })}

          {filteredCourses.length === 0 && (
            <div className="col-span-full py-16 text-center text-white/40 font-mono text-[14px]">
              NO_PATHWAYS_FOUND
            </div>
          )}
        </div>
      )}
    </div>
  );
}
