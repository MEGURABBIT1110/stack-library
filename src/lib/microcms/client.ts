import "server-only";

import { createClient } from "microcms-js-sdk";

type MicroCMSClient = ReturnType<typeof createClient>;

export class MicroCMSConfigurationError extends Error {
  constructor(public readonly missingVariables: string[]) {
    super(`microCMSの接続設定が不足しています: ${missingVariables.join(", ")}`);
    this.name = "MicroCMSConfigurationError";
  }
}

let client: MicroCMSClient | undefined;

export function getMicroCMSClient(): MicroCMSClient {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  const missingVariables = [
    !serviceDomain && "MICROCMS_SERVICE_DOMAIN",
    !apiKey && "MICROCMS_API_KEY",
  ].filter((value): value is string => Boolean(value));

  if (!serviceDomain || !apiKey) {
    throw new MicroCMSConfigurationError(missingVariables);
  }

  client ??= createClient({ serviceDomain, apiKey });
  return client;
}
