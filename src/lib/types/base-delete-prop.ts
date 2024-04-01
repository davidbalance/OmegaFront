export type BaseDeleteProp<T> = {
    target: T;
    onComplete: (id: T) => void;
}