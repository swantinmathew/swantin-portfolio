import { leadership } from "@/content/leadership";

export function Leadership() {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="border-t border-slate-200 dark:border-slate-800/80 py-16 md:py-24"
    >
      <div className="site-container">
        <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-3">
          Experience
        </p>
        <h2
          id="leadership-heading"
          className="type-h2 text-slate-950 dark:text-white mb-8"
        >
          Leadership &amp; Campus Impact
        </h2>

        {/* Vertical timeline: year · role · org · one line */}
        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 md:ml-4 space-y-10 pl-6 md:pl-8">
          {leadership.map((item) => (
            <div key={`${item.year}-${item.role}`} className="relative group">
              {/* Timeline marker */}
              <div
                className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-emerald-500 group-hover:scale-125 transition-transform duration-200"
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1.5">
                <span className="type-meta text-emerald-600 dark:text-emerald-400 font-semibold">
                  {item.year}
                </span>
                <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
                <h3 className="type-h3 text-slate-900 dark:text-slate-100">
                  {item.role}
                </h3>
                <span className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {item.organization}
                </span>
              </div>

              <p className="type-body text-slate-600 dark:text-slate-400 max-w-[70ch]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
