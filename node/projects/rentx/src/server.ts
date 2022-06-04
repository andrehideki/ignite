import express from "express";
import "./database";
import "./shared/container";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaagerFile from "./swagger.json";
import { handleError } from "./routes/handleError";



const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaagerFile));

app.use(router);
app.use(handleError);

app.listen(3333, () => console.log("Server is running!"));
