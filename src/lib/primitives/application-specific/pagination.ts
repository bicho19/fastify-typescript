import {BaseValidationException} from '@/lib/primitives/application-specific/exceptions/base-validation-exception';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 30;

export interface PaginatedQuery {
  page?: number;
  perPage?: number;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  firstPage: number;
  lastPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

const getPageAndPerPage = (
    query: PaginatedQuery
): { page: number; perPage: number; totalToSkip: number } => {
  const page = query.page ?? DEFAULT_PAGE;
  let perPage = query.perPage ?? DEFAULT_PER_PAGE;

  if (page < 1) {
    throw new BaseValidationException({
      code: 'PAGINATION.INVALID_PAGE_NUMBER',
      message: 'page number must be greater than 0'
    });
  }

  if (perPage < 0) {
    throw new BaseValidationException({
      code: 'PAGINATION.INVALID_PER_PAGE_NUMBER',
      message: 'per page number must be greater than 0'
    });
  }

  if (perPage > 200) {
    perPage = 200;
  }
  if (perPage === 0) {
    perPage = DEFAULT_PER_PAGE;
  }

  return {page, perPage, totalToSkip: (page - 1) * perPage};
};

const getPagination = (page: number, perPage: number, total: number): Pagination => ({
  page,
  perPage,
  total,
  totalPages: Math.ceil(total / perPage),
  hasMore: page < Math.ceil(total / perPage),
  firstPage: 1,
  lastPage: Math.ceil(total / perPage),
  nextPage: page < Math.ceil(total / perPage) ? page + 1 : null,
  prevPage: page > 1 ? page - 1 : null
});

export {getPagination, getPageAndPerPage};
