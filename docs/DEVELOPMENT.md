# DEVELOPMENT.md

Stack Libraryの開発ワークフローです。人間、Codex、その他の自動化を区別せず、変更の種類に基づいて同じルールを適用します。

## 基本方針

- `main`は常に統合可能な状態に保つ
- `main`へ直接コミットしない
- GitHub Issueを作業記録の起点にする
- 1ブランチ、1目的とする
- 短命な作業ブランチからPRを作る
- 原則としてSquash mergeし、`main`の履歴をConventional Commitsで揃える
- 未完了の別作業を、無断で現在のブランチへ混ぜない

長期の`develop`ブランチや、担当者・ツール名を表すブランチは作りません。

## 作業開始

最初にGitHub Issueを作り、目的、対応範囲、完了条件を記録します。重複Issueがないことも確認します。

Issue作成後、作業ツリーがクリーンであることを確認してから、最新の`main`を起点にIssue番号を含むブランチを作ります。

```bash
git status --short --branch
git switch main
git pull --ff-only origin main
git switch -c feature/12-book-form
```

未コミット差分がある場合は、別作業か現在の作業かを確認します。判断できない差分をstash、破棄、コミットしてはいけません。

## Codex chat lifecycleと引き継ぎ

Codexによる変更は、原則として`1 GitHub Issue / 1 coherent outcome / 1 parent Codex chat`で進めます。requirements、implementation、review、fix、delivery、mergeは職能ごとの別chatへ分断せず、同じIssue、branch、outcomeを所有するparent chatで継続します。parent chatは必要な専門職をbounded internal subagentとして起動し、user-visible chatを職能ごとに増やしません。

| 状況 | Chatの扱い |
|---|---|
| 同じIssue、branch、coherent outcomeを継続 | requirementsからmergeまで同じparent chatを使う |
| 別のIssueまたは別のoutcome | 新しいparent chatを作る |
| shared contextからgenuine alternativeを比較 | forkできる。単なる工程分割、職能分割、引き継ぎには使わない |
| 軽量なread-only question、説明、state check、report | Issueを省略できる。mutation開始前にIssue、outcome、branch、ownershipを確定する |
| merge後のfollow-up change | 完了したparent chatをarchive candidateとし、通常は新しいIssueとparent chatを使う |

同じ論理作業でreview findingやvalidation failureが出ても、新しいparent chatへ移さず、findingを元writerへ返して同じparent chat内のFix Waveで解消します。publication authorizationは、承認済みpathのstage、commit、push、Draft PRの作成・更新の許可であり、merge authorizationではありません。mergeには引き続き別の明示的user承認が必要です。

新しいparent chatは、root `AGENTS.md`と`.codex/config.toml`をdiscoverできるよう、同じlocal projectを開き、primary repositoryのproject rootから開始します。並行する複数chatがtracked fileへ書く必要がある場合は、chatごとに別worktree、別branch、exact path ownershipを割り当てます。同じbranchまたは同じpathへ複数chatから書いてはいけません。read-only chatはこのwrite分離要件の対象外です。

### New-chat handoff packet

別Issue、別outcome、または環境上の理由で新しいparent chatへ移るときは、会話履歴だけに依存せず、次のpacketを渡します。値がない項目も省略せず`none`または`absent`と記録します。

- Issue URL/numberとfrozen Issue revision
- branch、base commit、head commit
- dirty diffの有無、exact changed paths、各diffのowner
- exact scope、coherent outcome、non-goals
- owner、allowed write surfaces、forbidden write surfaces、path単位のownership ledgerとそのrevision
- frozen Acceptance Matrix、Design Brief、Component Contract、Design Contract、Design Critic Approval、Technical Planなど、適用するcontractとrevision
- 完了済みvalidation、validation input revision、結果、再利用条件とinvalidation conditions
- Figma file/node ID、対象file、theme、viewport、state
- publication authorizationの有無、独立したmerge authorizationの有無
- 既存Draft PRのURL/numberと状態
- 次のdownstream handoff、未解決finding、stop condition

