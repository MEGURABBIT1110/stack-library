import { AppShell } from "@/components/layout/AppShell";
import { ConnectionError } from "@/components/section/ConnectionError";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { ScrollContextBar } from "@/components/layout/ScrollContextBar";
import { BookShelfSection } from "@/components/section/BookShelfSection";
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
