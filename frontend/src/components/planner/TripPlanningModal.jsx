import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock,
  Users, 
  User,
  Heart,
  Smile,
  Shield,
  Compass,
  Briefcase,
  Globe,
  Utensils,
  Camera,
  Landmark,
  Trees,
  ShoppingBag,
  Moon,
  Wallet,
  Crown,
  Plane,
  Check, 
  Minus,
  Plus
} from "lucide-react";
import { useTravel } from "../../context/TravelContext";
import { TRAVEL_GROUP_OPTIONS, PREFERENCE_OPTIONS, DEFAULT_SAFETY_PRESETS } from "../../data/mockTravelData";

// Concise, human descriptions for the 9 Travel Group recommendation cards
const GROUP_SHORT_DESCS = {
  "Solo": "Independent & flexible",
  "Couple": "Romantic & relaxed",
  "Family": "Comfortable & balanced",
  "Family with Children": "Child-friendly & engaging",
  "Family with Senior Citizens": "Gentle pace & accessible",
  "Friends": "Social & adventurous",
  "Couple + Friends": "Lively & curated",
  "Business": "Productive & punctual",
  "Custom Group": "Tailored & flexible"
};

// Subtle contextual icons for the travel groups
const getGroupIcon = (id) => {
  switch (id) {
    case "Solo": return <User className="w-4 h-4" />;
    case "Couple": return <Heart className="w-4 h-4" />;
    case "Family": return <Users className="w-4 h-4" />;
    case "Family with Children": return <Smile className="w-4 h-4" />;
    case "Family with Senior Citizens": return <Shield className="w-4 h-4" />;
    case "Friends": return <Sparkles className="w-4 h-4" />;
    case "Couple + Friends": return <Compass className="w-4 h-4" />;
    case "Business": return <Briefcase className="w-4 h-4" />;
    case "Custom Group": return <Globe className="w-4 h-4" />;
    default: return <Users className="w-4 h-4" />;
  }
};

// Minimal icons for preference chips
const getPrefIcon = (id) => {
  switch (id) {
    case "Adventure": return <Compass className="w-3.5 h-3.5" />;
    case "Romance": return <Heart className="w-3.5 h-3.5" />;
    case "Relaxation": return <Clock className="w-3.5 h-3.5" />;
    case "Food": return <Utensils className="w-3.5 h-3.5" />;
    case "Photography": return <Camera className="w-3.5 h-3.5" />;
    case "History & Culture": return <Landmark className="w-3.5 h-3.5" />;
    case "Nature": return <Trees className="w-3.5 h-3.5" />;
    case "Shopping": return <ShoppingBag className="w-3.5 h-3.5" />;
    case "Nightlife": return <Moon className="w-3.5 h-3.5" />;
    case "Family-friendly": return <Smile className="w-3.5 h-3.5" />;
    case "Budget": return <Wallet className="w-3.5 h-3.5" />;
    case "Luxury": return <Crown className="w-3.5 h-3.5" />;
    default: return <Sparkles className="w-3.5 h-3.5" />;
  }
};

// Dynamic AI insight for Step 4 based on group dynamics
const getGroupInsight = (group) => {
  switch (group) {
    case "Solo":
      return "Your itinerary will prioritize safe, verified transit, central boutique stays, and authentic local discovery.";
    case "Couple":
      return "Your itinerary will prioritize relaxed pacing, comfortable stays, and couple-friendly experiences.";
    case "Family":
      return "Your itinerary will balance spacious accommodations, gentle sightseeing, and multi-generational comfort.";
    case "Family with Children":
      return "Your itinerary will feature child-friendly stays, gentle pacing with rest breaks, and child-safe transit.";
    case "Family with Senior Citizens":
      return "Your itinerary will prioritize step-free access, minimal walking, and low-strain comfort transfers.";
    case "Friends":
      return "Your itinerary will highlight lively dining, adventure stops, and seamless group logistics.";
    case "Couple + Friends":
      return "Your itinerary will balance social group gatherings with private comfort for couples.";
    case "Business":
      return "Your itinerary will ensure punctual executive transfers, high-speed work setups, and premium lounges.";
    case "Custom Group":
      return "Your itinerary will be tuned for seamless group coordination and flexible shared daily agendas.";
    default:
      return "Your itinerary will be carefully personalized to match your travel companions and comfort standards.";
  }
};

