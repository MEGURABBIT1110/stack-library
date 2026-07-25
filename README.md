# Stack Library

Stack Library は、技術書の蔵書を探し、読書状態や実務での参照情報を確認するための個人用ライブラリアプリです。

一般的な読書レビューサービスではなく、技術書の書誌情報、読書状態、技術分野、参照メモを静かに整理できる「Technical Archive × Developer Observatory」を目指します。

## Current Status

現在はNext.js App RouterとmicroCMSを使ったMVPを実装しています。

実装済み:

- server-onlyなmicroCMSクライアントとレスポンス正規化
- Book ListとBook Detail
- microCMS Assetsの書影表示
- Light / Darkテーマ
- 最大幅1200px、1024pxを境界にしたDesktop / Mobileレイアウト
- 共通Header、Library Metrics、状態表示、Context Bar、Footer
- 接続エラーと404表示

未実装:

- Book Form
- ISBNからの書誌情報取得
- 検索、絞り込み、並び替え、ページネーション
- 編集・削除

## Routes

| URL | 画面 | 状態 |
|---|---|---|
| `/` | Book List | 実装済み |
| `/books/[contentId]` | Book Detail | 実装済み |
| `/books/new` | Book Form | 未実装 |

Book Listはトップページ `/` です。`/books` の一覧ルートは作成しません。

## Stack

- Next.js 16
- React 19
- TypeScript
- microCMS
- microCMS JavaScript SDK

microCMS APIキーはServer ComponentやServer Actionからのみ使用し、ブラウザには公開しません。

## Setup

依存関係をインストールします。

```bash
npm install
```

プロジェクト直下に `.env.local` を作成します。

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

Hobbyプランでは1本のAPIキーを使用し、`books` APIに対して必要最小限の `GET` と `POST` 権限を付与します。

`.env.local` はGit管理対象外です。環境変数名だけを示す `.env.example` には秘密値を記載しません。

## Development

開発サーバーを起動します。

```bash
npm run dev
```

確認URL:

```txt
http://localhost:3000/
http://localhost:3000/books/{contentId}
```

品質確認:

```bash
npm run lint
npm run build
```

作業は`main`から短命ブランチを作り、Conventional CommitsとPRを使って統合します。ブランチ命名、コミット、検証の詳細は [Development](./docs/DEVELOPMENT.md) を参照してください。

## Content Model

microCMSではリスト形式の `books` APIを使用します。

主なフィールド:

- `title`
- `subtitle`
- `cover`
- `authors`
- `publication`（カスタムフィールド）
- `reading`（カスタムフィールド）
- `technicalAreas`
- `level`
- `keywords`
- `description`
- `readingPurpose`
- `usageMemo`

`ownershipFormat`、`shelfLocation`、`acquiredDate` は現在のMVPでは扱いません。

スキーマの詳細は [Content Model](./docs/CONTENT_MODEL.md) を参照してください。

## MVP Scope

MVPで扱うもの:

- 技術書の一覧表示
- 技術書の詳細表示
- 技術書の新規登録
- 積読、読書中、読了、参照用、中断の状態管理
- Book List内での検索・絞り込み
- microCMS `books` APIとの連携

MVPでは扱わないもの:

- サイドバー
- 状態別の独立ページ
- topics
- notes
- knowledge map
- 学習ルート
- ログイン
- AI推薦
- 一般的な読書レビュー投稿

## Design Direction

- 日本語ファースト
- Light / Darkテーマを同一構造で提供
- 細い罫線
- 精密なメタデータ表示
- 読みやすい日本語本文
- 明確なフォーカス状態
- 色だけに依存しない状態表示

Booklog、Notion、一般的なSaaSダッシュボードのコピーにはしません。

## Documentation

- [Development](./docs/DEVELOPMENT.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Content Model](./docs/CONTENT_MODEL.md)
- [Routing](./docs/ROUTING.md)

microCMSのスキーマバックアップは [`microcms/api-books-import.json`](./microcms/api-books-import.json) にあります。
