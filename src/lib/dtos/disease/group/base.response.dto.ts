import { Disease } from "../base.response.dto";

export interface DiseaseGroupOption {
    id: number;
    name: string;
    diseases: Disease[];
}

export interface DiseaseGroup {
    id: number;
    name: string;
}