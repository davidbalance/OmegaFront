export type CreateDiseaseGroupRQ = {
    name: string;
}

export type FindDiseaseGroupAndUpdateRQ = Partial<CreateDiseaseGroupRQ> & {
    id: number;
}

export type FindDiseaseGroupAndDeleteRQ = {
    id: number;
}