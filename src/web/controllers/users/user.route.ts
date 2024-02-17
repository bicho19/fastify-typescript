import {GetUserSchema} from '@/web/controllers/users/api-contract/get-users';
import UserController from '@/web/controllers/users/users.controller';
import {Routes} from '@interfaces/routes.interface';
import {FastifyInstance, RouteOptions} from 'fastify';

class UserRoute implements Routes {
  public path = '/users';

  public userController = new UserController();

  public initializeRoutes(fastify: FastifyInstance, opts: RouteOptions, done: () => void) {
    fastify.route({
      method: 'get',
      url: this.path,
      schema: GetUserSchema,

      // preHandler: fastify.authenticateUser,
      handler: this.userController.getUsers
    });
    done();
  }
}

export default UserRoute;
