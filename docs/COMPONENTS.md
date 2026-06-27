# COMPONENTS.md

技術書ライブラリ / Stack Library の UI コンポーネント設計です。  
Codex はこの設計に従って、AstroコンポーネントとReact Islandを分担して実装してください。

---

## 1. 基本方針

このプロジェクトでは、静的に表示できるUIは Astro コンポーネント、状態を持つ探索UIは React Island として実装します。

### Astroを優先するもの

- レイアウト
- 見出し
- 技術書カード
- トピックチップ
- 読書状態バッジ
- シグナルメーター
- 読書メモカード
- 学習ルートカード
- 詳細ページの本文構造
- 空状態
- 読み込み状態

### React Islandにするもの

- 検索
- フィルター
- 表示切り替え
- テーブルビュー
- ボードビュー
- マトリクスビュー
- 知識マップ
- ノード詳細サイドパネル

### 実装原則

- UIは日本語ファースト
- 状態は色だけで表現しない
- クリック可能要素は `<a>` または `<button>` で実装する
- propsは型定義を使い回す
- class名は意味ベースにする
- コンポーネント内でmicroCMS取得を直接行わない
- データ取得はページまたは `src/lib/queries/` に寄せる

---

## 2. 推奨ディレクトリ構成

```txt
src/components/
  book/
    BookCard.astro
    BookSignalPanel.astro
    ReadingStatusBadge.astro
  topic/
    TopicCard.astro
    TopicChip.astro
  note/
    NoteCard.astro
  collection/
    CollectionCard.astro
  library/
    LibraryExplorer.tsx
    SearchBar.tsx
    FilterPanel.tsx
    ViewSwitcher.tsx
    BookGrid.astro
    BookTable.tsx
    BookBoard.tsx
    BookMatrix.tsx
  knowledge-map/
    KnowledgeMap.tsx
    KnowledgeNode.tsx
    DetailSidePanel.tsx
  layout/
    SiteHeader.astro
    SiteFooter.astro
    PageShell.astro
    SectionHeader.astro
  ui/
    Badge.astro
    SignalMeter.astro
    EmptyState.astro
    LoadingState.astro
```

---

## 3. 共通型

`src/types/content.ts` の型をpropsに使います。  
コンポーネント固有のpropsはコンポーネント内、または `src/types/components.ts` を作って定義してもよいです。

```ts
import type {
  Book,
  Topic,
  Note,
  Collection,
  ReadingStatus,
  SignalValue,
} from '@/types/content';
```

相対パス運用でもよいですが、`tsconfig.json` で `@/*` alias を設定できるなら推奨します。

---

## 4. Layout components

### `BaseLayout.astro`

#### 役割

全ページ共通のHTML構造、メタ情報、グローバルCSS読み込みを担当します。

#### Props

```ts
type Props = {
  title: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
};
```

#### 要件

- `<html lang="ja">` を設定する
- `<title>` を設定する
- description meta を設定する
- viewport meta を設定する
- OGPは最低限対応する
- `noindex` がtrueなら robots meta を出す
- `SiteHeader` と `SiteFooter` を配置する
- mainランドマークを持つ

#### アクセシビリティ

- `main` に `id="main-content"` を付与してもよい
- スキップリンクを設置できるとよい

---

### `AppShell.astro`

#### 役割

Figma叩き台のデスクトップ構造を実装するアプリシェルです。左サイドバー、トップバー、背景グリッド、メインランドマークをまとめます。

#### Props

```ts
type Props = {
  currentPath?: string;
  showTopBar?: boolean;
};
```

#### 要件

- デスクトップでは `240px` の固定サイドバーと、残り幅のメイン領域に分ける
- メイン領域上部に `72px` のトップバーを置く
- `/library/` のように画面内でトップバー位置を制御する場合は `showTopBar={false}` を使い、ページ側で `TopBar` を配置する
- トップバーの検索欄には `label` を持たせ、placeholderだけに依存しない
- 背景グリッドは装飾として扱い、スクリーンリーダーに余計な情報を渡さない
- Figma準拠の専用作業面では背景グリッドを抑制してよい
- モバイルではサイドバーを上部ナビまたは簡略ナビへ畳む
- ページ遷移リンクには `<a>` と `aria-current="page"` を使う

