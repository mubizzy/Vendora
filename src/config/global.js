// Environment variables imported from .env.* file
module.exports = {
  // app
  ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8003,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  ADMIN_ORIGIN: process.env.ADMIN_ORIGIN,
  APP_NAME: process.env.APP_NAME,
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
  API_URL: process.env.API_URL,

  // password
  PASSWORD_SALT: process.env.PASSWORD_SALT || 12,

  // jwt
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRED_IN:
    parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRED_IN, 10) || 3600,
  JWT_REFRESH_TOKEN_EXPIRED_IN:
    parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRED_IN, 10) || 31536000,

  // redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || null,
  REDIS_URL: process.env.REDIS_URL,

  // sendgrid
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  MAIL_FROM: process.env.MAIL_FROM,

  // upload
  uploadDir: process.env.UPLOAD_DIR,

  // logs
  logDir: process.env.LOG_DIR,
};
