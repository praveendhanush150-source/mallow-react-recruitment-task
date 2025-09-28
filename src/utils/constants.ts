// Constants used throughout the application
export const API_BASE_URL = 'https://reqres.in/api';

export const DEFAULT_PAGE_SIZE = 6;

export const VIEW_MODES = {
  LIST: 'list',
  CARD: 'card',
} as const;

export const DEFAULT_LOGIN_CREDENTIALS = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
};

export const ROUTES = {
  LOGIN: '/login',
  USERS: '/users',
  NOT_FOUND: '*',
} as const;
