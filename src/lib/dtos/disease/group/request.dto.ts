export interface POSTDiseaseGroupRequestDto {
    name: string;
}

export interface PATCHDiseaseGroupRequestDto extends Partial<POSTDiseaseGroupRequestDto> { }