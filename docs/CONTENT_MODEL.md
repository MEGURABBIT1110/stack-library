# CONTENT_MODEL.md

Stack Library MVP の microCMS コンテンツモデル定義です。

現在のMVPでは `books` API のみを使用します。topics、notes、knowledge map、学習ルートは将来拡張であり、MVPのコンテンツモデルには含めません。

## 基本方針

- 技術書を蔵書アイテムとして管理する
- 一般的な読書レビューではなく、読書状態、技術領域、参照しやすさを優先する
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
| 一覧取得 | `/` |
| 詳細取得 | `/books/[contentId]` |

## フィールド定義

| フィールド名 | microCMS上の型 | 必須 | 用途 | Next.js側のTypeScript型 | 一覧 | 詳細 | フォーム |
|---|---|---:|---|---|---:|---:|---:|
| `contentId` | システムフィールド | 自動 | 詳細ページURL、更新対象の識別 | `string` | ○ | ○ | - |
| `title` | テキストフィールド | 必須 | 書名 | `string` | ○ | ○ | ○ |
| `subtitle` | テキストフィールド | 任意 | 副題、版情報の補助 | `string \| undefined` | △ | ○ | ○ |
| `authors` | テキストエリア | 必須 | 著者名。MVPでは改行区切りで入力し、Next.js側で配列化する | `string[]` | ○ | ○ | ○ |
| `publication.price` | カスタム内数値 | 任意 | 蔵書として登録した税込価格（日本円） | `number \| undefined` | - | ○ | 将来対応 |
| `publication.publisher` | カスタム内テキスト | 任意 | 出版社 | `string \| undefined` | △ | ○ | ○ |
| `publication.release_date` | カスタム内日付 | 任意 | 出版日 | `string \| undefined` | △ | ○ | ○ |
| `publication.pages` | カスタム内数値 | 任意 | 総ページ数 | `number \| undefined` | - | ○ | ○ |
| `publication.edition` | カスタム内数値 | 任意 | 版 | `number \| undefined` | - | ○ | ○ |
| `publication.language` | カスタム内セレクト | 任意 | 言語 | `string[]` | - | ○ | ○ |
| `publication.isbn` | カスタム内テキスト | 任意 | ISBN | `string \| undefined` | - | ○ | ○ |
| `cover` | 画像 | 任意 | 書影。画面側ではURL、幅、高さへ正規化する | `MicroCMSImage \| undefined` | ○ | ○ | ○ |
| `reading.status` | カスタム内セレクト | 必須 | 積読、読書中、読了、参照用、中断 | `string[]` | ○ | ○ | ○ |
| `reading.rating` | カスタム内数値 | 任意 | 5段階評価 | `number \| undefined` | - | ○ | ○ |
| `reading.favorite` | カスタム内真偽値 | 任意 | お気に入り | `boolean` | △ | ○ | ○ |
| `technicalAreas` | 複数選択 | 任意 | 技術領域による軽い分類。topicsとは別物として扱う | `TechnicalArea[]` | ○ | ○ | ○ |
| `level` | セレクトフィールド | 任意 | 入門、中級、上級、リファレンスなどの目安 | `BookLevel \| undefined` | △ | ○ | ○ |
| `keywords` | テキストエリア | 任意 | 自由な検索語。改行区切り | `string[]` | △ | ○ | ○ |
| `description` | テキストエリア | 任意 | 本の概要。画面側では `summary` として扱う | `string \| undefined` | △ | ○ | ○ |
| `readingPurpose` | テキストエリア | 任意 | 購入理由、読みたい理由、読む前に解決したいこと | `string \| undefined` | - | ○ | ○ |
| `usageMemo` | テキストエリア | 任意 | 読後または参照時に、実務で活用する場面を残すメモ | `string \| undefined` | - | ○ | ○ |
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

型定義の正本は `src/types/book.ts` とします。

- `MicroCMSBook`: `cover`、`publication`、`reading` を含むmicroCMSの生レスポンス
- `Book`: 一覧・詳細画面が利用する正規化後の型
- セレクト値はmicroCMSの日本語表示値からアプリ内部の英語IDへ変換する
- `authors` と `keywords` は改行区切り文字列から配列へ変換する
- `publication.price` は正規化後の `Book.price` として扱い、有限の0以上の数値だけを採用する。`0`は登録済み価格として保持し、未設定・負数・非数値は未登録として `undefined` にする
- `cover.url`、`cover.width`、`cover.height` は `coverImageUrl`、`coverImageWidth`、`coverImageHeight` へ変換する

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
- `coverImageWidth`
- `coverImageHeight`
- `readingStatus`
- `technicalAreas`
- `level`
- `summary`

絞り込みは `/` 内の状態として扱います。積読専用ページは作りません。

### Book Detail

`books` APIの全フィールドを表示対象にします。

Detailではレビューではなく、蔵書としての情報、参照用途、技術領域、入手情報を優先します。

### Library Bank

全件の `Book.price` を使い、登録価格の合計・平均・登録率と、読書状態別・蔵書別の明細を表示します。`Book.price` が `undefined` の本は未登録として集計対象の金額から除外し、`0` は登録済みの実値として扱います。

### Book Form

使用する主なフィールド:

- `title`
- `subtitle`
- `authors`
- `publisher`
- `publishedDate`
- `pageCount`
- `isbn`
- `coverImageUrl`
- `readingStatus`
- `technicalAreas`
- `level`
- `summary`
- `readingPurpose`
- `usageMemo`
- `price`（将来実装。任意の税込価格、日本円）

フォーム送信は Next.js Server Action で受け、サーバー側でバリデーションしたうえで microCMS に登録します。
