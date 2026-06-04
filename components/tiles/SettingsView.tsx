"use client";

import React, { useState, useEffect } from "react";
import { Settings, User, Eye, Monitor, Database, ShieldCheck, HelpCircle } from "lucide-react";
import NoiseTexture from "../ui/NoiseTexture";

export default function SettingsView() {
  const [useNeonCursor, setUseNeonCursor] = useState(true);
  const [nebulaOpacity, setNebulaOpacity] = useState(12);
  const [glowColor, setGlowColor] = useState("#4F6EF7");

  useEffect(() => {
    // If user changes custom cursor settings, update state or DOM classes
    const body = document.body;
    if (useNeonCursor) {
      body.style.cursor = "none";
    } else {
      body.style.cursor = "auto";
    }
  }, [useNeonCursor]);

  return (
    <div className="p-6 md:p-8 space-y-6 select-none max-w-3xl mx-auto w-full">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono tracking-[0.2em] text-[#4F6EF7] uppercase block mb-1">
          System Customizations
        </span>
        <h2 className="font-display font-extrabold text-3xl text-[#F0F2FF]">Preferences</h2>
      </div>

      {/* Profile Section */}
      <div className="glass-card p-6 border border-white/5 relative overflow-hidden">
        <NoiseTexture />
        <h3 className="font-sans text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
          <User size={16} className="text-[#4F6EF7]" />
          Student Account
        </h3>

        <div className="flex flex-col sm:flex-row gap-6 items-center z-10 relative">
          <div 
            className="w-16 h-16 rounded-full bg-[#4F6EF7]/20 border-2 border-[#4F6EF7] flex items-center justify-center text-[#F0F2FF] font-semibold text-xl"
            style={{ boxShadow: `0 0 20px ${glowColor}66` }}
          >
            YC
          </div>
          <div className="flex-1 space-y-2 w-full">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono text-white/40 block mb-1">NAME</label>
                <input 
                  type="text" 
                  value="Yash C." 
                  disabled
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-[13px] text-white/70 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-white/40 block mb-1">EMAIL</label>
                <input 
                  type="text" 
                  value="yashchaudhari9599@gmail.com" 
                  disabled
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-[13px] text-white/70 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="glass-card p-6 border border-white/5 relative overflow-hidden space-y-6">
        <NoiseTexture />
        <h3 className="font-sans text-sm font-semibold text-white/80 flex items-center gap-2">
          <Eye size={16} className="text-[#39F5A0]" />
          Visual Interface Options
        </h3>

        <div className="space-y-4 z-10 relative">
          {/* Custom Cursor Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[13px] font-semibold text-white">Spatial Neon Cursor</span>
              <p className="text-[11px] text-white/40">Replaces default browser cursor with a trailing cobalt glow dot</p>
            </div>
            <button
              onClick={() => setUseNeonCursor(!useNeonCursor)}
              className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                useNeonCursor ? "bg-[#39F5A0]" : "bg-white/10"
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-black transition-transform ${
                useNeonCursor ? "translate-x-4" : "translate-x-0"
              }`} />
            </button>
          </div>

          <hr className="border-white/5" />

          {/* Nebula Opacity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-[13px] font-semibold text-white">
              <span>Nebula Cloud Intensity</span>
              <span className="font-mono text-white/50">{nebulaOpacity}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              value={nebulaOpacity}
              onChange={(e) => setNebulaOpacity(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#4F6EF7]"
            />
          </div>
        </div>
      </div>

      {/* Integration Info */}
      <div className="glass-card p-6 border border-white/5 relative overflow-hidden space-y-4">
        <NoiseTexture />
        <h3 className="font-sans text-sm font-semibold text-white/80 flex items-center gap-2">
          <Database size={16} className="text-[#FF6B35]" />
          Database Connection Diagnostics
        </h3>

        <div className="space-y-3 text-[12px] font-mono text-white/70 relative z-10">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">HOSTING_URL</span>
            <span className="text-right truncate max-w-[200px]">https://fpcyvarnktgaudtoyinl.supabase.co</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">API_KEY_TYPE</span>
            <span>Anon / Public JWT</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-white/40">RLS_SECURITY</span>
            <span className="text-[#39F5A0] flex items-center gap-1">
              <ShieldCheck size={12} />
              Configured
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">REDUNDANCY_FALLBACK</span>
            <span className="text-yellow-400">Demo Dataset Enabled</span>
          </div>
        </div>
      </div>

    </div>
  );
}
