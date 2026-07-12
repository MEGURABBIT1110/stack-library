import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ConnectionError } from "@/components/connection-error";
import { getBook } from "@/lib/books/queries";

type BookDetailPageProps = { params: Promise<{ contentId: string }> };

const statusLabels = {
  tsundoku: "積読",
  reading: "読書中",
  finished: "読了",
  reference: "参照用",
  paused: "中断",
} as const;

const technicalAreaLabels = {
  frontend: "フロントエンド",
  backend: "バックエンド",
  mobile: "モバイル",
  infrastructure: "インフラ",
  database: "データベース",
  architecture: "アーキテクチャ",
  security: "セキュリティ",
  ai: "AI",
  data: "データ",
  design: "デザイン",
  language: "プログラミング言語",
  testing: "テスト",
  devops: "DevOps",
} as const;

const levelLabels = {
  intro: "入門",
  basic: "基礎",
  intermediate: "中級",
  advanced: "上級",
  reference: "リファレンス",
} as const;

export const dynamic = "force-dynamic";

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { contentId } = await params;
  let result;

  try {
    result = { book: await getBook(contentId) };
  } catch (error) {
    if (typeof error === "object" && error !== null && "status" in error && error.status === 404) {
      notFound();
    }
    result = { error };
  }

  if ("error" in result) return <ConnectionError error={result.error} />;
  const { book } = result;

  return (
    <main>
      <nav aria-label="パンくずリスト">
        <Link href="/">技術書の本棚</Link> / {book.title}
      </nav>
      {book.coverImageUrl && (
        <Image
          src={book.coverImageUrl}
          alt={`${book.title}の書影`}
          width={180}
          height={252}
          priority
          style={{ height: "252px", objectFit: "contain", width: "180px" }}
        />
      )}
      <h1>{book.title}</h1>
      {book.subtitle && <p>{book.subtitle}</p>}
      <dl>
        <dt>著者</dt><dd>{book.authors.join("、") || "不明"}</dd>
        <dt>読書状態</dt><dd>{statusLabels[book.readingStatus]}</dd>
        {book.publisher && <><dt>出版社</dt><dd>{book.publisher}</dd></>}
        {book.publishedDate && <><dt>出版日</dt><dd>{book.publishedDate}</dd></>}
        {book.edition !== undefined && <><dt>版</dt><dd>{book.edition}</dd></>}
        {book.pageCount !== undefined && <><dt>ページ数</dt><dd>{book.pageCount}</dd></>}
        {book.isbn && <><dt>ISBN</dt><dd>{book.isbn}</dd></>}
        {book.languages.length > 0 && <><dt>言語</dt><dd>{book.languages.join("、")}</dd></>}
        {book.technicalAreas.length > 0 && <><dt>技術分野</dt><dd>{book.technicalAreas.map((area) => technicalAreaLabels[area]).join("、")}</dd></>}
        {book.level && <><dt>難易度</dt><dd>{levelLabels[book.level]}</dd></>}
        {book.keywords.length > 0 && <><dt>キーワード</dt><dd>{book.keywords.join("、")}</dd></>}
        <dt>登録日</dt><dd>{book.createdAt}</dd>
        {book.readingPurpose && <><dt>読む目的</dt><dd>{book.readingPurpose}</dd></>}
        {book.usageMemo && <><dt>実務での参照メモ</dt><dd>{book.usageMemo}</dd></>}
      </dl>
      {book.summary && <section><h2>概要</h2><p>{book.summary}</p></section>}
    </main>
  );
}
