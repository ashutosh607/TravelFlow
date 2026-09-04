export const INITIAL_TRIP_STATE = {
  startingLocation: "Mumbai",
  destination: "Rajasthan (Jaipur & Udaipur)",
  startDate: "2026-10-15",
  endDate: "2026-10-20",
  days: 5,
  travellers: 2,
  budgetRange: "₹35,000 - ₹45,000",
  budgetNumber: 40000,
  preferredMode: "Flight + Private Cab",
  travelGroup: "Couple",
  preferences: ["Romance", "History & Culture", "Photography", "Food", "Relaxation"],
  safetyRequirements: [
    "Romantic sunset dinner reservations",
    "Couple-friendly boutique heritage stays",
    "Comfortable private AC transfers",
    "Photography-friendly relaxed pacing"
  ],
};

export const TRAVEL_GROUP_OPTIONS = [
  { id: "Solo", label: "Solo", icon: "User", desc: "Well-connected stays, self-discovery & safety" },
  { id: "Couple", label: "Couple / Partner", icon: "Heart", desc: "Romantic escapes, sunset dinners & private stays" },
  { id: "Family", label: "Family", icon: "Users", desc: "Balanced schedules, spacious stays & all-age comfort" },
  { id: "Family with Children", label: "Family with Children", icon: "Baby", desc: "Child-friendly hotels, rest breaks & nearby clinics" },
  { id: "Family with Senior Citizens", label: "Family with Senior Citizens", icon: "Shield", desc: "Step-free access, less walking & close hospitals" },
  { id: "Friends", label: "Friends", icon: "PartyPopper", desc: "Adventure, nightlife, group stays & shared memories" },
  { id: "Couple + Friends", label: "Couple + Friends", icon: "Sparkles", desc: "Curated social experiences with private comfort" },
  { id: "Business", label: "Business", icon: "Briefcase", desc: "High-speed Wi-Fi, premium lounges & punctual transit" },
  { id: "Custom Group", label: "Custom Group", icon: "Globe", desc: "Customized group dynamics and shared logistics" }
];

export const PREFERENCE_OPTIONS = [
  { id: "Adventure", label: "Adventure", icon: "Compass" },
  { id: "Romance", label: "Romance", icon: "Heart" },
  { id: "Relaxation", label: "Relaxation", icon: "Coffee" },
  { id: "Food", label: "Food & Culinary", icon: "Utensils" },
  { id: "Photography", label: "Photography", icon: "Camera" },
  { id: "History & Culture", label: "History & Culture", icon: "Landmark" },
  { id: "Nature", label: "Nature & Wildlife", icon: "Trees" },
  { id: "Shopping", label: "Boutique Shopping", icon: "ShoppingBag" },
  { id: "Nightlife", label: "Nightlife & Lounges", icon: "Moon" },
  { id: "Family-friendly", label: "Family-Friendly", icon: "Smile" },
  { id: "Budget", label: "Budget Travel", icon: "PiggyBank" },
  { id: "Luxury", label: "Luxury & Heritage", icon: "Crown" }
];

export const DEFAULT_SAFETY_PRESETS = {
  "Solo": [
    "Verified stays in central well-lit areas",
    "24/7 emergency response & SOS button",
    "Convenient transit with live driver tracking",
    "Safe solo dining and local verified guides"
  ],
  "Couple": [
    "Romantic sunset/sunrise private experiences",
    "Couple-friendly boutique luxury heritage stays",
    "Candlelight dining and photography spots",
    "Relaxed pacing with late check-outs"
  ],
  "Family": [
    "Spacious family suites with interconnected rooms",
    "Balanced sightseeing without physical fatigue",
    "Accessible dining with multi-cuisine options",
    "Comfortable private tempo / SUV transit"
  ],
  "Family with Children": [
    "Child-friendly hotels with baby cribs & pools",
    "Less hectic schedules with built-in afternoon rest",
    "Convenient private transport with car seats",
    "Verified nearby pediatric medical facilities"
  ],
  "Family with Senior Citizens": [
    "Minimal walking, elevator & wheelchair accessibility",
    "Fewer stairs at monuments with battery cart access",
    "Comfortable low-floor AC transportation",
    "Close proximity to top multi-specialty hospitals"
  ],
  "Friends": [
    "Adventure outings and evening rooftop nightlife",
    "Group stays with shared pool/villas",
    "Group expense splitting integrated in real time",
    "Fast private group van for spontaneous stops"
  ],
  "Couple + Friends": [
    "Private couples suites within shared luxury villa",
    "Mix of romantic dinners and group party events",
    "Group voting on daily highlighted excursions"
  ],
  "Business": [
    "Express airport transfers with fast-track check-in",
    "Dedicated high-speed workspace & lounge access",
    "Flexible cancellation and rebooking safety net"
  ],
  "Custom Group": [
    "Multi-vehicle synchronized dispatch",
    "Comprehensive group medical and travel insurance",
    "Custom dietary preference compliance"
  ]
};

