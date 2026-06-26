# CONTENT_MODEL.md

技術書ライブラリ / Stack Library の microCMS コンテンツモデル設計です。  
Codex はこの設計をもとに、TypeScript型、データ取得関数、モックデータ、一覧・詳細ページを実装してください。

---

## 1. 基本方針

このプロジェクトでは、技術書を単なる「本」ではなく、知識ノードとして扱います。  
そのため `books` は中心データですが、探索軸としては `topics`、実装に戻る情報としては `notes`、読書順序としては `collections` が同等に重要です。

### 優先API

MVPで優先するAPI:

1. `books`
2. `topics`
3. `notes`
4. `collections`

補助API:

- `authors`
- `publishers`
- `categories`
- `reading_logs`
- `quotes`
- `external_links`

---

## 2. microCMS設計ルール

### 共通ルール

- slug を持つ詳細ページ対象には必ず `slug` を持たせる
- slug はURLに使うため英小文字、数字、ハイフンを推奨する
- `title` / `name` は日本語・英語混在を許可する
- 参照関係は必要以上に深くしすぎない
- 一覧ページで重い本文を取得しすぎない
- 公開制御が必要なコンテンツには `visibility` を持たせる
- 画像は microCMS の画像フィールドを使う
- 本文はリッチエディタ、またはHTML文字列として扱う

### 共通フィールド

microCMSの標準フィールドとして以下が存在する前提です。

```ts
export type MicroCMSSystemFields = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
};
```

画像フィールド:

```ts
export type MicroCMSImage = {
  url: string;
  height?: number;
  width?: number;
};
```

---

## 3. Enum / Union型

`src/types/content.ts` に以下のような文字列リテラル型を定義してください。

```ts
export type ReadingStatus =
  | 'unread'
  | 'reading'
  | 'read'
  | 'paused'
  | 'reread';

export type OwnershipType =
  | 'physical'
  | 'kindle'
  | 'pdf'
  | 'borrowed'
  | 'web';

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

export type Visibility =
  | 'public'
  | 'private'
  | 'draft';

export type SignalValue = 1 | 2 | 3 | 4 | 5;

export type CollectionProgress =
  | 'not-started'
  | 'in-progress'
  | 'completed'
  | 'paused';
```

UI表示用ラベルは定数で管理します。

```ts
export const READING_STATUS_LABELS: Record<ReadingStatus, string> = {
  unread: '未読',
  reading: '読書中',
  read: '読了',
  paused: '中断',
  reread: '再読中',
};

export const OWNERSHIP_LABELS: Record<OwnershipType, string> = {
  physical: '紙の本',
  kindle: 'Kindle',
  pdf: 'PDF',
  borrowed: '借りた本',
  web: 'Web',
};

export const LEARNING_STAGE_LABELS: Record<LearningStage, string> = {
  intro: '入門',
  practice: '実務',
  'deep-dive': '深掘り',
  research: '研究',
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
```

---

## 4. API一覧

| API ID | 種別 | MVP優先度 | 役割 |
|---|---:|---:|---|
| `books` | リスト形式 | 高 | 技術書本体。知識ノードの中心。 |
| `topics` | リスト形式 | 高 | 技術トピック。本よりも重要な探索軸。 |
| `notes` | リスト形式 | 高 | 読書メモ、実装メモ、疑問、引用、気づき。 |
| `collections` | リスト形式 | 高 | 目的別の学習ルート。 |
| `authors` | リスト形式 | 中 | 著者情報。 |
| `publishers` | リスト形式 | 中 | 出版社情報。 |
| `categories` | リスト形式 | 低 | 大分類。トピックより粗い分類。 |
| `reading_logs` | リスト形式 | 低 | 読書履歴、進捗ログ。 |
| `quotes` | リスト形式 | 低 | 引用をnotesから分離したい場合の拡張。 |
| `external_links` | リスト形式 | 低 | GitHub、Zenn、Qiita、公式サイトなど。 |

---

## 5. `books` API

技術書本体です。  
一般的な書誌情報だけでなく、技術書向けのシグナル、実装接続、再読価値を持たせます。

