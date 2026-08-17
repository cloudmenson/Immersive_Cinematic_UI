"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn, sections, site, scrollToSection, useScrollProgress } from "@/shared";

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();
  const scrolled = progress > 0.02;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        data-chrome
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-ink/70 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button
            type="button"
            onClick={() => go("hero")}
            className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-fog transition-colors hover:text-lime-300"
          >
            ICU
          </button>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {sections.slice(1, -1).map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => go(section.id)}
                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fog/60 transition-colors hover:text-lime-300"
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={site.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-300/80 transition-colors hover:text-lime-300 md:block"
          >
            Source
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-fog transition-colors hover:border-lime-400/60 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-chrome
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            {sections.map((section, i) => (
              <motion.button
                key={section.id}
                type="button"
                onClick={() => go(section.id)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="px-6 py-3 text-2xl font-extrabold uppercase tracking-[0.15em] text-fog/80 transition-colors hover:text-lime-300"
              >
                {section.label}
              </motion.button>
            ))}

            <a
              href={site.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-lime-300/80"
            >
              View Source
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
