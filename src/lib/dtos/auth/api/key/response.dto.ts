import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { ApiKey } from "./base.response.dto";


export interface GetApiKeyArrayResponseDto extends ObjectArray<ApiKey> {}

export interface PostApiKeyResponseDto extends ApiKey {
    apikey: string;
}

export interface PatchApiKeyResponseDto extends ApiKey { }