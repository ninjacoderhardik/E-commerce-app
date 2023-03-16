const Base_URL = 'http://35.154.91.76/admin/api/';

export default URL = {
  Base_URL,
  LOGIN: Base_URL + 'auth/login',
  REFRESH_TOKEN: Base_URL + 'auth/refresh',
  LOGOUT: Base_URL + 'auth/logout',
  GET_DASHBOARD: Base_URL + 'dashboard',
  GET_CATEGORIES: Base_URL + 'category-list',
  GET_SUB_CATEGORIES: Base_URL + 'sub-category-list/',
  GET_PRODUCTS: Base_URL + 'product-list',
  ORDER: Base_URL + 'order',
  GET_ORDER: Base_URL + 'order-list/',
  ORDER_PDF: Base_URL + 'order-pdf/',
};
