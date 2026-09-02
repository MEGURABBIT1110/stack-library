# Coding Guideline

Stack Libraryの実装で使うclass名、CSS、状態表現の規約です。

## 目的

本書は、画面やコンポーネントを追加するときの命名判断を揃え、CSSの責務とUIの意味を追いやすくするためのものです。

本書の準拠レベルは次の2段階です。

| レベル | 意味 |
|---|---|
| 必須 | 新規実装・変更時に守るルール |
| 推奨 | 既存構造や実装上の制約がない場合に採用するルール |

### 他の文書との関係

- [AGENTS.md](../AGENTS.md): 作業契約、MVPの制約、セキュリティ、所有範囲
- [Development](./DEVELOPMENT.md): Issue、ブランチ、PR、検証の進め方
- [Architecture](./ARCHITECTURE.md): 技術構成、責務分離、コンポーネントの境界
- 本書: class名、CSS、状態表現など、コードをどう書くか

他の文書と矛盾する場合は、上記のプロジェクト制約とアーキテクチャを優先します。

## class命名

### 記法

**必須**

- class名は小文字のkebab-caseを使う。
- class名は見た目ではなく、UI上の役割・意味・所属を表す。
- Reactの`className`とCSSのセレクタには同じclass名を使う。
- 1つのclass名に複数の単語を含める場合はハイフンでつなぐ。

```tsx
<div className="book-card">
  <span className="book-card__tooltip">書名</span>
</div>
```

```css
.book-card { /* block */ }
.book-card__tooltip { /* element */ }
```

### BEM風の構造

コンポーネント固有のclassは、原則としてBEM風の3種類で表します。

| 種類 | 形式 | 役割 | 例 |
|---|---|---|---|
| Block | `.block` | 独立したUI単位 | `.book-card` |
| Element | `.block__element` | Block内部の意味のある部位 | `.book-card__tooltip` |
| Modifier | `.block--modifier` | Blockの表示variant | `.book-cover--shelf` |

**必須**

- ElementはDOMの入れ子ではなく、Blockとの意味的な関係で命名する。
- `block__element__child`のようにElementを連結しない。
- `.book-card a span`のようなDOM構造だけに依存するセレクタを新規追加しない。
- `.wrapper`、`.container`、`.item`などの汎用名は、所属するBlockなしでは使わない。

```txt
良い例:  .library-header__navigation
避ける:  .library-header__inner__navigation
良い例:  .book-text-section__body
避ける:  .big-blue-box
```

Blockとページ上の意味がそれぞれ独立している場合は、複数のBlock classを同じ要素へ付けても構いません。例えば`book-shelf`と`book-catalog`は、棚の構造とカタログ領域の意味を別々に担います。単なる同義語を重ねる目的では使いません。

### Modifierと状態

**必須**

- 固定的な表示variantやレイアウト上の役割にはModifierを使う。
- 状態値やドメイン値をCSSで参照する場合は`data-*`属性を使う。
- HTMLやARIAに対応する意味がある場合は、classや`data-*`ではなくnative属性・ARIA属性を正本にする。

```tsx
<div className="book-cover book-cover--shelf" />
<span className="status-badge" data-status="reading" />
<span className="bank-value" data-unavailable />
```

使い分けの目安:

| 表現 | 用途 | 例 |
|---|---|---|
| Modifier | コンポーネントの表示variant | `book-cover--detail` |
| Modifier | 純粋な視覚状態 | `scroll-context--visible` |
| `data-*` | 状態・種別・ドメイン値 | `data-status="reading"` |
| `aria-*` / native属性 | 利用者に伝わる操作・意味 | `aria-pressed`, `disabled` |

`active`、`selected`、`disabled`、`hidden`など、HTMLやARIAで表現できる意味をclass名だけで伝えません。視覚表現が必要な場合も、意味を持つ属性と併用します。

Themeや画面幅をclass名で表現しません。テーマは`html[data-theme]`、レスポンシブはmedia queryまたはcontainer queryで扱います。

```txt
避ける: .book-card--mobile
避ける: .page--dark
避ける: .button.is-active だけで選択状態を表す
```

## 共通classと語彙

### 共通class

複数のコンポーネントで同じ意味・同じ振る舞いを持つ場合だけ、Blockに属さないsemantic classを使います。

```txt
.text-link
.visually-hidden
.message-state
```

単一コンポーネントでしか使わない部位は、共通classにせず所属BlockのElementにします。

既存の共通classがあることだけを理由に、似た意味の新しい共通classを増やしません。共有範囲や責務が変わる場合は、既存classの利用箇所を確認してから命名します。

### 推奨する語彙

