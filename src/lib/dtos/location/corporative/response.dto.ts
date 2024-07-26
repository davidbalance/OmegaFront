import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { CorporativeGroup } from "./base.response.dto";

export interface GetCorporativeGroupResponseDto extends CorporativeGroup { }

export interface GetCorporativeGroupArrayResponseDto extends ObjectArray<CorporativeGroup> { }