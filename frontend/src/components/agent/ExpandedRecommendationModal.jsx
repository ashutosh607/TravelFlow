import React, { useState, useEffect } from "react";
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ArrowUpRight,
  Heart, 
  Share2,
  MapPin, 
  Calendar, 
  Clock, 
  Plane, 
  Car, 
  Utensils, 
  Building, 
  Shield, 
  Check, 
  Compass, 
  Camera, 
  Sun,
  Wallet,
  Star
} from "lucide-react";
import { useTravel } from "../../context/TravelContext";

export const ExpandedRecommendationModal = () => {
  const { 
    isCardExpanded, 
    expandedOption, 
    collapseOption, 
    startJourney 
  } = useTravel();

  const [activeDay, setActiveDay] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Scroll listener to update the active day indicator
  useEffect(() => {
    if (!isCardExpanded) return;

    const handleScroll = (e) => {
      const container = e.target;
      const dayElements = [1, 2, 3, 4, 5].map(d => document.getElementById(`journey-day-${d}`));
      
      const scrollPos = container.scrollTop + 200;
      for (let i = dayElements.length - 1; i >= 0; i--) {
        const el = dayElements[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveDay(i + 1);
          break;
        }
      }
    };

    const container = document.getElementById("unfold-journey-scroll-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [isCardExpanded]);

  if (!isCardExpanded || !expandedOption) return null;

  const scrollToDay = (dayNum) => {
    setActiveDay(dayNum);
    const el = document.getElementById(`journey-day-${dayNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div 
      id="unfold-journey-scroll-container"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[200] bg-[#14100d] text-[#f5f2eb] overflow-y-auto overflow-x-hidden custom-scrollbar scroll-smooth selection:bg-[#f5f2eb] selection:text-[#181411]"
      style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      
      {/* ============================================================ */}
      {/* 1. STICKY TOP APP HEADER                                    */}
      {/* ============================================================ */}
      <header className="sticky top-0 h-16 px-4 sm:px-8 border-b border-white/10 bg-[#181411]/95 backdrop-blur-xl flex items-center justify-between z-50 shrink-0">
        
        {/* Back Button */}
        <button
          onClick={collapseOption}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#a89f91] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to All Options</span>
          <span className="sm:hidden">Back</span>
        </button>

        {/* Center Title & Day Pill Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5].map((d) => (
            <button
              key={d}
              onClick={() => scrollToDay(d)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition-all cursor-pointer ${
                activeDay === d
                  ? "bg-white text-[#181411] font-bold shadow-md scale-105"
                  : "bg-white/5 hover:bg-white/15 text-[#a89f91] hover:text-white"
              }`}
            >
              DAY 0{d}
            </button>
          ))}
        </div>

        {/* Right Actions: Save, Share, Start CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isSaved
                ? "bg-red-500/20 border-red-500/40 text-red-400"
                : "bg-white/5 hover:bg-white/15 border-white/10 text-[#a89f91] hover:text-white"
            }`}
            title="Save trip"
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[#a89f91] hover:text-white transition-all cursor-pointer relative"
            title="Share trip"
          >
            <Share2 className="w-4 h-4" />
            {isCopied && (
              <span className="absolute -bottom-8 right-0 text-[10px] font-mono whitespace-nowrap bg-black px-2 py-1 rounded border border-white/20 text-white animate-fade-in">
                Link copied!
              </span>
            )}
          </button>

          <button
            onClick={() => startJourney(expandedOption)}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] transition-all hover:scale-105 cursor-pointer shadow-lg"
          >
            <span>Start Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO BANNER (58–62vh Editorial Presentation)                */}
      {/* ============================================================ */}
        <section className="relative h-[60vh] min-h-[480px] max-h-[620px] w-full overflow-hidden flex flex-col justify-end p-6 sm:p-12 lg:p-16">
          <img
            src={expandedOption.image}
            alt={expandedOption.title}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14100d] via-[#14100d]/55 to-black/60" />

          {/* Hero Content Overlay */}
          <div className="relative z-10 max-w-5xl space-y-4">
            
            {/* Badges */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-semibold">
                {expandedOption.tag}
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-[#26201a]/90 backdrop-blur-md border border-white/20 text-[#e5dec9] font-bold">
                {expandedOption.aiMatch}% AI MATCH
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white">
                {expandedOption.theme}
              </span>
            </div>

            {/* Big Serif Destination Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05] drop-shadow-lg">
              {expandedOption.title}
            </h1>

            {/* Route & Metadata Line */}
            <p className="text-xs sm:text-sm font-mono text-[#d8d2c8] flex items-center gap-2 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-[#e5dec9]" />
              <span>{expandedOption.route}</span>
              <span className="text-white/40">·</span>
              <span className="uppercase text-white font-bold">{expandedOption.duration} · 2 TRAVELLERS</span>
              <span className="text-white/40">·</span>
              <span className="text-[#e5dec9] font-bold">{expandedOption.price} estimated trip</span>
            </p>

            {/* Short Poetic AI Description */}
            <p className="text-sm sm:text-base text-[#f5f2eb]/90 max-w-2xl font-sans leading-relaxed">
              "A carefully paced journey through royal architecture, lakeside evenings, and Rajasthan's most memorable heritage experiences."
            </p>

            {/* Hero Quick Actions */}
            <div className="flex items-center gap-4 pt-2 flex-wrap">
              <button
                onClick={() => startJourney(expandedOption)}
                className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] transition-all hover:scale-105 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center gap-2"
              >
                <span>START THIS JOURNEY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className="px-5 py-3 rounded-full text-xs font-mono text-white bg-black/60 hover:bg-black/90 border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-red-400 text-red-400" : ""}`} />
                <span>{isSaved ? "Saved" : "Save trip"}</span>
              </button>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* TRIP SNAPSHOT: Clean Horizontal Overview                    */}
        {/* ============================================================ */}
        <section className="max-w-6xl mx-auto px-4 sm:px-8 py-8 border-b border-white/10">
          <div className="p-6 sm:p-7 rounded-[22px] bg-[#1c1713] border border-white/10 space-y-4">
            
            {/* Top Stat Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#14100d] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#736a5e] block mb-0.5">Duration</span>
                <span className="text-sm sm:text-base font-bold text-white font-sans">5 DAYS</span>
              </div>
              <div className="p-3 rounded-xl bg-[#14100d] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#736a5e] block mb-0.5">Travellers</span>
                <span className="text-sm sm:text-base font-bold text-white font-sans">2 ADULTS</span>
              </div>
              <div className="p-3 rounded-xl bg-[#14100d] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#736a5e] block mb-0.5">Comfort Level</span>
                <span className="text-sm sm:text-base font-bold text-white font-sans">HERITAGE</span>
              </div>
              <div className="p-3 rounded-xl bg-[#14100d] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#736a5e] block mb-0.5">All-Inclusive</span>
                <span className="text-sm sm:text-base font-bold text-[#e5dec9] font-sans">₹37,000</span>
              </div>
              <div className="p-3 rounded-xl bg-[#14100d] border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#736a5e] block mb-0.5">Travel Mode</span>
                <span className="text-xs sm:text-sm font-bold text-white font-sans">FLIGHT + CAB</span>
              </div>
            </div>

            {/* AI Planned For You line */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#e5dec9]" />
                <span className="font-mono text-[#a89f91] uppercase tracking-wider text-[11px]">AI Planned For You:</span>
                <span className="text-[#f5f2eb] font-medium font-sans">Romance · Royal Food · Golden-Hour Photography · Relaxed Pacing</span>
              </div>
              <span className="text-[11px] font-mono text-[#736a5e]">Verified Availability · Zero Surprise Markups</span>
            </div>

          </div>
        </section>

        {/* ============================================================ */}
        {/* DAY-BY-DAY VISUAL CHAPTERS                                   */}
        {/* ============================================================ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-24">

          {/* ---------------------------------------------------------- */}
          {/* DAY 01 — THE PINK CITY · JAIPUR (Image Left, Story Right)  */}
          {/* ---------------------------------------------------------- */}
          <section id="journey-day-1" className="space-y-8 scroll-mt-24">
            
            {/* Chapter Header with Alternating Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Destination Image */}
              <div className="lg:col-span-6 rounded-3xl overflow-hidden h-72 sm:h-96 relative group border border-white/10 shadow-2xl">
                <img
                  src="/destinations/amber_fort.jpg"
                  alt="Amber Fort Jaipur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-mono tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Amber Fort Ramparts · Jaipur
                </span>
              </div>

              {/* Right Intro Story */}
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#e5dec9] font-bold block">
                  DAY 01 · THE PINK CITY
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
                  Arrival & Royal Welcome
                </h2>
                <p className="text-sm sm:text-base text-[#d8d2c8] leading-relaxed font-sans">
                  Your journey begins among the grand courtyards and vibrant terracotta architecture of the Pink City. Settle into a tranquil heritage haveli before witnessing the city glowing at twilight.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-[#a89f91] pt-2">
                  <span>✈ 10:00 AM Landing</span>
                  <span>·</span>
                  <span>🚕 Chauffeur Meets at Gate</span>
                  <span>·</span>
                  <span>🏨 Alsisar Haveli Check-in</span>
                </div>
              </div>

            </div>

            {/* Clean Vertical Timeline */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1c1713] border border-white/10 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#a89f91] block font-bold">
                Day 01 Itinerary Schedule
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#14100d] border border-white/5">
                  <span className="text-xs font-mono font-bold text-[#e5dec9] shrink-0 pt-0.5">10:00 AM</span>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
                      <Plane className="w-3.5 h-3.5 text-[#e5dec9]" />
                      Flight Arrival at Jaipur (JAI)
                    </h4>
                    <p className="text-xs text-[#a89f91] mt-0.5">Arrival on IndiGo 6E-204 from Mumbai. Chauffeur meets at Gate 2 with cool towels.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#14100d] border border-white/5">
                  <span className="text-xs font-mono font-bold text-[#e5dec9] shrink-0 pt-0.5">11:30 AM</span>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
                      <Building className="w-3.5 h-3.5 text-[#e5dec9]" />
                      Check-in at Alsisar Haveli
                    </h4>
                    <p className="text-xs text-[#a89f91] mt-0.5">Royal courtyard room pre-checked with cold hibiscus welcome drink.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#14100d] border border-white/5">
                  <span className="text-xs font-mono font-bold text-[#e5dec9] shrink-0 pt-0.5">03:30 PM</span>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
                      <Compass className="w-3.5 h-3.5 text-[#e5dec9]" />
                      City Palace & Chandra Mahal
                    </h4>
                    <p className="text-xs text-[#a89f91] mt-0.5">Private licensed historian guide through the royal courtyards and Peacock Gate.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#14100d] border border-white/5">
                  <span className="text-xs font-mono font-bold text-[#e5dec9] shrink-0 pt-0.5">06:30 PM</span>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-sans">
                      <Sun className="w-3.5 h-3.5 text-[#e5dec9]" />
                      Hawa Mahal Sunset Rooftop
                    </h4>
                    <p className="text-xs text-[#a89f91] mt-0.5">Golden hour photography opposite the 953 carved windows with saffron chai.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-Image Feature: Hawa Mahal & City Palace */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#e5dec9] font-bold block">Featured Attraction</span>
                  <h3 className="text-2xl font-serif text-white">Hawa Mahal & The Royal Courtyards</h3>
                </div>
                <span className="text-xs font-mono text-[#a89f91] hidden sm:block">15:30 – 19:30 · Fast-Track Pass Included</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 rounded-2xl overflow-hidden h-72 relative group border border-white/10">
                  <img
                    src="/destinations/hawa_mahal.jpg"
                    alt="Hawa Mahal Façade"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                    <span>Hawa Mahal Terracotta Façade at Sunset</span>
                    <span>Entry Included</span>
                  </div>
                </div>

                <div className="md:col-span-4 rounded-2xl overflow-hidden h-72 relative group border border-white/10">
                  <img
                    src="/destinations/peacock_gate.jpg"
                    alt="City Palace Peacock Gate"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-mono text-white">
                    City Palace Peacock Gate
                  </span>
                </div>
              </div>

              {/* AI Personalization Callout */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3 text-xs text-[#d8d2c8]">
                <Sparkles className="w-4 h-4 text-[#e5dec9] shrink-0" />
                <span><strong>AI Pick:</strong> Because you selected Romance + Photography, we arranged the Hawa Mahal rooftop stop at exactly 6:30 PM for golden-hour glow without midday heat.</span>
              </div>
            </div>

            {/* Food Stops & Hotel for Day 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Food Section (Left 7 cols) */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-[#1c1713] border border-white/10 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#a89f91] block font-bold">
                  Curated Food Stops · Day 01
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#14100d] border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#e5dec9] block">Lunch · 01:00 PM</span>
                    <h5 className="text-sm font-bold text-white font-sans">Handi Restaurant</h5>
                    <p className="text-xs text-[#a89f91]">Signature Laal Maas simmered with Mathania chillies, accompanied by crispy butter naan.</p>
                    <span className="text-[11px] font-mono text-[#736a5e] block">Approx ₹700 / person</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#14100d] border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#e5dec9] block">Dinner · 08:30 PM</span>
                    <h5 className="text-sm font-bold text-white font-sans">Haveli Courtyard Sitar Dinner</h5>
                    <p className="text-xs text-[#a89f91]">Traditional Rajasthani Thali served under lanterns with live acoustic instrumental sitar.</p>
                    <span className="text-[11px] font-mono text-[#736a5e] block">Reserved Window Table</span>
                  </div>
                </div>
              </div>

              {/* Tonight's Stay (Right 5 cols) */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-[#1c1713] border border-white/10 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#e5dec9] block font-bold mb-2">
                    Tonight's Stay
                  </span>
                  <div className="rounded-2xl overflow-hidden h-36 relative mb-3 border border-white/10">
                    <img
                      src="/destinations/heritage_haveli.jpg"
                      alt="Alsisar Haveli Jaipur"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white">
                      ★★★★★ 4.9
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white font-sans">Alsisar Haveli — Heritage Suite</h4>
                  <p className="text-xs text-[#a89f91] mt-1">
                    "Central location, heritage courtyard, hand-painted frescoes and easy access to tomorrow's Amer Fort route."
                  </p>
                </div>
                <div className="text-xs font-mono text-[#e5dec9] pt-2 border-t border-white/5 flex items-center justify-between">
                  <span>Heritage Deluxe Room</span>
                  <span>Included in Trip</span>
                </div>
              </div>

            </div>

          </section>


          {/* ---------------------------------------------------------- */}
          {/* DAY 02 — FORTS & BAZAARS (Story Left, Image Right)         */}
          {/* ---------------------------------------------------------- */}
          <section id="journey-day-2" className="space-y-8 scroll-mt-24 pt-8 border-t border-white/10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Intro Story */}
              <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#e5dec9] font-bold block">
                  DAY 02 · FORTS & ARTISAN CULTURE
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
                  Amber Fort Ramparts & Nahargarh
                </h2>
                <p className="text-sm sm:text-base text-[#d8d2c8] leading-relaxed font-sans">
                  Ascend to the hilltop palaces of Amber Fort to witness the legendary Sheesh Mahal. Later, visit the geometric Panna Meena stepwell before winding through bustling artisan bazaars.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-[#a89f91] pt-2">
                  <span>🏰 Amber Fort & Sheesh Mahal</span>
                  <span>·</span>
                  <span>📷 Panna Meena Stepwell</span>
                  <span>·</span>
                  <span>🛍 Bapu Bazaar</span>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-6 rounded-3xl overflow-hidden h-72 sm:h-96 relative group border border-white/10 shadow-2xl order-1 lg:order-2">
                <img
                  src="/destinations/amber_ramparts.jpg"
                  alt="Amber Fort Ramparts Reflection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-mono tracking-widest text-white/90 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Amber Fort Ramparts & Maota Lake
                </span>
              </div>

            </div>

            {/* Feature Place Multi-Image: Sheesh Mahal & Stepwell */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl overflow-hidden h-60 relative group border border-white/10">
                <img
                  src="/destinations/sheesh_mahal.jpg"
                  alt="Sheesh Mahal Mirror Hall"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-white">
                  <span className="font-bold block">Sheesh Mahal Mirror Hall</span>
                  <span className="text-[10px] text-[#a89f91]">Amber Fort · 2 hrs</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-60 relative group border border-white/10">
                <img
                  src="/destinations/panna_meena.jpg"
                  alt="Panna Meena Stepwell"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-white">
                  <span className="font-bold block">Panna Meena Ka Kund</span>
                  <span className="text-[10px] text-[#a89f91]">Geometric Stepwell · 45m</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-60 relative group border border-white/10">
                <img
                  src="/destinations/nahargarh_sunset.jpg"
                  alt="Nahargarh Sunset Overlook"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-white">
                  <span className="font-bold block">Nahargarh Hilltop Sunset</span>
                  <span className="text-[10px] text-[#a89f91]">Panorama Dinner · 08:00 PM</span>
                </div>
              </div>
            </div>

            {/* AI Callout */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3 text-xs text-[#d8d2c8]">
              <Sparkles className="w-4 h-4 text-[#e5dec9] shrink-0" />
              <span><strong>Why this stop?</strong> Your preferred relaxed pacing gives you 2.5 full hours at Amber Fort instead of rushing through, with pre-booked electric cart transit to the main courtyard.</span>
            </div>

          </section>


          {/* ---------------------------------------------------------- */}
          {/* DAY 03 — SCENIC TRANSIT TO UDAIPUR (Transit Route Connector) */}
          {/* ---------------------------------------------------------- */}
          <section id="journey-day-3" className="space-y-8 scroll-mt-24 pt-8 border-t border-white/10">
            
            {/* Transit Route Connector Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1c1713] via-[#241e19] to-[#1c1713] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-[#e5dec9] font-bold block">
                  INTER-CITY TRANSIT ROUTE
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">
                  Jaipur ➔ Udaipur (The City of Lakes)
                </h3>
                <p className="text-xs sm:text-sm text-[#a89f91] max-w-xl font-sans">
                  Leave the Pink City behind on a comfortable highway drive through the rugged Aravalli mountain pass, arriving at your lakefront palace in time for late afternoon high tea.
                </p>
              </div>

              <div className="flex items-center gap-6 shrink-0 bg-[#14100d] px-6 py-4 rounded-2xl border border-white/10">
                <div className="text-center">
                  <span className="text-[10px] font-mono text-[#a89f91] block">VEHICLE</span>
                  <span className="text-sm font-bold text-white">Private AC Sedan</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-mono text-[#a89f91] block">DURATION</span>
                  <span className="text-sm font-bold text-[#e5dec9]">6h 30m scenic</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-mono text-[#a89f91] block">STOPS</span>
                  <span className="text-sm font-bold text-white">Highway Chai</span>
                </div>
              </div>
            </div>

            {/* Day 3 Chapter Intro & Lakefront Arrival */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 rounded-3xl overflow-hidden h-72 sm:h-96 relative group border border-white/10">
                <img
                  src="/destinations/lake_pichola_ghat.jpg"
                  alt="Lake Pichola Ghats Udaipur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-mono text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Gangaur Ghat & Bagore Ki Haveli · Lake Pichola
                </span>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#e5dec9] font-bold block">
                  DAY 03 · THE CITY OF LAKES
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
                  Lakefront Arrival & Sunset Ghats
                </h2>
                <p className="text-sm sm:text-base text-[#d8d2c8] leading-relaxed font-sans">
                  Check into your palace suite directly overlooking Lake Pichola. Spend the afternoon wandering through the tranquil Gangaur Ghat before enjoying front-row seats at the historic Dharohar folk dance show.
                </p>
                <div className="p-4 rounded-2xl bg-[#1c1713] border border-white/10 text-xs space-y-2">
                  <div className="rounded-xl overflow-hidden h-24 relative border border-white/10">
                    <img 
                      src="/destinations/lake_palace_udaipur.jpg" 
                      alt="Udaipur Lakefront Heritage Panorama" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-white">
                      Lake Pichola Heritage View
                    </span>
                  </div>
                  <span className="font-bold text-white font-sans block">Tonight's Accommodation Upgrade:</span>
                  <span className="text-[#a89f91]">Jagat Niwas Palace — Jharokha Lakeview Suite jutting directly over water.</span>
                </div>
              </div>

            </div>

          </section>


          {/* ---------------------------------------------------------- */}
          {/* DAY 04 — PALACES ON WATER & CANDLELIGHT YACHT (Full-Width) */}
          {/* ---------------------------------------------------------- */}
          <section id="journey-day-4" className="space-y-8 scroll-mt-24 pt-8 border-t border-white/10">
            
            {/* Big Feature Banner */}
            <div className="relative rounded-3xl overflow-hidden h-80 sm:h-[420px] border border-white/10 flex flex-col justify-end p-6 sm:p-10">
              <img
                src="/destinations/lake_pichola_boat.jpg"
                alt="Lake Pichola Sunset Boat & City Palace"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100d] via-black/40 to-transparent" />
              
              <div className="relative z-10 max-w-2xl space-y-2">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#e5dec9] font-bold block">
                  DAY 04 · CENTERPIECE EXPERIENCE
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
                  Palaces on Water & Private Sunset Cruise
                </h2>
                <p className="text-xs sm:text-sm text-[#f5f2eb]/90 leading-relaxed font-sans">
                  A private solar yacht whisks you across Lake Pichola to the 400-year-old island palace of Jag Mandir as golden light washes over the Aravalli ridges.
                </p>
              </div>
            </div>

            {/* 3-Column Experience Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="p-5 rounded-3xl bg-[#1c1713] border border-white/10 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#e5dec9] block">09:30 AM · Morning</span>
                  <h4 className="text-base font-bold text-white font-sans mt-1">Udaipur City Palace</h4>
                  <p className="text-xs text-[#a89f91] mt-1.5 leading-relaxed">
                    India's largest palace complex featuring peacock mosaics, crystal gallery, and private armory courtyards.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#736a5e] pt-2 border-t border-white/5">Fast-Pass Entry Included</span>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-3xl bg-[#1c1713] border border-white/10 space-y-3 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="rounded-2xl overflow-hidden h-28 -mx-1 -mt-1 mb-3 relative border border-white/10">
                    <img
                      src="/destinations/jag_mandir.jpg"
                      alt="Jag Mandir Island Palace"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1713] via-transparent to-transparent" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#e5dec9] block">04:30 PM · Golden Hour</span>
                  <h4 className="text-base font-bold text-white font-sans mt-1">Jag Mandir Solar Yacht</h4>
                  <p className="text-xs text-[#a89f91] mt-1.5 leading-relaxed">
                    Private chartered solar boat to the island courtyard with marble elephants and chilled mocktails.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#736a5e] pt-2 border-t border-white/5">Reserved Sunset Slot</span>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-3xl bg-[#1c1713] border border-white/10 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#e5dec9] block">08:30 PM · Night</span>
                  <h4 className="text-base font-bold text-white font-sans mt-1">Candlelight Water Edge Dining</h4>
                  <p className="text-xs text-[#a89f91] mt-1.5 leading-relaxed">
                    Reserved table at Tribute / Ambrai right at the water's edge with illuminated City Palace reflection.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#736a5e] pt-2 border-t border-white/5">Chef's Tasting Menu</span>
              </div>

            </div>

          </section>


          {/* ---------------------------------------------------------- */}
          {/* DAY 05 — MONSOON PALACE & FAREWELL                         */}
          {/* ---------------------------------------------------------- */}
          <section id="journey-day-5" className="space-y-8 scroll-mt-24 pt-8 border-t border-white/10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#e5dec9] font-bold block">
                  DAY 05 · PANORAMIC FAREWELL
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
                  Monsoon Palace Vista & Return Home
                </h2>
                <p className="text-sm sm:text-base text-[#d8d2c8] leading-relaxed font-sans">
                  Savor a slow rooftop breakfast gazing over the shimmering water before climbing to Sajjangarh (Monsoon Palace) for a 360-degree panoramic view of Udaipur's four lakes and surrounding wildlife sanctuary.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-[#a89f91] pt-2">
                  <span>🏔 Sajjangarh Hilltop Vista</span>
                  <span>·</span>
                  <span>🎨 Pichwai Art Keepsakes</span>
                  <span>·</span>
                  <span>✈ Flight to Mumbai</span>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-3xl overflow-hidden h-72 sm:h-96 relative group border border-white/10">
                <img
                  src="/destinations/sajjangarh_monsoon.jpg"
                  alt="Sajjangarh Monsoon Palace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-xs font-mono text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Sajjangarh (Monsoon Palace) Hilltop · 09:30 AM
                </span>
              </div>

            </div>

          </section>


          {/* ============================================================ */}
          {/* BUDGET TRANSPARENCY & ITEMIZED BREAKDOWN                    */}
          {/* ============================================================ */}
          <section className="pt-8 border-t border-white/10 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e5dec9] font-bold">
                COMPREHENSIVE FINANCIAL BREAKDOWN
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                All-Inclusive Trip Estimate: {expandedOption.price}
              </h3>
              <p className="text-xs text-[#a89f91] font-sans">
                Transparent pricing with verified live supplier rates. Zero hidden booking fees or surge costs.
              </p>
            </div>

            <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#1c1713] border border-white/10 space-y-4">
              <div className="space-y-3 divide-y divide-white/5 text-sm font-sans">
                <div className="flex items-center justify-between pb-3">
                  <span className="text-white flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[#e5dec9]" />
                    Return Flights (BOM ⇄ JAI / UDR)
                  </span>
                  <span className="font-mono font-bold text-white">₹12,000</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#e5dec9]" />
                    4 Nights Heritage Palace & Haveli Stays
                  </span>
                  <span className="font-mono font-bold text-white">₹12,000</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-white flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#e5dec9]" />
                    Private Chauffeur Sedan + Fuel + Inter-City
                  </span>
                  <span className="font-mono font-bold text-white">₹5,500</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-white flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#e5dec9]" />
                    Curated Dining, Sitar Dinners & High Teas
                  </span>
                  <span className="font-mono font-bold text-white">₹4,500</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-white flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#e5dec9]" />
                    Jag Mandir Yacht + Fort Fast-Pass Entry
                  </span>
                  <span className="font-mono font-bold text-white">₹3,000</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2 border-white/20 text-base font-bold">
                  <span className="text-white uppercase tracking-wider font-mono">TOTAL ESTIMATED INVESTMENT</span>
                  <span className="font-mono text-xl text-[#e5dec9]">{expandedOption.price}</span>
                </div>
              </div>
            </div>
          </section>


          {/* ============================================================ */}
          {/* FINAL CALL TO ACTION (Magazine Finale)                      */}
          {/* ============================================================ */}
          <section className="pt-12 pb-16 text-center space-y-6">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#e5dec9] font-bold block">
                READY TO EXPERIENCE RAJASTHAN?
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
                Your Journey Awaits
              </h2>
              <p className="text-sm text-[#a89f91] font-sans">
                Every ticket, stay, and private transfer is coordinated automatically by TravelFlow AI. Live disruption buffers actively safeguard your time.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
              <button
                onClick={() => startJourney(expandedOption)}
                className="px-10 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-[#181411] hover:bg-[#eae5d9] transition-all hover:scale-105 cursor-pointer shadow-[0_0_35px_rgba(255,255,255,0.3)] flex items-center gap-2.5"
              >
                <span>START THIS JOURNEY NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={collapseOption}
                className="px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider text-[#a89f91] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                ← BACK TO ALL POSSIBILITIES
              </button>
            </div>
          </section>

        </div>

    </div>
  );
};
