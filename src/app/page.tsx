import { AppShell } from "@/components/layout/app-shell";
import { ConnectionError } from "@/components/section/connection-error";
import { LibraryHeader } from "@/components/layout/library-header";
import { ScrollContextBar } from "@/components/layout/scroll-context-bar";
import { BookShelfSection } from "@/components/section/book-shelf-section";
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
      {result.books.length === 0 ? (
        <section className="empty-state">
          <h1>まだ本は登録されていません</h1>
          <p>技術書を登録すると、ここに表示されます。</p>
        </section>
      ) : (
        <BookShelfSection books={result.books} />
      )}
    </AppShell>
  );
}
