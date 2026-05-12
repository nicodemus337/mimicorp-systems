import { ArrowLeft, ArrowRight } from "lucide-react";

type ReaderControlsProps = {
  current: number;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
};

export function ReaderControls({
  current,
  total,
  onNext,
  onPrevious
}: ReaderControlsProps) {
  return (
    <nav
      aria-label="Reader page controls"
      className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 pb-5 sm:px-6"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={current === 0}
        className="inline-flex min-h-14 min-w-28 items-center justify-center gap-2 rounded-full bg-white/82 px-5 text-sm font-semibold text-ink shadow-insetCalm backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond"
      >
        <ArrowLeft aria-hidden="true" size={18} />
        Back
      </button>
      <span
        className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/48"
        aria-live="polite"
      >
        {current + 1} / {total}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={current === total - 1}
        className="inline-flex min-h-14 min-w-28 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-shell shadow-soft transition hover:bg-[#17231f] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond"
      >
        Next
        <ArrowRight aria-hidden="true" size={18} />
      </button>
    </nav>
  );
}
