import { useCallback, useState } from "react";
import { ListHandler } from "./hook.types";

/**
 * Lista los elementos de un arreglo dado y proveer metodos para su correcta manipulacion.
 * @param initialValues 
 * @returns 
 */
const useList = <T extends object>(initialValues: T[]): [data: T[], handlers: ListHandler<T>] => {
    const [values, setValues] = useState<T[]>(initialValues);

    const override = useCallback((data: T[]) => {
        setValues(data);
    }, []);

    const append = useCallback((data: T) => {
        setValues(prevValues => [...prevValues, data]);
    }, []);

    const remove = useCallback((key: keyof T, value: any) => {
        setValues(prevValues => {
            const updatedValues = prevValues.filter(e => e[key] !== value);
            return updatedValues;
        });
    }, []);


    const update = useCallback((key: keyof T, value: any, newValue: Partial<T>) => {
        setValues(prevValues => {
            const index = prevValues.findIndex(e => e[key] === value);
            if (index === -1) return prevValues;

            const updatedValues = [...prevValues];
            updatedValues[index] = { ...updatedValues[index], ...newValue };
            return updatedValues;
        });
    }, []);
    return [values, { append, remove, update, override }]
}

export { useList }