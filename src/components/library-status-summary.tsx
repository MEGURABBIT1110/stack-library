import {
  formatCount,
  READING_STATUS_DEFINITIONS,
} from "@/lib/books/labels";
import type { Book } from "@/types/book";

export function LibraryStatusSummary({ books }: { books: readonly Book[] }) {
  const items = [
    { id: "all", label: "すべて", value: books.length },
    ...READING_STATUS_DEFINITIONS.map(({ id, label }) => ({
      id,
      label,
      value: books.filter((book) => book.readingStatus === id).length,
    })),
  ];

  return (
    <section aria-labelledby="library-status-title" className="status-summary">
      <h2 className="section-code" id="library-status-title">
        LIBRARY STATUS / SUMMARY
      </h2>
      <dl className="status-summary__grid">
        {items.map((item) => (
          <div
            className="status-summary__item"
            data-active={item.value > 0 || undefined}
            data-status={item.id === "all" ? undefined : item.id}
            key={item.id}
          >
            <dt>{item.label}</dt>
            <dd>{formatCount(item.value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
