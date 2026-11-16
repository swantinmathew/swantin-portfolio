import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate3DFlip } from "../utils/splitTextHelper";
import { GeometricRing, DotGrid } from "./DecorativeShapes";

gsap.registerPlugin(ScrollTrigger);

const TRACK_1 = [
  { name: "React.js", category: "frontend", role: "Frontend UI", color: "#1E8E5A" },
  { name: "FastAPI", category: "backend", role: "Async API", color: "#E05D38" },
  { name: "Frappe Framework", category: "backend", role: "Custom ERP Modules", color: "#0089FF" },
  { name: "LangGraph", category: "ai", role: "Agent Workflows", color: "#1E8E5A" },
  { name: "Python 3.11", category: "languages", role: "Core Language", color: "#3B82F6" },
  { name: "Next.js 15", category: "frontend", role: "Full-Stack React", color: "#15181D" },
  { name: "Supabase pgvector", category: "ai", role: "1536D Vector Search", color: "#1E8E5A" },
  { name: "Tailwind CSS", category: "frontend", role: "Design Systems", color: "#06B6D4" },
];

const TRACK_2 = [
  { name: "ERPNext", category: "backend", role: "Enterprise Workflows", color: "#0089FF" },
  { name: "PostgreSQL & SQL", category: "databases", role: "Relational Queries", color: "#336791" },
  { name: "Data Engineering", category: "backend", role: "Excel Ingestion Pipelines", color: "#10B981" },
  { name: "Node.js", category: "backend", role: "JavaScript Runtime", color: "#1E8E5A" },
  { name: "RAG & Vector Search", category: "ai", role: "Knowledge Retrieval", color: "#1E8E5A" },
  { name: "Java", category: "languages", role: "OOP & Architecture", color: "#EA580C" },
  { name: "JavaScript ES6+", category: "languages", role: "Modern Web", color: "#F59E0B" },
  { name: "Git & Version Control", category: "tools", role: "CI/CD & Source", color: "#2563EB" },
];

const TRACK_3 = [
  { name: "Data Structures & Algorithms", category: "algorithms", role: "Problem Solving", color: "#E8836B" },
  { name: "REST APIs", category: "backend", role: "HTTP Contracts", color: "#10B981" },
  { name: "DBMS & Relational Modeling", category: "databases", role: "ACID & Schema Design", color: "#00758F" },
  { name: "Object-Oriented Programming", category: "languages", role: "Clean Patterns", color: "#8B5CF6" },
  { name: "C Language", category: "languages", role: "Memory & Low-Level", color: "#64748B" },
  { name: "Docker", category: "tools", role: "Containerization", color: "#0284C7" },
  { name: "Pytest & CI/CD", category: "tools", role: "Automated Testing", color: "#0EA5E9" },
  { name: "System Architecture", category: "algorithms", role: "Scalable Systems", color: "#E8836B" },
];

const FILTERS = [
  { id: "all", label: "ALL ARSENAL" },
  { id: "ai", label: "AI & RAG" },
  { id: "backend", label: "BACKEND & APIS" },
  { id: "frontend", label: "FRONTEND" },
  { id: "algorithms", label: "ALGORITHMS & CORE" },
  { id: "databases", label: "DATABASES & SQL" },
];

