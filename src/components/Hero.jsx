import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { splitTextIntoChars, animate3DFlip } from "../utils/splitTextHelper";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

// Register custom easing functions
try {
  CustomEase.create("customEase", "0.86, 0, 0.07, 1");
} catch {
  // fallback
}
try {
  CustomEase.create("mouseEase", "0.25, 0.1, 0.25, 1");
} catch {
  // fallback
}

const ROWS = [
  { id: "build", text: "BUILD" },
  { id: "ship", text: "SHIP" },
  { id: "solve", text: "SOLVE" },
];

const AMBIENT_WORDS = [
  // Top right header band
  { text: "FASTAPI", top: "5%", left: "48%", speed: 0.2 },
  { text: "FRAPPE", top: "6%", left: "68%", speed: 0.35 },
  { text: "ERPNEXT", top: "5%", right: "4%", speed: 0.3 },

  // Right column outer margins
  { text: "POSTGRESQL", top: "14%", right: "2%", speed: 0.45 },
  { text: "LANGGRAPH", top: "22%", right: "12%", speed: 0.35 },
  { text: "SQL PIPELINES", top: "34%", right: "2%", speed: 0.2 },
  { text: "CLEAN CODE", top: "44%", right: "1%", speed: 0.3 },
  { text: "PYTHON", top: "54%", right: "2%", speed: 0.4 },
  { text: "DATA ENGINEERING", top: "66%", right: "3%", speed: 0.3 },
  { text: "REST APIS", top: "78%", right: "4%", speed: 0.4 },
  { text: "MEC '27", top: "90%", right: "5%", speed: 0.35 },

  // Left column outer margin (far left edge)
  { text: "REACT", top: "24%", left: "1%", speed: 0.3 },
  { text: "NEXT.JS", top: "40%", left: "1%", speed: 0.25 },
  { text: "ALGORITHMS", top: "54%", left: "1%", speed: 0.35 },
  { text: "DATA STRUCTURES", top: "68%", left: "1%", speed: 0.25 },
  { text: "HIGH PERFORMANCE", top: "82%", left: "1%", speed: 0.35 },
  { text: "FULL-STACK", top: "94%", left: "2%", speed: 0.25 },

  // Bottom center
  { text: "PROBLEM SOLVER", top: "94%", left: "22%", speed: 0.4 },
  { text: "ENTERPRISE ERP", top: "94%", left: "44%", speed: 0.35 },
  { text: "SWANTIN JO MATHEW", top: "94%", right: "22%", speed: 0.3 },
];