### フィールド定義

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `title` | テキストフィールド | 必須 | 書名 |
| `subtitle` | テキストフィールド | 任意 | 副題 |
| `slug` | テキストフィールド | 必須 | URL用slug |
| `cover` | 画像 | 任意 | 表紙画像 |
| `authors` | 複数コンテンツ参照: `authors` | 任意 | 著者 |
| `publisher` | コンテンツ参照: `publishers` | 任意 | 出版社 |
| `publishedDate` | 日付 | 任意 | 出版日 |
| `status` | セレクト | 必須 | 読書状態 |
| `ownership` | セレクト | 任意 | 所有形式 |
| `difficulty` | 数値 | 任意 | 難易度 1〜5 |
| `practicality` | 数値 | 任意 | 実務適用度 1〜5 |
| `rereadValue` | 数値 | 任意 | 再読価値 1〜5 |
| `conceptDensity` | 数値 | 任意 | 概念密度 1〜5 |
| `implementationValue` | 数値 | 任意 | 実装接続度 1〜5 |
| `readingPurpose` | 複数行テキスト | 任意 | なぜ読んだか |
| `summary` | 複数行テキスト / リッチエディタ | 任意 | 要約 |
| `review` | 複数行テキスト / リッチエディタ | 任意 | レビューではなく再構成された所感 |
| `topics` | 複数コンテンツ参照: `topics` | 任意 | 関連技術トピック |
| `categories` | 複数コンテンツ参照: `categories` | 任意 | 大分類 |
| `relatedNotes` | 複数コンテンツ参照: `notes` | 任意 | 関連読書メモ |
| `relatedLinks` | 複数コンテンツ参照: `external_links` | 任意 | 外部リンク |
| `favoriteChapter` | テキスト / 複数行テキスト | 任意 | 推し章、効いた章 |
| `appliedToWork` | 真偽値 | 任意 | 実務で使ったか |
| `appliedMemo` | 複数行テキスト | 任意 | どの実装・判断に効いたか |
| `readStartedAt` | 日付 | 任意 | 読み始めた日 |
| `readFinishedAt` | 日付 | 任意 | 読了日 |
| `visibility` | セレクト | 任意 | 公開状態 |

### TypeScript型

```ts
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
  visibility?: Visibility;
};
```

### 実装メモ

- 詳細ページは `slug` で生成する
- 一覧ページでは `summary` や `review` を省略してもよい
- `appliedToWork` がtrueの本は概要ページで「実装に使った本」として表示できる
- `rereadValue` が高い本は再読候補に出せる
- `topics` はライブラリ内検索・フィルターの重要軸にする

---

## 6. `topics` API

技術トピックです。  
本よりも重要な知識軸として扱います。

### フィールド定義

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `name` | テキストフィールド | 必須 | トピック名 |
| `slug` | テキストフィールド | 必須 | URL用slug |
| `description` | 複数行テキスト / リッチエディタ | 任意 | トピック概要 |
| `parentTopic` | コンテンツ参照: `topics` | 任意 | 親トピック |
| `relatedTopics` | 複数コンテンツ参照: `topics` | 任意 | 関連トピック |
| `colorToken` | テキストフィールド | 任意 | UI上の色トークン名 |
| `relatedBooks` | 複数コンテンツ参照: `books` | 任意 | 関連書籍 |
| `relatedNotes` | 複数コンテンツ参照: `notes` | 任意 | 関連メモ |
| `learningStage` | セレクト | 任意 | 学習段階 |
| `nextQuestion` | 複数行テキスト | 任意 | 次に考える問い |
| `usedInWork` | 複数行テキスト | 任意 | 実務で使った例 |

### TypeScript型

```ts
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
};
```

### 実装メモ

- トピック詳細ページでは関連書籍、関連メモ、次に考える問いを表示する
- `colorToken` はCSS変数名やテーマトークンに変換して使う
- `relatedBooks` をmicroCMS側に持つか、Astro側で books を取得して逆引きするかは実装都合で選ぶ
- 双方向参照を完全に保とうとして複雑にしすぎない

---

## 7. `notes` API

