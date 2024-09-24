import { TextInputProps } from "@mantine/core";
import { ListElement } from ".";

export interface ListLayoutBaseProps<T> {
    /**
     * Elementos de react que hacen de filas.
     */
    data: React.ReactElement[];
    /**
     * Numero total de paginas
     */
    total: number;
    /**
     * Estado de carga.
     */
    loading: boolean;
    /**
     * Columnas que seran visualizadas en el encabezado.
     */
    columns: ListElement<T>[];
    /**
     * Altura del contenido.
     */
    height?: number;
    /**
     * Elementos adicionales, se posicionaran a un lado del area de busqueda.
     */
    dock?: React.ReactElement | React.ReactElement[];
    /**
     * Llave que esta siendo ordenada
     */
    sort: keyof T | null;
    /**
     * Funcion que es invocada cuando se realiza un click a un boton en el encabezado
     * @param key 
     * @returns 
     */

    onSort: (key: keyof T | null) => void
    /**
     * Funcion que es invocada al momento de cambiar una pagina
     * @param page 
     * @returns 
     */
    onPageChange: (page: number) => void;

    /**
     * Props para el campo de busqueda
     */
    searchProps: TextInputProps
}