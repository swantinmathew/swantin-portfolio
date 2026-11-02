export interface SiteConfig {
  name: string;
  role: string;
  headline: string;
  institution: string;
  location: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
  repo: string;
  resumeUrl: string;
  profileImage: string;
  // TODO: Set your Codeforces handle (e.g. 'swantin')
  codeforcesHandle?: string;
  about: {
    paragraphs: string[];
    facts: { label: string; value: string }[];
  };
  stack: {
    category: string;
    skills: string[];
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Swantin Jo Mathew",
  role: "Full-Stack Developer & CS Undergraduate",
  headline:
    "Full-stack software developer focused on building production-grade web applications, agentic AI systems, and robust data pipelines.",
  institution: "Govt. Model Engineering College, Kochi",
  location: "Kochi, Kerala, India",
  availability: "Open to SDE internships & full-time roles · 2027",
  email: "swantinjomathew.mec@gmail.com",
  github: "https://github.com/swantinmathew",
  linkedin: "https://linkedin.com/in/swantinmathew",
  repo: "https://github.com/swantinmathew/swantin-portfolio",
  resumeUrl: "/Resume.pdf",
  profileImage: "/profile.jpg",
  // TODO: Set your Codeforces handle (e.g. 'swantin') to enable rating & contest stats widget
  codeforcesHandle: undefined,
  about: {
    paragraphs: [
      "I am a Computer Science undergraduate at Govt. Model Engineering College, Kochi (KTU). My core focus lies at the intersection of full-stack web engineering, agentic AI workflows, and distributed data systems.",
      "I design full-lifecycle software architectures: from automated PDF chunking and vector indexing in Supabase with LangGraph state machines, to automated GitHub API ETL pipelines loading normalized PostgreSQL data warehouses.",
    ],
    facts: [
      { label: "Degree", value: "B.Tech CSE (2027)" },
      { label: "College", value: "Govt. MEC Kochi" },
      { label: "CGPA", value: "8.21 / 10.0" },
      { label: "Focus", value: "Full-Stack & AI Systems" },
      { label: "Looking For", value: "SDE Internships & Full-Time" },
    ],
  },
  stack: [
    {
      category: "Languages",
      skills: ["Python", "Java", "C", "JavaScript", "TypeScript", "SQL"],
    },
    {
      category: "Frontend",
      skills: ["Next.js 15", "React", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      category: "Backend",
      skills: ["FastAPI", "Node.js", "Express.js", "RESTful APIs", "SSE Streaming"],
    },
    {
      category: "AI",
      skills: ["LangGraph", "RAG Architectures", "pgvector", "Gemini API", "Prompt Engineering"],
    },
    {
      category: "Data",
      skills: ["PostgreSQL", "Supabase", "MySQL", "Data Modeling", "ETL Pipelines"],
    },
    {
      category: "Tools",
      skills: ["Git / GitHub", "Postman", "VS Code", "DSA"],
    },
  ],
};
