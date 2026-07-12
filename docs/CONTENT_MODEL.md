# CONTENT_MODEL.md

Stack Library MVP の microCMS コンテンツモデル定義です。

現在のMVPでは `books` API のみを使用します。topics、notes、knowledge map、学習ルートは将来拡張であり、MVPのコンテンツモデルには含めません。

## 基本方針

- 技術書を蔵書アイテムとして管理する
- 一般的な読書レビューではなく、所有状態、読書状態、技術領域、参照しやすさを優先する
- Book Detail のURLは slug ではなく microCMS の `contentId` を使用する
- Book Form から Next.js Server Action 経由で `books` API に登録する
- microCMS APIキーはサーバー側のみで扱う

## API

| 項目 | 内容 |
|---|---|
| API ID | `books` |
| API種別 | リスト形式 |
| 詳細URLキー | `contentId` |
| 作成経路 | `/books/new` の Server Action |
| 一覧取得 | `/books` |
| 詳細取得 | `/books/[contentId]` |

## フィールド定義

| フィールド名 | microCMS上の型 | 必須 | 用途 | Next.js側のTypeScript型 | 一覧 | 詳細 | フォーム |
|---|---|---:|---|---|---:|---:|---:|
| `contentId` | システムフィールド | 自動 | 詳細ページURL、更新対象の識別 | `string` | ○ | ○ | - |
| `title` | テキストフィールド | 必須 | 書名 | `string` | ○ | ○ | ○ |
| `subtitle` | テキストフィールド | 任意 | 副題、版情報の補助 | `string \| undefined` | △ | ○ | ○ |
| `authors` | テキストエリア | 必須 | 著者名。MVPでは改行区切りで入力し、Next.js側で配列化する | `string[]` | ○ | ○ | ○ |
| `publisher` | テキストフィールド | 任意 | 出版社 | `string \| undefined` | △ | ○ | ○ |
| `publishedDate` | 日付 | 任意 | 出版日 | `string \| undefined` | △ | ○ | ○ |
| `isbn` | テキストフィールド | 任意 | ISBN。重複確認や外部連携の将来拡張に使える | `string \| undefined` | - | ○ | ○ |
| `coverImageUrl` | テキストフィールド | 任意 | 表紙画像URL。MVPではmicroCMS画像アップロードではなくURL入力にする | `string \| undefined` | ○ | ○ | ○ |
| `readingStatus` | セレクトフィールド | 必須 | 積読、読書中、読了、参照用などの状態 | `ReadingStatus` | ○ | ○ | ○ |
| `ownershipFormat` | セレクトフィールド | 必須 | 紙、電子、PDFなどの所有形式 | `OwnershipFormat` | ○ | ○ | ○ |
| `shelfLocation` | テキストフィールド | 任意 | 本棚、Kindle、会社、保管場所など | `string \| undefined` | △ | ○ | ○ |
| `technicalAreas` | 複数選択 | 任意 | 技術領域による軽い分類。topicsとは別物として扱う | `TechnicalArea[]` | ○ | ○ | ○ |
| `level` | セレクトフィールド | 任意 | 入門、中級、上級、リファレンスなどの目安 | `BookLevel \| undefined` | △ | ○ | ○ |
| `acquiredDate` | 日付 | 任意 | 購入日、入手日 | `string \| undefined` | - | ○ | ○ |
| `summary` | テキストエリア | 任意 | 本の概要。レビューではなく蔵書としての説明 | `string \| undefined` | △ | ○ | ○ |
| `usageMemo` | テキストエリア | 任意 | 実務で参照する場面、手元に置く理由 | `string \| undefined` | - | ○ | ○ |
| `sourceUrl` | テキストフィールド | 任意 | 購入先、公式ページ、出版社ページなど | `string \| undefined` | - | ○ | ○ |
| `createdAt` | システムフィールド | 自動 | 登録日時 | `string` | - | ○ | - |
| `updatedAt` | システムフィールド | 自動 | 更新日時 | `string` | - | ○ | - |

`△` はスペースに余裕がある場合のみ表示します。

## セレクト値

### `readingStatus`

