# 本棚・書影設計正本

本書は、Stack LibraryのBook Listにおける本棚と書影の設計正本です。設計判断は、ユーザーが確定した本棚・書影方針と、移動前の実装基盤の挙動証拠であるcommit `3ded409af6b443493400e9cfcc101d8541889b57`（`feat(shelf): 本棚と書影表示の基盤を整備`）を照合して記録しています。

## 設計概要

Stack Libraryは、1人の技術書所有者が自分の蔵書を眺め、持っているかを確認し、書影から詳細へ入るための個人用ライブラリです。Book Listは本棚を眺める画面であり、書籍情報を一覧に詰め込む画面ではありません。暗色を基調にした静かな技術標本室の方向性、日本語ファースト、細い罫線、精密なメタデータ表示、アクセシビリティの原則を維持します。

本棚背景は装飾ではなく、書影を収める面です。書影は固有の縦横比を保ち、カードのように浮かせる追加の面や情報表示は行いません。

## 利用状況

利用者は、Desktopでは本棚全体を眺め、Mobileでは店頭などの狭い場所で「これ持っていたっけ」を素早く確認します。Book Listには書影だけを並べ、書名、著者、出版社、読書状態などは詳細画面で確認します。書影を選択すると、既存のルート契約に従って `/books/[contentId]` のBook Detailへ遷移します。

## 一覧の情報設計

- Book Listの一覧表示は書影のみとする。
- 一覧にはタイトル、著者、出版社、状態、技術領域などを表示しない。
- 見出し「蔵書一覧」と登録冊数は `BookShelfSection` が提供する。
- 書影がない場合も一覧の位置と遷移可能性を壊さず、`BookCover` の代替表示を使う。
- クリック対象は書影を含む `BookCard` のリンク矩形であり、棚のgrid cell全体ではない。

## 本棚の構造

`BookShelf`は、空の1段分の棚本体、つまり棚枠と棚面だけを提供するLayoutです。データ、見出し、リンクを持たず、子要素を収納する面だけを受け取ります。`BookShelf`単体のLayout契約として、子要素が空でも1行分の棚を表示します。これは`BookShelfSection`に0冊を渡した場合にも適用される表示契約ですが、実際のBook List `/` の0冊状態を意味しません。現在の`BookList`は0冊時に`BookShelfSection`を経由せず、空状態メッセージを表示します。

`BookShelfSection`は、見出し、冊数、`BookCard`の一覧を組み合わせるPatternです。登録冊数から必要な行数を決め、棚本体をその行数に合わせて表示します。PCは1行6冊、SPは1行3冊です。

## 書影・クリック領域

`BookCard`は詳細へのリンクであり、書影だけを表示します。リンクのアクセシブルな名前には書名を含めます。PCではhoverまたはキーボードfocus時に書名だけのツールチップを表示します。SPではツールチップを表示しません。

クリック時に書影やツールチップの位置を移動させず、`focus-visible`を隠しません。BookCardは棚のgrid cell全体をリンクにせず、書影の矩形に合わせたリンク領域を持ちます。route-changing Linkのクリック後にフォーカスを復元する契約は定義しません。

`BookCover`は書影画像または画像未取得時の代替表示を担います。shelf variantの最大枠はdesktopで幅110px・高さ170px、SPで幅82px・高さ135pxです。固有比率を維持して最大枠内に収め、カードのような浮遊影や一覧上の追加情報は付けません。

## PC/SP・Light/Dark仕様

ページレベルの境界は1024pxです。Desktopは1024px以上、Mobile（SP）は1024px未満とします。

### Desktop（`>=1024px`）

- 外側ラップに `maple_left` / `maple_right` を使う。
- インナーに `maple_shadow_left` / `maple_shadow_right` / `maple_center` を使う。
- 棚の1行高さは225px。
- 構造用 `background-size` は外側左右39×225px、内側左右16×225px、center 500×225px。
- 書影とBookCardのリンク矩形は110×170px。
- 書影・リンク矩形の下端から棚板までの余白は38px。
- 書名だけのツールチップをhover/focusで表示する。

### Mobile（`<1024px`）

- Lightは `bg_maple@2x.png`、Darkは `bg_darknight@2x.png` を使う。
- 背景位置はy=22px、`background-size`はauto 168px。
- 棚の1行高さは168px。
- 書影とBookCardのリンク矩形は82×135px。
- 下端余白は25px、1行3列とする。
- ツールチップは表示しない。

テーマ差は現実装にある範囲だけを記録します。デスクトップ専用のdarknight差分など、実装にないテーマ別差分は追加しません。Light / Darkの切り替えは共通のglobal themeで行い、棚の構造や行数規則は変えません。

