# ROUTING.md

技術書ライブラリ / Stack Library の Astro ルーティング設計です。  
Codex はこの設計に従って、ページ構成、静的生成、データ取得、ページ間導線を実装してください。

---

## 1. 基本方針

このプロジェクトは `Astro + microCMS` を前提としたコンテンツ駆動サイトです。  
ページは基本的に静的生成し、検索・フィルター・表示切り替え・知識マップなど状態を持つUIだけを React Island として実装します。

### ルーティング思想

- 技術書、技術トピック、読書メモ、学習ルートを並列の知識ノードとして扱う
- トピックを単なるタグページにしない
- 詳細ページ同士を相互に辿れるようにする
- URLは短く、意味が分かる英語slugにする
- UIラベルは日本語、URLは英語を基本にする

---

## 2. ルート一覧

MVPで実装するルートです。

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

---

## 3. ページファイル構成

```txt
src/pages/
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
```

---

## 4. `/` 概要ページ

### 役割

知識ライブラリの入口です。  
単なるダッシュボードではなく、現在の読書・技術関心・知識の蓄積を見せます。

### 表示セクション

- Hero
- 読書中の技術書
- 今掘っている技術トピック
- 注目の本棚 / 学習ルート
- 読書シグナル
- 最近の読書メモ
- 次に読む候補
- 実装に使った本

### データ要件

- `getReadingBooks()`
- `getTopics()` または注目トピック用フィルター
- `getCollections()`
- `getRecentNotes(5)`
- `getRereadCandidates()`
- `getAppliedBooks()`

### 使用コンポーネント

- `BaseLayout`
- `PageShell`
- `SectionHeader`
- `BookCard`
- `TopicChip`
- `NoteCard`
- `CollectionCard`
- `SignalMeter`
- `EmptyState`

### 実装メモ

- 最初から複雑な統計を作らなくてよい
- 読書シグナルは件数集計で十分
- トピックは本よりも重要な導線として配置する

### SEO

- title: `Stack Library | 技術書を知識・実装・再読のために再配置する`
- description: `技術書、読書メモ、技術トピック、学習ルートを知識地図として再構成する個人ライブラリ。`

---

## 5. `/library/` 技術書ライブラリ

### 役割

すべての技術書を一覧するメイン画面です。  
本棚ではなく、技術書を複数の視点から探索するための画面にします。

### 表示要素

- ページタイトル
- 概要コピー
- 検索バー
- フィルターパネル
- 表示切り替え
- 技術書一覧
- 検索結果件数
- 空状態

### 表示モード

- Grid
- Table
- Board
- Matrix

MVPでは `Grid` を必須、その他は初期版または簡易版でよいです。

### フィルター条件

- 読書状態
- 技術トピック
- 難易度
- レベル（難易度レンジ）
- 実務適用度
- 再読価値
- 読了年

### URLクエリ設計

検索・フィルター状態は可能ならURLクエリに反映します。

```txt
/library/?q=accessibility&status=read&topic=accessibility&view=grid
/library/?difficulty=advanced&minDifficulty=4&practicality=5
/library/?view=matrix
```

### クエリパラメータ

| param | 値 | 説明 |
|---|---|---|
| `q` | string | 検索語 |
| `status` | `unread` / `reading` / `read` / `paused` / `reread` | 読書状態 |
| `topic` | topic slug | 技術トピック |
| `difficulty` | `intro` / `intermediate` / `advanced` | 難易度 |
| `minDifficulty` | 1〜5 | レベル下限 |
| `practicality` | 1〜5 | 実務適用度 |
| `reread` | 1〜5 | 再読価値 |
| `year` | YYYY | 読了年 |
| `view` | `grid` / `table` / `board` / `matrix` | 表示モード |

### データ要件

- `getBooks()`
- `getTopics()`

### 使用コンポーネント

- `LibraryExplorer` React Island
- `SearchBar`
- `FilterPanel`
- `ViewSwitcher`
- `BookGrid`
- `BookTable`
- `BookBoard`
- `BookMatrix`
- `BookCard`
- `EmptyState`