読書メモ、実装メモ、疑問、引用、気づきです。  
単なる感想ではなく、実装に戻るための知識片として扱います。

### フィールド定義

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `title` | テキストフィールド | 必須 | メモタイトル |
| `slug` | テキストフィールド | 必須 | URL用slug |
| `body` | リッチエディタ / 複数行テキスト | 必須 | 本文 |
| `book` | コンテンツ参照: `books` | 任意 | 関連書籍 |
| `topics` | 複数コンテンツ参照: `topics` | 任意 | 関連トピック |
| `noteType` | セレクト | 必須 | メモ種別 |
| `confidence` | 数値 | 任意 | 確信度 1〜5 |
| `createdDate` | 日付 | 任意 | 作成日 |
| `isPublishable` | 真偽値 | 任意 | 外部公開できる品質か |
| `sourceChapter` | テキストフィールド | 任意 | 章・節 |
| `implementationHint` | 複数行テキスト | 任意 | 実装に戻るためのメモ |
| `nextAction` | 複数行テキスト | 任意 | 次に試すこと |
| `visibility` | セレクト | 任意 | 公開状態 |

### TypeScript型

```ts
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
```

### noteTypeの用途

| noteType | UI表示 | 用途 |
|---|---|---|
| `quote` | 引用 | 短い引用、印象に残った記述 |
| `insight` | 気づき | 自分の理解や再解釈 |
| `implementation` | 実装メモ | 実務・コードに戻るための知識 |
| `question` | 疑問 | 未解決の問い |
| `summary` | 要約 | 章や本の要点 |
| `comparison` | 比較 | 他書・他技術との比較 |
| `todo` | TODO | 試したいこと、読むべき章 |

### 実装メモ

- `implementation` と `insight` は詳細ページで目立たせる
- `quote` は長すぎない表示にする
- `question` はトピック詳細の「次に考える問い」と相性がよい
- 一覧ページでは noteType、関連本、関連トピックを表示する

---

## 8. `collections` API

単なる本棚ではなく、目的別の学習ルートです。

### フィールド定義

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `title` | テキストフィールド | 必須 | 学習ルート名 |
| `slug` | テキストフィールド | 必須 | URL用slug |
| `purpose` | 複数行テキスト | 必須 | 何のためのルートか |
| `description` | リッチエディタ / 複数行テキスト | 任意 | 詳細説明 |
| `books` | 複数コンテンツ参照: `books` | 任意 | 含まれる書籍 |
| `topics` | 複数コンテンツ参照: `topics` | 任意 | 関連トピック |
| `difficulty` | 数値 | 任意 | ルート全体の難易度 1〜5 |
| `progress` | セレクト | 任意 | 進捗 |
| `recommendedOrder` | 複数行テキスト / カスタムフィールド | 任意 | 推奨順序 |
| `nextBook` | コンテンツ参照: `books` | 任意 | 次に読む本 |
| `notes` | 複数コンテンツ参照: `notes` | 任意 | 関連メモ |
| `visibility` | セレクト | 任意 | 公開状態 |

### TypeScript型

```ts
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
```

### 実装メモ

- 詳細ページでは「目的」「読む順番」「進捗」「次に読む本」を優先表示する
- `books` の配列順を読む順番として扱う場合、microCMS上で順序を維持する
- `recommendedOrder` は初期MVPではテキストでもよい
- 将来的に順序やステップを構造化したい場合はカスタムフィールド化する

---

## 9. 補助API

### `authors`

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `name` | テキストフィールド | 必須 | 著者名 |
| `slug` | テキストフィールド | 任意 | URL用slug。詳細ページを作らないなら任意 |
| `bio` | 複数行テキスト | 任意 | 略歴 |
| `website` | テキストフィールド | 任意 | 公式サイト |

```ts
export type Author = MicroCMSSystemFields & {
  name: string;
  slug?: string;
  bio?: string;
  website?: string;
};
```

### `publishers`

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `name` | テキストフィールド | 必須 | 出版社名 |
| `slug` | テキストフィールド | 任意 | URL用slug |
| `website` | テキストフィールド | 任意 | 公式サイト |

