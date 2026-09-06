import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { TravelProvider, useTravel } from "./context/TravelContext";
import { Navbar } from "./components/Navbar";
import { NotificationSidebar } from "./components/notifications/NotificationSidebar";
import { LandingPage } from "./components/landing/LandingPage";
import { TripPlanningModal } from "./components/planner/TripPlanningModal";
import { ExpandedRecommendationModal } from "./components/agent/ExpandedRecommendationModal";
import { AITravelAgentView } from "./components/agent/AITravelAgentView";
import { LiveTripManager } from "./components/itinerary/LiveTripManager";
import { IntroPreloader } from "./components/landing/IntroPreloader";

gsap.registerPlugin(ScrollTrigger);

// Numerical ordering for directional page-turning transitions
const VIEW_INDEX = {
  landing: 0,
  liveTrip: 1,
  agent: 2
};

const pageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    filter: "blur(14px)",
    scale: 0.985
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    filter: "blur(14px)",
    scale: 0.985,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

function MainAppContent() {
  const { activeView, isPlannerOpen, isCardExpanded, isNotificationDrawerOpen } = useTravel();
  const lenisRef = useRef(null);
  const [direction, setDirection] = useState(1);
  const prevViewRef = useRef(activeView);

  // Track page turn direction (forward vs backward across Explore, My Trips, AI Agent)
  useEffect(() => {
    const prevIdx = VIEW_INDEX[prevViewRef.current] ?? 0;
    const nextIdx = VIEW_INDEX[activeView] ?? 0;
    if (nextIdx !== prevIdx) {
      setDirection(nextIdx > prevIdx ? 1 : -1);
      prevViewRef.current = activeView;
    }
  }, [activeView]);

  // Initialize Lenis Smooth Scroll with GSAP ScrollTrigger Synchronization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0
    });
    lenisRef.current = lenis;

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
      lenisRef.current = null;
    };
  }, []);

  // When activeView changes, reset scroll to top immediately
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [activeView]);

  // Pause Lenis when a modal or notification drawer is open so wheel events inside are 100% native
  useEffect(() => {
    if (isPlannerOpen || isCardExpanded || isNotificationDrawerOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isPlannerOpen, isCardExpanded, isNotificationDrawerOpen]);

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)] font-sans overflow-x-hidden selection:bg-[var(--page-selection-bg)] selection:text-[var(--page-selection-text)] transition-colors duration-300">

      {/* Cinematic Intro Preloader */}
      <IntroPreloader />

      {/* Universal Minimal Luxury Navbar */}
      <Navbar />

      {/* Live AI Sentinel Notification Slidebar (Right Drawer) */}
      <NotificationSidebar />

      {/* Global Multi-Step Trip Planner Modal */}
      <TripPlanningModal />

      {/* Global Unfold Journey Modal (Full-Screen Immersive View) */}
      <ExpandedRecommendationModal />

      {/* Dynamic View Router */}
      <main>
        {activeView === "landing" && <LandingPage />}

        <AnimatePresence mode="wait" custom={direction}>
          {activeView === "liveTrip" && (
            <motion.div
              key="liveTrip"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="will-change-[transform,filter,opacity]"
            >
              <LiveTripManager />
            </motion.div>
          )}

          {activeView === "agent" && (
            <motion.div
              key="agent"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="will-change-[transform,filter,opacity]"
            >
              <AITravelAgentView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Minimal Footer */}
      <footer className="border-t border-[var(--footer-border)] bg-[var(--footer-bg)] py-12 text-center text-xs font-mono text-[var(--footer-sub)] space-y-3 transition-colors duration-300">
        <div className="flex items-center justify-center gap-6 text-sm uppercase tracking-widest font-sans font-bold text-[var(--footer-title)]">
          <span>TRAVELFLOW</span>
          <span>·</span>
          <span className="text-[var(--footer-sub)] font-normal font-mono text-xs">We don't just plan your trip. We manage it.</span>
        </div>
        <p className="text-[var(--footer-copy)] text-[11px]">
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