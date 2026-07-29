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

### Internal development organization

親エージェントを開発リードとする15職能の仮想開発組織を想定します。15職能を常時稼働させるのではなく、登録職能と同時稼働数を区別し、4つの同時実行枠は親と最大3担当で使用します。完了した担当は枠を解放し、次工程の担当へ交代します。

| Role | Agent | Responsibility |
|---|---|---|
| 開発リード | 親エージェント | 技術方針、所有範囲、依存関係、停止判断、公開・マージ承認 |
| スクラムマスター | `scrum_master` | WIP、blocker、handoff、scope drift、4枠のWave交代管理 |
| プロダクトオーナー | `product_owner` | Issue作成・編集、優先順位、scope、Acceptance Criteria、意思決定履歴 |
| 要件分析 | `requirements_analyst` | Issueを検証可能なAcceptance Matrixと担当別briefへ変換 |
| UX調査・情報設計 | `ux_researcher` | 事例調査、情報優先度、Desktop/Mobile差、Design Brief作成 |
| デザインシステム設計 | `design_system_architect` | Atomic構造、Component、Variant、Token、Figma・React・Storybook対応の契約化 |
| Figmaデザイン | `figma_designer` | Figma実装、構造セルフチェック、Design Contract作成 |
| デザイン批評 | `design_critic` | 凍結Figma案の独立批評、代替案とtradeoff、実装前承認 |
| ソフトウェア設計 | `software_architect` | 実装方式の比較、境界・data flow・API・test seamのTechnical Plan作成 |
| コード実装 | `code_implementer` | 指定ファイル、Story、対象テストの実装 |
| コードレビュー | `code_reviewer` | 凍結diffの正確性、設計、アクセシビリティ、回帰リスク監査 |
| テスト・QA | `test_engineer` | リスク判定、最小検証、回帰確認、再利用可能な検証証拠 |
| デバッガー | `debugger` | 安定再現、仮説検証、根本原因の特定、最小修正handoff |
| 独立Figma QA | `figma_design_qa` | Figmaと最終レンダーの視覚・寸法・アクセシビリティ監査 |
| リリースマネージャー | `release_manager` | stage、commit、push、Draft PR、PR本文、remote整合、merge handoff |

開発リードは作業開始時にteam packetを作り、各担当へ同じ前提を渡します。

- Issue、完了条件、対象外
- branchまたはcommit、dirty diffの有無
- `owner`と`allowed_write_surfaces`
- `forbidden_write_surfaces`
- `allowed_transient_outputs`とcleanup条件
- `publication_authorization`、base/head、既存PR、merge authorization
- Figma file/node ID、対象ファイル
- 影響するtheme、viewport、state
- Acceptance Matrix、Design Brief、Component Contract、Design Contract、Design Critic Approval、Technical Planなどの入力契約
- 成功済み検証、その入力revision、無効化条件
- handoff先と停止条件

同じFigma node、同じtracked repository file、同じIssue specificationを複数担当へ同時に割り当てません。Figmaを編集するのは`figma_designer`、tracked repository fileの内容を編集するのは`code_implementer`、Issueのtitle、body、Acceptance Criteria、priority、labelを編集するのは`product_owner`だけです。`release_manager`は承認済みpathのGit index/historyとPR metadataだけを変更でき、working-tree fileやIssueは編集しません。要件分析、進行管理、UX調査、デザインシステム設計、デザイン批評、ソフトウェア設計、コードレビュー、テスト・QA、デバッグ、独立Figma QAはプロダクトソースを編集しません。検証・診断のtask固有成果物はOSの一時ディレクトリへ置き、repositoryへ残しません。必須コマンドが更新する既存ignore対象cacheは許容します。修正はfindingごとに元のownerへ戻します。

複数領域の変更は、担当を次のWaveで交代させます。

