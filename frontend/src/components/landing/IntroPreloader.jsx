"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const IntroPreloader = () => {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef(null);

  const smallText = "TRAVELFLOW";
  const line1 = "Your journey,";
  const line2 = "managed by AI.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Small brand text: characters blur into clear one by one
      tl.to(".intro-char-small", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out"
      }, 0.2);

      // 2. Main heading: characters blur into clear one by one
      tl.to(".intro-char-main", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.6,
        stagger: 0.032,
        ease: "power2.out"
      }, 0.55);

      // 3. Pause for a serene moment, then slowly and elegantly fade out the starting page
      tl.to(containerRef.current, {
        opacity: 0,
        filter: "blur(14px)",
        scale: 1.02,
        duration: 1.6,
        ease: "power2.inOut",
        delay: 0.9,
        onComplete: () => {
          setIsDone(true);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (isDone) return null;

  // Helper to split text into words and characters with no awkward line breaks
  const renderWordChars = (text, className) => {
    const words = text.split(" ");
    return words.map((word, wordIdx) => (
      <span key={wordIdx} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIdx) => (
          <span
            key={charIdx}
            className={`${className} inline-block opacity-0 will-change-transform`}
            style={{ filter: "blur(14px)", transform: "translateY(8px)" }}
          >
            {char}
          </span>
        ))}
        {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] bg-[#14100d] flex flex-col items-center justify-center text-center select-none px-6 pointer-events-none will-change-transform"
    >
      <div className="max-w-2xl space-y-4">
        {/* Small text: TRAVELFLOW */}
        <div className="text-xs sm:text-sm font-mono tracking-[0.35em] text-[#a89f91] uppercase font-semibold">
          {renderWordChars(smallText, "intro-char-small")}
        </div>

        {/* Main heading: Your journey, managed by AI. */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-sans leading-[1.05]">
          <div>{renderWordChars(line1, "intro-char-main")}</div>
          <div>{renderWordChars(line2, "intro-char-main")}</div>
        </h1>
      </div>
    </div>
  );
};
