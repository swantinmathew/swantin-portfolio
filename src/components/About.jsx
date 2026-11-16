import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate3DFlip } from "../utils/splitTextHelper";
import { DotGrid, WireframeTriangle } from "./DecorativeShapes";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);
  const flipRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 3D Character Flip & Pop Entrance (abstracted from CodePen demo)
      flipRef.current = animate3DFlip(".about-title");

      // 2. 3D Depth Entrance for Narrative & Card
      gsap.fromTo(
        ".about-narrative-p",
        {
          opacity: 0,
          z: (i) => (i % 2 === 0 ? -140 : 90),
          rotationY: (i) => (i % 2 === 0 ? -12 : 12),
          y: 40,
        },
        {
          duration: 1.0,
          opacity: 1,
          z: 0,
          rotationY: 0,
          y: 0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-narrative-col",
            start: "top 85%",
            toggleActions: "restart none restart reset",
          },
        }
      );

      gsap.fromTo(
        ".about-card",
        {
          opacity: 0,
          z: -220,
          rotationY: 16,
          rotationX: -10,
          scale: 0.88,
          y: 45,
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
            trigger: ".about-card",
            start: "top 88%",
            toggleActions: "restart none restart reset",
          },
        }
      );

      // 3. Parallax Cluster for About visual element
      gsap.set(".about-triangle", { yPercent: 20, rotation: -40 });
      gsap.set(".about-dots", { yPercent: 10 });
      gsap.set(".about-card", { yPercent: -15 });
      gsap.set(".about-caption", { yPercent: 0 });

      gsap.to(".about-triangle", {
        yPercent: -15,
        rotation: 45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-dots", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-card", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-caption", {
        yPercent: 90,
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

  const replay3DFlip = () => {
    flipRef.current?.replay();
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="border-t border-line py-20 overflow-hidden"
    >
      <div className="max-w-page mx-auto px-6">
        <div className="about-3d-container max-w-[840px] mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line shadow-2xs mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-sm shadow-accent/50"></span>
            <p className="font-mono text-xs font-bold text-ink tracking-wider uppercase">
              [ 01 ] BACKGROUND &amp; PHILOSOPHY
            </p>
          </div>

          {/* Editorial title with 3D character flip entrance */}
          <h2
            onClick={replay3DFlip}
            className="about-title about-3d-title editorial-title font-display font-bold text-[clamp(28px,4.5vw,48px)] cursor-pointer select-none text-ink"
          >
            <span>Crafting purposeful software</span>: bridging clean architecture, full-stack systems, &amp; applied AI.
          </h2>
        </div>

        <div className="perspective-stage grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Narrative copy */}
          <div className="about-narrative-col text-ink-soft space-y-5 text-[16px] leading-relaxed">
            <p className="about-narrative-p z-3d-item">
              I'm a Computer Science undergraduate at{" "}
              <strong className="text-ink font-semibold">
                Government Model Engineering College, Kochi (KTU)
              </strong>
              , currently maintaining an <strong className="text-ink font-semibold">8.22 CGPA</strong>. Alongside my studies, I work as a{" "}
              <strong className="text-ink font-semibold">Technical Analyst Intern</strong> at Vijayarajan &amp; Associates, Chartered Accountants.
            </p>
            <p className="about-narrative-p z-3d-item">
              My engineering focus centers on building reliable full-stack applications, scalable backend APIs, and agentic AI systems. I work extensively with Python, React, Next.js, FastAPI, and PostgreSQL, alongside hands-on industry exposure building custom workflows and data pipelines in my internship.
            </p>
            <div className="about-narrative-p z-3d-item pt-2 flex flex-wrap gap-2">
              <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-accent-soft text-accent border border-accent/20 font-medium">
                ✦ Model Engineering College '27
              </span>
              <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-surface text-ink-soft border border-line">
                ✦ Technical Analyst Intern
              </span>
              <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-surface text-ink-soft border border-line">
                ✦ Full-Stack &amp; Applied AI
              </span>
            </div>
          </div>

          {/* Right Column: Parallax Story Cluster */}
          <div className="relative w-full max-w-[420px] h-[330px] mx-auto flex items-center justify-center">
            {/* Layer 1: Rotating wireframe triangle */}
            <div className="about-triangle cluster-piece absolute -top-6 -right-6 pointer-events-none">
              <WireframeTriangle size={190} color="#E8836B" />
            </div>

            {/* Layer 2: Floating dot matrix */}
            <div className="about-dots cluster-piece absolute -bottom-4 -left-6 pointer-events-none">
              <DotGrid width={200} height={160} color="#1E8E5A" opacity={0.3} />
            </div>

            {/* Layer 3: Main interactive card - Structured Engineering Snapshot */}
            <div className="about-card cluster-piece relative z-10 w-full bg-surface border border-line rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
                <span className="font-mono text-xs text-accent font-semibold tracking-wider">
                  ENGINEERING PROFILE
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  Active Intern
                </span>
              </div>
              <div className="space-y-2.5 font-mono text-xs text-ink-soft">
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-ink-faint">Institution</span>
                  <span className="text-ink font-medium text-right">Model Engineering College</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-ink-faint">Degree</span>
                  <span className="text-ink font-medium">B.Tech CSE · '23–'27 (KTU)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-ink-faint">Academics</span>
                  <span className="text-ink font-medium">8.22 CGPA · 96.8% 12th</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-ink-faint">Current Role</span>
                  <span className="text-ink font-medium text-right">Tech Analyst Intern (V&amp;A)</span>
                </div>
              </div>
            </div>

            {/* Layer 4: Editorial index caption */}
            <div className="about-caption cluster-piece absolute -top-5 left-2 z-20 editorial-caption text-[11px] text-ink-faint">
              <span>/01</span> FOUNDATIONS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
