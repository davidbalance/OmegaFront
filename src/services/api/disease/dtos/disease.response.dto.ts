import { SelectorOption } from "@/lib";

export type Disease = {
    id: number;
    name: string;
    group: {
        id: number;
        name: string;
    };
}

export type FindDiseaseRS = Disease;

export type FindDiseasesRS = {
    diseases: Disease[];
}

export type CreateDiseaseRS = Disease;

export type UpdateDiseaseRS = Disease;

export type FindSelectorOptionsDisease = {
    options: SelectorOption<number>[];
}