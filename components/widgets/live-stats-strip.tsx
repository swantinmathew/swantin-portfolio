import * as React from "react";
import { CodeforcesWidget } from "./codeforces-widget";
import { GitHubHeatmapWidget } from "./github-widget";

export async function LiveStatsStrip() {
  const [codeforces, github] = await Promise.all([
    CodeforcesWidget(),
    GitHubHeatmapWidget(),
  ]);

  if (!codeforces && !github) {
    return null;
  }

  return (
    <section
      aria-label="Developer Activity"
      className="border-t border-slate-200 dark:border-slate-800/80 py-12"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codeforces}
          {github}
        </div>
      </div>
    </section>
  );
}
