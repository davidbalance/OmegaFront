import { WebResource } from "./resources.response.dto";

interface ClientResource {
    icon: string;
    label: string;
    address: string;
}

interface ClientLogo {
    name: string;
}

export interface GETWebClientResponseDto {
    logo: ClientLogo;
    resources: ClientResource[];
}

export interface PATCHWebClientLogoResponseDto { }

export interface GETWebClientResourceResponseDto {
    resources: WebResource[];
}

export interface PATCHWebClientResourceResponseDto { }