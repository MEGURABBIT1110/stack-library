# AGENTS.md

## Project

このリポジトリは「Stack Library / 技術書ライブラリ」の実装リポジトリです。

一般的な読書管理サービスではなく、技術書・技術トピック・読書メモ・実装への気づき・学習ルートを再構成する個人用ナレッジアーカイブとして実装してください。

中心思想は以下です。

- 本棚ではなく、技術知の標本室
- 読書記録ではなく、実装に戻れる知識地図
- 技術書を単なる本ではなく、知識ノードとして扱う

## Required reading order

作業前に、必要に応じて以下を読んでください。

1. `README.md`
2. `docs/DESIGN.md`
3. `docs/CONTENT_MODEL.md`
4. `docs/ROUTING.md`
5. `docs/COMPONENTS.md`

特に、画面・UI・コンポーネントを触る場合は `docs/DESIGN.md` と `docs/COMPONENTS.md` を必ず確認してください。

microCMS、型定義、データ取得、モックデータを触る場合は `docs/CONTENT_MODEL.md` を必ず確認してください。

ページ追加・URL設計・静的生成を触る場合は `docs/ROUTING.md` を必ず確認してください。

## Implementation stack

- Astro を第一候補とする
- microCMS をコンテンツ管理に使う
- TypeScript を使う
- 必要な部分だけ React Island として実装する
- 最初からNext.js前提にしない
- ログイン、管理画面、AI推薦、外部サービス連携はMVPでは実装しない

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

1. 技術書を単なる本ではなく、知識ノードとして扱えているか
2. 日本語で自然に読めるUIになっているか
3. Booklog / Notion / SaaSテンプレートのコピーに見えないか
4. 実装に戻れる情報設計になっているか
5. 再読価値、実務適用度、概念密度、実装接続度を扱えているか
6. 静かで精密なデザインになっているか
7. アクセシビリティを犠牲にしていないか

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
- `docs/DESIGN.md`
- `docs/CONTENT_MODEL.md`
- `docs/ROUTING.md`
- `docs/COMPONENTS.md`

大きな方針変更が必要な場合は、実装前に理由を説明してください。