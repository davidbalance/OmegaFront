export interface IDeleteService<P, M>{
    findAndDelete(params: P): M | Promise<M>;
    findOneAndDelete(params: P): M | Promise<M>;
}