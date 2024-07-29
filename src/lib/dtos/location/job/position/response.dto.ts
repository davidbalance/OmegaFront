import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { JobPosition } from "./base.response.dto";

export interface PostJobPositionResponseDto extends JobPosition { }

export interface GetJobPositionResponseDto extends JobPosition { }

export interface GetJobPositionArrayResponseDto extends ObjectArray<JobPosition> { }

export interface PatchJobPositionResponseDto extends JobPosition { }