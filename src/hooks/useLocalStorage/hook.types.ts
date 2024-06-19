
export type LocalStorageHookHandler<T> = {
    save: (value: T) => void;
    remove: () => void;
}

export type LocalStorageHookResult<T> = [value: T, handlers: LocalStorageHookHandler<T>]