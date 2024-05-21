import { SelectorOption } from "@/lib";

export type CorporativeGroup ={
    id: number;
    name: string;
}

export type FindCorporativeGroupRS = CorporativeGroup;

export type FindCorporativeGroupsRS = {
    groups: CorporativeGroup[];
}

export type FindSelectorOptionsCorporativeGroup = {
    options: SelectorOption<number>[];
}