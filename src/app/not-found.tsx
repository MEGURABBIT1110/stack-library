import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>技術書が見つかりません</h1>
      <p>指定された蔵書は存在しないか、公開されていません。</p>
      <Link href="/">技術書の本棚へ戻る</Link>
    </main>
  );
}
