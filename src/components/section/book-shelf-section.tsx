import { BookCard } from "@/components/card/book-card";
import { BookShelf } from "@/components/layout/book-shelf";
import type { Book } from "@/types/book";

type BookShelfSectionProps = {
  books: Book[];
};

export function BookShelfSection({ books }: BookShelfSectionProps) {
  const priorityBookIds = new Set(books.slice(0, 2).map((book) => book.contentId));

  return (
    <section aria-labelledby="book-catalog-title" className="book-shelf book-catalog">
      <div className="book-shelf__heading">
        <h1 id="book-catalog-title">蔵書一覧</h1>
        <p className="book-shelf__count">{books.length}冊</p>
      </div>
      <BookShelf>
        <ul aria-label="書影の一覧" className="book-shelf__grid">
          {books.map((book) => (
            <li key={book.contentId}>
              <BookCard
                book={book}
                priority={priorityBookIds.has(book.contentId)}
              />
            </li>
          ))}
        </ul>
      </BookShelf>
    </section>
  );
}