### 実装メモ

- 検索対象は書名、著者、トピック、要約、読書目的
- 初期MVPではクライアント側検索でよい
- データ件数が増えたらmicroCMSクエリや検索サービス導入を検討する
- `LibraryExplorer` に一覧データを渡し、内部で検索・フィルター・表示切り替えを行う

---

## 6. `/books/[slug]/` 技術書詳細

### 役割

最も重要な画面です。  
本のレビューではなく、実装や知識に戻れるページにします。

### 表示情報

- 書名
- 副題
- 表紙
- 著者
- 出版社
- 出版日
- 読書状態
- 所有形式
- 読了日
- 関連技術トピック
- シグナル欄
  - 難易度
  - 実務適用度
  - 再読価値
  - 概念密度
  - 実装接続度
- なぜ読んだか
- 重要な気づき
- 実装メモ
- 推し章
- 関連トピック
- 関連する技術書
- 関連メモ

### 静的生成

```ts
export async function getStaticPaths() {
  const books = await getBooks();

  return books.map((book) => ({
    params: { slug: book.slug },
    props: { book },
  }));
}
```

実際の実装では詳細取得が必要な場合、`getBookBySlug(slug)` を使ってもよいです。

### データ要件

- `getBooks()` for `getStaticPaths`
- `getBookBySlug(slug)`
- 必要に応じて関連書籍の逆引き

### 使用コンポーネント

- `DetailLayout`
- `BookSignalPanel`
- `ReadingStatusBadge`
- `TopicChip`
- `SignalMeter`
- `NoteCard`
- `BookCard`
- `EmptyState`

### 実装メモ

- `review` をレビュー欄として前面に出しすぎない
- `readingPurpose`, `appliedMemo`, `favoriteChapter`, `relatedNotes` を重視する
- 関連トピックへのリンクを必ず表示する
- 画像がない場合の表紙プレースホルダーを用意する

### SEO

- title: `{book.title} | Stack Library`
- description: `summary` があれば使用。なければ `{book.title} に関する読書メモ、技術トピック、実装への気づき。`

---

## 7. `/topics/` 技術トピック一覧

### 役割

技術トピックを一覧し、本ではなく知識軸から探索できるページです。

### 表示要素

- ページタイトル
- トピック一覧
- 各トピックの説明
- 学習段階
- 関連書籍数
- 関連メモ数

### データ要件

- `getTopics()`
- 必要に応じて `getBooks()` と `getNotes()` で件数を逆引き

### 使用コンポーネント

- `TopicCard`
- `TopicChip`
- `SectionHeader`
- `EmptyState`

### 実装メモ

- トピックはタグ一覧のように軽く扱わない
- 各トピックを知識ノードとして見せる
- 学習段階や次に考える問いを表示できるとよい

---

## 8. `/topics/[slug]/` 技術トピック詳細

### 役割

特定の技術トピックを中心に、関連書籍、関連メモ、学習ルート、次の問いを表示します。

### 表示情報

- トピック名
- トピック概要
- 学習段階
- 親トピック
- 関連トピック
- 関連する技術書
- 関連メモ
- 読む順番
- 実務で使った例
- 次に考える問い

### 静的生成

```ts
export async function getStaticPaths() {
  const topics = await getTopics();

  return topics.map((topic) => ({
    params: { slug: topic.slug },
    props: { topic },
  }));
}
```

### データ要件

- `getTopics()` for `getStaticPaths`
- `getTopicBySlug(slug)`
- `getBooks()` for reverse lookup if needed
- `getNotes()` for reverse lookup if needed
- `getCollections()` for related routes if needed

### 使用コンポーネント

- `DetailLayout`
- `TopicChip`
- `BookCard`
- `NoteCard`
- `CollectionCard`
- `EmptyState`

### 実装メモ

- `relatedBooks` が未登録なら books の `topics` から逆引きする
- `relatedNotes` が未登録なら notes の `topics` から逆引きする
- トピック詳細から知識マップへの導線を置くとよい

