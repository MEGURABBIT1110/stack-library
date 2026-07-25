import type { Book } from "@/types/book";

const timestamp = "2026-07-25T00:00:00.000Z";

export const baseBook: Book = {
  contentId: "storybook-css-design",
  createdAt: timestamp,
  updatedAt: timestamp,
  title: "CSS設計完全ガイド",
  subtitle: "詳細解説＋実践的モジュール集",
  authors: ["Stack Library編集部"],
  isbn: "9780000000000",
  publisher: "技術標本社",
  publishedDate: "2026-01-15",
  edition: 1,
  pageCount: 320,
  languages: ["日本語"],
  readingStatus: "reference",
  rating: 4.5,
  isFavorite: true,
  technicalAreas: ["frontend", "design"],
  level: "intermediate",
  keywords: ["CSS", "設計", "コンポーネント"],
  summary:
    "CSSの設計原則を、長期運用されるインターフェースの実例から確認するための技術書。",
  readingPurpose: "コンポーネント境界と命名規則を見直す。",
  usageMemo: "設計レビュー前に第3章と第7章を参照する。",
};

export function makeBook(overrides: Partial<Book> = {}): Book {
  return {
    ...baseBook,
    ...overrides,
  };
}

export const libraryBooks: Book[] = [
  baseBook,
  makeBook({
    contentId: "storybook-typescript",
    title: "実践TypeScript設計",
    authors: ["大石 周"],
    readingStatus: "reading",
    isFavorite: false,
    technicalAreas: ["frontend", "language"],
  }),
  makeBook({
    contentId: "storybook-accessibility",
    title: "Webアクセシビリティの設計と検証",
    authors: ["技術標本研究会"],
    readingStatus: "finished",
    isFavorite: true,
    technicalAreas: ["frontend", "design", "testing"],
  }),
];
