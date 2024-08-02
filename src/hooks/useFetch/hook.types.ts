import { FetchHookResult } from "@/lib/types/fetch-hook.interface";

export type FetchResult<T> = FetchHookResult<T> & {
    /**
     * Valor numerico del estado al realizarse la peticion.
     */
    status: number | null;
    /**
     * Cuerpo de la peticion.
     */
    body: any | null;
    /**
     * Coloca el cuerpo a la peticion.
     * @template R Type of the request body
     * @param body Request body
     */
    request: <R>(body: R | null) => void;
    /**
     * Reenvia la peticion.
     */
    reload: () => void;
    /**
     * Restaura todos los estados del hook a sus valores iniciales.
     */
    reset: () => void;
}

export type FetchOptions<T> = Omit<RequestInit, 'body' | 'method'> & {
    body?: any | null;
    /**
     * Indica si el se debe hacer la peticion cuando el componente es montado, por defecto es true
     */
    loadOnMount?: boolean;
    /**
     * El tipo de objeto que recibes, por defecto json
     */
    type?: 'json' | 'blob',
    /**
     * Tipo de dato a enviar, por defecto json
     */
    application?: 'json' | 'form',
}