同じ役割へ異なる単語を増やさないため、次の語彙を優先します。

| 語彙 | 用途 |
|---|---|
| `inner` | 外側のBlock内にある内側の配置領域 |
| `surface` | 背景・境界を持つ連続した面 |
| `wrapper` | 配置や余白をまとめる構造上のラップ |
| `heading` | 見出しと見出し周辺の領域 |
| `body` | 主要な本文領域 |
| `meta` | 補助的な書誌情報・メタデータ |
| `record` | 1件の書誌・記録情報のまとまり |
| `summary` | 集計や要約値のまとまり |
| `message` | 空状態、エラー、注意などの説明領域 |
| `image` | 画像本体 |
| `placeholder` | 画像や値がない場合の代替表示 |

**推奨**

- `title`は実際のタイトル文字列を指す場合に使い、見出し領域には`heading`を使う。
- `text`、`content`、`data`など意味が広すぎる語は、必要なら対象を具体化する。
- `img`、`btn`、`desc`のような略語は、既存の語彙や外部APIとの対応が必要な場合を除いて使わない。
- `blue`、`large`、`left`、`margin-top-4`のような見た目やユーティリティをclass名の基本語彙にしない。

## CSSの書き方

### セレクタ

**必須**

- グローバルなリセット・要素の基本スタイルを除き、Blockを起点にして記述する。
- class名の責務が分かるよう、セレクタのネストを浅く保つ。
- 色、余白、罫線、フォントなどの共通値はsemantic CSS variableを使う。
- コンポーネント固有の計算値は、そのコンポーネントのcustom propertyとして閉じ込める。

```css
.book-cover {
  background: var(--color-surface);
}

.book-cover__image {
  display: block;
}

.book-cover--detail {
  width: var(--cover-inline-wide);
}
```

**避ける**

```css
/* DOM構造と見た目に強く依存する */
.book-card > div > a > span { }

/* テーマ値をclass名へ埋め込む */
.dark-blue-card { }

/* 任意のページだけに効く汎用class */
.mt-24 { }
```

### Themeとresponsive

- Light / Darkでclass名やDOMを分けない。
- テーマ差分はsemantic CSS variableを`html[data-theme]`で切り替える。
- Desktop / Mobileで別のDOMや専用Componentを作らない。
- 画面の境界は既存の1024pxを使い、狭いComponent内の調整はcontainer queryを使う。

この方針により、`.dark`、`.mobile`、`.desktop`のような実装詳細のclassを増やしません。

### CSSの配置

現行MVPの共有CSSは`src/app/globals.css`を正本とします。Storybookの表示面だけに必要なclassは`stories/storybook.css`へ置き、アプリのclassをStory専用の都合で変更しません。

## Storybook専用class

Storyのレイアウトや検証用のラップには`storybook-`を付けます。

```txt
.storybook-canvas
.storybook-canvas--component
.storybook-color-block
```

Storybook専用classをアプリのUIへ渡したり、アプリのコンポーネントclassをStoryのレイアウト用途へ流用したりしません。

## 変更時のルール

**必須**

1. 追加前に、同じ責務の既存Block・共通class・語彙を検索する。
2. 新しいclassは、Block、Element、Modifier、`data-*`のどれに該当するか決める。
3. 再利用コンポーネントのclassを変更した場合は、対応するStoryと必要な状態を確認する。
4. class名だけの変更でも、CSS、JSX、Story、ドキュメントの参照を同時に更新する。
5. 既存classの一括renameは、命名規約の導入だけを理由に行わない。必要になった場合は別Issueで扱う。

新しい語彙や例外を追加する場合は、本書の語彙表と理由も同じ変更で更新します。

## Review checklist

- [ ] class名はkebab-caseか
- [ ] Blockの所属とElementの責務が明確か
- [ ] Modifier、`data-*`、ARIA/native属性の使い分けは適切か
- [ ] 見た目だけの名前や汎用名を新設していないか
- [ ] DOMの深いネストに依存していないか
- [ ] Themeやresponsive専用のclassを増やしていないか
- [ ] Storybook専用classに`storybook-`が付いているか
- [ ] 現行のArchitecture、アクセシビリティ方針と矛盾していないか

## 参考

- [departコーディングガイドライン](https://depart-develop.github.io/coding-guidelines/)
- [CSS クラス名](https://depart-develop.github.io/coding-guidelines/docs/naming_convention/css-name/)
- [CSSでよく使うパターン](https://depart-develop.github.io/coding-guidelines/docs/naming_convention/css-sample-name/)

## 改訂履歴

| 日付 | 内容 |
|---|---|
| 2026-09-02 | 初版作成 |
