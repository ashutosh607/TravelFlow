import React, { useState, useRef, useEffect } from "react";
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
  Zap,
  ArrowLeft,
  ArrowRight,
  Send,
  MessageSquare,
  Calendar,
  ChevronRight,
  Compass,
  Camera,
  Utensils,
  Heart,
  Plus,
  ArrowUpRight,
  Eye,
  RefreshCw,
  User
} from "lucide-react";
import { useTravel } from "../../context/TravelContext";

// Authentic destination photography database per day
const DAY_MEDIA_CONFIG = {
  1: {
    hero: "/destinations/amber_fort.jpg",
    heroTitle: "Amber Fort & Maota Lake Panorama",
    heroTag: "DAY 1 HIGHLIGHT",
    features: [
      {
        title: "Hawa Mahal (Palace of Winds)",
        tag: "MUST VISIT · 06:30 PM",
        image: "/destinations/hawa_mahal.jpg",
        caption: "953 latticed honeycomb jharokhas bathed in warm afternoon terracotta hues."
      },
      {
        title: "Peacock Gate (Mayur Pol)",
        tag: "CITY PALACE · 03:30 PM",
        image: "/destinations/peacock_gate.jpg",
        caption: "Stunning glass mosaic courtyard inside Pritam Niwas Chowk."
      },
      {
        title: "Heritage Haveli Stay",
        tag: "AUTHENTIC STAY",
        image: "/destinations/heritage_haveli.jpg",
        caption: "Courtyard fountain, scalloped arches, and candlelit sitar music under the stars."
      }
    ]
  },
  2: {
    hero: "/destinations/amber_ramparts.jpg",
    heroTitle: "Amber Fort Ramparts & Bastions",
    heroTag: "DAY 2 HIGHLIGHT",
    features: [
      {
        title: "Sheesh Mahal (Hall of Mirrors)",
        tag: "ROYAL ARCHITECTURE · 10:30 AM",
        image: "/destinations/sheesh_mahal.jpg",
        caption: "Intricate convex mirror inlays reflecting candlelight into thousands of stars."
      },
      {
        title: "Panna Meena ka Kund",
        tag: "GEOMETRIC STEPWELL · 02:00 PM",
        image: "/destinations/panna_meena.jpg",
        caption: "Symmetrical 16th-century ochre stairwell offering mesmerizing photography angles."
      },
      {
        title: "Nahargarh Fort Sunset Viewpoint",
        tag: "GOLDEN HOUR · 06:30 PM",
        image: "/destinations/nahargarh_sunset.jpg",
        caption: "Sweeping panoramic vistas over the Pink City as the streetlights begin to twinkle."
      }
    ]
  },
  3: {
    hero: "/destinations/lake_pichola_ghat.jpg",
    heroTitle: "Gangaur Ghat & Bagore Ki Haveli",
    heroTag: "DAY 3 HIGHLIGHT",
    features: [
      {
        title: "Taj Lake Palace",
        tag: "ISLAND PALACE STAY",
        image: "/destinations/lake_palace_udaipur.jpg",
        caption: "Floating white marble palace glowing above the tranquil waters of Lake Pichola."
      },
      {
        title: "Bagore Ki Haveli Cultural Stroll",
        tag: "HERITAGE WALK · 04:30 PM",
        image: "/destinations/lake_pichola_ghat.jpg",
        caption: "Serene waterfront ghats, temple chimes, and traditional evening folk dance performances."
      }
    ]
  },
  4: {
    hero: "/destinations/lake_pichola_boat.jpg",
    heroTitle: "Lake Pichola Sunset Boat Cruise & City Palace",
    heroTag: "DAY 4 HIGHLIGHT",
    features: [
      {
        title: "Jag Mandir Island Palace",
        tag: "LAKESIDE SANCTUARY · 04:30 PM",
        image: "/destinations/jag_mandir.jpg",
        caption: "Grand marble elephant pavilions and lakeside gardens with Aravalli mountain views."
      },
      {
        title: "Udaipur City Palace Illumination",
        tag: "EVENING PANORAMA · 07:30 PM",
        image: "/destinations/lake_pichola_boat.jpg",
        caption: "The grandest palace facade in Rajasthan lit up in golden splendor above the water."
      }
    ]
  },
  5: {
    hero: "/destinations/sajjangarh_monsoon.jpg",
    heroTitle: "Sajjangarh Monsoon Palace on Aravalli Heights",
    heroTag: "DAY 5 HIGHLIGHT",
    features: [
      {
        title: "Monsoon Palace Hilltop Overlook",
        tag: "360° PANORAMA · 11:00 AM",
        image: "/destinations/sajjangarh_monsoon.jpg",
        caption: "Hilltop white marble castle overlooking all five lakes of Udaipur and the sunset valleys."
      },
      {
        title: "Royal Thali & Artisan Souvenirs",
        tag: "DEPARTURE MEMORY",
        image: "/destinations/heritage_haveli.jpg",
        caption: "Savor authentic Rajasthani dal baati churma and explore Pichwai painting galleries."
      }
    ]
  }
};

