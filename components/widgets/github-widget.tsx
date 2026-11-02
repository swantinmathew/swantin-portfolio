interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export async function GitHubHeatmapWidget() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  const query = `
    query {
      user(login: "swantinmathew") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "swantin-portfolio",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar || !calendar.weeks) {
      return null;
    }

    const weeks: ContributionWeek[] = calendar.weeks.slice(-20); // Last 20 weeks for a clean strip
    const total = calendar.totalContributions;

    const getColor = (count: number) => {
      if (count === 0) return "fill-slate-200 dark:fill-slate-800";
      if (count <= 2) return "fill-emerald-800 dark:fill-emerald-900";
      if (count <= 5) return "fill-emerald-600 dark:fill-emerald-700";
      return "fill-emerald-500 dark:fill-emerald-400";
    };

    return (
      <div className="rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-5 shadow-[var(--shadow-card)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="type-meta text-slate-500 dark:text-slate-400">
              GitHub Contributions
            </span>
          </div>
          <span className="type-h3 text-slate-950 dark:text-white">
            {total} <span className="text-xs font-normal text-slate-500">in the last year</span>
          </span>
        </div>

        {/* Heatmap Grid SVG (accent shades only) */}
        <div className="overflow-x-auto max-w-full">
          <svg
            width={weeks.length * 13}
            height={7 * 13}
            className="overflow-visible"
            aria-label="GitHub contribution activity heatmap"
          >
            {weeks.map((week, wIdx) =>
              week.contributionDays.map((day, dIdx) => (
                <rect
                  key={day.date}
                  x={wIdx * 13}
                  y={dIdx * 13}
                  width={10}
                  height={10}
                  rx={2}
                  className={`${getColor(day.contributionCount)} transition-colors`}
                >
                  <title>{`${day.date}: ${day.contributionCount} contributions`}</title>
                </rect>
              ))
            )}
          </svg>
        </div>
      </div>
    );
  } catch {
    return null;
  }
}
