export const PRODUCT_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/product/"
    : "//localhost:3000/api/product/";

export const USER_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/user/"
    : "//localhost:3000/api/user/";

export const AUTH_REGISTER_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/auth/register/"
    : "//localhost:3000/api/auth/register/";

export const AUTH_LOGIN_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/auth/register/"
    : "//localhost:3000/api/auth/login/";
