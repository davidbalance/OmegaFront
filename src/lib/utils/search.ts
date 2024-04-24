import { keys } from "@mantine/core";

type SortPayload<T> = {
    sortBy: keyof T | null;
    reversed: boolean;
    search: string
}

export const filter = <T extends object>(data: T[], search: string, filterKeys?: (keyof T)[]): T[] => {
    const query = search.toLocaleLowerCase().trim();
    return data.filter((item) =>
        (filterKeys ?? keys(data[0])).some((key) =>
            `${item[key]}`.toLowerCase().includes(query))
    );
}

export const chunk = <T extends object>(array: T[], size: number): T[][] => {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
}

export const sort = <T extends object>(data: T[], payload: SortPayload<T>): T[] => {
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