import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate3DFlip } from "../utils/splitTextHelper";
import { DotGrid, WireframeTriangle } from "./DecorativeShapes";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 3D Character Flip Entrance (replays on scroll down and scroll up)
      animate3DFlip(".contact-title");

      // 2. 3D Z-Depth Fly-in Entrance for the contact card (replays on scroll up and down)
      gsap.fromTo(
        ".contact-card",
        {
          opacity: 0,
          z: -240,
          rotationY: 16,
          rotationX: -10,
          scale: 0.88,
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
            trigger: ".contact-card-container",
            start: "top 85%",
            toggleActions: "restart none restart reset",
          },
        }
      );

      // 3. Parallax card and background accents
      gsap.set(".contact-triangle", { yPercent: 20, rotation: -30 });
      gsap.set(".contact-dots", { yPercent: 12 });
      gsap.set(".contact-card", { yPercent: -15 });

      gsap.to(".contact-triangle", {
        yPercent: -10,
        rotation: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".contact-dots", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".contact-card", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="border-t border-line py-24 relative overflow-hidden"
    >
      {/* Background Parallax Accents */}
      <div className="contact-triangle cluster-piece absolute top-10 right-8 md:right-28 pointer-events-none">
        <WireframeTriangle size={200} color="#E8836B" />
      </div>
      <div className="contact-dots cluster-piece absolute -bottom-6 left-8 md:left-24 pointer-events-none">
        <DotGrid width={240} height={180} color="#1E8E5A" opacity={0.3} />
      </div>

      <div className="max-w-page mx-auto px-6 relative z-10">
        <div className="about-3d-container max-w-[800px] mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line shadow-2xs mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-sm shadow-accent/50"></span>
            <p className="font-mono text-xs font-bold text-ink tracking-wider uppercase">
              [ 06 ] CONNECT &amp; COLLABORATE
            </p>
          </div>

          {/* Editorial Title with 3D Character Flip */}
          <h2 className="contact-title about-3d-title editorial-title font-display font-bold text-[clamp(28px,4.5vw,46px)] cursor-pointer select-none text-ink">
            <span>Let's collaborate</span>: enterprise software, modern web platforms, &amp; new roles.
          </h2>
        </div>

        {/* Contact Parallax Card */}
        <div className="contact-card-container perspective-stage">
          <div className="contact-card z-3d-item cluster-piece bg-surface border border-line rounded-3xl p-8 md:p-10 shadow-2xl max-w-[720px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
              <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                Available For New Opportunities
              </span>
            </div>

            <p className="text-ink-soft text-base leading-relaxed mb-8 max-w-[560px]">
              Whether you have an interesting project to collaborate on, a role,
              or just want to talk about algorithms, React architecture, or Gemini AI
              integrations — my inbox is always open.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="mailto:swantinjomathew.mec@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-ink text-page hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Email me directly →
              </a>
              <a
                href="https://linkedin.com/in/swantinmathew"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-line-strong hover:border-ink hover:-translate-y-0.5 transition-all bg-page/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/swantinmathew"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-line-strong hover:border-ink hover:-translate-y-0.5 transition-all bg-page/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                GitHub ↗
              </a>
            </div>

            <div className="pt-6 mt-8 border-t border-line flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-ink-faint">
              <span>swantinjomathew.mec@gmail.com</span>
              <span>Kochi, Kerala, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
