import { BookCard } from "@/components/book-card";
import { formatArchiveNumber, formatCount } from "@/lib/books/labels";
import type { Book } from "@/types/book";

export function BookList({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <section className="empty-state">
        <p className="section-code">ARCHIVE / EMPTY</p>
        <h1>まだ本は登録されていません</h1>
        <p>microCMSに技術書を登録すると、蔵書一覧に表示されます。</p>
      </section>
    );
  }

  const indexedBooks = new Map(
    books.map((book, index) => [book.contentId, formatArchiveNumber(index)]),
  );
  const priorityBookIds = new Set(books.slice(0, 2).map((book) => book.contentId));

  return (
    <section aria-labelledby="book-catalog-title" className="book-shelf book-catalog">
      <p className="section-code">ARCHIVE / BOOK CATALOG</p>
      <div className="book-shelf__heading">
        <div>
          <h1 id="book-catalog-title">蔵書一覧</h1>
          <p>書名、著者、技術領域から知識を見つけ直す</p>
        </div>
        <p className="book-shelf__count">{formatCount(books.length)} BOOKS</p>
      </div>
      <ul className="book-shelf__grid">
        {books.map((book) => (
          <li key={book.contentId}>
            <BookCard
              archiveNumber={indexedBooks.get(book.contentId) ?? "0000"}
              book={book}
              priority={priorityBookIds.has(book.contentId)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
