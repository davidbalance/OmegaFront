export interface ICreateService<T, D> {
    create(value: D): T | Promise<T>
}

export interface IFindService<T> {
    find(): T[] | Promise<T[]>;
}

export interface IFindOneService<T, K> {
    findOne(key: K): T | Promise<T>;
}

export interface IFindOneAndDeleteService<T, K> {
    findOneAndDelete(key: K): void | Promise<void>;
}

export interface IFindOneAndUpdateService<T, K> {
    findOneAndUpdate(key: K, value: Partial<T>): void | Promise<void>;
}

type CrudType<T, K, D> =
    ICreateService<T, D> &
    IFindService<T> &
    IFindOneService<T, K> &
    IFindOneAndUpdateService<T, K> &
    IFindOneAndDeleteService<T, K>;

export interface ICrudService<T, K> extends CrudType<T, K, any> { }