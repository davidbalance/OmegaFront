export * from './base.type';
export * from './hoc.type';

export interface ListElement<T> {
    key: keyof T;
    name: string;
}