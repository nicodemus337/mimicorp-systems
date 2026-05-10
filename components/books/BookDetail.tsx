import Image from "next/image";
import { ArrowRight, Check, Heart, ShieldCheck } from "lucide-react";
import type { Book } from "@/types/book";
import { FooterWatermark } from "@/components/books/FooterWatermark";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type BookDetailProps = {
  book: Book;
  bookNumber: string;
};

export function BookDetail({ book, bookNumber }: BookDetailProps) {
  return (
    <>
      <main>
        <section className="mx-auto grid min-h-[78svh] w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
              Mimicorp Books / {bookNumber}
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold leading-none text-ink sm:text-6xl">
              {book.title}
            </h1>
            <p className="mt-4 text-lg font-medium text-ink/58">by {book.author}</p>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-ink/70">
              {book.description}
            </p>
            <div className="mt-8">
              <Button href={`/books/${book.slug}/read`}>
                Start Reading <ArrowRight aria-hidden="true" size={18} />
              </Button>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-md lg:order-2">
            <div className="contrast-surface rounded-[2.5rem] border border-white/70 bg-white/72 p-4 shadow-soft">
              <Image
                src={book.pages[0].image}
                alt={`${book.title} cover by ${book.author}`}
                width={720}
                height={900}
                priority
                className="aspect-square w-full rounded-[1.8rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 py-8 sm:px-8 lg:grid-cols-3">
          <Card>
            <Heart aria-hidden="true" className="mb-5 text-clay" size={28} />
            <h2 className="text-2xl font-semibold text-ink">Emotional learning</h2>
            <ul className="mt-5 space-y-3">
              {book.emotionalGoals.map((goal) => (
                <li key={goal} className="flex gap-3 text-ink/70">
                  <Check
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-leaf"
                    size={18}
                  />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <ShieldCheck aria-hidden="true" className="mb-5 text-pond" size={28} />
            <h2 className="text-2xl font-semibold text-ink">Caregiver note</h2>
            <p className="mt-5 text-base leading-7 text-ink/68">
              {book.caregiverNote.preview}
            </p>
            {book.caregiverNote.script ? (
              <p className="mt-6 rounded-2xl bg-oat px-4 py-3 text-sm font-semibold leading-6 text-ink/72">
                &ldquo;{book.caregiverNote.script}&rdquo;
              </p>
            ) : null}
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-ink">Accessibility features</h2>
            <div className="mt-5 space-y-4">
              <Feature
                enabled={book.accessibility.dyslexiaFriendly}
                label="Dyslexia-friendly font"
              />
              <Feature
                enabled={book.accessibility.reducedMotion}
                label="Reduced motion support"
              />
              <Feature
                enabled={book.accessibility.highContrast}
                label="High contrast mode"
              />
              <Feature enabled={book.accessibility.textResize} label="Text resize controls" />
              <Feature
                enabled={book.accessibility.lowStimulationMode}
                label="Reduced stimulation mode"
              />
              <Feature enabled={book.accessibility.narration} label="Narration" />
            </div>
          </Card>
        </section>
      </main>
      <FooterWatermark />
    </>
  );
}

function Feature({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <div>
      <h3 className="font-semibold text-ink">{label}</h3>
      <p className="mt-1 text-sm leading-6 text-ink/62">
        {enabled ? "Included in this MVP reader." : "Prepared as a future enhancement."}
      </p>
    </div>
  );
}
