import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../../../shared/infra/typeorm/entities/User";



interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    list(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository };