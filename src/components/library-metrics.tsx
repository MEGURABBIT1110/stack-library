import { formatCount } from "@/lib/books/labels";
import type { Book } from "@/types/book";

export function LibraryMetrics({ books }: { books?: readonly Book[] }) {
  const metrics = [
    { label: "BOOKS", value: books?.length },
    {
      label: "READING",
      value: books?.filter((book) => book.readingStatus === "reading").length,
    },
    {
      label: "FAVORITE",
      value: books?.filter((book) => book.isFavorite).length,
    },
  ];

  return (
    <dl aria-label="蔵書メトリクス" className="library-metrics">
      {metrics.map((metric) => (
        <div className="library-metrics__item" key={metric.label}>
          <dt>{metric.label}</dt>
          <dd aria-label={metric.value === undefined ? "取得できませんでした" : undefined}>
            {metric.value === undefined ? "--" : formatCount(metric.value)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
