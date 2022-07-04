import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user;
    console.log("admin id:", id);
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);
    console.log("admin:", user);
    if (!user.isAdmin) {
        throw new AppError("Users isn't admin!");
    }
    return next();
}