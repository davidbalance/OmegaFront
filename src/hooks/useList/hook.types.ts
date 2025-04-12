export type ListHandler<T> = {
    /**
     * Añade nuevos elementos al arreglo
     * @param data 
     * @returns 
     */
    append: (data: T) => void;
    /**
     * Elimina elementos del arreglo
     * @param key 
     * @param value 
     * @returns 
     */
    remove: (key: keyof T, value: any) => void;
    /**
     * Actualiza elementos del arreglo
     * @param key 
     * @param value 
     * @param newValue 
     * @returns 
     */
    update: (key: keyof T, value: any, newValue: Partial<T>) => void;
    /**
     * Sobreescribe todos los valores del arreglo
     * @param data 
     * @returns 
     */
    override: (data: T[]) => void;
}
