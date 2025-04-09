export type Result<T> = {
    error: string | null;
    value: T | null;
}

export const getResult = <T>({ error, value }: Result<T>): T => {
    if (error) {
        throw new Error(error);
    }
    if (value === null) {
        throw new Error('Invalid result.');
    }
    return value;
}

export const withResult = <T, P extends any[]>(action: (...params: P) => Promise<T>) =>
    async (...params: P): Promise<Result<T>> => {
        try {
            const value = await action(...params);
            return { error: null, value };
        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message, value: null }
            }
            return { error: 'Unknown Error.', value: null }
        }
    }