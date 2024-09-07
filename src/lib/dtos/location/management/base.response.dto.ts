import { Area } from "../area/base.response.dto";

export interface ManagementOption {
    id: number;
    name: string;
    area: Area[]
}

export interface Management {
    id: number;
    name: string;
}