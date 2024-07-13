export interface PaginationResponse<T extends object> {
    data: T[];
    pages: number;
}

export interface PaginationOrder<T extends object> {
    key: keyof T;
    order: "DESC" | "ASC"
}

export interface PaginationRequest<T extends object> {
    page: number;
    limit: number;
    filter?: string;
    order?: PaginationOrder<T>
}