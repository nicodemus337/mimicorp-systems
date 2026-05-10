import Image from "next/image";
import type { ReactNode } from "react";
import type { Book, BookPage } from "@/types/book";
import { InteractionPrompt } from "@/components/books/InteractionPrompt";

type StoryPageProps = {
  book: Book;
  page: BookPage;
};

export function StoryPage({ book, page }: StoryPageProps) {
  switch (page.type) {
    case "cover":
      return <CoverPage book={book} page={page} />;
    case "story":
      return (
        <PageFrame
          art={<BeauScene book={book} pageId={page.id} imagePath={page.image} />}
          body={<StoryText text={page.text} />}
        />
      );
    case "dialogue":
      return (
        <PageFrame
          art={<BeauScene book={book} pageId={page.id} imagePath={page.image} />}
          body={
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-clay">
                {page.speaker === "beau" ? book.protagonist.name : "Grown-up"}
              </p>
              <div className="rounded-[2rem] bg-white/78 p-6 shadow-insetCalm">
                <StoryText text={`"${page.text}"`} />
              </div>
            </div>
          }
        />
      );
    case "interaction":
      return (
        <PageFrame
          art={<BeauScene book={book} pageId={page.id} imagePath={page.image} />}
          body={<InteractionPrompt prompt={page.prompt} options={page.options} />}
        />
      );
    case "caregiver-note":
      return (
        <PageFrame
          art={<BeauScene book={book} pageId={page.id} imagePath={page.image} quiet />}
          body={
            <section className="rounded-[2rem] border border-ink/10 bg-white/78 p-6 shadow-insetCalm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">
                Grown-up note
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">{page.title}</h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-ink/72">
                {page.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          }
        />
      );
    default:
      return null;
  }
}

function CoverPage({
  book,
  page
}: {
  book: Book;
  page: Extract<BookPage, { type: "cover" }>;
}) {
  return (
    <article className="grid min-h-[68svh] w-full items-center gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
      <div className="mx-auto w-full max-w-md">
        <Image
          src={page.image}
          alt={`${page.title} cover by ${page.author}`}
          width={640}
          height={800}
          className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft"
          priority
        />
      </div>
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">
          {book.ageRange}
        </p>
        <h1 className="mt-4 text-balance text-5xl font-semibold leading-none text-ink sm:text-6xl">
          {page.title}
        </h1>
        <p className="mt-5 text-xl text-ink/62">by {page.author}</p>
        <p className="mt-8 max-w-xl text-lg leading-8 text-ink/66">{book.theme}</p>
      </div>
    </article>
  );
}

function PageFrame({ art, body }: { art: ReactNode; body: ReactNode }) {
  return (
    <article className="grid min-h-[68svh] w-full items-center gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
      <div className="mx-auto w-full max-w-md">{art}</div>
      <div className="mx-auto w-full max-w-2xl">{body}</div>
    </article>
  );
}

function StoryText({ text }: { text: string }) {
  return (
    <p className="reader-text text-balance text-3xl font-semibold leading-[1.18] text-ink sm:text-4xl lg:text-5xl">
      {text}
    </p>
  );
}

function BeauScene({
  book,
  imagePath,
  pageId,
  quiet = false
}: {
  book: Book;
  imagePath: string;
  pageId: number;
  quiet?: boolean;
}) {
  const palette = book.palette;
  const mood =
    pageId < 8 ? palette.warmth : pageId < 14 ? palette.primary : palette.secondary;

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft"
      style={{
        background: `linear-gradient(180deg, ${palette.background} 0%, #f1eadb 100%)`
      }}
    >
      <div className="sensory-layer absolute inset-x-8 top-10 h-28 rounded-full bg-pond/18 blur-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-leaf/24 to-transparent" />
      <div
        className="absolute right-8 top-8 h-16 w-16 rounded-full opacity-55"
        style={{ backgroundColor: mood }}
      />

      <div className="absolute left-1/2 top-[17%] h-40 w-40 -translate-x-1/2 rounded-full bg-[#9d6a4f] shadow-insetCalm">
        <div className="absolute -left-3 top-3 h-10 w-10 rounded-full bg-[#5b3729]" />
        <div className="absolute left-4 -top-3 h-12 w-12 rounded-full bg-[#5b3729]" />
        <div className="absolute right-5 -top-4 h-11 w-11 rounded-full bg-[#5b3729]" />
        <div className="absolute left-9 top-16 h-3 w-3 rounded-full bg-ink" />
        <div className="absolute right-9 top-16 h-3 w-3 rounded-full bg-ink" />
        <div className="absolute bottom-9 left-1/2 h-4 w-12 -translate-x-1/2 rounded-b-full border-b-4 border-ink/75" />
      </div>

      <div
        className="absolute left-1/2 top-[45%] h-32 w-44 -translate-x-1/2 rounded-[2rem] shadow-insetCalm"
        style={{ backgroundColor: palette.primary }}
      />
      <div
        className="absolute left-[33%] top-[63%] h-32 w-12 rounded-full"
        style={{ backgroundColor: palette.warmth }}
      />
      <div
        className="absolute right-[33%] top-[63%] h-32 w-12 rounded-full"
        style={{ backgroundColor: palette.warmth }}
      />
      <div
        className="absolute bottom-10 left-[30%] h-10 w-20 rounded-full"
        style={{ backgroundColor: palette.accent }}
      />
      <div
        className="absolute bottom-10 right-[30%] h-10 w-20 rounded-full"
        style={{ backgroundColor: palette.accent }}
      />

      <span className="absolute bottom-6 left-6 max-w-[calc(100%-3rem)] rounded-full bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/58">
        {quiet ? "Caregiver Support" : getIllustrationLabel(imagePath)}
      </span>
    </div>
  );
}

function getIllustrationLabel(imagePath: string) {
  const fileName = imagePath.split("/").at(-1)?.replace(".png", "");
  const pageNumber = fileName?.match(/\d+/)?.[0];

  if (!pageNumber) return "Illustration Placeholder";
  return `Page ${pageNumber} Illustration`;
}
