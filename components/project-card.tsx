import Link from "next/link";
import { Project } from "@/content/projects";
import { ProjectMedia } from "./project-media";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  if (featured) {
    // Featured full-width card (Docent): media on one side (16:10), content on the other
    return (
      <article className="rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 md:p-8 shadow-[var(--shadow-card)] hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-300 group">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Media Column (7 cols) */}
          <div className="lg:col-span-7">
            <ProjectMedia project={project} aspectRatio="aspect-[16/10]" />
          </div>

          {/* Content Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                <span>{project.role}</span>
                {project.duration && <span>· {project.duration}</span>}
              </div>

              <h3 className="type-h2 text-slate-950 dark:text-white mb-2">
                {project.title}
              </h3>

              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-4">
                {project.tagline}
              </p>

              {/* 2 Highlights */}
              <ul className="space-y-2 mb-6 text-xs text-slate-600 dark:text-slate-300">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="type-meta px-2.5 py-1 rounded-[8px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons (data-driven, full-width on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[8px] text-xs font-mono font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors min-h-[44px]"
                >
                  <span>Live</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[8px] text-xs font-mono font-medium border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-300 transition-colors min-h-[44px]"
              >
                <span>Code</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>

              {project.caseStudy && (
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[8px] text-xs font-mono font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity min-h-[44px]"
                >
                  <span>Case study</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid Card (CP Coach, GitHubPulse, SketchFlow)
  return (
    <article className="rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-[var(--shadow-card)] hover:border-slate-400 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Media */}
        <div className="mb-5">
          <ProjectMedia project={project} aspectRatio="aspect-[16/10]" />
        </div>

        {/* Role & Duration meta */}
        <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs text-slate-500 dark:text-slate-400">
          <span className="truncate">{project.role}</span>
          {project.duration && <span className="shrink-0">· {project.duration}</span>}
        </div>

        {/* Title */}
        <h3 className="type-h3 text-slate-950 dark:text-white mb-1.5">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {project.tagline}
        </p>

        {/* 2 Highlights */}
        <ul className="space-y-1.5 mb-5 text-xs text-slate-600 dark:text-slate-300">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="line-clamp-2">{h}</span>
            </li>
          ))}
        </ul>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1 mb-6">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="type-meta px-2 py-0.5 rounded-[8px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="type-meta px-2 py-0.5 rounded-[8px] bg-slate-100 dark:bg-slate-800 text-slate-400">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Buttons: full width on mobile, aligned at bottom */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-[8px] text-xs font-mono font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors min-h-[44px]"
          >
            <span>Live</span>
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </a>
        )}

        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-[8px] text-xs font-mono font-medium border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-300 transition-colors min-h-[44px]"
        >
          <span>Code</span>
          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </a>

        {project.caseStudy && (
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-[8px] text-xs font-mono font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity min-h-[44px]"
          >
            <span>Case study</span>
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
