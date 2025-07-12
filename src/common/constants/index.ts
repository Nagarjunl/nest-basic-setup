// Application-wide constants
export const APP_CONSTANTS = {
  JWT: {
    REQUEST_USER_KEY: 'user',
    AUTH_TYPE_KEY: 'authType',
    ROLES_KEY: 'roles',
  },
  AUTH: {
    DEFAULT_AUTH_TYPE: 'Bearer',
    TOKEN_PREFIX: 'Bearer ',
  },
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 8,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
} as const;

// Request user key for JWT payload
export const REQUEST_USER_KEY = APP_CONSTANTS.JWT.REQUEST_USER_KEY;

// Auth type key for decorators
export const AUTH_TYPE_KEY = APP_CONSTANTS.JWT.AUTH_TYPE_KEY;

// Roles key for role-based authorization
export const ROLES_KEY = APP_CONSTANTS.JWT.ROLES_KEY; 