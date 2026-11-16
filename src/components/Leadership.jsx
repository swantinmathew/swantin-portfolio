import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate3DFlip } from "../utils/splitTextHelper";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    id: "union",
    period: "2024",
    title: "Member, College Union 2024",
    org: "Govt. Model Engineering College",
    badge: "Student Governance",
    accentColor: "#2563EB",
    cx: 160,
    cy: 160,
  },
  {
    id: "excel",
    period: "2025",
    title: "Venue Manager, Excel MEC 2025",
    org: "Annual Techno-Managerial Fest",
    badge: "Operations & Logistics",
    accentColor: "#1E8E5A",
    cx: 820,
    cy: 250,
  },
  {
    id: "chakravyuh",
    period: "2026",
    title: "Sports Vice Secretary, Chakravyuh 2026",
    org: "Annual Sports Meet of MEC",
    badge: "Athletics & Leadership",
    accentColor: "#E8836B",
    cx: 460,
    cy: 400,
  },
];

function LeadershipCard({ item, isHovered, onHover, onLeave, customClasses = "" }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.03,
      transformPerspective: 800,
      ease: "power1.out",
      duration: 0.2,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      ease: "power2.out",
      duration: 0.4,
    });
    onLeave();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => {
        onHover();
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`milestone-card-item p-5 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm ${customClasses} ${
        isHovered
          ? "bg-surface shadow-2xl border-ink/40 z-30"
          : "bg-surface/90 backdrop-blur-xs border-line hover:border-ink/30 z-10"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-mono text-xs font-bold text-ink">
          {item.period}
        </span>
        <span
          className="font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full text-page shadow-2xs"
          style={{ backgroundColor: item.accentColor }}
        >
          {item.badge}
        </span>
      </div>
      <h4 className="font-display font-extrabold text-base text-ink mb-1 leading-snug">
        {item.title}
      </h4>
      <p className="font-mono text-xs text-accent font-medium">
        {item.org}
      </p>
    </div>
  );
}

function Leadership() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Heading 3D Character Flip
      animate3DFlip(".leadership-section-heading");

      // 2. SVG Curved Path Draw Animation (Modeled after user's trajectory curve reference)
      const pathEl = pathRef.current;
      if (pathEl) {
        const pathLength = pathEl.getTotalLength();
        gsap.set(pathEl, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathEl, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // 3. Staggered Milestone Pins and Callouts Entrance
      gsap.fromTo(
        ".milestone-pin-group",
        {
          opacity: 0,
          scale: 0.6,
        },
        {
          duration: 0.8,
          opacity: 1,
          scale: 1,
          stagger: 0.22,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 4. Milestone Cards Reveal
      gsap.fromTo(
        ".milestone-card-item",
        {
          opacity: 0,
          y: 25,
        },
        {
          duration: 0.7,
          opacity: 1,
          y: 0,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="border-t border-line py-24 relative overflow-hidden bg-page"
    >
      <div className="max-w-page mx-auto px-6">
        {/* Notable, Interactive Editorial Masthead */}
        <div className="about-3d-container max-w-[880px] mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line shadow-2xs mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-sm shadow-accent/50"></span>
            <p className="font-mono text-xs font-bold text-ink tracking-wider uppercase">
              [ 05 ] BEYOND CODE &amp; LEADERSHIP
            </p>
          </div>
          <h2 className="leadership-section-heading about-3d-title editorial-title font-display font-bold text-[clamp(28px,4.5vw,48px)] cursor-pointer select-none text-ink">
            <span>Leadership &amp; operations</span>: organizing at scale &amp; student governance.
          </h2>
        </div>

        {/* DESKTOP: Curved Trajectory Timeline (Modeled directly after user's reference image) */}
        <div className="hidden lg:block relative w-full h-[520px] bg-surface/40 border border-line rounded-3xl p-6 overflow-hidden">
          <svg
            viewBox="0 0 1000 480"
            className="w-full h-full absolute inset-0 pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ambient Background Grid Track */}
            <path
              d="M 80 160 C 380 150, 720 180, 880 250 C 950 280, 930 360, 800 380 C 600 410, 360 400, 160 420"
              stroke="#D8DCD0"
              strokeWidth="2"
              strokeDasharray="4 6"
              opacity="0.4"
            />

            {/* Main Animated Glowing Trajectory Curve */}
            <path
              ref={pathRef}
              d="M 80 160 C 380 150, 720 180, 880 250 C 950 280, 930 360, 800 380 C 600 410, 360 400, 160 420"
              stroke="#1E8E5A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Vertical Connector Ticks and Nodes */}
            {MILESTONES.map((m) => {
              const isHovered = hoveredId === m.id;
              const tickLength = m.id === "chakravyuh" ? 38 : -38;

              return (
                <g key={m.id} className="milestone-pin-group">
                  {/* Vertical Tick Connector */}
                  <line
                    x1={m.cx}
                    y1={m.cy}
                    x2={m.cx}
                    y2={m.cy + tickLength}
                    stroke={isHovered ? m.accentColor : "#141712"}
                    strokeWidth="1.5"
                    strokeDasharray={isHovered ? "none" : "2 2"}
                    opacity={isHovered ? 1 : 0.6}
                  />

                  {/* Outer Pulsing Glow Halo */}
                  <circle
                    cx={m.cx}
                    cy={m.cy}
                    r={isHovered ? "16" : "10"}
                    fill={m.accentColor}
                    fillOpacity={isHovered ? 0.4 : 0.2}
                    className="transition-all duration-300"
                  />

                  {/* Solid Center Node Pin */}
                  <circle
                    cx={m.cx}
                    cy={m.cy}
                    r="5"
                    fill={isHovered ? m.accentColor : "#141712"}
                    stroke="#EDEEE6"
                    strokeWidth="2"
                    className="transition-colors duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Clean Milestone Content Cards (No narrative paragraphs) with Interactive 3D Physics */}
          {MILESTONES.map((m) => {
            let positionClasses = "";
            if (m.id === "union") {
              positionClasses = "absolute left-[6%] top-[8%] max-w-[290px]";
            } else if (m.id === "excel") {
              positionClasses = "absolute right-[4%] top-[38%] max-w-[310px]";
            } else if (m.id === "chakravyuh") {
              positionClasses = "absolute left-[36%] bottom-[4%] max-w-[320px]";
            }

            return (
              <LeadershipCard
                key={m.id}
                item={m}
                isHovered={hoveredId === m.id}
                onHover={() => setHoveredId(m.id)}
                onLeave={() => setHoveredId(null)}
                customClasses={positionClasses}
              />
            );
          })}
        </div>

        {/* MOBILE & TABLET: Vertical Connected Timeline with 3D Tilt Cards */}
        <div className="lg:hidden relative pl-6 border-l-2 border-accent/40 space-y-6 ml-3">
          {MILESTONES.map((m) => (
            <div key={m.id} className="relative group">
              {/* Connected glowing node pin */}
              <div
                className="absolute -left-[31px] top-3 w-4 h-4 rounded-full border-2 border-page shadow-sm"
                style={{ backgroundColor: m.accentColor }}
              ></div>

              <LeadershipCard
                item={m}
                isHovered={hoveredId === m.id}
                onHover={() => setHoveredId(m.id)}
                onLeave={() => setHoveredId(null)}
                customClasses="w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leadership;
