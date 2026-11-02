import { siteConfig } from "@/content/site";

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="border-t border-slate-200 dark:border-slate-800/80 py-16 md:py-24"
    >
      <div className="site-container">
        <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-3">
          Technologies
        </p>
        <h2
          id="stack-heading"
          className="type-h2 text-slate-950 dark:text-white mb-8"
        >
          Technical Stack
        </h2>

        {/* ONE compact grouped list with muted label column */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800/80 border-y border-slate-200 dark:border-slate-800/80">
          {siteConfig.stack.map((group) => (
            <div
              key={group.category}
              className="py-4 md:py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
            >
              {/* Muted label column (4 cols on desktop) */}
              <div className="sm:col-span-3 lg:col-span-2">
                <span className="type-meta text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                  {group.category}
                </span>
              </div>

              {/* Plain text row (8-10 cols) */}
              <div className="sm:col-span-9 lg:col-span-10 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-slate-800 dark:text-slate-200">
                {group.skills.map((skill, i) => (
                  <span key={skill} className="font-mono text-xs text-slate-700 dark:text-slate-300">
                    {skill}
                    {i < group.skills.length - 1 && (
                      <span className="text-slate-300 dark:text-slate-700 ml-3">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
