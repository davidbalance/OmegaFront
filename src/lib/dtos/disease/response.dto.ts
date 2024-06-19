export interface Disease {
    id: number;
    name: string;
}

export interface GETDiseaseResponseDto extends Disease { }

export interface GETDiseaseArrayResponseDto {
    diseases: GETDiseaseResponseDto[];
}

export interface POSTDiseaseResponseDto extends Disease { }

export interface PATCHDiseaseResponseDto extends Disease { }

export interface DELETEDiseaseResponseDto { }