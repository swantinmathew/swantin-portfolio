import { siteConfig } from "@/content/site";

interface CodeforcesUser {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
}

interface RatingChange {
  newRating: number;
  ratingUpdateTimeSeconds: number;
}

export async function CodeforcesWidget() {
  const handle = siteConfig.codeforcesHandle;
  if (!handle) {
    return null;
  }

  try {
    const [userRes, ratingRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
        next: { revalidate: 3600 },
      }),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !ratingRes.ok) {
      return null;
    }

    const userData = await userRes.json();
    const ratingData = await ratingRes.json();

    if (userData.status !== "OK" || !userData.result?.[0]) {
      return null;
    }

    const user: CodeforcesUser = userData.result[0];
    const history: RatingChange[] = ratingData.status === "OK" ? ratingData.result : [];

    // Sparkline points calculation (inline SVG, no external chart library)
    let sparklinePoints = "";
    if (history.length > 1) {
      const recent = history.slice(-15);
      const minR = Math.min(...recent.map((r) => r.newRating));
      const maxR = Math.max(...recent.map((r) => r.newRating));
      const range = maxR - minR || 1;
      const width = 120;
      const height = 32;

      sparklinePoints = recent
        .map((r, i) => {
          const x = (i / (recent.length - 1)) * width;
          const y = height - ((r.newRating - minR) / range) * (height - 6) - 3;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
    }

    return (
      <div className="rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-5 shadow-[var(--shadow-card)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="type-meta text-slate-500 dark:text-slate-400">
              Codeforces · {user.handle}
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="type-h3 text-slate-950 dark:text-white">
              {user.rating ?? "Unrated"}
            </span>
            {user.maxRating && (
              <span className="type-meta text-slate-500">
                Peak: <strong className="text-slate-700 dark:text-slate-300">{user.maxRating}</strong>
              </span>
            )}
            {user.rank && (
              <span className="type-meta text-emerald-600 dark:text-emerald-400 capitalize">
                ({user.rank})
              </span>
            )}
          </div>
        </div>

        {/* Sparkline */}
        {sparklinePoints && (
          <div className="shrink-0" aria-label="Rating trajectory sparkline">
            <svg
              viewBox="0 0 120 32"
              className="w-28 h-8 overflow-visible"
              aria-hidden="true"
            >
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={sparklinePoints}
              />
            </svg>
          </div>
        )}
      </div>
    );
  } catch {
    return null;
  }
}