```ts
export type Publisher = MicroCMSSystemFields & {
  name: string;
  slug?: string;
  website?: string;
};
```

### `categories`

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `name` | テキストフィールド | 必須 | カテゴリ名 |
| `slug` | テキストフィールド | 必須 | URL用slug |
| `description` | 複数行テキスト | 任意 | 説明 |

```ts
export type Category = MicroCMSSystemFields & {
  name: string;
  slug: string;
  description?: string;
};
```

### `external_links`

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `title` | テキストフィールド | 必須 | リンクタイトル |
| `url` | テキストフィールド | 必須 | URL |
| `linkType` | セレクト | 任意 | 公式、GitHub、Zenn、Qiitaなど |
| `description` | 複数行テキスト | 任意 | 補足 |

```ts
export type ExternalLink = MicroCMSSystemFields & {
  title: string;
  url: string;
  linkType?: 'official' | 'github' | 'zenn' | 'qiita' | 'article' | 'other';
  description?: string;
};
```

### `reading_logs`

MVPでは必須ではありません。読書履歴や進捗を時系列で残したい場合に使います。

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `book` | コンテンツ参照: `books` | 必須 | 対象書籍 |
| `status` | セレクト | 必須 | その時点の読書状態 |
| `progressMemo` | 複数行テキスト | 任意 | 進捗メモ |
| `loggedAt` | 日時 | 必須 | 記録日時 |

```ts
export type ReadingLog = MicroCMSSystemFields & {
  book: Book;
  status: ReadingStatus;
  progressMemo?: string;
  loggedAt: string;
};
```

### `quotes`

MVPでは `notes` の `noteType: 'quote'` で代替可能です。引用を独立管理したくなった場合に使います。

| フィールドID | 型 | 必須 | 説明 |
|---|---|---:|---|
| `body` | 複数行テキスト | 必須 | 引用本文 |
| `book` | コンテンツ参照: `books` | 必須 | 対象書籍 |
| `chapter` | テキストフィールド | 任意 | 章・節 |
| `note` | コンテンツ参照: `notes` | 任意 | 関連メモ |

```ts
export type Quote = MicroCMSSystemFields & {
  body: string;
  book: Book;
  chapter?: string;
  note?: Note;
};
```

---

## 10. 参照関係

```txt
books
  ├─ authors[]
  ├─ publisher
  ├─ topics[]
  ├─ categories[]
  ├─ relatedNotes[]
  └─ relatedLinks[]

topics
  ├─ parentTopic
  ├─ relatedTopics[]
  ├─ relatedBooks[]
  └─ relatedNotes[]

notes
  ├─ book
  └─ topics[]

collections
  ├─ books[]
  ├─ topics[]
  ├─ nextBook
  └─ notes[]
```

### 双方向参照について

microCMSで完全な双方向同期を求めると管理が複雑になります。  
MVPでは以下の方針を推奨します。

- `books.topics` は必ず登録する
- `notes.book` と `notes.topics` はできるだけ登録する
- `topics.relatedBooks` は任意。未登録ならAstro側で books から逆引きする
- `topics.relatedNotes` は任意。未登録ならAstro側で notes から逆引きする
- `collections.books` は学習ルートの順序として重要なので登録する

---

## 11. クエリ設計

`src/lib/queries/` に取得関数を分離します。

### books

```ts
export async function getBooks(): Promise<Book[]>;
export async function getBookBySlug(slug: string): Promise<Book | null>;
export async function getReadingBooks(): Promise<Book[]>;
export async function getAppliedBooks(): Promise<Book[]>;
export async function getRereadCandidates(): Promise<Book[]>;
```

### topics

```ts
export async function getTopics(): Promise<Topic[]>;
export async function getTopicBySlug(slug: string): Promise<Topic | null>;
export async function getTopicWithRelatedContent(slug: string): Promise<{
  topic: Topic;
  books: Book[];
  notes: Note[];
}>;
```

### notes

```ts
export async function getNotes(): Promise<Note[]>;
export async function getNoteBySlug(slug: string): Promise<Note | null>;
export async function getRecentNotes(limit?: number): Promise<Note[]>;
```

