import { StatusBadge } from "@/components/common/status-badge";
import type { Book } from "@/types/book";

export function FavoriteBadge() {
  return <span className="favorite-badge">お気に入り</span>;
}

export function BookStatusLine({ book }: { book: Book }) {
  return (
    <div className="book-status-line">
      <StatusBadge status={book.readingStatus} />
      {book.isFavorite && <FavoriteBadge />}
    </div>
  );
}
