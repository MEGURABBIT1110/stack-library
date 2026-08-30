# Component Traceability Registry

Stack Libraryの再利用コンポーネントについて、Figma・React・Storybook・検証状態を追跡する台帳です。初期4部品に加えて、本棚・書影設計で確定した `BookShelf`、`BookShelfSection`、`BookCard`、`BookCover`を対象とします。

## Authority and evidence

- Contract revision: Issue #35 / 2026-08-08
- Figma file: `viM7iCMNvYu1146EufF2qN`
- Figma source: [Common / 共通部品カタログ](https://www.figma.com/design/viM7iCMNvYu1146EufF2qN/stack-library?node-id=749-384)
- Implementation history: [PR #16](https://github.com/MEGURABBIT1110/stack-library/pull/16)
- Fresh Figma screenshot status: `PENDING`（Figma作業保留中。PR #16の既存read-back記録は参照証拠として保持）

`PENDING`の項目は未確認を意味します。既存PRの記録だけで、現在のFigma構造が維持されているとは断定しません。

## Registry

| Component | Responsibility / layer | Figma main / specimen | React export / path | Storybook title / stories | States and accessibility | Responsive / lifecycle | Evidence / status |
|---|---|---|---|---|---|---|---|
| ThemeSwitch | Light / Darkテーマを選択するPrimitive | Main `256:13` / specimen `750:110` | `ThemeSwitch` / `src/components/common/ThemeSwitch.tsx` | `Components/Common/ThemeSwitch` / `Default` | Native `button` 2個、`aria-label`、`aria-pressed`、44×44操作、キーボード操作 | 100×52の固定操作面。Reuse。テーマ変更とlocalStorage永続化を担当 | PR #16 read-back・Story確認済み。fresh screenshot `PENDING` |
| Heading | 文書構造の見出しlevelと視覚scaleを分離するPrimitive | Main `663:247` / specimen `750:117` | `Heading` / `src/components/common/Heading.tsx` | `Components/Common/Heading` / `Default`, `ScaleGuide` | `as`でnative headingを選び、`scale`は視覚値だけを担う。見出し階層を保持 | 長い日本語は`overflow-wrap`でreflow。Reuse。汎用見出しの正規export | PR #16 read-back・Story確認済み。fresh screenshot `PENDING` |
| StatusBadge | 読書状態を日本語ラベルとsignalで示すPrimitive | Main `257:17` / specimen `750:148` | `StatusBadge` / `src/components/common/StatusBadge.tsx` | `Components/Common/StatusBadge` / `Reading`, `AllReadingStates` | 5状態、テキストラベルとsignalを併用し、色だけに依存しない | Light / Darkでsemantic colorを切替。Extend済み。状態定義は`lib/books/labels.ts`に従う | PR #16 read-back・Story確認済み。fresh screenshot `PENDING` |
| TechnicalAreaTags | 技術分野を中立的な複数タグで示すPrimitive | Main `258:12` / specimen `750:165` | `TechnicalAreaTags` / `src/components/common/TechnicalAreaTags.tsx` | `Components/Common/TechnicalAreaTags` / `Default`, `Wrapped`, `Empty` | `ul`と`aria-label`で分野を伝達。色分けに依存しない。空配列は非表示 | `max-content`、26px高、複数時wrap。Reuse。分類語彙は`lib/books/labels.ts`に従う | PR #16 read-back・Story確認済み。fresh screenshot `PENDING` |
| BookShelf | 1段分の空の棚本体を提供するLayout | not assigned / not assigned | `BookShelf` / `src/components/layout/BookShelf.tsx` | `Components/Layout/BookShelf` / `Default` | データ、見出し、リンクを持たない。空でも1行分の棚面を提供 | Desktop 225px、SP 168px。テーマごとの背景は現行実装に従う | Figma exact node / fresh screenshot `PENDING` |
| BookShelfSection | 見出し・冊数・棚行・書影一覧を組み合わせるPattern | not assigned / not assigned | `BookShelfSection` / `src/components/section/BookShelfSection.tsx` | `Components/Section/BookShelfSection` / `Default`, `LongJapaneseTitles` | `aria-labelledby`、冊数表示、書影一覧の意味付け。SPでも同じDOM構造 | Desktop 6冊/行、SP 3冊/行。登録冊数に応じて行数を表示 | Figma exact node / fresh screenshot `PENDING` |
| BookCard | 書影だけを詳細へ結ぶCard / Composite | not assigned / not assigned | `BookCard` / `src/components/card/BookCard.tsx` | `Components/Card/BookCard` / `CoverAvailable`, `CoverUnavailable`, `Hover`, `LongJapaneseTitle` | リンクのaccessible nameに書名を含める。PCのみ書名tooltip。クリックで移動しない | Desktop 110×170px・下端余白38px、SP 82×135px・下端余白25px。cell全体はリンクにしない | Figma exact node / fresh screenshot `PENDING` |
| BookCover | 固有比率を維持する書影表示と代替表示 | not assigned / not assigned | `BookCover` / `src/components/common/BookCover.tsx` | `Components/Common/BookCover` / `Placeholder`, `DecorativePlaceholder` | `decorative`を受け、一覧ではBookCardのaccessible nameへ責務を委譲。画像未取得時も代替表示 | shelf最大枠 Desktop 110×170px、SP 82×135px。追加情報や浮遊表現なし | Figma exact node / fresh screenshot `PENDING` |

### Figma evidence fields

The registry deliberately separates historical implementation evidence from current Figma evidence. For each row above, the following fields remain explicit until Figma work resumes:

- Properties: `PENDING` (the exact current property set is not asserted from historical evidence).
- Variables: `PENDING` (the exact current variable bindings are not asserted from historical evidence).
- Intentional platform differences: `PENDING` (no current platform-specific difference is inferred).
- Last verified / evidence revision: historical PR #16 read-back at head `1a00283288e88f36444bade4084705df91f69274`; fresh Figma screenshot and current-node read-back are `PENDING`.

These fields must be replaced only by a fresh read-back from the assigned Figma node; `UNKNOWN` or `PENDING` is preferred to an inferred value.

## Change protocol

各部品を変更するときは、次の順で台帳を更新します。

1. Issueと対象Figma nodeのrevisionを凍結する。
2. React export、Storybook title、代表Story、公開状態、アクセシビリティ契約を更新する。
3. Figma main componentとspecimenのread-back、必要なfresh screenshotを取得する。
4. Storyまたはinteraction evidenceと、変更したtheme・viewport・状態を記録する。
5. `unknown`、`blocker`、意図的なplatform差を推測で埋めずに残す。

### Update ownership

- `documentation_writer` owns the registry row, path, Storybook locator, lifecycle, and evidence-status updates.
- `component_implementer` reports React export, Story, state, interaction, and accessibility changes to the registry owner before handoff.
- `figma_designer` or `figma_design_qa` owns current-node properties, variables, read-back, and fresh screenshot evidence when Figma work is authorized.
- The registry remains `PENDING` and is not marked complete while required Figma evidence is unavailable.

## Known gaps

- 現行Figmaのfresh screenshotと構造read-backは、Figma作業保留のため未取得。
- 本棚・書影の設計判断、寸法、Storybook検証面は [本棚・書影設計正本](./DESIGN.md) を参照する。Figmaのexact node assignmentがない4部品は、現在のFigma構造を推測せず `PENDING` のまま保持する。
- Figma nodeの移転・削除が判明した場合は、旧IDを再利用せず、新しいexact assignmentを受けてから更新する。
