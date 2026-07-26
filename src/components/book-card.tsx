import Link from "next/link";

import { BookCover } from "@/components/book-cover";
import { BookStatusLine, TechnicalAreaTags } from "@/components/book-status";
import type { Book } from "@/types/book";

type BookCardProps = {
  archiveNumber: string;
  book: Book;
  priority?: boolean;
};

export function BookCard({ archiveNumber, book, priority = false }: BookCardProps) {
  return (
    <Link className="book-card" href={`/books/${book.contentId}`}>
      <article>
        <BookCover
          archiveNumber={archiveNumber}
          book={book}
          decorative
          priority={priority}
          variant="shelf"
        />
        <div className="book-card__copy">
          <h3>{book.title}</h3>
          <p className="book-card__author">{book.authors.join("、") || "著者不明"}</p>
          <TechnicalAreaTags areas={book.technicalAreas} />
          <BookStatusLine book={book} />
        </div>
      </article>
    </Link>
  );
}
