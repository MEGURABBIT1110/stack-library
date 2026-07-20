import {
  READING_STATUS_LABELS,
  TECHNICAL_AREA_LABELS,
} from "@/lib/books/labels";
import type { Book, ReadingStatus, TechnicalArea } from "@/types/book";

export function StatusBadge({ status }: { status: ReadingStatus }) {
  return (
    <span className="status-badge" data-status={status}>
      {READING_STATUS_LABELS[status]}
    </span>
  );
}

export function FavoriteBadge() {
  return (
    <span className="favorite-badge">
      <span aria-hidden="true">★</span>
      お気に入り
    </span>
  );
}

export function BookStatusLine({ book }: { book: Book }) {
  return (
    <div className="book-status-line">
      <StatusBadge status={book.readingStatus} />
      {book.isFavorite && <FavoriteBadge />}
    </div>
  );
}

export function TechnicalAreaTags({ areas }: { areas: TechnicalArea[] }) {
  if (areas.length === 0) return null;

  return (
    <ul aria-label="技術分野" className="technical-area-tags">
      {areas.map((area) => (
        <li key={area}>{TECHNICAL_AREA_LABELS[area]}</li>
      ))}
    </ul>
  );
}
