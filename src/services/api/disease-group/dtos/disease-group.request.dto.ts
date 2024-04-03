export type CreateDiseaseGroupRQ = {
    name: string;
}

export type UpdateDiseaseGroupRQ = Partial<CreateDiseaseGroupRQ> & {
    id: number;
}

export type DeleteDiseaseGroupRQ = {
    id: number;
}