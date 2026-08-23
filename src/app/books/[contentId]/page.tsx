import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { BookDetailIdentity } from "@/components/book-detail-identity";
import { BookTextSection } from "@/components/book-text-section";
import { ConnectionError } from "@/components/connection-error";
import { LibraryHeader } from "@/components/library-header";
import { ScrollContextBar } from "@/components/scroll-context-bar";
import { getBook } from "@/lib/books/queries";

type BookDetailPageProps = { params: Promise<{ contentId: string }> };

export const dynamic = "force-dynamic";

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { contentId } = await params;
  let result;

  try {
    const book = await getBook(contentId);
    result = { book };
  } catch (error) {
    if (typeof error === "object" && error !== null && "status" in error && error.status === 404) {
      notFound();
    }
    result = { error };
  }

  if ("error" in result) {
    return (
      <AppShell
        header={<LibraryHeader variant="record" />}
        variant="message"
      >
        <ConnectionError error={result.error} />
      </AppShell>
    );
  }
  const { book } = result;
  const contextBook = {
    authors: book.authors,
    coverImageHeight: book.coverImageHeight,
    coverImageUrl: book.coverImageUrl,
    coverImageWidth: book.coverImageWidth,
    isbn: book.isbn,
    readingStatus: book.readingStatus,
    title: book.title,
  };

  return (
    <AppShell
      contextBar={
        <ScrollContextBar
          book={contextBook}
          kind="record"
          observeId="book-record-title"
        />
      }
      header={<LibraryHeader variant="record" />}
      variant="record"
    >
      <nav aria-label="蔵書一覧へ戻る" className="back-navigation">
        <Link aria-label="蔵書一覧へ戻る" href="/">
          <span aria-hidden="true" className="back-arrow" />
          蔵書一覧へ
        </Link>
      </nav>
      <BookDetailIdentity book={book} />
      {book.summary && (
        <BookTextSection
          heading="概要"
          text={book.summary}
          variant="summary"
        />
      )}
      {(book.readingPurpose || book.usageMemo) && (
        <div className="book-notes">
          {book.readingPurpose && (
            <BookTextSection
              heading="この本を読む目的"
              text={book.readingPurpose}
              variant="note"
            />
          )}
          {book.usageMemo && (
            <BookTextSection
              heading="実務での参照メモ"
              text={book.usageMemo}
              variant="note"
            />
          )}
        </div>
      )}
    </AppShell>
  );
}
