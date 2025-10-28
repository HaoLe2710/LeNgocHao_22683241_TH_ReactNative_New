export const API_CONFIG = {
  BASE_URL: 'https://68ca01fdceef5a150f6692a8.mockapi.io',
  ENDPOINTS: {
    TASKS: '/tasks',
  },
  TIMEOUT: 10000, // 10 seconds
};

export const SYNC_CONFIG = {
  AUTO_SYNC_INTERVAL: 5 * 60 * 1000, // 5 minutes
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

export const DATABASE_CONFIG = {
  NAME: 'tasks.db',
  VERSION: 1,
};
