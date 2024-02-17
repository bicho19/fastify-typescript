import {GetUsersRequest} from '@/web/controllers/users/api-contract/get-users';
import {GetUsersQueryHandler} from '@components/user/usecases/get-users/get-users-query-handler';
import {FastifyReply} from 'fastify';

class UserController {
  public getUsers = async (request: GetUsersRequest, reply: FastifyReply) => {
    const test = request.query;

    return new GetUsersQueryHandler().handle({});
  };
}

export default UserController;
