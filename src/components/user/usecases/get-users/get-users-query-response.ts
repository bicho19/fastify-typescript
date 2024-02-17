import {User} from '@/database/models';
import {Pagination} from '@/lib/primitives/application-specific/pagination';

export interface GetUsersQueryResponse {
  pagination: Pagination;
  list: User[];
}
