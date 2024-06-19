import { Disease } from "../response.dto";

export interface DiseaseGroup {
    id: number;
    name: string;
    diseases: Disease[];
}

export interface GETDiseaseGroupResponseDto extends DiseaseGroup { }

export interface GETDiseaseGroupsResponseDto {
    groups: DiseaseGroup[];
}

export interface POSTDiseaseGroupResponseDto extends DiseaseGroup { };

export interface PATCHDiseaseGroupResponseDto { }

export interface DELETEDiseaseGroupResponseDto { }