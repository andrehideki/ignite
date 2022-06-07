import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
        const user = await this.usersRepository.create({
            name,
            driver_license,
            email,
            password
        });
        return user;
    }
}

export { CreateUserUseCase };