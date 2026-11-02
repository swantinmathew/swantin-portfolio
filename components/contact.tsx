"use client";

import * as React from "react";
import { siteConfig } from "@/content/site";
import { Copy, Check, Mail, FileText } from "lucide-react";

export function Contact() {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-slate-200 dark:border-slate-800/80 py-16 md:py-24"
    >
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="type-meta text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-3">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="type-h2 text-slate-950 dark:text-white mb-4"
          >
            Let&apos;s build something together.
          </h2>
          <p className="type-body text-slate-600 dark:text-slate-400 mb-8 max-w-[65ch]">
            I am currently open to software engineering internships and full-time roles for 2027. Whether you have an open role, an interesting problem, or just want to connect, my inbox is always open.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {/* Copy Email Button with visible feedback */}
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-sm font-medium transition-all min-h-[44px] cursor-pointer shadow-sm ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Copy email</span>
                </>
              )}
            </button>

            {/* Open Mail Client */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-sm font-medium border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-300 transition-colors min-h-[44px]"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Open mail client ↗</span>
            </a>

            {/* View Resume */}
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-sm font-medium border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-300 transition-colors min-h-[44px]"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Resume ↗</span>
            </a>
          </div>

          {/* Direct Links (Email + GitHub + LinkedIn; phone number removed) */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200 dark:border-slate-800 type-meta text-slate-600 dark:text-slate-400">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-slate-950 dark:hover:text-white transition-colors py-1 flex items-center gap-1"
            >
              <span>{siteConfig.email}</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-950 dark:hover:text-white transition-colors py-1 flex items-center gap-1"
            >
              <span>GitHub ↗</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-950 dark:hover:text-white transition-colors py-1 flex items-center gap-1"
            >
              <span>LinkedIn ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
