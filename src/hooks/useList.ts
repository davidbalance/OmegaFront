import { useCallback, useEffect, useState } from "react";

type ListHandler<T> = {
    append: (data: T) => void;
    remove: (index: number) => void;
    update: (index: number, value: T) => void;
}

const useList = <T extends object>(initialValues: T[]): [data: T[], handlers: ListHandler<T>] => {
    const [values, setValues] = useState<T[]>(initialValues);

    const append = useCallback((data: T) => {
        setValues([...values, data]);
    }, [values]);

    const remove = useCallback((index: number) => {
        const filtered: T[] = [...values.slice(0, index), ...values.slice(index + 1)];
        setValues(filtered);
    }, [values]);

    const update = useCallback((index: number, newValue: T) => {
        const copied = [...values];
        copied[index] = newValue;
        setValues(copied);
    }, [values]);
    return [values, { append, remove, update }]
}

export { useList }