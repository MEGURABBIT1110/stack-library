# ARCHITECTURE.md

Stack Library MVP のアーキテクチャ方針です。

## 採用方針

| 項目 | 方針 |
|---|---|
| フレームワーク | Next.js |
| ルーティング | App Router |
| CMS | microCMS |
| 登録処理 | Next.js Server Action |
| データモデル | `books` APIのみ |
| APIキー | サーバー側だけで利用 |
| 実装済み画面 | Book List / Book Detail |
| 将来実装 | Book Form |

旧Astro構成、旧6画面構成、サイドバー付き構成、knowledge map中心の構成は現在のMVPでは採用しません。

## 現在の主要ディレクトリ

表示用コンポーネントとデータ取得を分離します。

```txt
src/
  app/
    globals.css
    layout.tsx
    page.tsx
    books/[contentId]/page.tsx
  components/
    app-shell.tsx
    library-header.tsx
    library-metrics.tsx
    book-list.tsx
    book-card.tsx
    book-detail-identity.tsx
    scroll-context-bar.tsx
    theme-switch.tsx
  lib/
    microcms/client.ts
    books/queries.ts
    books/normalize.ts
    books/labels.ts
  types/book.ts
```

ページとmicroCMS取得はServer Componentのまま維持します。Client Componentは、ブラウザ状態が必要なTheme Switchと、`IntersectionObserver`を使うContext Barに限定します。

## 表示基盤

- 主要コンテンツの最大幅は1200px
- ページレベルのレスポンシブ境界は1024pxのみ
- Desktop / Mobileで別DOMを作らず、同じコンポーネントをCSSで再配置
- 320pxなど狭い領域への対応は、Shelf TileとBook Identity自身のcontainer queryで扱う
- Light / Darkの差はsemantic CSS variablesで切り替え、余白や構造は変えない
- Footerは固定せず通常フローに置き、Page Shellの余剰高をMainが吸収する

## データ取得

### Book List

`/` はサーバー側で microCMS から `books` を取得します。

絞り込みは `/` の検索パラメータとして扱います。積読などの状態は独立ページではなく、同一画面の表示状態です。

### Book Detail

`/books/[contentId]` は `contentId` を使って microCMS から1件取得します。

slug はMVPでは使いません。

### Book Form

`/books/new` はフォームを表示し、送信は Server Action に委譲します。

## Server Action の流れ

```txt
Book Form
  -> Server Action
  -> 入力値を検証
  -> microCMS books API にPOST
  -> 成功時に /books/[contentId] または / へ遷移
  -> 失敗時にフォームへエラーを返す
```

## microCMS APIキー

APIキーはクライアントへ公開しません。

`.env.local` には以下を置く想定です。

```txt
MICROCMS_SERVICE_DOMAIN=
MICROCMS_API_KEY=
```

`NEXT_PUBLIC_` で始まる microCMS APIキーは作りません。

Hobbyプランでは作成可能なAPIキーが1本のため、読み取りと登録で同じキーを使用します。

推奨権限:

- デフォルト権限はすべて無効
- `books` APIの個別権限で `GET` と `POST` のみ有効
- `PUT`、`PATCH`、`DELETE` は対応機能を実装するまで無効
- APIキーはServer ComponentとServer Actionからだけ利用する

## バリデーション

Server Action 側で最低限以下を検証します。

- `title` が空でない
- `authors` が空でない
- `readingStatus` が許可された値である
- URL項目がURLとして妥当である
- 日付項目が日付として妥当である

## MVPで扱わないもの

- topics API
- notes API
- collections API
- knowledge map
- 学習ルート
- サイドバー
- ログイン
- 権限管理
- 画像アップロード
- 読書レビュー投稿
- AI推薦

書影はmicroCMS Assetsの画像フィールドを利用します。画面側ではURLと固有の幅・高さを正規化し、固定比率へ変形せず最大枠内に収めます。
