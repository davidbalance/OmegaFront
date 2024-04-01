import { FindSelectorOptions } from "@/lib";

export type Disease = {
    id: string;
    name: string;
    group: {
        id: number;
        name: string;
    };
}

export type FindDiseaseSelectorOptionRS = FindSelectorOptions<number>;

export type FindDiseasesRS = {
    diseases: Disease[];
}