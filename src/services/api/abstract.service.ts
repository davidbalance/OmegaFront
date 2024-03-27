export abstract class AbstractService<T> {
    constructor(protected readonly endpoints: T) { }
}