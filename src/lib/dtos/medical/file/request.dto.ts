
export interface POSTMedicalResultFileRequestDto {
    id: number;
    type: 'report' | 'result',
}

export interface POSTMedicalResultFilesRequestDto {
    files: POSTMedicalResultFileRequestDto[];
}