function Skills() {
  const sectionRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const track3Ref = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSkill, setActiveSkill] = useState(null);

  const tweensRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading 3D Character Flip (replays on scroll)
      animate3DFlip(".skills-title");

      // 2. Infinite Continuous GSAP Marquee Motion
      // Track 1: Moving leftwards
      const t1 = gsap.to(track1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 34,
        repeat: -1,
      });

      // Track 2: Moving rightwards
      const t2 = gsap.fromTo(
        track2Ref.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: 38,
          repeat: -1,
        }
      );

      // Track 3: Moving leftwards
      const t3 = gsap.to(track3Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 36,
        repeat: -1,
      });

      tweensRef.current = [t1, t2, t3];

      // 3. Scroll Velocity Reaction: tracks accelerate smoothly during user scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 320);
          const boost = Math.min(velocity, 3.5);
          gsap.to([t1, t2, t3], {
            timeScale: 1 + boost,
            duration: 0.25,
            overwrite: "auto",
            onComplete: () => {
              gsap.to([t1, t2, t3], { timeScale: 1, duration: 0.8 });
            },
          });
        },
      });

      // Parallax background decorative elements
      gsap.to(".skills-ring", {
        rotation: 90,
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover speed modulation: slow down ribbons on hover for tactile exploration
  const handleMouseEnterTrack = () => {
    tweensRef.current.forEach((t) => {
      gsap.to(t, { timeScale: 0.2, duration: 0.5 });
    });
  };

  const handleMouseLeaveTrack = () => {
    tweensRef.current.forEach((t) => {
      gsap.to(t, { timeScale: 1, duration: 0.5 });
    });
  };

  const isHighlighted = (skill) => {
    if (activeFilter === "all") return true;
    return skill.category === activeFilter;
  };

  const renderTrackItem = (skill, key) => {
    const highlighted = isHighlighted(skill);
    const isSelected = activeSkill?.name === skill.name;

    return (
      <div
        key={key}
        onMouseEnter={() => setActiveSkill(skill)}
        onClick={() => setActiveSkill(skill)}
        className={`shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
          highlighted
            ? "opacity-100 scale-100"
            : "opacity-35 scale-95 grayscale"
        } ${
          isSelected
            ? "bg-surface border-ink shadow-lg ring-2 ring-ink/10 -translate-y-1"
            : "bg-surface/90 border-line hover:border-ink/60 hover:bg-page hover:-translate-y-1 hover:shadow-md"
        }`}
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
          style={{ backgroundColor: skill.color }}
        ></span>

        <span className="font-display font-bold text-lg sm:text-xl text-ink whitespace-nowrap">
          {skill.name}
        </span>

        <span className="font-mono text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-page border border-line text-ink-soft whitespace-nowrap">
          {skill.role}
        </span>
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="border-t border-line py-24 relative overflow-hidden bg-page/30"
    >
      {/* Background Decorative Parallax Accents */}
      <div className="skills-ring cluster-piece absolute -top-12 -right-12 pointer-events-none opacity-30">
        <GeometricRing size={280} color="#1E8E5A" />
      </div>
      <div className="cluster-piece absolute -bottom-10 -left-10 pointer-events-none opacity-20">
        <DotGrid width={260} height={200} color="#15181D" />
      </div>

      <div className="max-w-page mx-auto px-6 relative z-10 mb-10">
        <div className="about-3d-container max-w-[840px]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line shadow-2xs mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-sm shadow-accent/50"></span>
            <p className="font-mono text-xs font-bold text-ink tracking-wider uppercase">
              [ 03 ] TECHNICAL ARSENAL
            </p>
          </div>

          <h2 className="skills-title about-3d-title editorial-title font-display font-bold text-[clamp(28px,4.5vw,48px)] cursor-pointer select-none text-ink">
            <span>A versatile toolkit</span>: languages, enterprise frameworks, &amp; data engines.
          </h2>
        </div>

        {/* Category Spotlight Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-8">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`font-mono text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? "bg-ink text-page shadow-sm"
                    : "bg-surface border border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Infinite Continuous Kinetic Motion Tracks */}
      <div
        className="relative w-full space-y-4 py-4 overflow-hidden"
        onMouseEnter={handleMouseEnterTrack}
        onMouseLeave={handleMouseLeaveTrack}
      >
        {/* Left & Right Edge Gradient Blur Mask for Infinite Depth */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-page via-page/80 to-transparent z-20"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-page via-page/80 to-transparent z-20"></div>

        {/* Track 1 (Leftwards) */}
        <div className="flex overflow-hidden">
          <div
            ref={track1Ref}
            className="flex items-center gap-4 shrink-0 will-change-transform"
          >
            {[...TRACK_1, ...TRACK_1, ...TRACK_1, ...TRACK_1].map((skill, i) =>
              renderTrackItem(skill, `t1-${i}`)
            )}
          </div>
        </div>

        {/* Track 2 (Rightwards) */}
        <div className="flex overflow-hidden">
          <div
            ref={track2Ref}
            className="flex items-center gap-4 shrink-0 will-change-transform"
          >
            {[...TRACK_2, ...TRACK_2, ...TRACK_2, ...TRACK_2].map((skill, i) =>
              renderTrackItem(skill, `t2-${i}`)
            )}
          </div>
        </div>

        {/* Track 3 (Leftwards) */}
        <div className="flex overflow-hidden">
          <div
            ref={track3Ref}
            className="flex items-center gap-4 shrink-0 will-change-transform"
          >
            {[...TRACK_3, ...TRACK_3, ...TRACK_3, ...TRACK_3].map((skill, i) =>
              renderTrackItem(skill, `t3-${i}`)
            )}
          </div>
        </div>
      </div>

      {/* Active Skill Micro-Spotlight (shows when hovering/clicking any badge) */}
      <div className="max-w-page mx-auto px-6 mt-6 min-h-[32px] flex items-center justify-between text-xs font-mono text-ink-faint">
        {activeSkill ? (
          <div className="flex items-center gap-2 animate-fadeIn">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: activeSkill.color }}
            ></span>
            <span className="font-bold text-ink">{activeSkill.name}</span>
            <span>•</span>
            <span className="text-ink-soft">{activeSkill.role}</span>
          </div>
        ) : (
          <span>// KINETIC ARSENAL</span>
        )}
        <span className="hidden sm:inline-block">INTERACTIVE KINETIC ARSENAL</span>
      </div>
    </section>
  );
}

export default Skills;