import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.find({
      where: {
        id: user_id
      }, relations: ["games"]
    });
    if (!user) throw new Error('User not found');
    return user[0];
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("select * from users order by first_name"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query(`select * from users where upper(first_name) = upper('${first_name}') and upper(last_name) = upper('${last_name}') `); // Complete usando raw query
  }
}
