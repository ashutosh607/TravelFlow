"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Plane } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';

import innerImage from "../../assets/innerImage.webp";
import outerImage from "../../assets/outerImage.webp";
import shadowImage from "../../assets/shadowImage.webp";
import skyImage from "../../assets/skyImage.webp";
import cloudsImage from "../../assets/cloudsImage.webp";
import aboveImage from "../../assets/aboveImage.webp";

gsap.registerPlugin(ScrollTrigger);

export const CinematicScrollHero = () => {
    const scopeRef = useRef(null);
    const mainContainer = useRef(null);
    const windowRef = useRef(null);
    const contentRef = useRef(null);
    const logoRef = useRef(null);
    const secondSectionRef = useRef(null);
    const cloudRef = useRef(null);
    const revealRef = useRef(null);

    const { setIsPlannerOpen, setActiveView, expandOption } = useTravel();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set explicit initial states so reverse scrolling ALWAYS recovers cleanly
            gsap.set(".hero-text-left", { x: 0, opacity: 1, filter: "blur(0px)", scale: 1 });
            gsap.set(".hero-text-right", { x: 0, opacity: 1, filter: "blur(0px)", scale: 1 });
            gsap.set(".scroll-indicator", { opacity: 1 });
            gsap.set(windowRef.current, { scale: 1 });
            gsap.set(logoRef.current, { y: 0, scale: 1 });
            gsap.set(secondSectionRef.current, { opacity: 0, y: 80, filter: "blur(12px)" });

            // Subtle cinematic entrance/reveal for Hero elements: blur(8px) + opacity 0 + translateY(30px) -> blur(0) + opacity 1 + translateY(0)
            const heroEntranceTl = gsap.timeline({ delay: 0.15 });
            heroEntranceTl
                .fromTo(".hero-line-left",
                    { y: 30, opacity: 0, filter: "blur(8px)" },
                    { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.18, ease: "power2.out" }
                )
                .fromTo(".hero-line-right",
                    { y: 30, opacity: 0, filter: "blur(8px)" },
                    { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.18, ease: "power2.out" },
                    "-=0.9"
                )
                .fromTo(".hero-sub-left",
                    { y: 20, opacity: 0, filter: "blur(6px)" },
                    { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
                    "-=0.7"
                )
                .fromTo(".scroll-indicator",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
                    "-=0.5"
                );

            // Slow, peaceful horizontal cloud drift behind the airplane window
            gsap.to(cloudRef.current, {
                xPercent: -50,
                duration: 50,
                ease: "none",
                repeat: -1
            });

            // Master GSAP pinned scroll timeline:
            // Generous end distance (+=480%) and scrub (1.8) gives slow, smooth, physical control
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainContainer.current,
                    start: "top top",
                    end: "+=480%",
                    scrub: 1.8,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // 1. Slow, gradual zoom through the airplane window into open sky
            tl.to(windowRef.current, {
                scale: 6.2,
                rotation: 0.01,
                force3D: true,
                duration: 12,
                ease: "power1.inOut"
            }, 0)
            // 2. Left headline exits gently to the left with blur
            .to(".hero-text-left", {
                x: -240,
                filter: "blur(16px)",
                opacity: 0,
                scale: 1.04,
                duration: 8,
                ease: "power1.inOut"
            }, 0)
            // 3. Right headline exits gently to the right with blur
            .to(".hero-text-right", {
                x: 240,
                filter: "blur(16px)",
                opacity: 0,
                scale: 1.04,
                duration: 8,
                ease: "power1.inOut"
            }, 0)
            // 4. Scroll indicator fades
            .to(".scroll-indicator", {
                opacity: 0,
                duration: 2.5,
                ease: "power1.out"
            }, 0);

            // 5. Center Logo moves up into top navbar smoothly
            const logoMoveFactor = window.innerWidth < 1024 ? 0.43 : 0.44;
            tl.to(logoRef.current, {
                y: -window.innerHeight * logoMoveFactor,
                scale: 0.6,
                duration: 9,
                ease: "power1.inOut"
            }, 1.2);

            // 6. In-Sky Storytelling & Floating Recommendation Cards Reveal
            tl.fromTo(secondSectionRef.current,
                {
                    opacity: 0,
                    y: 90,
                    scale: 0.94,
                    filter: "blur(12px)"
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 8,
                    ease: "power1.out"
                },
                7.5
            )
            // 7. Card 1 enters from left with blur
            .fromTo(".sky-card-1",
                {
                    x: -160,
                    opacity: 0,
                    filter: "blur(16px)",
                    rotation: -6
                },
                {
                    x: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    rotation: -2,
                    duration: 7,
                    ease: "power1.out"
                },
                8.0
            )
            // 8. Card 2 enters from bottom with blur
            .fromTo(".sky-card-2",
                {
                    y: 130,
                    opacity: 0,
                    filter: "blur(16px)"
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 7,
                    ease: "power1.out"
                },
                8.3
            )
            // 9. Card 3 enters from right with blur
            .fromTo(".sky-card-3",
                {
                    x: 160,
                    opacity: 0,
                    filter: "blur(16px)",
                    rotation: 6
                },
                {
                    x: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    rotation: 2,
                    duration: 7,
                    ease: "power1.out"
                },
                8.6
            );

        }, scopeRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={scopeRef} className="relative w-full">
            
            {/* ============================================================ */}
            {/* 1. ANIMATED CENTER LOGO (Flies to navbar on scroll) */}
            {/* ============================================================ */}
            <div className="fixed inset-0 flex items-center justify-center z-[120] pointer-events-none">
                <div 
                    ref={logoRef} 
                    onClick={() => setActiveView("landing")}
                    className="flex flex-col items-center justify-center pointer-events-auto cursor-pointer select-none will-change-transform"
                >
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[0.25em] text-white uppercase drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] font-sans">
                        TRAVELFLOW
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] text-[#d8d2c8] uppercase mt-1">
                        AI TRAVEL MANAGEMENT
                    </span>
                </div>
            </div>

            {/* ============================================================ */}
            {/* 2. MAIN HERO VIEWPORT CANVAS */}
            {/* ============================================================ */}
            <div ref={revealRef} className="relative w-full">
                
                {/* Pinned Viewport Container */}
                <div ref={mainContainer} className="relative w-full h-screen overflow-hidden">
                    
                    {/* ======================================================== */}
                    {/* SKY LAYER: Fullscreen bright blue sky */}
                    {/* ======================================================== */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <img
                            src={skyImage}
                            alt="Sky Background"
                            className="w-full h-full object-cover object-top pointer-events-none select-none"
                        />
                    </div>

                    {/* ======================================================== */}
                    {/* MOVING CLOUDS LAYER: Slow horizontal drift behind window */}
                    {/* ======================================================== */}
                    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                        <div
                            ref={cloudRef}
                            className="flex w-[200%] h-full"
                        >
                            <div className="relative w-full h-full shrink-0">
                                <img
                                    src={cloudsImage}
                                    alt="Clouds"
                                    className="w-full h-full object-cover opacity-85"
                                />
                            </div>
                            <div className="relative w-full h-full shrink-0">
                                <img
                                    src={cloudsImage}
                                    alt="Clouds"
                                    className="w-full h-full object-cover opacity-85"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* AIRPLANE WINDOW: Scales up gradually on scroll */}
                    {/* ======================================================== */}
                    <div 
                        ref={windowRef} 
                        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none will-change-transform" 
                        style={{ perspective: '1000px', backfaceVisibility: 'hidden' }}
                    >
                        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                            <img
                                src={innerImage}
                                alt="inner frame"
                                className="absolute inset-0 w-full h-full object-contain sm:object-cover scale-100 sm:scale-[1.28] z-10 select-none pointer-events-none"
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                            />
                            <img
                                src={shadowImage}
                                alt="shadow depth"
                                className="absolute inset-0 w-full h-full object-contain sm:object-cover scale-100 sm:scale-[1.50] opacity-50 z-20 select-none pointer-events-none"
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                            />
                            <img
                                src={outerImage}
                                alt="outer fuselage"
                                className="absolute inset-0 w-full h-full object-contain sm:object-cover scale-100 sm:scale-[1.28] z-30 select-none pointer-events-none"
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                            />
                            <div className="absolute top-[22.5%] left-[50%] md:top-[12%] md:left-[50%] -translate-x-1/2 w-[50%] md:w-[24%] h-auto z-40 pointer-events-none select-none">
                                <img 
                                    src={aboveImage} 
                                    alt="above fixture" 
                                    className="w-full h-auto object-contain" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* EDITORIAL CONTENT (Left & Right - Pure GSAP for 100% Reverse Scroll Recovery) */}
                    {/* ======================================================== */}
                    <div 
                        ref={contentRef} 
                        className="absolute inset-0 z-20 flex items-center justify-between px-6 sm:px-12 lg:px-20 text-white pointer-events-none"
                    >
                        {/* Left Editorial Column */}
                        <div className="hero-text-left max-w-md pointer-events-auto will-change-transform">
                            <h1 className="text-4xl md:text-5xl lg:text-[66px] leading-[1.05] tracking-tight font-bold -mt-40 sm:-mt-24 lg:-mt-0 lg:pt-10 font-sans">
                                <span className="hero-line-left block">Your journey,</span>
                                <span className="hero-line-left block">managed by AI.</span>
                            </h1>
                            <div className="hero-sub-left mt-16 sm:mt-20 space-y-4 lg:block hidden">
                                <h2 className="text-base sm:text-lg leading-5 font-medium font-sans">
                                    Personalized planning.<br />Real-time adaptation.
                                </h2>
                                <p className="w-10 h-px bg-white" />
                                <p className="md:text-[10px] lg:text-[11px] font-semibold leading-4 max-w-[300px] text-[#d8d2c8]">
                                    Every flight, stay, and route is designed around your comfort and schedule — while our AI manages disruptions automatically.
                                </p>
                            </div>
                        </div>

                        {/* Right Editorial Column */}
                        <div className="hero-text-right max-w-md flex flex-col items-end pointer-events-auto will-change-transform">
                            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold leading-[1.05] text-right mt-72 sm:mt-0 md:pt-60 lg:pt-20 font-sans">
                                <span className="hero-line-right block">We adapt</span>
                                <span className="hero-line-right block">as you travel.</span>
                            </h1>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* BOTTOM-RIGHT SCROLL INDICATOR */}
                    {/* ======================================================== */}
                    <div className="scroll-indicator absolute bottom-16 sm:bottom-20 right-6 sm:right-12 lg:right-20 z-20 text-white md:w-[30%] lg:w-[25%] pointer-events-none">
                        <div className="mb-4 h-[1px] w-full bg-white/60" />
                        <div className="hidden sm:flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[8px] lg:text-[9px] font-bold tracking-tight">
                                <div className="flex flex-col -space-y-2">
                                    <ChevronDown size={15} />
                                    <ChevronDown size={15} className='-mt-[11px]' />
                                    <ChevronDown size={15} className='-mt-[11px]' />
                                </div>
                                <span>SCROLL DOWN</span>
                            </div>
                            <p className='text-[8px] lg:text-[9px] tracking-tight text-white/80'>TO START THE JOURNEY</p>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* SECOND SECTION: IN-SKY STORY & 3 FLOATING CARDS */}
                    {/* Slow, gentle emergence inside the open blue sky */}
                    {/* ======================================================== */}
                    <div 
                        ref={secondSectionRef} 
                        className="absolute inset-0 z-30 flex flex-col items-center justify-between text-white px-4 sm:px-8 md:px-12 py-16 sm:py-20 pointer-events-none will-change-transform"
                    >
                        {/* Open Sky Headline */}
                        <div className="text-center max-w-4xl space-y-3 pt-6 sm:pt-8 pointer-events-auto">
                            <span className="text-xs font-mono tracking-[0.25em] text-white/90 uppercase block font-semibold drop-shadow-md">
                                [ 02 / RECOGNITION & CURATION ]
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-sans text-white drop-shadow-lg">
                                We understand how you travel.<br />
                                <span className="text-[#f5f2eb]/90 font-medium text-xl sm:text-2xl md:text-3xl drop-shadow">
                                    Your budget. Your interests. Your people.
                                </span>
                            </h2>
                        </div>

                        {/* 3 Floating Recommendation Cards Surfacing in the Open Sky */}
                        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto pb-4 sm:pb-8">
                            
                            {/* Option 01: Balanced (Enters smoothly from LEFT) */}
                            <div 
                                onClick={() => {
                                    setActiveView("agent");
                                    expandOption("opt-1");
                                }}
                                className="sky-card-1 group cursor-pointer bg-white/95 hover:bg-white text-[#181411] rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/80 backdrop-blur-md will-change-transform select-none hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between border-b border-[#ded7cc] pb-3">
                                    <div>
                                        <span className="text-[9px] font-mono tracking-widest uppercase text-[#736a5e] block font-bold">
                                            OPTION 01 · BALANCED
                                        </span>
                                        <h4 className="text-xl font-bold tracking-tight text-[#181411] font-sans">
                                            Jaipur + Udaipur
                                        </h4>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold bg-[#181411] text-[#f5f2eb] px-2 py-0.5 rounded">
                                        94% Match
                                    </span>
                                </div>

                                <div className="py-3 flex items-center justify-between text-xs font-mono">
                                    <span className="text-[#55473a]">5 Days Tour</span>
                                    <span className="font-bold text-base text-[#181411]">₹37,000</span>
                                </div>

                                <div className="pt-2 border-t border-[#ded7cc] flex items-center justify-between text-[10px] font-mono text-[#736a5e]">
                                    <span>Royal Forts · Lake Palace</span>
                                    <span className="text-[#181411] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                                        Explore <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>

                            {/* Option 02: Adventure (Enters smoothly from BOTTOM) */}
                            <div 
                                onClick={() => {
                                    setActiveView("agent");
                                    expandOption("opt-2");
                                }}
                                className="sky-card-2 group cursor-pointer bg-white/95 hover:bg-white text-[#181411] rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/80 backdrop-blur-md will-change-transform select-none hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between border-b border-[#ded7cc] pb-3">
                                    <div>
                                        <span className="text-[9px] font-mono tracking-widest uppercase text-[#736a5e] block font-bold">
                                            OPTION 02 · ADVENTURE
                                        </span>
                                        <h4 className="text-xl font-bold tracking-tight text-[#181411] font-sans">
                                            Jaipur + Mount Abu
                                        </h4>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold bg-[#181411] text-[#f5f2eb] px-2 py-0.5 rounded">
                                        91% Match
                                    </span>
                                </div>

                                <div className="py-3 flex items-center justify-between text-xs font-mono">
                                    <span className="text-[#55473a]">5 Days Tour</span>
                                    <span className="font-bold text-base text-[#181411]">₹34,000</span>
                                </div>

                                <div className="pt-2 border-t border-[#ded7cc] flex items-center justify-between text-[10px] font-mono text-[#736a5e]">
                                    <span>Desert Dunes · Peak Trek</span>
                                    <span className="text-[#181411] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                                        Explore <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>

                            {/* Option 03: Romantic (Enters smoothly from RIGHT) */}
                            <div 
                                onClick={() => {
                                    setActiveView("agent");
                                    expandOption("opt-3");
                                }}
                                className="sky-card-3 group cursor-pointer bg-white/95 hover:bg-white text-[#181411] rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/80 backdrop-blur-md will-change-transform select-none hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between border-b border-[#ded7cc] pb-3">
                                    <div>
                                        <span className="text-[9px] font-mono tracking-widest uppercase text-[#736a5e] block font-bold">
                                            OPTION 03 · ROMANTIC
                                        </span>
                                        <h4 className="text-xl font-bold tracking-tight text-[#181411] font-sans">
                                            Udaipur + Jodhpur
                                        </h4>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold bg-[#181411] text-[#f5f2eb] px-2 py-0.5 rounded">
                                        96% Match
                                    </span>
                                </div>

                                <div className="py-3 flex items-center justify-between text-xs font-mono">
                                    <span className="text-[#55473a]">5 Days Tour</span>
                                    <span className="font-bold text-base text-[#181411]">₹40,000</span>
                                </div>

                                <div className="pt-2 border-t border-[#ded7cc] flex items-center justify-between text-[10px] font-mono text-[#736a5e]">
                                    <span>Lake Pichola · Candlelight</span>
                                    <span className="text-[#181411] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                                        Explore <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* ============================================================ */}
                {/* 4. FLOATING ACTION BUTTON (Fixed at Bottom Center) */}
                {/* ============================================================ */}
                <div className="w-full flex justify-center fixed bottom-4 sm:bottom-8 z-[100] pointer-events-none">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded-full pointer-events-auto border border-white/20 shadow-2xl">
                        <button 
                            onClick={() => setIsPlannerOpen(true)}
                            className="text-[11px] font-bold tracking-wider uppercase bg-white text-black px-4 sm:px-5 py-2.5 rounded-full cursor-pointer hover:bg-[#eae5d9] transition-all hover:scale-105 active:scale-95"
                        >
                            Start Planning
                        </button>
                        <div 
                            onClick={() => setIsPlannerOpen(true)}
                            className='w-9 h-9 bg-white rounded-full text-black flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform'
                        >
                            <Plane size={18} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
