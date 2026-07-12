export type ReadingStatus =
  | "tsundoku"
  | "reading"
  | "finished"
  | "reference"
  | "paused";

export type TechnicalArea =
  | "frontend"
  | "backend"
  | "mobile"
  | "infrastructure"
  | "database"
  | "architecture"
  | "security"
  | "ai"
  | "data"
  | "design"
  | "language"
  | "testing"
  | "devops";

export type BookLevel =
  | "intro"
  | "basic"
  | "intermediate"
  | "advanced"
  | "reference";

type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

type MicroCMSPublication = {
  fieldId: "publication";
  isbn?: string;
  publisher?: string;
  release_date?: string;
  edition?: number;
  pages?: number;
  language?: string[];
};

type MicroCMSReading = {
  fieldId: "reading";
  status: string[];
  rating?: number;
  favorite: boolean;
};

export type MicroCMSBook = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  subtitle?: string;
  cover?: MicroCMSImage;
  authors: string;
  publication?: MicroCMSPublication;
  reading: MicroCMSReading;
  technicalAreas?: string[];
  level?: string[];
  keywords?: string;
  description?: string;
  readingPurpose?: string;
  usageMemo?: string;
};

export type Book = {
  contentId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  subtitle?: string;
  coverImageUrl?: string;
  authors: string[];
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  edition?: number;
  pageCount?: number;
  languages: string[];
  readingStatus: ReadingStatus;
  rating?: number;
  isFavorite: boolean;
  technicalAreas: TechnicalArea[];
  level?: BookLevel;
  keywords: string[];
  summary?: string;
  readingPurpose?: string;
  usageMemo?: string;
};
