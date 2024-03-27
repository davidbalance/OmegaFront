export interface IConfigurationService<T> {
    initialConfiguration(): T | Promise<T>;
    reloadConfiguration(): T | Promise<T>;
}