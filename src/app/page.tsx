import { BookList } from "@/components/book-list";
import { ConnectionError } from "@/components/connection-error";
import { getBooks } from "@/lib/books/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let result;
  try {
    result = { books: await getBooks() };
  } catch (error) {
    result = { error };
  }

  if ("error" in result) return <ConnectionError error={result.error} />;

  return (
    <main>
      <h1>技術書の本棚</h1>
      <p>持っている本を探し、読書状態を確認できます。</p>
      <BookList books={result.books} />
    </main>
  );
}
