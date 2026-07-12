# Stack Library

Stack Library は、技術書の蔵書管理を中心にした個人用ライブラリアプリです。

一般的な読書記録サービスではなく、「どの技術書を所有しているか」「積読・読書中・参照用などの状態は何か」「実務で参照しやすい情報は何か」を整理することをMVPの中心にします。

## Current MVP

現在のMVPは、Next.js + microCMS を前提にした3画面です。

1. Book List
2. Book Detail
3. Book Form

Book Form から Next.js Server Action 経由で microCMS の `books` API に登録します。microCMS のAPIキーはサーバー側だけで扱い、ブラウザへ公開しません。

## MVP Scope

MVPで扱うもの:

- 技術書の一覧表示
- 技術書の詳細表示
- 技術書の新規登録フォーム
- 積読、読書中、読了、参照用などの状態管理
- Book List 内での状態別絞り込み
- microCMS `books` API との連携

MVPでは扱わないもの:

- サイドバー
- 積読専用ページなど、状態別の独立ページ
- topics
- notes
- knowledge map
- 学習ルート
- ログイン
- AI推薦
- 一般的な読書レビュー機能

topics、notes、knowledge map、学習ルートは将来拡張として扱います。

## Documentation

- [Content Model](./docs/CONTENT_MODEL.md)
- [Routing](./docs/ROUTING.md)
- [Architecture](./docs/ARCHITECTURE.md)

## Implementation Status

このリポジトリはNext.js用に初期化済みです。旧Astro構成、旧6画面構成、旧ナレッジマップ構想は現在のMVP仕様としては採用しません。

Next.jsの基本依存だけを導入しており、ページとmicroCMS連携はまだ実装していません。
