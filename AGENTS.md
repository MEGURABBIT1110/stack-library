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

### Stacked PRとVercel review

Stacked PRは任意です。2つ以上のcode-bearing outcomeが依存順を持ち、各outcomeを独立してレビュー・検証・mergeできる場合だけ使用します。

- 各layerに別のIssue、coherent outcome、branch、PR、parent Codex chat（parent task）を割り当てる。同じoutcome内の専門職やWaveをlayerへ分けない
- 最下層PRは`main`、上層PRは直下layerのbranchをbaseにする
- 実装に伴う文書更新は対応するcode layerへ同梱し、docs-only layerを作らない。独立したdocs-only変更は通常の単独PRで扱える
- stack構築中は各PRをDraftに保ち、検証・review後にPRごとにReadyへ変更する
- stack全体または一部の一括mergeは禁止する。常に最下層から1 PRずつmergeする
- merge authorization、`merge_method`、authorized/frozen `expected_head_sha`はPRごとに独立して記録し、他layerから流用しない
- 下層merge後のservice側rebase・retargetはlocal history rewriteの許可ではない。新しいbase、head、CI/checkを取得し、validation、review、handoff、Ready/merge authorizationのうち無効になった証拠だけを再実行・再取得する

Vercel Preview DeploymentとVercel Agent Code Reviewは別の処理です。自動Agent reviewは無効を推奨し、code-bearing Ready PRで追加監査が必要な場合だけ`@vercel run a review`を使用します。Draft PRとdocs-only PRにAgent reviewは要求しません。Ignored Build StepをAgent reviewの停止条件として扱ってはいけません。詳細は[Development](docs/DEVELOPMENT.md#stacked-pull-request)を参照してください。

## Codex chat lifecycle

Codex作業の既定単位は、`1 GitHub Issue / 1 coherent outcome / 1 parent Codex chat`です。同じIssue、branch、outcomeは、requirements、implementation、review、fix、delivery、mergeまで同じparent chatで継続します。職能ごとにuser-visible chatを作らず、必要な専門職はparent chatがbounded internal subagentとして起動し、既存のexclusive authority、Wave、handoff、publication authorization、merge authorizationに従わせます。

- 別のIssueまたは別のoutcomeは、新しいparent chatで開始する
- forkは、shared contextからgenuine alternativeを比較・追跡する場合だけ使う。工程分割や職能分割の代わりにしない
- 複数のparent chatが並行してtracked fileへ書く場合は、chatごとに別worktreeとexact path ownershipが必要。同じbranchまたは同じpathを複数chatから編集しない
- merge後はparent chatをcompleteかつarchive candidateとして扱う。通常のfollow-up changeは新しいIssueとparent chatを使う
- 軽量なread-only question、説明、state check、reportはIssueなしで扱える。mutationへ移る前にIssue、outcome、branch、ownershipを確定し、そのcoherent outcomeのparent chatとして継続する

新しいparent chatは、root `AGENTS.md`と`.codex/config.toml`を確実にdiscoverできるよう、同じlocal projectを開き、primary repositoryのproject rootから開始します。別worktreeが必要な並行writeは、parent chat開始後にownershipとbranchを分離して割り当てます。

新しいchatへ引き継ぐ場合は、次を含むhandoff packetを渡します。

- Issue URL/numberとfrozen revision
- branch、base、head
- dirty diffの有無、内容、owner
- exact scope、coherent outcome、non-goals
- owner、allowed/forbidden write surfaces、path単位のownership ledger
- frozen Acceptance Matrix、Design Brief、Component/Design Contract、Technical Planなどのinput contractとrevision
- 完了済みvalidation、そのinput revision、結果、invalidation conditions
- Figma file/node、対象theme、viewport、state。対象外なら`none`
- publication authorization、DraftからReadyへのauthorization、独立したmerge authorization、`merge_method=merge|squash|rebase`、authorized/frozen `expected_head_sha=<40-character SHA>|absent`、既存Draft PR
- downstream handoffとstop condition

詳細な開始・引き継ぎ手順は[Development](docs/DEVELOPMENT.md)、parentと専門職の関係は[Agent Organization](docs/AGENT_ORGANIZATION.md)を参照してください。

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

外部の親エージェントを開発リードとする32 registered specialists（既存30 canonical roleとtask-scoped operational role 2職能）の仮想開発組織を想定します。32職能を常時稼働させるのではなく、登録職能と同時稼働数を区別し、4つの同時実行枠は親と最大3担当で使用します。完了した担当は枠を解放し、次工程の担当へ交代します。

既存30 canonical roleと2つのtask-scoped operational roleは`.codex/config.toml`から明示登録し、`.codex/agents/<group>/`へ配置します。group directoryは人間が上流・下流を理解するための分類であり、指揮命令、起動順、権限、承認を自動的には強制しません。実際の起動と依存順はteam packet、権限とhandoffは各TOMLの`ORGANIZATION CONTRACT`に従います。各groupの目的、全職能のActivation Gate、上流入力、下流handoffは[Agent Organization](docs/AGENT_ORGANIZATION.md)を参照してください。

| Group | Specialists | Responsibility |
|---|---|---|
| external parent | `development_lead` | 技術方針、所有範囲、依存関係、停止判断、publication/merge authorization |
| `apex` | `principal_product_strategist`, `global_context_intelligence_lead`, `innovation_futures_portfolio_lead`, `technology_readiness_lead`, `design_philosophy_steward` | 現在の製品戦略、世界文脈、将来選択肢、技術成熟度、設計哲学を独立監査 |
| `governance` | `scrum_master`, `product_owner`, `product_integrity_reviewer` | WIP、Issue仕様、優先順位、Acceptance Criteria、独立した製品整合監査 |
| `discovery` | `requirements_analyst`, `ux_researcher`, `bibliographic_identity_librarian`, `authority_control_librarian` | Acceptance Matrix、UX/情報設計、書誌同一性、典拠語彙の契約化 |
| `architecture` | `design_system_architect`, `software_architect` | Component/Variant/Tokenとソフトウェア境界、data flow、test seam、writer routingの契約化 |
| `design` | `figma_designer`, `design_critic`, `adaptive_resilience_experimenter` | Figma視覚仕様、独立批評、回復性実験契約の凍結 |
| `build` | `skill_writer`, `documentation_writer`, `component_implementer`, `application_implementer`, `data_implementer` | exact pathを割り当てられたtracked repository実装 |
| `assurance` | `code_reviewer`, `test_engineer`, `debugger`, `figma_design_qa`, `epistemic_red_team_analyst`, `human_factors_error_specialist`, `security_privacy_risk_steward` | code/test/debug/Figma parity、証拠品質、human error、security/privacyの独立監査 |
| `delivery` | `release_manager` | authorized pathのstage、commit、push、Draft PR、remote整合、merge handoff |
| `operations` | `microcms_operator`, `microcms_observer` | 公式microCMS MCPの`books` APIに対する承認済みone-shot実行と、read-only監視。repository、Issue、Figma、Git、PR、permissionは変更しない |

5つの`apex`職能は対等な独立視点であり、常設の承認会議でも互いの代役でもありません。該当するActivation Gateを満たす職能だけを起動し、見解の衝突は多数決で解消せず、根拠とともに`development_lead`へ返します。既存30 canonical roleのうち新設された12職能はread-only advisory roleであり、gate外では`NOT_REQUIRED`を返します。operationsの2職能は別のtask-scoped operational roleで、microCMS外部操作以外のmutation authorityを持ちません。

operationsの2職能は、公式MCP endpoint `https://mcp.microcms.io/mcp/meguru-stack-library`を使います。HobbyプランのAPIキーは1本だけで、host processが`MICROCMS_API_KEY`を秘密として供給します。`.env.local`の自動ロードを前提にせず、キー値はshell、model context、repository、Issue、ログ、handoffへ記録しません。app runtimeとdevelopment MCPは分離し、同一キーは権限分離の代替にしません。operatorはclient-side allowlistで`microcms_get_list`、`microcms_get_content`、`microcms_create_content_published`だけを`books` APIに対して使い、observerは前2つだけを使います。observerの全mutation/未知toolはfail-closedで拒否し、変更要求はoperatorまたは`development_lead`へ返します。operatorのmutationは同一serviceの`microcms_get_content` read-backが期待/観測状態のMATCHとなった場合だけ`mutation_verified=VERIFIED`です。

開発リードは作業開始時にteam packetを作り、各担当へ同じ前提を渡します。

- Issue、完了条件、対象外
- branchまたはcommit、dirty diffの有無
- `owner`と`allowed_write_surfaces`。複数writerを使う場合はpath単位のownership ledgerと担当revision
- `forbidden_write_surfaces`
- `allowed_transient_outputs`とcleanup条件
- `publication_authorization`、DraftからReadyへのauthorization、base/head、既存PR、独立したmerge authorization、`merge_method=merge|squash|rebase`、base/head観測値とは別にmerge mutation authorizationへ束縛する`expected_head_sha=<40-character SHA>|absent`
- Figma file/node ID、対象ファイル
- 影響するtheme、viewport、state
- Acceptance Matrix、Design Brief、Component Contract、Design Contract、Design Critic Approval、Technical Planなどの入力契約
- 成功済み検証、その入力revision、無効化条件
- handoff先と停止条件

GitHubまたはFigmaのlive external accessをteam packetで割り当て、対象serviceのMCP-backed toolがcallableな場合、担当はそのtoolでexact targetを読み書きし、handoffへ`MCP_EVIDENCE`を残します。plugin、capability、skill、tool schemaの存在は`availability`の根拠にはなっても`invocation`の根拠にはなりません。runtimeでtool identifierが変わり得るため単一の名前を固定せず、実際に使用したfully qualified tool identifierとprovenance/server、exact target ID/URL、operation、permission result、result/errorをcallごとに記録します。tool callがなかった場合もno-call entryを1件出力し、tool identifierとprovenance/serverは`none`、targetとintended operationは割り当て内容（未割り当てなら`none`）、permission resultは`NOT_TESTED`、result/errorは`no MCP call`とします。各entryは次の6状態を区別し、no-call entryでは必ず`invocation=NOT_INVOKED`とします。

GitとGitHub serviceは同じものとして扱いません。local repositoryのstatus、diff、branch、stage、commit、push、local/remote ref alignmentはlocal `git`を使います。Issue、PR、review、check、release、mergeなどGitHub service上の対象を読み書きする操作は、職能のauthorityとauthorizationの範囲でcallableなGitHub MCP-backed toolを使います。GitHub MCPで対象操作がcallableなら、GitHub CLI（`gh`）の認証状態を確認したり、`gh auth login`を要求したりすることを開始条件にしてはいけません。

`gh`を使えるのは、必要な特定操作に対応するcallableなGitHub MCP-backed toolがtool search後も存在せず、かつ、その操作が契約上MCP必須ではない場合だけです。handoffにはMCP gap、実施したtool search、操作の必要性、使用したexact `gh` operationと結果を記録します。`gh`、browser、direct APIの実行結果はMCP invocation、`MCP_EVIDENCE`、MCP read-backの代わりにはなりません。required MCP operationのtoolがunavailable、undiscoverable、denied、または失敗した場合は、`gh`をfallbackに使わず、その職能の契約に従って`BLOCKED`を返します。

- `availability`: `AVAILABLE | UNAVAILABLE | UNKNOWN`
- `invocation`: `INVOKED | NOT_INVOKED`
- `access`: `GRANTED | DENIED | UNKNOWN`
- `read`: `SUCCEEDED | FAILED | NOT_REQUESTED`
- `mutation_requested`: `YES | NO`
- `mutation_verified`: `VERIFIED | UNVERIFIED | NOT_REQUESTED`

`mutation_requested`はmutationの割り当て有無ではなく、MCP-backed mutation callを実際にserviceへ送ったかを表します。no-call entryでは、`availability`は確認結果、`access=UNKNOWN`、`read=NOT_REQUESTED`、`mutation_requested=NO`、`mutation_verified=NOT_REQUESTED`とします。live mutationを割り当てられていてもcallしなかった場合は、`intended operation`へ割り当て内容を残したうえで該当taskを`BLOCKED`とします。

required live mutationに使うMCP-backed toolがunavailableまたはundiscoverableな場合は、利用不能なtoolを試行せず、`availability=UNAVAILABLE | UNKNOWN`、`invocation=NOT_INVOKED`のno-call entryを残して`BLOCKED`とします。そのlive external operationをCLI、browser、直接API、または他のnon-MCP手段で代替してはいけません。`release_manager`に許可されたlocal Gitのindex/history/pushは引き続き利用できますが、MCP evidenceにはならず、GitHub Issue/PR operationの代替にもなりません。

live mutationは、同じserviceのMCP-backed readを使い、変更したexact targetの期待状態をread-backで確認した場合だけ完了と報告できます。read-back entryには、実際に使ったfully qualified read-back tool identifier、exact target ID/URL、revisionまたはretrieval timestamp、expected state、observed state、`comparison result=MATCH | MISMATCH`を記録します。`comparison result=MATCH`の場合だけ`mutation_verified=VERIFIED`にできます。read-backできない、権限がない、または期待状態と一致しない場合は`mutation_verified=UNVERIFIED`として、該当職能の契約に従い`BLOCKED`または未検証を報告します。CLI、browser、直接API、画面表示、過去のhandoffだけではMCP invocationまたはmutation verificationの証拠になりません。

同じFigma node、同じtracked repository file、同じIssue specificationを複数担当へ同時に割り当てません。Figmaを編集するのはexact nodeを割り当てられた`figma_designer`、tracked repository fileの内容を編集するのはteam packetでexact pathを割り当てられた5種のwriter、Issueのtitle、body、Acceptance Criteria、priority、decision history、labelを編集するのは明示的にauthorizedされた`product_owner`だけです。`release_manager`はpublication authorization後に承認済みpathのGit index/history、push、PR metadataだけを変更でき、working-tree fileやIssueは編集しません。既存30 canonical roleを含むこれらの職能以外はadvisory、review、verification、diagnosisだけを行い、tracked file、Issue、Figma、Git、PR、permission、external serviceを変更しません。検証・診断のtask固有成果物はOSの一時ディレクトリへ置き、repositoryへ残しません。必須コマンドが更新する既存ignore対象cacheは許容します。修正はfindingごとに元のwriterへ戻します。

例外はtask-scoped operations roleの公式microCMS MCP操作だけです。`microcms_observer`はread-only advisory/verificationでありexternal mutation権限を持ちません。`microcms_operator`だけは、team packetにexact target、allowed tool、payload digest、expected state、explicit mutation authorizationが明示されている場合に限り、公式MCP endpointの`books` APIへ`microcms_create_content_published`を一回だけ実行できます。この権限は同endpointの`books` APIに対するone-shot操作に限られ、Issue、Figma、Git、PR、permission、別のexternal service、bulk、draft、update、delete、status、reservation、media、Management、memberは変更できません。同じserviceのread-backがexpected/observed stateの`MATCH`になるまでmutationは検証済みとせず、未検証の場合は`BLOCKED`または`UNVERIFIED`として扱います。

writerの標準所有範囲は次のとおりです。実際の編集権限はteam packetのexact path manifestでさらに狭めます。

- `skill_writer`: `.agents/skills/**`
- `documentation_writer`: `README.md`、`AGENTS.md`、`docs/**`、`.codex/agents/**`、`.github/ISSUE_TEMPLATE/**`、`.github/PULL_REQUEST_TEMPLATE/**`、`.github/pull_request_template.md`
- `component_implementer`: `src/components/**`、`src/stories/**`、コンポーネントに局所化されたstyleとtest
- `application_implementer`: `src/app/**`と画面統合test。ただし`src/app/**/actions.ts`などのServer Action moduleは標準所有範囲から除く
- `data_implementer`: `src/lib/**`、`src/types/**`、`src/actions/**`、`microcms/**`、data fixtureとtest。`src/app/**/actions.ts`などのcolocated Server Action moduleはteam packetでexact pathを明示した場合だけ所有する

`.storybook/**`、`.codex/config.toml`、repository rootの設定、共有style、test infrastructure、`package.json`とlockfileなどの横断面は暗黙のownerを持ちません。開発リードが1名のwriterとexact pathを明示します。`package.json`とlockfileを変更する場合は同じwriterへ一体のatomic bundleとして割り当て、片方だけをhandoffしません。

1つのfileを複数writerへ順次再割り当てる必要がある場合、ownership ledgerへ旧owner、新owner、引き継ぎrevisionを記録します。最後に明示されたownerがそのfileの全diffとreview修正を所有し、以前のownerはconsult-onlyになります。ledger更新なしの共同編集は禁止します。writer開始時に存在するdirty diffが自身のexact pathと重ならず、ownership ledgerと凍結入力を変更しない場合は、正当な並行作業として停止理由にしません。pathの重複、ledger不一致、入力contractの汚染がある場合だけ該当writerを停止します。

writer handoffはwriter自身のcommitを前提にしません。`SOURCE_WRITER`、base HEAD、exact path list、各fileのSHA-256、frozen diff revision、実行した検証、既知のrisk、無効化条件を返します。stage、commit、push、PR操作はpublication authorization後の`release_manager`だけが行います。

新しいwriter職能そのものを導入するmigrationに限り、開発リードは凍結Issue、base HEAD、exact path manifest、禁止面、handoff形式を含む期限付きBootstrap Writer Contractを発行できます。Bootstrap writerはそのmanifestだけを編集し、職能定義の追加後は新しい契約へ従い、Git publicationは行いません。

複数領域の変更は、担当を次のWaveで交代させます。

1. Product Intake: 新方向、価値提案、成功指標、設計哲学の変更がある場合だけ、該当する`principal_product_strategist`と`design_philosophy_steward`が独立した上流契約を作る。`product_owner`がユーザー確認済み要件をIssueへ記録し、Issue revisionを凍結して終了する。`requirements_analyst`がそのrevisionを独立監査し、Acceptance Matrixへ変換する。高影響のscope freeze、新screen/modelでは`product_integrity_reviewer`が独立監査する。開発リードは所有範囲と依存順を確定する。複数Waveになる場合、`scrum_master`がslot planとhandoff条件を確認して終了する。
2. Discovery: `requirements_analyst`の完了後、`ux_researcher`がDesign Briefを作り、`software_architect`は既存構造と実装選択肢を調査し、`test_engineer`はbaselineと最小検証行列を準備する。該当するActivation Gateがある場合だけ、`global_context_intelligence_lead`、`innovation_futures_portfolio_lead`、`technology_readiness_lead`、`bibliographic_identity_librarian`、`authority_control_librarian`がそれぞれ独立した契約を先に凍結する。
3. Architecture: `ux_researcher`の完了後、Component、Variant、Tokenまたは再利用構造を変更する場合は`design_system_architect`がComponent Contractを作る。`figma_designer`は既存Figmaの読み取り調査だけを並行できる。
4. Design: 必要なbriefとcontractの確定後、`figma_designer`がFigma実装とDesign Contractを凍結して担当を終了する。`design_critic`が独立批評し、承認されるまでコードの視覚実装へ進まない。指摘修正時は`figma_designer`だけを再起動し、影響範囲を`design_critic`が再確認する。
5. Technical Design: デザイン承認後、`software_architect`が複数案とtradeoff、writer routing、依存順、file planを含むTechnical Planを凍結する。critical dependency、unproven recovery、migration、高risk launchでは`adaptive_resilience_experimenter`が安全な実験契約を作り、Server Action、API、external service、secret、personal data、write、trust-boundary changeでは`security_privacy_risk_steward`がrisk contractを作る。writerは契約確定前に視覚値やAPI境界を推測しない。
6. Build: 割り当てられたwriterが承認済みDesign ContractとTechnical Planからrepository実装を行う。複数writerが必要な場合は原則として`data_implementer`、`component_implementer`、`application_implementer`、`skill_writer`または`documentation_writer`の依存順でhandoffし、独立したexact pathだけを並行できます。非視覚部分が両契約へ依存しない場合だけ、開発リードが所有範囲を分けて先行実装を許可できます。
7. Review: writerの編集凍結後、`code_reviewer`、`test_engineer`、必要な場合だけ`figma_design_qa`を並行起動する。human-error surfaceがある場合は`human_factors_error_specialist`、高影響で証拠が不完全、単一仮説、source相関、説明されない不一致がある場合は`epistemic_red_team_analyst`を起動する。`test_engineer`は計画済み検証を進められるが、開発リードが`code_reviewer`の`QA_HANDOFF`または「追加なし」を転送するまで最終判定しません。追加riskがあれば対象検証だけを継続します。
8. Debug: `test_engineer`が原因不明のFAILと安定再現を返して停止した後、その枠を`debugger`へ交代します。同じ再現に対して両者を同時起動せず、`debugger`は根本原因と最小修正をwriterへ返します。
9. Fix: findingを元のwriterへ戻し、変更で無効になった批評、レビューまたは検証だけを再実行する。複数回の差し戻し、blocker、scope driftがあれば`scrum_master`を再起動する。
10. Delivery: ユーザーまたは開発リードからpublication authorizationを受けた後、`release_manager`が承認済みpathだけをstageし、commit、push、既存Draft PRの更新または新規Draft PR作成、remote整合確認を行う。既存PRが指定されている場合はそのPRだけを更新し、代替PRを作らない。
11. Merge: PR作成、DraftからReadyへの変更、merge authorization、merge-method authorizationは独立した状態です。明示的なユーザー承認を開発リードが記録した場合だけ`release_manager`がマージを実行できます。方法を限定しない「マージ」承認はGitHub merge commitを意味し、開発リードが`merge_method=merge`と記録します。SquashまたはRebaseはユーザーがその方法を別途明示した場合だけ`merge_method=squash|rebase`と記録します。開発リードは観測上のheadとは別にmerge authorizationへexact SHAを`expected_head_sha`として束縛し、`release_manager`は記録済みの方法とSHAをMCP merge mutationへ明示的に渡して、推測やparameter省略をしません。

全担当を機械的に起動しません。各TOMLの`ACTIVATION_GATE`を満たさない職能は`NOT_REQUIRED`として起動しません。Issueを作成・編集しなければ`product_owner`、単一Waveなら`scrum_master`、高影響の製品整合監査が不要なら`product_integrity_reviewer`、調査不要なら`ux_researcher`、書誌同一性や語彙が不変なら2種のlibrarian、Component・Variant・Token・再利用構造へ影響しなければ`design_system_architect`、判断を伴うUI変更でなければ`design_critic`、UI変更がなければ`figma_designer`と`figma_design_qa`、回復性実験が不要なら`adaptive_resilience_experimenter`、技術的tradeoffがない軽微変更なら`software_architect`、repository変更がなければ5種のwriterと`code_reviewer`、証拠・human error・security/privacyの該当riskがなければ対応するassurance職能、検証失敗がなければ`debugger`、GitHubへ公開しなければ`release_manager`を省略します。単一の軽微な読み取り・報告では開発リードが直接処理できますが、Issue、repositoryまたはFigmaを変更する場合は規模にかかわらず対応するexclusive ownerへ割り当てます。

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
