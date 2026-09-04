import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useTravel } from "../context/TravelContext";

const NavItem = ({ text, onClick, active, icon }) => {
  return (
    <div 
      onClick={onClick}
      className="relative h-8 lg:h-6 px-3 overflow-hidden cursor-pointer group flex items-center justify-center select-none gap-1.5"
    >
      {/* Fixed background on hover */}
      <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-sm" />

      {/* Normal text */}
      <span className={`relative z-10 flex items-center gap-1.5 transition-transform duration-500 ease-out group-hover:-translate-y-[130%] ${active ? "text-white font-bold" : "text-[#d8d2c8]"}`}>
        {icon}
        {text}
      </span>

      {/* Hover text sliding from below */}
      <span className="absolute inset-0 z-10 flex items-center justify-center gap-1.5 text-white transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 font-bold">
        {icon}
        {text}
      </span>
    </div>
  );
};

export const Navbar = () => {
  const { activeView, setActiveView, setIsPlannerOpen } = useTravel();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 sm:px-10 lg:px-20 py-8 text-[11px] font-mono tracking-wider uppercase z-[100] pointer-events-none">
        
        {/* Desktop Left - Explore, My Trips, AI Agent */}
        <div className="hidden lg:flex items-center gap-4 tracking-tight pointer-events-auto">
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
            icon={<Sparkles className="w-3 h-3 text-[#e5dec9]" />}
          />
        </div>

        {/* Empty space in middle for the animated TRAVELFLOW logo to land */}
        <div className="w-[180px] hidden lg:block" />

        {/* Desktop Right - Concierge contacts */}
        <div className="hidden lg:flex items-center gap-6 tracking-tight pointer-events-auto text-[#d8d2c8]">
          <span className="text-[10px] text-[#a89f91]">+91 98 200 45000</span>
          <span className="text-[10px] text-[#a89f91] lowercase">concierge@travelflow.com</span>
        </div>

        {/* Mobile: Logo & Menu button */}
        <div className="lg:hidden flex w-full justify-between items-center pointer-events-auto">
          <span 
            onClick={() => setActiveView("landing")}
            className="text-xs font-bold font-sans tracking-widest text-white uppercase cursor-pointer"
          >
            TRAVELFLOW
          </span>
          <button
            onClick={() => setIsOpen(true)}
            className="text-white p-2 hover:bg-white/10 rounded-sm transition-all duration-300 cursor-pointer"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[300] transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto backdrop-blur-sm" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div
          className={`absolute right-0 top-0 h-screen w-3/4 sm:w-1/2 bg-[#14100d] border-l border-white/10 transition-transform duration-500 ease-in-out flex flex-col px-6 pt-8 pb-10 ${
            isOpen ? "translate-x-0" : "translate-x-full"
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
              <Sparkles className="w-3.5 h-3.5 text-[#e5dec9]" />
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
