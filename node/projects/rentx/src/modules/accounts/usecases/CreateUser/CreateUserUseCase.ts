import { inject, injectable } from "tsyringe";
import { hashSync } from "bcryptjs";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import { AppError } from "@errors/AppError";
@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {}

    async execute({ 
        name,
        driver_license,
        email,
        password }: ICreateUserDTO): Promise<User> {
        const passwordHash = hashSync(password, 8);
        const hasUserWithSameEmail = !!await this.usersRepository.findByEmail(email);
        if (hasUserWithSameEmail) throw new AppError("Email already exists", );
        const user = await this.usersRepository.create({
            name,
            driver_license,
            email,
            password: passwordHash
        });
        return user;
    }
}

export { CreateUserUseCase };