### SEO

- title: `{topic.name} | 技術トピック | Stack Library`
- description: `{topic.name} に関連する技術書、読書メモ、学習ルート。`

---

## 9. `/notes/` 読書メモ一覧

### 役割

読書メモ、実装メモ、疑問、引用、気づきを一覧します。  
技術ブログ未満、個人的な知識片以上の情報として扱います。

### 表示要素

- ページタイトル
- メモ種別フィルター
- 最近のメモ
- 関連書籍
- 関連トピック
- 公開可能かどうかの表示

### フィルター候補

- noteType
- topic
- book
- isPublishable

### データ要件

- `getNotes()`
- `getBooks()`
- `getTopics()`

### 使用コンポーネント

- `NoteCard`
- `TopicChip`
- `SearchBar` optional
- `FilterPanel` optional
- `EmptyState`

### 実装メモ

- MVPではシンプルな一覧でよい
- noteTypeのラベルを必ず表示する
- 実装メモは目立つ導線にしてよい

---

## 10. `/notes/[slug]/` 読書メモ詳細

### 役割

1つの読書メモを読み、関連書籍・関連トピックへ戻れるページです。

### 表示情報

- メモタイトル
- メモ種別
- 作成日
- 確信度
- 本文
- 関連書籍
- 関連トピック
- 実装ヒント
- 次のアクション

### 静的生成

```ts
export async function getStaticPaths() {
  const notes = await getNotes();

  return notes.map((note) => ({
    params: { slug: note.slug },
    props: { note },
  }));
}
```

### データ要件

- `getNotes()` for `getStaticPaths`
- `getNoteBySlug(slug)`

### 使用コンポーネント

- `DetailLayout`
- `TopicChip`
- `BookCard`
- `SignalMeter`
- `EmptyState`

### 実装メモ

- メモ本文の可読性を最優先する
- 長文は読みやすい幅に制限する
- 関連書籍・関連トピックへの導線を必ず置く

---

## 11. `/collections/` 学習ルート一覧

### 役割

単なる本棚ではなく、目的別の読書ルートを表示します。

### 表示要素

- ページタイトル
- 学習ルート一覧
- 目的
- 難易度
- 進捗
- 関連トピック
- 次に読む本

### データ要件

- `getCollections()`

### 使用コンポーネント

- `CollectionCard`
- `TopicChip`
- `SignalMeter`
- `EmptyState`

### 実装メモ

- ルート名よりも「目的」を重視して見せる
- 進捗は色だけでなくテキストで表示する
- 次に読む本への導線を置く

---

## 12. `/collections/[slug]/` 学習ルート詳細

### 役割

目的別の読書順序を表示し、学習の流れとして本とトピックを辿れるページです。

### 表示情報

- ルート名
- 目的
- 説明
- 難易度
- 進捗
- 関連トピック
- 読む順番
- 含まれる書籍
- 次に読む本
- 関連メモ

### 静的生成

```ts
export async function getStaticPaths() {
  const collections = await getCollections();

  return collections.map((collection) => ({
    params: { slug: collection.slug },
    props: { collection },
  }));
}
```

### データ要件

- `getCollections()` for `getStaticPaths`
- `getCollectionBySlug(slug)`

### 使用コンポーネント

- `DetailLayout`
- `CollectionCard`
- `BookCard`
- `TopicChip`
- `NoteCard`
- `SignalMeter`
- `EmptyState`

### 実装メモ

- `books` の配列順を読む順番として表示してよい
- `recommendedOrder` がある場合は補足として表示する
- 本が未登録でも目的とトピックが表示されるようにする

---

## 13. `/map/` 知識マップ

### 役割

差別化の中心です。  
本、技術トピック、読書メモ、学習ルートがノードとしてつながる画面です。

### MVP表示要素

- 知識マップの説明
- ノード表示
- ノード種別フィルター
- 選択ノードの詳細パネル
- 関連リンク

### ノード種別

- `book`
- `topic`
- `note`
- `collection`

### エッジ例

