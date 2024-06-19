
export type SortHandlers<T> = {
    sortBy: (key: keyof T | null) => void;
}

export type SortValues<T> = {
    sortBy: keyof T | null;
    direction: boolean;
}