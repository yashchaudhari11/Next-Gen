"use client";

import React, { useState, useEffect } from "react";
import { Trophy, ArrowUp, ArrowDown, Flame } from "lucide-react";
import { supabase } from "@/lib/supabase";
import NoiseTexture from "../ui/NoiseTexture";

interface LeaderboardEntry {
  id?: string;
  rank: number;
  name: string;
  xp: number;
  streak: number;
  initials: string;
  change: string;
  plan: string;
  is_user: boolean;
}

const staticLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Marcus Aurelius", xp: 12450, streak: 34, initials: "MA", change: "up", plan: "Pro", is_user: false },
  { rank: 2, name: "Elena Rostova", xp: 11890, streak: 28, initials: "ER", change: "down", plan: "Team", is_user: false },
  { rank: 3, name: "Jin Woo", xp: 9800, streak: 8, initials: "JW", change: "same", plan: "Free", is_user: false },
  { rank: 4, name: "Yash C. (You)", xp: 8740, streak: 14, initials: "YC", change: "up", plan: "Pro", is_user: true },
  { rank: 5, name: "Sarah Connor", xp: 7500, streak: 21, initials: "SC", change: "down", plan: "Free", is_user: false },
];

export default function LeaderboardView() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(staticLeaderboard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      const isDemo = new URLSearchParams(window.location.search).get("demo") === "true";
      
      if (isDemo) {
        setLeaderboard(staticLeaderboard);
        setLoading(false);
      } else {
        try {
          const { data, error } = await supabase
            .from("leaderboard")
            .select("*")
            .order("rank", { ascending: true });
          
          if (!error && data && data.length > 0) {
            setLeaderboard(data);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    }
    loadLeaderboard();
  }, []);

  // Top 3 positions derived safely
  const top1 = leaderboard.find((s) => s.rank === 1) || staticLeaderboard[0];
  const top2 = leaderboard.find((s) => s.rank === 2) || staticLeaderboard[1];
  const top3 = leaderboard.find((s) => s.rank === 3) || staticLeaderboard[2];

  return (
    <div className="p-6 md:p-8 space-y-6 select-none max-w-4xl mx-auto w-full">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono tracking-[0.2em] text-[#FF6B35] uppercase block mb-1">
          Peer Standings
        </span>
        <h2 className="font-display font-extrabold text-3xl text-[#F0F2FF]">Academy Leaderboard</h2>
      </div>

      {/* Podium for top 3 */}
      <div className="grid grid-cols-3 gap-3 items-end pt-12 pb-6 max-w-lg mx-auto">
        {/* Rank 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-slate-400/20 border-2 border-slate-400 flex items-center justify-center text-slate-300 font-bold text-sm shadow-[0_0_15px_rgba(148,163,184,0.3)]">
            {top2.initials}
          </div>
          <span className="text-[11px] font-semibold text-white/80 truncate w-full text-center">
            {top2.name.split(" ")[0]}
          </span>
          <div className="w-full bg-white/5 border border-white/5 rounded-t-xl h-20 flex flex-col justify-center items-center p-2 relative overflow-hidden">
            <NoiseTexture />
            <span className="text-xl font-display font-extrabold text-slate-300">2nd</span>
            <span className="text-[9px] font-mono text-white/40">{top2.xp} XP</span>
          </div>
        </div>

        {/* Rank 1 */}
        <div className="flex flex-col items-center gap-2">
          <Trophy size={20} className="text-yellow-400 animate-bounce" />
          <div className="w-14 h-14 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 font-bold text-base shadow-[0_0_20px_rgba(250,204,21,0.5)]">
            {top1.initials}
          </div>
          <span className="text-[12px] font-bold text-white truncate w-full text-center">
            {top1.name.split(" ")[0]}
          </span>
          <div className="w-full bg-white/5 border border-yellow-500/20 rounded-t-2xl h-28 flex flex-col justify-center items-center p-2 relative overflow-hidden shadow-[0_-5px_25px_rgba(250,204,21,0.1)]">
            <NoiseTexture />
            <span className="text-2xl font-display font-extrabold text-yellow-400">1st</span>
            <span className="text-[10px] font-mono text-white/50">{top1.xp} XP</span>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-amber-600/20 border-2 border-amber-600 flex items-center justify-center text-amber-500 font-bold text-sm shadow-[0_0_15px_rgba(217,119,6,0.3)]">
            {top3.initials}
          </div>
          <span className="text-[11px] font-semibold text-white/80 truncate w-full text-center">
            {top3.name.split(" ")[0]}
          </span>
          <div className="w-full bg-white/5 border border-white/5 rounded-t-xl h-16 flex flex-col justify-center items-center p-2 relative overflow-hidden">
            <NoiseTexture />
            <span className="text-lg font-display font-extrabold text-amber-600">3rd</span>
            <span className="text-[9px] font-mono text-white/40">{top3.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="glass-card border border-white/5 overflow-hidden relative">
        <NoiseTexture />
        
        <div className="flex flex-col divide-y divide-white/5">
          {leaderboard.map((student) => (
            <div
              key={student.rank}
              className={`flex items-center justify-between p-4 relative z-10 hover:bg-white/5 transition-colors ${
                student.is_user ? "bg-[#4F6EF7]/8 border-y border-[#4F6EF7]/30" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-6 text-center font-mono text-sm font-bold ${
                  student.rank === 1 ? "text-yellow-400" :
                  student.rank === 2 ? "text-slate-300" :
                  student.rank === 3 ? "text-amber-600" : "text-white/40"
                }`}>
                  {student.rank}
                </span>

                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[13px] border ${
                  student.is_user ? "border-[#4F6EF7] text-[#4F6EF7] bg-[#4F6EF7]/10" : "border-white/10 text-white/80 bg-white/5"
                }`}>
                  {student.initials}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${student.is_user ? "text-white font-bold" : "text-white/80"}`}>
                    {student.name}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                    student.plan === "Team" ? "bg-purple-500/10 border border-purple-500/30 text-purple-400" :
                    student.plan === "Pro" ? "bg-[#4F6EF7]/10 border border-[#4F6EF7]/30 text-[#4F6EF7]" :
                    "bg-white/5 border border-white/10 text-white/40"
                  }`}>
                    {student.plan.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-[12px]">
                <div className="flex items-center gap-1 text-[#FF6B35]">
                  <Flame size={12} fill="currentColor" />
                  <span>{student.streak}d</span>
                </div>

                <span className="text-[#39F5A0] font-bold w-16 text-right">
                  {student.xp} XP
                </span>

                <div className="w-5 flex items-center justify-center">
                  {student.change === "up" && <ArrowUp size={14} className="text-[#39F5A0]" />}
                  {student.change === "down" && <ArrowDown size={14} className="text-[#FF6B35]" />}
                  {student.change === "same" && <span className="text-white/20">—</span>}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