---

### `SiteSidebar.astro`

#### 役割

Figmaの `sidebar` に対応するグローバルナビです。

#### 要件

- ロゴは `/` へのリンクにする
- ナビ項目は `概要`, `ライブラリ`, `技術トピック`, `読書メモ`, `知識マップ`, `学習ルート`
- アイコンは装飾であり、テキストラベルを必ず表示する
- アクティブ項目は色だけでなく `aria-current="page"` を付与する
- MVPでは `設定` とユーザープロフィール表示は実装しない、または非操作の補助表示に留める

---

### `TopBar.astro`

#### 役割

Figmaの `top-bar` に対応する検索・補助アクション領域です。

#### 要件

- 検索欄は将来のライブラリ検索へ接続できる見た目にする
- 概要ページでは静的な検索導線でもよい
- 通知やユーザーアイコンはMVPでは装飾または非表示にしてよい
- クリック可能にする場合は `<button>` と明確なラベルを使う

---

### `PageShell.astro`

#### 役割

ページの余白、最大幅、背景演出を統一します。

#### Props

```ts
type Props = {
  variant?: 'default' | 'wide' | 'reading';
};
```

#### variant

| variant | 用途 |
|---|---|
| `default` | 通常ページ |
| `wide` | ライブラリ、知識マップ |
| `reading` | メモ詳細、長文詳細 |

---

### `SectionHeader.astro`

#### 役割

セクションの見出し、説明、補助リンクを表示します。

#### Props

```ts
type Props = {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  eyebrow?: string;
};
```

#### 要件

- `title` はページ構造に応じて `h2` またはslotで調整できるとよい
- 補助リンクは `<a>` として実装する

---

## 5. Book components

### `BookCard.astro`

#### 役割

技術書を一覧内で表示する中核カードです。  
EC商品カードではなく、収蔵品ラベル / 技術標本ラベルとして見せます。

#### Props

```ts
type Props = {
  book: Book;
  variant?: 'default' | 'compact' | 'featured' | 'specimen';
  showProgress?: boolean;
  showTopics?: boolean;
};
```

#### 表示要素

- 表紙またはプレースホルダー
- 書名
- 副題 optional
- 著者
- 読書状態
- 所有形式 optional
- 技術トピック
- 難易度
- 実務適用度
- 再読価値
- 進捗率 optional

#### 状態

- 表紙あり
- 表紙なし
- 著者なし
- トピックなし
- シグナル未設定
- 読書状態ごとの表示
- Figma準拠の `specimen` 表示

#### アクセシビリティ

- カード全体をリンクにする場合、内部に重複リンクを置きすぎない
- 表紙画像のaltは `「{title}」の表紙` または空文字を文脈で判断する
- 読書状態はテキストで表示する
- 進捗バーを表示する場合は、視覚バーだけでなく `65%` のようなテキストを併記する

#### 実装メモ

- リンク先は `/books/${book.slug}/`
- トピックチップを表示する場合はチップのリンクとカードリンクの入れ子に注意する
- 入れ子リンクを避けるため、カード全体リンクではなくタイトルリンク方式が安全
- Figma概要ページの読書中カードでは `variant: 'specimen'` 相当の硬質なカードを使う
- Figmaライブラリページでは `variant="specimen"` を使い、表紙領域、状態バッジ、トピックチップ、`Lv.`, `Imp.`, `Ret.` のミニシグナルを固定密度で表示する
- ライブラリグリッド内の `specimen` カードは幅約 `270px`、高さ約 `364px`、内側余白 `24px`、表紙領域 `160px` を目安にする

---

### `BookSignalPanel.astro`

#### 役割

技術書詳細ページで、技術書向け評価シグナルをまとめて表示します。

