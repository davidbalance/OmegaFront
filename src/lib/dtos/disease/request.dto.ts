export interface POSTDiseaseRequestDto {
    name: string;
    group: number;
}

export interface PATCHDiseaseRequestDto extends Partial<POSTDiseaseRequestDto> { }