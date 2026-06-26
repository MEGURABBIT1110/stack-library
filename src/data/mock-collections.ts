import type { Collection } from '@/types/content';
import { mockBooks } from './mock-books';
import { mockNotes } from './mock-notes';
import { getMockTopic } from './mock-topics';

const now = '2026-06-26T00:00:00.000Z';

const bookBySlug = (slug: string) => mockBooks.find((book) => book.slug === slug);
const noteBySlug = (slug: string) => mockNotes.find((note) => note.slug === slug);

export const mockCollections: Collection[] = [
  {
    id: 'collection-ux-engineer-path',
    createdAt: now,
    updatedAt: now,
    title: 'UXエンジニアへの道',
    slug: 'ux-engineer-path',
    purpose: 'UIの設計意図を実装に接続し、デザインと開発の橋渡しができるエンジニアになる。',
    description: '視覚設計、レイアウト、UIパターン、アクセシビリティを順番に読み、実装判断へ戻れるルート。',
    difficulty: 4,
    progress: 'in-progress',
    books: [
      bookBySlug('refactoring-ui'),
      bookBySlug('every-layout'),
      bookBySlug('designing-interfaces'),
      bookBySlug('web-accessibility'),
    ].filter(Boolean) as Collection['books'],
    topics: [getMockTopic('ux-engineering'), getMockTopic('accessibility'), getMockTopic('design-system')].filter(Boolean) as Collection['topics'],
    recommendedOrder: '1. Refactoring UI / 2. Every Layout / 3. Designing Interfaces / 4. Web Accessibility',
    nextBook: bookBySlug('web-accessibility'),
    notes: [noteBySlug('form-error-not-only-color'), noteBySlug('layout-as-component')].filter(Boolean) as Collection['notes'],
    visibility: 'public',
  },
  {
    id: 'collection-accessibility-testing-intro',
    createdAt: now,
    updatedAt: now,
    title: 'アクセシビリティテスト入門',
    slug: 'accessibility-testing-intro',
    purpose: 'Web UIのアクセシビリティを実装・レビューできるようにする。',
    difficulty: 3,
    progress: 'not-started',
    books: [bookBySlug('web-accessibility')].filter(Boolean) as Collection['books'],
    topics: [getMockTopic('accessibility')].filter(Boolean) as Collection['topics'],
    nextBook: bookBySlug('web-accessibility'),
    visibility: 'public',
  },
];
