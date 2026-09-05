import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Zap, CheckCircle2, Plane, Clock, Sparkles } from "lucide-react";
import { useTravel } from "../../context/TravelContext";
import { CinematicScrollHero } from "./CinematicScrollHero";

gsap.registerPlugin(ScrollTrigger);

export const LandingPage = () => {
  const containerRef = useRef(null);
  const {
    setIsPlannerOpen,
    setActiveView,
    triggerDisruption
  } = useTravel();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ============================================================
      // SECTION 02: PERSONALIZATION LAYER ("We understand how you travel.")
      // ============================================================
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 78%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl2
        .fromTo(".s2-eyebrow",
          { opacity: 0, y: 25, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
        )
        .fromTo(".s2-title-line",
          { opacity: 0, x: 25, y: 25, filter: "blur(8px)" },
          { opacity: 1, x: 0, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.16, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(".s2-desc",
          { opacity: 0, y: 20, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(".s2-btn",
          { opacity: 0, y: 18, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        // Right Side Cards sequentially 01 -> 02 -> 03 -> 04 from the right with blur
        .fromTo(".s2-card",
          { opacity: 0, x: 45, filter: "blur(10px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.16, ease: "power2.out" },
          "-=0.8"
        );

      // ============================================================
      // SECTION 03: REAL-TIME MANAGEMENT ("We adapt as you travel.")
      // ============================================================
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: "#adaptation",
          start: "top 78%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl3
        .fromTo(".s3-eyebrow",
          { opacity: 0, y: 25, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
        )
        .fromTo(".s3-title-line",
          { opacity: 0, y: 35, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.18, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(".s3-desc",
          { opacity: 0, y: 20, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(".s3-btn",
          { opacity: 0, y: 18, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
          "-=0.4"
        )
        // Right Side Telemetry Panel container
        .fromTo(".s3-panel-container",
          { opacity: 0, x: 40, filter: "blur(10px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
          "-=0.8"
        )
        // Events sequentially: EVENT -> CONFLICT -> AI DECISION -> RECOVERY
        .fromTo(".s3-event",
          { opacity: 0, x: 35, filter: "blur(8px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.75, stagger: 0.22, ease: "power2.out" },
          "-=0.4"
        );

      // ============================================================
      // FINAL CALL TO ACTION ("Wherever you go, we've got you.")
      // ============================================================
      const tlCta = gsap.timeline({
        scrollTrigger: {
          trigger: "#final-cta",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      tlCta
        .fromTo(".cta-eyebrow",
          { opacity: 0, y: 25, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
        )
        .fromTo(".cta-title-line",
          { opacity: 0, y: 30, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.18, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(".cta-sub",
          { opacity: 0, y: 20, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(".cta-btn",
          { opacity: 0, y: 25, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85, ease: "power2.out" },
          "-=0.3"
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#181411] text-[#f5f2eb] overflow-hidden selection:bg-[#f5f2eb] selection:text-[#181411]">

      {/* ============================================================ */}
      {/* 1. MASTER CINEMATIC SCROLL HERO (AIRPLANE WINDOW + SKY + CARDS) */}
      {/* ============================================================ */}
      <CinematicScrollHero />

      {/* ============================================================ */}
      {/* 2. DEEP DIVE: "WE UNDERSTAND HOW YOU TRAVEL" */}
      {/* ============================================================ */}
      <section id="about" className="relative z-10 py-24 sm:py-32 border-t border-white/10 bg-[#14100d]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-6">
              <span className="s2-eyebrow text-xs font-mono tracking-widest text-[#a89f91] uppercase block">
                [ 02 / PERSONALIZATION LAYER ]
              </span>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white font-sans leading-[0.95]">
                <span className="s2-title-line block">We understand</span>
                <span className="s2-title-line block">how you travel.</span>
              </h2>
              <p className="s2-desc text-[#b8afa3] text-sm sm:text-base leading-relaxed font-sans">
                Your budget. Your interests. Your people. TravelFlow turns them into a journey designed around you.
              </p>

              <div className="s2-btn pt-2">
                <button
                  onClick={() => setIsPlannerOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase text-white hover:text-[#eae5d9] group border-b border-white pb-1"
                >
                  <span>Configure Preferences</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Persona Cards: 01 -> 02 -> 03 -> 04 */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="s2-card p-6 rounded-2xl bg-[#1f1a15] border border-white/10 space-y-3 shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-xs font-mono">
                  01
                </div>
                <h4 className="text-base font-bold text-white font-sans">Couples & Romance</h4>
                <p className="text-xs text-[#b8afa3] leading-relaxed font-sans">
                  Sunset boat reservations, private lakeside suites, candlelit dining & relaxed late starts.
                </p>
              </div>

              <div className="s2-card p-6 rounded-2xl bg-[#1f1a15] border border-white/10 space-y-3 shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-xs font-mono">
                  02
                </div>
                <h4 className="text-base font-bold text-white font-sans">Family & Seniors</h4>
                <p className="text-xs text-[#b8afa3] leading-relaxed font-sans">
                  Step-free monument access, scheduled afternoon rest buffers, and nearby pediatric medical safety.
                </p>
              </div>

              <div className="s2-card p-6 rounded-2xl bg-[#1f1a15] border border-white/10 space-y-3 shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-xs font-mono">
                  03
                </div>
                <h4 className="text-base font-bold text-white font-sans">Smart Budget Optimizer</h4>
                <p className="text-xs text-[#b8afa3] leading-relaxed font-sans">
                  Itemized breakdowns across travel, hotels, dining, and activities with instant trade-off balancing.
                </p>
              </div>

              <div className="s2-card p-6 rounded-2xl bg-[#1f1a15] border border-white/10 space-y-3 shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-xs font-mono">
                  04
                </div>
                <h4 className="text-base font-bold text-white font-sans">Collaborative Group Sync</h4>
                <p className="text-xs text-[#b8afa3] leading-relaxed font-sans">
                  Balanced itinerary voting, automated expense splitting, and customized multi-group transit coordination.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. DEEP DIVE: "WE ADAPT AS YOU TRAVEL" (HERO USP) */}
      {/* ============================================================ */}
      <section id="adaptation" className="relative z-10 py-24 sm:py-32 border-t border-white/10 bg-[#181411]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-6">
              <span className="s3-eyebrow text-xs font-mono tracking-widest text-[#a89f91] uppercase block">
                [ 03 / REAL-TIME MANAGEMENT ]
              </span>
              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white font-sans leading-[0.95]">
                <span className="s3-title-line block">We adapt</span>
                <span className="s3-title-line block">as you travel.</span>
              </h2>
              <p className="s3-desc text-[#b8afa3] text-sm sm:text-base leading-relaxed font-sans">
                When plans change, TravelFlow finds the next best way forward. Flight delays, weather downpours, traffic, or closed attractions are resolved automatically.
              </p>

              <div className="s3-btn pt-2">
                <button
                  onClick={() => {
                    setActiveView("liveTrip");
                    triggerDisruption();
                  }}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] transition-all shadow-md flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Simulate Live Flight Delay & Auto-Recovery →</span>
                </button>
              </div>
            </div>

            {/* Disruption Cascade Card & Sequential Story Panel */}
            <div className="lg:col-span-7">
              <div className="s3-panel-container rounded-2xl bg-[#1f1a15] border border-white/15 p-7 sm:p-8 space-y-6 shadow-2xl">

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#d8d2c8] font-bold">
                    Telemetry: Flight Delay Auto-Recovery
                  </span>
                  <span className="text-[10px] font-mono bg-white/10 text-white px-2.5 py-0.5 rounded-full">
                    Active Sentinel
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Event 1: The Disruption Event */}
                  <div className="s3-event p-3.5 rounded-xl bg-[#2a1b18] border border-white/10 text-white flex items-center gap-3">
                    <Plane className="w-4 h-4 text-white shrink-0" />
                    <span>Flight delayed by 3h (10:00 AM ➔ 01:00 PM)</span>
                  </div>

                  {/* Event 2: The Conflict */}
                  <div className="s3-event p-3.5 rounded-xl bg-[#14100d] border border-white/10 text-[#d8d2c8] flex items-center gap-3">
                    <Clock className="w-4 h-4 text-white shrink-0" />
                    <span>Hotel check-in & 3:30 PM City Palace slot conflicted</span>
                  </div>

                  {/* Event 3: AI Dynamic Decision */}
                  <div className="s3-event p-3.5 rounded-xl bg-[#1f1a15] border border-white/20 text-[#f5f2eb] flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-[#e5dec9] shrink-0" />
                    <span>AI moves City Palace to Day 2 morning · Preserves romantic sunset dinner</span>
                  </div>

                  {/* Event 4: Recovery & Restored Health */}
                  <div className="s3-event p-3.5 rounded-xl bg-[#18241c] border border-white/20 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Trip Health: 61/100 ➔ 84/100 Restored</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded text-white">
                      $0 Extra Cost
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FINAL CALL TO ACTION */}
      {/* ============================================================ */}
      <section id="final-cta" className="relative z-10 py-24 sm:py-32 border-t border-white/10 text-center bg-[#100d0a]">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <span className="cta-eyebrow text-xs font-mono tracking-widest text-[#a89f91] uppercase block">
            WE DON'T JUST PLAN YOUR TRIP. WE MANAGE IT.
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white font-sans leading-tight">
            <span className="cta-title-line block">Wherever you go,</span>
            <span className="cta-title-line block">we've got you.</span>
          </h2>
          <p className="cta-sub text-[#a89f91] text-sm sm:text-base max-w-md mx-auto font-mono">
            Plan. Personalize. Adapt.
          </p>

          <div className="cta-btn pt-4 flex items-center justify-center">
            <button
              onClick={() => setIsPlannerOpen(true)}
              className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>START THE JOURNEY →</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
