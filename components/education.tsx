import { education } from "@/content/education";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-t border-slate-200 dark:border-slate-800/80 py-16 md:py-24"
    >
      <div className="site-container">
        <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-3">
          Academics
        </p>
        <h2
          id="education-heading"
          className="type-h2 text-slate-950 dark:text-white mb-8"
        >
          Education &amp; Credentials
        </h2>

        {/* Two-item list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item) => (
            <div
              key={item.title}
              className="rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-6 shadow-[var(--shadow-card)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3 font-mono text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {item.period}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {item.institution}
                  </span>
                </div>
                <h3 className="type-h3 text-slate-950 dark:text-white mb-1">
                  {item.title}
                </h3>
                {item.subheading && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {item.subheading}
                  </p>
                )}
              </div>
              <p className="type-meta text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {item.meta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
