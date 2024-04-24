import { filter } from "@/lib/utils/search";
import { useEffect, useState } from "react"

type SearchHook<T> = {
    filter: T[];
    search: string;
    onSearch: (value: string) => void;
    removeObject: <K>(field: keyof T, value: K) => void;
    replaceObject: <K>(field: keyof T, key: K, value: T) => void;
    replaceAllObjects: (data: T[]) => void;
}

export const useSearch = <T extends object>(initialData: T[], keys?: (keyof T)[]): SearchHook<T> => {

    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<T[]>(initialData);
    const [filterData, setFilterData] = useState<T[]>(initialData);

    useEffect(() => {
        setData(initialData);
        setFilterData(initialData);
        return () => { }
    }, [initialData]);


    const onSearch = (value: string) => {
        setSearch(value);
        setFilterData(filter(data, value, keys));
    }

    const removeObject = <K>(field: keyof T, value: K) => {
        const newData = filterData.filter((row) => typeof row[field] === typeof value && row[field] !== value);
        setFilterData(newData);
    }

    const replaceObject = <K>(field: keyof T, key: K, value: T) => {
        const currentIndex = filterData.findIndex((row) => typeof row[field] === typeof key && row[field] === key);
        if (currentIndex < 0) return;
        const newData = data;
        newData[currentIndex] = value;
        setFilterData(newData);
    }

    const replaceAllObjects = (data: T[]) => {
        setData(data);
        setFilterData(data);
    }

    return {
        search: search,
        filter: filterData,
        onSearch: onSearch,
        removeObject: removeObject,
        replaceObject: replaceObject,
        replaceAllObjects: replaceAllObjects,
    }
}