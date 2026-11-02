"use client";

import * as React from "react";
import { Project } from "@/content/projects";
import {
  FileText,
  Search,
  CheckCircle2,
  GitPullRequest,
  GitCommit,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Bot,
  Zap,
} from "lucide-react";

export function ProjectPreviewMockup({ project }: { project: Project }) {
  if (project.slug === "docent") {
    return <DocentMockup />;
  }
  if (project.slug === "githubpulse") {
    return <GitHubPulseMockup />;
  }
  if (project.slug === "cp-coach") {
    return <CPCoachMockup />;
  }
  return <SketchFlowMockup />;
}

// 1. Docent: High-performance Document RAG & Streaming UI
function DocentMockup() {
  return (
    <div className="w-full h-full bg-[#0B0F17] text-slate-100 flex flex-col font-sans text-xs select-none p-3 sm:p-5">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-slate-300 font-medium">docent.internal/rag/stream</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-[8px] border border-emerald-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>pgvector 1536d</span>
        </div>
      </div>

      {/* Main split preview */}
      <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
        {/* Left: Document index summary */}
        <div className="col-span-4 hidden sm:flex flex-col gap-2 p-3 rounded-[8px] bg-slate-900/80 border border-slate-800/80">
          <div className="flex items-center gap-2 text-slate-300 font-semibold font-mono text-[11px]">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">annual_report.pdf</span>
          </div>
          <div className="space-y-1.5 mt-2">
            <div className="p-1.5 rounded bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block font-mono">Chunk #14 (98% match)</span>
              <p className="text-[10px] text-slate-300 line-clamp-2">"Q3 operating margin expanded by 240bps YoY..."</p>
            </div>
            <div className="p-1.5 rounded bg-slate-800/40 border border-slate-700/30">
              <span className="text-[10px] text-slate-400 block font-mono">Chunk #22 (94% match)</span>
              <p className="text-[10px] text-slate-300 line-clamp-2">"Cloud infrastructure costs normalized..."</p>
            </div>
          </div>
          <div className="mt-auto pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>Latency</span>
            <span className="text-emerald-400">142ms TTFT</span>
          </div>
        </div>

        {/* Right: Live RAG chat stream */}
        <div className="col-span-12 sm:col-span-8 flex flex-col justify-between p-3 rounded-[8px] bg-slate-900/90 border border-slate-800">
          <div className="space-y-3">
            {/* User prompt */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center text-[10px] font-bold shrink-0">
                U
              </div>
              <div className="bg-slate-800 px-3 py-1.5 rounded-[8px] text-slate-200 text-xs">
                What were the Q3 operating margin drivers?
              </div>
            </div>

            {/* AI Assistant Streamed Answer */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-[10px] shrink-0">
                <Bot className="w-3 h-3" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="p-2.5 rounded-[8px] bg-slate-950/70 border border-slate-800/80 text-slate-200 leading-relaxed text-[11px] sm:text-xs">
                  <p>
                    According to <span className="text-emerald-400 font-semibold">[Section 3.2, Page 14]</span>, operating margins expanded to <strong className="text-white">28.4%</strong> due to automated cloud workload optimization and reduced vendor overhead.
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>LangGraph State Verified · 2 citations verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input simulation */}
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-slate-500 text-[11px] font-mono">
            <span>Ask question over document...</span>
            <span className="text-emerald-400 font-bold">↵ SSE Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. GitHubPulse: Agentic Data Warehouse & Developer Analytics
function GitHubPulseMockup() {
  return (
    <div className="w-full h-full bg-[#0B0F17] text-slate-100 flex flex-col font-sans text-xs select-none p-3 sm:p-5">
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="ml-2 text-slate-300 font-medium">githubpulse.dev/analytics/dashboard</span>
        </div>
        <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
          ETL Synced
        </span>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="p-2 sm:p-2.5 rounded-[8px] bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block">PR Turnaround</span>
          <span className="text-sm sm:text-base font-bold text-white">4.2 hrs</span>
          <span className="text-[10px] text-emerald-400 block font-mono">↓ 32% faster</span>
        </div>
        <div className="p-2 sm:p-2.5 rounded-[8px] bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block">Commit Velocity</span>
          <span className="text-sm sm:text-base font-bold text-white">46 / wk</span>
          <span className="text-[10px] text-emerald-400 block font-mono">↑ 14% delta</span>
        </div>
        <div className="p-2 sm:p-2.5 rounded-[8px] bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block">Bus Factor Risk</span>
          <span className="text-sm sm:text-base font-bold text-emerald-400">Low (3.8)</span>
          <span className="text-[10px] text-slate-400 block font-mono">Healthy spread</span>
        </div>
      </div>

      {/* Bottom Split: Pipeline flow & Agent Diagnostic */}
      <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
        <div className="col-span-6 p-2.5 rounded-[8px] bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="type-meta text-slate-400 uppercase font-semibold">ETL Pipeline Status</span>
            <div className="mt-2 space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center justify-between text-slate-300">
                <span>GitHub REST Extraction</span>
                <span className="text-emerald-400">✓ 240 Commits</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Pandas Aggregation</span>
                <span className="text-emerald-400">✓ Normalized</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Postgres Star Schema</span>
                <span className="text-emerald-400">✓ Loaded</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
            <Layers className="w-3 h-3 text-emerald-500" />
            <span>Warehouse tables indexed</span>
          </div>
        </div>

        <div className="col-span-6 p-2.5 rounded-[8px] bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="type-meta text-emerald-400 uppercase font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>AI Diagnostic Agent</span>
            </span>
            <p className="mt-1.5 text-[11px] text-slate-300 leading-snug">
              "Review bottlenecks cleared in auth module. Tuesday commit volume indicates strong sprint momentum."
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-500">LangGraph Agent Reasoning</span>
        </div>
      </div>
    </div>
  );
}

// 3. CP Coach: Competitive Programming Profile Analytics
function CPCoachMockup() {
  return (
    <div className="w-full h-full bg-[#0B0F17] text-slate-100 flex flex-col font-sans text-xs select-none p-3 sm:p-5">
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="ml-2 text-slate-300 font-medium">cpcoach.app/profile/analytics</span>
        </div>
        <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
          Codeforces API Sync
        </span>
      </div>

      {/* User Header & Sparkline */}
      <div className="p-3 rounded-[8px] bg-slate-900/90 border border-slate-800 mb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-slate-400">Current Rating</span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white font-mono">1685</span>
            <span className="text-xs text-emerald-400 font-semibold">Expert</span>
            <span className="text-[10px] text-slate-400 font-mono">Max: 1742</span>
          </div>
        </div>

        {/* Visual curve */}
        <div className="w-28 h-8">
          <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,24 15,20 30,22 45,15 60,18 75,8 90,12 100,5"
            />
          </svg>
        </div>
      </div>

      {/* Topic Weakness & Practice Recommendation */}
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        <div className="p-2.5 rounded-[8px] bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="type-meta text-slate-400 uppercase font-semibold">Topic Mastery Radar</span>
          <div className="space-y-1.5 font-mono text-[10px]">
            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span>Dynamic Programming</span>
                <span>85%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span>Graph Algorithms</span>
                <span>74%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[74%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span>Number Theory</span>
                <span>68%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500/70 w-[68%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-[8px] bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="type-meta text-emerald-400 uppercase font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Gemini Practice Path</span>
            </span>
            <p className="mt-1.5 text-[11px] text-slate-300 leading-snug">
              Focus next: 3 1600-rated bitmask DP challenges to overcome contest rating plateau.
            </p>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Personalized Curricula</span>
        </div>
      </div>
    </div>
  );
}

// 4. SketchFlow: Architectural Visualizer
function SketchFlowMockup() {
  return (
    <div className="w-full h-full bg-[#0B0F17] text-slate-100 flex flex-col font-sans text-xs select-none p-3 sm:p-5">
      {/* Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="ml-2 text-slate-300 font-medium">sketchflow.app/canvas/diagram-recognizer</span>
        </div>
        <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
          Canvas Active
        </span>
      </div>

      {/* Visual Canvas Diagram Transformation */}
      <div className="flex-1 min-h-0 p-3 rounded-[8px] bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-200">
            [Client App]
            <span className="block text-slate-500 text-[9px] mt-0.5">Next.js Client</span>
          </div>
          <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300">
            [API Gateway]
            <span className="block text-emerald-400/70 text-[9px] mt-0.5">FastAPI Router</span>
          </div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-200">
            [Database]
            <span className="block text-slate-500 text-[9px] mt-0.5">PostgreSQL</span>
          </div>
        </div>

        {/* Connector line representation */}
        <div className="py-2 flex items-center justify-center gap-4 text-emerald-500 font-mono text-xs">
          <span>────────►</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
            SVG Vector Conversion
          </span>
          <span>────────►</span>
        </div>

        <div className="p-2 rounded bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px]">
          <span className="text-slate-300">
            Hand-drawn sketch recognized: 3 connected microservice components
          </span>
          <span className="text-emerald-400 font-mono text-[10px] shrink-0 font-semibold">
            Export JSON / Mermaid
          </span>
        </div>
      </div>
    </div>
  );
}
