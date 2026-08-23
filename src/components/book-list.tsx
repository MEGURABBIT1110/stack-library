import { BookShelfSection } from "@/components/book-shelf-section";
import type { Book } from "@/types/book";

export function BookList({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <section className="empty-state">
        <h1>まだ本は登録されていません</h1>
        <p>技術書を登録すると、ここに表示されます。</p>
      </section>
    );
  }

  return <BookShelfSection books={books} />;
}