#### Props

```ts
type Props = {
  difficulty?: SignalValue;
  practicality?: SignalValue;
  rereadValue?: SignalValue;
  conceptDensity?: SignalValue;
  implementationValue?: SignalValue;
};
```

#### 表示するシグナル

- 難易度
- 実務適用度
- 再読価値
- 概念密度
- 実装接続度

#### Figma実装メモ

- `03_書籍詳細ページ` の `ANALYTICAL SIGNALS` パネルに対応する
- パネル背景は `--color-bg-panel`、境界線は `--border-hairline`、角丸は `--radius-xs`
- 各行はシグナル名、テキスト値、メーターの3要素で構成する
- 難易度は `中級` のような段階ラベル、その他は `高` / `中` などの読みやすいラベルを併記する

#### 使用コンポーネント

- `SignalMeter`

#### アクセシビリティ

- 各シグナル名と数値を必ず表示する
- メーターのみで値を伝えない

---

### `ReadingStatusBadge.astro`

#### 役割

読書状態を表示するバッジです。

#### Props

```ts
type Props = {
  status: ReadingStatus;
  size?: 'sm' | 'md';
  label?: string;
};
```

#### 表示ラベル

| status | 表示 |
|---|---|
| `unread` | 未読 |
| `reading` | 読書中 |
| `read` | 読了 |
| `paused` | 中断 |
| `reread` | 再読中 |

#### アクセシビリティ

- ラベルテキストを必ず表示する
- 文脈に応じて `label` で表示名を上書きしてよい。ただし意味は `status` と矛盾させない
- 色だけで状態を表現しない
- 装飾アイコンを使う場合は `aria-hidden="true"`

---

## 6. Topic components

### `TopicChip.astro`

#### 役割

技術トピックを小さなチップとして表示します。  
タグではなく知識ノードへの導線として扱います。

#### Props

```ts
type Props = {
  topic: Topic;
  href?: string;
  size?: 'sm' | 'md';
  interactive?: boolean;
  label?: string;
};
```

#### 要件

- `href` がある場合は `<a>`
- `interactive` かつ `href` がない場合は `<button>` を検討
- 表示ラベルは原則 `topic.name`
- ライブラリグリッドのように情報密度を優先する場所では、`label` で `Accessibility` や `CSS設計` など短い表示名に上書きしてよい
- `topic.colorToken` があれば補助的に使う

#### アクセシビリティ

- 色だけでトピック種別を表現しない
- 小さすぎるタップ領域を避ける

---

### `TopicCard.astro`

#### 役割

技術トピック一覧や概要ページで、トピックを知識ノードとして表示します。

#### Props

```ts
type Props = {
  topic: Topic;
  relatedBookCount?: number;
  relatedNoteCount?: number;
  variant?: 'default' | 'compact';
};
```

#### 表示要素

- トピック名
- 説明
- 学習段階
- 関連書籍数
- 関連メモ数
- 次に考える問い optional

#### リンク

- `/topics/${topic.slug}/`

#### 実装メモ

- トピックをタグ一覧のように軽く見せない
- 説明がない場合も空欄にせず、メタ情報で構造を保つ

---

## 7. Note components

### `NoteCard.astro`

#### 役割

読書メモ、実装メモ、疑問、引用、気づきを一覧表示します。

#### Props

```ts
type Props = {
  note: Note;
  variant?: 'default' | 'compact' | 'featured';
  showBook?: boolean;
  showTopics?: boolean;
};
```

#### 表示要素

- メモタイトル
- noteTypeラベル
- 作成日
- 関連書籍
- 関連トピック
- 本文抜粋
- 実装ヒント optional

#### noteType表示

- 引用
- 気づき
- 実装メモ
- 疑問
- 要約
- 比較
- TODO

#### アクセシビリティ

- noteTypeを色だけで表示しない
- 本文抜粋は長すぎない
- 関連リンクがクリック可能であることが分かる

#### 実装メモ

