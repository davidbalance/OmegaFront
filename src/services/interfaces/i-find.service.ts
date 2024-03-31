export interface IFindService<P, M> {
    find(): M[] | Promise<M[]>;
    find(params: P): M[] | Promise<M[]>;
    findOne(params: P): M | Promise<M>;
}