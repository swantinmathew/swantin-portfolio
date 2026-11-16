const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const projects = [
  {
    slug: "docent",
    index: "01",
    title: "Docent",
    tagline: "Ask questions over PDFs with streamed, cited answers.",
    summary:
      "Automated sliding-window chunking & vector indexing in Supabase pgvector with a stateful LangGraph workflow and low-latency SSE token streaming.",
    role: "Full Stack Developer · Team of 1",
    duration: "2 weeks",
    featured: true,
    stack: [
      "Next.js 15",
      "FastAPI",
      "LangGraph",
      "Supabase",
      "pgvector",
      "PostgreSQL",
      "Tailwind CSS",
      "Python 3.11",
      "PyPDF",
    ],
    highlights: [
      "Automated PDF sliding-window chunking & vector indexing in Supabase pgvector",
      "Stateful LangGraph workflow execution with low-latency SSE token streaming",
    ],
    repoUrl: "https://github.com/swantinmathew/pdf-chat-rag",
    liveUrl: "https://pdf-chat-rag-kei5.vercel.app/",
    badgeText: "RAG + LangGraph Agent",
    shapeType: "ring",
    accentColor: "#1E8E5A",
    previewImage: asset("images/projects/docent/docent-hero.jpg"),
    problemStatement:
      "Static PDFs often contain mission-critical information that is cumbersome to search manually. Standard LLMs hallucinate or lack access to private document contents. Docent bridges this gap by converting multi-page PDFs into indexed vector knowledge, generating grounded answers with exact source citations.",
    pipelineTitle: "RAG ARCHITECTURE PIPELINE",
    pipelineSubtitle: "How Document Ingestion & Retrieval Works",
    screenshots: [
      {
        url: asset("images/projects/docent/docent-hero.jpg"),
        title: "Landing & Search Impact",
        caption: "Modern dark landing page with real-time RAG entry points and technical feature highlights.",
      },
      {
        url: asset("images/projects/docent/docent-architecture.png"),
        title: "RAG Architecture Pipeline",
        caption: "End-to-end 3-stage RAG document processing pipeline with Python 3.11 execution node.",
      },
      {
        url: asset("images/projects/docent/docent-upload.png"),
        title: "Document Ingestion & Chunking",
        caption: "Drag-and-drop PDF upload pipeline with 500-char sliding window chunker and vector embedding storage.",
      },
      {
        url: asset("images/projects/docent/docent-chat.png"),
        title: "Streaming RAG AI Chat",
        caption: "Active conversational interface with Supabase vector search and grounded citations.",
      },
    ],
    architectureStages: [
      {
        stage: "STAGE 01",
        title: "PDF Text Extraction",
        description:
          "Extracts raw text streams from multi-page PDFs using PyPDF while stripping null bytes and formatting artifacts.",
        stats: [
          { label: "Parsing Speed", value: "Sub-50ms / page" },
          { label: "File Support", value: "PDF 1.4 - 2.0" },
          { label: "Sanitization", value: "100% Clean Strings" },
        ],
        codeSnippet: `def load_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)
    extracted = ""
    for page in reader.pages:
        extracted += page.extract_text()
    return clean_text(extracted)`,
      },
      {
        stage: "STAGE 02",
        title: "Sliding-Window Chunker",
        description:
          "Splits extracted text into 500-character chunks with 50-character sentence boundary overlap to preserve semantic context across chunk edges.",
        stats: [
          { label: "Chunk Size", value: "500 chars" },
          { label: "Overlap", value: "50 chars" },
          { label: "Context Preservation", value: "Boundary-safe" },
        ],
      },
      {
        stage: "STAGE 03",
        title: "1536D Vector Engine",
        description:
          "Converts text chunks into 1,536-dimensional embeddings and executes fast cosine similarity search via Supabase pgvector.",
        stats: [
          { label: "Dimensions", value: "1,536D" },
          { label: "Vector Store", value: "Supabase pgvector" },
          { label: "Index Type", value: "HNSW / Cosine" },
        ],
      },
    ],
    keyFeatures: [
      {
        title: "Sliding-Window Semantic Chunking",
        description:
          "Prevents loss of context at paragraph splits by overlapping contiguous sentence boundaries.",
      },
      {
        title: "Stateful LangGraph Workflow",
        description:
          "Orchestrates multi-step retrieval, grounding validation, and answer generation with conditional retry edges.",
      },
      {
        title: "Low-Latency SSE Token Streaming",
        description:
          "Provides instant feedback to the user by streaming tokens over Server-Sent Events as they are synthesized.",
      },
      {
        title: "Grounded Citations",
        description:
          "Every answer links directly to the specific page and chunk source to eliminate hallucination.",
      },
    ],
  },
  {
    slug: "githubpulse",
    index: "02",
    title: "GitHubPulse",
    tagline: "The most intuitive way to diagnose Repository Health with multi-agent reasoning.",
    summary:
      "From raw Git commit history to multi-agent anomaly reasoning via LangGraph and 24-hour longitudinal telemetry. Built for engineering teams that demand deterministic data.",
    role: "Solo developer",
    duration: "3 weeks",
    featured: true,
    stack: [
      "Next.js",
      "FastAPI",
      "LangGraph",
      "PostgreSQL",
      "GitHub REST API",
      "Pandas",
      "APScheduler",
      "SSE",
      "Tailwind CSS",
    ],
    highlights: [
      "Automated GitHub REST API extraction into normalized PostgreSQL warehouse schema",
      "Autonomous LangGraph agent analyzing bus factor risks and review bottlenecks",
      "Real-time Server-Sent Events (SSE) streaming with sub-450ms ingestion latency",
    ],
    repoUrl: "https://github.com/swantinmathew/GiithubPulse",
    liveUrl: "https://giithub-pulse.vercel.app",
    badgeText: "Telemetry Engine + LangGraph Agent",
    shapeType: "ring",
    accentColor: "#E05D38",
    previewImage: asset("images/projects/githubpulse/githubpulse-hero.png"),
    problemStatement:
      "Traditional repository scanners provide shallow summaries or hallucinate on code review baselines. Engineering teams and open-source maintainers struggle to gauge true velocity, contributor bus-factor risks, and pull request review bottlenecks over time.",
    pipelineTitle: "THE 4-STAGE PROCESSING PIPELINE",
    pipelineSubtitle: "How unstructured GitHub API payload transforms into structured executive intelligence",
    screenshots: [
      {
        url: asset("images/projects/githubpulse/githubpulse-hero.png"),
        title: "Landing & Repository Health",
        caption: "Hero section highlighting deterministic Git commit history diagnostics and telemetry.",
      },
      {
        url: asset("images/projects/githubpulse/githubpulse-dashboard.png"),
        title: "Telemetry Overview Dashboard",
        caption: "Rolling 30-day commit cadence, PR turnaround velocity (94% optimal), and contributor risk distribution.",
      },
      {
        url: asset("images/projects/githubpulse/githubpulse-architecture.png"),
        title: "The 4-Stage Processing Pipeline",
        caption: "End-to-end pipeline: GitHub REST API ingest, Pandas engine, LangGraph agent reasoning, and APScheduler cron.",
      },
      {
        url: asset("images/projects/githubpulse/githubpulse-streaming.png"),
        title: "Real-Time SSE Streaming",
        caption: "Sub-second event stream pushing commit history and LangGraph node executions over HTTP/1.1 SSE (< 450ms latency).",
      },
      {
        url: asset("images/projects/githubpulse/githubpulse-distinctions.png"),
        title: "Engineered for Precision",
        caption: "Quantitative grounding with normalized 0-100 index, multi-signal anomaly checks, and 24h cron snapshots.",
      },
      {
        url: asset("images/projects/githubpulse/githubpulse-console.png"),
        title: "Repository Diagnostic Console",
        caption: "Interactive repository input bar with quick presets for fast exploration.",
      },
    ],
    architectureStages: [
      {
        stage: "STAGE 01 [INGEST]",
        title: "GitHub REST API",
        description:
          "Fetches 30-day commits, pull requests, review turnaround timestamps, and issue lifecycles with exponential backoff retry.",
        stats: [
          { label: "Protocol", value: "HTTP/1.1 SSE" },
          { label: "Ingestion Latency", value: "< 450ms" },
          { label: "Rate Limiting", value: "Exponential Backoff" },
        ],
      },
      {
        stage: "STAGE 02 [TRANSFORM]",
        title: "Pandas Engine",
        description:
          "Calculates review duration percentiles, commit cadence ratios, and bus factor distribution across contributors.",
        stats: [
          { label: "Analysis", value: "Vectorized Pandas" },
          { label: "Risk Modeling", value: "Bus Factor Index" },
          { label: "Aggregation", value: "Rolling 30-Day" },
        ],
      },
      {
        stage: "STAGE 03 [REASON]",
        title: "LangGraph Agent",
        description:
          "Executes stateful anomaly detection tools, identifies bottlenecks, and synthesizes diagnosis without LLM hallucinations.",
        stats: [
          { label: "Scoring", value: "Deterministic 0-100" },
          { label: "Filtering", value: "Context-Aware" },
          { label: "Execution", value: "Streamed Graph Nodes" },
        ],
      },
      {
        stage: "STAGE 04 [MONITOR]",
        title: "APScheduler Cron",
        description:
          "Writes point-in-time entries to repo_snapshots and schedules automated daily recurring runs for trend tracking.",
        stats: [
          { label: "Snapshots", value: "24h Longitudinal" },
          { label: "Automated Cron", value: "Background Sync" },
          { label: "Deployment", value: "Render + Actions" },
        ],
      },
    ],
    productionMetrics: [
      {
        value: "25 / 25",
        label: "Pytest Tests Passing",
        detail: "100% test pass rate",
      },
      {
        value: "12 / 12",
        label: "Pipeline Phases",
        detail: "Full feature completion",
      },
      {
        value: "24 Hours",
        label: "APScheduler Cron",
        detail: "Automated background sync",
      },
      {
        value: "CI / CD",
        label: "GitHub Actions",
        detail: "Render automated deploy",
      },
    ],
    keyFeatures: [
      {
        title: "Quantitative Grounding (0-100 Score)",
        description:
          "Scores are computed using deterministic mathematical weights across 4 core telemetry axes to prevent hallucinations.",
      },
      {
        title: "Multi-Signal Anomaly Checks",
        description:
          "Protects mature maintenance repositories with low commit volume from false abandonment warnings.",
      },
      {
        title: "24-Hour Longitudinal Snapshots",
        description:
          "APScheduler cron captures historical snapshots to highlight velocity trends and code health drift over time.",
      },
      {
        title: "Real-Time SSE Streaming",
        description:
          "Sub-450ms ingestion latency with Server-Sent Events, streaming LangGraph node execution events directly to the browser.",
      },
    ],
  },
  {
    slug: "sketchflow",
    index: "03",
    title: "SketchFlow",
    tagline: "Smart visual teaching platform converting rough sketches into structured architecture diagrams.",
    summary:
      "An interactive digital teaching board where educators draw diagrams in real-time. Features AI-driven diagram reconstruction, stroke normalization into clean SVGs, and a Gemini-powered multimodal conversational assistant for live technical explanations.",
    role: "Frontend & Full-Stack Developer · Team of 4",
    duration: "2 months",
    featured: true,
    stack: [
      "React",
      "Node.js",
      "Gemini Multimodal API",
      "Canvas API",
      "SVG Vector Engine",
      "Tailwind CSS",
      "REST APIs",
    ],
    highlights: [
      "Interactive digital canvas with vector stroke smoothing, shape snapping, and split-view comparison",
      "AI-driven reconstruction of freehand sketches into clean, organized SVG/PNG flowcharts and diagrams",
      "Gemini-powered multimodal AI assistant generating technical breakdowns and student-ready lesson notes",
    ],
    repoUrl: "https://github.com/swantinmathew/Sketch-Flow",
    liveUrl: "https://sketchflow-v-02.netlify.app/",
    badgeText: "Canvas Engine + Multimodal AI",
    shapeType: "triangle",
    accentColor: "#2563EB",
    previewImage: asset("images/projects/sketchflow/sketchflow-hero.jpg"),
    problemStatement:
      "Whiteboard sketches during software lectures or architecture discussions are typically discarded or captured as blurry photos. Students lack interactive notes, and educators lack tools that automatically convert hand-drawn diagrams into digital, vectorized architecture with step-by-step logic.",
    pipelineTitle: "SMART TEACHING & DIAGRAM RECONSTRUCTION PIPELINE",
    pipelineSubtitle: "How freehand sketches are digitized, analyzed, and explained in real-time",
    screenshots: [
      {
        url: asset("images/projects/sketchflow/sketchflow-hero.jpg"),
        title: "Future Teaching Platform",
        caption: "Dark landing interface highlighting interactive AI visual teaching and digital board capabilities.",
      },
      {
        url: asset("images/projects/sketchflow/sketchflow-analysis.jpg"),
        title: "AI Diagram Analysis & Assistant",
        caption: "Split-screen comparing rough sketch to AI-generated SVG diagram, technical breakdown, and active chat assistant.",
      },
      {
        url: asset("images/projects/sketchflow/sketchflow-canvas.png"),
        title: "Interactive Canvas Workspace",
        caption: "Full whiteboard workspace featuring toolbar tools (pen, shapes, text, eraser) and instant 'Analyse Diagram' trigger.",
      },
      {
        url: asset("images/projects/sketchflow/sketchflow-features.jpg"),
        title: "Core System Architecture",
        caption: "AI-driven diagram reconstruction and Gemini-powered contextual lesson analysis.",
      },
      {
        url: asset("images/projects/sketchflow/sketchflow-workflow.jpg"),
        title: "Seamless Educational Workflow",
        caption: "Interactive digital teaching board with split-view comparison and exportable student-ready materials.",
      },
    ],
    architectureStages: [
      {
        stage: "STAGE 01 [CAPTURE]",
        title: "Digital Canvas Engine",
        description:
          "Captures freehand vector strokes with undo/redo, real-time smoothing, and infinite zoom.",
        stats: [
          { label: "Input", value: "Vector Strokes" },
          { label: "Canvas Type", value: "Infinite / Multi-Page" },
          { label: "Tools", value: "Pencil, Shapes, Connectors" },
        ],
      },
      {
        stage: "STAGE 02 [RECONSTRUCT]",
        title: "AI Diagram Generator",
        description:
          "Analyzes drawn strokes, identifies geometric terminals (rectangles, diamonds, parallelograms), and outputs structured SVG/PNG.",
        stats: [
          { label: "Output Format", value: "Clean SVG & PNG" },
          { label: "Recognition", value: "Shape & Connector Snapping" },
          { label: "Precision", value: "Vectorized Geometry" },
        ],
      },
      {
        stage: "STAGE 03 [ANALYZE]",
        title: "Gemini Multimodal Agent",
        description:
          "Combines visual diagram topology with teacher's notes to produce step-by-step algorithmic explanations.",
        stats: [
          { label: "AI Model", value: "Gemini Multimodal" },
          { label: "Context", value: "Diagram + Notes" },
          { label: "Breakdown", value: "Step-by-Step Logic" },
        ],
      },
      {
        stage: "STAGE 04 [COLLABORATE]",
        title: "Memory-Enabled Assistant",
        description:
          "Interactive chatbot with persistent context, enabling students and teachers to query diagram components and edge cases.",
        stats: [
          { label: "Chatbot", value: "Memory Enabled" },
          { label: "Export Options", value: "Learning Materials" },
          { label: "Comparison", value: "Live Split-View" },
        ],
      },
    ],
    keyFeatures: [
      {
        title: "AI-Driven Diagram Reconstruction",
        description:
          "The system converts rough, freehand sketches into clean, structured SVG or PNG diagrams, refining raw strokes into standardized visuals.",
      },
      {
        title: "LLM-Powered Contextual Analysis",
        description:
          "Gemini-based AI agent combines visual sketches with text explanations to generate clear, student-friendly technical notes.",
      },
      {
        title: "Interactive Drawing Workspace",
        description:
          "Full-featured digital whiteboard with pen, geometric shapes, text, eraser, line weights, color selection, and infinite canvas.",
      },
      {
        title: "Split-View Real-Time Comparison",
        description:
          "Teachers and students can compare the raw hand-drawn sketch directly against the refined digital architecture in split-screen.",
      },
    ],
  },
];
