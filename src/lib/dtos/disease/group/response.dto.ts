import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { DiseaseGroup } from "./base.response.dto";

export interface GetDiseaseGroupResponseDto extends DiseaseGroup {}

export interface GetDiseaseGroupArrayResponseDto extends ObjectArray<DiseaseGroup> {}

export interface PostDiseaseGroupResponseDto extends DiseaseGroup { };