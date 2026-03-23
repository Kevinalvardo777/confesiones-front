const env = import.meta.env

function parseBoolean(value: string | boolean | undefined, fallback: boolean) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    return value === 'true'
  }

  return fallback
}

export const appEnv = {
  appName: env.VITE_APP_NAME ?? 'Confesiones EC',
  apiBaseUrl: env.VITE_API_BASE_URL ?? '/api/v1',
  useMocks: parseBoolean(env.VITE_USE_MOCKS, true),
  mockDelayMs: Number(env.VITE_MOCK_DELAY_MS ?? 450),
  siteUrl: env.VITE_SITE_URL ?? '',
  defaultOgImage: env.VITE_DEFAULT_OG_IMAGE ?? '/og-default.svg',
}
