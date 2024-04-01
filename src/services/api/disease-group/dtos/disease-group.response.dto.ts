import { FindSelectorOptions } from "@/lib";

export type DiseaseGroup = {
    id: number;
    name: string;
}

export type CreateDiseaseGroupRS = {
    disease: DiseaseGroup;
}

export type FindDiseaseGroupSelectorOptionsRS = FindSelectorOptions<number>;

export type FindDiseaseGroupsRS = {
    diseaseGroups: DiseaseGroup[];
}