- リンク先は `/notes/${note.slug}/`
- `implementation` タイプは少し強調してよい
- `question` タイプは問いとして見えるようにする

---

## 8. Collection components

### `CollectionCard.astro`

#### 役割

学習ルートを表示します。  
単なる本棚ではなく、目的別の読書ルートとして見せます。

#### Props

```ts
type Props = {
  collection: Collection;
  variant?: 'default' | 'compact' | 'featured';
};
```

#### 表示要素

- ルート名
- 目的
- 難易度
- 進捗
- 関連トピック
- 含まれる本の数
- 次に読む本

#### リンク

- `/collections/${collection.slug}/`

#### アクセシビリティ

- 進捗を色だけで表示しない
- 目的文が長い場合は適切に省略し、詳細ページで全文を読めるようにする

---

## 9. UI primitives

### `MetricGrid.astro`

#### 役割

Figmaの `Signals` に対応する数値メトリクス表示です。

#### Props

```ts
type MetricItem = {
  label: string;
  value: string | number;
};

type Props = {
  title?: string;
  items: MetricItem[];
};
```

#### 要件

- 数値とラベルを必ずテキストで表示する
- 視覚的には細い罫線で列を分ける
- 数値には display serif を使ってよい
- 小画面では横スクロールまたは2列グリッドに落とす

---

### `Badge.astro`

#### 役割

汎用バッジです。状態や種別を表示します。

#### Props

```ts
type Props = {
  label: string;
  tone?: 'neutral' | 'cyan' | 'violet' | 'lime' | 'amber' | 'danger';
  size?: 'sm' | 'md';
};
```

#### 要件

- ラベル必須
- toneは補助
- 視覚的に小さすぎない

---

### `SignalMeter.astro`

#### 役割

1〜5の指標を表示します。

#### Props

```ts
type Props = {
  label: string;
  value?: SignalValue;
  max?: 5;
  helpText?: string;
  size?: 'sm' | 'md';
};
```

#### 表示例

```txt
実務適用度 4/5
```

#### 状態

- valueあり
- valueなし: `未設定`

#### アクセシビリティ

- `label` と `value` をテキストで表示する
- メーター部分は装飾なら `aria-hidden="true"`
- `role="meter"` を使う場合は `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` を適切に設定する

---

### `EmptyState.astro`

#### 役割

データがない状態を表示します。

#### Props

```ts
type Props = {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};
```

#### 使用箇所

- 一覧ページ
- 詳細ページの関連コンテンツ欄
- 検索結果なし
- 知識マップのノードなし

#### 文言方針

- ユーザーを責めない
- 次に何を追加するとよいかを示す
- 静かなトーンにする

---

### `LoadingState.astro`

#### 役割

読み込み中表示です。  
Astroの静的ページでは使用頻度は低いですが、React Island内で使用します。

#### Props

```ts
type Props = {
  label?: string;
};
```

#### アクセシビリティ

- `aria-live="polite"` を検討する
- アニメーションがある場合は `prefers-reduced-motion` を尊重する

---

## 10. Library Explorer components

### `LibraryExplorer.tsx`

#### 役割

`/library/` の検索、フィルター、表示切り替えを統合するReact Islandです。

現行MVPの `/library/` は静的Astroページ内の軽量スクリプトで、読書状態・難易度・レベル・実務適用度・再読価値の絞り込み、件数更新、`grid` / `list` 表示切り替えを実装しています。検索、URLクエリ同期、技術トピックを含む複合フィルターが必要になった段階で `LibraryExplorer.tsx` へ切り出します。

#### Props

```ts
type LibraryExplorerProps = {
  books: Book[];
  topics: Topic[];
  initialView?: LibraryView;
};

export type LibraryView = 'grid' | 'table' | 'board' | 'matrix';
```

#### 状態

```ts
type LibraryFilters = {
  query: string;
  status?: ReadingStatus;
  topicSlug?: string;
  difficulty?: 'intro' | 'intermediate' | 'advanced';
  minDifficulty?: SignalValue;
  practicality?: SignalValue;
  rereadValue?: SignalValue;
  year?: string;
};
```