| 値 | 表示ラベル | 用途 |
|---|---|---|
| `tsundoku` | 積読 | 所有しているがまだ読んでいない |
| `reading` | 読書中 | 現在読んでいる |
| `finished` | 読了 | 読み終えた |
| `reference` | 参照用 | 通読よりも辞書・実務参照として使う |
| `paused` | 中断 | 一時的に止めている |

### `ownershipFormat`

| 値 | 表示ラベル |
|---|---|
| `paper` | 紙 |
| `ebook` | 電子 |
| `pdf` | PDF |
| `other` | その他 |

### `technicalAreas`

MVPでは固定の複数選択として扱います。

| 値 | 表示ラベル |
|---|---|
| `frontend` | フロントエンド |
| `backend` | バックエンド |
| `mobile` | モバイル |
| `infrastructure` | インフラ |
| `database` | データベース |
| `architecture` | アーキテクチャ |
| `security` | セキュリティ |
| `ai` | AI |
| `data` | データ |
| `design` | デザイン |
| `language` | プログラミング言語 |
| `testing` | テスト |
| `devops` | DevOps |

### `level`

| 値 | 表示ラベル |
|---|---|
| `intro` | 入門 |
| `basic` | 基礎 |
| `intermediate` | 中級 |
| `advanced` | 上級 |
| `reference` | リファレンス |

## TypeScript型

microCMSから取得する生データと、画面で扱う正規化後の型を分けます。

```ts
export type ReadingStatus =
  | 'tsundoku'
  | 'reading'
  | 'finished'
  | 'reference'
  | 'paused';

export type OwnershipFormat =
  | 'paper'
  | 'ebook'
  | 'pdf'
  | 'other';

export type TechnicalArea =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'infrastructure'
  | 'database'
  | 'architecture'
  | 'security'
  | 'ai'
  | 'data'
  | 'design'
  | 'language'
  | 'testing'
  | 'devops';

export type BookLevel =
  | 'intro'
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'reference';

export type MicroCMSBook = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  subtitle?: string;
  authors: string;
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  coverImageUrl?: string;
  readingStatus: ReadingStatus;
  ownershipFormat: OwnershipFormat;
  shelfLocation?: string;
  technicalAreas?: TechnicalArea[];
  level?: BookLevel;
  acquiredDate?: string;
  summary?: string;
  usageMemo?: string;
  sourceUrl?: string;
};

export type Book = {
  contentId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  coverImageUrl?: string;
  readingStatus: ReadingStatus;
  ownershipFormat: OwnershipFormat;
  shelfLocation?: string;
  technicalAreas: TechnicalArea[];
  level?: BookLevel;
  acquiredDate?: string;
  summary?: string;
  usageMemo?: string;
  sourceUrl?: string;
};

export type BookFormInput = {
  title: string;
  subtitle?: string;
  authors: string;
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  coverImageUrl?: string;
  readingStatus: ReadingStatus;
  ownershipFormat: OwnershipFormat;
  shelfLocation?: string;
  technicalAreas?: TechnicalArea[];
  level?: BookLevel;
  acquiredDate?: string;
  summary?: string;
  usageMemo?: string;
  sourceUrl?: string;
};
```

`MicroCMSBook.id` は microCMS のコンテンツIDです。画面側では `contentId` として扱い、`/books/[contentId]` に使用します。

## 画面別使用方針

### Book List

使用する主なフィールド:

- `contentId`
- `title`
- `subtitle`
- `authors`
- `publisher`
- `coverImageUrl`
- `readingStatus`
- `ownershipFormat`
- `technicalAreas`
- `level`
- `summary`

絞り込みは `/books` 内の状態として扱います。積読専用ページは作りません。

### Book Detail

`books` APIの全フィールドを表示対象にします。

Detailではレビューではなく、蔵書としての情報、参照用途、技術領域、入手情報を優先します。

### Book Form

使用する主なフィールド:

- `title`
- `subtitle`
- `authors`
- `publisher`
- `publishedDate`
- `isbn`
- `coverImageUrl`
- `readingStatus`
- `ownershipFormat`
- `shelfLocation`
- `technicalAreas`
- `level`
- `acquiredDate`
- `summary`
- `usageMemo`
- `sourceUrl`

フォーム送信は Next.js Server Action で受け、サーバー側でバリデーションしたうえで microCMS に登録します。
