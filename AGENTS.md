# AGENTS.md

## Project

このリポジトリは「Stack Library / 技術書ライブラリ」の実装リポジトリです。

一般的な読書記録サービスではなく、技術書の蔵書管理を中心に実装してください。
topics、notes、knowledge map、学習ルートはMVP後の拡張です。

## Required reading order

新しいブランチまたは論理タスクの開始時に一度、以下を順番に確認してください。

1. `README.md`
2. `docs/DEVELOPMENT.md`
3. `docs/ARCHITECTURE.md`
4. 必要に応じて `docs/CONTENT_MODEL.md` または `docs/ROUTING.md`

同じブランチ・同じ目的の作業を会話ターンをまたいで継続するだけなら、内容が更新されていない文書を再読する必要はありません。対象範囲が変わった場合、または関連文書が更新された場合だけ、影響する文書を読み直してください。

microCMS、型定義、データ取得、モックデータを触る場合は `docs/CONTENT_MODEL.md` を必ず確認してください。

ページ追加・URL設計・静的生成を触る場合は `docs/ROUTING.md` を必ず確認してください。

コンポーネントの責務、Figmaとの対応、Storybookの構成を触る場合は `docs/ARCHITECTURE.md` を必ず確認してください。

## Git workflow

Git運用は `docs/DEVELOPMENT.md` に従ってください。以下は必須です。

- `main`へ直接コミットしない
- 作業開始前にGitHub Issueを作成し、目的・対応範囲・完了条件を記録する
- `main`を最新化し、Issue番号を含む短命ブランチを作る
- ブランチ名は`feature/`、`fix/`、`docs/`、`refactor/`、`test/`、`chore/`、`ci/`のいずれかで始める
- ブランチ名は`<category>/<issue-number>-<short-summary>`形式にする
- Codexやその他のエージェントによる作業でも`agent/`を使わない
- コミットメッセージはConventional Commits 1.0.0に準拠する
- 1ブランチには1つの目的だけを含める
- 関係のない差分やユーザーの未完了作業を、無断で修正・削除・コミットしない
- 検証結果と`Closes #<issue-number>`をPR本文へ記録し、PR経由で`main`へ統合する

ブランチ名とコミット例:

```txt
feature/12-book-form
fix/18-theme-focus-ring
docs/23-repository-workflow

feat(book-form): add ISBN lookup
fix(theme): preserve visible focus styles
docs(workflow): define repository conventions
```

## Design source and visual verification

Figmaを視覚仕様の正本とする変更では、Issueの文章だけからUIを推論しないでください。対象Figmaフレームを先に確認し、Issueとの矛盾があれば独自に折衷せず作業を停止してください。

Figmaの作成・修正後は、ノード更新や変数値の検査だけで完了としません。

- 画面・ページ領域・レスポンシブレイアウトを変更した場合は、Desktop / Mobile・Light / Darkの対象4画面を変更後に新しく取得する
- 独立したPrimitiveや局所コンポーネントの変更では、対象Story・対象Figmaノードと、実際に影響するtheme・viewportだけを取得する。幅やthemeに依存しないことを構造で確認できる場合、同一画像を機械的に4通り取得しない
- 取得した対象を並べ、情報階層、背景面、境界、余白、コントラスト、意図しない帯・浮遊・カード化を目視比較する
- fill、stroke、semantic variable binding、Auto Layout、bounds、clipping、overflowを構造検査する
- 外側ラップ、本文、ヘッダー、フッターなど面が連続する領域は、個別レイヤーではなく画面全体で照合する
- 指摘修正後は、その修正で影響を受けるtheme・viewport・ノードだけを再取得する
- 古いスクリーンショット、キャッシュされたプレビュー、変更前の画像を完了証拠に使わない
- 最終画像を比較するまで「修正済み」「Figmaと一致」と報告しない
- 未確認項目があれば完了扱いにせず、未確認として明示する

## Implementation stack

- Next.js App Router を使う
- microCMS をコンテンツ管理に使う
- TypeScript を使う
- Book FormからNext.js Server Action経由でmicroCMSへ登録する
- microCMSのAPIキーはサーバー側だけで扱う
- ログイン、管理画面、AI推薦、外部サービス連携はMVPでは実装しない

