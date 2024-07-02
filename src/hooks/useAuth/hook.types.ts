import { AuthCredentials } from "@/lib/dtos/auth/request.dto";
import { FetchHookResult } from "@/lib/types/fetch-hook.interface";

export interface AuthOptions { }

export interface AuthResult extends Omit<FetchHookResult<any>, 'data'> {
    /**
     * Funcion que permite valida las credenciales y permite el acceso al sistema.
     * @param body 
     * @returns 
     */
    login: (body: AuthCredentials) => void;
    /**
     * Funcion que se encarga de sacar del sistema al usuario.
     * @returns 
     */
    logout: () => void;
}