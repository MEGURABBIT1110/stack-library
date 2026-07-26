import { BookCover } from "@/components/book-cover";
import { BookStatusLine, TechnicalAreaTags } from "@/components/book-status";
import { formatRegisteredPrice } from "@/lib/books/bank";
import { formatDate, LEVEL_LABELS } from "@/lib/books/labels";
import type { Book } from "@/types/book";

type CatalogItem = { label: string; value: string };

function getCatalogItems(book: Book): CatalogItem[] {
  return [
    book.publisher && { label: "PUBLISHER", value: book.publisher },
    book.publishedDate && {
      label: "PUBLISHED",
      value: formatDate(book.publishedDate),
    },
    book.pageCount !== undefined && {
      label: "PAGES",
      value: `${book.pageCount} pages`,
    },
    book.edition !== undefined && {
      label: "EDITION",
      value: String(book.edition),
    },
    book.isbn && { label: "ISBN", value: book.isbn },
    book.languages.length > 0 && {
      label: "LANGUAGE",
      value: book.languages.join("、"),
    },
    book.level && { label: "LEVEL", value: LEVEL_LABELS[book.level] },
    book.rating !== undefined && {
      label: "RATING",
      value: `${book.rating.toFixed(1)} / 5`,
    },
    {
      label: "登録価格（税込）",
      value: formatRegisteredPrice(book.price),
    },
  ].filter((item): item is CatalogItem => Boolean(item));
}

export function BookDetailIdentity({
  archiveNumber,
  book,
}: {
  archiveNumber: string;
  book: Book;
}) {
  const catalogItems = getCatalogItems(book);

  return (
    <section aria-labelledby="book-record-title" className="book-identity">
      <div className="book-identity__profile">
        <BookCover archiveNumber={archiveNumber} book={book} priority variant="detail" />
        <div className="book-identity__primary">
          <p className="section-code">ARCHIVE ENTRY / {archiveNumber}</p>
          <h1 id="book-record-title">{book.title}</h1>
          {book.subtitle && <p className="book-identity__subtitle">{book.subtitle}</p>}
          <p className="book-identity__authors">
            {book.authors.join("、") || "著者不明"}
          </p>
        </div>
        <div className="book-identity__secondary">
          <BookStatusLine book={book} />
          <TechnicalAreaTags areas={book.technicalAreas} />
          <div className="book-identity__archive-meta">
            <span>REGISTERED / {formatDate(book.createdAt)}</span>
            {book.keywords.length > 0 && (
              <span>KEYWORDS / {book.keywords.join("　")}</span>
            )}
          </div>
        </div>
      </div>

      {catalogItems.length > 0 && (
        <div className="catalog-record">
          <h2 className="section-code">CATALOG / BIBLIOGRAPHIC RECORD</h2>
          <dl>
            {catalogItems.map((item) => (
              <div className="catalog-record__field" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
