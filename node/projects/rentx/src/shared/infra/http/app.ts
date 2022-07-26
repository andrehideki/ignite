import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import "../../container";
import "../typeorm";
import { router } from "./routes";
import { handleError } from "./routes/handleError";


const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.use(handleError);

export { app };

