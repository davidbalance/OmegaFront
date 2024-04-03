import { FindSelectorOptions, SelectorOption } from "@/lib";

export type DiseaseGroup = {
    id: number;
    name: string;
}

export type CreateDiseaseGroupRS = DiseaseGroup;

export type FindDiseaseGroupRS = DiseaseGroup;

export type FindDiseaseGroupsRS = {
    groups: DiseaseGroup[];
};

export type UpdateDiseaseGroupRS = DiseaseGroup;

export type FindSelectorDiseaseGroupRS = FindSelectorOptions<number>;