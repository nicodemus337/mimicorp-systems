import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { BookHero } from "@/components/books/BookHero";
import { FooterWatermark } from "@/components/books/FooterWatermark";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getAllBooks } from "@/lib/books";

export default function BooksPage() {
  const [featuredBook] = getAllBooks();

  return (
    <>
      <main>
        <BookHero book={featuredBook} />

        <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
              First title
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Quiet books for big feelings.
            </h2>
          </div>
          <p className="text-lg leading-8 text-ink/68">
            Mimicorp Books pairs story, sensory-friendly interaction, and caregiver
            language in a calm reading environment. The platform begins with Beau,
            a joyful child learning how to notice body signals and ask for help.
          </p>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
                Featured webbook
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-ink">Read now</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {getAllBooks().map((book) => (
              <Card key={book.slug} className="flex min-h-[24rem] flex-col">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-marigold/30 text-ink">
                  <BookOpen aria-hidden="true" size={24} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                  Beau story
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-ink">{book.title}</h3>
                <p className="mt-3 flex-1 text-base leading-7 text-ink/66">
                  {book.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={`/books/${book.slug}/read`}>
                    Read Now <ArrowRight aria-hidden="true" size={17} />
                  </Button>
                  <Button href={`/books/${book.slug}`} variant="secondary">
                    About
                  </Button>
                </div>
              </Card>
            ))}

            <Card className="flex min-h-[24rem] flex-col justify-between border-dashed bg-white/38">
              <div>
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-pond/18 text-ink">
                  <Sparkles aria-hidden="true" size={24} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                  Future shelf
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-ink">
                  More gentle titles
                </h3>
              </div>
              <p className="mt-5 text-base leading-7 text-ink/58">
                The book architecture is ready for additional Mimicorp stories,
                caregiver notes, emotional prompts, and cover art.
              </p>
            </Card>
          </div>
        </section>
      </main>
      <FooterWatermark />
    </>
  );
}
