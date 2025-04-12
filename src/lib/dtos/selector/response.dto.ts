export type SelectorOption<T> = {
    key: T,
    label: string;
}

export type GetSelectorOptionResponseDto<T> = {
    options: SelectorOption<T>[]
}