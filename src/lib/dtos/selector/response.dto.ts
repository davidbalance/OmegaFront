export type SelectorOption<T> = {
    key: T,
    label: string;
}

export type GETSelectorOptionResponseDto<T> = {
    options: SelectorOption<T>[]
}