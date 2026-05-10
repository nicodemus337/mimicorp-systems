import { BookHero } from "@/components/books/BookHero";
import { BookCard } from "@/components/books/BookCard";
import { FooterWatermark } from "@/components/books/FooterWatermark";
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
              <BookCard key={book.slug} book={book} />
            ))}

            <BookCard variant="future" />
          </div>
        </section>
      </main>
      <FooterWatermark />
    </>
  );
}