## コンポーネント責務

| Component | 層 | 責務 |
|---|---|---|
| `BookShelf` | Layout | 空の1段分の棚枠・棚面と子要素の収納面だけを提供する。データ、見出し、リンクを持たない。 |
| `BookShelfSection` | Section / Pattern | 「蔵書一覧」、冊数、冊数に応じた棚行、`BookCard`一覧を組み合わせる。 |
| `BookCard` | Card / Composite | 1冊分の書影とBook Detailへのリンク、PC用の書名ツールチップを提供する。書誌情報は表示しない。 |
| `BookCover` | Common / Primitive | 画像のURL・固有寸法を使った書影表示と、画像未取得時の代替表示をvariantごとに提供する。 |

Atomic Designは表示上の名前ではなく依存方向として扱います。`BookShelfSection`が`BookShelf`と`BookCard`を組み合わせ、`BookCard`が`BookCover`を利用します。App Routerの実データ取得と画面統合は、これらの再利用責務の外側に置きます。

## Storybook検証面

Storybookはglobal themeのLight / Darkと、desktop / tablet / mobile viewportで確認します。棚にmicroCMSを接続せず、`Book`型に準拠したfixtureを使います。

| Storybook title | 代表Story・確認内容 |
|---|---|
| `Components/Section/BookShelfSection` | `Default`、`LongJapaneseTitles`。見出し・冊数・棚本体・書影一覧の組み合わせを確認する。棚の寸法・配置と冊数による行数、6列/3列は実装CSSと別viewportで確認する。 |
| `Components/Card/BookCard` | `CoverAvailable`、`CoverUnavailable`、`Hover`、`LongJapaneseTitle`。書影のみのリンク、PCの書名ツールチップ、長い書名、画像未取得を確認する。 |
| `Components/Common/BookCover` | `Placeholder`、`DecorativePlaceholder`。meta defaultの`variant=detail`における画像未取得時の通常・装飾用代替表示を確認する。shelf variantを直接検証するStoryではない。 |

`Hover`はpointer hoverの検証面です。キーボードfocusは実装CSSの`focus-visible`規則と手動確認の対象であり、Storyがfocus interaction testを完了したとは扱いません。shelf variantの寸法・配置は`BookShelfSection`/`BookCard`のStoriesと実装CSSで確認します。`LongJapaneseTitles`、行数、SPでツールチップが表示されないこと、長い日本語の書名・著者はStoryが直接保証する事項ではなく、対象viewportでの確認対象または手動確認とします。

## 確定事項と非対象

確定事項は、本棚を蔵書の視認面として扱い、一覧情報を書影に限定すること、`BookShelf`を空の棚本体として分離すること、`BookShelfSection`が行数と組み合わせを担うこと、PC6冊/行・SP3冊/行、書影とリンク矩形の寸法、PC限定ツールチップ、Light / Darkの現実装上の背景差です。

本書の非対象は、Figmaノードの作成・編集、未割当の視覚仕様、サイドバー、状態別独立ページ、一覧上の書誌情報、書影の固定比率化、BookCard全cellリンク、デスクトップ専用darknight背景です。

## 証拠と更新条件

実装基盤の挙動証拠は、移動前の実装基盤を含むcommit `3ded409af6b443493400e9cfcc101d8541889b57`（`feat(shelf): 本棚と書影表示の基盤を整備`）およびその時点の棚規則・Storybook storiesです。このcommitは移動前の実装基盤の挙動を示す履歴証拠であり、現在の作業ツリーで移動後に更新された物理パスをこのcommitに含まれるものとして扱いません。現在の作業ツリーにおける対応先は `src/components/layout/book-shelf.tsx`、`src/components/section/book-shelf-section.tsx`、`src/components/card/book-card.tsx`、`src/components/common/book-cover.tsx`、`src/app/page.tsx` などの更新済みconsumerです。文書のリンクとコンポーネント対応は [Component Traceability Registry](./COMPONENT_TRACEABILITY.md) で追跡します。

この棚については、現在Figmaのexact node assignmentとfresh evidenceがありません。したがってFigma main/specimen、properties、variables、fresh screenshotは `not assigned` または `PENDING` とし、推測で補完しません。Figmaのexact node、実装変更、Storyの追加・変更、テーマ・viewport・アクセシビリティ挙動の変更が発生した場合は、該当する設計契約と本書・台帳を同じrevisionで更新します。寸法、行数、責務、ルート契約を変更する場合は、ユーザーの再確認と実装・Storybookの再検証を必要とします。
