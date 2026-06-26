import type { MicroCMSImage, MicroCMSSystemFields } from './microcms';

export type ReadingStatus =
  | 'unread'
  | 'reading'
  | 'read'
  | 'paused'
  | 'reread';

export type OwnershipType = 'physical' | 'kindle' | 'pdf' | 'borrowed' | 'web';

export type LearningStage =
  | 'intro'
  | 'practice'
  | 'deep-dive'
  | 'research'
  | 'reorganize';

export type NoteType =
  | 'quote'
  | 'insight'
  | 'implementation'
  | 'question'
  | 'summary'
  | 'comparison'
  | 'todo';

export type Visibility = 'public' | 'private' | 'draft';

export type SignalValue = 1 | 2 | 3 | 4 | 5;

export type CollectionProgress =
  | 'not-started'
  | 'in-progress'
  | 'completed'
  | 'paused';

export type Author = MicroCMSSystemFields & {
  name: string;
  slug?: string;
  bio?: string;
  website?: string;
};

export type Publisher = MicroCMSSystemFields & {
  name: string;
  slug?: string;
  website?: string;
};

export type Category = MicroCMSSystemFields & {
  name: string;
  slug: string;
  description?: string;
};

export type ExternalLink = MicroCMSSystemFields & {
  title: string;
  url: string;
  linkType?: 'official' | 'github' | 'zenn' | 'qiita' | 'article' | 'other';
  description?: string;
};

export type Book = MicroCMSSystemFields & {
  title: string;
  subtitle?: string;
  slug: string;
  cover?: MicroCMSImage;
  authors?: Author[];
  publisher?: Publisher;
  publishedDate?: string;
  status: ReadingStatus;
  ownership?: OwnershipType;
  difficulty?: SignalValue;
  practicality?: SignalValue;
  rereadValue?: SignalValue;
  conceptDensity?: SignalValue;
  implementationValue?: SignalValue;
  readingPurpose?: string;
  summary?: string;
  review?: string;
  topics?: Topic[];
  categories?: Category[];
  relatedNotes?: Note[];
  relatedLinks?: ExternalLink[];
  favoriteChapter?: string;
  appliedToWork?: boolean;
  appliedMemo?: string;
  readStartedAt?: string;
  readFinishedAt?: string;
  readingProgress?: number;
  visibility?: Visibility;
};

export type Topic = MicroCMSSystemFields & {
  name: string;
  slug: string;
  description?: string;
  parentTopic?: Topic;
  relatedTopics?: Topic[];
  colorToken?: string;
  relatedBooks?: Book[];
  relatedNotes?: Note[];
  learningStage?: LearningStage;
  nextQuestion?: string;
  usedInWork?: string;
  visibility?: Visibility;
};

export type Note = MicroCMSSystemFields & {
  title: string;
  slug: string;
  body: string;
  book?: Book;
  topics?: Topic[];
  noteType: NoteType;
  confidence?: SignalValue;
  createdDate?: string;
  isPublishable?: boolean;
  sourceChapter?: string;
  implementationHint?: string;
  nextAction?: string;
  visibility?: Visibility;
};

export type Collection = MicroCMSSystemFields & {
  title: string;
  slug: string;
  purpose: string;
  description?: string;
  books?: Book[];
  topics?: Topic[];
  difficulty?: SignalValue;
  progress?: CollectionProgress;
  recommendedOrder?: string;
  nextBook?: Book;
  notes?: Note[];
  visibility?: Visibility;
};

export const READING_STATUS_LABELS: Record<ReadingStatus, string> = {
  unread: '未読',
  reading: '読書中',
  read: '読了',
  paused: '中断',
  reread: '再読中',
};

export const OWNERSHIP_LABELS: Record<OwnershipType, string> = {
  physical: '紙の本',
  kindle: '電子書籍',
  pdf: 'PDF',
  borrowed: '借りた本',
  web: 'Web',
};

export const LEARNING_STAGE_LABELS: Record<LearningStage, string> = {
  intro: '入門',
  practice: '実践',
  'deep-dive': '深掘り',
  research: '調査',
  reorganize: '再整理',
};

export const NOTE_TYPE_LABELS: Record<NoteType, string> = {
  quote: '引用',
  insight: '気づき',
  implementation: '実装メモ',
  question: '疑問',
  summary: '要約',
  comparison: '比較',
  todo: 'TODO',
};

export const COLLECTION_PROGRESS_LABELS: Record<CollectionProgress, string> = {
  'not-started': '未着手',
  'in-progress': '進行中',
  completed: '完了',
  paused: '中断',
};
