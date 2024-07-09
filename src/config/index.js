const config = {};

config.APP_NAME = process.env.APP_NAME;
config.APP_ENV = process.env.APP_ENV;
config.APP_VERSION = process.env.APP_VERSION;
config.APP_PORT = process.env.APP_PORT;
config.APP_URL = process.env.APP_URL;

config.DB_HOST = process.env.DB_HOST;
config.DB_PORT = process.env.DB_PORT;
config.DB_DATABASE = process.env.DB_DATABASE;
config.DB_USERNAME = process.env.DB_USERNAME;
config.DB_PASSWORD = process.env.DB_PASSWORD;
config.DB_DIALECT = process.env.DB_DIALECT;

config.SESSION_SECRET = process.env.SESSION_SECRET;
export default config;
