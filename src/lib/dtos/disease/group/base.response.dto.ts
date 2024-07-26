import { Disease } from "../response.dto";

export interface DiseaseGroup {
    id: number;
    name: string;
    diseases: Disease[];
}