"use client";

import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import {
  FileText,
  Copy,
  Check,
  Moon,
  Sun,
  Laptop,
  FolderGit2,
  ExternalLink,
  Search,
  Compass,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  // Global ⌘K / Ctrl+K listener
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    command();
    onOpenChange(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-xl rounded-[16px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-[var(--shadow-elevated)] overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full font-sans" label="Command Menu">
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
            <Search className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
            />
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <Command.List className="max-h-80 overflow-y-auto p-2 text-sm text-slate-700 dark:text-slate-300">
            <Command.Empty className="py-6 text-center text-xs font-mono text-slate-400">
              No results found.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group
              heading="Jump to Section"
              className="px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500"
            >
              {[
                { label: "About", href: "/#about" },
                { label: "Selected Work", href: "/#projects" },
                { label: "Technical Stack", href: "/#stack" },
                { label: "Leadership & Impact", href: "/#leadership" },
                { label: "Education & Credentials", href: "/#education" },
                { label: "Contact", href: "/#contact" },
              ].map((item) => (
                <Command.Item
                  key={item.href}
                  onSelect={() => runCommand(() => router.push(item.href))}
                  className="flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 transition-colors"
                >
                  <Compass className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>{item.label}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Projects Group */}
            <Command.Group
              heading="Case Studies"
              className="px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-2"
            >
              {projects.map((p) => (
                <Command.Item
                  key={p.slug}
                  onSelect={() => runCommand(() => router.push(`/projects/${p.slug}`))}
                  className="flex items-center justify-between px-3 py-2 rounded-[8px] cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FolderGit2 className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                    <span>{p.title}</span>
                  </div>
                  <span className="type-meta text-slate-400 text-xs">Case Study →</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Quick Actions */}
            <Command.Group
              heading="Actions & Links"
              className="px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-2"
            >
              <Command.Item
                onSelect={copyEmail}
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 transition-colors"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" aria-hidden="true" />
                )}
                <span>Copy Email Address ({siteConfig.email})</span>
              </Command.Item>

              <Command.Item
                onSelect={() =>
                  runCommand(() => window.open(siteConfig.resumeUrl, "_blank"))
                }
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 transition-colors"
              >
                <FileText className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>Open Resume ↗</span>
              </Command.Item>

              <Command.Item
                onSelect={() =>
                  runCommand(() => window.open(siteConfig.github, "_blank"))
                }
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>GitHub Profile ↗</span>
              </Command.Item>

              <Command.Item
                onSelect={() =>
                  runCommand(() => window.open(siteConfig.linkedin, "_blank"))
                }
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>LinkedIn Profile ↗</span>
              </Command.Item>
            </Command.Group>

            {/* Theme Toggle Group */}
            <Command.Group
              heading="Appearance"
              className="px-2 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-2"
            >
              <Command.Item
                onSelect={() => runCommand(() => setTheme("light"))}
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 transition-colors"
              >
                <Sun className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>Switch to Light Theme</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("dark"))}
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 transition-colors"
              >
                <Moon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>Switch to Dark Theme</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("system"))}
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] cursor-pointer text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800 transition-colors"
              >
                <Laptop className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <span>Use System Theme</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
