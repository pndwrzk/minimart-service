const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const {
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
} = process.env;

module.exports = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  host: DB_HOST,
  dialect :"mysql",
  migrationStorageTableName: "sequelize_migrations",
  seederStorageTableName: "sequelize_seeds",
};
