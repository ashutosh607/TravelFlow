import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  ArrowUpRight, 
  Heart, 
  Compass, 
  Wallet, 
  RefreshCw, 
  ArrowRight,
  Plane,
  AlertCircle,
  Check
} from "lucide-react";
import { useTravel } from "../../context/TravelContext";
import { ExpandedRecommendationModal } from "./ExpandedRecommendationModal";
import { MOCK_CHAT_PROMPTS } from "../../data/mockTravelData";

// Import sky/cloud assets
import skyBg from "../../assets/skyImage - Copy.webp";
import cloudsBg from "../../assets/cloudsImage - Copy.webp";

export const AITravelAgentView = () => {
  const { 
    recommendations, 
    expandOption, 
    chatMessages, 
    isThinking, 
    thinkingStep, 
    sendAgentMessage,
    activeWhatIf,
    tripData,
    startJourney 
  } = useTravel();

  const [inputVal, setInputVal] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isThinking]);

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
    <div className="relative min-h-screen pt-20 pb-36 text-[#f5f2eb] bg-[#181411] overflow-hidden flex flex-col justify-between selection:bg-[#f5f2eb] selection:text-[#181411]">
      
      {/* ============================================================ */}
      {/* SKY + CLOUDS CINEMATIC ATMOSPHERE BACKGROUND */}
      {/* ============================================================ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105"
          style={{ backgroundImage: `url(${skyBg})` }}
        />
        
        <div 
          className="absolute inset-0 bg-repeat-x bg-bottom opacity-25 animate-drift-slow pointer-events-none"
          style={{ 
            backgroundImage: `url(${cloudsBg})`,
            backgroundSize: "cover" 
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#181411]/80 via-[#181411]/60 to-[#181411]/95" />
      </div>

      {/* Expanded Journey Modal overlay */}
      <ExpandedRecommendationModal />

      {/* ============================================================ */}
      {/* TOP HEADER: BRAND & CONTEXT */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-8 pb-4 space-y-3">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#26201a] border border-white/15 backdrop-blur-md shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#e5dec9]" />
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-[#e5dec9]">
            TravelFlow AI
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
          Tell me how you want to travel.
        </h1>
        
        <p className="text-xs sm:text-sm text-[#a89f91] max-w-xl mx-auto font-mono">
          Customized space for {tripData.travelGroup} · {tripData.startingLocation} ➔ {tripData.destination}
        </p>
      </div>

      {/* ============================================================ */}
      {/* 3 FLOATING RECOMMENDATION CARDS IN THE SKY */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 my-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((item, index) => {
            const floatClass = index === 0 ? "animate-float-1" : index === 1 ? "animate-float-2" : "animate-float-3";

            return (
              <div
                key={item.id}
                onClick={() => expandOption(item.id)}
                className={`group cursor-pointer rounded-2xl bg-[#1f1a15]/90 backdrop-blur-xl border border-white/15 hover:border-white/40 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden ${floatClass}`}
              >
                {/* Destination Image Preview */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f1a15] via-[#1f1a15]/40 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#f5f2eb] font-semibold">
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-[#181411]/90 backdrop-blur-md border border-white/20 text-[#f5f2eb]">
                      {item.aiMatch}% Match
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-md backdrop-blur-md border border-white/15 bg-[#181411]/80 text-[#e5dec9]">
                      {item.theme}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#e5dec9] transition-colors flex items-center justify-between font-sans">
                      {item.title}
                      <ArrowUpRight className="w-4 h-4 text-[#a89f91] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </h3>
                    <p className="text-xs text-[#a89f91] font-mono mt-1">
                      {item.route}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#a89f91] block font-mono">
                        Duration
                      </span>
                      <span className="text-xs font-semibold text-[#f5f2eb]">
                        {item.duration}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-[#a89f91] block font-mono">
                        Investment
                      </span>
                      <span className="text-base font-bold text-white">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button className="w-full py-2 rounded-xl bg-white/5 group-hover:bg-white/15 border border-white/10 text-xs font-semibold text-[#f5f2eb] transition-all flex items-center justify-center gap-1.5">
                      <span>Click to Unfold Journey</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* WHAT-IF SIMULATION CARD */}
      {/* ============================================================ */}
      {activeWhatIf && (
        <div className="relative z-20 max-w-2xl mx-auto px-4 w-full my-4 animate-scale-up">
          <div className="p-6 rounded-2xl bg-[#1f1a15] border border-white/20 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm font-sans">
                <AlertCircle className="w-4 h-4 text-[#e5dec9]" />
                {activeWhatIf.title}
              </div>
              <span className="text-[10px] font-mono text-[#a89f91] uppercase">
                Impact Analysis
              </span>
            </div>

            <p className="text-xs text-[#d8d2c8] leading-relaxed font-sans">
              {activeWhatIf.impactSummary}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono py-1">
              <div className="p-2.5 rounded-lg bg-[#14100d] border border-white/5">
                <span className="text-[#a89f91] block text-[10px]">Cost Delta</span>
                <span className="text-white font-semibold">{activeWhatIf.costChange}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#14100d] border border-white/5">
                <span className="text-[#a89f91] block text-[10px]">Schedule Delta</span>
                <span className="text-[#e5dec9] font-semibold">{activeWhatIf.scheduleChange}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => activeWhatIf.onApply()}
                className="px-5 py-2 rounded-full text-xs font-bold bg-white text-[#181411] hover:bg-[#eae5d9] transition-all shadow-md flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                {activeWhatIf.actionLabel || "Apply Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* AI THINKING ANIMATION BAR */}
      {/* ============================================================ */}
      {isThinking && (
        <div className="relative z-20 max-w-md mx-auto px-4 my-2 animate-fade-in">
          <div className="px-4 py-2.5 rounded-full bg-[#1f1a15] border border-white/20 backdrop-blur-xl shadow-lg flex items-center justify-center gap-3">
            <RefreshCw className="w-4 h-4 text-white animate-spin" />
            <span className="text-xs font-mono text-[#f5f2eb] font-medium tracking-wide">
              {thinkingStep || "Thinking..."}
            </span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* CHATGPT-INSPIRED FLOATING BOTTOM AI INPUT BAR */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#181411] via-[#181411]/90 to-transparent pt-6 pb-6 px-4">
        <div className="max-w-3xl mx-auto space-y-3">
          
          {/* Quick Example Prompt Pills */}
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 text-xs">
            <span className="text-[10px] font-mono text-[#a89f91] uppercase tracking-wider shrink-0 mr-1">
              Try asking:
            </span>
            {MOCK_CHAT_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetClick(p.text)}
                className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#1f1a15] hover:bg-[#26201a] border border-white/10 hover:border-white/30 text-[#d8d2c8] hover:text-white text-xs backdrop-blur-md transition-all font-sans"
              >
                “{p.text}”
              </button>
            ))}
          </div>

          {/* ChatGPT-Style Input Container */}
          <form
            onSubmit={handleSend}
            className="relative flex items-center bg-[#1f1a15] border border-white/20 hover:border-white/40 focus-within:border-white focus-within:ring-1 focus-within:ring-white/20 rounded-2xl shadow-2xl backdrop-blur-xl transition-all"
          >
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Tell TravelFlow what you'd like to change..."
              className="w-full pl-5 pr-14 py-4 bg-transparent text-white text-sm placeholder:text-[#736a5e] focus:outline-none font-sans"
            />

            <button
              type="submit"
              disabled={!inputVal.trim() || isThinking}
              className="absolute right-2.5 p-2.5 rounded-xl bg-white text-[#181411] hover:bg-[#eae5d9] font-bold disabled:opacity-40 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Micro Footer Note */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#a89f91] px-2">
            <span>TravelFlow AI actively tracks pricing, flight buffers & seasonal weather.</span>
            <button
              onClick={startJourney}
              className="text-white hover:text-[#e5dec9] font-semibold underline underline-offset-4 flex items-center gap-1"
            >
              Start Trip Management Flow →
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
