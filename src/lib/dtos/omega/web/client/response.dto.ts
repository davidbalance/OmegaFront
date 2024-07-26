import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { OmegaWebClientLogo, OmegaWebClientResource } from "./base.response.dto";

export interface GetOmegaWebClientResponseDto {
    logo: OmegaWebClientLogo;
    resources: OmegaWebClientResource[];
}

export interface GetOmegaWebClientResourceResponseDto extends OmegaWebClientResource { }

export interface GetOmegaWebClientResourceArrayResponseDto extends ObjectArray<OmegaWebClientResource> { }

export interface PatchOmegaWebClientResourceResponseDto extends OmegaWebClientResource { }

export interface PatchOmegaWebClientLogoResponseDto extends OmegaWebClientLogo { }