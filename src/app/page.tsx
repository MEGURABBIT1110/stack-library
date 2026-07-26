import { AppShell } from "@/components/app-shell";
import { BookList } from "@/components/book-list";
import { ConnectionError } from "@/components/connection-error";
import { LibraryHeader } from "@/components/library-header";
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
          <LibraryHeader currentPage="library" variant="library" />
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
      header={
        <LibraryHeader currentPage="library" variant="library" />
      }
      variant="library"
    >
      <BookList books={result.books} />
    </AppShell>
  );
}
