type ProgressIndicatorProps = {
  current: number;
  total: number;
};

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full" aria-label={`Page ${current + 1} of ${total}`}>
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
        <span>Page {current + 1}</span>
        <span>{total}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink/8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-clay via-marigold to-leaf"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
