import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "../content/projects";

function ProjectDetailModal({ project, isOpen, onClose, onSelectProject }) {
  const overlayRef = useRef(null);
  const modalPanelRef = useRef(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Reset active image index whenever the project changes
  useEffect(() => {
    setActiveImgIndex(0);
  }, [project?.slug]);

  // Handle Keyboard (ESC to close, Left/Right arrows for screenshots)
  useEffect(() => {
    if (!isOpen || !project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleAnimatedClose();
      } else if (e.key === "ArrowRight") {
        if (project.screenshots && project.screenshots.length > 1) {
          setActiveImgIndex((prev) => (prev + 1) % project.screenshots.length);
        }
      } else if (e.key === "ArrowLeft") {
        if (project.screenshots && project.screenshots.length > 1) {
          setActiveImgIndex((prev) =>
            prev === 0 ? project.screenshots.length - 1 : prev - 1
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, project]);

  // Lock body scroll and set URL hash
  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = "hidden";
      window.history.replaceState(null, "", `#project-${project.slug}`);
    } else {
      document.body.style.overflow = "";
      if (window.location.hash.startsWith("#project-")) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, project]);

  // GSAP Entrance
  useEffect(() => {
    if (isOpen && overlayRef.current && modalPanelRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      ).fromTo(
        modalPanelRef.current,
        { y: 50, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.15"
      );
    }
  }, [isOpen]);

  const handleAnimatedClose = () => {
    if (overlayRef.current && modalPanelRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          onClose();
        },
      });
      tl.to(modalPanelRef.current, {
        y: 40,
        scale: 0.96,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      }).to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.1"
      );
    } else {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  // Next and previous project helpers
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const screenshots = project.screenshots || [];
  const currentScreenshot = screenshots[activeImgIndex];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-ink/70 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          handleAnimatedClose();
        }
      }}
    >
      <div
        ref={modalPanelRef}
        className="relative w-full max-w-[1040px] my-auto bg-surface border border-line rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Window Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-surface/95 backdrop-blur-md border-b border-line">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span
                onClick={handleAnimatedClose}
                className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80 cursor-pointer inline-block transition-opacity"
                title="Close"
              ></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block opacity-80"></span>
              <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block opacity-80"></span>
            </div>
            <span className="font-mono text-xs text-ink-soft font-medium ml-2">
              // CASE STUDY · {project.slug.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAnimatedClose}
              className="px-3.5 py-1 text-xs font-mono font-medium rounded-full border border-line hover:border-ink hover:bg-page transition-colors text-ink cursor-pointer"
            >
              Close ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-10 custom-scrollbar">
          {/* Hero Banner Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="font-mono text-xs font-bold px-3 py-1 rounded-full text-page shadow-2xs"
                style={{ backgroundColor: project.accentColor }}
              >
                0{project.index} · {project.badgeText}
              </span>
              {project.duration && (
                <span className="font-mono text-xs text-ink-faint">
                  • {project.duration} development sprint
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
              {project.title}
              <span style={{ color: project.accentColor }}>.</span>
            </h1>

            <p className="font-display text-lg sm:text-xl text-ink-soft font-medium mt-2 max-w-[820px]">
              {project.tagline}
            </p>

            {/* Quick CTAs and Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-line">
              <div className="flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-page shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all"
                    style={{ backgroundColor: project.accentColor }}
                  >
                    <span>Launch Live App</span>
                    <span>↗</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-ink text-page hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-sm"
                  >
                    <span>View GitHub Source</span>
                    <span>→</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-ink-faint">
                <span>ROLE: <strong className="text-ink">{project.role}</strong></span>
              </div>
            </div>
          </div>

          {/* Screenshot Showcase & Interactive Gallery */}
          {screenshots.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-ink-faint uppercase tracking-wider">
                  // SCREENSHOTS & INTERFACE WALKTHROUGH ({activeImgIndex + 1}/{screenshots.length})
                </p>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold hover:underline"
                    style={{ color: project.accentColor }}
                  >
                    Open live demo in new tab ↗
                  </a>
                )}
              </div>

              {/* Main Screenshot Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-line bg-page shadow-lg group">
                <div className="w-full aspect-[16/9] sm:aspect-[16/10] bg-ink/5 flex items-center justify-center overflow-hidden">
                  <img
                    src={currentScreenshot.url}
                    alt={currentScreenshot.title || project.title}
                    className="w-full h-full object-contain object-top transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Caption Bar */}
                <div className="p-4 bg-surface/95 border-t border-line">
                  <h3 className="font-display font-bold text-sm text-ink">
                    {currentScreenshot.title}
                  </h3>
                  <p className="text-xs text-ink-soft mt-0.5">
                    {currentScreenshot.caption}
                  </p>
                </div>
              </div>

              {/* Thumbnails strip */}
              {screenshots.length > 1 && (
                <div
                  className={`grid gap-2.5 pt-2 ${
                    screenshots.length > 4
                      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
                      : "grid-cols-2 sm:grid-cols-4"
                  }`}
                >
                  {screenshots.map((s, idx) => {
                    const isActive = idx === activeImgIndex;
                    return (
                      <button
                        key={s.url}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`text-left rounded-xl p-2 border transition-all ${
                          isActive
                            ? "border-ink bg-page shadow-sm ring-2 ring-ink/10"
                            : "border-line bg-surface hover:border-ink/40 opacity-75 hover:opacity-100"
                        }`}
                      >
                        <div className="aspect-[16/10] rounded-lg overflow-hidden bg-page mb-2 border border-line">
                          <img
                            src={s.url}
                            alt={s.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <p className="font-mono text-[11px] font-bold text-ink truncate">
                          0{idx + 1} {s.title}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Fallback if screenshots not provided yet */
            <div className="p-10 rounded-2xl border border-line bg-page/50 text-center">
              <p className="font-mono text-xs text-ink-faint uppercase mb-2">
                // LIVE APPLICATION DEMO
              </p>
              <h3 className="font-display font-bold text-xl text-ink mb-3">
                Experience {project.title} Live
              </h3>
              <p className="text-sm text-ink-soft max-w-[500px] mx-auto mb-6">
                Explore the deployed platform directly or inspect the verified source code repository on GitHub.
              </p>
              <div className="flex justify-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-page shadow-sm"
                    style={{ backgroundColor: project.accentColor }}
                  >
                    Open Live App ↗
                  </a>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-ink text-page"
                >
                  GitHub Repository →
                </a>
              </div>
            </div>
          )}

          {/* Problem & Solution Narrative */}
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-page/40 border border-line">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-coral">
                // THE PROBLEM STATEMENT
              </span>
              <p className="text-ink-soft text-sm leading-relaxed mt-2.5">
                {project.problemStatement || project.summary}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-page/40 border border-line">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                // THE ARCHITECTURAL SOLUTION
              </span>
              <p className="text-ink-soft text-sm leading-relaxed mt-2.5">
                {project.summary}
              </p>
            </div>
          </div>

          {/* Architecture Pipeline Stages (If available, e.g. for Docent & GitHubPulse) */}
          {project.architectureStages && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs text-ink-faint uppercase tracking-wider">
                    // {project.pipelineTitle || "SYSTEM ARCHITECTURE PIPELINE"}
                  </p>
                  <h3 className="font-display font-extrabold text-2xl text-ink mt-1">
                    {project.pipelineSubtitle || "How Ingestion, Processing & Analysis Work"}
                  </h3>
                </div>
              </div>

              {/* Pipeline Stages Grid (adapts to 3 or 4 stages) */}
              <div
                className={`grid gap-4 ${
                  project.architectureStages.length === 4
                    ? "sm:grid-cols-2 lg:grid-cols-4"
                    : "sm:grid-cols-3"
                }`}
              >
                {project.architectureStages.map((stage) => (
                  <div
                    key={stage.stage}
                    className="p-5 rounded-2xl bg-page/60 border border-line shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-surface border border-line text-ink-soft">
                          {stage.stage}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-ink mb-1.5">
                        {stage.title}
                      </h4>
                      <p className="text-xs text-ink-soft leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    {stage.stats && (
                      <div className="mt-4 pt-4 border-t border-line space-y-1.5">
                        {stage.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="flex items-center justify-between text-[11px] font-mono"
                          >
                            <span className="text-ink-faint">{stat.label}</span>
                            <span className="font-semibold text-ink">
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Production Proof Metrics Bar (e.g. GitHubPulse) */}
              {project.productionMetrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-page/80 border border-line mt-4">
                  {project.productionMetrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <p
                        className="font-display font-extrabold text-2xl sm:text-3xl"
                        style={{ color: project.accentColor }}
                      >
                        {metric.value}
                      </p>
                      <p className="font-display font-bold text-xs text-ink mt-1">
                        {metric.label}
                      </p>
                      <p className="font-mono text-[11px] text-ink-faint mt-0.5">
                        {metric.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Code Snippet Box (if available) */}
              {project.architectureStages[0]?.codeSnippet && (
                <div className="rounded-2xl border border-line bg-ink text-page p-5 overflow-hidden">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 font-mono text-xs text-page/60">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                      <span>langgraph_node.py (Python 3.11 Execution Node)</span>
                    </span>
                    <span className="text-accent text-[11px]">Clean Strings • Sub-50ms</span>
                  </div>
                  <pre className="font-mono text-xs text-page/90 leading-relaxed overflow-x-auto">
                    <code>{project.architectureStages[0].codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Key Engineering Features */}
          {project.keyFeatures && (
            <div className="space-y-4 pt-2">
              <p className="font-mono text-xs text-ink-faint uppercase tracking-wider">
                // CORE TECHNICAL HIGHLIGHTS
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((f, i) => (
                  <div
                    key={f.title}
                    className="p-5 rounded-2xl bg-surface border border-line hover:border-ink/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: project.accentColor }}
                      >
                        0{i + 1}
                      </span>
                      <h4 className="font-display font-bold text-sm text-ink">
                        {f.title}
                      </h4>
                    </div>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="pt-2">
            <p className="font-mono text-xs text-ink-faint uppercase tracking-wider mb-3">
              // VERIFIED TECHNOLOGIES USED
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3.5 py-1.5 rounded-xl border border-line bg-page text-ink font-medium shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Next / Previous Project Footer Navigation */}
          <div className="pt-8 mt-10 border-t border-line flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => onSelectProject(prevProject)}
              className="text-left group flex items-center gap-3 p-2 rounded-xl hover:bg-page transition-colors"
            >
              <span className="text-lg text-ink-faint group-hover:-translate-x-1 transition-transform">
                ←
              </span>
              <div>
                <span className="block font-mono text-[10px] text-ink-faint uppercase">
                  Previous Project
                </span>
                <span className="font-display font-bold text-sm text-ink group-hover:text-accent transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectProject(nextProject)}
              className="text-right group flex items-center gap-3 p-2 rounded-xl hover:bg-page transition-colors"
            >
              <div>
                <span className="block font-mono text-[10px] text-ink-faint uppercase">
                  Next Project
                </span>
                <span className="font-display font-bold text-sm text-ink group-hover:text-accent transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <span className="text-lg text-ink-faint group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailModal;
