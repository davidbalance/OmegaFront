import { useCallback, useEffect, useState } from "react";

export type ChunkHandlers<T> = {
    size: (value: number) => void;
}

export type ChunkValues<T> = {
    size: number
}

const useChunk = <T>(initialValues: T[], initialSize: number = 10): [data: T[][], handlers: ChunkHandlers<T>, values: ChunkValues<T>] => {
    const [data, setData] = useState<T[][]>([]);
    const [size, setSize] = useState<number>(initialSize);

    const chunkRecursive = useCallback((array: T[]): T[][] => {
        if (!array.length) return [];
        const head = array.slice(0, size);
        const tail = array.slice(size);
        return [head, ...chunkRecursive(tail)];
    }, [size]);

    const chunk = useCallback(() => {
        const chunks = chunkRecursive(initialValues);
        setData(chunks);
    }, [initialValues, size]);

    useEffect(() => {
        chunk();
        return () => { }
    }, [chunk])

    return [data,
        { size: setSize },
        { size: size }
    ];

}

export { useChunk };