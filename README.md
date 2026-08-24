# Stack Library

Stack Library は、技術書の蔵書を探し、読書状態や実務での参照情報を確認するための個人用ライブラリアプリです。

一般的な読書レビューサービスではなく、技術書の書誌情報、読書状態、技術分野、参照メモを静かに整理できる「Technical Archive × Developer Observatory」を目指します。

## Current Status

現在はNext.js App RouterとmicroCMSを使ったMVPを実装しています。

実装済み:

- server-onlyなmicroCMSクライアントとレスポンス正規化
- Book List、Book Detail、Library Bank
- 登録価格の全件集計と書名・出版社・価格による蔵書台帳
- microCMS Assetsの書影表示
- Light / Darkテーマ
- 最大幅1224px、1024pxを境界にしたDesktop / Mobileレイアウト
- 画面上端へ埋め込まれた共通Header、Context Bar、Footer
- 接続エラーと404表示
- Storybookによる再利用コンポーネントのカタログと状態検証

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
| `/bank` | Library Bank | 実装済み |
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
http://localhost:3000/bank
http://localhost:3000/books/{contentId}
```

品質確認:

```bash
npm run lint
npm run build
```

Storybookを起動します。

```bash
npm run storybook
```

確認URL:

```txt
http://localhost:6006/
```

作業はGitHub Issueを起点に、`main`からIssue番号付きの短命ブランチを作ります。Conventional CommitsとPRを使って統合します。ブランチ命名、コミット、検証の詳細は [Development](./docs/DEVELOPMENT.md) を参照してください。

## Content Model

microCMSではリスト形式の `books` APIを使用します。

主なフィールド:

- `title`
- `subtitle`
- `cover`
- `authors`
- `publication.price`（任意の税込登録価格・日本円）
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
- 蔵書に登録した税込価格の集計
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
- [Design: 本棚・書影](./docs/DESIGN.md)
- [Content Model](./docs/CONTENT_MODEL.md)
- [Routing](./docs/ROUTING.md)
- [Component Traceability Registry](./docs/COMPONENT_TRACEABILITY.md)

microCMSのスキーマバックアップは [`microcms/api-books-import.json`](./microcms/api-books-import.json) にあります。
