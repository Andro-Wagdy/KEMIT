
export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  filterType?: string;
  filterValue?: string;
  sortType?: string;

  from?: number;
  to?: number;

}
export class PaginationResult<T>
{
  result?: T;
  pagination?: Pagination;

}
