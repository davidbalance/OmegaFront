export enum PaginationOrderEnum {
    DESC = 'DESC',
    ASC = 'ASC'
}

export interface PaginationOrder<T extends object> {
    key: keyof T;
    order: PaginationOrderEnum;
}

export interface PaginationRequest<T extends object> {
    page: number;
    limit: number;
    filter?: string;
    order?: PaginationOrder<T>;
}

export interface PaginationResponse<T extends object> {
    pages: number;
    data: T[];
}