export interface IFindFile<P> {
    findFile(params: P): any | Promise<any>;
}