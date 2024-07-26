import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { OmegaWebResource } from "./base.response.dto";

export interface GetOmegaWebResourceResponseDto extends OmegaWebResource { }

export interface GetOmegaWebResourceArrayResponseDto extends ObjectArray<OmegaWebResource> { }

export interface PostOmegaWebResourceResponseDto extends OmegaWebResource { }

export interface PatchOmegaWebResourceResponseDto extends OmegaWebResource { }