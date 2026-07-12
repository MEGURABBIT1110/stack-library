import { MicroCMSConfigurationError } from "@/lib/microcms/client";

type ConnectionErrorProps = { error: unknown };

export function ConnectionError({ error }: ConnectionErrorProps) {
  const isConfigurationError = error instanceof MicroCMSConfigurationError;

  return (
    <main>
      <h1>蔵書データを読み込めませんでした</h1>
      {isConfigurationError ? (
        <>
          <p>microCMSへの接続に必要な環境変数が設定されていません。</p>
          <p>不足している設定: {error.missingVariables.join(", ")}</p>
          <p>.env.localを設定して、開発サーバーを再起動してください。</p>
        </>
      ) : (
        <>
          <p>microCMSとの通信に失敗しました。</p>
          <p>サービスドメイン、APIキー、books APIの公開状態を確認してください。</p>
        </>
      )}
    </main>
  );
}
