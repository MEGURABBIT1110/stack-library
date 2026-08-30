import { AppShell } from "@/components/layout/AppShell";
import { LibraryBank } from "@/components/section/LibraryBank";
import { LibraryHeader } from "@/components/layout/LibraryHeader";
import { getAllBooks } from "@/lib/books/queries";

export const dynamic = "force-dynamic";

export default async function LibraryBankPage() {
  let result;
  try {
    result = { books: await getAllBooks() };
  } catch {
    result = { error: true as const };
  }

  if ("error" in result) {
    return (
      <AppShell
        header={
          <LibraryHeader currentPage="bank" variant="library" />
        }
        variant="message"
      >
        <LibraryBank error />
      </AppShell>
    );
  }

  return (
    <AppShell
      header={
        <LibraryHeader currentPage="bank" variant="library" />
      }
      variant="library"
    >
      <LibraryBank books={result.books} />
    </AppShell>
  );
}
