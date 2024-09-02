const BASE_ROUTE = '/collection-config';

const ROUTES = {
  LOGIN: `${BASE_ROUTE}/`,
  HOME: `${BASE_ROUTE}/home`,
  NOTIFICATION_SETTINGS: `${BASE_ROUTE}/notification-settings`,
} as const;

export {ROUTES};