export const INITIAL_RECOMMENDATIONS = [
  {
    id: "opt-1",
    tag: "OPTION 01",
    theme: "BALANCED",
    badge: "Balanced Pacing & Heritage",
    title: "Jaipur + Udaipur",
    route: "Mumbai → Jaipur → Udaipur → Mumbai",
    duration: "5 Days",
    price: "₹37,000",
    rawPrice: 37000,
    aiMatch: 94,
    description: "A harmonious fusion of grand royal palaces, lakeside romance, and cultural immersion.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    tags: ["Royal Forts", "Lake Pichola", "Boutique Stays", "Fine Dining"],
    budgetBreakdown: {
      travel: 12000,
      hotels: 12000,
      food: 5500,
      activities: 4500,
      localTransport: 3000,
      total: 37000
    },
    highlights: [
      { title: "Transport", detail: "Return Flight (IndiGo) + Private AC Sedan for 5 days" },
      { title: "Hotels", detail: "4★ Heritage Haveli in Jaipur + Lake View Luxury in Udaipur" },
      { title: "Food", detail: "Royal Rajasthani Thali at Chokhi Dhani + Candlelight Lake Dining" },
      { title: "Key Sights", detail: "Amber Fort, City Palace, Hawa Mahal, Jag Mandir Boat Cruise" }
    ],
    dayWisePlan: [
      {
        day: 1,
        date: "Oct 15",
        city: "Jaipur",
        summary: "Arrival & The Pink City Grand Welcome",
        activities: [
          { time: "10:00 AM", title: "Flight Arrival at Jaipur (JAI)", cost: "Included", duration: "45m", travelTime: "30m", transit: "Airport Cab", availability: "Confirmed", status: "on_time", desc: "Arrival on 6E-204 from Mumbai. Driver meets at Gate 2." },
          { time: "11:30 AM", title: "Transfer & Check-in at Alsisar Haveli", cost: "Included", duration: "1h", travelTime: "20m", transit: "Private AC Cab", availability: "Pre-checked in", status: "on_time", desc: "Heritage room with royal courtyard view and welcome drink." },
          { time: "01:00 PM", title: "Traditional Rajasthani Lunch", cost: "₹1,200", duration: "1h 30m", travelTime: "15m", transit: "Walk / Short Cab", availability: "Reserved", status: "on_time", desc: "Gourmet dining at Handi Restaurant with authentic Laal Maas / Ker Sangri." },
          { time: "03:30 PM", title: "City Palace & Jantar Mantar Tour", cost: "₹700", duration: "2h 30m", travelTime: "20m", transit: "Private Cab", availability: "Fast-Track Pass", status: "on_time", desc: "Explore Chandra Mahal courtyards with private licensed guide." },
          { time: "06:30 PM", title: "Hawa Mahal Sunset Photography & Café", cost: "₹500", duration: "1h 30m", travelTime: "10m", transit: "Walk", availability: "Open", status: "on_time", desc: "Golden hour viewpoint from Tattoo Café facing the façade." },
          { time: "08:30 PM", title: "Royal Courtyard Dinner with Folk Dance", cost: "₹2,000", duration: "2h", travelTime: "15m", transit: "Private Cab", availability: "Table Booked", status: "on_time", desc: "Live sitar music and candlelit dinner under open skies." }
        ]
      },
      {
        day: 2,
        date: "Oct 16",
        city: "Jaipur",
        summary: "Majestic Forts & Artisan Bazaars",
        activities: [
          { time: "08:30 AM", title: "Breakfast at Haveli Courtyard", cost: "Included", duration: "1h", travelTime: "—", transit: "—", availability: "Buffet", status: "on_time", desc: "Fresh fruits, parathas and masala chai." },
          { time: "10:00 AM", title: "Amber Fort & Sheesh Mahal Exploration", cost: "₹1,000", duration: "3h", travelTime: "35m", transit: "Private Cab", availability: "Audio Guide Included", status: "on_time", desc: "Marvel at the mirror work palace and Maota Lake panoramic overlook." },
          { time: "02:00 PM", title: "Panna Meena ka Kund & Jal Mahal Stop", cost: "Free", duration: "1h", travelTime: "15m", transit: "Private Cab", availability: "Public", status: "on_time", desc: "Geometric stepwell photo session and view of the water palace." },
          { time: "04:30 PM", title: "Johari & Bapu Bazaar Walk", cost: "Flexible", duration: "2h", travelTime: "25m", transit: "Private Cab", availability: "Open", status: "on_time", desc: "Handcrafted textiles, blue pottery, and silver jewelry artisan stalls." },
          { time: "08:00 PM", title: "Rooftop Dinner at Nahargarh Fort", cost: "₹2,400", duration: "2h", travelTime: "30m", transit: "Private Cab", availability: "Reserved Window Table", status: "on_time", desc: "Stunning night view of illuminated Jaipur city below." }
        ]
      },
      {
        day: 3,
        date: "Oct 17",
        city: "Jaipur ➔ Udaipur",
        summary: "Scenic Transit to the City of Lakes",
        activities: [
          { time: "08:00 AM", title: "Morning AC Executive Train / Private Flight to Udaipur", cost: "Included", duration: "3h 30m", travelTime: "1h to Station", transit: "Vande Bharat / Express", availability: "Executive Chair Car", status: "on_time", desc: "Comfortable scenic ride across Aravalli mountain ranges." },
          { time: "12:30 PM", title: "Check-in at Fateh Prakash Palace / Jagat Niwas", cost: "Included", duration: "1h", travelTime: "20m", transit: "Private Cab", availability: "Lakefront Suite", status: "on_time", desc: "Direct views of Lake Pichola and the white marble island palace." },
          { time: "02:00 PM", title: "Lake-facing Mediterranean Lunch", cost: "₹1,500", duration: "1h 30m", travelTime: "10m", transit: "Walk", availability: "Reserved", status: "on_time", desc: "Upré by 1559 AD overlooking the glistening lake." },
          { time: "04:30 PM", title: "Bagore Ki Haveli & Gangaur Ghat Walk", cost: "₹400", duration: "2h", travelTime: "10m", transit: "Walk", availability: "Open", status: "on_time", desc: "Quiet stroll along heritage ghats with pigeons and temple bells." },
          { time: "07:00 PM", title: "Dharohar Folk Dance & Puppet Performance", cost: "₹600", duration: "1h 30m", travelTime: "Walk", transit: "Walk", availability: "Front Row Booked", status: "on_time", desc: "Vibrant cultural celebration with fire stunts and Rajasthani rhythm." }
        ]
      },
      {
        day: 4,
        date: "Oct 18",
        city: "Udaipur",
        summary: "Romantic Lake Pichola & Palaces",
        activities: [
          { time: "09:30 AM", title: "Udaipur City Palace Complex & Crystal Gallery", cost: "₹800", duration: "3h", travelTime: "15m", transit: "Private Cab", availability: "Fast Pass", status: "on_time", desc: "Largest palace complex in Rajasthan with breathtaking peacock mosaics." },
          { time: "01:30 PM", title: "Rooftop Lunch at Ambrai Restaurant", cost: "₹1,800", duration: "1h 30m", travelTime: "15m", transit: "Private Boat / Cab", availability: "Reserved Water Edge", status: "on_time", desc: "Unmatched view of City Palace mirrored on Lake Pichola." },
          { time: "04:30 PM", title: "Private Solar Boat Cruise to Jag Mandir Island", cost: "₹1,200", duration: "2h", travelTime: "Boat", transit: "Private Boat", availability: "Sunset Slot Booked", status: "on_time", desc: "Sip mocktails on the marble courtyard as the sun sets behind Aravalli hills." },
          { time: "08:30 PM", title: "Candlelight Dinner at Tribute Lakeside", cost: "₹2,500", duration: "2h", travelTime: "20m", transit: "Private Cab", availability: "Confirmed", status: "on_time", desc: "Romantic gourmet dining celebrating Udaipur's equestrian legacy." }
        ]
      },
      {
        day: 5,
        date: "Oct 19",
        city: "Udaipur ➔ Mumbai",
        summary: "Monsoon Palace & Departure",
        activities: [
          { time: "09:30 AM", title: "Sajjangarh (Monsoon Palace) Hilltop Vista", cost: "₹400", duration: "2h", travelTime: "30m", transit: "Private Cab", availability: "Open", status: "on_time", desc: "Panoramic 360-degree view of Udaipur lakes and lush sanctuary." },
          { time: "12:30 PM", title: "Souvenir Shopping at Hathipole Art Market", cost: "Flexible", duration: "1h 30m", travelTime: "20m", transit: "Cab", availability: "Open", status: "on_time", desc: "Miniature Pichwai paintings and authentic hand-carved keepsakes." },
          { time: "03:30 PM", title: "Airport Transfer to Udaipur Maharana Pratap (UDR)", cost: "Included", duration: "45m", travelTime: "40m", transit: "Private Cab", availability: "Scheduled", status: "on_time", desc: "Smooth drop-off 2 hours before flight." },
          { time: "05:45 PM", title: "Return Flight to Mumbai (BOM)", cost: "Included", duration: "1h 25m", travelTime: "Flight", transit: "IndiGo 6E-782", availability: "Seats Assigned", status: "on_time", desc: "Arrive in Mumbai relaxed with all memories saved in TravelFlow." }
        ]
      }
    ]
  },
  {
    id: "opt-2",
    tag: "OPTION 02",
    theme: "ADVENTURE",
    badge: "Thrill, Nature & Fort Treks",
    title: "Jaipur + Mount Abu",
    route: "Mumbai → Jaipur → Mount Abu → Mumbai",
    duration: "5 Days",
    price: "₹34,000",
    rawPrice: 34000,
    aiMatch: 91,
    description: "Adrenaline-fueled desert excursions, mountain cycling, Dilwara carvings, and Nakki Lake kayaking.",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    tags: ["Hot Air Balloon", "Hill Station", "Trekking", "Budget Optimized"],
    budgetBreakdown: {
      travel: 11000,
      hotels: 10000,
      food: 5000,
      activities: 5000,
      localTransport: 3000,
      total: 34000
    },
    highlights: [
      { title: "Transport", detail: "Return Flights + AC Mountain Transit & Self-Drive option" },
      { title: "Hotels", detail: "Eco Adventure Resort in Jaipur + Hilltop Cabin in Mount Abu" },
      { title: "Key Thrills", detail: "Sunrise Hot Air Ballooning, Guru Shikhar Trek, Nakki Boating" },
      { title: "Food", detail: "Rustic Campfire Barbeques & Mountain View Cafes" }
    ],
    dayWisePlan: []
  },
  {
    id: "opt-3",
    tag: "OPTION 03",
    theme: "ROMANTIC & LUXURY",
    badge: "Highest AI Match for Couples",
    title: "Udaipur + Jodhpur",
    route: "Mumbai → Udaipur → Jodhpur → Mumbai",
    duration: "5 Days",
    price: "₹40,000",
    rawPrice: 40000,
    aiMatch: 96,
    description: "Opulent royal palaces, blue city rooftop lounges, private butler service, and private lake yacht.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    tags: ["Royal Palaces", "Blue City", "Private Yacht", "Fine Dining"],
    budgetBreakdown: {
      travel: 13500,
      hotels: 14000,
      food: 6000,
      activities: 4000,
      localTransport: 2500,
      total: 40000
    },
    highlights: [
      { title: "Transport", detail: "Premium Class Flights + Luxury Chauffeur Mercedes / Innova Crysta" },
      { title: "Hotels", detail: "Heritage 5★ Palace Suite with Jacuzzi & City View" },
      { title: "Experiences", detail: "Private Lake Pichola Yacht, Mehrangarh Private Night Tour" },
      { title: "Food", detail: "Curated 7-course Chef's Royal Tasting Dinner" }
    ],
    dayWisePlan: []
  }
];

