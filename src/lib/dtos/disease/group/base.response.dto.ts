import { Disease } from "../base.response.dto";

export interface DiseaseGroup {
    id: number;
    name: string;
    diseases: Disease[];
}

export interface DiseaseGroupSingle {
    id: number;
    name: string;
}