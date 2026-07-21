import { BookCard } from "@/components/book-card";
import {
  formatArchiveNumber,
  formatCount,
  READING_STATUS_DEFINITIONS,
} from "@/lib/books/labels";
import type { Book, ReadingStatus } from "@/types/book";

const shelfDescriptions: Record<ReadingStatus, string> = {
  tsundoku: "これから読む本",
  reading: "いま手に取っている本",
  finished: "読み終えた本",
  reference: "繰り返し参照する本",
  paused: "いったん閉じている本",
};

export function BookList({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <section className="empty-state">
        <p className="section-code">SHELF / EMPTY</p>
        <h2>まだ本は登録されていません</h2>
        <p>microCMSに技術書を登録すると、読書状態ごとの棚に表示されます。</p>
      </section>
    );
  }

  const indexedBooks = new Map(
    books.map((book, index) => [book.contentId, formatArchiveNumber(index)]),
  );
  const priorityBookIds = new Set(books.slice(0, 2).map((book) => book.contentId));

  return (
    <div className="book-shelves">
      {READING_STATUS_DEFINITIONS.map(({ id, label }) => {
        const shelfBooks = books.filter((book) => book.readingStatus === id);
        if (shelfBooks.length === 0) return null;

        return (
          <section aria-labelledby={`shelf-${id}`} className="book-shelf" key={id}>
            <p className="section-code" data-status={id}>
              SHELF / {id.toUpperCase()} / COVER GRID
            </p>
            <div className="book-shelf__heading">
              <div>
                <h2 id={`shelf-${id}`}>{label}</h2>
                <p>{shelfDescriptions[id]}</p>
              </div>
              <p className="book-shelf__count">{formatCount(shelfBooks.length)} BOOKS</p>
            </div>
            <ul className="book-shelf__grid">
              {shelfBooks.map((book) => (
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
      })}
    </div>
  );
}
