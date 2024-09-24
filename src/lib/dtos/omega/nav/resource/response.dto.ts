import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { OmegaNavResource } from "./base.response.dto";

export interface GetOmegaNavResourceResponseDto extends OmegaNavResource { }

export interface GetOmegaNavResourceArrayResponseDto extends ObjectArray<OmegaNavResource> { }