1. Product Intake: `product_owner`がユーザー確認済み要件をIssueへ記録し、Issue revisionを凍結して終了する。`requirements_analyst`がそのrevisionを独立監査し、Acceptance Matrixへ変換する。開発リードは所有範囲と依存順を確定する。複数Waveになる場合、`scrum_master`がslot planとhandoff条件を確認して終了する。
2. Discovery: `requirements_analyst`の完了後、`ux_researcher`がDesign Briefを作り、`software_architect`は既存構造と実装選択肢を調査し、`test_engineer`はbaselineと最小検証行列を準備する。
3. Architecture: `ux_researcher`の完了後、Component、Variant、Tokenまたは再利用構造を変更する場合は`design_system_architect`がComponent Contractを作る。`figma_designer`は既存Figmaの読み取り調査だけを並行できる。
4. Design: 必要なbriefとcontractの確定後、`figma_designer`がFigma実装とDesign Contractを凍結して担当を終了する。`design_critic`が独立批評し、承認されるまでコードの視覚実装へ進まない。指摘修正時は`figma_designer`だけを再起動し、影響範囲を`design_critic`が再確認する。
5. Technical Design: デザイン承認後、`software_architect`が複数案とtradeoffを検討してTechnical Planを凍結する。`code_implementer`は契約確定前に視覚値やAPI境界を推測しない。
6. Build: `code_implementer`が承認済みDesign ContractとTechnical Planからrepository実装を行う。非視覚部分が両契約へ依存しない場合だけ、開発リードが所有範囲を分けて先行実装を許可できる。
7. Review: writerの編集凍結後、`code_reviewer`、`test_engineer`、必要な場合だけ`figma_design_qa`を並行起動する。`test_engineer`は計画済み検証を進められるが、開発リードが`code_reviewer`の`QA_HANDOFF`または「追加なし」を転送するまで最終判定しません。追加riskがあれば対象検証だけを継続します。
8. Debug: `test_engineer`が原因不明のFAILと安定再現を返して停止した後、その枠を`debugger`へ交代します。同じ再現に対して両者を同時起動せず、`debugger`は根本原因と最小修正をwriterへ返します。
9. Fix: findingを元のwriterへ戻し、変更で無効になった批評、レビューまたは検証だけを再実行する。複数回の差し戻し、blocker、scope driftがあれば`scrum_master`を再起動する。
10. Delivery: ユーザーまたは開発リードからpublication authorizationを受けた後、`release_manager`が承認済みpathだけをstageし、commit、push、既存Draft PRの更新または新規Draft PR作成、remote整合確認を行う。既存PRが指定されている場合はそのPRだけを更新し、代替PRを作らない。
11. Merge: 明示的なユーザー承認を開発リードが記録した場合だけ、`release_manager`がマージを実行できる。PR作成やReady化をマージ承認と解釈しない。

全担当を機械的に起動しません。Issueを作成・編集しなければ`product_owner`、単一Waveなら`scrum_master`、調査不要なら`ux_researcher`、Component・Variant・Token・再利用構造へ影響しなければ`design_system_architect`、判断を伴うUI変更でなければ`design_critic`、UI変更がなければ`figma_designer`と`figma_design_qa`、技術的tradeoffがない軽微変更なら`software_architect`、repository変更がなければ`code_implementer`と`code_reviewer`、検証失敗がなければ`debugger`、GitHubへ公開しなければ`release_manager`を省略します。単一の軽微な読み取り・報告では開発リードが直接処理できますが、Issue、repositoryまたはFigmaを変更する場合は規模にかかわらず対応するwriterへ割り当てます。

Figmaだけの変更ではコードbuildを要求せず、ドキュメントだけの変更ではlint/buildを要求しません。Storybookの静的buildは、公開またはCI成果物として明示的に必要な場合だけ実行します。同じ入力に対する成功済み検証は再利用し、変更で無効になった検証だけを再実行してください。

### Figma design QA

Figmaを視覚仕様の正本とする画面・コンポーネントを実装または修正したPRは、Ready化またはマージ可否を判断する前に、プロジェクト固有サブエージェント `figma_design_qa` を起動し、独立した読み取り専用監査を行ってください。Figmaライブラリだけを変更した場合も、作業完了を判断する前に、対象specimen、visible state、構造を同エージェントで独立監査します。アプリケーションrenderは要求せず、fresh Figma screenshotとnode構造を証拠にします。

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
