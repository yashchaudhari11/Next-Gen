"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Flame, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ActivityTile from "./ActivityTile";
import NoiseTexture from "../ui/NoiseTexture";

interface WeeklyStat {
  day: string;
  hours: number;
  completed: number;
  order_idx?: number;
}

interface ActivityLog {
  id: string | number;
  action: string;
  subject: string;
  time_ago: string;
}

const staticWeeklyStats: WeeklyStat[] = [
  { day: "Mon", hours: 2.5, completed: 3 },
  { day: "Tue", hours: 1.8, completed: 2 },
  { day: "Wed", hours: 3.2, completed: 4 },
  { day: "Thu", hours: 0.5, completed: 1 },
  { day: "Fri", hours: 2.2, completed: 2 },
  { day: "Sat", hours: 4.0, completed: 5 },
  { day: "Sun", hours: 1.5, completed: 1 },
];

const staticLogHistory: ActivityLog[] = [
  { id: 1, action: "Completed 'React Suspense Basics' module", subject: "Advanced React", time_ago: "2 hours ago" },
  { id: 2, action: "Solved System design routing quiz", subject: "System Design", time_ago: "5 hours ago" },
  { id: 3, action: "Studied TS Generics & Constraints", subject: "TypeScript Mastery", time_ago: "Yesterday" },
  { id: 4, action: "Completed UI Glassmorphic Card markup", subject: "UI/UX Principles", time_ago: "2 days ago" },
];

export default function ActivityView() {
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStat[]>(staticWeeklyStats);
  const [logHistory, setLogHistory] = useState<ActivityLog[]>(staticLogHistory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivityData() {
      const isDemo = new URLSearchParams(window.location.search).get("demo") === "true";
      
      if (isDemo) {
        setWeeklyStats(staticWeeklyStats);
        setLogHistory(staticLogHistory);
        setLoading(false);
      } else {
        try {
          // Fetch weekly stats
          const { data: statsData, error: statsError } = await supabase
            .from("weekly_stats")
            .select("*")
            .order("order_idx", { ascending: true });
          
          if (!statsError && statsData && statsData.length > 0) {
            setWeeklyStats(statsData.map(d => ({
              day: d.day,
              hours: parseFloat(String(d.hours)),
              completed: d.completed
            })));
          }

          // Fetch logs
          const { data: logsData, error: logsError } = await supabase
            .from("activity_logs")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5);

          if (!logsError && logsData && logsData.length > 0) {
            setLogHistory(logsData.map(l => ({
              id: l.id,
              action: l.action,
              subject: l.subject,
              time_ago: l.time_ago
            })));
          }

        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    }
    loadActivityData();
  }, []);

  const totalHours = weeklyStats.reduce((acc, curr) => acc + curr.hours, 0);
  const totalCompleted = weeklyStats.reduce((acc, curr) => acc + curr.completed, 0);

  return (
    <div className="p-6 md:p-8 space-y-6 select-none max-w-6xl mx-auto w-full">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono tracking-[0.2em] text-[#39F5A0] uppercase block mb-1">
          Telemetry & Learning Data
        </span>
        <h2 className="font-display font-extrabold text-3xl text-[#F0F2FF]">Learning Analytics</h2>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-6 border border-white/5 relative overflow-hidden flex items-center gap-4">
          <NoiseTexture />
          <div className="w-10 h-10 rounded-lg bg-[#4F6EF7]/20 flex items-center justify-center text-[#4F6EF7]">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[11px] text-white/40 block font-mono">TOTAL_STUDY_TIME</span>
            <span className="text-xl font-bold font-mono text-white">{totalHours.toFixed(1)} hrs</span>
          </div>
        </div>

        <div className="glass-card p-6 border border-white/5 relative overflow-hidden flex items-center gap-4">
          <NoiseTexture />
          <div className="w-10 h-10 rounded-lg bg-[#39F5A0]/20 flex items-center justify-center text-[#39F5A0]">
            <CheckCircle size={20} />
          </div>
          <div>
            <span className="text-[11px] text-white/40 block font-mono">LESSONS_COMPLETED</span>
            <span className="text-xl font-bold font-mono text-white">{totalCompleted} modules</span>
          </div>
        </div>

        <div className="glass-card p-6 border border-white/5 relative overflow-hidden flex items-center gap-4">
          <NoiseTexture />
          <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/20 flex items-center justify-center text-[#FF6B35]">
            <Flame size={20} />
          </div>
          <div>
            <span className="text-[11px] text-white/40 block font-mono">ACTIVE_DAILY_STREAK</span>
            <span className="text-xl font-bold font-mono text-white">14 Days</span>
          </div>
        </div>
      </div>

      {/* Graph and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Contribution Map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/3 p-2 rounded-2xl border border-white/5">
            <ActivityTile />
          </div>

          {/* Weekly Hours Bar Chart */}
          <div className="glass-card p-6 relative overflow-hidden">
            <NoiseTexture />
            <h3 className="font-sans text-sm font-semibold text-white/80 mb-6">Weekly Study Hours</h3>
            
            <div className="flex justify-between items-end h-32 px-2">
              {weeklyStats.map((item, idx) => {
                const heightPct = (item.hours / 4.5) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 group w-full">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-white absolute -translate-y-8 select-none pointer-events-none">
                      {item.hours}h
                    </div>
                    <div className="w-6 sm:w-8 bg-white/5 rounded-t-md h-24 flex items-end overflow-hidden">
                      <motion.div
                        className="w-full bg-gradient-to-t from-[#4F6EF7] to-[#39F5A0] rounded-t-md shadow-[0_0_10px_rgba(79,110,247,0.3)]"
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-white/40">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Activity Log Timeline */}
        <div className="glass-card p-6 relative overflow-hidden flex flex-col justify-between">
          <NoiseTexture />
          <div>
            <h3 className="font-sans text-sm font-semibold text-white/80 mb-6">Learning Log</h3>
            
            <div className="space-y-4">
              {logHistory.map((log) => (
                <div key={log.id} className="flex gap-3 items-start text-[13px] border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#39F5A0] mt-1.5 shrink-0 shadow-[0_0_6px_#39F5A0]" />
                  <div className="flex-1 space-y-0.5">
                    <p className="text-white/80 font-medium leading-tight">{log.action}</p>
                    <div className="flex justify-between text-[10px] font-mono text-white/30">
                      <span>{log.subject}</span>
                      <span>{log.time_ago}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-[12px] font-mono text-white/60 hover:text-white hover:bg-white/10 cursor-pointer transition-all">
              DOWNLOAD_FULL_TELEMETRY_LOG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
