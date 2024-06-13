import { Disease } from "../response.dto";

export interface DiseaseGroup {
    id: number;
    name: string;
    diseases: Disease[];
}

export interface GETDiseaseGroupsResponseDto {
    groups: DiseaseGroup[];
}

export interface POSTDiseaseGroupResponseDto extends DiseaseGroup { };