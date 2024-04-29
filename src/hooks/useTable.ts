import { chunk, sort } from "@/lib/utils/search";
import { useEffect, useState } from "react";

export type TableHook<T extends object> = {
    rows: T[],
    total: number,
    sortDirection: boolean,
    page: number,
    search: string,
    sortBy: keyof T | null,
    setSorting: (field: keyof T) => void,
    onSeach: (event: React.ChangeEvent<HTMLInputElement>) => void,
    setPage: (page: number) => void,
    addRow: (row: T) => void;
    removeRow: <K>(field: keyof T, value: K) => void,
    replaceRow: <K>(field: keyof T, key: K, value: T) => void,
    setData: (newData: T[]) => void,
    setPerPage: (newAmount: number) => void
}

export const useTable = <T extends object>(initialData: T[], initialPerPage: number = 5): TableHook<T> => {

    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<T[]>(initialData);
    const [sortedData, setSortedData] = useState<T[]>(initialData);
    const [sortBy, setSortBy] = useState<keyof T | null>(null);
    const [perPage, setPerPage] = useState(initialPerPage);
    const [total, setTotal] = useState<number>(initialData.length / initialPerPage);
    const [activePage, setPage] = useState<number>(1);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    useEffect(() => {
        updateData(initialData);
        return () => { }
    }, [initialData]);


    const setSorting = (field: keyof T): void => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sort(data, { sortBy: field, reversed, search }));
    };

    const onSeach = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sort(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const removeRow = <K>(field: keyof T, value: K) => {
        const newData = sortedData.filter((row) => typeof row[field] === typeof value && row[field] !== value);
        setSortedData(newData);
    }

    const replaceRow = <K>(field: keyof T, key: K, value: T) => {
        const currentIndex = sortedData.findIndex((row) => typeof row[field] === typeof key && row[field] === key);
        if (currentIndex < 0) return;
        const newData = data;
        newData[currentIndex] = value;
        setSortedData(newData);
    }

    const updateData = (newData: T[]): void => {
        setData(newData);
        setSortedData(newData);
        setTotal(newData.length / perPage);
    }

    const updatePerPage = (newAmount: number) => {
        setPerPage(newAmount);
        setTotal(data.length / newAmount);
    }

    const addRow = (row: T) => {
        setData([...data, row]);
        setSortedData([...sortedData, row]);
    }

    return {
        rows: chunk(sortedData, perPage)[activePage - 1] || [],
        total: total,
        sortDirection: reverseSortDirection,
        page: activePage,
        search: search,
        sortBy: sortBy,
        addRow: addRow,
        setSorting: setSorting,
        onSeach: onSeach,
        setPage: setPage,
        removeRow: removeRow,
        replaceRow: replaceRow,
        setData: updateData,
        setPerPage: updatePerPage
    }
};