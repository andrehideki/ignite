import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRespository } from "../IUsersRepository";

class UsersRepository implements IUsersRespository {

    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async create({
        name,
        username,
        driver_license,
        email,
        password
    }: ICreateUserDTO): Promise<User> {
       const user: User = this.repository.create({
            name,
            username,
            password,
            driver_license,
            email
       });
       return user;
    }

    list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}

export { UsersRepository };