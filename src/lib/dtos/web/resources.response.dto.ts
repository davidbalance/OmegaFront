export interface WebResource {
    id: number;
    label: string;
}

export interface GETWebResourcesResponseDto {
    resources: WebResource[];
}