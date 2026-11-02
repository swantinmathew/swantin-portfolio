"use client";

import * as React from "react";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { HeroTitleSplit } from "./hero-title-split";
import { MagneticButton } from "./magnetic-button";
import { MapPin } from "lucide-react";
import profilePic from "@/public/profile.jpg";

export function Hero() {
  return (
    <section className="site-container pt-12 md:pt-20 pb-16 md:pb-24">
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8 md:gap-12">
        {/* Left Column: Intro & Actions */}
        <div className="flex-1 max-w-2xl">
          {/* Status Badge */}
          <div className="hero-fade-item inline-flex items-center gap-2 px-3 py-1 rounded-[8px] border border-emerald-300/40 dark:border-emerald-800/60 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-mono text-xs mb-6">
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            <span>{siteConfig.availability}</span>
          </div>

          {/* Heading with SplitText chars + Mobile Avatar */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <HeroTitleSplit name={siteConfig.name} />

            {/* Mobile 72px avatar inline beside name */}
            <div className="md:hidden shrink-0">
              <Image
                src={profilePic}
                alt={siteConfig.name}
                width={72}
                height={72}
                priority
                className="w-[72px] h-[72px] rounded-full object-cover border-2 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>

          {/* Role & College */}
          <p className="hero-fade-item text-base sm:text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
            {siteConfig.role} ·{" "}
            <span className="text-slate-900 dark:text-slate-100 font-semibold">
              {siteConfig.institution}
            </span>
          </p>

          {/* Location Meta (under subtitle, not in CTA row) */}
          <p className="hero-fade-item type-meta text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-6">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>{siteConfig.location}</span>
          </p>

          {/* 2-Sentence Intro */}
          <p className="hero-fade-item type-body text-slate-600 dark:text-slate-400 max-w-[65ch] mb-8">
            {siteConfig.headline} Passionate about system design, clean UX
            architectures, and solving complex algorithmic challenges.
          </p>

          {/* CTAs: 2-column row on mobile + icon buttons row */}
          <div className="hero-fade-item flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Primary & Secondary Row */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-3">
              <MagneticButton
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-[8px] text-sm font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity min-h-[44px] shadow-sm text-center"
              >
                Get in touch
              </MagneticButton>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-[8px] text-sm font-medium border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-300 transition-colors min-h-[44px] text-center"
              >
                Resume <span>↗</span>
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 rounded-[8px] border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-300 transition-colors flex items-center justify-center text-slate-700 dark:text-slate-300"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                </svg>
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-11 h-11 rounded-[8px] border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-300 transition-colors flex items-center justify-center text-slate-700 dark:text-slate-300"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M5.03 5a2.03 2.03 0 1 1-4.06 0 2.03 2.03 0 0 1 4.06 0ZM1.35 8.9h7.2V22h-7.2V8.9Zm7.2 0h6.9v1.8h.1c.96-1.7 3.3-2.2 5.2-2.2 5.6 0 6.6 3.5 6.6 8V22h-7.2v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V22H8.55V8.9Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Desktop Profile Photo (~200px, rounded-lg, no float animation) */}
        <div className="hero-fade-item hidden md:block shrink-0">
          <div className="w-[200px] h-[200px] rounded-[16px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-[var(--shadow-card)]">
            <Image
              src={profilePic}
              alt={siteConfig.name}
              width={200}
              height={200}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <p className="type-meta text-center text-slate-500 dark:text-slate-400 mt-2.5">
            B.Tech CSE &apos;27 · CGPA 8.21
          </p>
        </div>
      </div>
    </section>
  );
}
