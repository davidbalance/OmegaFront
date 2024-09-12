export interface PageMeta {
    page: number;
    take: number;
}

export interface OrderMeta {
    field: string;
    order: 'asc' | 'desc'
}

export interface SearchMeta {
    search: string;
}

export interface FilterMeta extends PageMeta, Partial<OrderMeta>, Partial<SearchMeta> { }

export interface CountMeta extends Partial<SearchMeta>, Omit<PageMeta, 'page'> { }

export interface PageCount {
    pages: number;
}