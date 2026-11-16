import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate3DFlip } from "../utils/splitTextHelper";
import { DotGrid, WireframeTriangle, GeometricRing } from "./DecorativeShapes";
import { projects } from "../content/projects";
import ProjectDetailModal from "./ProjectDetailModal";

gsap.registerPlugin(ScrollTrigger);

function Work() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Check if initial hash matches a project
    const hash = window.location.hash;
    if (hash && hash.startsWith("#project-")) {
      const slug = hash.replace("#project-", "");
      const found = projects.find((p) => p.slug === slug);
      if (found) {
        setSelectedProject(found);
      }
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 0. Main section title 3D flip
      animate3DFlip(".work-section-title");

      projects.forEach((project, idx) => {
        const clusterClass = `.cluster-proj-${project.slug}`;
        const titleClass = `.title-proj-${project.slug}`;

        // 1. Project Title 3D character flip (replays on scroll)
        animate3DFlip(titleClass);

        // 2. Parallax Cluster Animation
        const isEven = idx % 2 === 1;

        // Shape initial states
        gsap.set(`${clusterClass} .proj-shape`, {
          yPercent: isEven ? 25 : -8,
          rotation: isEven ? -80 : 0,
        });
        gsap.set(`${clusterClass} .proj-dots`, {
          yPercent: isEven ? 12 : -10,
        });
        gsap.set(`${clusterClass} .proj-card`, {
          yPercent: -18,
        });
        gsap.set(`${clusterClass} .proj-badge`, {
          yPercent: 22,
        });
        gsap.set(clusterClass, {
          yPercent: 5,
        });

        // Parallax scroll transitions
        gsap.to(`${clusterClass} .proj-shape`, {
          yPercent: isEven ? -10 : 15,
          rotation: isEven ? 35 : 60,
          ease: "none",
          scrollTrigger: {
            trigger: clusterClass,
            scrub: 1,
          },
        });

        // 3D Z-Depth Fly-in Entrance for the card & badge (replays when scrolling up and down)
        gsap.fromTo(
          `${clusterClass} .proj-card`,
          {
            opacity: 0,
            z: isEven ? -240 : 160,
            rotationY: isEven ? -14 : 14,
            rotationX: isEven ? 8 : -8,
            scale: 0.9,
            y: 50,
          },
          {
            duration: 1.15,
            opacity: 1,
            z: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: clusterClass,
              start: "top 85%",
              toggleActions: "restart none restart reset",
            },
          }
        );

        gsap.fromTo(
          `${clusterClass} .proj-badge`,
          {
            opacity: 0,
            z: isEven ? 140 : -140,
            scale: 0.8,
            y: 30,
          },
          {
            duration: 1,
            opacity: 1,
            z: 0,
            scale: 1,
            y: 0,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: clusterClass,
              start: "top 85%",
              toggleActions: "restart none restart reset",
            },
          }
        );

        gsap.to(`${clusterClass} .proj-dots`, {
          yPercent: isEven ? -14 : 12,
          ease: "none",
          scrollTrigger: {
            trigger: clusterClass,
            scrub: 1,
          },
        });

        gsap.to(`${clusterClass} .proj-card`, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: clusterClass,
            scrub: 1,
          },
        });

        gsap.to(`${clusterClass} .proj-badge`, {
          yPercent: -24,
          ease: "none",
          scrollTrigger: {
            trigger: clusterClass,
            scrub: 1,
          },
        });

        gsap.to(clusterClass, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: clusterClass,
            end: "bottom center",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="border-t border-line py-20 overflow-hidden"
    >
      <div className="max-w-page mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-14">
          <div className="about-3d-container max-w-[840px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line shadow-2xs mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-sm shadow-accent/50"></span>
              <p className="font-mono text-xs font-bold text-ink tracking-wider uppercase">
                [ 02 ] SELECTED WORK
              </p>
            </div>
            <h2 className="work-section-title about-3d-title editorial-title font-display font-bold text-[clamp(28px,4.5vw,48px)] cursor-pointer select-none text-ink">
              <span>Featured systems</span>: full-stack platforms, agentic AI, &amp; vector search.
            </h2>
          </div>
          <a
            href="https://github.com/swantinmathew"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs font-semibold text-accent hover:text-ink transition-colors flex items-center gap-1.5 px-4 py-2 rounded-full border border-line bg-surface hover:border-ink shadow-2xs"
          >
            <span>All Repositories on GitHub</span>
            <span>↗</span>
          </a>
        </div>

        {/* Render each project as its own Parallax Cluster */}
        <div className="space-y-32">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div key={project.slug} className="relative">
                {/* Editorial headline with 3D character flip entrance */}
                <div className="about-3d-container max-w-[880px] mb-12">
                  <div
                    className={`title-proj-${project.slug} about-3d-title editorial-title font-display font-bold text-[clamp(28px,4.2vw,48px)] cursor-pointer select-none`}
                  >
                    <span>{project.title}</span> — {project.badgeText}
                  </div>
                </div>

                {/* Parallax Cluster Container */}
                <div
                  className={`cluster-proj-${project.slug} perspective-stage relative w-full max-w-[960px] min-h-[500px] md:min-h-[460px] mx-auto flex items-center justify-center`}
                >
                  {/* Layer 1: Geometric background shape */}
                  <div
                    className={`proj-shape cluster-piece absolute ${
                      isEven
                        ? "top-4 left-2 md:left-10"
                        : "-top-6 right-4 md:right-16"
                    } pointer-events-none`}
                  >
                    {project.shapeType === "triangle" ? (
                      <WireframeTriangle size={210} color={project.accentColor} />
                    ) : (
                      <GeometricRing size={220} color={project.accentColor} />
                    )}
                  </div>

                  {/* Layer 2: Floating Dot Matrix */}
                  <div
                    className={`proj-dots cluster-piece absolute ${
                      isEven
                        ? "-bottom-6 left-12 md:left-24"
                        : "top-2 left-4 md:left-14"
                    } pointer-events-none`}
                  >
                    <DotGrid
                      width={240}
                      height={180}
                      color={project.accentColor}
                      opacity={0.3}
                    />
                  </div>

                  {/* Layer 3: Solid background glow disc */}
                  <div
                    className={`cluster-piece absolute w-[260px] h-[260px] rounded-full pointer-events-none opacity-20 ${
                      isEven ? "right-10 top-16" : "left-8 bottom-10"
                    }`}
                    style={{ backgroundColor: project.accentColor }}
                  ></div>

                  {/* Layer 4: Main Project Showcase Card - Minimal, Punchy & Case-Study Focused */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="proj-card z-3d-item cluster-piece relative z-10 w-full max-w-[800px] bg-surface border border-line rounded-3xl overflow-hidden shadow-2xl cursor-pointer group/card transition-all duration-300 hover:shadow-2xl hover:border-ink/40"
                  >
                    {/* Window Titlebar */}
                    <div className="flex items-center justify-between flex-wrap gap-3 px-6 py-3.5 border-b border-line bg-page/70">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block"></span>
                        <span className="font-mono text-xs text-ink-soft ml-2 font-medium">
                          {project.slug}.app
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-[11px] font-semibold px-3 py-1 rounded-full text-page shadow-2xs"
                          style={{ backgroundColor: project.accentColor }}
                        >
                          {project.badgeText}
                        </span>
                      </div>
                    </div>

                    {/* Visual Landing Page Showcase */}
                    <div className="relative w-full overflow-hidden bg-page border-b border-line group/preview">
                      {project.previewImage ? (
                        <img
                          src={project.previewImage}
                          alt={project.title}
                          className="w-full h-auto object-contain block transition-transform duration-700 ease-out group-hover/card:scale-102"
                        />
                      ) : (
                        /* Fallback Stylized Preview for projects awaiting screenshots */
                        <div className="w-full aspect-[2.1/1] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-page to-surface text-center">
                          <div className="font-mono text-[11px] uppercase tracking-widest text-ink-faint mb-2">
                            // COMPETITIVE PROGRAMMING ANALYTICS
                          </div>
                          <h4 className="font-display font-extrabold text-3xl text-ink mb-2">
                            {project.title}
                          </h4>
                          <p className="font-display text-sm text-ink-soft max-w-[420px]">
                            {project.tagline}
                          </p>
                        </div>
                      )}

                      {/* Hover Overlay with Case Study Prompt */}
                      <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 backdrop-blur-[3px]">
                        <span
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold text-page shadow-lg transform translate-y-3 group-hover/card:translate-y-0 transition-transform duration-300"
                          style={{ backgroundColor: project.accentColor }}
                        >
                          <span>Explore Case Study & Architecture</span>
                          <span className="text-sm">→</span>
                        </span>
                      </div>
                    </div>

                    {/* Bottom Info Bar: Title, 1-Line Description & Tech Tags */}
                    <div className="px-6 py-5 bg-surface flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-display font-extrabold text-xl md:text-2xl text-ink group-hover/card:text-accent transition-colors flex items-center gap-1.5">
                            <span>{project.title}</span>
                            <span className="text-base text-ink-faint group-hover/card:translate-x-1 group-hover/card:text-accent transition-all">
                              ↗
                            </span>
                          </h3>
                          <span className="font-mono text-xs text-ink-faint">• {project.role}</span>
                        </div>
                        <p className="text-ink-soft text-xs md:text-sm mt-1 max-w-[560px] line-clamp-1">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Stack Badges Preview */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {project.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-line bg-page text-ink-soft"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 3 && (
                          <span className="font-mono text-[10px] text-ink-faint">
                            +{project.stack.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Layer 5: Floating Feature Badge */}
                  <div
                    className={`proj-badge z-3d-item cluster-piece absolute -bottom-5 ${
                      isEven
                        ? "left-6 md:left-16"
                        : "right-6 md:right-16"
                    } z-20 bg-surface/95 backdrop-blur-sm border border-line px-4 py-2 rounded-2xl shadow-lg hidden sm:block`}
                  >
                    <p
                      className="font-mono text-xs font-semibold"
                      style={{ color: project.accentColor }}
                    >
                      ✦ {project.badgeText}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* In-Depth Project Case Study Modal / Drawer */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </section>
  );
}

export default Work;
