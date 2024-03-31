export interface IUpdateService<P, M> {
    findAndUpdate(params: P): M | Promise<M>;
    findOneAndUpdate(params: P): M | Promise<M>;
}