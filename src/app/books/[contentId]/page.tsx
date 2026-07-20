import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { BookDetailIdentity } from "@/components/book-detail-identity";
import { BookTextSection } from "@/components/book-text-section";
import { ConnectionError } from "@/components/connection-error";
import { LibraryHeader } from "@/components/library-header";
import { ScrollContextBar } from "@/components/scroll-context-bar";
import { formatArchiveNumber } from "@/lib/books/labels";
import { getBook, getBooks } from "@/lib/books/queries";

type BookDetailPageProps = { params: Promise<{ contentId: string }> };

export const dynamic = "force-dynamic";

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { contentId } = await params;
  let result;

  try {
    const book = await getBook(contentId);
    const books = await getBooks().catch(() => undefined);
    result = { book, books };
  } catch (error) {
    if (typeof error === "object" && error !== null && "status" in error && error.status === 404) {
      notFound();
    }
    result = { error };
  }

  if ("error" in result) {
    return (
      <AppShell
        header={<LibraryHeader books={[]} variant="record" />}
        variant="message"
      >
        <ConnectionError error={result.error} />
      </AppShell>
    );
  }
  const { book, books } = result;
  const archiveIndex = books?.findIndex((item) => item.contentId === book.contentId) ?? -1;
  const archiveNumber = archiveIndex >= 0 ? formatArchiveNumber(archiveIndex) : "----";
  const contextBook = {
    authors: book.authors,
    coverImageHeight: book.coverImageHeight,
    coverImageUrl: book.coverImageUrl,
    coverImageWidth: book.coverImageWidth,
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
      header={<LibraryHeader books={books} variant="record" />}
      variant="record"
    >
      <nav aria-label="蔵書一覧へ戻る" className="back-navigation">
        <Link aria-label="蔵書一覧へ戻る" href="/">
          <span aria-hidden="true" className="back-arrow" />
          蔵書一覧へ
        </Link>
      </nav>
      <BookDetailIdentity archiveNumber={archiveNumber} book={book} />
      {book.summary && (
        <BookTextSection
          code="ABSTRACT / SUMMARY"
          heading="概要"
          text={book.summary}
          variant="summary"
        />
      )}
      {(book.readingPurpose || book.usageMemo) && (
        <div className="book-notes">
          {book.readingPurpose && (
            <BookTextSection
              code="READING / PURPOSE"
              heading="この本を読む目的"
              text={book.readingPurpose}
              variant="note"
            />
          )}
          {book.usageMemo && (
            <BookTextSection
              code="PRACTICE / REFERENCE"
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
