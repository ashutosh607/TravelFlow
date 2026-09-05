import React from "react";
import { Sparkles, Compass, Heart, ArrowUpRight } from "lucide-react";
import { useTravel } from "../../context/TravelContext";

export const FloatingRecommendationCards = () => {
  const { recommendations, expandOption, setActiveView } = useTravel();

  const handleCardClick = (id) => {
    setActiveView("agent");
    expandOption(id);
  };

  const getThemeIcon = (theme) => {
    if (theme.includes("ROMANTIC")) return <Heart className="w-3.5 h-3.5 text-[#C9A86A]" />;
    if (theme.includes("ADVENTURE")) return <Compass className="w-3.5 h-3.5 text-[#C9A86A]" />;
    return <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />;
  };

  const getBadgeStyle = (theme) => {
    return "border-[rgba(201,168,106,0.35)] text-[#C9A86A] bg-[rgba(201,168,106,0.15)]";
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Grid on mobile, absolute floating spatial layout on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
        {recommendations.map((item, index) => {
          // Custom spatial positioning & subtle float offsets
          const floatDelayClass = index === 0 ? "animate-float-1" : index === 1 ? "animate-float-2" : "animate-float-3";
          const transformStyle = index === 0 
            ? "md:-rotate-2 md:translate-y-4" 
            : index === 1 
            ? "md:translate-y-[-16px]" 
            : "md:rotate-2 md:translate-y-8";

          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] ${floatDelayClass} ${transformStyle}`}
            >
              <div className="relative rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-white/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:shadow-[0_25px_60px_rgba(201,168,106,0.12)] transition-all">
                {/* Destination Preview Image with Dark Gradient Vignette */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-neutral-300">
                      {item.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-[rgba(201,168,106,0.15)] backdrop-blur-md border border-[rgba(201,168,106,0.35)] text-[#C9A86A]">
                      <Sparkles className="w-3 h-3 text-[#C9A86A]" />
                      {item.aiMatch}% AI Match
                    </span>
                  </div>

                  {/* Theme Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-md border ${getBadgeStyle(item.theme)}`}>
                      {getThemeIcon(item.theme)}
                      {item.theme}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-[#C9A86A] transition-colors flex items-center justify-between">
                      {item.title}
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#C9A86A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono mt-1 tracking-wide">
                      {item.route}
                    </p>
                  </div>

                  {/* Specs & Pricing */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-mono">
                        Duration
                      </span>
                      <span className="text-sm font-medium text-neutral-200">
                        {item.duration}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-mono">
                        Est. Investment
                      </span>
                      <span className="text-base font-semibold text-[#C9A86A]">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* AI Feature Pill tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle bottom glow highlight */}
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#C9A86A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
