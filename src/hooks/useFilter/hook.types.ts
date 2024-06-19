
export type FilterHandlers<T> = {
    setFilterText: (value: string) => void;
}

export type FilterValues<T> = {
    text: string;
}