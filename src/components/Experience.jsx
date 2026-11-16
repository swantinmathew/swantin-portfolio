import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate3DFlip } from "../utils/splitTextHelper";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_ITEM = {
  period: "2024 — Present",
  status: "Active Ongoing Role",
  company: "Vijayarajan & Associates",
  location: "Kochi, India",
  designation: "Chartered Accountants",
  role: "Technical Analyst Intern",
  tagline:
    "Developing custom ERPNext/Frappe modules to support accounting workflows through data management, report development, and Excel-based data imports.",
  details: [
    "Engineered custom Frappe Framework DocTypes and server-side Python hooks enforcing accounting compliance.",
    "Built automated data ingestion pipelines parsing bulk client Excel spreadsheets into normalized relational records.",
    "Developed custom SQL query reports enabling real-time auditing and ledger reconciliation.",
  ],
  techStack: ["Python", "Frappe", "ERPNext", "SQL", "JavaScript", "Git", "Excel Automation"],
};

function Experience() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Heading 3D Character Flip
      animate3DFlip(".experience-section-heading");

      // 2. Entrance of Experience Card with 3D depth pop
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 45,
          rotateX: 12,
          scale: 0.95,
          transformPerspective: 1000,
        },
        {
          duration: 1.05,
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none restart reset",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Unique 3D Perspective Tilt Animation on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.012,
      transformPerspective: 1000,
      ease: "power1.out",
      duration: 0.25,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power2.out",
      duration: 0.45,
    });
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="border-t border-line py-24 relative overflow-hidden bg-page"
    >
      <div className="max-w-page mx-auto px-6">
        {/* Notable, Interactive Editorial Masthead */}
        <div className="about-3d-container max-w-[880px] mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line shadow-2xs mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-sm shadow-accent/50"></span>
            <p className="font-mono text-xs font-bold text-ink tracking-wider uppercase">
              [ 04 ] PROFESSIONAL EXPERIENCE
            </p>
          </div>
          <h2 className="experience-section-heading about-3d-title editorial-title font-display font-bold text-[clamp(28px,4.5vw,48px)] cursor-pointer select-none text-ink">
            <span>Engineering in practice</span>: enterprise workflows, ERP systems, &amp; data pipelines.
          </h2>
        </div>

        {/* Minimal, Sleek Horizontal Experience Row with Interactive 3D Card Physics */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`experience-row-item group transition-all duration-300 py-8 px-6 md:px-10 rounded-3xl border border-line cursor-pointer bg-surface shadow-md hover:shadow-xl hover:border-ink/40`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main Horizontal Grid (Matches user reference Image 2) */}
          <div className="grid md:grid-cols-[200px_1fr_auto] gap-6 items-start">
            
            {/* Left Column: Timeline & Live Status */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
                <span className="font-mono text-xs font-semibold text-accent tracking-wider">
                  {EXPERIENCE_ITEM.status}
                </span>
              </div>
              <p className="font-mono text-base font-bold text-ink">
                {EXPERIENCE_ITEM.period}
              </p>
              <p className="font-mono text-xs text-ink-faint mt-1">
                {EXPERIENCE_ITEM.location}
              </p>
            </div>

            {/* Middle Column: Company, Designation, Short Tagline & Tech Stack */}
            <div>
              <div className="flex items-baseline flex-wrap gap-2.5 mb-1.5">
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors tracking-tight">
                  {EXPERIENCE_ITEM.company}
                </h3>
                <span className="font-mono text-xs text-ink-faint">
                  • {EXPERIENCE_ITEM.designation}
                </span>
              </div>

              <p className="font-display font-semibold text-base text-accent mb-3">
                {EXPERIENCE_ITEM.role}
              </p>

              <p className="text-ink-soft text-sm md:text-base leading-relaxed max-w-[680px]">
                {EXPERIENCE_ITEM.tagline}
              </p>

              {/* Expandable Key Responsibilities (Only shown when user clicks button) */}
              {isExpanded && (
                <div className="mt-5 pt-5 border-t border-line/70 space-y-2.5 animate-fadeIn">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint block mb-2 font-semibold">
                    // KEY RESPONSIBILITIES &amp; ARCHITECTURAL IMPACT
                  </span>
                  {EXPERIENCE_ITEM.details.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-ink-soft">
                      <span className="font-mono text-accent font-bold mt-0.5">✦</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Embedded Tech Stack Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-5">
                {EXPERIENCE_ITEM.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 rounded-md bg-page border border-line text-ink font-medium group-hover:border-ink/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Prominent, High-Visibility Action Button */}
            <div className="flex items-center justify-start md:justify-end pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-semibold transition-all duration-300 shadow-xs border ${
                  isExpanded
                    ? "bg-accent text-page border-accent shadow-md"
                    : "bg-surface text-ink border-line-strong hover:bg-ink hover:text-page hover:border-ink"
                }`}
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                <span className={`inline-block transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                  ↓
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
