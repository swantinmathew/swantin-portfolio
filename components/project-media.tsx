"use client";

import * as React from "react";
import Image from "next/image";
import { Project } from "@/content/projects";
import { Terminal, Layers, FileCode2, Cpu } from "lucide-react";

interface ProjectMediaProps {
  project: Project;
  aspectRatio?: string;
  className?: string;
}

export function ProjectMedia({
  project,
  aspectRatio = "aspect-[16/10]",
  className = "",
}: ProjectMediaProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Play video only when in viewport; pause when offscreen
  React.useEffect(() => {
    if (!project.media || project.media.type !== "video" || !videoRef.current) {
      return;
    }

    const videoElement = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(() => {
              // Autoplay policy prevented playback
            });
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [project.media]);

  const transitionStyle: React.CSSProperties = {
    viewTransitionName: `project-media-${project.slug}`,
  };

  // 1. Video media
  if (project.media && project.media.type === "video") {
    return (
      <div
        style={transitionStyle}
        className={`relative overflow-hidden rounded-[16px] bg-slate-900 border border-slate-200 dark:border-slate-800 ${aspectRatio} ${className}`}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.media.poster}
          className="w-full h-full object-cover"
        >
          <source src={project.media.src} type="video/webm" />
          <source src={project.media.src.replace(".webm", ".mp4")} type="video/mp4" />
        </video>
      </div>
    );
  }

  // 2. Image media
  if (project.media && project.media.type === "image") {
    return (
      <div
        style={transitionStyle}
        className={`relative overflow-hidden rounded-[16px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${aspectRatio} ${className}`}
      >
        <Image
          src={project.media.src}
          alt={project.media.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

  // 3. Tasteful neutral placeholder block (never a broken image)
  // Distinctive minimalist architectural preview matching the project
  const iconMap: Record<string, React.ReactNode> = {
    docent: <FileCode2 className="w-8 h-8 text-emerald-500/80 mb-2" />,
    githubpulse: <Layers className="w-8 h-8 text-emerald-500/80 mb-2" />,
    "cp-coach": <Cpu className="w-8 h-8 text-emerald-500/80 mb-2" />,
    sketchflow: <Terminal className="w-8 h-8 text-emerald-500/80 mb-2" />,
  };

  return (
    <div
      style={transitionStyle}
      className={`relative overflow-hidden rounded-[16px] bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center p-6 text-center select-none group-hover:border-slate-400 dark:group-hover:border-slate-700 transition-colors ${aspectRatio} ${className}`}
    >
      {/* Subtle dotted engineering background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center">
        {iconMap[project.slug] || <Terminal className="w-8 h-8 text-emerald-500/80 mb-2" />}
        <span className="font-heading font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200">
          {project.title}
        </span>
        <span className="type-meta text-slate-500 dark:text-slate-400 mt-1">
          {project.stack[0]} · {project.stack[1] || "Full Stack"}
        </span>
      </div>
    </div>
  );
}
