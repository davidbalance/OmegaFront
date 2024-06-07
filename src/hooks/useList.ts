import { useCallback, useEffect, useState } from "react";

export type ListHandler<T> = {
    append: (data: T) => void;
    remove: (index: number) => void;
    update: (index: number, value: T) => void;
    override: (data: T[]) => void;
}

const useList = <T extends object>(initialValues: T[]): [data: T[], handlers: ListHandler<T>] => {
    const [values, setValues] = useState<T[]>(initialValues);

    const override = (data: T[]) => {
        setValues(data);
    }

    const append = useCallback((data: T) => {
        setValues([...values, data]);
    }, [values]);

    const remove = useCallback((index: number) => {
        const filtered: T[] = [...values.slice(0, index), ...values.slice(index + 1)];
        setValues(filtered);
    }, [values]);

    const update = useCallback((index: number, newValue: T) => {
        setValues(prevValues => {
            const updatedValues = [...prevValues];
            updatedValues[index] = newValue;
            return updatedValues;
        })
    }, [values]);
    return [values, { append, remove, update, override }]
}

export { useList }