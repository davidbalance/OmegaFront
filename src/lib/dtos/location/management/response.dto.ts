import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { Management } from "./base.response.dto";

export interface GetManagementResponseDto extends Management { }

export interface GetManagementArrayResponseDto extends ObjectArray<Management> { }

export interface PostManagementResponseDto extends Management { }

export interface PatchManagementResponseDto extends Management { }
