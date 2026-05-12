"use client";

import { useState } from "react";

type InteractionPromptProps = {
  prompt: string;
  options: string[];
};

export function InteractionPrompt({ prompt, options }: InteractionPromptProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="rounded-[2rem] border border-ink/10 bg-shell/82 p-5 shadow-insetCalm sm:p-8">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
        Pause together
      </h3>
      <p className="mt-3 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
        {prompt}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`min-h-16 rounded-[1.25rem] border px-4 py-3 text-left text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond ${
              selected === option
                ? "border-ink bg-ink text-shell shadow-soft"
                : "border-ink/10 bg-white/72 text-ink/76 shadow-insetCalm hover:border-ink/24 hover:bg-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selected ? (
        <p className="mt-5 rounded-2xl bg-white/64 px-4 py-3 text-sm leading-6 text-ink/66" aria-live="polite">
          You chose {selected.toLowerCase()}. That can be a real body feeling.
        </p>
      ) : null}
    </section>
  );
}
