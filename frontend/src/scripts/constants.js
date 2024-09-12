const isProduction = process.env.NODE_ENV === 'production';

export const BACKEND_ROUTE = isProduction
  ? "https://comiteseguridad-backend.onrender.com"
  : "http://localhost:5000";
export const MAX_PRODUCT_AMOUNT = 5;
export const DELIVERY_FEE = 3000;
