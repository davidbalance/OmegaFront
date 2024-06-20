import { useCallback, useEffect, useState } from "react"
import { SortHandlers, SortValues } from "./hook.types";

const useSort = <T extends object>(initialValues: T[]): [data: T[], handlers: SortHandlers<T>, values: SortValues<T>] => {
    const [data, setData] = useState<T[]>(initialValues);
    const [sortBy, setSortBy] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<boolean>(false);

    const sort = useCallback(() => {
        if (sortBy === null) {
            setData(initialValues);
            return;
        }
        const sorted = [...initialValues].sort((a, b) => {
            const aValue: string = JSON.stringify(a[sortBy]);
            const bValue: string = JSON.stringify(b[sortBy]);
            return sortDirection
                ? bValue.toLocaleLowerCase().localeCompare(aValue)
                : aValue.toLocaleLowerCase().localeCompare(bValue);
        });
        setData(sorted);
    }, [initialValues, sortDirection, sortBy]);

    const handleSort = (key: keyof T | null) => {
        const direction = key === sortBy ? !sortDirection : false;
        setSortBy(key);
        setSortDirection(direction);
    }

    useEffect(() => {
        sort();
        return () => { }
    }, [sort]);

    return [data,
        { sortBy: handleSort },
        { sortBy: sortBy, direction: sortDirection }
    ]
}

export { useSort };