export const TripPlanningModal = () => {
  const { isPlannerOpen, setIsPlannerOpen, tripData, submitTripPlan } = useTravel();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState({
    startingLocation: tripData.startingLocation || "Mumbai",
    destination: tripData.destination || "Rajasthan (Jaipur & Udaipur)",
    startDate: tripData.startDate || "2026-10-15",
    days: tripData.days || 5,
    travellers: tripData.travellers || 2,
    budgetRange: tripData.budgetRange || "₹35,000 - ₹45,000",
    budgetNumber: tripData.budgetNumber || 40000,
    preferredMode: tripData.preferredMode || "Flight + Private Cab",
    travelGroup: tripData.travelGroup || "Couple",
    preferences: tripData.preferences || ["Romance", "History & Culture", "Photography", "Food"],
    safetyRequirements: tripData.safetyRequirements || DEFAULT_SAFETY_PRESETS["Couple"]
  });


  const handleGroupSelect = (groupId) => {
    const defaultSafety = DEFAULT_SAFETY_PRESETS[groupId] || [];
    setFormData(prev => ({
      ...prev,
      travelGroup: groupId,
      safetyRequirements: defaultSafety
    }));
  };

  const togglePreference = (prefId) => {
    setFormData(prev => {
      const exists = prev.preferences.includes(prefId);
      return {
        ...prev,
        preferences: exists 
          ? prev.preferences.filter(p => p !== prefId) 
          : [...prev.preferences, prefId]
      };
    });
  };

  const toggleSafetyItem = (item) => {
    setFormData(prev => {
      const exists = prev.safetyRequirements.includes(item);
      return {
        ...prev,
        safetyRequirements: exists
          ? prev.safetyRequirements.filter(s => s !== item)
          : [...prev.safetyRequirements, item]
      };
    });
  };

  const handleNext = () => {
    setDirection(1);
    setStep(prev => Math.min(4, prev + 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    submitTripPlan(formData);
  };

  return (
    <AnimatePresence>
      {isPlannerOpen && (
        <motion.div 
          data-lenis-prevent="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md text-[#f5f2eb]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPlannerOpen(false);
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <motion.div 
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, scale: 0.94, filter: "blur(12px)", y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-[880px] bg-[#181411] border border-white/15 rounded-[22px] shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
        
        {/* ============================================================ */}
        {/* HEADER: Compact Progress + Large Question (No heavy divider) */}
        {/* ============================================================ */}
        <div className="px-6 sm:px-10 pt-7 sm:pt-9 pb-3 shrink-0 flex flex-col gap-4">
          
          {/* Top Row: Progress Indicator + Minimal Close Button */}
          <div className="flex items-center justify-between">
            {/* Compact Progress Indicator: 01 ━━━ 02 ━━━ 03 ━━━ 04 */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {[1, 2, 3, 4].map((num, i) => {
                const isCurrent = step === num;
                const isCompleted = step > num;
                return (
                  <React.Fragment key={num}>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11px] sm:text-xs font-mono tracking-wider transition-colors duration-300 ${
                        isCurrent 
                          ? "text-white font-bold" 
                          : isCompleted 
                            ? "text-[#e5dec9]" 
                            : "text-[#5e5346]"
                      }`}>
                        0{num}
                      </span>
                      {isCompleted && (
                        <Check className="w-2.5 h-2.5 text-[#e5dec9] stroke-[3]" />
                      )}
                    </div>
                    {i < 3 && (
                      <div className="w-6 sm:w-10 h-[1.5px] bg-white/10 relative overflow-hidden rounded-full">
                        <div 
                          className={`h-full bg-gradient-to-r from-white to-[#e5dec9] transition-all duration-500 rounded-full ${
                            step > num ? "w-full" : "w-0"
                          }`}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Minimal Close Button */}
            <button
              onClick={() => setIsPlannerOpen(false)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#a89f91] hover:text-white transition-all hover:scale-105 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Question Heading & Supporting Copy */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-2xl sm:text-[30px] font-bold text-white tracking-tight font-sans leading-tight">
                {step === 1 && "Where are you going?"}
                {step === 2 && "Who's coming along?"}
                {step === 3 && "What kind of trip feels like you?"}
                {step === 4 && "Anything we should know?"}
              </h2>

              {step === 3 && (
                <span className="text-xs font-mono font-medium tracking-wide px-3 py-1 rounded-full bg-white/10 text-[#e5dec9] border border-white/15">
                  {formData.preferences.length} selected
                </span>
              )}
            </div>
            
            <p className="text-xs sm:text-sm text-[#a89f91] font-sans">
              {step === 1 && "Tell us the basics and we'll build the journey around you."}
              {step === 2 && "This helps your AI planner tune the pace, stays and experiences."}
              {step === 3 && "Pick as many as you like. Your AI planner will use these to shape your itinerary."}
              {step === 4 && "Optional — tell us what would make your trip more comfortable."}
            </p>
          </div>

        </div>

        {/* ============================================================ */}
        {/* FORM BODY: Generous Spacing & Direction-Aware Step Transition */}
        {/* ============================================================ */}
        <div 
          data-lenis-prevent="true"
          className="px-6 sm:px-10 py-5 overflow-y-auto custom-scrollbar flex-1 overflow-x-hidden"
          style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div 
              key={step} 
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 45 : -45, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: direction > 0 ? -45 : 45, filter: "blur(8px)" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
            
            {/* ------------------------------------------------------------ */}
            {/* STEP 1: WHERE + WHEN + WHO                                    */}
            {/* ------------------------------------------------------------ */}
            {step === 1 && (
              <div className="space-y-6">
                
                {/* Visual Route Section: Starting Location -> Destination */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a89f91] font-semibold block mb-2">
                    Routing & Destination
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-3 p-4 sm:p-5 rounded-2xl bg-[#1c1713] border border-white/10 hover:border-white/20 transition-all shadow-inner">
                    
                    {/* From: Starting Point */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#a89f91] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#e5dec9]" />
                        Starting Point
                      </label>
                      <input
                        type="text"
                        value={formData.startingLocation}
                        onChange={e => setFormData({ ...formData, startingLocation: e.target.value })}
                        placeholder="e.g. Mumbai"
                        className="w-full bg-transparent text-lg sm:text-xl font-bold text-white placeholder:text-white/25 focus:outline-none font-sans"
                      />
                    </div>

                    {/* From -> To Connector Arrow */}
                    <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-[#e5dec9]">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    {/* To: Destination */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#a89f91] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                        Destination
                      </label>
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={e => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="e.g. Rajasthan (Jaipur & Udaipur)"
                        className="w-full bg-transparent text-lg sm:text-xl font-bold text-white placeholder:text-white/25 focus:outline-none font-sans"
                      />
                    </div>

                  </div>
                </div>

                {/* WHEN + WHO: Date, Duration, and Travellers Stepper */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  
                  {/* Start Date */}
                  <div className="p-4 rounded-2xl bg-[#1c1713] border border-white/10 hover:border-white/20 transition-all space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#a89f91] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#e5dec9]" />
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                      style={{ colorScheme: "dark" }}
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none font-sans cursor-pointer"
                    />
                  </div>

                  {/* Duration Stepper */}
                  <div className="p-4 rounded-2xl bg-[#1c1713] border border-white/10 hover:border-white/20 transition-all space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#a89f91] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#e5dec9]" />
                      Duration
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-white font-sans">
                        {formData.days} {formData.days === 1 ? "day" : "days"}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, days: Math.max(1, prev.days - 1) }))}
                          disabled={formData.days <= 1}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white text-xs border border-white/10 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, days: Math.min(30, prev.days + 1) }))}
                          disabled={formData.days >= 30}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white text-xs border border-white/10 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Travellers Stepper */}
                  <div className="p-4 rounded-2xl bg-[#1c1713] border border-white/10 hover:border-white/20 transition-all space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#a89f91] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#e5dec9]" />
                      Travellers
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-white font-sans">
                        {formData.travellers} {formData.travellers === 1 ? "traveller" : "travellers"}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, travellers: Math.max(1, prev.travellers - 1) }))}
                          disabled={formData.travellers <= 1}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white text-xs border border-white/10 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, travellers: Math.min(50, prev.travellers + 1) }))}
                          disabled={formData.travellers >= 50}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white text-xs border border-white/10 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Subtle AI Personality Message */}
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-[#a89f91]">
                  <Sparkles className="w-3.5 h-3.5 text-[#e5dec9] shrink-0" />
                  <span>Your AI planner will automatically calculate ideal route transit and daily pacing based on your dates and party size.</span>
                </div>

              </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 2: SELECT TRAVEL GROUP + BUDGET & TRANSIT STYLE          */}
            {/* ------------------------------------------------------------ */}
            {step === 2 && (
              <div className="space-y-6">
                
                {/* 9 Recommendation Cards */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a89f91] font-semibold block mb-2.5">
                    Select Your Travel Group
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {TRAVEL_GROUP_OPTIONS.map(grp => {
                      const isSelected = formData.travelGroup === grp.id;
                      const shortDesc = GROUP_SHORT_DESCS[grp.id] || grp.desc;
                      
                      return (
                        <div
                          key={grp.id}
                          onClick={() => handleGroupSelect(grp.id)}
                          className={`cursor-pointer p-4 rounded-2xl border flex flex-col justify-between h-[110px] transition-all duration-200 select-none ${
                            isSelected
                              ? "bg-white text-[#181411] border-white shadow-[0_10px_25px_rgba(255,255,255,0.12)] scale-[1.02]"
                              : "bg-[#1c1713] border-white/10 text-[#d8d2c8] hover:border-white/25 hover:-translate-y-0.5"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className={isSelected ? "text-[#181411]" : "text-[#e5dec9]"}>
                                {getGroupIcon(grp.id)}
                              </span>
                              <span className="font-bold text-sm font-sans tracking-tight leading-snug">
                                {grp.label}
                              </span>
                            </div>

                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-[#181411] text-white flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <p className={`text-xs font-sans leading-relaxed ${
                            isSelected ? "text-[#55473a] font-medium" : "text-[#a89f91]"
                          }`}>
                            {shortDesc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Secondary Travel Preferences: Budget Range + Preferred Travel Mode */}
                <div className="pt-2 border-t border-white/5 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a89f91] font-semibold block">
                    Travel Style & Budget
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Budget Comfort Range */}
                    <div className="p-3.5 rounded-2xl bg-[#1c1713] border border-white/10 space-y-1">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#a89f91] flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5 text-[#e5dec9]" />
                        Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none font-sans cursor-pointer py-1"
                      >
                        <option value="₹20,000 - ₹30,000" className="bg-[#181411] text-white">₹20,000 - ₹30,000 (Budget Conscious)</option>
                        <option value="₹35,000 - ₹45,000" className="bg-[#181411] text-white">₹35,000 - ₹45,000 (Comfort & Heritage)</option>
                        <option value="₹50,000 - ₹75,000" className="bg-[#181411] text-white">₹50,000 - ₹75,000 (Premium Luxury)</option>
                        <option value="₹1,00,000+" className="bg-[#181411] text-white">₹1,00,000+ (Ultra High-End)</option>
                      </select>
                    </div>

                    {/* Preferred Travel Mode */}
                    <div className="p-3.5 rounded-2xl bg-[#1c1713] border border-white/10 space-y-1">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#a89f91] flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-[#e5dec9]" />
                        Preferred Travel Mode
                      </label>
                      <select
                        value={formData.preferredMode}
                        onChange={e => setFormData({ ...formData, preferredMode: e.target.value })}
                        className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none font-sans cursor-pointer py-1"
                      >
                        <option value="Flight + Private Cab" className="bg-[#181411] text-white">Flight + Private AC Cab</option>
                        <option value="Executive Express Train (Vande Bharat)" className="bg-[#181411] text-white">Executive Express Train</option>
                        <option value="Self Drive SUV / Rental" className="bg-[#181411] text-white">Self-Drive SUV / Rental</option>
                        <option value="All-Inclusive Multi-Modal" className="bg-[#181411] text-white">All-Inclusive Multi-Modal</option>
                      </select>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 3: TRAVEL PREFERENCES & VIBE (Lightweight Chips)        */}
            {/* ------------------------------------------------------------ */}
            {step === 3 && (
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a89f91] font-semibold block">
                  Select Experiences That Excite You
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  {PREFERENCE_OPTIONS.map(pref => {
                    const isSelected = formData.preferences.includes(pref.id);
                    return (
                      <div
                        key={pref.id}
                        onClick={() => togglePreference(pref.id)}
                        className={`cursor-pointer p-3 sm:p-3.5 rounded-xl border flex items-center justify-between transition-all duration-200 select-none ${
                          isSelected
                            ? "bg-white text-[#181411] border-white font-semibold shadow-md scale-[1.02]"
                            : "bg-[#1c1713] border-white/10 text-[#d8d2c8] hover:border-white/25 hover:text-white hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={isSelected ? "text-[#181411]" : "text-[#e5dec9]"}>
                            {getPrefIcon(pref.id)}
                          </span>
                          <span className="text-xs font-medium font-sans truncate">
                            {pref.label}
                          </span>
                        </div>

                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                          isSelected ? "bg-[#181411] border-[#181411] text-white" : "border-white/20"
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-[#a89f91] mt-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#e5dec9] shrink-0" />
                  <span>Your selections will prioritize hidden gems, activity booking slots, and curated local stops.</span>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* STEP 4: SAFETY & SPECIAL REQUIREMENTS                         */}
            {/* ------------------------------------------------------------ */}
            {step === 4 && (
              <div className="space-y-5">
                
                {/* Elegant AI Personalization Insight Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#e5dec9] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Personalized for {formData.travelGroup}
                  </div>
                  <p className="text-xs sm:text-sm text-[#f5f2eb] leading-relaxed font-sans font-medium">
                    "{getGroupInsight(formData.travelGroup)}"
                  </p>
                </div>

                {/* Optional Safeguard Selectable Rows */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a89f91] font-semibold block">
                    Tailored Safeguards & Amenities
                  </span>

                  <div className="space-y-2">
                    {(DEFAULT_SAFETY_PRESETS[formData.travelGroup] || []).map((req, idx) => {
                      const isChecked = formData.safetyRequirements.includes(req);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleSafetyItem(req)}
                          className={`cursor-pointer p-3.5 sm:p-4 rounded-xl border flex items-center justify-between text-xs sm:text-sm transition-all duration-200 select-none ${
                            isChecked
                              ? "bg-white/[0.09] border-white/30 text-white font-medium shadow-sm"
                              : "bg-[#1c1713] border-white/8 text-[#a89f91] hover:border-white/20 hover:text-[#d8d2c8]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Shield className={`w-4 h-4 shrink-0 ${isChecked ? "text-[#e5dec9]" : "text-[#5e5346]"}`} />
                            <span className="font-sans leading-snug">{req}</span>
                          </div>

                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                            isChecked ? "bg-white border-white text-black" : "border-white/20 bg-transparent"
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ============================================================ */}
        {/* FOOTER: Context-Aware CTAs, Generous Padding, Clean Layout  */}
        {/* ============================================================ */}
        <div className="px-6 sm:px-10 py-5 border-t border-white/10 bg-[#14100d] flex items-center justify-between shrink-0">
          
          {/* Back Button (Hidden on Step 1) */}
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="h-[48px] sm:h-[52px] px-4 sm:px-6 rounded-full text-xs font-semibold text-[#a89f91] hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {/* Forward / Final CTAs with Context-Aware Copy */}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="group h-[48px] sm:h-[52px] px-6 sm:px-8 rounded-full text-xs sm:text-sm font-semibold bg-white text-[#181411] hover:bg-[#eae5d9] flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-md"
            >
              <span>
                {step === 1 && "Continue planning"}
                {step === 2 && "Choose preferences"}
                {step === 3 && "Personalize my trip"}
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="group h-[48px] sm:h-[52px] px-8 sm:px-10 rounded-full text-xs sm:text-sm font-bold bg-white text-[#181411] hover:bg-[#eae5d9] flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.25)]"
            >
              <Sparkles className="w-4 h-4 text-[#8a7a58]" />
              <span>Plan my journey</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}

        </div>

        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};
