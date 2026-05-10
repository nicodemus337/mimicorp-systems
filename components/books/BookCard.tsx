"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import type { Book } from "@/types/book";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type BookCardProps =
  | {
      variant?: "book";
      book: Book;
    }
  | {
      variant: "future";
      book?: never;
    };

export function BookCard(props: BookCardProps) {
  if (props.variant === "future") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.35 }}
      >
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
            The platform is ready for additional Mimicorp stories, caregiver
            notes, emotional prompts, and cover art.
          </p>
        </Card>
      </motion.div>
    );
  }

  const { book } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
    >
      <Card className="flex min-h-[24rem] flex-col">
        <div className="mb-7 overflow-hidden rounded-[1.5rem] bg-oat shadow-insetCalm">
          <Image
            src={book.pages[0].image}
            alt={`${book.title} cover by ${book.author}`}
            width={520}
            height={520}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-clay">
          <BookOpen aria-hidden="true" size={16} />
          <span>{book.ageRange}</span>
        </div>
        <h3 className="mt-3 text-3xl font-semibold text-ink">{book.title}</h3>
        <p className="mt-3 flex-1 text-base leading-7 text-ink/66">
          {book.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={`/books/${book.slug}/read`}>
            Read Now <ArrowRight aria-hidden="true" size={17} />
          </Button>
          <Button href={`/books/${book.slug}`} variant="secondary">
            Learn More
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
