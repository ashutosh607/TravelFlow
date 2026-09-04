import React from "react";
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Wallet, 
  Compass, 
  Heart,
  Calendar
} from "lucide-react";
import { useTravel } from "../../context/TravelContext";

export const ExpandedRecommendationModal = () => {
  const { 
    isCardExpanded, 
    expandedOption, 
    collapseOption, 
    startJourney,
    sendAgentMessage 
  } = useTravel();

  if (!isCardExpanded || !expandedOption) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#181411] border border-white/20 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden my-auto flex flex-col max-h-[92vh] text-[#f5f2eb]">
        
        {/* Top Floating Close Button */}
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={collapseOption}
            className="w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all shadow-lg hover:scale-105"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto custom-scrollbar flex-1">
          
          {/* Large Hero Destination Image Banner */}
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <img
              src={expandedOption.image}
              alt={expandedOption.title}
              className="w-full h-full object-cover object-center animate-scale-up"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181411] via-[#181411]/40 to-transparent" />
            
            {/* Overlay Header Info */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#f5f2eb]">
                    {expandedOption.tag}
                  </span>
                  <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#26201a] backdrop-blur-md border border-white/20 text-[#e5dec9]">
                    {expandedOption.aiMatch}% AI Match
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md font-sans">
                  {expandedOption.title.toUpperCase()}
                </h1>
                <p className="text-sm font-mono text-[#d8d2c8] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e5dec9]" />
                  {expandedOption.route} · {expandedOption.duration}
                </p>
              </div>

              {/* Total Investment Stamp */}
              <div className="bg-[#14100d]/90 backdrop-blur-md border border-white/15 px-5 py-3 rounded-2xl sm:text-right">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#a89f91] block">
                  All-Inclusive Plan
                </span>
                <span className="text-2xl font-bold text-white tracking-tight">
                  {expandedOption.price}
                </span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Description / Summary */}
            <div className="p-5 rounded-2xl bg-[#1f1a15] border border-white/10 text-[#d8d2c8] text-sm leading-relaxed font-sans">
              {expandedOption.description}
            </div>

            {/* Itemized Budget Breakdown Section */}
            <div>
              <h3 className="text-xs font-mono tracking-widest uppercase text-[#a89f91] mb-4 flex items-center gap-2 font-bold">
                <Wallet className="w-3.5 h-3.5 text-[#e5dec9]" />
                Smart Budget Allocation
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-[#1f1a15] border border-white/10">
                  <span className="text-[11px] font-mono text-[#a89f91] block">Flights & Transit</span>
                  <span className="text-base font-bold text-white">
                    ₹{expandedOption.budgetBreakdown.travel.toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1f1a15] border border-white/10">
                  <span className="text-[11px] font-mono text-[#a89f91] block">Hotels & Stays</span>
                  <span className="text-base font-bold text-white">
                    ₹{expandedOption.budgetBreakdown.hotels.toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1f1a15] border border-white/10">
                  <span className="text-[11px] font-mono text-[#a89f91] block">Food & Dining</span>
                  <span className="text-base font-bold text-white">
                    ₹{expandedOption.budgetBreakdown.food.toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1f1a15] border border-white/10">
                  <span className="text-[11px] font-mono text-[#a89f91] block">Sightseeing & Tours</span>
                  <span className="text-base font-bold text-white">
                    ₹{expandedOption.budgetBreakdown.activities.toLocaleString()}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1f1a15] border border-white/10">
                  <span className="text-[11px] font-mono text-[#a89f91] block">Local Transfers</span>
                  <span className="text-base font-bold text-white">
                    ₹{expandedOption.budgetBreakdown.localTransport.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Curated Trip Inclusions */}
            <div>
              <h3 className="text-xs font-mono tracking-widest uppercase text-[#a89f91] mb-4 flex items-center gap-2 font-bold">
                <Compass className="w-3.5 h-3.5 text-[#e5dec9]" />
                Curated Experience Inclusions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expandedOption.highlights.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#1f1a15] border border-white/10 space-y-1">
                    <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">
                      {item.title}
                    </span>
                    <p className="text-xs text-[#b8afa3] leading-relaxed font-sans">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick AI Refine Prompts inside modal */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-[#a89f91] uppercase tracking-wider block mb-3 font-semibold">
                Live AI Tweaks for this journey:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => sendAgentMessage("Make this trip more romantic")}
                  className="px-3.5 py-1.5 rounded-lg bg-[#241e19] hover:bg-[#2e2620] border border-white/15 text-[#f5f2eb] text-xs transition-all flex items-center gap-1.5 font-sans"
                >
                  <Heart className="w-3 h-3" />
                  Make more romantic
                </button>

                <button
                  onClick={() => sendAgentMessage("Reduce my budget to ₹30,000")}
                  className="px-3.5 py-1.5 rounded-lg bg-[#241e19] hover:bg-[#2e2620] border border-white/15 text-[#f5f2eb] text-xs transition-all flex items-center gap-1.5 font-sans"
                >
                  <Wallet className="w-3 h-3" />
                  Reduce budget to ₹30,000
                </button>

                <button
                  onClick={() => sendAgentMessage("Add one more day")}
                  className="px-3.5 py-1.5 rounded-lg bg-[#241e19] hover:bg-[#2e2620] border border-white/15 text-[#f5f2eb] text-xs transition-all flex items-center gap-1.5 font-sans"
                >
                  <Calendar className="w-3 h-3" />
                  Add one more day
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-6 border-t border-white/15 bg-[#14100d] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={collapseOption}
            className="text-xs font-medium text-[#a89f91] hover:text-white transition-colors"
          >
            ← Back to all 3 possibilities
          </button>

          <button
            onClick={startJourney}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <span>START THE JOURNEY →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