#### 要件

- 検索語で書名、著者、トピック、要約、読書目的を検索する
- フィルター条件を組み合わせて絞り込む
- Figma `64:2` に合わせ、初期表示はフィルターを閉じた状態にする
- フィルターボタン押下時は Figma `70:2` に合わせ、ツールバー下へ横長の `instrument-strip` を表示する
- `instrument-strip` は Figma `70:2` に合わせて `156px` 高、`44px` ヘッダー行、`81px` セグメント領域を基準にし、読書状態 `260px`、その他 `220px` の横長セグメントで扱う。フィルターピルは折り返さず、内容幅が表示領域を超える場合だけ、フィルターUIのinner-widthに収まる下端独立のスクロールバーを表示し、トラックとサムは同じ `4px` 厚で重ね、サムのドラッグで横スクロールできるようにする
- 所有形式では絞り込まず、難易度ピルと `Lv.1` から `Lv.5` のレベルレンジを並べて扱う
- 開閉ボタンは `aria-expanded` と対象パネルの表示状態を同期する
- 閉じ状態では選択中条件をチップとして表示して個別解除できるようにする
- 表示モードを切り替える
- 結果件数を表示する
- 条件解除ボタンを用意する
- 検索結果なしの空状態を表示する

#### URLクエリ

MVPでは必須ではありませんが、可能なら以下を同期します。

- `q`
- `status`
- `topic`
- `difficulty`
- `minDifficulty`
- `practicality`
- `reread`
- `year`
- `view`

#### アクセシビリティ

- 検索欄にlabelを付ける
- フィルターはフォームとして意味が通るようにする
- 表示切り替えは `aria-pressed` を使う
- 結果件数をテキストで表示する

---

### `SearchBar.tsx`

#### 役割

ライブラリ検索用入力コンポーネントです。

#### Props

```ts
type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
};
```

#### 要件

- `label` を持つ
- placeholderだけに依存しない
- クリアボタンを付けてもよい
- Enter前提ではなく入力に応じて絞り込んでよい

---

### `FilterPanel.tsx`

#### 役割

読書状態、トピック、シグナル値などでフィルターします。

#### Props

```ts
type FilterPanelProps = {
  filters: LibraryFilters;
  topics: Topic[];
  onChange: (filters: LibraryFilters) => void;
  onReset: () => void;
};
```

#### 表示するフィルター

- 読書状態
- 技術トピック
- 難易度
- レベル（難易度レンジ）
- 実務適用度
- 再読価値
- 読了年

#### 要件

- 各フォーム要素にラベルを付ける
- `すべて` または未選択状態を用意する
- 条件解除を簡単にする
- モバイルでは折りたたみを検討する

---

### `ViewSwitcher.tsx`

#### 役割

Grid / Table / Board / Matrix の表示モードを切り替えます。

#### Props

```ts
type ViewSwitcherProps = {
  value: LibraryView;
  onChange: (view: LibraryView) => void;
};
```

#### 要件

- 現在の表示モードが分かる
- アイコンだけにしない
- `aria-pressed` を使う

#### 表示ラベル

| view | 表示 |
|---|---|
| `grid` | グリッド |
| `table` | テーブル |
| `board` | ボード |
| `matrix` | マトリクス |

---

### `BookGrid.astro`

#### 役割

技術書カードをグリッド表示します。

#### Props

```ts
type Props = {
  books: Book[];
};
```

#### 要件

- `BookCard` を使用する
- 0件なら `EmptyState`
- レスポンシブ対応

React Island内で使いにくい場合は `BookGrid.tsx` として実装してもよいです。  
ただし、静的表示だけなら Astro を優先してください。

---

### `BookTable.tsx`

#### 役割

技術書を表形式で表示します。

#### Props

```ts
type BookTableProps = {
  books: Book[];
};
```

#### 列候補

