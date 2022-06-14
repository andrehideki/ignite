import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/infra/typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    

    async create({
        id,
        name,
        driver_license,
        email,
        password,
        avatar
    }: ICreateUserDTO): Promise<User> {
       const user: User = this.repository.create({
            id,
            name,
            password,
            driver_license,
            email,
            avatar
       });
       this.repository.save(user);
       return user;
    }
    
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({
            email
        });
        return user;
    }

    list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({
            id
        });
        return user;
    }

}

export { UsersRepository };