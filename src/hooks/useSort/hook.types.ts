
export type SortHandlers<T> = {
    /**
     * Ordena el arralo por la llave indicada
     * @param key 
     * @returns 
     */
    sortBy: (key: keyof T | null) => void;
}

export type SortValues<T> = {
    /**
     * Llave actual usada para ordenar
     */
    sortBy: keyof T | null;
    /**
     * Orden ascendente o descendente 
     */
    direction: boolean;
}