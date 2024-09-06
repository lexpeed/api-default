export abstract class ResponsePaginateDto<T> {
  data: T[];

  count: number;

  currentPage: number;

  perPage: number;

  pages: number;

  total: number;

  constructor(data: T[], totalItems: number, page: number, pageSize: number) {
    this.data = data;
    this.count = data.length;
    this.currentPage = page;
    this.perPage = pageSize;
    this.pages = Math.ceil(totalItems / this.perPage);
    this.total = totalItems;
  }
}
