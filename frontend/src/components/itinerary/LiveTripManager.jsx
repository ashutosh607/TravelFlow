import React, { useState } from "react";
import { 
  Plane, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  HelpCircle, 
  Sparkles, 
  TrendingUp, 
  RotateCcw, 
  Download, 
  X,
  Zap
} from "lucide-react";
import { useTravel } from "../../context/TravelContext";

export const LiveTripManager = () => {
  const { 
    tripData, 
    currentItinerary, 
    disruptionState, 
    tripHealthScore, 
    disruptionData, 
    triggerDisruption, 
    applyDisruptionRecovery, 
    resetDisruption,
    showWhyExplanation,
    setShowWhyExplanation
  } = useTravel();

  const [activeTab, setActiveTab] = useState("itinerary");
  const [selectedDay, setSelectedDay] = useState(1);

  const isDisrupted = disruptionState === "detected";
  const isRecovered = disruptionState === "recovered";

  return (
    <div className="min-h-screen pt-20 pb-32 bg-[#181411] text-[#f5f2eb] selection:bg-[#f5f2eb] selection:text-[#181411]">
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 space-y-8">
        
        {/* ============================================================ */}
        {/* TOP COCKPIT BAR: TRIP HEALTH SCORE & REAL-TIME STATUS */}
        {/* ============================================================ */}
        <div className="rounded-3xl bg-[#1f1a15] border border-white/15 p-7 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Trip Identity & Live Monitoring Badge */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>
                <span className="text-xs font-mono tracking-widest uppercase text-[#a89f91] font-semibold">
                  LIVE TRIP TELEMETRY & MANAGEMENT
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans flex items-center gap-3">
                {tripData.destination}
                <span className="text-xs font-mono font-normal px-3 py-1 rounded-full bg-white/10 text-[#d8d2c8] border border-white/10">
                  {tripData.travelGroup} Pacing
                </span>
              </h1>
              
              <p className="text-xs font-mono text-[#a89f91]">
                Route: {tripData.startingLocation} ➔ {tripData.destination} · {tripData.days} Days · Active AI Sentinel
              </p>
            </div>

            {/* Dynamic Trip Health Gauge & Simulation Triggers */}
            <div className="flex flex-wrap items-center gap-4">
              
              {/* Trip Health Score Widget */}
              <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#14100d] border border-white/10 shadow-inner">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#a89f91] block">
                    Trip Health Score
                  </span>
                  <div className="flex items-center justify-end gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-white" />
                    <span className="text-xl font-mono font-bold text-white">
                      {tripHealthScore}/100
                    </span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#26201a] border border-white/20 flex items-center justify-center font-bold text-xs text-white">
                  {tripHealthScore >= 80 ? "OPTIMAL" : "RISK"}
                </div>
              </div>

              {/* Disruption Simulator Button */}
              {disruptionState === "none" && (
                <button
                  onClick={() => triggerDisruption()}
                  className="px-5 py-3 rounded-2xl font-bold text-xs bg-white text-[#181411] hover:bg-[#eae5d9] transition-all flex items-center gap-2 shadow-md uppercase tracking-wider"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Simulate Flight Delay (+3h)</span>
                </button>
              )}

              {disruptionState !== "none" && (
                <button
                  onClick={resetDisruption}
                  className="px-4 py-3 rounded-2xl text-xs font-mono text-[#a89f91] hover:text-white bg-[#14100d] border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* DISRUPTION ALERT BANNER */}
        {/* ============================================================ */}
        {isDisrupted && (
          <div className="rounded-3xl bg-[#2a1b18] border border-white/20 p-7 sm:p-8 backdrop-blur-xl animate-fade-in shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <AlertTriangle className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight font-sans">
                    {disruptionData.title}
                  </h3>
                  <p className="text-xs font-mono text-[#d8d2c8]">
                    {disruptionData.reason} · Original: {disruptionData.originalArrival} ➔ Delayed: {disruptionData.newArrival}
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white self-start sm:self-auto">
                Cascade Impact Detected
              </span>
            </div>

            {/* Cascade Impact Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#181411] border border-white/10 text-xs space-y-1">
                <span className="text-[10px] font-mono text-[#a89f91] uppercase">Impact 1: Transit</span>
                <p className="text-white font-medium">Airport cab shifted from 10:30 AM to 01:15 PM</p>
              </div>
              <div className="p-4 rounded-xl bg-[#181411] border border-white/10 text-xs space-y-1">
                <span className="text-[10px] font-mono text-[#a89f91] uppercase">Impact 2: Check-in</span>
                <p className="text-white font-medium">Hotel Haveli check-in pushed to 02:00 PM</p>
              </div>
              <div className="p-4 rounded-xl bg-[#181411] border border-white/10 text-xs space-y-1">
                <span className="text-[10px] font-mono text-[#a89f91] uppercase">Impact 3: Activity Conflict</span>
                <p className="text-[#e5dec9] font-medium">03:30 PM City Palace & Lunch slots missed</p>
              </div>
            </div>

            {/* AI Decision Notice */}
            <div className="p-4 rounded-xl bg-[#14100d] border border-white/10 text-xs text-[#d8d2c8] flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#e5dec9] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block mb-0.5 font-sans">
                  TravelFlow AI Adaptive Decision ({tripData.travelGroup} Context):
                </span>
                {disruptionData.travellerDecisionLogic[tripData.travelGroup] || disruptionData.travellerDecisionLogic["Couple"]}
              </div>
            </div>

            {/* AI Action CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs font-mono text-[#a89f91]">
                Trip Health dropped to {tripHealthScore}/100. AI recovery will restore it to 84/100.
              </span>

              <button
                onClick={applyDisruptionRecovery}
                className="w-full sm:w-auto px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Auto-Replan Itinerary Now →</span>
              </button>
            </div>
          </div>
        )}

        {/* AI RECOVERY SUCCESS BANNER */}
        {isRecovered && (
          <div className="rounded-3xl bg-[#1b261e] border border-white/20 p-7 sm:p-8 backdrop-blur-xl animate-fade-in shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight font-sans">
                    Itinerary Successfully Re-Optimized & Recovered
                  </h3>
                  <p className="text-xs font-mono text-[#d8d2c8]">
                    City Palace moved to Day 2 morning · Sunset at Hawa Mahal and Candlelight Dinner preserved
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowWhyExplanation(true)}
                className="px-5 py-2.5 rounded-full font-bold text-xs bg-white text-[#181411] hover:bg-[#eae5d9] flex items-center gap-2 transition-colors shadow-md"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Why did AI make this change?</span>
              </button>
            </div>
          </div>
        )}

        {/* EXPLAINABLE AI MODAL */}
        {showWhyExplanation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-xl bg-[#181411] border border-white/20 rounded-3xl p-7 sm:p-8 shadow-2xl space-y-6 text-[#f5f2eb]">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white font-bold text-base font-sans">
                  <Sparkles className="w-5 h-5 text-[#e5dec9]" />
                  Explainable AI Logic Breakdown
                </div>
                <button
                  onClick={() => setShowWhyExplanation(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#a89f91] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-[#d8d2c8]">
                <p className="p-4 rounded-xl bg-[#14100d] border border-white/10 text-[#f5f2eb] font-sans text-sm">
                  {disruptionData.aiRecoveryPlan.whyExplanation}
                </p>

                <div className="space-y-2 font-mono">
                  <span className="text-[11px] uppercase tracking-wider text-[#a89f91] block font-semibold">
                    Trade-Off Matrix:
                  </span>
                  {disruptionData.aiRecoveryPlan.modifications.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-[#14100d] border border-white/5 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">{m.action}: {m.activity}</span>
                        <span className="text-[#a89f91] block mt-0.5">{m.why}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowWhyExplanation(false)}
                className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] transition-colors"
              >
                Understood & Close
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TABS (ITINERARY / ALTERNATIVES / SAFETY / EXPENSES) */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 p-1 bg-[#1f1a15] rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab("itinerary")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "itinerary"
                  ? "bg-white text-[#181411] font-bold shadow-sm"
                  : "text-[#a89f91] hover:text-white"
              }`}
            >
              Day-Wise Itinerary
            </button>

            <button
              onClick={() => setActiveTab("alternatives")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "alternatives"
                  ? "bg-white text-[#181411] font-bold shadow-sm"
                  : "text-[#a89f91] hover:text-white"
              }`}
            >
              Alternative Finder
            </button>

            <button
              onClick={() => setActiveTab("safety")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "safety"
                  ? "bg-white text-[#181411] font-bold shadow-sm"
                  : "text-[#a89f91] hover:text-white"
              }`}
            >
              Safety & SOS Center
            </button>

            <button
              onClick={() => setActiveTab("expenses")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "expenses"
                  ? "bg-white text-[#181411] font-bold shadow-sm"
                  : "text-[#a89f91] hover:text-white"
              }`}
            >
              Expense Splitting
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert("Offline Trip Pack saved to your device cache! All vouchers, maps, and emergency contacts are available without internet.")}
              className="px-4 py-2 rounded-xl bg-[#1f1a15] hover:bg-[#26201a] border border-white/10 text-xs font-mono text-[#d8d2c8] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Offline Trip Mode</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: DAY-WISE ITINERARY */}
        {/* ============================================================ */}
        {activeTab === "itinerary" && (
          <div className="space-y-6">
            
            {/* Day Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
              {currentItinerary.map(dayPlan => (
                <button
                  key={dayPlan.day}
                  onClick={() => setSelectedDay(dayPlan.day)}
                  className={`px-5 py-3 rounded-2xl text-xs font-semibold shrink-0 transition-all border ${
                    selectedDay === dayPlan.day
                      ? "bg-white text-[#181411] border-white font-bold shadow-md"
                      : "bg-[#1f1a15] border-white/10 text-[#a89f91] hover:border-white/25"
                  }`}
                >
                  <span className={`block text-[10px] font-mono uppercase tracking-wider ${
                    selectedDay === dayPlan.day ? "text-[#55473a]" : "text-[#736a5e]"
                  }`}>
                    {dayPlan.date}
                  </span>
                  Day {dayPlan.day}: {dayPlan.city}
                </button>
              ))}
            </div>

            {/* Selected Day Timeline List */}
            {(() => {
              const currentDayPlan = currentItinerary.find(d => d.day === selectedDay) || currentItinerary[0];
              if (!currentDayPlan) return null;

              return (
                <div className="rounded-3xl bg-[#1f1a15] border border-white/10 p-7 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
                        DAY 0{currentDayPlan.day} — {currentDayPlan.city.toUpperCase()}
                      </h2>
                      <p className="text-xs text-[#a89f91] font-mono mt-0.5">
                        {currentDayPlan.summary}
                      </p>
                    </div>

                    <span className="text-xs font-mono text-[#f5f2eb] bg-white/10 border border-white/15 px-3 py-1 rounded-full self-start sm:self-auto">
                      {currentDayPlan.activities.length} Scheduled Stops
                    </span>
                  </div>

                  {/* Timeline Cards */}
                  <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10 before:z-0">
                    {currentDayPlan.activities.map((act, idx) => (
                      <div 
                        key={idx}
                        className={`relative z-10 pl-9 transition-all duration-300 p-4 rounded-2xl bg-[#14100d] border border-white/5 hover:border-white/15`}
                      >
                        <div className="absolute left-2.5 top-5 w-2.5 h-2.5 rounded-full ring-4 ring-[#1f1a15] bg-white" />

                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/15">
                                {act.time}
                              </span>
                              <h4 className="text-sm font-bold text-white font-sans">
                                {act.title}
                              </h4>
                              {act.status === "recovered" && (
                                <span className="text-[10px] font-mono font-bold text-[#e5dec9] bg-white/10 px-2 py-0.5 rounded">
                                  AI Rescheduled
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#a89f91] leading-relaxed font-sans pt-1">
                              {act.desc}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#a89f91] self-start">
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white">
                              {act.duration}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                              {act.transit}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white font-bold">
                              {act.cost}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                              {act.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })()}

          </div>
        )}

        {/* TAB 2: ALTERNATIVES */}
        {activeTab === "alternatives" && (
          <div className="rounded-3xl bg-[#1f1a15] border border-white/10 p-7 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white tracking-tight font-sans">
                AI Multi-Modal Alternative Finder
              </h2>
              <p className="text-xs text-[#a89f91] font-mono mt-0.5">
                Instant alternative routing during transit disruptions & schedule conflicts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {disruptionData.alternatives.map((alt, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 bg-[#14100d] ${
                    alt.recommended ? "border-white shadow-lg" : "border-white/10 text-[#d8d2c8]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/10">
                        {alt.type}
                      </span>
                      {alt.recommended && (
                        <span className="text-[10px] font-mono font-bold text-white bg-white/20 px-2 py-0.5 rounded">
                          AI Top Pick
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white font-sans">
                      {alt.mode}
                    </h4>

                    <div className="space-y-1 text-xs font-mono text-[#a89f91]">
                      <div>Depart: <span className="text-white">{alt.departure}</span></div>
                      <div>Arrive: <span className="text-white">{alt.arrival}</span></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-white">
                      {alt.fareDiff}
                    </span>
                    <button 
                      onClick={() => alert(`Selected ${alt.type}: TravelFlow confirmed reservation.`)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-[#181411] hover:bg-[#eae5d9]"
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SAFETY */}
        {activeTab === "safety" && (
          <div className="rounded-3xl bg-[#1f1a15] border border-white/10 p-7 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold text-white tracking-tight font-sans flex items-center gap-2">
                <Shield className="w-5 h-5 text-white" />
                Safety & Emergency Resource Center
              </h2>
              <p className="text-xs text-[#a89f91] font-mono mt-0.5">
                Local vetted hospitals, police stations, and 24/7 SOS for {tripData.destination}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#14100d] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">
                  Top Medical Centers
                </span>
                <div className="text-xs space-y-2 text-[#d8d2c8]">
                  <div>
                    <strong className="text-white">Fortis Escorts Hospital Jaipur</strong>
                    <p className="text-[#a89f91] text-[11px]">Jawaharlal Nehru Marg (12 mins)</p>
                  </div>
                  <div>
                    <strong className="text-white">Paras JK Hospital Udaipur</strong>
                    <p className="text-[#a89f91] text-[11px]">Shobhagpura (15 mins)</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#14100d] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">
                  Tourist Police
                </span>
                <div className="text-xs space-y-2 text-[#d8d2c8]">
                  <div>
                    <strong className="text-white">Jaipur Tourist Police</strong>
                    <p className="text-[#a89f91] text-[11px]">Helpline: 1363 / +91 141 220 1888</p>
                  </div>
                  <div>
                    <strong className="text-white">TravelFlow SOS Concierge</strong>
                    <p className="text-[#a89f91] text-[11px]">24/7 Dedicated Officer</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#14100d] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-white font-bold uppercase tracking-wider block">
                  Verified Stay Contacts
                </span>
                <div className="text-xs space-y-2 text-[#d8d2c8]">
                  <div>
                    <strong className="text-white">Alsisar Haveli Reception</strong>
                    <p className="text-[#a89f91] text-[11px]">+91 141 236 8290</p>
                  </div>
                  <div>
                    <strong className="text-white">Fateh Prakash Palace Desk</strong>
                    <p className="text-[#a89f91] text-[11px]">+91 294 252 8008</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXPENSES */}
        {activeTab === "expenses" && (
          <div className="rounded-3xl bg-[#1f1a15] border border-white/10 p-7 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight font-sans">
                  Group Expense Splitter ({tripData.travellers} Travellers)
                </h2>
                <p className="text-xs text-[#a89f91] font-mono mt-0.5">
                  Automated equal and custom division of flights, heritage stays, dining, and activities.
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-[#a89f91] block">Total Shared Bill</span>
                <span className="text-2xl font-bold text-white">₹37,000</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#14100d] border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white font-sans">Traveller 1 (Primary Organizer)</h4>
                <div className="space-y-1 text-xs text-[#d8d2c8] font-mono">
                  <div className="flex justify-between">
                    <span>Flights & Sedan:</span>
                    <span>₹7,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Haveli Stays (50%):</span>
                    <span>₹6,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dining & Activities:</span>
                    <span>₹5,000</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white">
                    <span>Total Share:</span>
                    <span>₹18,500</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#14100d] border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white font-sans">Traveller 2 (Partner / Guest)</h4>
                <div className="space-y-1 text-xs text-[#d8d2c8] font-mono">
                  <div className="flex justify-between">
                    <span>Flights & Sedan:</span>
                    <span>₹7,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Haveli Stays (50%):</span>
                    <span>₹6,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dining & Activities:</span>
                    <span>₹5,000</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white">
                    <span>Total Share:</span>
                    <span>₹18,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
