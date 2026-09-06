import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, Bell, Sun, Moon } from "lucide-react";
import { useTravel } from "../context/TravelContext";

const NavItem = ({ text, onClick, active, icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative px-3.5 py-1.5 rounded-full cursor-pointer group flex items-center justify-center select-none gap-1.5 transition-colors text-[11px] font-mono tracking-wider uppercase"
    >
      {/* Framer Motion Active sliding indicator */}
      {active && (
        <motion.div
          layoutId="navbar-active-pill"
          className="absolute inset-0 rounded-full bg-[rgba(201,168,106,0.15)] border border-[rgba(201,168,106,0.35)] shadow-sm pointer-events-none"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}

      {/* Subtle hover background when not active */}
      {!active && (
        <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-full pointer-events-none" />
      )}

      <span className={`relative z-10 flex items-center gap-1.5 transition-colors ${active ? "text-white font-bold" : "text-[#d8d2c8] group-hover:text-white"}`}>
        {icon}
        {text}
      </span>
    </button>
  );
};

export const Navbar = () => {
  const {
    activeView,
    setActiveView,
    setIsPlannerOpen,
    isCardExpanded,
    unreadNotificationCount,
    setIsNotificationDrawerOpen,
    theme,
    toggleTheme
  } = useTravel();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // When full-screen Unfold Journey modal is open, hide navbar completely
  if (isCardExpanded) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 sm:py-5 lg:py-6 text-[11px] font-mono tracking-wider uppercase z-[100] pointer-events-none">

        {/* Desktop & Tablet Left - Explore, My Trips, AI Agent */}
        <div className="hidden md:flex items-center gap-2.5 lg:gap-4 tracking-tight pointer-events-auto">
          <NavItem
            text="Explore"
            active={activeView === "landing"}
            onClick={() => setActiveView("landing")}
          />
          <NavItem
            text="My Trips"
            active={activeView === "liveTrip"}
            onClick={() => setActiveView("liveTrip")}
          />
          <NavItem
            text="AI Agent"
            active={activeView === "agent"}
            onClick={() => setActiveView("agent")}
            icon={<Sparkles className="w-3 h-3 text-[#C9A86A]" />}
          />
        </div>

        {/* Space in middle for the animated TRAVELFLOW logo to land */}
        <div className="w-[120px] lg:w-[180px] hidden md:block" />

        {/* Desktop & Tablet Right - Theme Toggle & Notifications Bell */}
        <div className="hidden md:flex items-center justify-end gap-2.5 lg:gap-3 tracking-tight pointer-events-auto">
          {/* Theme Toggle (Light Sky Palette vs Dark Brown Palette) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative p-2.5 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 hover:border-[rgba(201,168,106,0.35)] text-[#d8d2c8] hover:text-white transition-all cursor-pointer group flex items-center justify-center shadow-md hover:scale-105 active:scale-95"
            title={theme === "dark" ? "Switch to Light Mode (Sky Palette)" : "Switch to Dark Mode (Brown Palette)"}
            aria-label="Toggle theme mode"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#e5dec9] group-hover:text-white transition-colors" />
            ) : (
              <Moon className="w-4 h-4 text-[#f5f2eb] group-hover:text-white transition-colors" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-2.5 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 hover:border-[rgba(201,168,106,0.35)] text-[#d8d2c8] hover:text-white transition-all cursor-pointer group flex items-center justify-center shadow-md hover:scale-105 active:scale-95"
            title="Notifications & AI Alerts"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 text-[#e5dec9] group-hover:text-white transition-colors" />

            {/* Unread Badge / Terracotta Pulse */}
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#B86F52] text-white text-[9px] font-bold font-mono shadow-md">
                {unreadNotificationCount}
                <span className="absolute -inset-0.5 rounded-full bg-[#B86F52] animate-ping opacity-60 pointer-events-none" />
              </span>
            )}
          </button>
        </div>

        {/* Mobile (< md): Logo, Theme Toggle, Notifications & Menu button */}
        <div className="md:hidden flex w-full justify-between items-center pointer-events-auto">
          {activeView !== "landing" ? (
            <span
              onClick={() => setActiveView("landing")}
              className="text-xs font-bold font-sans tracking-widest text-white uppercase cursor-pointer"
            >
              TRAVELFLOW
            </span>
          ) : (
            <div className="w-4" />
          )}

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="relative p-2 text-white hover:bg-white/10 rounded-full cursor-pointer transition-colors"
              title="Toggle theme mode"
              aria-label="Toggle theme mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="relative p-2 text-white hover:bg-white/10 rounded-full cursor-pointer transition-colors"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B86F52]" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="text-white p-2 hover:bg-white/10 rounded-sm transition-all duration-300 cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[300] transition-all duration-500 ${isOpen ? "opacity-100 pointer-events-auto backdrop-blur-sm" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div
          className={`absolute right-0 top-0 h-screen w-3/4 sm:w-1/2 bg-[#14100d] border-l border-white/10 transition-transform duration-500 ease-in-out flex flex-col px-6 pt-8 pb-10 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-12">
            <span className="text-base font-extrabold tracking-widest text-white uppercase font-sans">
              TRAVELFLOW
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2 hover:bg-white/10 transition-all duration-300 rounded-sm cursor-pointer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col gap-6 items-start font-mono text-xs uppercase tracking-wider text-[#d8d2c8]">
            <button onClick={() => { setActiveView("landing"); setIsOpen(false); }} className="hover:text-white">
              Explore
            </button>
            <button onClick={() => { setActiveView("liveTrip"); setIsOpen(false); }} className="hover:text-white">
              My Trips
            </button>
            <button onClick={() => { setActiveView("agent"); setIsOpen(false); }} className="hover:text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
              AI Agent
            </button>
            <button onClick={() => { setIsPlannerOpen(true); setIsOpen(false); }} className="mt-4 px-6 py-2.5 rounded-full bg-white text-black font-bold">
              Start Planning →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
