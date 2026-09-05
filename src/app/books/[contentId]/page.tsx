import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import { BookDetailIdentity } from "@/components/section/BookDetailIdentity";
import { BookTextSection } from "@/components/section/BookTextSection";
import { ConnectionError } from "@/components/section/ConnectionError";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { ScrollContextBar } from "@/components/layout/ScrollContextBar";
import { getBook } from "@/lib/books/queries";

type BookDetailPageProps = { params: Promise<{ contentId: string }> };

export const dynamic = "force-dynamic";

const MICROCMS_NOT_FOUND_ERROR_MESSAGE =
  "fetch API response status: 404\n  message is `Content not found`";

function isMicroCMSNotFoundError(error: unknown): error is Error {
  return error instanceof Error && error.message === MICROCMS_NOT_FOUND_ERROR_MESSAGE;
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { contentId } = await params;
  let result;

  try {
    const book = await getBook(contentId);
    result = { book };
  } catch (error) {
    if (isMicroCMSNotFoundError(error)) {
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
