import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { User } from "./base.response.dto";

export interface GetUserResponseDto extends User { }

export interface GetUserArrayResponseDto extends ObjectArray<User> { }

export interface PostUserResponseDto extends User { }

export interface PatchUserResponseDto extends User { }