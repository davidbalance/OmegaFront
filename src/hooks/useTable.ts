import { keys } from "@mantine/core";
import { useState } from "react";

type SortPayload<T> = {
    sortBy: keyof T | null;
    reversed: boolean;
    search: string
}

const filter = <T extends object>(data: T[], search: string): T[] => {
    const query = search.toLocaleLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) =>
            `${item[key]}`.toLowerCase().includes(query))
    );
}

const chunk = <T extends object>(array: T[], size: number): T[][] => {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
}

const sort = <T extends object>(data: T[], payload: SortPayload<T>): T[] => {
    const { sortBy } = payload;

    if (!sortBy) {
        return filter(data, payload.search);
    }

    return filter(
        [...data].sort((a, b) => {
            const aString: string = a[sortBy] as string;
            const bString: string = b[sortBy] as string;
            if (payload.reversed) {
                return bString.toLocaleLowerCase().localeCompare(aString);
            }

            return aString.toLocaleLowerCase().localeCompare(bString);
        }),
        payload.search
    );
}

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
        const currentIndex = sortedData.findIndex((row) => typeof row[field] === typeof key && row[field] !== key);
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

    return {
        rows: chunk(sortedData, perPage)[activePage - 1] || [],
        total: total,
        sortDirection: reverseSortDirection,
        page: activePage,
        search: search,
        sortBy: sortBy,
        setSorting: setSorting,
        onSeach: onSeach,
        setPage: setPage,
        removeRow: removeRow,
        replaceRow: replaceRow,
        setData: updateData,
        setPerPage: updatePerPage
    }
};