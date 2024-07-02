
export type FilterHandlers<T> = {
    /**
     * Texto a filtrar
     * @param value 
     * @returns 
     */
    setFilterText: (value: string) => void;
}

export type FilterValues<T> = {
    /**
     * Texto actual que es usado para filtrar
     */
    text: string;
}