import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    

    async create({
        name,
        driver_license,
        email,
        password
    }: ICreateUserDTO): Promise<User> {
       const user: User = this.repository.create({
            name,
            password,
            driver_license,
            email
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