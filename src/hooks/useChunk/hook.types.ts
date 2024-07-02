export type ChunkHandlers<T> = {
    /**
     * Actualiza el numero de datos por vector
     * @param value 
     * @returns 
     */
    size: (value: number) => void;
}

export type ChunkValues<T> = {
    /**
     * Numero de datos por vector de la matriz
     */
    size: number
}
