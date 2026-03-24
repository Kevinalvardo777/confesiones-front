import '@testing-library/jest-dom';
import { afterEach, beforeEach, vi } from 'vitest';

beforeEach(() => {
  // Keep API tests deterministic and isolated from local .env values.
  vi.stubEnv('VITE_USE_MOCKS', 'true');
  vi.stubEnv('VITE_API_BASE_URL', '/api/v1');
  vi.stubEnv('VITE_MOCK_DELAY_MS', '0');
});

afterEach(() => {
  vi.unstubAllEnvs();
});
