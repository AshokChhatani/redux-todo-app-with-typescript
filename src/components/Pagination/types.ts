export type PaginationProps = {
  onPageChange: Function;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className: string;
};

export type PaginationHook = {
  currentPage: number;
  totalCount: number;
  siblingCount: number;
  pageSize: number;
};
