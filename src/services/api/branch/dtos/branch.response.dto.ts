import { SelectorOption } from "@/lib";

export type Branch = {
    id: number;
    name: string;
}

export type FindBranchRS = Branch;

export type FindBranchesRS = {
    branches: Branch[];
}

export type FindBranchSelectorOptions = {
    options: SelectorOption<number>[]
}