"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NoiseTexture from "./NoiseTexture";

const telemetryPhrases = [
  "LUMINARY_CORE_ONLINE",
  "ESTABLISHING_SPATIAL_MATRIX...",
  "CONNECTING_SECURE_TELEMETRY...",
  "SYNCING_KNOWLEDGE_DB...",
  "DECRYPTING_SPATIAL_INTERFACES...",
  "SYSTEM_READY_LOADED"
];

export default function Loader() {
  const [telemetryIndex, setTelemetryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryIndex((prev) => (prev < telemetryPhrases.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#080810] flex flex-col items-center justify-center z-50 select-none">
      {/* Background Atmosphere */}
      <div className="cosmos-bg" />
      <div className="cosmos-noise" />

      {/* Spinner Container */}
      <div className="relative flex flex-col items-center justify-center space-y-8 max-w-sm w-full p-8 text-center">
        
        {/* Core Glowing Geometry */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <motion.div
            className="absolute w-28 h-28 rounded-full bg-[#4F6EF7]/10 blur-xl border border-[#4F6EF7]/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Orbiting Ring 1 (Cobalt) */}
          <motion.div
            className="absolute w-24 h-24 rounded-full border-2 border-dashed border-[#4F6EF7]/40"
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Orbiting Ring 2 (Aurora Green) */}
          <motion.div
            className="absolute w-20 h-20 rounded-full border border-double border-[#39F5A0]/30"
            animate={{ rotate: -360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Central Hexagon spinner */}
          <motion.div
            className="relative w-12 h-12 flex items-center justify-center text-[#4F6EF7]"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 18, -18, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12,2 22,8 22,18 12,24 2,18 2,8" className="drop-shadow-[0_0_10px_#4F6EF7]" />
            </svg>
            {/* Center dot */}
            <div className="absolute w-2.5 h-2.5 bg-[#39F5A0] rounded-full shadow-[0_0_10px_#39F5A0] animate-ping" />
          </motion.div>
        </div>

        {/* Telemetry Output console */}
        <div className="w-full bg-white/3 border border-white/5 rounded-xl p-4 min-h-[72px] font-mono text-[11px] text-left text-white/70 relative overflow-hidden backdrop-blur-md">
          <NoiseTexture />
          <div className="relative z-10 space-y-1">
            <div className="text-[#39F5A0] font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#39F5A0] rounded-full animate-pulse" />
              STATUS: INITIALIZING
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={telemetryIndex}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.15 }}
                className="text-white/40 truncate"
              >
                &gt; {telemetryPhrases[telemetryIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
