import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";



interface IUsersRespository {
    create(data: ICreateUserDTO): Promise<User>;
    list(): Promise<User[]>;
}

export { IUsersRespository };