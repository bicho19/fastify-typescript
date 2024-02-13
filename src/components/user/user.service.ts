import {CreateUser, GetUser} from '@components/user/user.interface';
import {db} from '@/database';
import {NotFound, ServerError} from '@exceptions/error';
import {User, users} from '@/database/models';
import {eq} from 'drizzle-orm';

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
    const findUser = await db.select().from(users).where(eq(users.fullName, getUserData.email));

    if (!findUser) {
      throw new NotFound('User not found');
    }

    return {};
  }
}

export default UserService;
