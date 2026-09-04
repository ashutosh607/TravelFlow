import React, { createContext, useContext, useState } from "react";
import { 
  INITIAL_TRIP_STATE, 
  INITIAL_RECOMMENDATIONS, 
  DEFAULT_SAFETY_PRESETS,
  DISRUPTION_SCENARIO 
} from "../data/mockTravelData";

const TravelContext = createContext(null);

export const TravelProvider = ({ children }) => {
  const [tripData, setTripData] = useState(INITIAL_TRIP_STATE);
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [selectedOptionId, setSelectedOptionId] = useState("opt-1");
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [expandedOption, setExpandedOption] = useState(INITIAL_RECOMMENDATIONS[0]);
  const [activeView, setActiveView] = useState("landing"); // 'landing' | 'planner' | 'agent' | 'liveTrip'
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  // AI Agent Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      id: "m-1",
      sender: "ai",
      text: "Hello! I'm your TravelFlow AI Agent. I've analyzed your trip to Rajasthan for a Couple with a ₹40,000 budget and generated 3 curated journeys above. How would you like to refine them?",
      timestamp: "Just now"
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState("");

  // What-If Simulation
  const [activeWhatIf, setActiveWhatIf] = useState(null);

  // Real-Time Disruption & Trip Health
  const [disruptionState, setDisruptionState] = useState("none"); // 'none' | 'detected' | 'analyzing' | 'recovered'
  const [tripHealthScore, setTripHealthScore] = useState(94);
  const [disruptionData, setDisruptionData] = useState(DISRUPTION_SCENARIO);
  const [currentItinerary, setCurrentItinerary] = useState(INITIAL_RECOMMENDATIONS[0].dayWisePlan);
  const [showWhyExplanation, setShowWhyExplanation] = useState(false);

  // Update trip form data
  const updateTripData = (newData) => {
    setTripData(prev => {
      const updated = { ...prev, ...newData };
      // If group changed and safety requirements weren't manually overridden
      if (newData.travelGroup && DEFAULT_SAFETY_PRESETS[newData.travelGroup]) {
        updated.safetyRequirements = DEFAULT_SAFETY_PRESETS[newData.travelGroup];
      }
      return updated;
    });
  };

  // Submit trip planner form
  const submitTripPlan = (formData) => {
    const combined = { ...tripData, ...formData };
    setTripData(combined);
    setIsPlannerOpen(false);
    
    // Switch to AI Travel Agent view
    setIsThinking(true);
    setThinkingStep("Understanding your preferences...");
    setActiveView("agent");

    setTimeout(() => {
      setThinkingStep("Optimizing your journey...");
      setTimeout(() => {
        setThinkingStep("Finding the best options...");
        setTimeout(() => {
          setIsThinking(false);
          setThinkingStep("");
          // Tailor recommendations based on preferences
          const customRecs = INITIAL_RECOMMENDATIONS.map(rec => ({
            ...rec,
            title: combined.destination.includes("Udaipur") ? rec.title : `${combined.destination} Tour`,
            route: `${combined.startingLocation} → ${combined.destination} → ${combined.startingLocation}`,
            aiMatch: rec.id === "opt-3" && combined.travelGroup === "Couple" ? 98 : rec.aiMatch
          }));
          setRecommendations(customRecs);
          setChatMessages(prev => [
            ...prev,
            {
              id: `m-${Date.now()}`,
              sender: "ai",
              text: `I have tailored 3 specialized options for your ${combined.travelGroup} trip from ${combined.startingLocation} to ${combined.destination} with a budget of ${combined.budgetRange}. Click any floating journey to inspect its details or give me natural prompts to tweak anything!`,
              timestamp: "Just now"
            }
          ]);
        }, 800);
      }, 900);
    }, 900);
  };

  // Select card and expand cinematic view
  const expandOption = (optId) => {
    const opt = recommendations.find(r => r.id === optId) || recommendations[0];
    setSelectedOptionId(optId);
    setExpandedOption(opt);
    setIsCardExpanded(true);
  };

  const collapseOption = () => {
    setIsCardExpanded(false);
  };

  // Natural Language AI Modifications
  const sendAgentMessage = async (userPrompt) => {
    if (!userPrompt.trim()) return;

    const newMsg = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: userPrompt,
      timestamp: "Just now"
    };
    setChatMessages(prev => [...prev, newMsg]);
    setIsThinking(true);
    setThinkingStep("Understanding your preferences...");

    setTimeout(() => {
      setThinkingStep("Optimizing your journey...");
      setTimeout(() => {
        setThinkingStep("Finding the best options...");
        setTimeout(() => {
          setIsThinking(false);
          setThinkingStep("");
          processAgentPrompt(userPrompt);
        }, 800);
      }, 900);
    }, 800);
  };

  const processAgentPrompt = (prompt) => {
    const lower = prompt.toLowerCase();
    let aiResponse = "";
    let updatedRecs = [...recommendations];
    let whatIfData = null;

    if (lower.includes("romantic") || lower.includes("romance")) {
      aiResponse = "I've added private sunset boat cruises on Lake Pichola, reserved candlelight courtyard dining at Jag Mandir, and upgraded the stay to luxury heritage suites while keeping the budget optimized.";
      updatedRecs = updatedRecs.map(r => ({
        ...r,
        badge: "Enhanced Romantic Experience",
        aiMatch: Math.min(99, r.aiMatch + 4),
        description: "Curated with private sunset viewpoints, romantic royal dining, and serene lakeside heritage suites."
      }));
    } else if (lower.includes("30,000") || lower.includes("30000") || lower.includes("reduce") || lower.includes("budget")) {
      aiResponse = "I have optimized the budget down to ₹30,000. Replaced luxury flight transfers with executive AC Vande Bharat express, selected 4★ boutique havelis, and retained all top-rated monuments and dining without compromising quality.";
      updatedRecs = updatedRecs.map(r => ({
        ...r,
        price: "₹30,000",
        rawPrice: 30000,
        badge: "Smart Budget Optimized (₹30k)",
        budgetBreakdown: {
          travel: 9000,
          hotels: 9500,
          food: 4500,
          activities: 4500,
          localTransport: 2500,
          total: 30000
        }
      }));
    } else if (lower.includes("remove jodhpur") || lower.includes("jodhpur")) {
      aiResponse = "Removed Jodhpur from the route. Re-allocated your remaining time to a relaxed 3-day deep exploration of Udaipur with a private excursion to Kumbhalgarh Fort and Ranakpur marble temples.";
      updatedRecs = updatedRecs.map(r => r.id === "opt-3" ? {
        ...r,
        title: "Udaipur + Kumbhalgarh Heritage",
        route: "Mumbai → Udaipur → Kumbhalgarh → Mumbai",
        tags: ["Lake Pichola", "Kumbhalgarh Fort", "Private Villas", "Sunset Cruises"]
      } : r);
    } else if (lower.includes("one more day") || lower.includes("add day") || lower.includes("6 days")) {
      whatIfData = {
        title: "Simulation: Adding +1 Day (6 Days Total)",
        impactSummary: "Adds a full leisure day in Udaipur for artisan craft markets, Sajjangarh Monsoon Palace, and spa wellness.",
        costChange: "+₹4,500 (1 night boutique stay + meals)",
        scheduleChange: "Extends trip to Oct 21. No change in flight return fees with flexible TravelFlow protection.",
        actionLabel: "Apply 6-Day Extension",
        onApply: () => {
          setTripData(prev => ({ ...prev, days: 6 }));
          setRecommendations(prev => prev.map(r => ({
            ...r,
            duration: "6 Days",
            price: `₹${r.rawPrice + 4500}`,
            rawPrice: r.rawPrice + 4500
          })));
          setActiveWhatIf(null);
          setChatMessages(p => [...p, {
            id: `m-${Date.now()}`,
            sender: "ai",
            text: "Applied! Your journey has been updated to 6 days with an added spa and sunset leisure day.",
            timestamp: "Just now"
          }]);
        }
      };
      aiResponse = "I simulated adding +1 day (6 days total). Here is the breakdown of the schedule and cost impact below. You can apply it directly.";
    } else if (lower.includes("rain") || lower.includes("weather")) {
      whatIfData = {
        title: "Weather Simulation: Heavy Rain on Day 2",
        impactSummary: "Outdoor Amber Fort hike moved to morning dry slot. Replaced open jeep safari with City Palace Museum, Vintage Car Gallery, and indoor royal tea lounge.",
        costChange: "₹0 (Zero extra charge)",
        scheduleChange: "Outdoor activities shifted seamlessly to Day 3 sunny forecast.",
        actionLabel: "Apply Weather-Aware Schedule",
        onApply: () => {
          setActiveWhatIf(null);
          setChatMessages(p => [...p, {
            id: `m-${Date.now()}`,
            sender: "ai",
            text: "Applied weather adaptation! Outdoor activities on Day 2 are protected and replaced with indoor royal gallery experiences.",
            timestamp: "Just now"
          }]);
        }
      };
      aiResponse = "I've simulated the weather disruption. TravelFlow automatically detects heavy rain forecasts and swaps outdoor ghat walks for indoor palace galleries.";
    } else if (lower.includes("flight gets cancelled") || lower.includes("cancelled")) {
      whatIfData = {
        title: "Simulation: Flight Cancellation Contingency",
        impactSummary: "Instant rerouting to next fastest flight (Vistara departing +2h) or Executive Vande Bharat Train with hotel pickup notification.",
        costChange: "Covered by TravelFlow Free Rebooking Guarantee",
        scheduleChange: "Day 1 itinerary automatically compressed without missing major sunset dinner.",
        actionLabel: "Simulate Live Reroute",
        onApply: () => {
          setActiveWhatIf(null);
          triggerDisruption();
        }
      };
      aiResponse = "Here is the contingency plan: TravelFlow instantly finds 3 alternatives (Fastest Flight, Executive Express Train, or Auto-Shifted Itinerary) and rebooks seamlessly.";
    } else if (lower.includes("person joins") || lower.includes("more person")) {
      whatIfData = {
        title: "Simulation: +1 Traveller Joining (3 Travellers)",
        impactSummary: "Upgrade standard sedan to spacious 6-seater Innova Crysta; upgrade hotel to Family/Triple Heritage Suite.",
        costChange: "Total trip becomes ₹49,500 (₹16,500 / person, saving 12% per person)",
        scheduleChange: "All activity tickets automatically updated for 3 guests.",
        actionLabel: "Apply 3-Person Plan",
        onApply: () => {
          setTripData(prev => ({ ...prev, travellers: 3 }));
          setActiveWhatIf(null);
          setChatMessages(p => [...p, {
            id: `m-${Date.now()}`,
            sender: "ai",
            text: "Updated to 3 travellers! Per-person cost reduced with shared transport and suite booking.",
            timestamp: "Just now"
          }]);
        }
      };
      aiResponse = "I calculated the group dynamics for 3 people. Adding 1 person reduces the individual cost by ₹3,500 due to shared private transport!";
    } else {
      aiResponse = `I've analyzed your request: "${prompt}". I updated the scheduling, transport buffers, and activity pacing to match your exact instructions.`;
    }

    setRecommendations(updatedRecs);
    if (expandedOption) {
      const current = updatedRecs.find(r => r.id === expandedOption.id) || updatedRecs[0];
      setExpandedOption(current);
    }
    setActiveWhatIf(whatIfData);

    setChatMessages(prev => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: "ai",
        text: aiResponse,
        timestamp: "Just now"
      }
    ]);
  };

  // Transition from Planning to Live Trip Management
  const startJourney = () => {
    setIsCardExpanded(false);
    setActiveView("liveTrip");
    setDisruptionState("none");
    setTripHealthScore(94);
  };

  // Disruption Simulation Triggers
  const triggerDisruption = (scenarioKey = "flight_delay") => {
    setDisruptionState("detected");
    setTripHealthScore(61);
  };

  const applyDisruptionRecovery = () => {
    setDisruptionState("analyzing");
    setTimeout(() => {
      setDisruptionState("recovered");
      setTripHealthScore(84);
      
      // Update itinerary to recovered version
      const recoveredPlan = JSON.parse(JSON.stringify(INITIAL_RECOMMENDATIONS[0].dayWisePlan));
      // Shift City palace from Day 1 to Day 2
      if (recoveredPlan[0] && recoveredPlan[1]) {
        recoveredPlan[0].activities = [
          { time: "01:00 PM", title: "Delayed Flight Arrival at Jaipur (6E-204)", cost: "Included", duration: "30m", travelTime: "30m", transit: "Airport Cab", availability: "Delayed +3h", status: "delayed", desc: "Arrived safely at 1:00 PM. TravelFlow fast-tracked luggage & driver greeting." },
          { time: "02:00 PM", title: "Check-in & Courtyard Lunch at Alsisar Haveli", cost: "Included", duration: "1h 30m", travelTime: "20m", transit: "Private Cab", availability: "Pre-arranged", status: "recovered", desc: "Relaxed in-hotel lunch without rushed midday transit." },
          { time: "04:30 PM", title: "Afternoon Rest & Haveli Heritage Walk", cost: "Free", duration: "1h 30m", travelTime: "—", transit: "Walk", availability: "Open", status: "recovered", desc: "Freshen up, enjoy royal courtyard tea and photography." },
          { time: "06:30 PM", title: "Hawa Mahal Sunset Photography & Café", cost: "₹500", duration: "1h 30m", travelTime: "15m", transit: "Private Cab", availability: "Reserved", status: "on_time", desc: "Golden hour view preserved perfectly." },
          { time: "08:30 PM", title: "Candlelight Courtyard Dinner with Sitar Music", cost: "₹2,000", duration: "2h", travelTime: "15m", transit: "Private Cab", availability: "Confirmed", status: "on_time", desc: "Romantic dinner preserved on schedule." }
        ];
        recoveredPlan[1].activities.unshift({
          time: "09:30 AM",
          title: "City Palace & Jantar Mantar Tour (Rescheduled)",
          cost: "₹700",
          duration: "2h 30m",
          travelTime: "20m",
          transit: "Private Cab",
          availability: "VIP Fast-Track Pass",
          status: "recovered",
          desc: "Shifted from Day 1 to optimal morning lighting with zero rush."
        });
      }
      setCurrentItinerary(recoveredPlan);
    }, 1200);
  };

  const resetDisruption = () => {
    setDisruptionState("none");
    setTripHealthScore(94);
    setCurrentItinerary(INITIAL_RECOMMENDATIONS[0].dayWisePlan);
    setShowWhyExplanation(false);
  };

  return (
    <TravelContext.Provider
      value={{
        tripData,
        updateTripData,
        recommendations,
        selectedOptionId,
        setSelectedOptionId,
        isCardExpanded,
        expandedOption,
        expandOption,
        collapseOption,
        activeView,
        setActiveView,
        isPlannerOpen,
        setIsPlannerOpen,
        submitTripPlan,
        chatMessages,
        isThinking,
        thinkingStep,
        sendAgentMessage,
        activeWhatIf,
        setActiveWhatIf,
        startJourney,
        disruptionState,
        tripHealthScore,
        disruptionData,
        currentItinerary,
        triggerDisruption,
        applyDisruptionRecovery,
        resetDisruption,
        showWhyExplanation,
        setShowWhyExplanation
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error("useTravel must be used within a TravelProvider");
  }
  return context;
};
