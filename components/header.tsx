"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/content/site";
import { Command } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onOpenCommandPalette?: () => void;
}

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Leadership", href: "#leadership" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Header({ onOpenCommandPalette }: HeaderProps) {
  const [activeSection, setActiveSection] = React.useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);

  // IntersectionObserver to highlight active section
  React.useEffect(() => {
    const sectionIds = ["about", "projects", "stack", "leadership", "education", "contact"];
    const observers: IntersectionObserver[] = [];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/85 dark:bg-[#0B0F17]/85 backdrop-blur-md">
      <div className="site-container h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 min-h-[44px] py-2"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>swantin.mathew()</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors py-2 relative ${
                  isActive
                    ? "text-slate-950 dark:text-white font-semibold"
                    : "hover:text-slate-950 dark:hover:text-slate-200"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions (⌘K, Theme, Resume, Mobile toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Hint Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette (Press ⌘K or Ctrl+K)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors min-h-[44px] cursor-pointer"
          >
            <Command className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">⌘K</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Desktop Resume Button (hidden on <=767px) */}
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 px-3.5 py-2 rounded-[8px] text-xs font-mono font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity min-h-[44px]"
          >
            Resume ↗
          </a>

          {/* Mobile Hamburger / Morphing Close Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-sheet"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-[8px] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-sheet"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] overflow-hidden shadow-[var(--shadow-elevated)]"
          >
            <div className="site-container py-6 flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`text-base font-medium py-2.5 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 min-h-[44px] ${
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </a>
                );
              })}

              {/* Mobile Resume Link in menu */}
              <div className="pt-2">
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-[8px] text-sm font-mono font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity min-h-[44px]"
                >
                  Resume ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
