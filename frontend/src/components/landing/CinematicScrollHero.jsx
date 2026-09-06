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
            const isDesktop = window.innerWidth >= 768;

            // Set explicit initial states so reverse scrolling ALWAYS recovers cleanly
            gsap.set(".hero-text-left", { x: 0, opacity: 1, filter: "blur(0px)", scale: 1 });
            gsap.set(".hero-text-right", { x: 0, opacity: 1, filter: "blur(0px)", scale: 1 });
            gsap.set(".scroll-indicator", { opacity: 1 });
            gsap.set(windowRef.current, { scale: 1 });
            gsap.set(logoRef.current, { y: 0, scale: 1 });
            gsap.set(secondSectionRef.current, { opacity: 0, y: 80, filter: "blur(12px)" });

            // Subtle cinematic entrance/reveal for Hero elements
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

            // Master GSAP pinned scroll timeline
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

            // 1. Zoom through the airplane window into open sky
            tl.to(windowRef.current, {
                scale: 6.2,
                rotation: 0.01,
                force3D: true,
                duration: 12,
                ease: "power1.inOut"
            }, 0)
                // 2. Left headline exits gently to the left with blur
                .to(".hero-text-left", {
                    x: isDesktop ? -240 : -100,
                    filter: "blur(16px)",
                    opacity: 0,
                    scale: 1.04,
                    duration: 8,
                    ease: "power1.inOut"
                }, 0)
                // 3. Right headline exits gently to the right with blur
                .to(".hero-text-right", {
                    x: isDesktop ? 240 : 100,
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
            const logoMoveFactor = window.innerWidth < 768 ? 0.41 : window.innerWidth < 1024 ? 0.43 : 0.44;
            tl.to(logoRef.current, {
                y: -window.innerHeight * logoMoveFactor,
                scale: window.innerWidth < 768 ? 0.52 : 0.6,
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
                        x: isDesktop ? -160 : -60,
                        opacity: 0,
                        filter: "blur(16px)",
                        rotation: isDesktop ? -6 : 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        rotation: isDesktop ? -2 : 0,
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
                        x: isDesktop ? 160 : 60,
                        opacity: 0,
                        filter: "blur(16px)",
                        rotation: isDesktop ? 6 : 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        rotation: isDesktop ? 2 : 0,
                        duration: 7,
                        ease: "power1.out"
                    },
                    8.6
                );

        }, scopeRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={scopeRef} className="relative w-full overflow-hidden">

            {/* ============================================================ */}
            {/* 1. ANIMATED CENTER LOGO (Flies to navbar on scroll) */}
            {/* ============================================================ */}
            <div className="fixed inset-0 flex items-center justify-center z-[120] pointer-events-none">
                <div
                    ref={logoRef}
                    onClick={() => setActiveView("landing")}
                    className="flex flex-col items-center justify-center pointer-events-auto cursor-pointer select-none will-change-transform"
                >
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[0.22em] sm:tracking-[0.25em] text-white uppercase drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] font-sans">
                        TRAVELFLOW
                    </span>
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.25em] sm:tracking-[0.3em] text-[#d8d2c8] uppercase mt-1">
                        AI TRAVEL MANAGEMENT
                    </span>
                </div>
            </div>

            {/* ============================================================ */}
            {/* 2. MAIN HERO VIEWPORT CANVAS */}
            {/* ============================================================ */}
            <div ref={revealRef} className="relative w-full">

                {/* Pinned Viewport Container - Full Viewport Guaranteed */}
                <div ref={mainContainer} className="relative w-full h-screen min-h-[100svh] min-h-[100dvh] overflow-hidden">

                    {/* ======================================================== */}
                    {/* SKY LAYER: Fullscreen bright blue sky */}
                    {/* ======================================================== */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        <img
                            src={skyImage}
                            alt="Sky Background"
                            className="w-full h-full object-cover object-center pointer-events-none select-none"
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
                                    className="w-full h-full object-cover opacity-85 pointer-events-none select-none"
                                />
                            </div>
                            <div className="relative w-full h-full shrink-0">
                                <img
                                    src={cloudsImage}
                                    alt="Clouds"
                                    className="w-full h-full object-cover opacity-85 pointer-events-none select-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* AIRPLANE WINDOW: Scales up gradually on scroll */}
                    {/* Responsive 2:1 coordinate canvas ensures the scene fills */}
                    {/* the viewport at every breakpoint without distortion. */}
                    {/* ======================================================== */}
                    <div
                        ref={windowRef}
                        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none will-change-transform overflow-hidden"
                        style={{ perspective: '1000px', backfaceVisibility: 'hidden' }}
                    >
                        <div
                            className="relative shrink-0 flex items-center justify-center select-none"
                            style={{
                                width: 'max(100vw, calc(100svh * 2))',
                                height: 'max(100svh, calc(100vw / 2))',
                                aspectRatio: '2 / 1',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* Inner window frame layer */}
                            <img
                                src={innerImage}
                                alt="inner frame"
                                className="absolute inset-0 w-full h-full object-cover z-10 select-none pointer-events-none"
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                            />
                            {/* Shadow depth layer */}
                            <img
                                src={shadowImage}
                                alt="shadow depth"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 z-20 select-none pointer-events-none"
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                            />
                            {/* Outer fuselage layer */}
                            <img
                                src={outerImage}
                                alt="outer fuselage"
                                className="absolute inset-0 w-full h-full object-cover z-30 select-none pointer-events-none"
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                            />
                            {/* Overhead cabin fixture locked to the window frame coordinates */}
                            <div className="absolute top-[13.8%] left-1/2 -translate-x-1/2 w-[24%] h-auto z-40 pointer-events-none select-none">
                                <img
                                    src={aboveImage}
                                    alt="above fixture"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* EDITORIAL CONTENT (Left & Right - Fluid Clamp Typography) */}
                    {/* ======================================================== */}
                    <div
                        ref={contentRef}
                        className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-between px-5 sm:px-8 md:px-12 lg:px-20 pt-20 pb-28 md:py-0 text-white pointer-events-none"
                    >
                        {/* Left Editorial Column */}
                        <div className="hero-text-left w-full md:max-w-xs lg:max-w-md pointer-events-auto will-change-transform text-left">
                            <h1 className="text-[clamp(1.85rem,4.2vw,4.15rem)] leading-[1.06] tracking-tight font-bold font-sans">
                                <span className="hero-line-left block">Your journey,</span>
                                <span className="hero-line-left block">managed by AI.</span>
                            </h1>
                            <div className="hero-sub-left mt-4 sm:mt-6 lg:mt-12 space-y-3 lg:space-y-4 hidden md:block">
                                <h2 className="text-sm lg:text-base leading-snug font-medium font-sans text-[#f5f2eb]">
                                    Personalized planning.<br />Real-time adaptation.
                                </h2>
                                <p className="w-10 h-px bg-white/70" />
                                <p className="text-[10px] lg:text-[11px] font-semibold leading-relaxed max-w-[280px] lg:max-w-[320px] text-[#d8d2c8]">
                                    Every flight, stay, and route is designed around your comfort and schedule — while our AI manages disruptions automatically.
                                </p>
                            </div>
                        </div>

                        {/* Right Editorial Column */}
                        <div className="hero-text-right w-full md:max-w-xs lg:max-w-md flex flex-col items-end pointer-events-auto will-change-transform text-right">
                            <h1 className="text-[clamp(1.65rem,3.8vw,3.75rem)] font-bold leading-[1.06] tracking-tight font-sans">
                                <span className="hero-line-right block">We adapt</span>
                                <span className="hero-line-right block">as you travel.</span>
                            </h1>
                            <p className="md:hidden text-[11px] font-mono text-[#d8d2c8] mt-2 max-w-[220px]">
                                Real-time disruption recovery & personalized trip orchestration.
                            </p>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* BOTTOM-RIGHT SCROLL INDICATOR */}
                    {/* ======================================================== */}
                    <div className="scroll-indicator absolute bottom-16 sm:bottom-20 right-5 sm:right-10 lg:right-20 z-20 text-white w-auto sm:w-[240px] md:w-[280px] pointer-events-none">
                        <div className="mb-3 sm:mb-4 h-[1px] w-full bg-white/60" />
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-[8px] sm:text-[9px] font-bold tracking-tight">
                                <div className="flex flex-col -space-y-2">
                                    <ChevronDown size={14} />
                                    <ChevronDown size={14} className='-mt-[11px]' />
                                    <ChevronDown size={14} className='-mt-[11px]' />
                                </div>
                                <span>SCROLL DOWN</span>
                            </div>
                            <p className='text-[8px] sm:text-[9px] tracking-tight text-white/80 hidden sm:block'>
                                TO START THE JOURNEY
                            </p>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* SECOND SECTION: IN-SKY STORY & 3 FLOATING CARDS */}
                    {/* ======================================================== */}
                    <div
                        ref={secondSectionRef}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-between text-white px-4 sm:px-8 md:px-12 py-12 sm:py-16 lg:py-20 pointer-events-none will-change-transform"
                    >
                        {/* Open Sky Headline */}
                        <div className="text-center max-w-4xl space-y-2 sm:space-y-3 pt-3 sm:pt-6 pointer-events-auto">
                            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/90 uppercase block font-semibold drop-shadow-md">
                                [ 02 / RECOGNITION & CURATION ]
                            </span>
                            <h2 className="text-[clamp(1.4rem,3.2vw,3.25rem)] font-extrabold tracking-tight leading-tight font-sans text-white drop-shadow-lg">
                                We understand how you travel.<br />
                                <span className="text-[#f5f2eb]/90 font-medium text-[clamp(0.95rem,2vw,1.75rem)] drop-shadow">
                                    Your budget. Your interests. Your people.
                                </span>
                            </h2>
                        </div>

                        {/* 3 Floating Recommendation Cards Surfacing in the Open Sky */}
                        {/* Desktop: 3-column grid. Mobile: slick horizontal snap carousel */}
                        <div className="w-full max-w-5xl pointer-events-auto pb-4 sm:pb-8">
                            <div className="flex md:grid md:grid-cols-3 gap-4 lg:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-3 md:pb-0 px-2 sm:px-4 md:px-0 no-scrollbar">

                                {/* Option 01: Balanced */}
                                <div
                                    onClick={() => {
                                        setActiveView("agent");
                                        expandOption("opt-1");
                                    }}
                                    className="sky-card-1 group cursor-pointer bg-white/95 hover:bg-white text-[#181411] rounded-2xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/80 backdrop-blur-md will-change-transform select-none transition-all duration-300 w-[85vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none flex flex-col justify-between hover:scale-105 hover:-translate-y-2"
                                >
                                    <div className="flex items-start justify-between border-b border-[#ded7cc] pb-3">
                                        <div>
                                            <span className="text-[9px] font-mono tracking-widest uppercase text-[#736a5e] block font-bold">
                                                OPTION 01 · BALANCED
                                            </span>
                                            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-[#181411] font-sans">
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

                                {/* Option 02: Adventure */}
                                <div
                                    onClick={() => {
                                        setActiveView("agent");
                                        expandOption("opt-2");
                                    }}
                                    className="sky-card-2 group cursor-pointer bg-white/95 hover:bg-white text-[#181411] rounded-2xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/80 backdrop-blur-md will-change-transform select-none transition-all duration-300 w-[85vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none flex flex-col justify-between hover:scale-105 hover:-translate-y-2"
                                >
                                    <div className="flex items-start justify-between border-b border-[#ded7cc] pb-3">
                                        <div>
                                            <span className="text-[9px] font-mono tracking-widest uppercase text-[#736a5e] block font-bold">
                                                OPTION 02 · ADVENTURE
                                            </span>
                                            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-[#181411] font-sans">
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

                                {/* Option 03: Romantic */}
                                <div
                                    onClick={() => {
                                        setActiveView("agent");
                                        expandOption("opt-3");
                                    }}
                                    className="sky-card-3 group cursor-pointer bg-white/95 hover:bg-white text-[#181411] rounded-2xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/80 backdrop-blur-md will-change-transform select-none transition-all duration-300 w-[85vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none flex flex-col justify-between hover:scale-105 hover:-translate-y-2"
                                >
                                    <div className="flex items-start justify-between border-b border-[#ded7cc] pb-3">
                                        <div>
                                            <span className="text-[9px] font-mono tracking-widest uppercase text-[#736a5e] block font-bold">
                                                OPTION 03 · ROMANTIC
                                            </span>
                                            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-[#181411] font-sans">
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

                            {/* Mobile Swipe Cue */}
                            <div className="md:hidden flex items-center justify-center gap-1.5 pt-2 text-[10px] font-mono text-white/70">
                                <span>Swipe to view all recommendations</span>
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* ============================================================ */}
                {/* 3. FLOATING ACTION BUTTON (Fixed at Bottom Center) */}
                {/* ============================================================ */}
                <div className="w-full flex justify-center fixed bottom-4 sm:bottom-6 z-[100] pointer-events-none">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded-full pointer-events-auto border border-white/20 shadow-2xl">
                        <button
                            onClick={() => setIsPlannerOpen(true)}
                            className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-white text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-pointer hover:bg-[#eae5d9] transition-all hover:scale-105 active:scale-95"
                        >
                            Start Planning
                        </button>
                        <div
                            onClick={() => setIsPlannerOpen(true)}
                            className='w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full text-black flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform'
                        >
                            <Plane size={16} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
