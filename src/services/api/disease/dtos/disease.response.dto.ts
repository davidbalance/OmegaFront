import { FindSelectorOptions } from "@/lib";

export type Disease = {
    id: number;
    name: string;
    group: {
        id: number;
        name: string;
    };
}

export type CreateDiseaseRS = {
    disease: Disease;
}

export type FindDiseaseSelectorOptionRS = FindSelectorOptions<number>;

export type FindDiseaseAndUpdateRS = {
    disease: Disease;
}

export type FindDiseasesRS = {
    diseases: Disease[];
}