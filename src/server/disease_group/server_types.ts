import { Option } from "@/lib/types/option.type";
import { Order, Pagination } from "@/lib/types/pagination.type";

export type DiseaseGroup = {
    groupId: string;
    groupName: string;
    hasDiseases: boolean;
}

export type DiseaseGroupOption = Option & {
    children: Option[];
}

export type DiseaseGroupQuery = {
    filter?: string;
} & Order<DiseaseGroup> & Pagination;

export type CreateDiseaseGroupPayload = {
    name: string;
}

export type EditDiseaseGroupPayload = {
    groupId: string;
    groupName: string;
};

export type RemoveDiseaseGroupPayload = {
    groupId: string;
};