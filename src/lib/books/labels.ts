import type { BookLevel, ReadingStatus, TechnicalArea } from "@/types/book";

export const READING_STATUS_DEFINITIONS: ReadonlyArray<{
  id: ReadingStatus;
  label: string;
}> = [
  { id: "tsundoku", label: "積読" },
  { id: "reading", label: "読書中" },
  { id: "finished", label: "読了" },
  { id: "reference", label: "参照用" },
  { id: "paused", label: "中断" },
];

export const READING_STATUS_LABELS: Record<ReadingStatus, string> =
  Object.fromEntries(
    READING_STATUS_DEFINITIONS.map(({ id, label }) => [id, label]),
  ) as Record<ReadingStatus, string>;

export const TECHNICAL_AREA_LABELS: Record<TechnicalArea, string> = {
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
};

export const LEVEL_LABELS: Record<BookLevel, string> = {
  intro: "入門",
  basic: "基礎",
  intermediate: "中級",
  advanced: "上級",
  reference: "リファレンス",
};

export function formatArchiveNumber(index: number): string {
  return String(index + 1).padStart(4, "0");
}

export function formatCount(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replaceAll("/", ".");
}