## MVP

MVPは以下の4画面に限定します。

1. Book List: `/`
2. Book Detail: `/books/[contentId]`
3. Library Bank: `/bank`
4. Book Form: `/books/new`

積読などの絞り込みはBook Listの状態として扱います。サイドバーは使用しません。

## Design principles

UIは日本語ファーストで設計してください。

避ける方向:

- Booklog風
- Notionコピー
- 一般的なSaaSダッシュボード
- shadcn/uiのデフォルト感
- 派手すぎるSF
- 和風、古書店風、昭和レトロ

目指す方向:

- Technical Archive × Developer Observatory
- 静かな技術標本室
- 知識同士が星図のようにつながる雰囲気
- 暗色ベース
- 細い罫線
- 精密なメタデータ表示
- 読みやすい日本語本文
- アクセシビリティを犠牲にしない

## Product rules

迷った場合は以下を優先してください。

1. 技術書の蔵書を探し、確認し、登録できるか
2. 日本語で自然に読めるUIになっているか
3. Booklog / Notion / SaaSテンプレートのコピーに見えないか
4. 技術書に必要な書誌情報と所蔵情報を扱えているか
5. 静かで精密なデザインになっているか
6. アクセシビリティを犠牲にしていないか

## Accessibility

以下を守ってください。

- 見出し階層を崩さない
- 色だけで状態を伝えない
- 状態バッジにはテキストラベルを含める
- フォーカス状態を明確にする
- 日本語本文の可読性を優先する
- クリック可能要素を視覚的に判別できるようにする
- キーボード操作を考慮する

## Development behavior

実装時は、既存ドキュメントの思想と矛盾する変更を避けてください。

### Figma design QA

Figmaを視覚仕様の正本とする画面・コンポーネントを実装または修正したPRは、Ready化またはマージ可否を判断する前に、プロジェクト固有サブエージェント `figma_design_qa` を起動し、独立した読み取り専用監査を行ってください。

同じPRで連続して関連コンポーネントを変更する場合、独立QAは最後の関連変更後に一度まとめて実施します。画面全体・主要レイアウト・高リスクなアクセシビリティ変更、またはユーザーが即時監査を指定した場合は、その変更時点で実施してください。監査後に対象ノードへ影響する変更を加えた場合だけ再監査します。

- Issueを仕様の正本、リンクされたFigmaノードを視覚仕様の正本として扱う
- Figmaの対象node IDと、実際に影響するviewport・themeを監査結果へ記録する
- コンテナやセルの開始位置だけで一致判定しない
- 表示文字の左右端、text alignment、有効コンテンツ幅、padding、列間gap、折り返し、行高を実測する
- 短いサンプルだけでなく、長い日本語の書名・出版社でも比較する
- BlockerまたはMajorの乖離が残る場合は完了としない
- 修正後は同じ測定項目を再確認し、差分が解消した根拠を示す

新しい画面・コンポーネント・データモデルを追加する場合は、必要に応じて以下のドキュメントも更新してください。

- `README.md`
- `docs/DEVELOPMENT.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTENT_MODEL.md`
- `docs/ROUTING.md`

大きな方針変更が必要な場合は、実装前に理由を説明してください。

検証は変更リスクに応じて選びます。詳細な判断基準は `docs/DEVELOPMENT.md` の検証マトリクスに従ってください。

- 軽微変更: 差分、参照、文書整合など対象に限定した確認
- 局所コンポーネント変更: `npm run lint`、`npx tsc --noEmit`、対象Storyまたは対象Figmaノード
- 画面・基盤変更: `npm run lint`、`npm run build`、影響する画面・theme・viewport、アクセシビリティ
- コードを含むPRのReady化またはマージ前: 最終差分に対して `npm run lint` と `npm run build`

`npm run build`はTypeScript検査を含むため、同じ最終差分に対して`npx tsc --noEmit`と連続実行しません。型検査は途中の高速フィードバック、buildは最終ゲートまたは高リスク変更に使います。

同じ論理タスク内で成功済みの検証は、その入力となるファイル、設定、依存関係、環境が変わっていなければ再利用できます。関連ファイルの変更、merge・rebase、依存更新、設定変更があった場合は、影響する検証だけを再実行してください。
