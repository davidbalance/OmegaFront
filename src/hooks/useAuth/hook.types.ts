import { AuthCredentials } from "@/lib/dtos/auth/request.dto";
import { FetchHookResult } from "@/lib/types/fetch-hook.interface";

export interface AuthOptions { }

export interface AuthResult extends Omit<FetchHookResult<any>, 'data'> {
    login: (body: AuthCredentials) => void;
    logout: () => void;
}