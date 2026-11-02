"use client";

import * as React from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export function MagneticButton({ children, className = "", ...props }: MagneticButtonProps) {
  const btnRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    // Desktop pointer only (must match (hover: hover) and (pointer: fine))
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Subtle offset: max 6px
      const offsetX = Math.max(-6, Math.min(6, deltaX * 0.15));
      const offsetY = Math.max(-6, Math.min(6, deltaY * 0.15));

      gsap.to(btn, {
        x: offsetX,
        y: offsetY,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a ref={btnRef} className={`will-change-transform ${className}`} {...props}>
      {children}
    </a>
  );
}
