import type { Note } from '@/types/content';
import { mockBooks } from './mock-books';
import { getMockTopic } from './mock-topics';

const now = '2026-06-26T00:00:00.000Z';

const bookBySlug = (slug: string) => mockBooks.find((book) => book.slug === slug);

export const mockNotes: Note[] = [
  {
    id: 'note-form-error-not-only-color',
    createdAt: now,
    updatedAt: now,
    title: 'フォームエラーは色だけで伝えない',
    slug: 'form-error-not-only-color',
    body: 'エラー状態は赤色だけで表現せず、テキスト、aria-describedby、適切なフォーカス制御を組み合わせる。',
    book: bookBySlug('web-accessibility'),
    topics: [getMockTopic('accessibility')].filter(Boolean) as Note['topics'],
    noteType: 'implementation',
    confidence: 5,
    createdDate: '2026-06-12',
    implementationHint: 'FormFieldコンポーネントに errorId を持たせ、入力欄とエラーメッセージを紐づける。',
    nextAction: '既存フォームのエラー文言とフォーカス移動を点検する。',
    isPublishable: true,
    visibility: 'public',
  },
  {
    id: 'note-layout-as-component',
    createdAt: now,
    updatedAt: now,
    title: 'レイアウトはページ固有ではなくコンポーネントとして扱う',
    slug: 'layout-as-component',
    body: 'Every Layoutの考え方は、余白や折り返しを場当たり的に調整するのではなく、再利用可能なレイアウトプリミティブとして扱う点に価値がある。',
    book: bookBySlug('every-layout'),
    topics: [getMockTopic('css-architecture'), getMockTopic('design-system')].filter(Boolean) as Note['topics'],
    noteType: 'insight',
    confidence: 4,
    createdDate: '2026-06-18',
    implementationHint: 'Stack, Cluster, Sidebarに相当するCSSユーティリティを設計トークンへ寄せる。',
    visibility: 'public',
  },
  {
    id: 'note-topic-first-navigation',
    createdAt: now,
    updatedAt: now,
    title: '本よりもトピックを第一級の導線にする',
    slug: 'topic-first-navigation',
    body: '技術書を読み返すより、実装時に必要な技術トピックから関連する本とメモへ戻れる方が実務では速い。',
    topics: [getMockTopic('information-architecture'), getMockTopic('ux-engineering')].filter(Boolean) as Note['topics'],
    noteType: 'summary',
    confidence: 4,
    createdDate: '2026-06-20',
    visibility: 'public',
  },
];
