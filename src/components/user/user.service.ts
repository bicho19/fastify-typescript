import {CreateUser, GetUser} from '@components/user/user.interface';
import {db} from '@/database';
import {ServerError} from '@exceptions/error';
import {User, users} from './user.model';

class UserService {
  private saltRounds = 10;

  async createUser(createData: CreateUser): Promise<User> {
    const data = await db.insert(users).values({fullName: createData.email, phone: createData.password}).returning();
    if (!data) {
      throw new ServerError();
    }

    return data[0]!;
  }

  public async getUser(getUserData: GetUser) {
    // const findUser = await this.db.user.findUnique({
    //   where: {
    //     email: getUserData.email
    //   }
    // });
    //
    // if (!findUser) {
    //   throw new NotFound('User not found');
    // }

    return {};
  }
}

export default UserService;
