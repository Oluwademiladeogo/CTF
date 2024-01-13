import helmet from "helmet";
import compression from "compression";
import { Express } from "express";
import { config } from "dotenv"

config();

module.exports = function (app: Express) {
  app.use(helmet());
  app.use(compression);
};
