"use client";

import { useState } from "react";
import type { EmotionalPrompt } from "@/types/books";

type InteractionPromptProps = {
  prompt: EmotionalPrompt;
};

export function InteractionPrompt({ prompt }: InteractionPromptProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="mt-8 rounded-[1.5rem] border border-ink/10 bg-white/72 p-4 shadow-insetCalm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
        Pause together
      </h3>
      <p className="mt-2 text-lg font-semibold text-ink">{prompt.question}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelected(option.id)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pond ${
              selected === option.id
                ? "border-ink bg-ink text-shell"
                : "border-ink/12 bg-shell/84 text-ink/75 hover:border-ink/30"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selected ? (
        <p className="mt-4 text-sm leading-6 text-ink/65" aria-live="polite">
          {prompt.reflection}
        </p>
      ) : null}
    </section>
  );
}
