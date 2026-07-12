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
| MVP画面 | Book List / Book Detail / Book Form |

旧Astro構成、旧6画面構成、サイドバー付き構成、knowledge map中心の構成は現在のMVPでは採用しません。

## 想定ディレクトリ

実装フェーズでは、以下のような構成を想定します。

```txt
app/
  books/
    page.tsx
    new/
      page.tsx
    [contentId]/
      page.tsx
    actions.ts
lib/
  microcms/
    client.ts
  books/
    queries.ts
    normalize.ts
types/
  book.ts
components/
  books/
    BookList.tsx
    BookListItem.tsx
    BookDetail.tsx
    BookForm.tsx
```

この構成は実装前の案です。実装時に Next.js の導入と合わせて確定します。

## データ取得

### Book List

`/books` はサーバー側で microCMS から `books` を取得します。

絞り込みは `/books` の検索パラメータとして扱います。積読などの状態は独立ページではなく、同一画面の表示状態です。

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
  -> 成功時に /books/[contentId] または /books へ遷移
  -> 失敗時にフォームへエラーを返す
```

## microCMS APIキー

APIキーはクライアントへ公開しません。

`.env.local` には以下を置く想定です。

```txt
MICROCMS_SERVICE_DOMAIN=
MICROCMS_READ_API_KEY=
MICROCMS_WRITE_API_KEY=
```

`NEXT_PUBLIC_` で始まる microCMS APIキーは作りません。

推奨:

- 一覧・詳細取得用の read key
- 登録用の write key
- write key は `books` API への登録に必要な権限だけに絞る

## バリデーション

Server Action 側で最低限以下を検証します。

- `title` が空でない
- `authors` が空でない
- `readingStatus` が許可された値である
- `ownershipFormat` が許可された値である
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

表紙はMVPでは `coverImageUrl` のURL入力で扱います。microCMSの画像アップロードやメディア管理は将来拡張とします。
