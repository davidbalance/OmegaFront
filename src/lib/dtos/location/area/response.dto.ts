import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { Area } from "./base.response.dto";


export interface GetAreaResponseDto extends Area { }

export interface GetAreaArrayResponseDto extends ObjectArray<Area> { }

export interface PostAreaResponseDto extends Area { }

export interface PatchAreaResponseDto extends Area { }