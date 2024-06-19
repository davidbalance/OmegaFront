export interface MedicalClientEmail {
    id: number;
    email: string;
    default: boolean;
}

export interface GETMedicalEmailResponseDto extends MedicalClientEmail { }

export interface GETMedicalEmailArrayResponseDto {
    email: MedicalClientEmail[];
}

export interface POSTMedicalEmailResponseDto extends MedicalClientEmail { }

export interface PATCHMedicalEmailResponseDto extends MedicalClientEmail { }

export interface DELETEMedicalEmailResponseDto { }

export interface MedicalClient {
    dni: string;
    fullname: string;
    email: MedicalClientEmail[];
}

export interface GETMedicalClientResponseDto extends MedicalClient { }

export interface POSTMedicalClientResponseDto extends MedicalClient { }