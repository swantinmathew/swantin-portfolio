import { siteConfig } from "@/content/site";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 py-10">
      <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500 dark:text-slate-400">
        <p>© 2026 {siteConfig.name}</p>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
          >
            Source Code ↗
          </a>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <a
            href="#"
            className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