- 書名
- 著者
- 読書状態
- トピック
- 難易度
- 実務適用度
- 再読価値
- 読了日

#### アクセシビリティ

- `<table>` を使う
- `<th scope="col">` を使う
- 横スクロール時も読めるようにする

---

### `BookBoard.tsx`

#### 役割

読書状態別にボード表示します。

#### Props

```ts
type BookBoardProps = {
  books: Book[];
};
```

#### カラム

- 未読
- 読書中
- 読了
- 中断
- 再読中

#### MVP方針

- ドラッグ&ドロップは不要
- 状態別に並べるだけでよい

---

### `BookMatrix.tsx`

#### 役割

難易度 × 実務適用度など、技術書向け指標でマトリクス表示します。

#### Props

```ts
type BookMatrixProps = {
  books: Book[];
  xAxis?: 'practicality' | 'rereadValue' | 'implementationValue';
  yAxis?: 'difficulty' | 'conceptDensity';
};
```

#### MVP方針

- 初期値は `xAxis: practicality`, `yAxis: difficulty`
- 値がない本は `未設定` グループに置く
- 複雑な散布図ライブラリは不要
- CSS Gridで簡易実装してよい

#### アクセシビリティ

- 視覚的配置だけで意味を伝えない
- 本ごとの指標値をテキストで読めるようにする

---

## 11. Knowledge Map components

### `KnowledgeMap.tsx`

#### 役割

本、技術トピック、読書メモ、学習ルートをノードとエッジとして表示します。

#### Props

```ts
type KnowledgeMapProps = {
  books: Book[];
  topics: Topic[];
  notes: Note[];
  collections: Collection[];
};
```

#### 内部型

```ts
type KnowledgeNodeType = 'book' | 'topic' | 'note' | 'collection';

type KnowledgeNodeData = {
  id: string;
  type: KnowledgeNodeType;
  label: string;
  href: string;
  summary?: string;
};

type KnowledgeEdgeData = {
  id: string;
  source: string;
  target: string;
  label?: string;
};
```

#### MVP要件

- ノード一覧を表示する
- 関連線または関連リストを表示する
- ノード種別でフィルターできる
- ノード選択で詳細パネルを表示する
- 詳細ページへのリンクを表示する

#### 実装メモ

- 初期版ではSVG、CSS、またはHTMLベースでよい
- 大規模なグラフライブラリ導入は不要
- 派手なアニメーションは避ける
- キーボードでノードを選択できるようにする

---

### `KnowledgeNode.tsx`

#### 役割

知識マップ上の1ノードを表示します。

#### Props

```ts
type KnowledgeNodeProps = {
  node: KnowledgeNodeData;
  selected?: boolean;
  onSelect: (nodeId: string) => void;
};
```

#### 要件

- ノード種別をテキストまたはラベルで示す
- 選択状態が分かる
- クリックとキーボード操作に対応する

#### アクセシビリティ

- `<button>` として実装するのが安全
- `aria-pressed` または `aria-current` を状況に応じて使う
- ノード種別とラベルが読み上げられるようにする

---

### `DetailSidePanel.tsx`

#### 役割

知識マップで選択したノードの詳細を表示します。

#### Props

```ts
type DetailSidePanelProps = {
  node?: KnowledgeNodeData;
  relatedNodes?: KnowledgeNodeData[];
  onClose?: () => void;
};
```

#### 表示要素

- ノード名
- ノード種別
- 概要
- 関連ノード
- 詳細ページリンク
- 閉じるボタン optional

#### アクセシビリティ

- サイドパネルをモーダルにするならフォーカストラップが必要
- MVPでは常設パネルにすると実装が安全
- 閉じるボタンには明確なラベルを付ける

---

## 12. コンポーネント間の関係