// Preset AI chat prompt pills
const CHAT_PROMPT_PILLS = [
  "✨ Add sunset rooftop dinner on Day 2",
  "🚤 Add sunset boat cruise on Day 3",
  "🎒 What should we pack for Rajasthan?",
  "👑 Upgrade hotel to Lake Palace Suite"
];

export const LiveTripManager = () => {
  const { 
    savedTrips,
    activeTripId,
    selectTrip,
    backToMyTrips,
    sendTripChatMessage,
    isTripChatThinking,
    setIsPlannerOpen,
    disruptionState, 
    tripHealthScore, 
    disruptionData, 
    triggerDisruption, 
    applyDisruptionRecovery, 
    resetDisruption,
    showWhyExplanation,
    setShowWhyExplanation
  } = useTravel();

  // Find currently active trip if one is selected
  const activeTrip = savedTrips.find(t => t.id === activeTripId) || savedTrips[0];

  // Local state for trip detail view
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeTab, setActiveTab] = useState("itinerary"); // 'itinerary' | 'alternatives' | 'safety'
  const [chatInput, setChatInput] = useState("");
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(true); // for mobile toggle
  const chatMessagesEndRef = useRef(null);

  // Scroll to bottom of chat when new message arrives
  useEffect(() => {
    if (activeTrip?.chatMessages?.length && chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTrip?.chatMessages?.length, isTripChatThinking]);

  // Handle sending chat message to AI Concierge
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeTrip) return;
    sendTripChatMessage(activeTrip.id, chatInput);
    setChatInput("");
  };

  const isDisrupted = disruptionState === "detected";
  const isRecovered = disruptionState === "recovered";

  // Current day itinerary for the selected trip
  const dayPlanList = activeTrip?.dayWisePlan || [];
  const currentDayPlan = dayPlanList.find(d => d.day === selectedDay) || dayPlanList[0] || { activities: [] };
  const currentMedia = DAY_MEDIA_CONFIG[selectedDay] || DAY_MEDIA_CONFIG[1];

  // =========================================================================
  // VIEW 1: MY TRIPS HUB (Horizontal Cards List - activeTripId === null)
  // =========================================================================
  if (!activeTripId) {
    return (
      <div className="min-h-screen pt-28 pb-32 bg-[#181411] text-[#f5f2eb] selection:bg-[#f5f2eb] selection:text-[#181411]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e5dec9] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#a89f91] uppercase font-semibold">
                  MY CURATED JOURNEYS · TRAVELFLOW
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
                My Trips
              </h1>

              <p className="text-xs sm:text-sm text-[#a89f91] font-sans">
                Manage your active itineraries, inspect real-time AI Sentinel tracking, and converse with your personal 24/7 travel concierge.
              </p>
            </div>

            {/* Plan Another Trip CTA */}
            <button
              onClick={() => setIsPlannerOpen(true)}
              className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Plan Another Trip</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#14100d] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-[#736a5e] uppercase tracking-wider block">Total Journeys</span>
              <span className="text-2xl font-bold font-serif text-white">{savedTrips.length}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#14100d] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-[#736a5e] uppercase tracking-wider block">AI Sentinel Status</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 pt-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active & Protecting
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-[#14100d] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-[#736a5e] uppercase tracking-wider block">Trip Health Score</span>
              <span className="text-2xl font-bold font-mono text-[#e5dec9]">94<span className="text-xs text-[#a89f91]">/100</span></span>
            </div>
            <div className="p-4 rounded-2xl bg-[#14100d] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-[#736a5e] uppercase tracking-wider block">Concierge AI</span>
              <span className="text-xs font-bold text-white flex items-center gap-1.5 pt-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#e5dec9]" />
                Gemini Ready
              </span>
            </div>
          </div>

          {/* Horizontal Trips List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-[#d8d2c8] font-bold">
                Saved & Active Itineraries ({savedTrips.length})
              </h2>
              <span className="text-xs text-[#736a5e] font-sans">
                Click any trip to explore rich details and chat with AI
              </span>
            </div>

            {savedTrips.length === 0 ? (
              <div className="text-center py-20 rounded-3xl bg-[#14100d] border border-white/10 space-y-4">
                <Sparkles className="w-8 h-8 text-[#a89f91] mx-auto" />
                <h3 className="text-lg font-serif text-white">No trips saved yet</h3>
                <p className="text-xs text-[#a89f91] max-w-sm mx-auto">
                  Fill our AI travel planner to generate curated trips and start your adventure.
                </p>
                <button
                  onClick={() => setIsPlannerOpen(true)}
                  className="px-6 py-3 rounded-full bg-white text-[#181411] text-xs font-bold uppercase tracking-wider hover:bg-[#eae5d9]"
                >
                  Start Planning Now
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {savedTrips.map((trip) => {
                  const lastMessage = trip.chatMessages?.[trip.chatMessages.length - 1];
                  
                  return (
                    <div
                      key={trip.id}
                      onClick={() => selectTrip(trip.id)}
                      className="group cursor-pointer rounded-3xl bg-[#1a1512] hover:bg-[#1f1a15] border border-white/10 hover:border-white/30 transition-all duration-300 p-5 sm:p-6 shadow-2xl flex flex-col lg:flex-row gap-6 items-stretch hover:-translate-y-1 select-none"
                    >
                      {/* Left: Thumbnail Image */}
                      <div className="relative w-full lg:w-80 h-52 lg:h-auto rounded-2xl overflow-hidden shrink-0 bg-[#14100d]">
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Status Badges on Image */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            {trip.status || "Active"}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                          <span className="font-mono text-[10px] bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                            {trip.duration} · {trip.travelGroup || "Couple"}
                          </span>
                          <span className="font-mono text-[10px] text-[#e5dec9] font-bold">
                            {trip.aiMatch || 94}% AI Match
                          </span>
                        </div>
                      </div>

                      {/* Middle: Content & Metadata */}
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#a89f91] font-semibold">
                              {trip.badge || "Curated Journey"}
                            </span>
                            <span className="text-xs font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/10">
                              {trip.price}
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#e5dec9] transition-colors leading-snug">
                            {trip.title}
                          </h3>

                          <p className="text-xs font-sans text-[#a89f91] flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#e5dec9] shrink-0" />
                            <span>{trip.route}</span>
                          </p>

                          <p className="text-xs text-[#d8d2c8] line-clamp-2 leading-relaxed pt-1">
                            {trip.description}
                          </p>
                        </div>

                        {/* Highlight Tag Pills */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {trip.tags?.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[#a89f91]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Latest AI Concierge Message Snippet */}
                        {lastMessage && (
                          <div className="p-3 rounded-xl bg-[#14100d]/80 border border-white/5 flex items-start gap-2.5 text-xs text-[#d8d2c8]">
                            <Sparkles className="w-3.5 h-3.5 text-[#e5dec9] shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <span className="font-mono text-[10px] uppercase text-[#a89f91] block">
                                Latest AI Update · {lastMessage.timestamp}
                              </span>
                              <p className="line-clamp-1 text-[11px] text-[#f5f2eb]">
                                {lastMessage.text.replace(/\*\*/g, "")}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right: CTA & Health */}
                      <div className="lg:w-60 shrink-0 flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6 gap-4">
                        <div className="text-left lg:text-right space-y-1">
                          <span className="text-[10px] font-mono uppercase text-[#736a5e] block">
                            Trip Telemetry
                          </span>
                          <span className="text-sm font-bold font-mono text-white flex items-center lg:justify-end gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                            {trip.healthScore || 94}/100 Optimal
                          </span>
                        </div>

                        <button
                          type="button"
                          className="px-5 py-3 rounded-xl bg-white text-[#181411] hover:bg-[#eae5d9] text-xs font-bold transition-all flex items-center gap-2 shadow-md group-hover:scale-105 cursor-pointer shrink-0"
                        >
                          <span>Open Details & Chat</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE TRIP DETAIL + GEMINI AI CONCIERGE CHAT
  // =========================================================================
  return (
    <div className="min-h-screen pt-24 pb-32 bg-[#181411] text-[#f5f2eb] selection:bg-[#f5f2eb] selection:text-[#181411]">
      
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 bg-[#181411]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to All Trips Button */}
          <button
            onClick={backToMyTrips}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer border border-white/15"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Trips</span>
          </button>

          {/* Center Trip Title & Route */}
          <div className="hidden sm:flex flex-col items-center text-center">
            <h2 className="text-base font-serif text-white font-bold leading-tight">
              {activeTrip.title}
            </h2>
            <span className="text-[11px] font-mono text-[#a89f91]">
              {activeTrip.route} · {activeTrip.duration}
            </span>
          </div>

          {/* Right Action: AI Chat Toggle (Mobile) + Telemetry Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsChatPanelOpen(!isChatPanelOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs font-mono text-white border border-white/15"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e5dec9]" />
              <span>{isChatPanelOpen ? "Hide Chat" : "AI Concierge"}</span>
            </button>

            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Sentinel Active
            </span>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Cockpit Status Bar with Flight Disruption Simulator */}
        <div className="rounded-3xl bg-[#1f1a15] border border-white/15 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#a89f91] font-semibold">
                  TRIP TELEMETRY & LIVE MONITORING
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/10">
                  {activeTrip.travelGroup || "Couple"} Pacing
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif text-white">
                {activeTrip.title}
              </h1>
              <p className="text-xs font-mono text-[#a89f91]">
                {activeTrip.route} · Total Investment: <span className="text-white font-bold">{activeTrip.price}</span>
              </p>
            </div>

            {/* Health Score & Simulation Button */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#14100d] border border-white/10">
                <div className="text-right">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#736a5e] block">Trip Health</span>
                  <span className="text-lg font-mono font-bold text-white">{tripHealthScore}/100</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#26201a] border border-white/20 flex items-center justify-center font-bold text-xs text-white">
                  {tripHealthScore >= 80 ? "OPTIMAL" : "RISK"}
                </div>
              </div>

              {disruptionState === "none" && (
                <button
                  onClick={() => triggerDisruption()}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-[#181411] hover:bg-[#eae5d9] transition-all flex items-center gap-2 shadow-md uppercase tracking-wider cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Simulate Delay (+3h)</span>
                </button>
              )}

              {disruptionState !== "none" && (
                <button
                  onClick={resetDisruption}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono text-[#a89f91] hover:text-white bg-[#14100d] border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Disruption Alert Banner */}
        {isDisrupted && (
          <div className="rounded-3xl bg-[#2a1b18] border border-white/20 p-6 backdrop-blur-xl animate-fade-in shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-sans">{disruptionData.title}</h3>
                  <p className="text-xs font-mono text-[#d8d2c8]">
                    {disruptionData.reason} · Original: {disruptionData.originalArrival} ➔ Delayed: {disruptionData.newArrival}
                  </p>
                </div>
              </div>
              <button
                onClick={applyDisruptionRecovery}
                className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Replan Now →</span>
              </button>
            </div>
          </div>
        )}

        {/* Recovery Success Banner */}
        {isRecovered && (
          <div className="rounded-3xl bg-[#1b261e] border border-white/20 p-6 backdrop-blur-xl animate-fade-in shadow-xl flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Itinerary Successfully Re-Optimized</h3>
                <p className="text-xs font-mono text-[#d8d2c8]">City Palace shifted to Day 2 morning · Sunset at Hawa Mahal and dinner preserved</p>
              </div>
            </div>
            <button
              onClick={() => setShowWhyExplanation(true)}
              className="px-4 py-2 rounded-full font-bold text-xs bg-white text-[#181411] hover:bg-[#eae5d9] flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why this change?</span>
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* MAIN SPLIT WORKSPACE: 60% VISUAL ITINERARY + 40% GEMINI CHAT */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: RICH VISUAL ITINERARY (With Authentic Photos) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Day Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
              {dayPlanList.map(dp => (
                <button
                  key={dp.day}
                  onClick={() => setSelectedDay(dp.day)}
                  className={`px-5 py-3 rounded-2xl text-xs font-semibold shrink-0 transition-all border cursor-pointer ${
                    selectedDay === dp.day
                      ? "bg-white text-[#181411] border-white font-bold shadow-lg scale-[1.02]"
                      : "bg-[#1f1a15] border-white/10 text-[#a89f91] hover:border-white/30 hover:text-white"
                  }`}
                >
                  <div className="text-left">
                    <span className="text-[9px] font-mono uppercase tracking-wider block opacity-70">
                      Day {dp.day}
                    </span>
                    <span className="font-sans font-bold">
                      {dp.date || `Day ${dp.day}`} · {dp.city || "Rajasthan"}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Day Summary Callout */}
            <div className="p-4 rounded-2xl bg-[#14100d] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#a89f91] uppercase block">
                  DAY {selectedDay} OVERVIEW
                </span>
                <h3 className="text-lg font-serif text-white">
                  {currentDayPlan.summary || "Explore heritage landmarks and royal culture"}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#e5dec9] px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {currentDayPlan.activities?.length || 0} Scheduled Activities
              </span>
            </div>

            {/* Authentic Photographic Showcase for Selected Day */}
            {currentMedia && (
              <div className="space-y-4">
                
                {/* Hero Photo for this Day */}
                <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden bg-[#14100d] border border-white/10 shadow-xl group">
                  <img
                    src={currentMedia.hero}
                    alt={currentMedia.heroTitle}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-semibold">
                      {currentMedia.heroTag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-lg sm:text-xl font-serif text-white font-bold">
                      {currentMedia.heroTitle}
                    </h4>
                  </div>
                </div>

                {/* Sub-featured Landmarks Photos Grid */}
                {currentMedia.features && currentMedia.features.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentMedia.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-[#1a1512] border border-white/10 overflow-hidden shadow-md flex flex-col justify-between"
                      >
                        <div className="relative h-36 w-full overflow-hidden bg-[#14100d]">
                          <img
                            src={feat.image}
                            alt={feat.title}
                            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <span className="absolute top-2.5 left-2.5 text-[8px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-[#e5dec9] font-semibold">
                            {feat.tag}
                          </span>
                        </div>
                        <div className="p-3.5 space-y-1">
                          <h5 className="text-sm font-serif font-bold text-white">{feat.title}</h5>
                          <p className="text-[11px] text-[#a89f91] font-sans leading-relaxed">{feat.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* Timed Activity Schedule for Current Day */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#a89f91] font-bold block">
                DAY {selectedDay} CHRONOLOGICAL SCHEDULE
              </span>

              <div className="space-y-3">
                {currentDayPlan.activities?.map((act, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      act.isAiAdded
                        ? "bg-[#261f14] border-[#e5dec9]/40 shadow-lg"
                        : "bg-[#1a1512] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                            {act.time}
                          </span>
                          
                          {act.isAiAdded && (
                            <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#e5dec9] text-[#181411] flex items-center gap-1 shadow-sm">
                              <Sparkles className="w-2.5 h-2.5 fill-current" />
                              ADDED BY AI CONCIERGE
                            </span>
                          )}

                          <span className="text-[10px] font-mono text-[#a89f91]">
                            {act.transit} · {act.duration}
                          </span>
                        </div>

                        <h4 className="text-base font-serif font-bold text-white pt-0.5">
                          {act.title}
                        </h4>

                        <p className="text-xs text-[#d8d2c8] leading-relaxed">
                          {act.desc}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-white block">
                          {act.cost}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">
                          {act.availability || "Confirmed"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget & Highlight Cards */}
            <div className="p-5 rounded-2xl bg-[#14100d] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a89f91] font-semibold block">
                TRIP HIGHLIGHTS & AMENITIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {activeTrip.highlights?.map((h, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#1a1512] border border-white/5 space-y-0.5">
                    <span className="font-bold text-white font-sans block">{h.title}</span>
                    <span className="text-[#a89f91] text-[11px] leading-relaxed">{h.detail}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: GEMINI-STYLE AI CONCIERGE CHAT PANEL */}
          <div className={`lg:col-span-5 ${isChatPanelOpen ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-24 rounded-3xl bg-[#14100d] border border-white/20 p-5 sm:p-6 shadow-2xl flex flex-col h-[750px] justify-between">
              
              {/* Chat Header */}
              <div className="pb-4 border-b border-white/10 space-y-1.5 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                      <Sparkles className="w-4 h-4 text-[#e5dec9]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-sans font-bold text-white flex items-center gap-1.5">
                        <span>Gemini Concierge</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </h3>
                      <span className="text-[10px] font-mono text-[#a89f91] block">
                        Context: {activeTrip.title}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#d8d2c8]">
                    24/7 ACTIVE
                  </span>
                </div>

                <p className="text-[11px] text-[#736a5e] font-sans pt-1">
                  Ask to modify activities, adjust schedules, or request local dining. The AI dynamically updates your itinerary!
                </p>
              </div>

              {/* Scrollable Gemini Conversation Stream */}
              <div className="flex-1 overflow-y-auto custom-scrollbar my-4 pr-1 space-y-4">
                {activeTrip.chatMessages?.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                    >
                      <div className="flex items-center gap-1.5 px-1">
                        {isUser ? (
                          <span className="text-[9px] font-mono text-[#736a5e] uppercase">You · {msg.timestamp}</span>
                        ) : (
                          <span className="text-[9px] font-mono text-[#e5dec9] uppercase font-bold flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            AI Concierge · {msg.timestamp}
                          </span>
                        )}
                      </div>

                      <div
                        className={`p-3.5 sm:p-4 rounded-2xl text-xs leading-relaxed max-w-[92%] sm:max-w-[88%] whitespace-pre-wrap ${
                          isUser
                            ? "bg-white text-[#181411] font-sans font-medium rounded-tr-sm shadow-md"
                            : "bg-[#1f1a15] border border-white/15 text-[#f5f2eb] rounded-tl-sm shadow-inner"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {/* Thinking Indicator */}
                {isTripChatThinking && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#1c1713] border border-white/10 text-xs font-mono text-[#e5dec9] w-fit animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Gemini is adjusting your itinerary...</span>
                  </div>
                )}

                <div ref={chatMessagesEndRef} />
              </div>

              {/* Suggestion Chips & Prompt Input */}
              <div className="space-y-3 pt-2 border-t border-white/10 shrink-0">
                
                {/* Suggestion Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
                  {CHAT_PROMPT_PILLS.map((pill, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => sendTripChatMessage(activeTrip.id, pill.replace(/✨|🚤|🎒|👑/g, "").trim())}
                      className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/15 border border-white/10 text-[10px] text-[#d8d2c8] hover:text-white whitespace-nowrap transition-all font-sans cursor-pointer"
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                {/* Input Form */}
                <form
                  onSubmit={handleSendChat}
                  className="relative flex items-center bg-black/50 border border-white/15 focus-within:border-white/40 rounded-2xl transition-all p-1.5"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask Gemini to modify or answer..."
                    className="w-full pl-4 pr-12 py-2.5 bg-transparent text-xs text-white placeholder:text-[#5e5346] focus:outline-none font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isTripChatThinking}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#eae5d9] disabled:opacity-30 text-[#181411] flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5 rotate-45 -translate-y-0.5" />
                  </button>
                </form>

                <div className="text-[10px] font-mono text-[#736a5e] text-center">
                  Scroll up anytime to view earlier prompts & answers.
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Explainable AI Modal */}
      {showWhyExplanation && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowWhyExplanation(false);
          }}
        >
          <div className="relative w-full max-w-xl bg-[#181411] border border-white/20 rounded-3xl p-7 shadow-2xl space-y-6 text-[#f5f2eb]">
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

    </div>
  );
};
