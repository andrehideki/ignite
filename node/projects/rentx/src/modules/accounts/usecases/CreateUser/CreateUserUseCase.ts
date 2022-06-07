import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hashSync } from "bcryptjs";
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
        if (hasUserWithSameEmail) throw new Error("Email already exists");
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