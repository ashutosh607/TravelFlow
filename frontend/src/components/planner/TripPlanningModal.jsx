import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  Plane, 
  Check, 
  Shield, 
  Clock
} from "lucide-react";
import { useTravel } from "../../context/TravelContext";
import { TRAVEL_GROUP_OPTIONS, PREFERENCE_OPTIONS, DEFAULT_SAFETY_PRESETS } from "../../data/mockTravelData";

export const TripPlanningModal = () => {
  const { isPlannerOpen, setIsPlannerOpen, tripData, submitTripPlan } = useTravel();
  const [step, setStep] = useState(1);

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

  if (!isPlannerOpen) return null;

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

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    submitTripPlan(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in text-[#f5f2eb]">
      <div className="relative w-full max-w-2xl bg-[#181411] border border-white/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with Step Progress */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#14100d]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[#f5f2eb]">
                Step {step} of 4
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight font-sans">
                {step === 1 && "Trip Basics & Routing"}
                {step === 2 && "Select Travel Group"}
                {step === 3 && "Travel Preferences & Vibe"}
                {step === 4 && "Safety & Special Requirements"}
              </h2>
            </div>
            <p className="text-xs text-[#a89f91] mt-1 font-sans">
              {step === 1 && "Where and how would you like to travel?"}
              {step === 2 && "AI uses group dynamics to calibrate pacing and stops."}
              {step === 3 && "Select all experiences that excite you."}
              {step === 4 && "Tailored safeguards for your selected group."}
            </p>
          </div>

          <button
            onClick={() => setIsPlannerOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#a89f91] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* STEP 1: Basic Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#a89f91] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#e5dec9]" />
                    Starting Location
                  </label>
                  <input
                    type="text"
                    value={formData.startingLocation}
                    onChange={e => setFormData({ ...formData, startingLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1f1a15] border border-white/10 text-white text-sm focus:border-white focus:outline-none font-sans"
                    placeholder="e.g. Mumbai, Delhi, Bengaluru"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a89f91] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#e5dec9]" />
                    Destination
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1f1a15] border border-white/10 text-white text-sm focus:border-white focus:outline-none font-sans"
                    placeholder="e.g. Rajasthan, Kerala, Kashmir"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#a89f91] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#e5dec9]" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1f1a15] border border-white/10 text-white text-sm focus:border-white focus:outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a89f91] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#e5dec9]" />
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.days}
                    onChange={e => setFormData({ ...formData, days: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1f1a15] border border-white/10 text-white text-sm focus:border-white focus:outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a89f91] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#e5dec9]" />
                    Travellers
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.travellers}
                    onChange={e => setFormData({ ...formData, travellers: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1f1a15] border border-white/10 text-white text-sm focus:border-white focus:outline-none font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#a89f91] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-[#e5dec9]" />
                    Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1f1a15] border border-white/10 text-white text-sm focus:border-white focus:outline-none font-sans"
                  >
                    <option value="₹20,000 - ₹30,000">₹20,000 - ₹30,000 (Budget Conscious)</option>
                    <option value="₹35,000 - ₹45,000">₹35,000 - ₹45,000 (Comfort & Heritage)</option>
                    <option value="₹50,000 - ₹75,000">₹50,000 - ₹75,000 (Premium Luxury)</option>
                    <option value="₹1,00,000+">₹1,00,000+ (Ultra High-End)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#a89f91] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-[#e5dec9]" />
                    Preferred Travel Mode
                  </label>
                  <select
                    value={formData.preferredMode}
                    onChange={e => setFormData({ ...formData, preferredMode: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1f1a15] border border-white/10 text-white text-sm focus:border-white focus:outline-none font-sans"
                  >
                    <option value="Flight + Private Cab">Flight + Private AC Cab</option>
                    <option value="Executive Express Train (Vande Bharat)">Executive Train (Vande Bharat / Express)</option>
                    <option value="Self Drive SUV / Rental">Self-Drive SUV / Rental</option>
                    <option value="All-Inclusive Multi-Modal">All-Inclusive Multi-Modal</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Travel Group */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TRAVEL_GROUP_OPTIONS.map(grp => {
                const isSelected = formData.travelGroup === grp.id;
                return (
                  <div
                    key={grp.id}
                    onClick={() => handleGroupSelect(grp.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? "bg-white text-[#181411] border-white font-semibold shadow-md"
                        : "bg-[#1f1a15] border-white/10 text-[#d8d2c8] hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm font-sans">{grp.label}</span>
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <p className={`text-xs leading-relaxed font-sans ${isSelected ? "text-[#55473a]" : "text-[#a89f91]"}`}>
                      {grp.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 3: Travel Preferences */}
          {step === 3 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PREFERENCE_OPTIONS.map(pref => {
                const isSelected = formData.preferences.includes(pref.id);
                return (
                  <div
                    key={pref.id}
                    onClick={() => togglePreference(pref.id)}
                    className={`cursor-pointer p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? "bg-white text-[#181411] border-white font-semibold"
                        : "bg-[#1f1a15] border-white/10 text-[#d8d2c8] hover:border-white/20"
                    }`}
                  >
                    <span className="text-xs font-medium font-sans">{pref.label}</span>
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${isSelected ? "bg-[#181411] border-[#181411] text-white" : "border-white/20"}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 4: Dynamic Safety Requirements */}
          {step === 4 && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#241e19] border border-white/15 text-xs text-[#f5f2eb] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#e5dec9] shrink-0" />
                <span>
                  Automatically personalized safety & pacing safeguards for <strong>{formData.travelGroup}</strong>.
                </span>
              </div>

              <div className="space-y-2">
                {(DEFAULT_SAFETY_PRESETS[formData.travelGroup] || []).map((req, idx) => {
                  const isChecked = formData.safetyRequirements.includes(req);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleSafetyItem(req)}
                      className={`cursor-pointer p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                        isChecked
                          ? "bg-white/10 border-white/30 text-white font-medium"
                          : "bg-[#1f1a15] border-white/5 text-[#a89f91] hover:border-white/15"
                      }`}
                    >
                      <span className="font-sans">{req}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${isChecked ? "bg-white border-white text-black" : "border-white/20"}`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-6 border-t border-white/10 bg-[#14100d] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-full text-xs font-medium text-[#a89f91] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-[#181411] hover:bg-[#eae5d9] flex items-center gap-2 transition-all"
            >
              Next Step
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] shadow-lg flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Plan My Journey →
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
