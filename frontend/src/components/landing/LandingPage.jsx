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
    <div ref={containerRef} className="relative min-h-screen bg-[var(--page-bg)] text-[var(--page-text)] overflow-hidden selection:bg-[var(--page-selection-bg)] selection:text-[var(--page-selection-text)] transition-colors duration-300">

      {/* ============================================================ */}
      {/* 1. MASTER CINEMATIC SCROLL HERO (AIRPLANE WINDOW + SKY + CARDS) */}
      {/* ============================================================ */}
      <CinematicScrollHero />

      {/* ============================================================ */}
      {/* 2. DEEP DIVE: "WE UNDERSTAND HOW YOU TRAVEL" */}
      {/* ============================================================ */}
      <section id="about" className="relative z-10 py-16 sm:py-24 lg:py-32 border-t border-[var(--s2-border)] bg-[var(--s2-bg)] text-[var(--page-text)] overflow-hidden transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <span className="s2-eyebrow text-xs font-mono tracking-widest text-[var(--s2-eyebrow)] uppercase block font-semibold">
                [ 02 / PERSONALIZATION LAYER ]
              </span>
              <h2 className="text-[clamp(2.1rem,4.5vw,3.75rem)] font-extrabold tracking-tighter text-[var(--s2-title)] font-sans leading-[1.0] sm:leading-[0.95]">
                <span className="s2-title-line block">We understand</span>
                <span className="s2-title-line block">how you travel.</span>
              </h2>
              <p className="s2-desc text-[var(--s2-desc)] text-sm sm:text-base leading-relaxed font-sans">
                Your budget. Your interests. Your people. TravelFlow turns them into a journey designed around you.
              </p>

              <div className="s2-btn pt-2">
                <button
                  onClick={() => setIsPlannerOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase text-[var(--s2-btn-text)] hover:opacity-75 group border-b border-[var(--s2-btn-border)] pb-1 transition-all"
                >
                  <span>Configure Preferences</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Persona Cards: Floating Cloud Surfaces in Light Mode, Rich Brown in Dark Mode */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

              <div className="s2-card p-5 sm:p-6 rounded-2xl bg-[var(--s2-card-bg)] border border-[var(--s2-card-border)] flex flex-col justify-between space-y-3 shadow-[var(--s2-card-shadow)] backdrop-blur-md h-full transition-all">
                <div className="w-8 h-8 rounded-lg bg-[var(--s2-card-badge-bg)] text-[var(--s2-card-badge-text)] flex items-center justify-center font-bold text-xs font-mono">
                  01
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--s2-card-title)] font-sans">Couples & Romance</h4>
                  <p className="text-xs text-[var(--s2-card-desc)] leading-relaxed font-sans mt-1.5">
                    Sunset boat reservations, private lakeside suites, candlelit dining & relaxed late starts.
                  </p>
                </div>
              </div>

              <div className="s2-card p-5 sm:p-6 rounded-2xl bg-[var(--s2-card-bg)] border border-[var(--s2-card-border)] flex flex-col justify-between space-y-3 shadow-[var(--s2-card-shadow)] backdrop-blur-md h-full transition-all">
                <div className="w-8 h-8 rounded-lg bg-[var(--s2-card-badge-bg)] text-[var(--s2-card-badge-text)] flex items-center justify-center font-bold text-xs font-mono">
                  02
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--s2-card-title)] font-sans">Family & Seniors</h4>
                  <p className="text-xs text-[var(--s2-card-desc)] leading-relaxed font-sans mt-1.5">
                    Step-free monument access, scheduled afternoon rest buffers, and nearby pediatric medical safety.
                  </p>
                </div>
              </div>

              <div className="s2-card p-5 sm:p-6 rounded-2xl bg-[var(--s2-card-bg)] border border-[var(--s2-card-border)] flex flex-col justify-between space-y-3 shadow-[var(--s2-card-shadow)] backdrop-blur-md h-full transition-all">
                <div className="w-8 h-8 rounded-lg bg-[var(--s2-card-badge-bg)] text-[var(--s2-card-badge-text)] flex items-center justify-center font-bold text-xs font-mono">
                  03
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--s2-card-title)] font-sans">Smart Budget Optimizer</h4>
                  <p className="text-xs text-[var(--s2-card-desc)] leading-relaxed font-sans mt-1.5">
                    Itemized breakdowns across travel, hotels, dining, and activities with instant trade-off balancing.
                  </p>
                </div>
              </div>

              <div className="s2-card p-5 sm:p-6 rounded-2xl bg-[var(--s2-card-bg)] border border-[var(--s2-card-border)] flex flex-col justify-between space-y-3 shadow-[var(--s2-card-shadow)] backdrop-blur-md h-full transition-all">
                <div className="w-8 h-8 rounded-lg bg-[var(--s2-card-badge-bg)] text-[var(--s2-card-badge-text)] flex items-center justify-center font-bold text-xs font-mono">
                  04
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--s2-card-title)] font-sans">Collaborative Group Sync</h4>
                  <p className="text-xs text-[var(--s2-card-desc)] leading-relaxed font-sans mt-1.5">
                    Balanced itinerary voting, automated expense splitting, and customized multi-group transit coordination.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. DEEP DIVE: "WE ADAPT AS YOU TRAVEL" (HERO USP) */}
      {/* ============================================================ */}
      <section id="adaptation" className="relative z-10 py-16 sm:py-24 lg:py-32 border-t border-[var(--s3-border)] bg-[var(--s3-bg)] text-[var(--page-text)] overflow-hidden transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <span className="s3-eyebrow text-xs font-mono tracking-widest text-[var(--s3-eyebrow)] uppercase block font-semibold">
                [ 03 / REAL-TIME MANAGEMENT ]
              </span>
              <h2 className="text-[clamp(2.1rem,4.5vw,3.75rem)] font-extrabold tracking-tighter text-[var(--s3-title)] font-sans leading-[1.0] sm:leading-[0.95]">
                <span className="s3-title-line block">We adapt</span>
                <span className="s3-title-line block">as you travel.</span>
              </h2>
              <p className="s3-desc text-[var(--s3-desc)] text-sm sm:text-base leading-relaxed font-sans">
                When plans change, TravelFlow finds the next best way forward. Flight delays, weather downpours, traffic, or closed attractions are resolved automatically.
              </p>

              <div className="s3-btn pt-2">
                <button
                  onClick={() => {
                    setActiveView("liveTrip");
                    triggerDisruption();
                  }}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--s3-btn-bg)] text-[var(--s3-btn-text)] hover:bg-[var(--s3-btn-hover)] transition-all shadow-md flex items-center justify-center sm:justify-start gap-2 text-center"
                >
                  <Zap className="w-4 h-4 fill-current shrink-0" />
                  <span>Simulate Live Flight Delay & Auto-Recovery →</span>
                </button>
              </div>
            </div>

            {/* Disruption Cascade Card & Sequential Story Panel */}
            <div className="lg:col-span-7">
              <div className="s3-panel-container rounded-2xl bg-[var(--s3-panel-bg)] border border-[var(--s3-panel-border)] p-5 sm:p-7 md:p-8 space-y-5 sm:space-y-6 shadow-2xl backdrop-blur-md transition-all">

                <div className="flex items-center justify-between border-b border-[var(--s3-border)] pb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--s3-panel-title)] font-bold">
                    Telemetry: Flight Delay Auto-Recovery
                  </span>
                  <span className="text-[10px] font-mono bg-[var(--s3-panel-badge-bg)] text-[var(--s3-panel-badge-text)] px-2.5 py-0.5 rounded-full shrink-0 font-semibold">
                    Active Sentinel
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Event 1: The Disruption Event */}
                  <div className="s3-event p-3 sm:p-3.5 rounded-xl bg-[var(--s3-event1-bg)] border border-[var(--s3-event1-border)] text-[var(--s3-event1-text)] flex items-center gap-3 transition-colors">
                    <Plane className="w-4 h-4 text-current shrink-0" />
                    <span>Flight delayed by 3h (10:00 AM ➔ 01:00 PM)</span>
                  </div>

                  {/* Event 2: The Conflict */}
                  <div className="s3-event p-3 sm:p-3.5 rounded-xl bg-[var(--s3-event2-bg)] border border-[var(--s3-event2-border)] text-[var(--s3-event2-text)] flex items-center gap-3 transition-colors">
                    <Clock className="w-4 h-4 text-current shrink-0" />
                    <span>Hotel check-in & 3:30 PM City Palace slot conflicted</span>
                  </div>

                  {/* Event 3: AI Dynamic Decision */}
                  <div className="s3-event p-3 sm:p-3.5 rounded-xl bg-[var(--s3-event3-bg)] border border-[var(--s3-event3-border)] text-[var(--s3-event3-text)] flex items-center gap-3 transition-colors">
                    <Sparkles className="w-4 h-4 text-current shrink-0" />
                    <span>AI moves City Palace to Day 2 morning · Preserves romantic sunset dinner</span>
                  </div>

                  {/* Event 4: Recovery & Restored Health */}
                  <div className="s3-event p-3 sm:p-3.5 rounded-xl bg-[var(--s3-event4-bg)] border border-[var(--s3-event4-border)] text-[var(--s3-event4-text)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-current shrink-0" />
                      <span>Trip Health: 61/100 ➔ 84/100 Restored</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-[var(--s3-event4-badge-bg)] text-[var(--s3-event4-badge-text)] px-2.5 py-0.5 rounded self-start sm:self-auto">
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
      <section id="final-cta" className="relative z-10 py-16 sm:py-24 lg:py-32 border-t border-[var(--cta-border)] text-center bg-[var(--cta-bg)] overflow-hidden transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 space-y-6 sm:space-y-8">
          <span className="cta-eyebrow text-xs font-mono tracking-widest text-[var(--cta-eyebrow)] uppercase block font-semibold">
            WE DON'T JUST PLAN YOUR TRIP. WE MANAGE IT.
          </span>
          <h2 className="text-[clamp(2.1rem,4.8vw,3.75rem)] font-extrabold tracking-tighter text-[var(--cta-title)] font-sans leading-tight">
            <span className="cta-title-line block">Wherever you go,</span>
            <span className="cta-title-line block">we've got you.</span>
          </h2>
          <p className="cta-sub text-[var(--cta-sub)] text-sm sm:text-base max-w-md mx-auto font-mono">
            Plan. Personalize. Adapt.
          </p>

          <div className="cta-btn pt-2 sm:pt-4 flex items-center justify-center">
            <button
              onClick={() => setIsPlannerOpen(true)}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-[var(--cta-btn-bg)] text-[var(--cta-btn-text)] hover:bg-[var(--cta-btn-hover)] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>START THE JOURNEY →</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
