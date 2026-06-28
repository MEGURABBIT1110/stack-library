# 技術書ライブラリ / Stack Library

Codex 実装用のプロジェクト基礎ドキュメントです。  
本リポジトリでは、技術書を単なる読書記録ではなく、技術トピック・読書メモ・実装への気づき・再読価値・学習ルートへ再構成する個人用ナレッジアーカイブとして実装します。

想定プロダクト名は `Stack Library` ですが、正式名称は後から変更可能です。実装ではプロダクト名を定数化し、UI文言へ直書きしすぎないでください。

---

## 1. Codex が最初に読む順序

実装前に、以下の順でドキュメントを読んでください。

1. `README.md` — プロジェクト全体像、技術構成、実装優先順位
2. `DESIGN.md` — UI思想、デザイントークン、アクセシビリティ方針
3. `CONTENT_MODEL.md` — microCMS API設計、型、参照関係
4. `ROUTING.md` — Astroルーティング、ページ構成、データ取得方針
5. `COMPONENTS.md` — UIコンポーネント、props、Astro/React分担

Figma関連ドキュメントはこの実装フェーズでは不要です。既にデザイン土台がある前提で、上記5ファイルを実装判断の一次資料にしてください。

---

## 2. プロジェクトの中心思想

このプロジェクトは、一般的な読書管理サービスではありません。

目指すもの:

- 本棚ではなく、技術知の標本室
- 読書記録ではなく、実装に戻れる知識地図
- 技術書・読書メモ・技術トピック・実装への気づきを、知識の地図として再構成する個人ライブラリ

実装上の最重要判断基準:

1. 技術書をただの本ではなく、知識ノードとして扱えているか
2. 読書メモが感想ではなく、実装に戻れる情報になっているか
3. 技術トピックが本よりも重要な探索軸として機能しているか
4. 日本語ファーストのUIとして自然に読めるか
5. Booklog / Notion / 一般的なSaaSダッシュボードのコピーに見えないか
6. アクセシビリティを犠牲にしていないか

---

## 3. MVPスコープ

### 実装するもの

MVPでは以下を実装対象にします。

- Astro プロジェクト構成
- microCMS からのデータ取得
- 技術書一覧
- 技術書詳細
- 技術トピック一覧
- 技術トピック詳細
- 読書メモ一覧
- 読書メモ詳細
- 学習ルート一覧
- 学習ルート詳細
- ライブラリ検索
- ライブラリフィルター
- 表示切り替えの初期版
- 知識マップの初期版
- デザインシステムの初期CSS
- アクセシビリティを考慮したUI部品

### MVPで後回しにするもの

以下は実装対象外、または後続フェーズです。

- ログイン
- 複数ユーザー対応
- 完全な管理画面
- アプリ内での読書進捗編集
- 高度なグラフエディタ
- AI推薦
- AI要約
- GitHub / Zenn / Qiita 連携
- SNS機能
- Supabase併用
- 公開 / 非公開をユーザー単位で切り替える機能

---

## 4. 推奨技術構成

第一候補は `Astro + microCMS` です。

### 採用方針

- Astro: 静的ページ生成、コンテンツ駆動サイトの土台
- microCMS: 技術書、トピック、読書メモ、学習ルートなどのコンテンツ管理
- TypeScript: 型安全なデータ取得とUI実装
- React Islands: 検索、フィルター、表示切り替え、知識マップなど必要な箇所だけインタラクティブ化
- CSS Modules またはグローバルCSS + コンポーネント単位CSS: デザイン土台に合わせて選定
- Vercel / Netlify: 静的サイトのデプロイ先候補

### 基本方針

- まずは静的生成を優先する
- すべてをReactアプリ化しない
- 一覧や詳細ページは Astro コンポーネント中心で作る
- 状態を持つUIだけ React Island にする
- microCMS のレスポンスは `src/types/` に型定義を置く
- microCMS の取得関数は `src/lib/` に集約する

---

## 5. 想定ディレクトリ構成

```txt
src/
  components/
    book/
      BookCard.astro
      BookSignalStats.astro
      BookSignalPanel.astro
      ReadingStatusBadge.astro
    topic/
      TopicCard.astro
      TopicChip.astro
    note/
      NoteCard.astro
    collection/
      CollectionCard.astro
    knowledge-map/
      KnowledgeMap.tsx
      KnowledgeNode.tsx
      DetailSidePanel.tsx
    library/
      LibraryExplorer.tsx
      SearchBar.tsx
      FilterPanel.tsx
      ViewSwitcher.tsx
      BookGrid.astro
      BookTable.tsx
      BookBoard.tsx
      BookMatrix.tsx
    layout/
      SiteHeader.astro
      SiteFooter.astro
      PageShell.astro
      SectionHeader.astro
    ui/
      SignalMeter.astro
      Badge.astro
      EmptyState.astro
      LoadingState.astro
  layouts/
    BaseLayout.astro
    DetailLayout.astro
  pages/
    index.astro
    library/
      index.astro
    books/
      [slug].astro
    topics/
      index.astro
      [slug].astro
    notes/
      index.astro
      [slug].astro
    collections/
      index.astro
      [slug].astro
    map/
      index.astro
  lib/
    microcms.ts
    constants.ts
    format.ts
    queries/
      books.ts
      topics.ts
      notes.ts
      collections.ts
  types/
    content.ts
    microcms.ts
  styles/
    global.css
    tokens.css
  data/
    mock-books.ts
    mock-topics.ts
    mock-notes.ts
    mock-collections.ts
```