const ALTERNATIVE_TEXTS = {
  build: {
    "FULL-STACK": "FULL-CYCLE",
    "REACT": "COMPONENT",
    "FASTAPI": "ASYNC I/O",
    "POSTGRESQL": "RELATIONAL",
    "DOCKER": "COMPOSE",
    "ALGORITHMS": "LOGIC FLOW",
    "PYTHON": "CLEAN SYNTAX",
    "SYSTEM DESIGN": "ARCHITECTURE",
    "GEMINI AI": "INTELLIGENCE",
    "ENTERPRISE ERP": "WORKFLOWS",
    "CLEAN CODE": "SOLID CODE",
    "HIGH PERFORMANCE": "COMPILED",
    "DATA ENGINEERING": "PIPELINES",
    "DATA STRUCTURES": "TREES & MAPS",
    "SCALABILITY": "EXTENSIBLE",
    "PROBLEM SOLVER": "BUILDER",
    "AUTOMATION": "WORKFLOWS",
    "MODERN WEB": "FRONTEND CRAFT",
    "REST APIS": "ENDPOINTS",
    "SWANTIN JO MATHEW": "SOFTWARE CRAFT",
    "CS UNDERGRAD": "CREATOR",
  },
  ship: {
    "FULL-STACK": "PRODUCTION",
    "REACT": "INTERACTIVE",
    "FASTAPI": "DEPLOYED",
    "POSTGRESQL": "LIVE DATA",
    "DOCKER": "CONTAINERIZED",
    "ALGORITHMS": "0s DOWNTIME",
    "PYTHON": "PRODUCTION RUN",
    "SYSTEM DESIGN": "CLOUD DEPLOY",
    "GEMINI AI": "INFERENCE",
    "ENTERPRISE ERP": "PRODUCTION",
    "CLEAN CODE": "CI/CD GREEN",
    "HIGH PERFORMANCE": "LOW LATENCY",
    "DATA ENGINEERING": "ETL PIPELINES",
    "DATA STRUCTURES": "O(1) CACHING",
    "SCALABILITY": "AUTO-SCALED",
    "PROBLEM SOLVER": "DELIVERER",
    "AUTOMATION": "GITHUB ACTIONS",
    "MODERN WEB": "LIGHTNING FAST",
    "REST APIS": "SECURE HTTP",
    "SWANTIN JO MATHEW": "LIVE IN PROD",
    "CS UNDERGRAD": "SHIPPED",
  },
  solve: {
    "FULL-STACK": "END-TO-END",
    "REACT": "STATE MACHINE",
    "FASTAPI": "OPTIMAL APIS",
    "POSTGRESQL": "INDEX TUNED",
    "DOCKER": "SANDBOXED",
    "ALGORITHMS": "O(N LOG N)",
    "PYTHON": "VECTORIZED",
    "SYSTEM DESIGN": "FAULT TOLERANT",
    "GEMINI AI": "FINE TUNED",
    "ENTERPRISE ERP": "RELIABLE",
    "CLEAN CODE": "DRY & TESTABLE",
    "HIGH PERFORMANCE": "SUB-MILLISEC",
    "DATA ENGINEERING": "OPTIMIZED",
    "DATA STRUCTURES": "GRAPH THEORY",
    "SCALABILITY": "MILLIONS REQ",
    "PROBLEM SOLVER": "ENGINEER",
    "AUTOMATION": "ALGO SCRIPTS",
    "MODERN WEB": "ACCESSIBLE",
    "REST APIS": "GRAPHQL/REST",
    "SWANTIN JO MATHEW": "PROBLEM SOLVER",
    "CS UNDERGRAD": "COMPUTER SCI",
  },
};

