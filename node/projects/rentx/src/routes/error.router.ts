import { Router } from "express";

const errorRouter = Router();
errorRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(400).send({ error: err.message });
});


export { errorRouter };