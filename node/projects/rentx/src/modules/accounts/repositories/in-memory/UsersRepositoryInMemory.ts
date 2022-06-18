import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create(data: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, {
            ...data
        });
        this.users.push(user);
        return user;
    }

    async list(): Promise<User[]> {
        return this.users;
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(u => u.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find(u => u.id === id);
    }
    
}

export { UsersRepositoryInMemory };