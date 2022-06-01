import express from "express";
import { router } from "./routes";
import { errorRouter } from "./routes/error.router";
import swaggerUi from "swagger-ui-express";
import swaagerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaagerFile));
app.use(router);
app.use(errorRouter);

app.listen(3333, () => console.log("Server is running!"));