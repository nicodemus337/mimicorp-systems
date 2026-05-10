import { BookDetail } from "@/components/books/BookDetail";
import { theStarryHelper } from "@/data/books";

export default function TheStarryHelperPage() {
  return <BookDetail book={theStarryHelper} bookNumber="Book Two" />;
}
