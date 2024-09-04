import { City } from "./city.response.dto";

export interface Branch {
    id: number;
    name: string;
    city: City;
}

export interface BranchSingle {
    id: number;
    name: string;
    city: string;
}