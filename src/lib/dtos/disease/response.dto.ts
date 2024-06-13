export interface Disease {
    id: number;
    name: string;
}

export interface POSTDiseaseResponseDto extends Disease { }

export interface PATCHDiseaseResponseDto extends Disease { }