import express from "express";
import cors from "cors";
import router from "@routes/routes";
import { APP_PORT } from "./config";
import { errorHandler } from "./utils/error-handler";
import { DB } from "./database";
import path from "path";

const appServer = express();
const port = APP_PORT;

const corsOptions: cors.CorsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin"],
  credentials: true,
  optionsSuccessStatus: 200,
};

appServer.use(cors(corsOptions));
appServer.use(express.json());
appServer.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
appServer.use(express.urlencoded({ extended: true }));
appServer.use("/api/v1", router);
appServer.use(errorHandler);

DB.sequelize
  .authenticate()
  .then(() => {
    appServer.listen(port, () => {
      console.info(`Server is running`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
