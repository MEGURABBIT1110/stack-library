import { AppShell } from "@/components/app-shell";
import { BookList } from "@/components/book-list";
import { ConnectionError } from "@/components/connection-error";
import { LibraryHeader } from "@/components/library-header";
import { LibraryStatusSummary } from "@/components/library-status-summary";
import { ScrollContextBar } from "@/components/scroll-context-bar";
import { getBooks } from "@/lib/books/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let result;
  try {
    result = { books: await getBooks() };
  } catch (error) {
    result = { error };
  }

  if ("error" in result) {
    return (
      <AppShell
        header={
          <LibraryHeader books={[]} titleAsHeading={false} variant="library" />
        }
        variant="message"
      >
        <ConnectionError error={result.error} />
      </AppShell>
    );
  }

  return (
    <AppShell
      contextBar={<ScrollContextBar kind="library" observeId="library-masthead" />}
      header={<LibraryHeader books={result.books} variant="library" />}
      variant="library"
    >
      <LibraryStatusSummary books={result.books} />
      <BookList books={result.books} />
    </AppShell>
  );
}
