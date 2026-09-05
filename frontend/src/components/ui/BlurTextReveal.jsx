import React from "react";
import { motion } from "framer-motion";

/**
 * BlurTextReveal
 * High-end editorial typography component that reveals words or letters
 * with a luxury blur-to-clear optical focus transition.
 */
export const BlurTextReveal = ({
  text,
  className = "",
  as = "h1",
  delay = 0,
  stagger = 0.035,
  animateBy = "letters" // "letters" | "words"
}) => {
  const Component = motion[as] || motion.div;

  if (animateBy === "words") {
    const words = text.split(" ");
    return (
      <Component className={`inline-block ${className}`}>
        {words.map((word, index) => (
          <span key={index} className="inline-block whitespace-nowrap mr-[0.25em]">
            <motion.span
              className="inline-block will-change-[filter,transform,opacity]"
              initial={{ opacity: 0, filter: "blur(14px)", y: 16 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.6,
                delay: delay + index * stagger,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  // Animate by letters while preserving word boundaries
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <Component className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split("").map((char, charIndex) => {
            const currentIdx = globalCharIndex++;
            return (
              <motion.span
                key={charIndex}
                className="inline-block will-change-[filter,transform,opacity]"
                initial={{ opacity: 0, filter: "blur(12px)", y: 14 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: delay + currentIdx * stagger,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Component>
  );
};
