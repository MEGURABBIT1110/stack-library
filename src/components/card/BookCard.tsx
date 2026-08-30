import Link from "next/link";

import { BookCover } from "@/components/common/BookCover";
import type { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
  priority?: boolean;
};

export function BookCard({ book, priority = false }: BookCardProps) {
  return (
    <Link
      aria-label={`${book.title}の詳細を開く`}
      className="book-card"
      href={`/books/${book.contentId}`}
    >
      <BookCover
        book={book}
        decorative
        priority={priority}
        variant="shelf"
      />
      <span aria-hidden="true" className="book-card__tooltip" role="tooltip">
        {book.title}
      </span>
    </Link>
  );
}
