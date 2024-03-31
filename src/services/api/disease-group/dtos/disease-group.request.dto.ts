export type CreateDiseaseGroupRQ = {
    name: string;
}

export type FindDiseaseGroupAndUpdateRQ = Partial<CreateDiseaseGroupRQ> & {
    id: number;
}