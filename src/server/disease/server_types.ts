import { Order, Pagination } from "@/lib/types/pagination.type";

export type Disease = {
    diseaseId: string;
    diseaseName: string;
}

export type DiseaseQuery = {
    groupId: string;
    filter?: string;
} & Order<Disease> & Pagination;

export type CreateDiseasePayload = {
    groupId: string;
    diseaseName: string;
}

export type EditDiseasePayload = CreateDiseasePayload & {
    diseaseId: string;
};

export type MoveDiseasePayload = {
    diseaseId: string;
    fromGroupId: string;
    toGroupId: string;
};

export type RemoveDiseasePayload = {
    groupId: string;
    diseaseId: string;
};