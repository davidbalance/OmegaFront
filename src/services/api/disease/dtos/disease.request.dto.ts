export type CreateDiseaseRQ = {
    name: string;
    group: number;
}

export type UpdateDiseaseRQ = Partial<CreateDiseaseRQ> & {
    id: number;
}

export type DeleteDiseaseRQ = {
    id: number;
}

export type DiseaseSelectorRQ = {
    group: number
}