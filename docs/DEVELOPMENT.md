# DEVELOPMENT.md

Stack Libraryの開発ワークフローです。人間、Codex、その他の自動化を区別せず、変更の種類に基づいて同じルールを適用します。

## 基本方針

- `main`は常に統合可能な状態に保つ
- `main`へ直接コミットしない
- 1ブランチ、1目的とする
- 短命な作業ブランチからPRを作る
- 原則としてSquash mergeし、`main`の履歴をConventional Commitsで揃える
- 未完了の別作業を、無断で現在のブランチへ混ぜない

長期の`develop`ブランチや、担当者・ツール名を表すブランチは作りません。

## 作業開始

作業ツリーがクリーンであることを確認してから、最新の`main`を起点にブランチを作ります。

```bash
git status --short --branch
git switch main
git pull --ff-only origin main
git switch -c feature/book-form
```

未コミット差分がある場合は、別作業か現在の作業かを確認します。判断できない差分をstash、破棄、コミットしてはいけません。

## ブランチ命名

形式は`<category>/<short-description>`です。`short-description`は英小文字とハイフンで簡潔に記述します。

| Category | 用途 | 例 |
|---|---|---|
| `feature/` | 利用者に見える機能追加 | `feature/book-form` |
| `fix/` | 不具合修正 | `fix/theme-focus-ring` |
| `docs/` | ドキュメントだけの変更 | `docs/repository-workflow` |
| `refactor/` | 振る舞いを変えない構造改善 | `refactor/book-normalizer` |
| `test/` | テストの追加・修正 | `test/book-card-stories` |
| `chore/` | 依存更新や保守作業 | `chore/update-next` |
| `ci/` | CI/CDの変更 | `ci/add-quality-checks` |

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
- 影響範囲
- 確認方法と結果
- UI変更がある場合は対象画面と表示条件
- 未対応事項や既知の制約

原則としてSquash mergeします。Squash後のコミットメッセージがConventional Commits形式になるよう、PRタイトルを整えます。

## 検証

コード変更では、原則として以下を実行します。

```bash
npm run lint
npm run build
```

UI変更では、対象に応じて以下も確認します。

- Light / Dark
- Desktop / Mobile
- コンテナ幅が狭い状態
- キーボード操作
- `:focus-visible`
- 色以外でも理解できる状態表現
- 読み込み中、0件、取得失敗

Storybook導入後は、再利用コンポーネントの変更に対応するStoryと必要なinteraction testを含めます。テーマはglobal、画面幅はviewportまたはcontainerで検証し、見た目の違いだけをComponent propsへ増やしません。

ドキュメントだけの変更では、リンク、用語、見出し構造、他文書との矛盾を確認します。コードへ影響しない場合、`npm run build`は必須ではありません。

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
