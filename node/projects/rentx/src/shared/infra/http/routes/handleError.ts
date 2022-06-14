import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

const handleError = (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error.stack);
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message
        });
    }
    return response.status(500).send({ 
        status: "error",
        error: `Internal server error: ${error.message}` 
    });
};


export { handleError };