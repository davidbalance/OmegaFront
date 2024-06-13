import { SelectorOption } from "@/lib";

export type DiseaseDiseaseGroup = {
    id: number;
    name: string;
    diseases: Disease[];
}

export type FindDiseaseGroups = {
    groups: DiseaseDiseaseGroup[]
}

export type Disease = {
    id: number;
    name: string;
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