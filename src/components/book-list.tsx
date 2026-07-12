import Link from "next/link";
import Image from "next/image";

import type { Book } from "@/types/book";

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

export function BookList({ books }: { books: Book[] }) {
  if (books.length === 0) return <p>登録されている技術書はありません。</p>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book.contentId}>
          <article>
            {book.coverImageUrl && (
              <Image
                src={book.coverImageUrl}
                alt={`${book.title}の書影`}
                width={120}
                height={168}
                style={{ height: "168px", objectFit: "contain", width: "120px" }}
              />
            )}
            <h2>
              <Link href={`/books/${book.contentId}`}>{book.title}</Link>
            </h2>
            {book.subtitle && <p>{book.subtitle}</p>}
            <p>{book.authors.join("、") || "著者不明"}</p>
            <p>読書状態: {statusLabels[book.readingStatus]}</p>
            {book.technicalAreas.length > 0 && (
              <p>
                技術分野: {book.technicalAreas.map((area) => technicalAreaLabels[area]).join("、")}
              </p>
            )}
            {book.summary && <p>{book.summary}</p>}
          </article>
        </li>
      ))}
    </ul>
  );
}
