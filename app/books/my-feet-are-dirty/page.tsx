import { BookDetail } from "@/components/books/BookDetail";
import { myFeetAreDirty } from "@/data/books";

export default function MyFeetAreDirtyPage() {
  return <BookDetail book={myFeetAreDirty} bookNumber="Book One" />;
}
