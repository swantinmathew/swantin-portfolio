import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-page/90 backdrop-blur-sm border-b border-line">
      <nav className="max-w-page mx-auto px-6 py-5 flex items-center justify-between relative">
        <a href="#" className="font-display font-bold text-lg tracking-tight hover:opacity-85 transition-opacity">
          swantin jo <span className="text-accent">mathew</span>
        </a>

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex items-start md:items-center gap-4 md:gap-7 text-sm font-medium absolute md:static top-full left-0 right-0 md:top-auto flex-col md:flex-row bg-page md:bg-transparent border-b md:border-0 border-line px-6 md:px-0 py-5 md:py-0 shadow-lg md:shadow-none transition-all`}
        >
          <a
            href="#about"
            className="text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:text-accent"
            onClick={() => setMenuOpen(false)}
          >
            about
          </a>
          <a
            href="#work"
            className="text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:text-accent"
            onClick={() => setMenuOpen(false)}
          >
            work
          </a>
          <a
            href="#skills"
            className="text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:text-accent"
            onClick={() => setMenuOpen(false)}
          >
            skills
          </a>
          <a
            href="#experience"
            className="text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:text-accent"
            onClick={() => setMenuOpen(false)}
          >
            experience
          </a>
          <a
            href="#leadership"
            className="text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:text-accent"
            onClick={() => setMenuOpen(false)}
          >
            leadership
          </a>
          <a
            href="#contact"
            className="text-ink-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:text-accent"
            onClick={() => setMenuOpen(false)}
          >
            contact
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/swantinmathew"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-ink-soft hover:text-ink transition-colors p-1"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/swantinmathew"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-ink-soft hover:text-ink transition-colors p-1"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M5.03 5a2.03 2.03 0 1 1-4.06 0 2.03 2.03 0 0 1 4.06 0ZM1.35 8.9h7.2V22h-7.2V8.9Zm7.2 0h6.9v1.8h.1c.96-1.7 3.3-2.2 5.2-2.2 5.6 0 6.6 3.5 6.6 8V22h-7.2v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V22H8.55V8.9Z" />
            </svg>
          </a>
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 border border-line-strong rounded-lg hover:border-ink transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="relative block w-4 h-0.5 bg-ink before:content-[''] before:absolute before:w-4 before:h-0.5 before:bg-ink before:-top-[5px] after:content-[''] after:absolute after:w-4 after:h-0.5 after:bg-ink after:top-[5px]"></span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
