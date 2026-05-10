import Image from "next/image";
import type { StoryPage as StoryPageType } from "@/types/books";
import { InteractionPrompt } from "@/components/books/InteractionPrompt";

type StoryPageProps = {
  page: StoryPageType;
};

export function StoryPage({ page }: StoryPageProps) {
  return (
    <article className="grid min-h-[68svh] w-full items-center gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
      <div className="mx-auto w-full max-w-md">
        {page.image ? (
          <Image
            src={page.image}
            alt={page.alt ?? ""}
            width={640}
            height={800}
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft"
            priority={page.id === 1}
          />
        ) : (
          <BeauScene pageId={page.id} cue={page.sensoryCue} />
        )}
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <p className="reader-text text-balance text-3xl font-semibold leading-[1.18] text-ink sm:text-4xl lg:text-5xl">
          {page.text}
        </p>
        {page.sensoryCue ? (
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-ink/45">
            {page.sensoryCue}
          </p>
        ) : null}
        {page.interaction ? <InteractionPrompt prompt={page.interaction} /> : null}
      </div>
    </article>
  );
}

function BeauScene({ pageId, cue }: { pageId: number; cue?: string }) {
  const mood = pageId < 5 ? "bg-marigold" : pageId < 9 ? "bg-pond" : "bg-leaf";

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-b from-white/86 to-oat shadow-soft">
      <div className="sensory-layer absolute inset-x-8 top-10 h-28 rounded-full bg-pond/18 blur-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-leaf/24 to-transparent" />

      <div className="absolute left-1/2 top-[17%] h-40 w-40 -translate-x-1/2 rounded-full bg-[#9d6a4f] shadow-insetCalm">
        <div className="absolute -left-3 top-3 h-10 w-10 rounded-full bg-[#5b3729]" />
        <div className="absolute left-4 -top-3 h-12 w-12 rounded-full bg-[#5b3729]" />
        <div className="absolute right-5 -top-4 h-11 w-11 rounded-full bg-[#5b3729]" />
        <div className="absolute left-9 top-16 h-3 w-3 rounded-full bg-ink" />
        <div className="absolute right-9 top-16 h-3 w-3 rounded-full bg-ink" />
        <div className="absolute bottom-9 left-1/2 h-4 w-12 -translate-x-1/2 rounded-b-full border-b-4 border-ink/75" />
      </div>

      <div className="absolute left-1/2 top-[45%] h-32 w-44 -translate-x-1/2 rounded-[2rem] bg-pond shadow-insetCalm" />
      <div className="absolute left-[33%] top-[63%] h-32 w-12 rounded-full bg-marigold" />
      <div className="absolute right-[33%] top-[63%] h-32 w-12 rounded-full bg-marigold" />
      <div className="absolute bottom-10 left-[30%] h-10 w-20 rounded-full bg-clay" />
      <div className="absolute bottom-10 right-[30%] h-10 w-20 rounded-full bg-clay" />

      <div className={`absolute right-8 top-8 h-16 w-16 rounded-full ${mood}/55`} />
      {cue ? (
        <span className="absolute bottom-6 left-6 rounded-full bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/58">
          {cue}
        </span>
      ) : null}
    </div>
  );
}