受け取ったparent chatは、branch、base/head、dirty diff、ownership ledger、frozen input revisionがpacketと一致することをread-onlyで確認してから作業を続けます。不一致、同じbranch/pathへの別chatのwrite、凍結入力の更新があれば停止し、`development_lead`へ返します。

ChatGPT、Codex Local、Codex Worktree、Codex Cloudは、会話履歴や未共有のファイルを自動的には引き継ぎません。会話を正本にせず、GitHub IssueとDraft PRを共有状態として使用します。

作業依頼には`.github/ISSUE_TEMPLATE/task.yml`を使用し、最低限以下を記録します。

- 背景と解決する問題
- 完了時のゴール
- 対応範囲と対象外
- 客観的な完了条件
- 実行環境
- 制約と変更してはいけないもの
- 検証計画
- 参照資料と引き継ぎ元
- 未確定事項

通常の実装は`Codex Local`を選択します。WorktreeまたはCloudを使う場合は、ローカルにしか存在しないファイルや未pushコミットを前提にせず、必要な入力と成果物の受け渡し方法をIssueへ記録します。

推奨する流れ:

```txt
ChatGPTで要件を整理
  -> GitHub Issueを作成
  -> CodexがIssue番号付きブランチで実装
  -> 早い段階でDraft PRを作成
  -> コミット、検証結果、残課題をDraft PRへ反映
  -> ChatGPTまたは人間がIssueとDraft PRを確認
  -> 明示的な承認後にマージ
```

Issueは「なぜ、何を、どこまで行うか」の正本です。Draft PRは「現在どのコードがあり、何を検証し、何が残っているか」の正本です。作業中に決まった重要事項は、会話だけに残さずIssueの決定ログまたはDraft PR本文へ反映します。

## ブランチ命名

形式は`<category>/<issue-number>-<short-summary>`です。`issue-number`には起点となるGitHub Issue番号を使い、`short-summary`は英小文字とハイフンで簡潔に記述します。

| Category | 用途 | 例 |
|---|---|---|
| `feature/` | 利用者に見える機能追加 | `feature/12-book-form` |
| `fix/` | 不具合修正 | `fix/18-theme-focus-ring` |
| `docs/` | ドキュメントだけの変更 | `docs/23-repository-workflow` |
| `refactor/` | 振る舞いを変えない構造改善 | `refactor/27-book-normalizer` |
| `test/` | テストの追加・修正 | `test/31-book-card-stories` |
| `chore/` | 依存更新や保守作業 | `chore/35-update-next` |
| `ci/` | CI/CDの変更 | `ci/42-add-quality-checks` |

Codexや自動化による作業でも`agent/`は使いません。誰が作業したかではなく、何を変更するかを名前にします。

緊急修正も通常は`fix/`を使います。運用上必要になるまでは`hotfix/`、`release/`、`develop`を増やしません。

## コミット

