"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroTitleSplitProps {
  name: string;
}

export function HeroTitleSplit({ name }: HeroTitleSplitProps) {
  const containerRef = React.useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const chars = containerRef.current?.querySelectorAll(".hero-char");
      const heroRest = document.querySelectorAll(".hero-fade-item");

      if (!chars || chars.length === 0) return;

      const tl = gsap.timeline();

      // Animate chars: yPercent 100% -> 0, opacity 0 -> 1, 600ms duration, 30ms stagger
      tl.fromTo(
        chars,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.03,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        }
      );

      // Hero elements fade up after it with 60ms stagger
      if (heroRest.length > 0) {
        tl.fromTo(
          heroRest,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
          "-=0.2"
        );
      }
    },
    { scope: containerRef }
  );

  // Split name into words and chars for accessible rendering
  const words = name.split(" ");

  return (
    <h1
      ref={containerRef}
      id="hero-name"
      aria-label={name}
      className="type-h1 text-slate-950 dark:text-white"
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {Array.from(word).map((char, charIdx) => (
            <span
              key={charIdx}
              className="inline-block overflow-hidden"
              aria-hidden="true"
            >
              <span className="hero-char inline-block will-change-transform">
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