実装開始時点でデザイン土台が別途存在する場合は、`styles/` とコンポーネントのスタイルは既存のCSS設計へ合わせてください。ただし、デザイン思想とアクセシビリティ要件は `DESIGN.md` を優先します。

---

## 6. 環境変数

microCMS接続用に以下を使用します。

```txt
MICROCMS_SERVICE_DOMAIN=
MICROCMS_API_KEY=
```

実装では、環境変数が不足している場合にビルド時エラーの原因が分かるようにしてください。

例:

```ts
const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error('microCMS environment variables are missing.');
}
```

---

## 7. 開発コマンド想定

Astroプロジェクト初期化済みを前提とします。

```bash
npm install
npm run dev
npm run build
npm run preview
```

必要に応じて追加する候補:

```bash
npm run lint
npm run format
npm run typecheck
```

`package.json` に scripts を追加する場合は、最低限以下を想定します。

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

---

## 8. ページ一覧

MVPで実装するページは以下です。

```txt
/
  概要ページ

/library/
  技術書ライブラリ

/books/[slug]/
  技術書詳細

/topics/
  技術トピック一覧

/topics/[slug]/
  技術トピック詳細

/notes/
  読書メモ一覧

/notes/[slug]/
  読書メモ詳細

/collections/
  学習ルート一覧

/collections/[slug]/
  学習ルート詳細

/map/
  知識マップ
```

詳細は `ROUTING.md` を参照してください。

---

## 9. 主要データモデル

MVPで中心となるデータは以下です。

- `books`: 技術書本体
- `topics`: 技術トピック
- `notes`: 読書メモ / 実装メモ / 疑問 / 引用 / 気づき
- `collections`: 学習ルート

補助的に以下を扱います。

- `authors`
- `publishers`
- `categories`
- `reading_logs`
- `quotes`
- `external_links`

詳細は `CONTENT_MODEL.md` を参照してください。

---

## 10. サンプルコンテンツ

初期表示確認用に以下の書籍とトピックをモックデータとして用意してよいです。

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

## 11. 実装時のルール

### データ取得

- microCMSアクセスは `src/lib/microcms.ts` と `src/lib/queries/` に集約する
- ページコンポーネント内でfetchロジックを散らさない
- slug で詳細ページを生成する
- 参照フィールドは必要な深さだけ取得する
- 一覧ページでは重い本文データを必要以上に取得しない

### 型

- `src/types/content.ts` にプロジェクト固有型を定義する
- microCMSの共通フィールドは `src/types/microcms.ts` に分離する
- enumは文字列リテラル型で管理する
- UI props は可能な限り `Readonly` で扱う

### UI

- 日本語ラベルを自然に表示する
- 状態は色だけで表現しない
- クリック可能要素は視覚的に判別できるようにする
- カードはEC商品カードではなく、収蔵品ラベル / 技術標本ラベルのように見せる
- 情報量は多くても、余白と階層で読みやすくする

### React Island

React化するのは以下のような状態を持つUIに限定します。

- 検索
- フィルター
- 表示切り替え
- 知識マップ
- マトリクスビュー
- 詳細サイドパネル

静的に表示できるカード、見出し、メタ情報は Astro コンポーネントを優先してください。

---

## 12. 実装優先順位

Codex は以下の順で実装すると破綻しにくいです。

1. `src/types/` の型定義
2. `src/lib/microcms.ts`
3. `src/lib/queries/` のデータ取得関数
4. `src/styles/tokens.css`
5. `src/styles/global.css`
6. `BaseLayout.astro`
7. `SiteHeader.astro` / `SiteFooter.astro`
8. `BookCard.astro`
9. `TopicChip.astro`
10. `SignalMeter.astro`
11. `BookSignalStats.astro`
12. `/library/` 一覧ページ
13. `/books/[slug]/` 詳細ページ
14. `/topics/` と `/topics/[slug]/`
15. `/notes/` と `/notes/[slug]/`
16. `/collections/` と `/collections/[slug]/`
17. `/` 概要ページ
18. 検索 / フィルター / 表示切り替え
19. `/map/` 知識マップ初期版

---

## 13. Definition of Done

MVPとして完了したと判断する条件です。

- `npm run build` が成功する
- 主要ページがすべてリンクで辿れる
- 技術書一覧から技術書詳細へ遷移できる
- 技術書詳細から関連トピック・関連メモへ遷移できる
- トピック詳細に関連書籍と関連メモが表示される
- 学習ルートに目的、読む順番、進捗が表示される
- ライブラリページで検索またはフィルターが動作する
- 日本語UIとして文字サイズ、行間、余白が破綻していない
- 読書状態や評価指標が色だけで表現されていない
- キーボードフォーカスが見える
- 見出し階層が崩れていない
- 空データ時の表示がある
- microCMS未接続時にモックデータで最低限の表示確認ができる、または明確なエラーが出る

---

## 14. 判断に迷ったとき

迷ったら次を優先してください。

1. 本を集めるUIではなく、知識の関係を育てるUIにする
2. レビューではなく、実装に戻れるメモを重視する
3. 技術トピックを第一級の導線として扱う
4. 既存サービス風の既視感を避ける
5. 見た目よりも可読性、構造、アクセシビリティを優先する
6. MVPでは複雑な編集機能を入れない
7. 将来拡張の余地は型とディレクトリ構成で残し、今は作り込みすぎない
