import { keys } from "@mantine/core";
import { useCallback, useEffect, useState } from "react"

export type FilterHandlers<T> = {
    setFilterText: (value: string | null) => void;
}

export type FilterValues<T> = {
    text: string | undefined
}

const useFilter = <T extends object>(initialValues: T[], filterKeys: (keyof T)[] | null = null): [data: T[], handlers: FilterHandlers<T>, values: FilterValues<T>] => {
    const [data, setData] = useState<T[]>(initialValues);
    const [search, setSearch] = useState<string | null>(null);

    const filter = useCallback(() => {
        if (search === null) {
            setData(initialValues);
            return;
        }
        const query: string = search.toLocaleLowerCase().trim();
        const filtered = initialValues.filter((item) =>
            (filterKeys ?? keys(initialValues[0])).some((key) =>
                `${item[key]}`.toLocaleLowerCase().includes(query)));
        setData(filtered);
    }, [initialValues, search, filterKeys]);

    useEffect(() => {
        filter();
        return () => { }
    }, [filter])

    return [data, { setFilterText: setSearch }, { text: search || undefined }];

}

export { useFilter }