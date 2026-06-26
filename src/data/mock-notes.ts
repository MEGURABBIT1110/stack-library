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
    body:
      'エラー状態は赤色だけで表現せず、テキスト、aria-describedby、適切なフォーカス制御を組み合わせる。',
    book: bookBySlug('web-accessibility'),
    topics: [getMockTopic('accessibility')].filter(Boolean) as Note['topics'],
    noteType: 'implementation',
    confidence: 5,
    createdDate: '2026-06-12',
    implementationHint:
      'FormFieldコンポーネントに errorId を持たせ、入力欄とエラーメッセージを紐づける。',
    nextAction:
      '既存フォームのエラー文言とフォーカス移動を点検する。',
    isPublishable: true,
    visibility: 'public',
  },
  {
    id: 'note-layout-as-component',
    createdAt: now,
    updatedAt: now,
    title: 'レイアウトはページ固有ではなくコンポーネントとして扱う',
    slug: 'layout-as-component',
    body:
      'Every Layoutの考え方は、余白や折り返しを場当たり的に調整するのではなく、再利用可能なレイアウトプリミティブとして扱う点に価値がある。',
    book: bookBySlug('every-layout'),
    topics: [getMockTopic('css-architecture'), getMockTopic('design-system')].filter(Boolean) as Note['topics'],
    noteType: 'insight',
    confidence: 4,
    createdDate: '2026-06-18',
    implementationHint:
      'Stack、Cluster、Sidebarに相当するCSSユーティリティを設計トークンへ寄せる。',
    visibility: 'public',
  },
  {
    id: 'note-topic-first-navigation',
    createdAt: now,
    updatedAt: now,
    title: '本よりもトピックを第一級の導線にする',
    slug: 'topic-first-navigation',
    body:
      '技術書を読み返すより、実装時に必要な技術トピックから関連する本とメモへ戻れる方が速い。',
    topics: [getMockTopic('information-architecture'), getMockTopic('ux-engineering')].filter(Boolean) as Note['topics'],
    noteType: 'summary',
    confidence: 4,
    createdDate: '2026-06-20',
    visibility: 'public',
  },
  {
    id: 'note-consistency-as-mental-model',
    createdAt: now,
    updatedAt: now,
    title: '一貫性はルールではなく、ユーザーのメンタルモデルへの適応である',
    slug: 'consistency-as-mental-model',
    body:
      'UIの一貫性は見た目を揃えることではなく、ユーザーが次に起きることを予測できる状態を保つことに近い。',
    book: bookBySlug('designing-interfaces'),
    topics: [getMockTopic('design-system'), getMockTopic('ux-engineering')].filter(Boolean) as Note['topics'],
    noteType: 'insight',
    confidence: 4,
    createdDate: '2024-03-08',
    visibility: 'public',
  },
  {
    id: 'note-progressive-disclosure-for-data',
    createdAt: now,
    updatedAt: now,
    title: '複雑なデータの可視化には情報の漸進的開示が効く',
    slug: 'progressive-disclosure-for-data',
    body:
      '最初から全情報を出すのではなく、概要、絞り込み、詳細へ段階的に進める構造が、業務UIでは特に重要になる。',
    book: bookBySlug('designing-interfaces'),
    topics: [getMockTopic('information-architecture'), getMockTopic('ux-engineering')].filter(Boolean) as Note['topics'],
    noteType: 'implementation',
    confidence: 4,
    createdDate: '2024-03-10',
    implementationHint:
      '一覧、詳細、サイドパネルの情報量を分け、ユーザーが必要に応じて深掘りできる構造にする。',
    visibility: 'public',
  },
  {
    id: 'note-modal-flow-interruption',
    createdAt: now,
    updatedAt: now,
    title: 'モーダルダイアログの乱用はユーザーのフローを遮断する',
    slug: 'modal-flow-interruption',
    body:
      'モーダルは注意を強制できる一方で、作業の文脈を切る。軽い確認や補助情報は常設パネルやインライン表示で足りる場合が多い。',
    book: bookBySlug('designing-interfaces'),
    topics: [getMockTopic('ux-engineering'), getMockTopic('accessibility')].filter(Boolean) as Note['topics'],
    noteType: 'question',
    confidence: 3,
    createdDate: '2024-03-12',
    nextAction:
      '確認ダイアログが本当に文脈遮断を必要とする操作かを見直す。',
    visibility: 'public',
  },
];
