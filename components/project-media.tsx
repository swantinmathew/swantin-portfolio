"use client";

import * as React from "react";
import Image from "next/image";
import { Project } from "@/content/projects";
import { ProjectPreviewMockup } from "./project-preview-mockup";

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

  // 3. Rich architectural mockup interface
  return (
    <div
      style={transitionStyle}
      className={`relative overflow-hidden rounded-[16px] bg-[#0B0F17] border border-slate-200 dark:border-slate-800 shadow-[var(--shadow-card)] group-hover:border-slate-400 dark:group-hover:border-slate-700 transition-colors ${aspectRatio} ${className}`}
    >
      <ProjectPreviewMockup project={project} />
    </div>
  );
}
