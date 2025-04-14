export type Order<T extends object> = {
    orderField?: keyof T;
    orderValue?: 'asc' | 'desc';
}

export type Pagination = {
    skip: number;
    limit: number;
}

export interface PaginationResponse<T extends object> {
    data: T[],
    amount: number;
}