import { config } from "dotenv";
config({ path: ".env" });

export const {
  APP_PORT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRED,
  JWT_REFRESH_EXPIRED,
} = process.env;

export const {
  DB_NAME_SQLITE,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
} = process.env;