function Hero() {
  const containerRef = useRef(null);
  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ease = CustomEase.get("customEase") ? "customEase" : "power3.out";
    const mouseEase = CustomEase.get("mouseEase") ? "mouseEase" : "power2.out";

    const state = {
      activeRowId: null,
      textRevealAnimation: null,
      kineticAnimationActive: false,
      activeKineticAnimation: null,
    };

    const textRows = container.querySelectorAll(".hero-text-row");
    const backgroundTextItems = container.querySelectorAll(".hero-text-item");
    const kineticType = container.querySelector("#hero-kinetic-type");
    const typeLines = kineticType ? kineticType.querySelectorAll(".hero-type-line") : [];
    const oddLines = kineticType ? kineticType.querySelectorAll(".hero-type-line.odd") : [];
    const evenLines = kineticType ? kineticType.querySelectorAll(".hero-type-line.even") : [];
    const glowLayers = {
      default: container.querySelector(".hero-glow-layer.default"),
      build: container.querySelector(".hero-glow-layer.build"),
      ship: container.querySelector(".hero-glow-layer.ship"),
      solve: container.querySelector(".hero-glow-layer.solve"),
    };

    // Store original dataset
    backgroundTextItems.forEach((item) => {
      item.dataset.originalText = item.dataset.text || item.textContent;
    });

    // 1. Switch atmospheric glow layers
    function switchGlowLayer(id) {
      Object.keys(glowLayers).forEach((key) => {
        const layer = glowLayers[key];
        if (!layer) return;
        if (key === id || (!id && key === "default")) {
          gsap.to(layer, { opacity: 1, duration: 0.8, ease });
        } else {
          gsap.to(layer, { opacity: 0, duration: 0.8, ease });
        }
      });
    }

    // 2. Character splitting and measurement
    const splitTexts = {};

    textRows.forEach((row) => {
      const rowId = row.dataset.rowId;
      const textEl = row.querySelector(".hero-text-content");
      if (!textEl) return;

      try {
        splitTexts[rowId] = new SplitText(textEl, {
          type: "chars",
          charsClass: "hero-char",
        });
      } catch {
        // Fallback native character splitter
        const chars = [];
        const text = textEl.textContent || textEl.dataset.text || "";
        textEl.textContent = "";
        Array.from(text).forEach((ch) => {
          const span = document.createElement("span");
          span.className = "hero-char";
          span.textContent = ch;
          textEl.appendChild(span);
          chars.push(span);
        });
        splitTexts[rowId] = { chars };
      }

      textEl.style.visibility = "visible";
    });

    function updateCharacterWidths() {
      const isMobile = window.innerWidth < 1024;

      textRows.forEach((row) => {
        const rowId = row.dataset.rowId;
        const textEl = row.querySelector(".hero-text-content");
        if (!textEl || !splitTexts[rowId] || !splitTexts[rowId].chars) return;

        const computedStyle = window.getComputedStyle(textEl);
        const currentFontSize = computedStyle.fontSize;
        const chars = splitTexts[rowId].chars;

        chars.forEach((char, i) => {
          const charText =
            char.textContent ||
            (char.querySelector(".hero-char-inner")
              ? char.querySelector(".hero-char-inner").textContent
              : "");
          if (!charText && i === 0) return;

          let charWidth;

          if (isMobile) {
            const fontSizeValue = parseFloat(currentFontSize);
            charWidth = fontSizeValue * 0.62;

            if (!char.querySelector(".hero-char-inner") && charText) {
              char.textContent = "";
              const innerSpan = document.createElement("span");
              innerSpan.className = "hero-char-inner";
              innerSpan.textContent = charText;
              char.appendChild(innerSpan);
            }

            char.style.width = `${charWidth}px`;
            char.style.maxWidth = `${charWidth}px`;
            char.dataset.charWidth = charWidth;
            char.dataset.hoverWidth = charWidth * 1.35;
          } else {
            const tempSpan = document.createElement("span");
            tempSpan.style.position = "absolute";
            tempSpan.style.visibility = "hidden";
            tempSpan.style.fontSize = currentFontSize;
            tempSpan.style.fontFamily = computedStyle.fontFamily;
            tempSpan.style.fontWeight = computedStyle.fontWeight;
            tempSpan.textContent = charText;
            document.body.appendChild(tempSpan);

            const actualWidth = tempSpan.offsetWidth;
            document.body.removeChild(tempSpan);

            const fontSizeValue = parseFloat(currentFontSize);
            const fontSizeRatio = fontSizeValue / 140;
            const padding = 10 * fontSizeRatio;

            charWidth = Math.max(actualWidth + padding, 32 * fontSizeRatio);

            if (!char.querySelector(".hero-char-inner") && charText) {
              char.textContent = "";
              const innerSpan = document.createElement("span");
              innerSpan.className = "hero-char-inner";
              innerSpan.textContent = charText;
              char.appendChild(innerSpan);
            }

            char.style.width = `${charWidth}px`;
            char.style.maxWidth = `${charWidth}px`;
            char.dataset.charWidth = charWidth;

            const hoverWidth = Math.max(charWidth * 1.75, 75 * fontSizeRatio);
            char.dataset.hoverWidth = hoverWidth;
          }

          char.style.setProperty("--char-index", i);
        });
      });
    }

    updateCharacterWidths();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateCharacterWidths);
    }

    // 3. Initial Entrance Animation
    textRows.forEach((row, rowIndex) => {
      const rowId = row.dataset.rowId;
      const chars = splitTexts[rowId]?.chars;
      if (!chars) return;

      gsap.fromTo(
        chars,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.05,
          ease,
          delay: 0.1 + 0.12 * rowIndex,
        }
      );
    });

    gsap.from(".hero-name-header", {
      opacity: 0,
      y: 20,
      duration: 0.85,
      ease,
      delay: 0.1,
    });

    gsap.from(".hero-ambient-header, .hero-bio-block", {
      opacity: 0,
      y: 20,
      duration: 0.85,
      ease,
      delay: 0.35,
    });

    // 4. Profile Photo Initial Window Reveal
    const photoWindow = container.querySelector(".hero-photo-window");
    const photoBackdrop = container.querySelector(".hero-photo-backdrop");
    const photoImg = container.querySelector(".hero-photo-img");
    const shutterEdge = container.querySelector(".hero-shutter-edge");

    if (photoWindow && photoBackdrop && photoImg && shutterEdge) {
      gsap
        .timeline({ delay: 0.25 })
        .set(photoWindow, { clipPath: "inset(0% 100% 0% 0% round 20px)" })
        .set(photoBackdrop, { scaleX: 0 })
        .set(shutterEdge, { left: "0%", opacity: 1 })
        .to(
          photoBackdrop,
          { scaleX: 1, duration: 1.5, ease: "expo.inOut", transformOrigin: "left top" },
          0.05
        )
        .to(
          photoWindow,
          { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.5, ease: "expo.inOut" },
          0.05
        )
        .fromTo(
          photoImg,
          { scale: 1.18, x: -12 },
          { scale: 1, x: 0, duration: 1.8, ease: "expo.out" },
          0.05
        )
        .to(
          shutterEdge,
          { left: "100%", opacity: 0, duration: 1.5, ease: "expo.inOut" },
          0.05
        );
    }

    // 5. Kinetic Type Burst Animation
    function forceResetKinetic() {
      if (state.activeKineticAnimation) {
        state.activeKineticAnimation.kill();
        state.activeKineticAnimation = null;
      }
      if (kineticType) {
        gsap.killTweensOf([kineticType, typeLines, oddLines, evenLines]);
      }
    }

    function startKineticAnimation(text) {
      if (!kineticType) return;
      forceResetKinetic();

      kineticType.style.display = "grid";
      kineticType.style.opacity = "1";
      kineticType.style.visibility = "visible";

      const repeated = `${text}  ${text}  ${text}  ${text}`;
      typeLines.forEach((line) => {
        line.textContent = repeated;
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          state.kineticAnimationActive = false;
        },
      });

      timeline.to(kineticType, {
        duration: 1.4,
        ease,
        scale: 2.7,
        rotation: -90,
      });

      timeline.to(
        oddLines,
        {
          keyframes: [
            { x: "20%", duration: 1, ease },
            { x: "-180%", duration: 1.5, ease },
          ],
          stagger: 0.08,
        },
        0
      );

      timeline.to(
        evenLines,
        {
          keyframes: [
            { x: "-20%", duration: 1, ease },
            { x: "180%", duration: 1.5, ease },
          ],
          stagger: 0.08,
        },
        0
      );

      timeline.to(
        typeLines,
        {
          keyframes: [
            { opacity: 0.28, duration: 0.8, ease },
            { opacity: 0, duration: 1.4, ease },
          ],
          stagger: 0.05,
        },
        0
      );

      state.kineticAnimationActive = true;
      state.activeKineticAnimation = timeline;
    }

    function fadeOutKineticAnimation() {
      if (!state.kineticAnimationActive && !state.activeKineticAnimation) return;
      if (state.activeKineticAnimation) {
        state.activeKineticAnimation.kill();
        state.activeKineticAnimation = null;
      }

      if (!kineticType) return;
      const fadeTimeline = gsap.timeline({
        onComplete: () => {
          gsap.set(kineticType, {
            scale: 1,
            rotation: 0,
            opacity: 0,
            visibility: "hidden",
          });
          gsap.set(typeLines, { opacity: 0.05, x: "0%" });
          state.kineticAnimationActive = false;
        },
      });

      fadeTimeline.to(kineticType, {
        opacity: 0,
        scale: 0.8,
        duration: 0.45,
        ease,
      });
    }

    // 6. Ambient Background Keywords Highlight & Morph
    function createTextRevealAnimation(rowId) {
      const timeline = gsap.timeline();

      timeline.to(backgroundTextItems, {
        opacity: 0.2,
        duration: 0.35,
        ease,
      });

      timeline.call(() => {
        backgroundTextItems.forEach((item) => {
          item.classList.add("highlight");
        });
      });

      timeline.call(
        () => {
          backgroundTextItems.forEach((item) => {
            const orig = item.dataset.text;
            if (ALTERNATIVE_TEXTS[rowId] && ALTERNATIVE_TEXTS[rowId][orig]) {
              item.textContent = ALTERNATIVE_TEXTS[rowId][orig];
            }
          });
        },
        null,
        "+=0.38"
      );

      timeline.call(() => {
        backgroundTextItems.forEach((item) => {
          item.classList.remove("highlight");
          item.classList.add("highlight-reverse");
        });
      });

      timeline.call(
        () => {
          backgroundTextItems.forEach((item) => {
            item.classList.remove("highlight-reverse");
          });
        },
        null,
        "+=0.38"
      );

      timeline.to(backgroundTextItems, {
        opacity: 0.65,
        duration: 0.35,
        ease,
      });

      return timeline;
    }

    function resetBackgroundTextWithAnimation() {
      const timeline = gsap.timeline();

      timeline.call(() => {
        backgroundTextItems.forEach((item) => {
          item.classList.add("highlight");
        });
      });

      timeline.call(
        () => {
          backgroundTextItems.forEach((item) => {
            item.textContent = item.dataset.originalText;
          });
        },
        null,
        "+=0.38"
      );

      timeline.call(() => {
        backgroundTextItems.forEach((item) => {
          item.classList.remove("highlight");
          item.classList.add("highlight-reverse");
        });
      });

      timeline.call(
        () => {
          backgroundTextItems.forEach((item) => {
            item.classList.remove("highlight-reverse");
          });
        },
        null,
        "+=0.38"
      );

      timeline.to(backgroundTextItems, {
        opacity: 0.45,
        duration: 0.4,
        ease,
      });

      return timeline;
    }

    // 7. Row Activation & Deactivation
    function activateRow(row) {
      const rowId = row.dataset.rowId;
      if (state.activeRowId === rowId) return;

      const previousActive = container.querySelector(".hero-text-row.active");
      if (previousActive) {
        deactivateRow(previousActive, true);
      }

      row.classList.add("active");
      state.activeRowId = rowId;
      setActiveRow(rowId);

      const text = row.querySelector(".hero-text-content")?.dataset.text || "";
      const chars = splitTexts[rowId]?.chars || [];
      const innerSpans = row.querySelectorAll(".hero-char-inner");

      switchGlowLayer(rowId);
      startKineticAnimation(text);

      if (state.textRevealAnimation) {
        state.textRevealAnimation.kill();
      }
      state.textRevealAnimation = createTextRevealAnimation(rowId);

      const timeline = gsap.timeline();
      timeline.to(
        chars,
        {
          maxWidth: (i, target) => parseFloat(target.dataset.hoverWidth),
          duration: 0.64,
          stagger: 0.04,
          ease,
        },
        0
      );

      timeline.to(
        innerSpans,
        {
          x: -28,
          duration: 0.64,
          stagger: 0.04,
          ease,
        },
        0.04
      );
    }

    function deactivateRow(row, isSwitching = false) {
      const rowId = row.dataset.rowId;
      row.classList.remove("active");

      if (!isSwitching) {
        state.activeRowId = null;
        setActiveRow(null);
        switchGlowLayer("default");
        fadeOutKineticAnimation();

        if (state.textRevealAnimation) {
          state.textRevealAnimation.kill();
        }
        state.textRevealAnimation = resetBackgroundTextWithAnimation();
      }

      const chars = splitTexts[rowId]?.chars || [];
      const innerSpans = row.querySelectorAll(".hero-char-inner");

      const timeline = gsap.timeline();
      timeline.to(
        innerSpans,
        {
          x: 0,
          duration: 0.55,
          stagger: 0.03,
          ease,
        },
        0
      );

      timeline.to(
        chars,
        {
          maxWidth: (i, target) => parseFloat(target.dataset.charWidth),
          duration: 0.55,
          stagger: 0.03,
          ease,
        },
        0.04
      );
    }

    // Attach row events
    textRows.forEach((row) => {
      const area = row.querySelector(".hero-interactive-area");
      if (!area) return;

      area.addEventListener("mouseenter", () => activateRow(row));
      area.addEventListener("mouseleave", () => {
        if (state.activeRowId === row.dataset.rowId) {
          deactivateRow(row);
        }
      });

      // Mobile touch / click toggle
      area.addEventListener("click", () => {
        if (state.activeRowId === row.dataset.rowId) {
          deactivateRow(row);
        } else {
          activateRow(row);
        }
      });
    });

    // 8. Mouse Parallax on Ambient Keywords
    let lastParallaxTime = 0;
    const onMouseMove = (e) => {
      const now = Date.now();
      if (now - lastParallaxTime < 35) return;
      lastParallaxTime = now;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      backgroundTextItems.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed || "0.3");
        gsap.to(el, {
          x: offsetX * 45 * speed,
          y: offsetY * 28 * speed,
          duration: 0.8,
          ease: mouseEase,
          overwrite: "auto",
        });
      });
    };

    const onMouseLeave = () => {
      backgroundTextItems.forEach((el) => {
        gsap.to(el, { x: 0, y: 0, duration: 1.2, ease });
      });
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // Subtle floating sine wave on ambient words
    backgroundTextItems.forEach((el, index) => {
      const delay = index * 0.15;
      const floatAmount = 4 + (index % 3) * 2;
      gsap.to(el, {
        y: `+=${floatAmount}`,
        duration: 3 + (index % 2),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay,
      });
    });

    const onResize = () => {
      clearTimeout(window._heroResizeTimer);
      window._heroResizeTimer = setTimeout(updateCharacterWidths, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      forceResetKinetic();
      Object.values(splitTexts).forEach((split) => {
        try {
          split.revert();
        } catch {
          // ignore
        }
      });
    };
  }, []);

  // Replay window reveal on photo card
  const replayPhotoReveal = () => {
    const container = containerRef.current;
    if (!container) return;

    const photoWindow = container.querySelector(".hero-photo-window");
    const photoBackdrop = container.querySelector(".hero-photo-backdrop");
    const photoImg = container.querySelector(".hero-photo-img");
    const shutterEdge = container.querySelector(".hero-shutter-edge");
    if (!photoWindow) return;

    gsap.killTweensOf([photoWindow, photoBackdrop, photoImg, shutterEdge]);

    gsap
      .timeline()
      .set(photoWindow, { clipPath: "inset(0% 100% 0% 0% round 20px)" })
      .set(photoBackdrop, { scaleX: 0 })
      .set(shutterEdge, { left: "0%", opacity: 1 })
      .to(
        photoBackdrop,
        { scaleX: 1, duration: 1.5, ease: "expo.inOut", transformOrigin: "left top" },
        0
      )
      .to(
        photoWindow,
        { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.5, ease: "expo.inOut" },
        0
      )
      .fromTo(
        photoImg,
        { scale: 1.18, x: -12 },
        { scale: 1, x: 0, duration: 1.8, ease: "expo.out" },
        0
      )
      .to(
        shutterEdge,
        { left: "100%", opacity: 0, duration: 1.5, ease: "expo.inOut" },
        0
      );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-between py-6 px-6 overflow-hidden max-w-[1240px] mx-auto select-none"
    >
      {/* Layer 1: Atmospheric Glow Swatches */}
      <div className="hero-glow-layer default" data-glow-id="default"></div>
      <div className="hero-glow-layer build" data-glow-id="build"></div>
      <div className="hero-glow-layer ship" data-glow-id="ship"></div>
      <div className="hero-glow-layer solve" data-glow-id="solve"></div>

      {/* Layer 2: Floating Ambient Technical Keywords */}
      <div className="hero-text-background" aria-hidden="true">
        {AMBIENT_WORDS.map((item, idx) => (
          <div
            key={idx}
            className="hero-text-item"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}
            data-text={item.text}
            data-parallax-speed={item.speed}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Layer 3: Kinetic Fullscreen Rotating Type Burst */}
      <div className="hero-kinetic-type" id="hero-kinetic-type" aria-hidden="true">
        <div className="hero-type-line odd">build build build build</div>
        <div className="hero-type-line even">ship ship ship ship</div>
        <div className="hero-type-line odd">solve solve solve solve</div>
        <div className="hero-type-line even">build build build build</div>
        <div className="hero-type-line odd">ship ship ship ship</div>
        <div className="hero-type-line even">solve solve solve solve</div>
        <div className="hero-type-line odd">build build build build</div>
        <div className="hero-type-line even">ship ship ship ship</div>
        <div className="hero-type-line odd">solve solve solve solve</div>
        <div className="hero-type-line even">build build build build</div>
      </div>

      {/* TOP HEADER: Editorial metadata */}
      <div className="hero-ambient-header relative z-20 flex items-center justify-between border-b border-line/60 pb-3 text-xs font-mono text-ink-faint tracking-wider mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-sm shadow-accent/50"></span>
          <span className="font-semibold text-ink">SWANTIN JO MATHEW — PORTFOLIO</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="font-bold text-ink">[ 00 ] INTRODUCTION</span>
          <span className="text-accent font-medium">✦ CS UNDERGRAD &amp; FULL-STACK DEVELOPER</span>
        </div>
      </div>

      {/* MAIN STAGE: 2-Column Grid (Sliced Typography & Bio on Left, Prominent Photo Card Cluster on Right) */}
      <div className="relative z-20 my-auto grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Sliced Interactive Typography + Bio + CTAs */}
        <div className="flex flex-col justify-center">
          {/* Notable Name Header */}
          <div className="hero-name-header mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-line shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-sm shadow-accent/50"></span>
              <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">PORTFOLIO OF</span>
            </div>
            <h1 className="hero-name-title font-display font-black text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.05] tracking-tight text-ink select-none">
              Swantin Jo Mathew<span className="text-accent">.</span>
            </h1>
            <p className="font-mono text-xs text-ink-faint tracking-wider mt-1">
              COMPUTER SCIENCE UNDERGRADUATE · FULL-STACK DEVELOPER & PROBLEM SOLVER
            </p>
          </div>

          <p className="font-mono text-xs text-ink-faint tracking-wider mb-1.5 mt-2">
            // INTERACTIVE CORE —
          </p>

          {/* Sliced Typography */}
          <div className="hero-sliced-container">
            {ROWS.map((row) => (
              <div
                key={row.id}
                className={`hero-text-row ${activeRow === row.id ? "active" : ""}`}
                data-row-id={row.id}
              >
                <div className="hero-text-content font-display" data-text={row.text}>
                  {row.text}
                </div>
                <div
                  className="hero-interactive-area"
                  aria-label={row.text}
                ></div>
              </div>
            ))}
          </div>

          {/* Bio & CTAs */}
          <div className="hero-bio-block border-t border-line/60 pt-5 max-w-[560px]">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-2">
              Let's engineer <span className="text-accent">something real.</span>
            </h2>
            <p className="text-ink-soft text-sm md:text-base leading-relaxed mb-5">
              I'm Swantin Jo Mathew — a Computer Science undergraduate at Model Engineering College and Technical Analyst Intern. I engineer custom enterprise ERP modules, full-stack web platforms, and agentic AI systems.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-ink text-page hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                See my work →
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-line-strong hover:border-ink hover:-translate-y-0.5 transition-all bg-surface/70 backdrop-blur-xs text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Experience & Journey →
              </a>
              <span className="font-mono text-xs text-accent bg-accent-soft/70 border border-accent/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                Ongoing: Tech Analyst Intern @ V&A
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Prominent Photo Card Cluster with Left-to-Right Window Reveal */}
        <div className="relative flex flex-col items-center justify-center shrink-0 mx-auto lg:mx-0">
          
          {/* Decorative Rotating circular badge */}
          <div className="absolute -top-7 -right-7 w-[110px] h-[110px] z-30 pointer-events-none hidden sm:block">
            <svg viewBox="0 0 130 130" className="animate-spin-slow w-full h-full">
              <defs>
                <path
                  id="heroCirclePath"
                  d="M 65,65 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                  fill="none"
                />
              </defs>
              <text
                fontFamily="IBM Plex Mono, monospace"
                fontSize="10"
                fontWeight="600"
                fill="#565B62"
                letterSpacing="2"
              >
                <textPath href="#heroCirclePath">
                  BUILD SOMETHING · SHIP IT · KEEP LEARNING ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-sm"></div>
            </div>
          </div>

          {/* Floating Index Tag */}
          <div className="absolute -top-5 left-0 z-20 font-mono text-xs font-semibold text-ink-faint">
            <span className="text-accent font-bold">/00</span> PROFILE
          </div>

          {/* Main Interactive Photo Card */}
          <div
            onClick={replayPhotoReveal}
            className="relative w-[260px] md:w-[280px] h-[330px] md:h-[360px] cursor-pointer group select-none"
          >
            {/* Layer 1: Solid accent offset backdrop (unfolds from left top) */}
            <div className="hero-photo-backdrop absolute inset-0 bg-accent/25 rounded-2xl translate-x-3 translate-y-3 pointer-events-none origin-left"></div>

            {/* Layer 2: Main Window Clipped Container */}
            <div className="hero-photo-window relative w-full h-full rounded-2xl overflow-hidden border border-line shadow-2xl bg-surface">
              <img
                src={`${import.meta.env.BASE_URL}profile-photo.jpg`}
                alt="Swantin Jo Mathew"
                className="hero-photo-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://github.com/swantinmathew.png";
                }}
              />

              {/* Layer 3: Leading Edge Shutter Line sweeping from left to right */}
              <div
                className="hero-shutter-edge absolute top-0 bottom-0 w-[3px] bg-accent shadow-[0_0_14px_#1E8E5A] pointer-events-none z-20"
                style={{ left: 0 }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
