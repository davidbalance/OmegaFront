export interface WebFullResource {
    id: number;
    name: string;
    label: string;
    address: string;
    icon: string;
    status: boolean;
}

export interface GETWebFullResourceResponseDto {
    resources: WebFullResource[];
}

export interface POSTWebResourceResponseDto extends WebFullResource { }

export interface PATCHWebResourceResponseDto extends WebFullResource { }

export interface DELETEWebResourceResponseDto { }

export interface WebResource {
    id: number;
    label: string;
}

export interface GETWebResourcesResponseDto {
    resources: WebResource[];
}