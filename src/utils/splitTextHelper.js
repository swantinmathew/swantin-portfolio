import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Splits text inside a DOM element or selector into character and word spans.
 * Uses GSAP SplitText if available, or falls back to a clean native DOM splitter.
 */
export function splitTextIntoChars(target, options = {}) {
  try {
    const config = {
      type: "words,chars",
      wordsClass: options.wordsClass || "split-word inline-block",
      charsClass: options.charsClass || "split-char inline-block",
      ...options,
    };
    const split = new SplitText(target, config);
    return {
      chars: split.chars,
      words: split.words,
      revert: () => {
        try {
          split.revert();
        } catch {
          // ignore
        }
      },
    };
  } catch {
    // Graceful native fallback
    const elements =
      typeof target === "string"
        ? document.querySelectorAll(target)
        : [target];
    const chars = [];
    const words = [];
    const wordsClass = options.wordsClass || "split-word inline-block";
    const charsClass = options.charsClass || "split-char inline-block";

    elements.forEach((el) => {
      if (!el || el.dataset.splitDone) return;
      el.dataset.splitDone = "true";

      const processNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          if (!text) return;
          const frag = document.createDocumentFragment();
          const wordList = text.split(/(\s+)/);

          wordList.forEach((chunk) => {
            if (/^\s+$/.test(chunk)) {
              frag.appendChild(document.createTextNode(chunk));
            } else if (chunk.length > 0) {
              const wordSpan = document.createElement("span");
              wordSpan.className = wordsClass;
              Array.from(chunk).forEach((char) => {
                const charSpan = document.createElement("span");
                charSpan.className = charsClass;
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
                chars.push(charSpan);
              });
              frag.appendChild(wordSpan);
              words.push(wordSpan);
            }
          });

          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          Array.from(node.childNodes).forEach(processNode);
        }
      };

      Array.from(el.childNodes).forEach(processNode);
    });

    return {
      chars,
      words,
      revert: () => {},
    };
  }
}

/**
 * 3D character flip animation that replays on scroll in and scroll back.
 * Abstracted from the user's CodePen reference.
 */
export function animate3DFlip(target, trigger = target) {
  const split = splitTextIntoChars(target, {
    wordsClass: "about-3d-word",
    charsClass: "about-3d-char",
  });

  if (!split || !split.chars || split.chars.length === 0) return null;

  const elements =
    typeof target === "string" ? document.querySelectorAll(target) : [target];
  elements.forEach((el) => {
    el.classList.add("about-3d-title");
    if (el.parentElement) {
      el.parentElement.classList.add("about-3d-container");
    }
  });

  const tween = gsap.fromTo(
    split.chars,
    {
      opacity: 0,
      scale: 0,
      y: 75,
      rotationX: 180,
      transformOrigin: "0% 50% -50",
    },
    {
      duration: 1.0,
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
      transformOrigin: "0% 50% -50",
      ease: "back.out(1.7)",
      stagger: 0.02,
      scrollTrigger: {
        trigger: trigger,
        start: "top 85%",
        toggleActions: "restart none restart reset",
      },
    }
  );

  return {
    split,
    tween,
    replay: () => {
      gsap.killTweensOf(split.chars);
      gsap.fromTo(
        split.chars,
        {
          opacity: 0,
          scale: 0,
          y: 75,
          rotationX: 180,
          transformOrigin: "0% 50% -50",
        },
        {
          duration: 1.0,
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          transformOrigin: "0% 50% -50",
          ease: "back.out(1.7)",
          stagger: 0.02,
        }
      );
    },
  };
}

