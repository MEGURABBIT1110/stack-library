import type {
  Book,
  BookLevel,
  MicroCMSBook,
  ReadingStatus,
  TechnicalArea,
} from "@/types/book";

const readingStatusMap: Record<string, ReadingStatus> = {
  積読: "tsundoku",
  読書中: "reading",
  いま読んでる: "reading",
  読了: "finished",
  読み終わった: "finished",
  参照用: "reference",
  中断: "paused",
};

const technicalAreaMap: Record<string, TechnicalArea> = {
  フロントエンド: "frontend",
  バックエンド: "backend",
  モバイル: "mobile",
  インフラ: "infrastructure",
  データベース: "database",
  アーキテクチャ: "architecture",
  セキュリティ: "security",
  AI: "ai",
  データ: "data",
  デザイン: "design",
  プログラミング言語: "language",
  テスト: "testing",
  DevOps: "devops",
};

const levelMap: Record<string, BookLevel> = {
  入門: "intro",
  基礎: "basic",
  中級: "intermediate",
  上級: "advanced",
  リファレンス: "reference",
};

function lines(value?: string): string[] {
  return (value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeBook(book: MicroCMSBook): Book {
  const rawStatus = book.reading.status[0];
  const readingStatus = readingStatusMap[rawStatus];

  if (!readingStatus) {
    throw new Error(`未対応の読書ステータスです: ${rawStatus ?? "未設定"}`);
  }

  return {
    contentId: book.id,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
    title: book.title,
    subtitle: book.subtitle,
    coverImageUrl: book.cover?.url,
    coverImageWidth: book.cover?.width,
    coverImageHeight: book.cover?.height,
    authors: lines(book.authors),
    isbn: book.publication?.isbn,
    publisher: book.publication?.publisher,
    publishedDate: book.publication?.release_date,
    edition: book.publication?.edition,
    pageCount: book.publication?.pages,
    languages: book.publication?.language ?? [],
    readingStatus,
    rating: book.reading.rating,
    isFavorite: book.reading.favorite,
    technicalAreas: (book.technicalAreas ?? [])
      .map((area) => technicalAreaMap[area])
      .filter((area): area is TechnicalArea => Boolean(area)),
    level: levelMap[book.level?.[0] ?? ""],
    keywords: lines(book.keywords),
    summary: book.description,
    readingPurpose: book.readingPurpose,
    usageMemo: book.usageMemo,
  };
}
