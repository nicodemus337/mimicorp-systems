import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Book } from "@/types/book";
import { Button } from "@/components/ui/Button";

type BookHeroProps = {
  book: Book;
  mode?: "landing" | "detail";
};

export function BookHero({ book, mode = "landing" }: BookHeroProps) {
  return (
    <section className="relative mx-auto grid min-h-[82svh] w-full max-w-7xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:pt-16">
      <div className="decorative-gradient absolute inset-x-0 top-0 -z-10 h-96 rounded-b-[4rem] bg-gradient-to-br from-marigold/24 via-pond/14 to-leaf/20" />
      <div className="max-w-2xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-clay">
          Mimicorp Books
        </p>
        <h1 className="text-balance text-5xl font-semibold leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
          {mode === "landing" ? "Mimicorp Books" : book.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-ink/72 sm:text-xl">
          {mode === "landing"
            ? "Emotionally intelligent digital stories for modern families."
            : book.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/books/${book.slug}/read`}>
            Read Now <ArrowRight aria-hidden="true" size={18} />
          </Button>
          <Button href={`/books/${book.slug}`} variant="secondary">
            Learn More
          </Button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[32rem]">
        <div className="sensory-layer absolute -left-6 top-8 h-32 w-32 rounded-full bg-marigold/40 blur-3xl" />
        <div className="sensory-layer absolute -right-4 bottom-10 h-40 w-40 rounded-full bg-pond/28 blur-3xl" />
        <div className="contrast-surface relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/72 p-4 shadow-soft">
          <Image
            src={book.pages[0].image}
            alt={`${book.title} cover by ${book.author}`}
            width={720}
            height={900}
            priority
            className="aspect-[4/5] w-full rounded-[1.8rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