```txt
/library/
  index.astro
    ├─ AppShell(showTopBar=false)
    ├─ TopBar
    ├─ FilterPanel相当の instrument-strip
    ├─ FilterPanel開閉ボタン
    ├─ ActiveFilterChip相当の選択中条件
    ├─ ViewSwitcher相当のボタン
    └─ BookCard(variant="specimen")

/books/[slug]/
  DetailLayout
    ├─ ReadingStatusBadge
    ├─ BookSignalPanel
    │   └─ SignalMeter
    ├─ TopicChip
    ├─ NoteCard
    └─ BookCard

/topics/[slug]/
  DetailLayout
    ├─ TopicChip
    ├─ BookCard
    ├─ NoteCard
    └─ CollectionCard

/map/
  KnowledgeMap
    ├─ KnowledgeNode
    └─ DetailSidePanel
```

---

## 13. Styling conventions

### class名

意味ベースのclass名を使います。

```css
.book-card {}
.book-card__cover {}
.book-card__body {}
.book-card__title {}
.book-card__meta {}
.book-card__signals {}
```

またはCSS Modulesを使う場合:

```tsx
import styles from './BookCard.module.css';
```

どちらでもよいですが、プロジェクト内で統一してください。

### CSS変数

`DESIGN.md` のトークンを使ってください。

```css
.card {
  background: var(--color-bg-panel);
  border: var(--border-hairline);
  border-radius: var(--radius-lg);
}
```

---

## 14. Accessibility checklist by component

### Cards

- [ ] タイトルリンクがある
- [ ] カード内に入れ子リンクを作っていない
- [ ] 画像altが適切
- [ ] 状態がテキストで読める

### Badges

- [ ] ラベルがある
- [ ] 色だけで意味を伝えていない

### Filters

- [ ] 各入力にlabelがある
- [ ] リセット操作がある
- [ ] キーボード操作できる

### ViewSwitcher

- [ ] 現在の表示モードが分かる
- [ ] `aria-pressed` がある
- [ ] アイコンだけではない

### KnowledgeMap

- [ ] ノードがキーボードで選択できる
- [ ] ノード種別がテキストで分かる
- [ ] 選択状態が視覚と意味の両方で分かる
- [ ] 詳細ページへのリンクがある

---

## 15. 実装順序

コンポーネントは以下の順で実装してください。

1. `BaseLayout.astro`
2. `PageShell.astro`
3. `SectionHeader.astro`
4. `Badge.astro`
5. `SignalMeter.astro`
6. `ReadingStatusBadge.astro`
7. `TopicChip.astro`
8. `BookCard.astro`
9. `BookSignalPanel.astro`
10. `TopicCard.astro`
11. `NoteCard.astro`
12. `CollectionCard.astro`
13. `EmptyState.astro`
14. `SearchBar.tsx`
15. `FilterPanel.tsx`
16. `ViewSwitcher.tsx`
17. `LibraryExplorer.tsx`
18. `BookTable.tsx`
19. `BookBoard.tsx`
20. `BookMatrix.tsx`
21. `KnowledgeNode.tsx`
22. `DetailSidePanel.tsx`
23. `KnowledgeMap.tsx`

---

## 16. Acceptance criteria

コンポーネント実装が完了したと判断する条件です。

- [ ] `BookCard` が表紙なしでも破綻しない
- [ ] `BookCard` が読書状態、トピック、シグナルを表示できる
- [ ] `SignalMeter` が未設定値を安全に表示できる
- [ ] `ReadingStatusBadge` がテキストラベルを持つ
- [ ] `TopicChip` からトピック詳細へ遷移できる
- [ ] `NoteCard` がnoteTypeを表示できる
- [ ] `CollectionCard` が目的と進捗を表示できる
- [ ] `LibraryExplorer` で検索・フィルター・表示切り替えができる
- [ ] `ViewSwitcher` が現在状態を支援技術にも伝えられる
- [ ] `KnowledgeMap` のノードが選択できる
- [ ] `DetailSidePanel` から詳細ページへ移動できる
- [ ] すべてのインタラクティブ要素がキーボードで操作できる
- [ ] クリック可能なdivがない
- [ ] 色だけで状態を伝えていない
- [ ] 日本語UIとして余白・行間が破綻していない
