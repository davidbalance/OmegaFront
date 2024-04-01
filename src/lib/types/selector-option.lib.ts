export type SelectorOption<T> = {
    key: T,
    label: string;
}

export type FindSelectorOptions<T> = {
    options: SelectorOption<T>[]
}