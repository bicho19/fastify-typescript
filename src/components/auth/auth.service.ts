import {compare} from 'bcrypt';
import {LoginUser} from '@components/auth/auth.interface';
import {NotFound, Unauthorized} from '@exceptions/error';
import {db} from '@/database';
import {User, users} from '../user/user.model';

class AuthService {
  async LoginUser(loginData: LoginUser) {
    const result: User[] = await db.select().from(users);


    return result;
  }
}

export default AuthService;