### collections

```ts
export async function getCollections(): Promise<Collection[]>;
export async function getCollectionBySlug(slug: string): Promise<Collection | null>;
```

---

## 12. モックデータ方針

microCMS未接続でもUI確認できるように、初期実装では `src/data/` にモックデータを置いてよいです。

### モックデータの条件

- 10冊程度の技術書
- 10〜12個程度の技術トピック
- 8〜12件程度の読書メモ
- 3〜5個程度の学習ルート
- 読書状態が偏りすぎない
- シグナル値が設定された本と未設定の本を混ぜる
- 関連トピック、関連メモ、関連ルートが辿れる

### サンプル書籍

- Designing Interfaces
- Every Layout
- Web Accessibility
- Refactoring UI
- Learning React
- TypeScriptとReact/Next.jsでつくる実践Webアプリケーション開発
- Webアプリケーションアクセシビリティ
- リーダブルコード
- 達人プログラマー
- オブジェクト指向UIデザイン

### サンプルトピック

- アクセシビリティ
- CSS設計
- デザインシステム
- フロントエンドパフォーマンス
- UXエンジニアリング
- React
- TypeScript
- Next.js
- 情報設計
- コンポーネント設計
- テスト
- パフォーマンス改善

---

## 13. サンプルJSON

### Book

```json
{
  "title": "Webアプリケーションアクセシビリティ",
  "slug": "web-application-accessibility",
  "status": "read",
  "ownership": "physical",
  "difficulty": 4,
  "practicality": 5,
  "rereadValue": 5,
  "conceptDensity": 4,
  "implementationValue": 5,
  "readingPurpose": "フロントエンド実装でアクセシブルなUIを設計・レビューできるようにするため。",
  "summary": "Webアプリケーションにおけるアクセシビリティの設計・実装・検証を体系的に扱う技術書。",
  "favoriteChapter": "フォームとエラー表示",
  "appliedToWork": true,
  "appliedMemo": "フォームUIのラベル、エラー、フォーカス制御の見直しに使った。",
  "visibility": "public"
}
```

### Topic

```json
{
  "name": "アクセシビリティ",
  "slug": "accessibility",
  "description": "誰もが利用できるWeb UIを設計・実装・検証するための知識領域。",
  "colorToken": "cyan",
  "learningStage": "practice",
  "nextQuestion": "複雑なReactコンポーネントで、状態変化を支援技術へどう伝えるか。"
}
```

### Note

```json
{
  "title": "フォームエラーは色だけで伝えない",
  "slug": "form-error-not-only-color",
  "noteType": "implementation",
  "confidence": 5,
  "body": "エラー状態は赤色だけで表現せず、テキスト、aria-describedby、適切なフォーカス制御を組み合わせる。",
  "implementationHint": "FormFieldコンポーネントに errorId を持たせ、入力欄とエラーメッセージを紐づける。",
  "isPublishable": true,
  "visibility": "public"
}
```

### Collection

```json
{
  "title": "アクセシビリティテスト入門",
  "slug": "accessibility-testing-intro",
  "purpose": "Web UIのアクセシビリティを実装・レビューできるようにする。",
  "difficulty": 3,
  "progress": "in-progress",
  "recommendedOrder": "1. Web Accessibility / 2. Webアプリケーションアクセシビリティ / 3. 実務UIで検証",
  "visibility": "public"
}
```

---

## 14. 実装チェックリスト

- [ ] `books` に `difficulty`, `practicality`, `rereadValue`, `conceptDensity`, `implementationValue` がある
- [ ] `topics` が本のタグ扱いだけになっていない
- [ ] `notes` が実装メモ・疑問・引用を区別できる
- [ ] `collections` が本棚ではなく学習ルートになっている
- [ ] slug が詳細ページ生成に使える
- [ ] 参照関係がUIで辿れる
- [ ] 一覧用取得と詳細用取得が分かれている
- [ ] 型定義に optional を適切に使っている
- [ ] 未設定のシグナル値をUIで安全に扱える
- [ ] モックデータで主要ページを確認できる
