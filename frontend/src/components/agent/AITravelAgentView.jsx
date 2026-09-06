import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  ArrowUpRight,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  Check
} from "lucide-react";
import { useTravel } from "../../context/TravelContext";
import { BlurTextReveal } from "../ui/BlurTextReveal";

// Suggestion prompt pills matching the user's design
const MOCK_PROMPT_PILLS = [
  "Make it more romantic",
  "Reduce my budget to ₹30,000",
  "Remove Jodhpur",
  "Add one more day",
  "What if it rains?"
];

export const AITravelAgentView = () => {
  const {
    recommendations,
    expandOption,
    isThinking,
    isGeneratingRecs,
    thinkingStep,
    sendAgentMessage,
    activeWhatIf,
    tripData,
    startJourney
  } = useTravel();

  const [inputVal, setInputVal] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendAgentMessage(inputVal);
    setInputVal("");
  };

  const handlePresetClick = (promptText) => {
    sendAgentMessage(promptText);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-[var(--text-primary)] bg-[var(--agent-bg)] selection:bg-[var(--page-selection-bg)] selection:text-[var(--page-selection-text)] flex flex-col justify-between transition-colors duration-300">

      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col justify-start">

        {/* ============================================================ */}
        {/* 1. EDITORIAL HEADER (Serif Typography & Spacious Layout)    */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, filter: "blur(8px)", y: -8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[var(--accent)] dark:text-[#C9A86A] uppercase font-semibold block"
          >
            CURATED FOR YOU
          </motion.span>
          <BlurTextReveal
            text="Tell me how you want to travel."
            as="h1"
            animateBy="words"
            delay={0.12}
            stagger={0.06}
            className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-normal text-[var(--text-primary)] tracking-tight leading-[1.1]"
          />
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans"
          >
            A customized space for a {tripData.travelGroup || "Couple"} — {tripData.startingLocation || "Mumbai"} to {tripData.destination || "Rajasthan (Jaipur & Udaipur)"}
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* 2. MAIN CONTENT: Loading State OR 3 Recommendation Cards    */}
        {/* ============================================================ */}
        {isGeneratingRecs ? (

          /* -------------------------------------------------------- */
          /* AI CONCIERGE GENERATION STATE (Shown during form submit) */
          /* -------------------------------------------------------- */
          <div className="w-full max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

              {/* Shimmering Placeholder Card Outlines */}
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-4 sm:p-5 flex flex-col justify-between h-[480px] overflow-hidden relative shadow-lg"
                >
                  <div className="w-full h-48 rounded-2xl bg-[var(--border-soft)] animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--surface-soft)] to-transparent animate-drift-slow" />
                  </div>
                  <div className="space-y-3 py-4 flex-1">
                    <div className="h-6 w-3/4 rounded-lg bg-[var(--border-soft)] animate-pulse" />
                    <div className="h-4 w-1/2 rounded bg-[var(--border-soft)] animate-pulse" />
                  </div>
                  <div className="pt-4 border-t border-[var(--border-soft)] flex justify-between">
                    <div className="h-8 w-20 rounded bg-[var(--border-soft)] animate-pulse" />
                    <div className="h-8 w-24 rounded bg-[var(--border-soft)] animate-pulse" />
                  </div>
                  <div className="h-10 w-full rounded-xl bg-[var(--border-soft)] animate-pulse mt-4" />
                </div>
              ))}

              {/* Central Floating AI Concierge Intelligence Hub */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="max-w-md w-full p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] backdrop-blur-2xl shadow-2xl text-center space-y-5 animate-scale-up">

                  {/* Glowing Rotating AI Badge */}
                  <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-[var(--border)] animate-spin-slow" />
                    <div className="absolute inset-1 rounded-full border border-[var(--accent)]/40 border-t-transparent animate-spin" />
                    <div className="w-10 h-10 rounded-full bg-[var(--surface-soft)] flex items-center justify-center text-[var(--accent)] backdrop-blur-md shadow-inner border border-[var(--border)]">
                      <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--accent)] dark:text-[#C9A86A] uppercase font-bold block">
                      AI TRAVEL CONCIERGE
                    </span>
                    <h3 className="text-xl font-bold font-sans text-[var(--text-primary)]">
                      Curating Your Personalized Journeys
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] font-sans">
                      Calibrating pace, boutique stays, and transit for {tripData.travelGroup}
                    </p>
                  </div>

                  {/* Live Current Thinking Step */}
                  <div className="px-4 py-2.5 rounded-full bg-[var(--surface-soft)] border border-[var(--border)] flex items-center justify-center gap-2.5">
                    <RefreshCw className="w-3.5 h-3.5 text-[var(--accent)] animate-spin" />
                    <span className="text-xs font-mono text-[var(--text-primary)] font-medium">
                      {thinkingStep || "Analyzing your preferences..."}
                    </span>
                  </div>

                  {/* Dynamic Progress Indicator */}
                  <div className="w-full h-1 bg-[var(--border)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--text-primary)] rounded-full w-3/4 animate-pulse" />
                  </div>

                </div>
              </div>

            </div>
          </div>

        ) : (

          /* -------------------------------------------------------- */
          /* 3 RECOMMENDATION CARDS (Shown after loading completes)    */
          /* -------------------------------------------------------- */
          <div className="w-full max-w-6xl mx-auto mb-10 sm:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
              {recommendations.map((item, idx) => (
                <div key={item.id} className="relative flex flex-col items-center">
                  {/* Floating Card */}
                  <motion.div
                    onClick={() => expandOption(item.id)}
                    initial={{ opacity: 0, y: 50, filter: "blur(14px)" }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                      y: idx === 0 ? [-8, 8, -8] : idx === 1 ? [8, -8, 8] : [-7, 7, -7],
                      rotate: idx === 0 ? [-0.35, 0.35, -0.35] : idx === 1 ? [0.35, -0.35, 0.35] : [-0.3, 0.3, -0.3]
                    }}
                    transition={{
                      opacity: { duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] },
                      filter: { duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] },
                      y: {
                        repeat: Infinity,
                        duration: 5.2 + idx * 0.8,
                        ease: "easeInOut",
                        delay: idx * 0.3
                      },
                      rotate: {
                        repeat: Infinity,
                        duration: 5.8 + idx * 0.7,
                        ease: "easeInOut",
                        delay: idx * 0.3
                      }
                    }}
                    whileHover={{
                      y: -18,
                      scale: 1.03,
                      rotate: 0,
                      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className="w-full group cursor-pointer rounded-[24px] bg-[var(--agent-card-bg)] border border-[var(--agent-card-border)] hover:border-[var(--accent)] transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 sm:p-5 shadow-xl hover:shadow-2xl select-none will-change-[transform,filter]"
                  >
                    {/* Card Image with Badges */}
                    <div>
                      <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden mb-4 bg-[var(--surface-soft)]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 font-semibold">
                            {item.tag}
                          </span>
                          <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[var(--accent)]/40 text-[var(--accent)] dark:text-[#C9A86A]">
                            {item.aiMatch}% Match
                          </span>
                        </div>

                        {/* Bottom Image Tag */}
                        <div className="absolute bottom-3 left-3 pointer-events-none">
                          <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-white">
                            {item.theme}
                          </span>
                        </div>
                      </div>

                      {/* Title + Slanted Arrow */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-xl sm:text-2xl font-serif text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
                      </div>

                      {/* Route Subtitle */}
                      <p className="text-xs font-sans text-[var(--text-secondary)] mb-5">
                        {item.route}
                      </p>
                    </div>

                    {/* Duration & Investment + Action Button */}
                    <div>
                      <div className="flex items-center justify-between py-3 border-t border-[var(--border)] mb-4">
                        <div>
                          <span className="text-[9px] font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-0.5">
                            DURATION
                          </span>
                          <span className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-sans">
                            {item.duration}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[9px] font-mono tracking-widest uppercase text-[var(--text-muted)] block mb-0.5">
                            INVESTMENT
                          </span>
                          <span className="text-sm sm:text-base font-bold text-[var(--text-primary)] font-sans">
                            {item.price}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startJourney(item);
                          }}
                          className="w-full py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--surface)] hover:opacity-90 dark:bg-white dark:hover:bg-[#eae5d9] dark:text-[#181411] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02]"
                        >
                          <span>Start This Journey</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            expandOption(item.id);
                          }}
                          className="w-full py-2 rounded-xl bg-black/5 hover:bg-black/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.1] border border-[var(--border)] hover:border-[var(--accent)] text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Click to Unfold Journey</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)] dark:text-[#C9A86A]" />
                        </motion.button>
                      </div>
                    </div>

                  </motion.div>

                  {/* Ambient Ground Shadow */}
                  <motion.div
                    animate={{
                      scaleX: idx === 0 ? [0.88, 1.08, 0.88] : idx === 1 ? [1.08, 0.88, 1.08] : [0.9, 1.05, 0.9],
                      scaleY: idx === 0 ? [0.8, 1.2, 0.8] : idx === 1 ? [1.2, 0.8, 1.2] : [0.85, 1.15, 0.85],
                      opacity: idx === 0 ? [0.25, 0.45, 0.25] : idx === 1 ? [0.45, 0.25, 0.45] : [0.3, 0.4, 0.3]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5.2 + idx * 0.8,
                      ease: "easeInOut",
                      delay: idx * 0.3
                    }}
                    className="w-3/4 h-5 mt-2 rounded-full bg-black/20 dark:bg-black/90 blur-lg pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>

        )}

        {/* ============================================================ */}
        {/* 3. WHAT-IF SIMULATION CARD (If triggered)                    */}
        {/* ============================================================ */}
        {activeWhatIf && (
          <div className="w-full max-w-4xl mx-auto mb-6 animate-scale-up">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm font-sans">
                  <AlertCircle className="w-4 h-4 text-[var(--accent)] dark:text-[#e5dec9]" />
                  {activeWhatIf.title}
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                  Impact Analysis
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                {activeWhatIf.impactSummary}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono py-1">
                <div className="p-2.5 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)]">
                  <span className="text-[var(--text-muted)] block text-[10px]">Cost Delta</span>
                  <span className="text-[var(--text-primary)] font-semibold">{activeWhatIf.costChange}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--surface-soft)] border border-[var(--border)]">
                  <span className="text-[var(--text-muted)] block text-[10px]">Schedule Delta</span>
                  <span className="text-[var(--accent)] dark:text-[#e5dec9] font-semibold">{activeWhatIf.scheduleChange}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => activeWhatIf.onApply()}
                  className="px-5 py-2 rounded-full text-xs font-bold bg-[var(--text-primary)] text-[var(--surface)] dark:bg-white dark:text-[#181411] hover:opacity-90 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  {activeWhatIf.actionLabel || "Apply Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Chat Thinking Indicator */}
        {isThinking && !isGeneratingRecs && (
          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-[var(--surface)] border border-[var(--accent)] text-xs font-mono text-[var(--accent)] w-fit mx-auto mb-4 animate-fade-in shadow-lg">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--accent)]" />
            <span>{thinkingStep || "Refining journeys with AI..."}</span>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. BOTTOM CONSOLE: TRY ASKING + INPUT + FOOTER ROW          */}
        {/* ============================================================ */}
        <div className="w-full max-w-4xl mx-auto rounded-[24px] bg-[var(--agent-chat-bg)] border border-[var(--agent-chat-border)] p-6 sm:p-7 space-y-4 sm:space-y-5 shadow-2xl mt-4">

          {/* Row 1: Try Asking Suggestion Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono tracking-[0.2em] font-bold text-[var(--text-primary)] uppercase shrink-0 mr-1">
              TRY ASKING
            </span>
            {MOCK_PROMPT_PILLS.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetClick(pill)}
                className="px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/[0.04] dark:hover:bg-white/15 border border-[var(--border)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all font-sans cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Row 2: Prompt Input Field */}
          <form
            onSubmit={handleSend}
            className="relative flex items-center bg-[var(--surface-soft)] border border-[var(--border)] focus-within:border-[var(--accent)] rounded-2xl transition-all p-1.5"
          >
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Tell TravelFlow what you'd like to change..."
              className="w-full pl-5 pr-14 py-3 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isThinking}
              className="w-10 h-10 rounded-full bg-[var(--text-primary)] hover:opacity-90 disabled:opacity-30 text-[var(--surface)] dark:bg-[#f5f2eb] dark:hover:bg-white dark:text-[#181411] flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 shrink-0"
              aria-label="Send prompt"
            >
              <Send className="w-4 h-4 rotate-45 -translate-y-0.5" />
            </button>
          </form>

          {/* Row 3: Bottom Meta & Live Management CTA */}
          <div className="flex items-center justify-between text-xs font-sans text-[var(--text-secondary)] pt-1 flex-wrap gap-2">
            <span>TravelFlow AI actively tracks pricing, flight buffers & seasonal weather.</span>
            <button
              type="button"
              onClick={() => startJourney(recommendations[0])}
              className="text-[var(--text-primary)] hover:text-[var(--accent)] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Go to My Trips</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
