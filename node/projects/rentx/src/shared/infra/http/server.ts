import express from "express";
import "reflect-metadata";
import "express-async-errors";
import { router } from "./routes";
import { handleError } from "./routes/handleError";
import "../typeorm";
import "../../container";
import swaggerUi from "swagger-ui-express";
import swaagerFile from "../../../swagger.json";
import "dotenv/config";


const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaagerFile));

app.use(router);
app.use(handleError);

app.listen(process.env.PORT, () => console.log(`Server is running! at: ${process.env.PORT}`));
