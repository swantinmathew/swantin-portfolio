import { siteConfig } from "@/content/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-slate-200 dark:border-slate-800/80 py-16 md:py-24"
    >
      <div className="site-container">
        <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-3">
          About
        </p>
        <h2
          id="about-heading"
          className="type-h2 text-slate-950 dark:text-white mb-8"
        >
          Engineering with focus and clarity
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Paragraphs (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-slate-600 dark:text-slate-400 type-body">
            {siteConfig.about.paragraphs.map((p, idx) => (
              <p key={idx} className="max-w-[68ch]">
                {p}
              </p>
            ))}
          </div>

          {/* Compact Facts List (5 cols) */}
          <div className="lg:col-span-5 rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-6 shadow-[var(--shadow-card)]">
            <h3 className="type-meta text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold mb-4">
              Quick Facts
            </h3>
            <dl className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
              {siteConfig.about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="py-2.5 flex items-center justify-between gap-4 font-mono text-xs"
                >
                  <dt className="text-slate-500 dark:text-slate-400">
                    {fact.label}
                  </dt>
                  <dd className="font-semibold text-slate-900 dark:text-slate-100 text-right">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
