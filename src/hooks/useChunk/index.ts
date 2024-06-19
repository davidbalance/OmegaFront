import { useCallback, useEffect, useState } from "react";
import { ChunkHandlers, ChunkValues } from "./hook.types";

const chunkRecursive = <T>(array: T[], size: number): T[][] => {
    if (!array.length) return [];
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunkRecursive(tail, size)];
}

const useChunk = <T>(initialValues: T[], initialSize: number = 10): [data: T[][], handlers: ChunkHandlers<T>, values: ChunkValues<T>] => {
    const [data, setData] = useState<T[][]>([]);
    const [size, setSize] = useState<number>(initialSize);

    const chunk = useCallback(() => {
        const chunks = chunkRecursive(initialValues, size);
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