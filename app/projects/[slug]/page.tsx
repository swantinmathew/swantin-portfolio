import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/content/projects";
import { ProjectMedia } from "@/components/project-media";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Case Study | Swantin Jo Mathew`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const caseStudy = project.caseStudy;

  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pb-24">
        {/* Back Link & Hero Banner */}
        <section className="site-container pt-8 md:pt-14 pb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 type-meta text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 min-h-[44px] py-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to all projects</span>
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400 mb-3">
              <span>{project.role}</span>
              {project.duration && <span>· {project.duration}</span>}
              {project.featured && (
                <span className="px-2 py-0.5 rounded-[8px] bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold">
                  Featured Project
                </span>
              )}
            </div>

            <h1 className="type-h1 text-slate-950 dark:text-white mb-4">
              {project.title}
            </h1>

            <p className="type-h3 font-normal text-emerald-600 dark:text-emerald-400 mb-6">
              {project.tagline}
            </p>

            {/* Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="type-meta px-2.5 py-1 rounded-[8px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[8px] text-xs font-mono font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors min-h-[44px]"
                >
                  <span>Live Deployment</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[8px] text-xs font-mono font-medium border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-300 transition-colors min-h-[44px]"
              >
                <span>View Source Code</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Media Feature */}
        <section className="site-container my-8">
          <div className="w-full max-w-4xl mx-auto">
            <ProjectMedia project={project} aspectRatio="aspect-[16/9]" />
          </div>
        </section>

        {/* Case Study Details */}
        {caseStudy && (
          <section className="site-container my-12 md:my-16">
            <div className="max-w-3xl mx-auto space-y-16">
              {/* Problem Statement */}
              <div>
                <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-2">
                  01 · Overview
                </p>
                <h2 className="type-h2 text-slate-950 dark:text-white mb-4">
                  The Problem
                </h2>
                <p className="type-body text-slate-600 dark:text-slate-400 leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>

              {/* Architecture Diagram (rendered if present) */}
              {caseStudy.architecture && (
                <div>
                  <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-2">
                    02 · Architecture
                  </p>
                  <h2 className="type-h2 text-slate-950 dark:text-white mb-4">
                    System Design
                  </h2>
                  <div className="rounded-[16px] overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={caseStudy.architecture.src}
                      alt={caseStudy.architecture.alt}
                      className="w-full h-auto object-contain rounded-[8px]"
                    />
                  </div>
                </div>
              )}

              {/* Key Technical Decisions (Numbered) */}
              {caseStudy.decisions && caseStudy.decisions.length > 0 && (
                <div>
                  <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-2">
                    {caseStudy.architecture ? "03 · Architecture Decisions" : "02 · Architecture Decisions"}
                  </p>
                  <h2 className="type-h2 text-slate-950 dark:text-white mb-8">
                    Key Tradeoffs &amp; Decisions
                  </h2>
                  <div className="space-y-6">
                    {caseStudy.decisions.map((decision, idx) => (
                      <div
                        key={decision.title}
                        className="rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-6 shadow-[var(--shadow-card)]"
                      >
                        <div className="flex items-center gap-3 mb-2 font-mono text-xs">
                          <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <h3 className="type-h3 text-slate-950 dark:text-white">
                            {decision.title}
                          </h3>
                        </div>
                        <p className="type-body text-slate-600 dark:text-slate-400 pl-9">
                          {decision.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Real Measured Metrics (Only if present) */}
              {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                <div>
                  <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-2">
                    Measured Results
                  </p>
                  <h2 className="type-h2 text-slate-950 dark:text-white mb-6">
                    Performance Metrics
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {caseStudy.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 text-center"
                      >
                        <span className="type-h2 text-emerald-600 dark:text-emerald-400 block mb-1">
                          {m.value}
                        </span>
                        <span className="type-meta text-slate-500 dark:text-slate-400">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learnings */}
              {caseStudy.learnings && caseStudy.learnings.length > 0 && (
                <div>
                  <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-2">
                    Reflection
                  </p>
                  <h2 className="type-h2 text-slate-950 dark:text-white mb-6">
                    What I Learned
                  </h2>
                  <ul className="space-y-3">
                    {caseStudy.learnings.map((learning, idx) => (
                      <li key={idx} className="flex items-start gap-3 type-body text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Next / Previous Project Navigation */}
        <section className="site-container pt-12 mt-16 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 font-mono text-xs">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors py-2"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>
                Prev: <strong className="text-slate-900 dark:text-slate-100">{prevProject.title}</strong>
              </span>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors py-2 text-right"
            >
              <span>
                Next: <strong className="text-slate-900 dark:text-slate-100">{nextProject.title}</strong>
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
