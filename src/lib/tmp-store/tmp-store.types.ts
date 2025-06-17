type Success<T> = {
    isSuccess: true;
    value: T;
}

type Fail = {
    isSuccess: false;
    error: string;
}

export type ResultTmpStore<T> = Success<T> | Fail;

export type RetriveFromTmpStoreDelegate = <T>(key: string) => Promise<ResultTmpStore<T>>;
export type StoreInTmpStoreDelegate = <T extends object>(key: string, value: T, expires: Date) => Promise<ResultTmpStore<string>>;
export type RemoveFromTmpStoreDelegate = (key: string) => Promise<ResultTmpStore<string>>;