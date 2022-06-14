import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import "dotenv/config";

import { CreateUserUseCase } from "@modules/accounts/usecases/CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/usecases/AthenticateUser/AuthenticateUserUseCase";

let usersRepository: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
describe("AuthenticateUserUseCase", () => {

    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepository);
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    });
    it("Should be able to authenticate a user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "1234",
            name: "user"
        };
        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate a non existing user", async () => {
        await expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@mail.com",
                password: "1234"
            });    
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to authenticate a user", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "000123",
                email: "user@test.com",
                password: "1234",
                name: "user"
            };
            await createUserUseCase.execute(user);
            const result = await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorect password"
            });
            expect(result).toHaveProperty("token");
        }).rejects.toBeInstanceOf(AppError);
    });
});