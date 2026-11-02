"use client";

import * as React from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { ProjectMedia } from "./project-media";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const [activeDesktopIndex, setActiveDesktopIndex] = React.useState<number>(0);
  const showcaseContainerRef = React.useRef<HTMLDivElement>(null);

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.slug !== featuredProject.slug);

  // GSAP ScrollTrigger Pinned Showcase for Desktop (>= 1024px)
  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const textBlocks = gsap.utils.toArray<HTMLElement>(".desktop-project-block");
        const mediaPanels = gsap.utils.toArray<HTMLElement>(".desktop-media-panel");

        textBlocks.forEach((block, idx) => {
          ScrollTrigger.create({
            trigger: block,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              setActiveDesktopIndex(idx);
              animatePanel(idx);
            },
            onEnterBack: () => {
              setActiveDesktopIndex(idx);
              animatePanel(idx);
            },
          });
        });

        function animatePanel(targetIndex: number) {
          mediaPanels.forEach((panel, i) => {
            if (i === targetIndex) {
              gsap.to(panel, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "cubic-bezier(0.16, 1, 0.3, 1)",
                overwrite: "auto",
              });
            } else {
              gsap.to(panel, {
                opacity: 0,
                scale: 0.98,
                duration: 0.3,
                ease: "cubic-bezier(0.16, 1, 0.3, 1)",
                overwrite: "auto",
              });
            }
          });
        }
      });

      return () => mm.revert();
    },
    { scope: showcaseContainerRef }
  );

  return (
    <section
      id="projects"
      ref={showcaseContainerRef}
      aria-labelledby="projects-heading"
      className="border-t border-slate-200 dark:border-slate-800/80 py-16 md:py-24"
    >
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-2">
              Selected Work
            </p>
            <h2
              id="projects-heading"
              className="type-h2 text-slate-950 dark:text-white"
            >
              Featured Projects
            </h2>
          </div>
          <a
            href="https://github.com/swantinmathew"
            target="_blank"
            rel="noopener noreferrer"
            className="type-meta text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 self-start sm:self-auto py-1"
          >
            <span>Explore all on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* 1. Mobile & Tablet (< 1024px): Standard Card Grid Layout (No pinning) */}
        <div className="lg:hidden space-y-8">
          <ProjectCard project={featuredProject} featured />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>

        {/* 2. Desktop (>= 1024px): GSAP ScrollTrigger Pinned Showcase */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start relative">
          {/* Left Column: Project text blocks that scroll naturally */}
          <div className="lg:col-span-6 space-y-28 py-6">
            {projects.map((project, idx) => (
              <div
                key={project.slug}
                className="desktop-project-block rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-8 shadow-[var(--shadow-card)] transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-2 mb-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                  <span>{project.role}</span>
                  {project.duration && <span>· {project.duration}</span>}
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-[8px] bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="type-h2 text-slate-950 dark:text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-5">
                  {project.tagline}
                </p>

                {/* 2 Highlights */}
                <ul className="space-y-2.5 mb-6 text-xs text-slate-600 dark:text-slate-300">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="type-meta px-2.5 py-1 rounded-[8px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-5 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors min-h-[44px]"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] font-medium border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-300 transition-colors min-h-[44px]"
                  >
                    <span>Code</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  {project.caseStudy && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity min-h-[44px]"
                    >
                      <span>Case study</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Pinned Media Container (Sticky at top: 120px) */}
          <div className="lg:col-span-6 sticky top-28 self-start pt-6">
            <div className="relative aspect-[16/10] w-full rounded-[16px] overflow-hidden shadow-[var(--shadow-elevated)] border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              {projects.map((project, idx) => (
                <div
                  key={project.slug}
                  className={`desktop-media-panel absolute inset-0 transition-none ${
                    idx === activeDesktopIndex ? "opacity-100 scale-100 z-10" : "opacity-0 scale-98 z-0 pointer-events-none"
                  }`}
                >
                  <ProjectMedia project={project} aspectRatio="h-full w-full" />
                </div>
              ))}
            </div>

            {/* Pagination indicator */}
            <div className="flex items-center justify-center gap-2 mt-4 font-mono text-xs text-slate-400">
              {projects.map((p, i) => (
                <span
                  key={p.slug}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeDesktopIndex
                      ? "w-6 bg-emerald-500"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
