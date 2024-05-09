import { SelectorOption } from "@/lib";

export type ApiKey ={
    name: string;
}

export type FindApiKeysRS = ApiKey;

export type FindCorporativeGroupsRS = {
    apikeys: ApiKey[];
}

export type FindSelectorOptionsApiKey = {
    options: SelectorOption<number>[];
}