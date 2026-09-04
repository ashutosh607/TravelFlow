import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TravelProvider, useTravel } from "./context/TravelContext";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/landing/LandingPage";
import { TripPlanningModal } from "./components/planner/TripPlanningModal";
import { AITravelAgentView } from "./components/agent/AITravelAgentView";
import { LiveTripManager } from "./components/itinerary/LiveTripManager";
import { IntroPreloader } from "./components/landing/IntroPreloader";

gsap.registerPlugin(ScrollTrigger);

function MainAppContent() {
  const { activeView } = useTravel();

  // Initialize Lenis Smooth Scroll with GSAP ScrollTrigger Synchronization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#181411] text-[#f5f2eb] font-sans overflow-x-hidden selection:bg-[#f5f2eb] selection:text-[#181411]">
      
      {/* Cinematic Intro Preloader */}
      <IntroPreloader />

      {/* Universal Minimal Luxury Navbar */}
      <Navbar />

      {/* Global Multi-Step Trip Planner Modal */}
      <TripPlanningModal />

      {/* Dynamic View Router */}
      <main>
        {activeView === "landing" && <LandingPage />}
        {activeView === "agent" && <AITravelAgentView />}
        {activeView === "liveTrip" && <LiveTripManager />}
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-white/10 bg-[#100d0a] py-12 text-center text-xs font-mono text-[#a89f91] space-y-3">
        <div className="flex items-center justify-center gap-6 text-sm uppercase tracking-widest font-sans font-bold text-white">
          <span>TRAVELFLOW</span>
          <span>·</span>
          <span className="text-[#a89f91] font-normal font-mono text-xs">We don't just plan your trip. We manage it.</span>
        </div>
        <p className="text-[#736a5e] text-[11px]">
          © {new Date().getFullYear()} TravelFlow AI Systems. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <TravelProvider>
      <MainAppContent />
    </TravelProvider>
  );
}

export default App;