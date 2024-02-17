import {db} from '@/database';
import {User, users} from '@/database/models';
import {QueryHandler} from '@/lib/generic/cqrs/query-handler';
import {getPageAndPerPage, getPagination} from '@/lib/primitives/application-specific/pagination';
import {GetUsersQuery} from '@components/user/usecases/get-users/get-users-query';
import {GetUsersQueryResponse} from '@components/user/usecases/get-users/get-users-query-response';
import appLogger from '@utils/logger';


class GetUsersQueryHandler implements QueryHandler<GetUsersQuery, GetUsersQueryResponse> {
  async handle(query: GetUsersQuery): Promise<GetUsersQueryResponse> {
    appLogger.info('Fetching users');
    const {page, perPage, totalToSkip} = getPageAndPerPage(query);

    const findUser: User[] = await db.select().from(users);

    return {
      pagination: getPagination(page, perPage, totalToSkip),
      list: findUser
    };
  }
}

export {GetUsersQueryHandler};
