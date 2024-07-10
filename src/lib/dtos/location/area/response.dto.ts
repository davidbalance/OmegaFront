export interface Area {
    id: number;
    name: string;
}

export interface GETAreaResponseDto extends Area { }

export interface GETAreaArrayResponseDto {
    areas: Area[];
}

export interface POSTAreaResponseDto extends Area { }

export interface PATCHAreaResponseDto extends Area { }

export interface DELETEAreaResponseDto { }