[Conventional Commits 1.0.0](https://www.conventionalcommits.org/ja/v1.0.0/)に準拠します。

```txt
<type>[optional scope][!]: <description>
```

主に使用するtype:

| Type | 用途 |
|---|---|
| `feat` | 機能追加 |
| `fix` | 不具合修正 |
| `docs` | ドキュメントだけの変更 |
| `refactor` | 振る舞いを変えない構造改善 |
| `test` | テストの追加・修正 |
| `chore` | 保守作業 |
| `build` | ビルドや依存関係の変更 |
| `ci` | CI/CDの変更 |
| `perf` | 性能改善 |
| `revert` | 既存コミットの取り消し |

例:

```txt
feat(book-form): add ISBN lookup
fix(book-card): preserve the full cover image
docs(workflow): define branch and commit rules
refactor(books): separate normalization from queries
```

- typeは小文字にする
- scopeは任意だが、対象が明確になる場合は付ける
- descriptionは変更内容を命令形で簡潔に書く
- 破壊的変更は`!`または`BREAKING CHANGE:`フッターで示す
- 1コミットには、説明可能な1つの変更単位だけを含める

## Pull Request

PRは`main`をbaseにします。タイトルもConventional Commits形式を推奨します。

PR本文には最低限、以下を記載します。

- 変更内容
- 変更理由
- 起点となるIssueへの参照
- 影響範囲
- 確認方法と結果
- UI変更がある場合は対象画面と表示条件
- 未対応事項や既知の制約

対応完了時にIssueを自動で閉じるため、PR本文へ次の形式を記載します。

```txt
Closes #12
```

原則としてSquash mergeします。Squash後のコミットメッセージがConventional Commits形式になるよう、PRタイトルを整えます。

### GitとGitHub serviceの操作境界

local repositoryとGitHub serviceの操作を区別します。

| 対象 | 標準手段 | 例 |
|---|---|---|
| local repositoryとGit transport | local `git` | status、diff、branch、stage、commit、push、local/remote ref alignment |
| GitHub service | callableなGitHub MCP-backed tool | Issue、PR、review、check、release、mergeのread/mutation |

GitHub MCPで必要なGitHub service操作がcallableなら、GitHub CLI（`gh`）の認証確認や`gh auth login`を作業の前提にしません。`git push`はlocal Gitのpublication操作であり、GitHub MCP invocationやGitHub serviceのread-back evidenceではありません。

必要な特定操作に対応するcallableなGitHub MCP-backed toolがtool search後もなく、その操作が契約上MCP必須でない場合に限り、`gh`を使用できます。その場合はMCP gap、tool search、操作の必要性、exact `gh` operationと結果をhandoffへ記録します。required MCP operationがunavailable、undiscoverable、denied、または失敗した場合、`gh`、browser、direct APIへfallbackせず`BLOCKED`とします。`gh`の結果をMCP invocation、MCP evidence、MCP read-backとして扱いません。

## 検証

検証は変更量ではなく、失敗した場合の影響範囲で選びます。途中の高速フィードバックと、PR完成前の最終ゲートを分離します。

| 区分 | 主な変更 | 作業中の必須確認 | PR完成前の追加確認 |
|---|---|---|---|
| A: 軽微 | 文書、文言、命名、Story階層、挙動を変えない移動 | 差分、参照切れ、リンク、用語・見出し構造 | コードを含まなければbuild不要 |
| B: 局所 | Primitive、単一コンポーネント、局所CSS、Story | `npm run lint`、`npx tsc --noEmit`、対象Storyまたは対象Figmaノード | コードを含むPRとして`npm run build`を一度実行 |
| C: 画面・基盤 | ページ、主要レイアウト、ルーティング、データモデル、microCMS、依存・設定 | `npm run lint`、`npm run build`、影響する統合状態 | 最終差分で影響画面とアクセシビリティを再確認 |

区分AでもTypeScriptのimportやファイル配置を変更した場合は、参照切れを検出するため`npx tsc --noEmit`を実行します。

`next build`はTypeScript検査を含みます。同じ差分に対して`npx tsc --noEmit`と`npm run build`を連続して実行せず、前者は作業中、後者はPR完成前または区分Cの確認に使います。

コードを含むPRは、Ready化またはマージ前の最終差分に対して以下を一度実行します。

```bash
npm run lint
npm run build
```

### UI確認の選び方

画面・ページ領域・レスポンシブレイアウトを変更した場合は、影響するDesktop / Mobile・Light / Darkを確認します。

独立したPrimitiveや単一コンポーネントでは、対象Storyと対象Figmaノードを確認します。theme・viewportに依存しないことをCSS、Auto Layout、semantic variable bindingなどの構造で確認できる場合、同じ表示を機械的に4通り取得しません。

変更の性質に応じて、以下から影響する項目だけを選びます。

- Light / Dark
- Desktop / Mobile
- コンテナ幅が狭い状態
- キーボード操作
- `:focus-visible`
- 色以外でも理解できる状態表現
- 読み込み中、0件、取得失敗

Figmaを正本とする複数の関連変更は、最後の関連変更後、PR完成前に`figma_design_qa`で一括監査します。画面全体、主要レイアウト、高リスクなアクセシビリティ変更、または明示的に指定された監査は変更時点で実施します。監査後に対象へ影響する変更がなければ再監査しません。

Storybook導入後は、再利用コンポーネントの変更に対応するStoryと必要なinteraction testを含めます。テーマはglobal、画面幅はviewportまたはcontainerで検証し、見た目の違いだけをComponent propsへ増やしません。

Storybookのローカル確認には開発サーバーを使います。

```bash
npm run storybook
```

静的ビルドはStorybookを公開する、またはCIで成果物を検証する要件が明示された場合だけ実行します。通常のローカル開発やコンポーネント変更の完了条件には含めません。

```bash
npm run build-storybook
```

Storyは`Foundations / Components / Patterns`の責務に沿って配置します。microCMSへ直接接続せず、`Book`型に準拠したfixtureで通常、欠損、長文などの状態を再現します。

### 検証結果の再利用

同じ論理タスク内の成功結果は、次の条件をすべて満たす場合に再利用できます。

- 検証対象のファイルとその依存先を変更していない
- lint、TypeScript、Next.js、Storybook、テストの設定を変更していない
- `package.json`やlockfileを変更していない
- 検証後にmerge、rebase、依存更新を行っていない
- 実行環境や必要な環境変数が変わっていない

条件を満たさなくなった場合も、すべてをやり直さず、影響する検証だけを再実行します。`git diff --check`、同じスクリーンショット取得、同じlintなどを、根拠なく途中で反復しません。

ドキュメントだけの変更では、リンク、用語、見出し構造、他文書との矛盾を確認します。コードへ影響しない場合、`npm run lint`と`npm run build`は必須ではありません。

## ドキュメントの責務

| 文書 | 責務 |
|---|---|
| `README.md` | プロダクト概要、現在の状態、セットアップ、主要な入口 |
| `AGENTS.md` | エージェントが必ず守るプロジェクト固有の作業契約 |
| `docs/DEVELOPMENT.md` | ブランチ、コミット、PR、検証の共通ルール |
| `docs/ARCHITECTURE.md` | 技術構成、責務分離、コンポーネント設計 |
| `docs/CONTENT_MODEL.md` | microCMSスキーマとTypeScript型 |
| `docs/ROUTING.md` | URL、画面責務、ナビゲーション |

方針を変更した場合は、実装と同じPRで該当文書を更新します。

## Repository writerの所有権

tracked fileの内容は、team packetでexact pathを割り当てられた次のwriterだけが編集します。

| Writer | 標準所有範囲 |
|---|---|
| `skill_writer` | `.agents/skills/**` |
| `documentation_writer` | `README.md`、`AGENTS.md`、`docs/**`、`.codex/agents/**`、Issue/PR template |
| `component_implementer` | `src/components/**`、`src/stories/**`、局所style、component test |
| `application_implementer` | `src/app/**`、画面統合test。ただしcolocated Server Action moduleを除く |
| `data_implementer` | `src/lib/**`、`src/types/**`、`src/actions/**`、`microcms/**`、data fixture/test。`src/app/**/actions.ts`などはexact pathを明示した場合だけ含む |

`.storybook/**`、root設定、共有style、test infrastructureには暗黙のownerを置かず、開発リードが1名を明示します。`package.json`とlockfileは同じwriterがatomic bundleとして扱います。複数領域は原則としてdata、component、application、skill/documentationの依存順でhandoffします。

同じfileの同時編集は禁止します。再割り当て時はownership ledgerへ旧owner、新owner、引き継ぎrevisionを記録し、最後のownerがfile全体のdiffとreview修正を引き受けます。互いに素なexact pathのdirty diffは、ownership ledgerと凍結入力を汚染しない限り並行作業として許容します。writerはstageやcommitを行わず、次をhandoffします。

- `SOURCE_WRITER`
- input Issue revisionとinput contract revision
- base HEADとexact path list
- 各fileのSHA-256とfrozen diff revision
- 変更していない禁止面、検証結果、既知のrisk
- 実際のdownstream contractと無効化条件
- findingを返す`FINDING_RETURN_WRITER`

Git index/historyとpush、およびGitHub上のDraft PR metadataは、publication authorizationを受けた`release_manager`だけが変更します。前者はlocal `git`、後者は上記のGitHub service規則に従います。
