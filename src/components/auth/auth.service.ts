import {LoginUser} from '@components/auth/auth.interface';
import {db} from '@/database';
import {User, users} from '@/database/models';

class AuthService {
  async LoginUser(loginData: LoginUser) {
    const result: User[] = await db.select().from(users);


    return result;
  }
}

export default AuthService;
