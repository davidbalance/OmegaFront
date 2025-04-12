
export type LocalStorageHookHandler<T> = {
    /**
     * Guarda el valor en el almacenamiento del navegador
     * @param value 
     * @returns 
     */
    save: (value: T) => void;
    /**
     * Elimina los datos del almancenamiento del navegador
     * @returns 
     */
    remove: () => void;
}

export type LocalStorageHookResult<T> = [value: T, handlers: LocalStorageHookHandler<T>]