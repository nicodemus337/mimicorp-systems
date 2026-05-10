import { books } from "@/data/books/my-feet-are-dirty";

export function getAllBooks() {
  return books;
}

export function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug);
}
