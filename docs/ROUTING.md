# ROUTING.md

Stack Library MVP のルーティング定義です。

現在のMVPは Book List、Book Detail、Book Form の3画面だけです。旧案にあった topics、notes、collections、knowledge map、学習ルート、サイドバー付き構成はMVPに含めません。

## ルート一覧

| URL | 画面 | 役割 |
|---|---|---|
| `/books` | Book List | 技術書の蔵書一覧。検索、状態別絞り込み、技術領域絞り込みをこの画面内で扱う |
| `/books/[contentId]` | Book Detail | microCMS の `contentId` を使った技術書詳細 |
| `/books/new` | Book Form | 技術書の新規登録フォーム |

`/` はMVP画面として数えません。実装時は `/books` へリダイレクトするか、最小限の入口ページにします。

## Book List: `/books`

### 目的

登録済みの技術書を一覧し、蔵書状態を確認する画面です。

### 表示するもの

- 書名
- 著者
- 出版社
- 表紙画像URLがある場合の表紙
- 読書状態
- 所有形式
- 技術領域
- レベル
- 概要の短い抜粋

### 状態・絞り込み

積読、読書中、読了、参照用などは別ページではなく、Book List の状態として扱います。

推奨する検索パラメータ:

| param | 値 | 用途 |
|---|---|---|
| `q` | string | 書名、著者、出版社、概要の検索 |
| `status` | `tsundoku` / `reading` / `finished` / `reference` / `paused` | 読書状態で絞り込み |
| `area` | `technicalAreas` の値 | 技術領域で絞り込み |
| `format` | `paper` / `ebook` / `pdf` / `other` | 所有形式で絞り込み |
| `level` | `intro` / `basic` / `intermediate` / `advanced` / `reference` | レベルで絞り込み |

例:

```txt
/books?status=tsundoku
/books?area=frontend&format=paper
/books?q=typescript
```

## Book Detail: `/books/[contentId]`

### 目的

1冊の技術書について、蔵書として必要な情報を確認する画面です。

### URL設計

slug は使わず、microCMS のコンテンツIDをそのまま使います。

```txt
/books/abc123
```

### 表示するもの

- 書名
- 副題
- 著者
- 出版社
- 出版日
- ISBN
- 表紙画像
- 読書状態
- 所有形式
- 保管場所
- 技術領域
- レベル
- 入手日
- 概要
- 実務での参照メモ
- 購入先、公式ページなどのURL
- 登録日、更新日

## Book Form: `/books/new`

### 目的

技術書を microCMS の `books` API に新規登録する画面です。

### 送信方式

- Next.js Server Action を使用する
- ブラウザから microCMS API を直接呼ばない
- APIキーはサーバー側の環境変数だけで扱う
- 送信前にサーバー側で入力値を検証する
- 登録成功後は `/books/[contentId]` または `/books` に遷移する

### フォーム項目

フォーム項目は [CONTENT_MODEL.md](./CONTENT_MODEL.md) の `BookFormInput` に合わせます。

必須項目:

- `title`
- `authors`
- `readingStatus`
- `ownershipFormat`

## MVPで作らないルート

以下は将来拡張です。

| ルート案 | 現在の扱い |
|---|---|
| `/tsundoku` | 作らない。`/books?status=tsundoku` で扱う |
| `/topics` | 作らない |
| `/topics/[slug]` | 作らない |
| `/notes` | 作らない |
| `/notes/[slug]` | 作らない |
| `/collections` | 作らない |
| `/map` | 作らない |
| `/routes` | 作らない |

## ナビゲーション

MVPではサイドバーを使いません。

必要な導線:

- Book List から Book Detail
- Book List から Book Form
- Book Detail から Book List
- Book Detail から Book Form への導線はMVPでは任意

画面上部に最小限のヘッダーを置く想定です。
