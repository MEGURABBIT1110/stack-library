# AGENTS.md

## Project

このリポジトリは「Stack Library / 技術書ライブラリ」の実装リポジトリです。

一般的な読書記録サービスではなく、技術書の蔵書管理を中心に実装してください。
topics、notes、knowledge map、学習ルートはMVP後の拡張です。

## Required reading order

作業前に、以下を順番に確認してください。

1. `README.md`
2. `docs/DEVELOPMENT.md`
3. `docs/ARCHITECTURE.md`
4. 必要に応じて `docs/CONTENT_MODEL.md` または `docs/ROUTING.md`

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

新しい画面・コンポーネント・データモデルを追加する場合は、必要に応じて以下のドキュメントも更新してください。

- `README.md`
- `docs/DEVELOPMENT.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTENT_MODEL.md`
- `docs/ROUTING.md`

大きな方針変更が必要な場合は、実装前に理由を説明してください。

実装後は、変更範囲に応じて最低限以下を確認してください。

- `npm run lint`
- `npm run build`
- 変更した画面のLight / Dark、Desktop / Mobile
- キーボード操作とフォーカス表示
- 関連ドキュメントとの整合
