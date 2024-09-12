import { Area } from "../area/base.response.dto";

export interface ManagementOption {
    id: number;
    name: string;
    areas: Area[]
}

export interface Management {
    id: number;
    name: string;
}