# microCMS role runtime 運用メモ

## 目的と対象

Issue [#56](https://github.com/MEGURABBIT1110/stack-library/issues/56)（凍結: `2026-08-29T04:19:46Z`）に基づき、Stack Library の project-local `microcms_observer` / `microcms_operator` と、実行時の隔離状態を記録する。対象は公式 microCMS MCP の `books` API に限る。

## 設定値（静的に確認した内容）

両 role の共通設定は次のとおり。

- model: `gpt-5.6-luna`
- reasoning: `max`
- sandbox: `read-only`
- MCP endpoint: `https://mcp.microcms.io/mcp/meguru-stack-library`
- bearer token: `bearer_token_env_var = "MICROCMS_API_KEY"`。shell filter はこの変数を除外する。

`microcms_observer` の enabled tools は、次の2つだけである。

```text
microcms_get_list
microcms_get_content
```

`microcms_operator` の enabled tools は、上記2つに `microcms_create_content_published` を加えた3つだけである。create tool は `approval_mode = "prompt"` である。

`.codex/config.toml` は両 role を登録し、それぞれ相対 `config_file`（`agents/operations/microcms-observer.toml` / `agents/operations/microcms-operator.toml`）を参照する。

## 今回の smoke-test（sanitized evidence）

| 項目 | `microcms_observer` | `microcms_operator` |
|---|---|---|
| named custom role dispatch | accepted | accepted |
| ambient MCP tools observed | 401 | 387 |
| microCMS tools observed | none | none |
| effective sandbox | `danger-full-access`（read-only ではない） | `danger-full-access`（read-only ではない） |
| shell-only secret presence | false | false |

上記の secret presence は存在有無だけを確認した結果であり、値・長さ・shell 出力は取得・記録していない。今回、microCMS call、mutation、read-back、repository mutation、外部 content data の取得はいずれも行っていない。

## 診断

公式 microCMS MCP は read/create をサポートしている。今回の問題は API の機能不足ではなく、spawn された parent/runtime が role-local server を mount せず、ambient tools と parent 側の permission を継承したことである。

`bearer_token_env_var` を、根拠なく static `http_headers` や literal interpolation に置き換えてはならない。project-local TOML だけでは、parent の live runtime isolation、effective tool inventory、effective sandbox を保証できない。

## operational activation 前の host/runtime gate

次の全項目が fresh evidence で成立するまで、両 role を operational activation 済みと扱わない。

- trusted な project root session を新規に開始する。
- observer/operator の verification では parent sandbox を `read-only` にする。
- named custom role の provenance が exact であることを確認する。
- role-scoped MCP server と exact allowlist（observer 2 tool、operator 3 tool）を確認し、ambient write-capable MCP がないことを確認する。
- bearer を host 内だけで安全に注入し、shell、model、log から観測できないことを確認する。
- server 欠落、inventory 不一致、secret/auth failure、timeout、unknown response は fail-closed にする。

## live write gate（別の条件）

live write は、上記 gate とは別に、exact `books` target、canonical sanitized payload とその digest、expected state、明示的な one-shot authorization が揃った場合だけ許可する。

- `microcms_create_content_published` は最大1回だけ実行する。
- 同じ service の `microcms_get_content` で read-back する。
- expected state と observed state が exact `MATCH` の場合だけ `VERIFIED` とする。
- unknown または timeout は成功・失敗の根拠にせず、決して retry しない。

## 公式リファレンス

- [microCMS MCP Server](https://document.microcms.io/mcp-server/microcms-mcp)
- [Remote MCP Server](https://blog.microcms.io/remote-mcp-server)
- [ChatGPT subagents configuration](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [ChatGPT config reference](https://learn.chatgpt.com/docs/config-file/config-reference)

## 状態

repository role definitions は静的には整合している。しかし effective runtime wiring は **BLOCKED** であり、live read/write verification は一度も `PASSED` していない。