export const DISRUPTION_SCENARIO = {
  id: "flight_delay_mumbai_jaipur",
  title: "Flight Delay Detected (IndiGo 6E-204)",
  airline: "IndiGo 6E-204 (BOM ➔ JAI)",
  originalArrival: "10:00 AM",
  newArrival: "01:00 PM (+3 Hours Delay)",
  reason: "Air Traffic Congestion & Late Inbound Aircraft at Mumbai",
  impactScoreBefore: 87,
  impactScoreDisrupted: 61,
  impactScoreRecovered: 84,
  cascadeImpacts: [
    { step: 1, text: "Flight delayed by 180 minutes at BOM", severity: "high" },
    { step: 2, text: "Arrival shifted from 10:00 AM to 01:00 PM", severity: "high" },
    { step: 3, text: "Airport transfer shifted to 01:15 PM", severity: "medium" },
    { step: 4, text: "Hotel check-in at Alsisar Haveli pushed to 02:00 PM", severity: "medium" },
    { step: 5, text: "Missed scheduled 01:00 PM Lunch & 03:30 PM City Palace slot", severity: "critical" },
    { step: 6, text: "Sunset at Hawa Mahal at risk of conflict", severity: "high" }
  ],
  travellerDecisionLogic: {
    "Couple": "Preserve the romantic candlelit courtyard dinner and Hawa Mahal sunset photo experience by seamlessly rescheduling City Palace to Day 2 morning.",
    "Family with Children": "Eliminate rushed midday transit, add a 1-hour hotel relaxation break with snacks, and shift sightseeing to early afternoon tomorrow.",
    "Family with Senior Citizens": "Cancel high-stair monument stops for Day 1, arrange expedited low-floor cab check-in, and provide relaxed garden high tea.",
    "Friends": "Maintain the Nahargarh sunset and evening rooftop lounge by fast-tracking check-in and moving palace exploration."
  },
  aiRecoveryPlan: {
    summary: "TravelFlow AI has automatically reconstructed Day 1 & Day 2 timelines without cancelling any major experiences or incurring change penalties.",
    modifications: [
      {
        action: "Rescheduled",
        activity: "City Palace & Jantar Mantar Tour",
        from: "Day 1, 03:30 PM",
        to: "Day 2, 10:00 AM",
        why: "Preserves full 2.5 hour guided experience during optimal morning lighting with zero rush."
      },
      {
        action: "Adjusted",
        activity: "Check-in & Quick Lunch",
        from: "Day 1, 12:00 PM",
        to: "Day 1, 02:15 PM (In-hotel Haveli Courtyard Dining)",
        why: "Saved 45m transit by shifting lunch inside the heritage hotel upon arrival."
      },
      {
        action: "Preserved",
        activity: "Hawa Mahal Sunset & Royal Dinner",
        from: "Day 1, 06:30 PM onwards",
        to: "Day 1, 06:00 PM onwards (On schedule)",
        why: "Romantic evening ambiance maintained flawlessly."
      }
    ],
    whyExplanation: "Your flight 6E-204 is arriving 3 hours later than scheduled (1:00 PM instead of 10:00 AM). Sticking to the old plan would mean rushing through check-in and arriving at City Palace 15 minutes before ticket counters close. I moved City Palace to Day 2 at 10:00 AM where ticket slots are open, rearranged Day 1 afternoon for relaxed haveli dining, and kept your Hawa Mahal sunset photography and candlelit dinner intact. Total extra cost: ₹0. Trip Health restored from 61/100 to 84/100."
  },
  alternatives: [
    {
      type: "Fastest Alternative",
      mode: "Air India AI-442",
      departure: "11:15 AM",
      arrival: "12:45 PM",
      fareDiff: "+₹2,200 / person",
      tag: "Arrive 15 mins earlier",
      recommended: false
    },
    {
      type: "AI Re-optimized Plan (Recommended)",
      mode: "Stay on Current Flight + Auto-Shift Itinerary",
      departure: "11:30 AM",
      arrival: "01:00 PM",
      fareDiff: "₹0 (Free)",
      tag: "Best Value & Zero Stress",
      recommended: true
    },
    {
      type: "Express Train Alternative",
      mode: "Vande Bharat Superfast (Overnight)",
      departure: "09:30 PM",
      arrival: "07:00 AM Next Day",
      fareDiff: "Save ₹1,800 / person",
      tag: "Cheapest Option",
      recommended: false
    }
  ]
};

export const MOCK_CHAT_PROMPTS = [
  { text: "Make it more romantic", type: "romance" },
  { text: "Reduce my budget to ₹30,000", type: "budget" },
  { text: "Remove Jodhpur", type: "remove_city" },
  { text: "Add one more day", type: "add_day" },
  { text: "What if it rains on Day 2?", type: "what_if_rain" },
  { text: "What if my flight gets cancelled?", type: "what_if_flight" },
  { text: "What if one more person joins?", type: "what_if_person" }
];
