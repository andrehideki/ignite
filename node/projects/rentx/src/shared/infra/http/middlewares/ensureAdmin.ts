import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { createDataSource } from "@shared/infra/typeorm";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user;
    const datasource = await createDataSource();
    const usersRepository = new UsersRepository(datasource);
    const user = await usersRepository.findById(id);
    if (!user.isAdmin) {
        throw new AppError("Users isn't admin!");
    }
    return next();
}