- 技術書 → 技術トピック
- 技術書 → 読書メモ
- 技術トピック → 関連トピック
- 学習ルート → 技術書
- 学習ルート → 技術トピック

### データ要件

- `getBooks()`
- `getTopics()`
- `getNotes()`
- `getCollections()`

### 使用コンポーネント

- `KnowledgeMap` React Island
- `KnowledgeNode`
- `DetailSidePanel`
- `TopicChip`
- `ReadingStatusBadge`
- `EmptyState`

### 実装メモ

- MVPでは高度なグラフ操作は不要
- 静的なノード配置または簡易レイアウトでよい
- 派手なアニメーションは避ける
- ノード選択で詳細パネルを表示する
- キーボード操作できるノードにする

---

## 14. ナビゲーション設計

### グローバルナビ

```txt
Stack Library
  ├─ ライブラリ
  ├─ 技術トピック
  ├─ 読書メモ
  ├─ 学習ルート
  └─ 知識マップ
```

### 実装メモ

- 現在ページを視覚的に示す
- `aria-current="page"` を使う
- モバイルではナビを折りたたんでもよい
- プロダクト名は `/` へのリンクにする

---

## 15. パンくず

詳細ページではパンくずを表示してよいです。

例:

```txt
ライブラリ / Webアプリケーションアクセシビリティ
技術トピック / アクセシビリティ
読書メモ / フォームエラーは色だけで伝えない
学習ルート / アクセシビリティテスト入門
```

### アクセシビリティ

```html
<nav aria-label="パンくず">
  <ol>
    <li><a href="/library/">ライブラリ</a></li>
    <li aria-current="page">Webアプリケーションアクセシビリティ</li>
  </ol>
</nav>
```

---

## 16. SEO / メタ情報

### BaseLayout props

`BaseLayout.astro` は以下のようなpropsを受け取る想定です。

```ts
type Props = {
  title: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
};
```

### メタ情報ルール

- 各詳細ページはコンテンツ名をtitleに入れる
- descriptionはsummaryまたはdescriptionを優先する
- 未公開・draft相当のページは生成しないか `noindex` にする
- OGP画像はMVPでは共通画像でよい

---

## 17. 404 / 空状態

### 404

Astroの404ページはMVP後でもよいですが、詳細ページの取得失敗時は安全に扱います。

```ts
if (!book) {
  return Astro.redirect('/library/');
}
```

または明示的に404を返せる実装にしてください。

### 空状態

以下のページで空状態を用意します。

- `/library/`
- `/topics/`
- `/notes/`
- `/collections/`
- `/map/`
- 詳細ページ内の関連コンテンツ欄

---

## 18. 実装順序

Codex は以下の順でページを実装してください。

1. 共通レイアウト
2. グローバルナビ
3. `/library/`
4. `/books/[slug]/`
5. `/topics/`
6. `/topics/[slug]/`
7. `/notes/`
8. `/notes/[slug]/`
9. `/collections/`
10. `/collections/[slug]/`
11. `/`
12. `/map/`

理由:

- ライブラリと書籍詳細が中核
- トピック詳細でプロダクトの差別化が出る
- 読書メモと学習ルートで知識地図化できる
- 概要ページは各データが揃ってから作ると品質が上がる
- 知識マップは初期MVPの最後に統合するのが安全

---

## 19. 実装チェックリスト

- [ ] すべてのMVPルートが存在する
- [ ] `getStaticPaths` が詳細ページで使われている
- [ ] slugベースでURLが生成される
- [ ] 一覧から詳細へ遷移できる
- [ ] 詳細から関連トピックへ遷移できる
- [ ] トピック詳細から関連書籍・関連メモへ遷移できる
- [ ] 学習ルートから書籍・トピックへ遷移できる
- [ ] グローバルナビに `aria-current` がある
- [ ] 空状態がある
- [ ] 検索・フィルターの初期状態がURLまたはUIで分かる
- [ ] ページtitleとdescriptionが設定されている
- [ ] 日本語URLではなく英語slugになっている
