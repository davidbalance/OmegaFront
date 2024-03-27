export interface ICrudService<T, K> {
    find(): T[] | Promise<T[]>;
    findOne(key: K): T | Promise<T>;
    findOneAndDelete(key: K): void | Promise<void>;
    findOneAndUpdate(key: K, value: T): T | Promise<T>;
}