import { BookCover } from "@/components/common/book-cover";
import { BookStatusLine } from "@/components/common/book-status";
import { TechnicalAreaTags } from "@/components/common/technical-area-tags";
import { formatRegisteredPrice } from "@/lib/books/bank";
import { formatDate, LEVEL_LABELS } from "@/lib/books/labels";
import type { Book } from "@/types/book";

type CatalogItem = { label: string; value: string };

function getCatalogItems(book: Book): CatalogItem[] {
  return [
    book.publisher && { label: "出版社", value: book.publisher },
    book.publishedDate && {
      label: "刊行日",
      value: formatDate(book.publishedDate),
    },
    book.pageCount !== undefined && {
      label: "ページ数",
      value: `${book.pageCount}ページ`,
    },
    book.edition !== undefined && { label: "版", value: `${book.edition}版` },
    book.isbn && { label: "ISBN", value: book.isbn },
    book.languages.length > 0 && {
      label: "言語",
      value: book.languages.join("、"),
    },
    book.level && { label: "難易度", value: LEVEL_LABELS[book.level] },
    book.rating !== undefined && {
      label: "評価",
      value: `${book.rating.toFixed(1)} / 5点`,
    },
    {
      label: "登録価格（税込）",
      value: formatRegisteredPrice(book.price),
    },
  ].filter((item): item is CatalogItem => Boolean(item));
}

export function BookDetailIdentity({
  book,
}: {
  book: Book;
}) {
  const catalogItems = getCatalogItems(book);

  return (
    <section aria-labelledby="book-record-title" className="book-identity">
      <div className="book-identity__profile">
        <BookCover book={book} priority variant="detail" />
        <div className="book-identity__primary">
          <h1 id="book-record-title">{book.title}</h1>
          {book.subtitle && <p className="book-identity__subtitle">{book.subtitle}</p>}
          <p className="book-identity__authors">
            {book.authors.join("、") || "著者不明"}
          </p>
        </div>
        <div className="book-identity__secondary">
          <BookStatusLine book={book} />
          <TechnicalAreaTags areas={book.technicalAreas} />
          <div className="book-identity__meta">
            <span>登録日：{formatDate(book.createdAt)}</span>
            {book.keywords.length > 0 && (
              <span>キーワード：{book.keywords.join("　")}</span>
            )}
          </div>
        </div>
      </div>

      {catalogItems.length > 0 && (
        <div className="catalog-record">
          <h2 className="catalog-record__heading">書誌情報</h2>
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
