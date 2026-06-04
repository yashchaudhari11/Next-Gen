"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Trophy, Settings, LineChart, Star, LayoutDashboard, ChevronLeft } from "lucide-react";
import NoiseTexture from "../ui/NoiseTexture";
import CoursesView from "../tiles/CoursesView";
import ActivityView from "../tiles/ActivityView";
import LeaderboardView from "../tiles/LeaderboardView";
import SettingsView from "../tiles/SettingsView";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "activity", label: "Activity", icon: LineChart },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync collapsed state from Sidebar component if we want, 
  // but lifting it here and passing it down is much cleaner.
  // Let's modify Sidebar to accept isCollapsed and onToggle.

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar Navigation */}
      <SidebarWithState
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? "md:pl-[72px]" : "md:pl-[220px]"
          } pb-16 md:pb-0`}
      >
        <header className="h-16 border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between px-6 md:px-8 select-none">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono text-[#4F6EF7]">LUMINARY_SYSTEM</span>
            <span className="text-[10px] text-[rgba(240,242,255,0.3)]">v1.0.0</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Status light */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(57,245,160,0.08)] border border-[rgba(57,245,160,0.2)] text-[11px] font-mono text-[#39F5A0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39F5A0] animate-pulse" />
              DB_CONNECTED
            </div>
          </div>
        </header>

        {/* Content Router */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                {children}
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.99, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.99, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                {activeTab === "courses" && <CoursesView />}
                {activeTab === "activity" && <ActivityView />}
                {activeTab === "leaderboard" && <LeaderboardView />}
                {activeTab === "settings" && <SettingsView />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Subcomponent wrapper to map states to Sidebar
function SidebarWithState({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (c: boolean) => void;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <motion.aside
        className="hidden md:flex flex-col justify-between fixed top-0 left-0 h-full z-40 select-none bg-[rgba(255,255,255,0.03)] border-r border-[rgba(255,255,255,0.06)] shadow-[1px_0_0_rgba(79,110,247,0.15)]"
        animate={{ width: isCollapsed ? 72 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Top Section: Logo & Toggle */}
        <div className="p-4 flex flex-col items-center">
          <div className="flex items-center justify-between w-full relative min-h-[50px]">
            {/* Logo Mark & Name */}
            <div className="flex items-center gap-3">
              {/* Hexagon Mark with orbiting dot */}
              <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-[#4F6EF7]">
                  <polygon
                    points="16,2 29,9 29,23 16,30 3,23 3,9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="absolute w-2 h-2 bg-[#4F6EF7] rounded-full animate-orbit" />
              </div>

              {/* Title text */}
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-display font-bold text-[16px] text-[#F0F2FF] tracking-wide"
                >
                  Luminary
                </motion.span>
              )}
            </div>

            {/* Collapse toggle button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-7 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#080810] text-[#F0F2FF] flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(79,110,247,0.15)] hover:border-[#4F6EF7]/60 hover:text-[#4F6EF7] transition-colors"
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <ChevronLeft size={14} />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative w-full h-11 flex items-center px-3 rounded-[10px] text-[#F0F2FF] cursor-pointer transition-colors duration-200 ${isActive ? "" : "hover:text-[#4F6EF7]"
                  }`}
              >
                {/* Active Pill behind */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 z-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(79,110,247,0.2) 0%, rgba(123,94,167,0.1) 100%)",
                      borderRadius: "10px",
                      border: "1px solid rgba(79,110,247,0.3)",
                      boxShadow: "0 0 20px rgba(79,110,247,0.15)",
                    }}
                  />
                )}

                {/* Icon wrapper */}
                <div className="relative z-10 flex items-center justify-center shrink-0 w-6">
                  <Icon size={20} className={isActive ? "text-[#4F6EF7]" : ""} />
                </div>

                {/* Label text */}
                {!isCollapsed ? (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`ml-3 font-sans text-[14px] font-medium relative z-10 ${isActive ? "text-[#F0F2FF]" : "text-[rgba(240,242,255,0.6)]"
                      }`}
                  >
                    {item.label}
                  </motion.span>
                ) : (
                  /* Floating label on hover if collapsed */
                  <AnimatePresence>
                    {hoveredItem === item.id && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 8 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-14 bg-[#080810] border border-[rgba(255,255,255,0.08)] px-3 py-1.5 rounded-[6px] text-[12px] font-medium text-[#F0F2FF] shadow-[0_0_15px_rgba(0,0,0,0.5)] z-50 whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Details at bottom */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              className="w-9 h-9 rounded-full bg-[#4F6EF7]/20 border-2 border-[#4F6EF7] flex items-center justify-center text-[#F0F2FF] font-semibold text-[13px] shrink-0"
              style={{ boxShadow: "0 0 12px rgba(79,110,247,0.5)" }}
            >
              YC
            </div>

            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col min-w-0"
              >
                <span className="font-sans text-[13px] font-semibold text-[#F0F2FF] truncate">
                  Yash C.
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#4F6EF7]/15 border border-[#4F6EF7]/30 text-[#4F6EF7] w-fit mt-0.5">
                  <Star size={8} fill="currentColor" />
                  PRO
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#080810]/75 backdrop-blur-xl border-t border-[rgba(255,255,255,0.06)] flex items-center justify-around px-2 z-40 select-none pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-[#F0F2FF] cursor-pointer"
            >
              <div className={`relative p-1.5 rounded-lg ${isActive ? "text-[#4F6EF7] bg-[#4F6EF7]/10" : "text-[rgba(240,242,255,0.6)]"}`}>
                <Icon size={20} />
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#4F6EF7] rounded-full shadow-[0_0_8px_#4F6EF7]"
                  />
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </>
  );
}
