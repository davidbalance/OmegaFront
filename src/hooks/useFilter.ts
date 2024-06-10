import { keys } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";

export type FilterHandlers<T> = {
    setFilterText: (value: string) => void;
}

export type FilterValues<T> = {
    text: string;
}

const useFilter = <T extends object>(initialValues: T[], filterKeys: (keyof T)[] | null = null): [data: T[], handlers: FilterHandlers<T>, values: FilterValues<T>] => {
    const [data, setData] = useState<T[]>(initialValues);
    const [search, setSearch] = useState<string>('');
    const initialValuesRef = useRef<T[]>(initialValues);
    const filterKeysRef = useRef<(keyof T)[] | null>(filterKeys);

    const filter = useCallback(() => {
        if (search === null) {
            setData(initialValuesRef.current);
            return;
        }
        const query = search.toLowerCase().trim();
        const keysToFilter = filterKeysRef.current ?? (keys(initialValuesRef.current[0]) as (keyof T)[]);

        const filtered = initialValuesRef.current.filter(item =>
            keysToFilter.some(key => `${item[key]}`.toLowerCase().includes(query))
        );

        setData(filtered);
    }, [search]);


    useEffect(() => {
        if (initialValuesRef.current !== initialValues) {
            initialValuesRef.current = initialValues;
            setData(initialValues);
        }
    }, [initialValues]);

    useEffect(() => {
        if (filterKeysRef.current !== filterKeys) {
            filterKeysRef.current = filterKeys;
        }
    }, [filterKeys]);

    useEffect(() => {
        filter();
    }, [filter]);

    return [data, { setFilterText: setSearch }, { text: search }];
}

export { useFilter };