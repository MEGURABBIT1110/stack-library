# AGENTS.md

## Project

このリポジトリは「Stack Library / 技術書ライブラリ」の実装リポジトリです。

一般的な読書記録サービスではなく、技術書の蔵書管理を中心に実装してください。
topics、notes、knowledge map、学習ルートはMVP後の拡張です。

## Required reading order

作業前に、必要に応じて以下を読んでください。

1. `README.md`
2. `docs/ARCHITECTURE.md`
3. `docs/CONTENT_MODEL.md`
4. `docs/ROUTING.md`

microCMS、型定義、データ取得、モックデータを触る場合は `docs/CONTENT_MODEL.md` を必ず確認してください。

ページ追加・URL設計・静的生成を触る場合は `docs/ROUTING.md` を必ず確認してください。

## Implementation stack

- Next.js App Router を使う
- microCMS をコンテンツ管理に使う
- TypeScript を使う
- Book FormからNext.js Server Action経由でmicroCMSへ登録する
- microCMSのAPIキーはサーバー側だけで扱う
- ログイン、管理画面、AI推薦、外部サービス連携はMVPでは実装しない

## MVP

MVPは以下の3画面に限定します。

1. Book List: `/`
2. Book Detail: `/books/[contentId]`
3. Book Form: `/books/new`

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
- `docs/ARCHITECTURE.md`
- `docs/CONTENT_MODEL.md`
- `docs/ROUTING.md`

大きな方針変更が必要な場合は、実装前に理由を説明してください。
