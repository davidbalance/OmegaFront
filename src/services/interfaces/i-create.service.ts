export interface ICreateService<P, M> {
    create(params: P): M | Promise<M>
}