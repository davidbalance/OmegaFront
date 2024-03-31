export type CreateDiseaseRQ = {
    name: string;
    group: number;
}

export type FindDiseaseAndUpdateRQ = Partial<CreateDiseaseRQ> & {
    id: number;
}

export type FindDiseaseAndDeleteQR = {
    id: number;
}