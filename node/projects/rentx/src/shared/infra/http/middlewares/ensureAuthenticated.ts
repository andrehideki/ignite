import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new AppError("Token missing", 401);
    try {
        const [, token] = authHeader.split(" ");
        const { sub: userId } = verify(token, process.env.SECRET) as IPayload;
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(userId);
        if (!user) throw new AppError("Users does not exists", 401);
        request.user = {
            id: userId
        };
        next();
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
}