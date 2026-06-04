"use client";

import React from "react";
import { AlertCircle, Database, RefreshCw, Sparkles } from "lucide-react";
import NoiseTexture from "@/components/ui/NoiseTexture";

interface ErrorTileProps {
  message: string;
  onUseDemo?: () => void;
}

export default function ErrorTile({ message, onUseDemo }: ErrorTileProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="p-6 md:p-8 flex items-center justify-center min-h-[calc(100vh-8rem)] select-none">
      <div className="glass-card max-w-xl w-full p-8 text-center border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] relative overflow-hidden">
        <NoiseTexture />
        
        <div className="relative z-10 flex flex-col items-center space-y-5">
          {/* Glowing error icon */}
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <AlertCircle size={28} />
          </div>

          <h2 className="font-display font-extrabold text-2xl text-[#F0F2FF] tracking-tight">
            Database Connection Offline
          </h2>

          <div className="bg-[#080810]/50 border border-white/5 rounded-xl p-4 w-full text-left font-mono text-[12px] text-red-300 overflow-x-auto max-h-32">
            <code>{message}</code>
          </div>

          <p className="text-[14px] text-[rgba(240,242,255,0.5)] max-w-md">
            Luminary is attempting to sync with Supabase PostgreSQL. Ensure your environment variables are configured in <code className="text-white bg-white/5 px-1 py-0.5 rounded">.env.local</code>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-3">
            <button
              onClick={handleReload}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[13px] font-semibold text-[#F0F2FF] hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw size={14} />
              Retry Connection
            </button>

            {onUseDemo && (
              <button
                onClick={onUseDemo}
                className="px-5 py-2.5 rounded-xl bg-[#4F6EF7]/20 border border-[#4F6EF7]/50 text-[13px] font-semibold text-[#F0F2FF] hover:bg-[#4F6EF7]/35 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(79,110,247,0.2)]"
              >
                <Sparkles size={14} className="text-[#39F5A0]" />
                Explore Demo Mode
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
