export function isMicroCMSConfigured(): boolean {
  return Boolean(import.meta.env.MICROCMS_SERVICE_DOMAIN && import.meta.env.MICROCMS_API_KEY);
}

export function getMicroCMSConfig() {
  const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = import.meta.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    throw new Error('microCMS environment variables are missing.');
  }

  return { serviceDomain, apiKey };
}
