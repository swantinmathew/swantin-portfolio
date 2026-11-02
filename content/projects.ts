export type Project = {
  slug: string;
  title: string;
  tagline: string; // one plain sentence
  role: string; // "Solo developer" | "Frontend developer · team of 4"
  duration?: string;
  stack: string[];
  highlights: [string, string]; // exactly 2 bullets on the card
  repoUrl: string;
  liveUrl?: string; // if undefined, the Live button is NOT rendered
  media?: { type: "video" | "image"; src: string; poster?: string; alt: string };
  featured?: boolean;
  caseStudy?: {
    problem: string;
    architecture?: { src: string; alt: string }; // diagram image
    decisions: { title: string; body: string }[]; // 2-3 tradeoff decisions
    metrics?: { label: string; value: string }[]; // only real numbers, else omit
    learnings?: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "docent",
    title: "Docent",
    tagline: "Ask questions over PDFs with streamed, cited answers.",
    role: "Solo developer",
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
    ],
    highlights: [
      "Automated PDF sliding-window chunking & vector indexing in Supabase pgvector",
      "Stateful LangGraph workflow execution with low-latency SSE token streaming",
    ],
    repoUrl: "https://github.com/swantinmathew/pdf-chat-rag",
    // TODO: Add live deployment URL when available
    liveUrl: undefined,
    // TODO: Add video or screenshot asset (e.g. { type: 'video', src: '/media/docent.mp4', poster: '/media/docent-poster.webp', alt: 'Docent streaming Q&A demo' })
    media: undefined,
    caseStudy: {
      problem:
        "Large, dense technical PDFs require users to manually search through dozens of pages to answer questions. Standard keyword search misses semantic context, while basic single-call LLM approaches suffer from context window limits, hallucinations, and lack of verifiable page citations.",
      // TODO: Add architecture diagram image (e.g. { src: '/media/docent-architecture.png', alt: 'Docent RAG architecture diagram' })
      architecture: undefined,
      decisions: [
        {
          title: "Sliding-Window Chunking with Overlap vs Fixed Token Splits",
          body: "Implemented sliding-window chunking with 15% overlap across paragraphs. This prevents critical sentences from being split in half across boundary cuts, significantly increasing semantic retrieval relevance during similarity search.",
        },
        {
          title: "Server-Sent Events (SSE) vs WebSockets for Streaming",
          body: "Chose SSE over WebSockets because the chat response flow is strictly unidirectional from server to client. SSE avoids stateful WebSocket connection overhead, reconnects automatically, and traverses HTTP/2 proxies with lower latency.",
        },
        {
          title: "Supabase pgvector vs Dedicated Vector Databases",
          body: "Integrated pgvector inside Supabase PostgreSQL. This allowed co-locating vector embeddings alongside document metadata and conversation session tables, eliminating the need to sync state with an external vector store.",
        },
      ],
      // TODO: Add real measured benchmark metrics if verified (e.g. [{ label: "Avg Latency", value: "320ms" }])
      metrics: undefined,
      learnings: [
        "Stateful LangGraph graphs provide clean boundaries between document retrieval, context validation, and generation nodes.",
        "Streaming tokens via SSE requires robust client-side buffer handling to prevent UI rerender stuttering.",
      ],
    },
  },
  {
    slug: "githubpulse",
    title: "GitHubPulse",
    tagline: "GitHub analytics pipeline with an AI diagnostics agent.",
    role: "Solo developer",
    duration: "3 weeks",
    stack: [
      "Next.js",
      "FastAPI",
      "LangGraph",
      "PostgreSQL",
      "GitHub API",
      "Pandas",
    ],
    highlights: [
      "Automated GitHub REST API extraction into normalized PostgreSQL warehouse schema",
      "Autonomous LangGraph agent analyzing bus factor risks and review bottlenecks",
    ],
    // VERIFY: Confirm repo URL spelling (GiithubPulse has a double 'i' in the existing repo)
    repoUrl: "https://github.com/swantinmathew/GiithubPulse",
    // TODO: Add live deployment URL when available
    liveUrl: undefined,
    // TODO: Add video or screenshot asset
    media: undefined,
    caseStudy: {
      problem:
        "Engineering teams lack simple, self-hosted visibility into developer velocity, code review turnaround times, and repository risk factors like high bus factor on critical files.",
      // TODO: Add architecture diagram image
      architecture: undefined,
      decisions: [
        {
          title: "Relational Warehouse Modeling vs Document Storage",
          body: "Engineered a normalized PostgreSQL relational schema for commits, pull requests, reviews, and issues. This enables complex SQL analytical queries and velocity tracking that would require inefficient map-reduce routines in NoSQL.",
        },
        {
          title: "Pandas Pre-Aggregation with LangGraph Narrative Reasoning",
          body: "Separated numerical calculations (turnaround distributions, commit velocity) executed deterministically in Pandas from qualitative diagnostic generation in LangGraph, ensuring the agent reasons on verified statistical facts.",
        },
      ],
      // TODO: Add real measured metrics if verified
      metrics: undefined,
      learnings: [
        "Handling GitHub REST API rate limits requires aggressive token rotation and exponential backoff retry routines.",
        "Pre-aggregating weekly velocity metrics significantly reduces dashboard page load latency.",
      ],
    },
  },
  {
    slug: "cp-coach",
    title: "CP Coach",
    tagline: "Codeforces profile analysis and practice recommendation platform.",
    role: "Solo developer",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "Gemini API",
      "Codeforces API",
    ],
    highlights: [
      "Real-time Codeforces API profile metrics, rating curves, and tag-wise weakness detection",
      "AI head-to-head comparison engine with personalized practice curricula",
    ],
    repoUrl: "https://github.com/swantinmathew/cp-coach",
    // TODO: Add live deployment URL when available
    liveUrl: undefined,
    // TODO: Add video or screenshot asset
    media: undefined,
    caseStudy: {
      problem:
        "Competitive programmers frequently plateau in rating because manually identifying patterns across hundreds of past contest submissions is time-consuming, and generic problem sheets do not address specific algorithmic blind spots.",
      // TODO: Add architecture diagram image
      architecture: undefined,
      decisions: [
        {
          title: "Weighted Rating Difficulty Gap vs Raw Problem Counts",
          body: "Calculated topic strengths by weighting solved problems against contest rating deltas rather than raw solve counts, isolating true conceptual blockers from easy volume practice.",
        },
        {
          title: "Constrained JSON Schema Prompts with Gemini",
          body: "Enforced strict JSON schema outputs from the Gemini API to reliably generate structured practice roadmaps that frontend components can render without parsing failures.",
        },
      ],
      // TODO: Add real measured metrics if verified
      metrics: undefined,
      learnings: [
        "Submissions data caching with TTL prevents hitting third-party Codeforces rate caps during repeat profile comparisons.",
      ],
    },
  },
  {
    slug: "sketchflow",
    title: "SketchFlow",
    tagline: "Hand-drawn architecture diagram recognizer and visual assistant.",
    role: "Frontend developer · team of 4",
    duration: "2 months",
    stack: ["React", "Node.js", "REST APIs", "Tailwind CSS"],
    highlights: [
      "Interactive drawing canvas with visual schema recognition and conversion",
      "Conversational assistant for real-time architecture explanations",
    ],
    repoUrl: "https://github.com/swantinmathew/Sketch-Flow",
    // TODO: Add live deployment URL when available
    liveUrl: undefined,
    // TODO: Add video or screenshot asset
    media: undefined,
    caseStudy: {
      problem:
        "Whiteboard architecture sketches created during planning sessions are often lost as static phone photos, requiring time-consuming manual recreation in diagramming software to become editable engineering artifacts.",
      // TODO: Add architecture diagram image
      architecture: undefined,
      decisions: [
        {
          title: "Decoupled Canvas Vector Layer",
          body: "Separated freehand pen stroke vectors from recognized structural blocks, allowing users to toggle between raw hand-drawn view and normalized diagram layout without losing original strokes.",
        },
      ],
      // TODO: Add real measured metrics if verified
      metrics: undefined,
      learnings: [
        "Normalizing touch and stylus inputs across different device pixel ratios is crucial for precise shape detection on the web canvas.",
      ],
    },
  },
];
