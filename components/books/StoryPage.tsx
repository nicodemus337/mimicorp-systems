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
          art={<IllustrationPlate book={book} pageId={page.id} imagePath={page.image} />}
          body={<StoryText text={page.text} />}
        />
      );
    case "dialogue":
      return (
        <PageFrame
          art={<IllustrationPlate book={book} pageId={page.id} imagePath={page.image} />}
          body={
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-clay">
                {page.speaker === "beau" ? book.protagonist.name : "Grown-up"}
              </p>
              <div className="rounded-[2rem] border border-ink/8 bg-shell/80 p-6 shadow-insetCalm sm:p-8">
                <StoryText text={`"${page.text}"`} />
              </div>
            </div>
          }
        />
      );
    case "interaction":
      return (
        <PageFrame
          art={<IllustrationPlate book={book} pageId={page.id} imagePath={page.image} />}
          body={<InteractionPrompt prompt={page.prompt} options={page.options} />}
        />
      );
    case "caregiver-note":
      return (
        <PageFrame
          art={<IllustrationPlate book={book} pageId={page.id} imagePath={page.image} quiet />}
          body={
            <section className="rounded-[2rem] border border-ink/10 bg-shell/82 p-6 shadow-insetCalm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
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
    <article className="mx-auto grid min-h-[min(68svh,46rem)] w-full max-w-6xl items-center gap-8 rounded-[2.25rem] border border-white/72 bg-white/58 p-4 shadow-soft backdrop-blur-xl sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      <div className="mx-auto w-full max-w-[28rem]">
        <Image
          src={page.image}
          alt={`${page.title} cover by ${page.author}`}
          width={640}
          height={800}
          className="aspect-square w-full rounded-[2rem] object-cover shadow-soft"
          priority
        />
      </div>
      <div className="mx-auto w-full max-w-2xl rounded-[2rem] bg-shell/60 p-6 shadow-insetCalm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
          {book.ageRange}
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-none text-ink sm:text-6xl">
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
    <article className="mx-auto grid min-h-[min(68svh,46rem)] w-full max-w-6xl items-center gap-6 rounded-[2.25rem] border border-white/72 bg-white/58 p-4 shadow-soft backdrop-blur-xl sm:gap-8 sm:p-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
      <div className="mx-auto w-full max-w-[28rem]">{art}</div>
      <div className="mx-auto w-full max-w-2xl">{body}</div>
    </article>
  );
}

function StoryText({ text }: { text: string }) {
  return (
    <div className="rounded-[2rem] border border-ink/8 bg-shell/82 p-6 shadow-insetCalm sm:p-8">
      <p className="reader-text text-balance text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1.12] text-ink">
        {text}
      </p>
    </div>
  );
}

function IllustrationPlate({
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
  const isBookOne = book.slug === "my-feet-are-dirty";
  const mood = pageId < 8 ? palette.warmth : pageId < 14 ? palette.primary : palette.secondary;
  const label = quiet ? "Caregiver Support" : getIllustrationLabel(imagePath);

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/70 shadow-soft"
      style={{
        background: isBookOne
          ? `linear-gradient(180deg, ${palette.background} 0%, #f4ead7 58%, #dde8d6 100%)`
          : `linear-gradient(180deg, ${palette.background} 0%, #edf0f7 48%, #dce7ef 100%)`
      }}
    >
      <div className="sensory-layer absolute -left-12 top-8 h-40 w-40 rounded-full bg-marigold/28 blur-3xl" />
      <div className="sensory-layer absolute -right-10 top-20 h-44 w-44 rounded-full bg-pond/18 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-leaf/24 to-transparent" />

      <div className="absolute left-8 right-8 top-10 h-28 rounded-[2rem] border border-white/54 bg-white/34 shadow-insetCalm" />
      <div
        className="absolute right-10 top-12 h-16 w-16 rounded-full opacity-65 shadow-soft"
        style={{ backgroundColor: mood }}
      />

      <div className="absolute left-1/2 top-[25%] h-24 w-24 -translate-x-1/2 rounded-full bg-[#9d6a4f] shadow-insetCalm sm:h-28 sm:w-28">
        <div className="absolute -left-2 top-2 h-8 w-8 rounded-full bg-[#5b3729]" />
        <div className="absolute left-4 -top-3 h-9 w-9 rounded-full bg-[#5b3729]" />
        <div className="absolute right-3 -top-2 h-9 w-9 rounded-full bg-[#5b3729]" />
        <div className="absolute left-7 top-11 h-2.5 w-2.5 rounded-full bg-ink" />
        <div className="absolute right-7 top-11 h-2.5 w-2.5 rounded-full bg-ink" />
        <div className="absolute bottom-6 left-1/2 h-3 w-8 -translate-x-1/2 rounded-b-full border-b-[3px] border-ink/75" />
      </div>

      <div
        className="absolute left-1/2 top-[45%] h-24 w-36 -translate-x-1/2 rounded-[1.7rem] shadow-insetCalm sm:h-28 sm:w-40"
        style={{ backgroundColor: palette.primary }}
      />
      <div
        className="absolute left-[35%] top-[62%] h-24 w-9 rounded-full sm:h-28 sm:w-10"
        style={{ backgroundColor: palette.warmth }}
      />
      <div
        className="absolute right-[35%] top-[62%] h-24 w-9 rounded-full sm:h-28 sm:w-10"
        style={{ backgroundColor: palette.warmth }}
      />
      <div
        className="absolute bottom-12 left-[29%] h-8 w-16 rounded-full sm:h-9 sm:w-20"
        style={{ backgroundColor: palette.accent }}
      />
      <div
        className="absolute bottom-12 right-[29%] h-8 w-16 rounded-full sm:h-9 sm:w-20"
        style={{ backgroundColor: palette.accent }}
      />

      {isBookOne ? (
        <div className="absolute bottom-[22%] left-8 right-8 h-10 rounded-full bg-[#9f7a4e]/16 shadow-insetCalm">
          <div className="absolute left-[18%] top-3 h-2 w-12 rounded-full bg-[#9f7a4e]/28" />
          <div className="absolute right-[24%] top-5 h-2 w-16 rounded-full bg-[#9f7a4e]/24" />
        </div>
      ) : null}

      <span className="absolute bottom-6 left-6 max-w-[calc(100%-3rem)] rounded-full bg-white/82 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/58 shadow-insetCalm">
        {label}
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
