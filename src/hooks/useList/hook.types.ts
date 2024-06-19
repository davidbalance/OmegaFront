export type ListHandler<T> = {
    append: (data: T) => void;
    remove: (key: keyof T, value: any) => void;
    update: (key: keyof T, value: any, newValue: Partial<T>) => void;
    override: (data: T[]) => void;
}
