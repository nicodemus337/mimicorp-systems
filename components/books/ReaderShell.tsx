"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Home, RotateCcw } from "lucide-react";
import type { Book } from "@/types/book";
import type { ReaderSettings } from "@/lib/accessibility";
import { AccessibilityPanel } from "@/components/books/AccessibilityPanel";
import { ProgressIndicator } from "@/components/books/ProgressIndicator";
import { ReaderControls } from "@/components/books/ReaderControls";
import { StoryPage } from "@/components/books/StoryPage";

type ReaderShellProps = {
  book: Book;
};

export function ReaderShell({ book }: ReaderShellProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [settings, setSettings] = useState<ReaderSettings | null>(null);
  const systemReducedMotion = useReducedMotion();
  const touchStart = useRef<number | null>(null);
  const total = book.pages.length;
  const reduceMotion = Boolean(systemReducedMotion || settings?.reducedMotion);

  const goTo = useCallback(
    (nextIndex: number) => {
      setPageIndex(Math.min(total - 1, Math.max(0, nextIndex)));
    },
    [total]
  );

  const next = useCallback(() => goTo(pageIndex + 1), [goTo, pageIndex]);
  const previous = useCallback(() => goTo(pageIndex - 1), [goTo, pageIndex]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isInteractiveTarget = target?.closest(
        "button, a, input, textarea, select, [role='button']"
      );

      if (event.key === " " && isInteractiveTarget) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        setPageIndex((current) => Math.min(total - 1, current + 1));
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setPageIndex((current) => Math.max(0, current - 1));
      }

      if (event.key === "Home") {
        event.preventDefault();
        setPageIndex(0);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  const transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
    [reduceMotion]
  );

  return (
    <main
      className="min-h-svh overflow-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(240,196,93,0.22),transparent_28rem),linear-gradient(135deg,#fffaf2_0%,#f5efe4_52%,#e7efe8_100%)]"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = touchStart.current - (event.changedTouches[0]?.clientX ?? 0);
        if (Math.abs(delta) > 48) {
          if (delta > 0) next();
          else previous();
        }
        touchStart.current = null;
      }}
    >
      <div className="flex min-h-svh flex-col">
        <header className="z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            href="/books"
            className="grid min-h-12 min-w-12 place-items-center rounded-full bg-white/76 text-ink shadow-insetCalm backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond"
            aria-label="Back to Mimicorp Books"
          >
            <Home aria-hidden="true" size={20} />
          </Link>
          <div className="min-w-0 text-center">
            <p className="truncate text-sm font-semibold text-ink">{book.title}</p>
            <p className="text-xs text-ink/52">by {book.author}</p>
          </div>
          <button
            type="button"
            onClick={() => setPageIndex(0)}
            className="grid min-h-12 min-w-12 place-items-center rounded-full bg-white/76 text-ink shadow-insetCalm backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond"
            aria-label="Restart book"
          >
            <RotateCcw aria-hidden="true" size={20} />
          </button>
        </header>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <ProgressIndicator current={pageIndex} total={total} />
        </div>

        <section className="relative flex flex-1 items-center" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={book.pages[pageIndex].id}
              className="w-full"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -22 }}
              transition={transition}
            >
              <StoryPage book={book} page={book.pages[pageIndex]} />
            </motion.div>
          </AnimatePresence>
        </section>

        <ReaderControls
          current={pageIndex}
          total={total}
          onNext={next}
          onPrevious={previous}
        />
        <p className="pb-4 text-center text-[0.62rem] uppercase tracking-[0.18em] text-ink/34">
          © mimicorp labs, llc 2026
        </p>
      </div>

      <AccessibilityPanel onChange={setSettings} />
    </main>
  );
}
